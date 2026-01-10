const express = require("express");
const router = express.Router()
const adminController = require("../controllers/adminSellerController")
const upload = require("../middleware/multer")
const sellerAuth = require("../middleware/auth");

router.get("/showAllProducts" , adminController.showProductsList)
router.post("/register" , adminController.registerAdminSeller)
router.post("/loginseller" , adminController.loginAdminSeller)
router.get("/allOrders" , adminController.allOrders)
router.post(
  "/submit-kyc",
  sellerAuth,
  upload.fields([
    { name: "panCard", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 }
  ]),
  adminController.submitSellerKyc
);
router.get("/isverified/:id" , adminController.isVerifyed)

module.exports = router