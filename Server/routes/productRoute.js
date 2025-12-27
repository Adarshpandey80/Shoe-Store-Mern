const express = require("express")
const route = express.Router();
const productController = require("../controllers/productController")

route.get("/showcard" , productController.showproduct)



module.exports = route;