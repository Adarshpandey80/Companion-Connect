const mongoose = require('mongoose');

const companionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Must be at least 18 years old'],
      max: [120, 'Please enter a valid age']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      minlength: [20, 'Bio must be at least 20 characters'],
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },
    experience: {
      type: String,
      enum: ['none', '1', '2', '5', 'more'],
      required: [true, 'Experience level is required']
    },
    services: {
      type: [String],
      enum: [
        'Shopping',
        'Travel Companion',
        'Event Attendance',
        'Dining',
        'Entertainment',
        'Museum Visits',
        'City Tours',
        'Social Events'
      ],
      required: [true, 'At least one service must be selected'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one service is required'
      }
    },
    availability: {
      type: String,
      enum: ['weekday', 'weekend', 'both', 'flexible'],
      required: [true, 'Availability is required']
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: [0, 'Rate cannot be negative']
    },
    documents: {
      idProof: {
        type: String,
        default: null
      },
      backgroundCheck: {
        type: String,
        default: null
      },
      certificateUrl: {
        type: String,
        default: null
      }
    },
    verification: {
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      },
      verifiedAt: {
        type: Date,
        default: null
      },
      rejectionReason: {
        type: String,
        default: null
      }
    },
    agreeTerms: {
      type: Boolean,
      required: [true, 'You must agree to terms and conditions'],
      default: false
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      totalReviews: {
        type: Number,
        default: 0
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    profileImage: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for email and userId
companionSchema.index({ email: 1 });
companionSchema.index({ userId: 1 });
companionSchema.index({ 'verification.status': 1 });

module.exports = mongoose.model('Companion', companionSchema);
