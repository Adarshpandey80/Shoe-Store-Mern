const mongoose = require("mongoose");

const adminSellerSchema = new mongoose.Schema(
  {
    // ===== BASIC DETAILS =====
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
    },

    // ===== STORE / BUSINESS INFO =====
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: {
      type: String,
      enum: ["individual", "proprietorship", "partnership", "company"],
      required: true,
    },

    gst: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      required: true,
    },

    // ===== SELLER STATUS =====
    role: {
      type: String,
      default: "seller", // seller | admin
    },

    isVerified: {
      type: Boolean,
      default: false, // after admin approval / KYC
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ===== SELLER METRICS (DASHBOARD USE) =====
    totalProducts: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminSeller", adminSellerSchema);
