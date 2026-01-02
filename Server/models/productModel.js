const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gender : {
    type: String, 
    required: true
  },
   isNewArrival: {
    type: Boolean,
    default: false
  },
   isSale : {
    type: Boolean,
    default: false
   },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  defaultImage: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
