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

const becomeCompanion = async (req, res) => {
  try {
    const { fullName, email, phone, location, age, bio, experience, services, availability, hourlyRate, agreeTerms } = req.body;
    const userId = req.user.id; // Guaranteed by authenticateToken middleware

    // Validate required fields
    if (!fullName || !email || !phone || !location || !age || !bio || !experience || !services || !availability || !hourlyRate || !agreeTerms) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate services array
    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'At least one service must be selected' });
    }

    // Validate age
    if (age < 18) {
      return res.status(400).json({ message: 'Must be at least 18 years old' });
    }

    // Validate hourly rate
    if (hourlyRate <= 0) {
      return res.status(400).json({ message: 'Hourly rate must be greater than 0' });
    }

    // Check if this user already has a companion profile (keyed by userId, not email)
    const existingCompanion = await companionModel.findOne({ userId });
    if (existingCompanion) {
      return res.status(400).json({ message: 'You already have a companion profile' });
    }

    // Check if bio is at least 20 characters
    if (bio.length < 20) {
      return res.status(400).json({ message: 'Bio must be at least 20 characters' });
    }

    // Create new companion profile
    const newCompanion = new companionModel({
      userId,
      fullName,
      email,
      phone,
      location,
      age: parseInt(age),
      bio,
      experience,
      services,
      availability,
      hourlyRate: parseFloat(hourlyRate),
      agreeTerms,
      verification: {
        status: 'pending'
      }
    });

    await newCompanion.save();

    res.status(201).json({
      message: 'Application submitted successfully! We will review your profile within 24-48 hours.',
      companion: {
        id: newCompanion._id,
        fullName: newCompanion.fullName,
        email: newCompanion.email,
        verification: newCompanion.verification
      }
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    signup,
    login,
    logout,
    becomeCompanion
}