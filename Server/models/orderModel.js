const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },

  paymentId: String,     
  orderId: String,       
  amount: Number,

  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  paymentStatus: {
    type: String,
    default: "success"
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);