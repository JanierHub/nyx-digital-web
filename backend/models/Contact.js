import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  service: {
    type: String,
    enum: ['web-development', 'mobile-app', 'ui-ux', 'consulting', 'other'],
    required: [true, 'Service type is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  budget: {
    type: String,
    enum: ['<1000', '1000-5000', '5000-10000', '10000-25000', '>25000'],
    default: null
  },
  timeline: {
    type: String,
    enum: ['asap', '1-2-months', '3-6-months', '6+months'],
    default: null
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social', 'search', 'other'],
    default: 'website'
  },
  notes: [{
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Note cannot exceed 500 characters']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for contact age
contactSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Index for better search performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ service: 1 });

// Pre-save middleware
contactSchema.pre('save', function(next) {
  // Auto-detect priority based on budget and timeline
  if (this.budget === '>25000' || this.timeline === 'asap') {
    this.priority = 'high';
  } else if (this.budget === '<1000' && this.timeline === '6+months') {
    this.priority = 'low';
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
