const express = require("express");
const router = express.Router()
const adminController = require("../controllers/adminSellerController")

router.get("/showAllProducts" , adminController.showProductsList)
router.post("/register" , adminController.registerAdminSeller)
router.post("/loginseller" , adminController.loginAdminSeller)
router.get("/allOrders" , adminController.allOrders)



module.exports = router