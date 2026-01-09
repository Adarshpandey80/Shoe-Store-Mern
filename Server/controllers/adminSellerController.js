const ProductModel = require("../models/productModel")
const OrderModel = require("../models/orderModel")

const AdminSeller = require("../models/SellerModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const showProductsList = async (req, res) => {
    try {
        const products =  await ProductModel.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Error retrieving products: " + error.message);
    }
}

 const registerAdminSeller = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      storeName,
      businessType,
      gst,
      address,
    } = req.body;


    // 🔴 Check if seller already exists
    const existingSeller = await AdminSeller.findOne({ email });
    if (existingSeller) {
      return res.status(409).json({
        message: "Seller already registered with this email",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create seller
    const seller = await AdminSeller.create({
      username,
      email,
      password: hashedPassword,
      phone,
      storeName,
      businessType,
      gst,
      address,
    });

    res.status(201).json({
      message: "Seller registered successfully. Await admin approval.",
      sellerId: seller._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// ================= LOGIN SELLER =================
 const loginAdminSeller = async (req, res) => {
  try {
    const { email, password } = req.body;


    const seller = await AdminSeller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Optional: Block unapproved sellers
    // if (!seller.isVerified) {
    //   return res.status(403).json({
    //     message: "Seller account pending approval",
    //   });
    // }

    // 🔑 JWT Token
    const token = jwt.sign(
      {
        id: seller._id,
        role: seller.role,
      },
       "adarsh111" ,
      { expiresIn: 1 * 24 * 60 * 60, }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      seller: {
        id: seller._id,
        username: seller.username,
        email: seller.email,
        storeName: seller.storeName,
        role: seller.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const allOrders = async (req,res) =>{
       try {
          const Orders = await OrderModel.find({});
         
          res.status(201).send(Orders)
       } catch (error) {
             res.status(400).send("Order data not found")
       }
}




 module.exports = {
     showProductsList ,
     registerAdminSeller,
     loginAdminSeller,
     allOrders
}