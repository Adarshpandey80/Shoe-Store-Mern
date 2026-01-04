const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the User schema


const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
     gender: {
        type: String,
        require: true
    },

   
  },
  { _id: true }
);

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [addressSchema],
    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
