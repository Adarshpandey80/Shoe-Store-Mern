const mongoose = require("mongoose")

const sellerKycSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminSeller",
    required: true
  },

  businessName: String,
  panNumber: String,
  gstNumber: String,

  documents: {
    panCard: String,
    aadhaar: String,
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  adminRemark: String
}, { timestamps: true });

module.exports = mongoose.model("KycDocument" , sellerKycSchema )