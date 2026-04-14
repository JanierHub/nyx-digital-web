import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    required: [true, 'Long description is required'],
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    enum: ['development', 'design', 'marketing', 'consulting'],
    required: [true, 'Category is required']
  },
  price: {
    startingFrom: {
      type: Number,
      required: [true, 'Starting price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'MXN']
    },
    billingType: {
      type: String,
      enum: ['one-time', 'monthly', 'yearly', 'project-based'],
      default: 'project-based'
    }
  },
  features: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Feature title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Feature description cannot exceed 200 characters']
    },
    included: {
      type: Boolean,
      default: true
    }
  }],
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology name cannot exceed 50 characters']
  }],
  deliverables: [{
    type: String,
    trim: true,
    maxlength: [100, 'Deliverable cannot exceed 100 characters']
  }],
  timeline: {
    type: String,
    enum: ['1-2-weeks', '2-4-weeks', '1-2-months', '2-3-months', '3+months'],
    required: [true, 'Timeline is required']
  },
  difficulty: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced', 'enterprise'],
    default: 'intermediate'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      trim: true,
      maxlength: [100, 'Alt text cannot exceed 100 characters']
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  faqs: [{
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Question cannot exceed 200 characters']
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Answer cannot exceed 500 characters']
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
serviceSchema.virtual('formattedPrice').get(function() {
  const currencySymbols = {
    USD: '$',
    EUR: 'â',
    GBP: 'Â£',
    MXN: '$'
  };
  return `${currencySymbols[this.price.currency] || '$'}${this.price.startingFrom}`;
});

// Indexes for better performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ isPopular: 1 });
serviceSchema.index({ sortOrder: 1 });
serviceSchema.index({ 'price.startingFrom': 1 });

// Pre-save middleware to generate slug
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
