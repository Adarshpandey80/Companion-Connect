const userModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

const generateToken = (userId, email) => {
  // JWT_SECRET is guaranteed to exist — app.js blocks startup without it
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const signup = async (req, res) => {
  try {
    const { fullName, email, password, phone, userType } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Enforce password minimum length before hitting the DB
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
      phone,
      userType: userType || 'client'
    });

    await newUser.save();

    // Generate token and set as httpOnly cookie
    const token = generateToken(newUser._id, newUser.email);
    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        userType: newUser.userType
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token and set as httpOnly cookie
    const token = generateToken(user._id, user.email);
    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};


const companionModel = require('../Models/Companion');
const uploadImage = require('../utils/uploadImage');

const formatCompanion = (companion) => ({
  id: companion._id,
  name: companion.fullName,
  age: companion.age,
  location: companion.location,
  bio: companion.bio,
  services: companion.services,
  tags: companion.services,
  availability: companion.availability,
  hourlyRate: companion.hourlyRate,
  price: companion.hourlyRate,
  rating: companion.rating?.average || 0,
  reviews: companion.rating?.totalReviews || 0,
  images: companion.images || (companion.profileImage ? [companion.profileImage] : []),
  profileImage: companion.profileImage,
  verification: companion.verification?.status || 'pending',
  isActive: companion.isActive,
});

const getCompanions = async (req, res) => {
  try {
    const companions = await companionModel
      .find({ isActive: true })
      .sort({ createdAt: -1 });

    res.status(200).json({ companions: companions.map(formatCompanion) });
  } catch (error) {
    console.error('Get companions error:', error);
    res.status(500).json({ message: 'Unable to load companions' });
  }
};

const getCompanion = async (req, res) => {
  try {
    const companion = await companionModel.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!companion) {
      return res.status(404).json({ message: 'Companion not found' });
    }

    res.status(200).json({ companion: formatCompanion(companion) });
  } catch (error) {
    console.error('Get companion error:', error);
    res.status(404).json({ message: 'Companion not found' });
  }
};

const becomeCompanion = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      age,
      bio,
      experience,
      availability,
      hourlyRate,
      agreeTerms,
    } = req.body;

    let { services } = req.body;

    // Convert services JSON string to array
    if (typeof services === 'string') {
      try {
        services = JSON.parse(services);
      } catch {
        return res.status(400).json({
          message: 'Services must be a valid list',
        });
      }
    }

    const images = req.files || [];
    const userId = req.user.id;

    // Required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !age ||
      !bio ||
      !experience ||
      !availability ||
      !hourlyRate ||
      !agreeTerms
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    // Images
    if (images.length < 2 || images.length > 4) {
      return res.status(400).json({
        message: 'Please upload between 2 and 4 profile photos',
      });
    }

    // Services
    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        message: 'At least one service must be selected',
      });
    }

    // Age
    const userAge = Number(age);

    if (userAge < 18) {
      return res.status(400).json({
        message: 'Must be at least 18 years old',
      });
    }

    // Hourly rate
    const rate = Number(hourlyRate);

    if (rate <= 0) {
      return res.status(400).json({
        message: 'Hourly rate must be greater than 0',
      });
    }

    // Bio
    if (bio.length < 20) {
      return res.status(400).json({
        message: 'Bio must be at least 20 characters',
      });
    }

    // Check existing profile
    const existingCompanion = await companionModel.findOne({
      userId,
    });

    if (existingCompanion) {
      return res.status(400).json({
        message: 'You already have a companion profile',
      });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map((image) => uploadImage(image.buffer))
    );

    // Create companion
    const newCompanion = await companionModel.create({
      userId,
      fullName,
      email,
      phone,
      location,
      age: userAge,
      bio,
      experience,
      services,
      availability,
      hourlyRate: rate,
      agreeTerms: true,

      images: imageUrls,
      profileImage: imageUrls[0],

      verification: {
        status: 'pending',
      },
    });

    return res.status(201).json({
      message:
        'Application submitted successfully! We will review your profile within 24-48 hours.',

      companion: {
        id: newCompanion._id,
        fullName: newCompanion.fullName,
        email: newCompanion.email,
        images: newCompanion.images,
        verification: newCompanion.verification,
      },
    });
  } catch (error) {
    console.error('Become companion error:', error);

    // Cloudinary upload permissions or account configuration error.
    if (error.http_code) {
      console.error('Cloudinary error:', {
        http_code: error.http_code,
        name: error.name,
        message: error.message,
      });

      return res.status(502).json({
        message: error.http_code === 403
          ? 'Cloudinary rejected this upload. Create an unsigned upload preset, add it as CLOUDINARY_UPLOAD_PRESET in Server/.env, and restart the server.'
          : 'Cloudinary could not upload the profile photos. Please try again.',
        providerStatus: error.http_code,
        uploadMode: error.uploadMode,
      });
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ');

      return res.status(400).json({
        message: messages,
      });
    }

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = {
    signup,
    login,
    logout,
  getCompanions,
  getCompanion,
    becomeCompanion
}