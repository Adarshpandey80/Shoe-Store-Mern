const express = require("express")
const route = express.Router();
const productController = require("../controllers/productController")

route.post("/listProducts" , productController.addProducts)
route.get("/showProducts" , productController.showProductsList)
route.get("/:id" , productController.getProductInfo)

module.exports = route;