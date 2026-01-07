const express = require("express");
const router = express.Router()
const adminController = require("../controllers/adminSellerController")

router.get("/showAllProducts" , adminController.showProductsList)



module.exports = router