const jwt = require("jsonwebtoken");
const Seller = require("../models/SellerModel");

const sellerAuth = async (req, res, next) => {
  try {
    // 1️⃣ Get token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, "adarsh111");

    // 3️⃣ Fetch seller from DB 🔥
    const seller = await Seller.findById(decoded.id);

    if (!seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    // 4️⃣ Attach FULL seller object
    req.seller = seller;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = sellerAuth;
