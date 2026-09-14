const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../Models/Booking');
const Companion = require('../Models/Companion');

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

/**
 * Create a new Razorpay order & initiate booking
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      companionId,
      date,
      time,
      duration,
      notes,
    } = req.body;

    // Validate inputs
    if (!companionId || !date || !time || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All booking fields (companionId, date, time, duration) are required.',
      });
    }

    const parsedDuration = parseInt(duration, 10);

    if (isNaN(parsedDuration) || parsedDuration < 1 || parsedDuration > 24) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be an integer between 1 and 24 hours.',
      });
    }

    // Validate companion exists and is active & verified — fetch authoritative hourlyRate from DB
    const companion = await Companion.findOne({
      _id: companionId,
      isActive: true,
      'verification.status': 'verified',
    }).select('fullName hourlyRate');

    if (!companion) {
      return res.status(404).json({
        success: false,
        message: 'Companion not found, inactive, or not yet verified.',
      });
    }

    const companionName = companion.fullName;
    const parsedRate = companion.hourlyRate; // Authoritative — never trust the client

    const totalAmount = parsedDuration * parsedRate;
    const amountInPaise = Math.round(totalAmount * 100);

    const razorpay = getRazorpayInstance();

    // Create order with Razorpay
    const receiptId = `rcpt_${Date.now().toString().slice(-8)}_${userId.toString().slice(-4)}`;
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
      notes: {
        companionName: String(companionName).slice(0, 30),
        bookingDate: String(date),
        bookingTime: String(time),
        userId: userId.toString(),
      },
    });

    // Create pending booking record in MongoDB
    const newBooking = new Booking({
      userId,
      companionId: String(companionId),
      companionName,
      date,
      time,
      duration: parsedDuration,
      hourlyRate: parsedRate,
      totalAmount,
      currency: 'INR',
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      notes: notes || {},
    });

    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Razorpay order created successfully.',
      keyId: process.env.RAZORPAY_KEY_ID,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      bookingId: newBooking._id,
      booking: {
        id: newBooking._id,
        companionName: newBooking.companionName,
        date: newBooking.date,
        time: newBooking.time,
        duration: newBooking.duration,
        totalAmount: newBooking.totalAmount,
      },
    });
  } catch (err) {
    console.error('Error in createOrder:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to create payment order.',
    });
  }
};

/**
 * Verify Razorpay payment signature & confirm booking
 */
const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      orderId,
      paymentId,
      signature,
      bookingId,
    } = req.body;

    if (!orderId || !paymentId || !signature || !bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID, Payment ID, Signature, and Booking ID are required for verification.',
      });
    }

    // Find booking
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or does not belong to user.',
      });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(200).json({
        success: true,
        message: 'Payment has already been verified.',
        booking,
      });
    }

    // Reject payment verification on bookings that are cancelled or in an unexpected state
    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot verify payment for a cancelled booking.',
      });
    }

    // Verify HMAC SHA-256 signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(signature)
    );

    if (!isMatch) {
      booking.paymentStatus = 'failed';
      await booking.save();

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: invalid signature.',
      });
    }

    // Update booking status to paid and confirmed
    booking.razorpayPaymentId = paymentId;
    booking.razorpaySignature = signature;
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    booking.paidAt = new Date();

    await booking.save();

    return res.status(200).json({
      success: true,
      message: 'Payment verified and booking confirmed successfully.',
      booking: {
        id: booking._id,
        companionId: booking.companionId,
        companionName: booking.companionName,
        date: booking.date,
        time: booking.time,
        duration: booking.duration,
        totalPrice: booking.totalAmount,
        totalAmount: booking.totalAmount,
        paymentId: booking.razorpayPaymentId,
        orderId: booking.razorpayOrderId,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
        paidAt: booking.paidAt,
      },
    });
  } catch (err) {
    console.error('Error in verifyPayment:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Payment verification server error.',
    });
  }
};

/**
 * Get all bookings for the logged-in user
 */
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings.map(b => ({
        id: b._id,
        companionId: b.companionId,
        companionName: b.companionName,
        date: b.date,
        time: b.time,
        duration: b.duration,
        totalPrice: b.totalAmount,
        totalAmount: b.totalAmount,
        paymentStatus: b.paymentStatus,
        bookingStatus: b.bookingStatus,
        paymentId: b.razorpayPaymentId,
        createdAt: b.createdAt,
      })),
    });
  } catch (err) {
    console.error('Error in getMyBookings:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings.',
    });
  }
};

/**
 * Get single booking by ID
 */
const getBookingById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const booking = await Booking.findOne({ _id: req.params.id, userId }).lean();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error('Error in getBookingById:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking details.',
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyBookings,
  getBookingById,
};
