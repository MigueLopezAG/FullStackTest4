const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
        unique: true
    },
    adviserRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    image: { 
        url: String, 
        filename: String, 
        trim: true 
    },
    category: { 
        type: String, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    price: { 
        type: Number, 
        trim: true, 
        default: 0 
    },
    deleted: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
  
);

module.exports = Product = mongoose.model("Product", productSchema);
