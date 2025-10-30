const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 100
  },
  discount: {
    type: {
      type: String,
      enum: ['percentage', 'flat', 'none'],
      default: 'none'
    },
    value: {
      type: Number,
      default: 0,
      min: 0
    }
  }
}, {
  timestamps: true
});

// Virtual field to calculate discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discount.type === 'none' || this.discount.value === 0) {
    return this.price;
  }
  
  if (this.discount.type === 'percentage') {
    return this.price - (this.price * this.discount.value / 100);
  }
  
  if (this.discount.type === 'flat') {
    return Math.max(0, this.price - this.discount.value);
  }
  
  return this.price;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
