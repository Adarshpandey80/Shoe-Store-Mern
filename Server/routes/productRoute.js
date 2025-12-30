const express = require("express")
const route = express.Router();
const productController = require("../controllers/productController")

route.post("/listProducts" , productController.addProducts)
route.get("/showProducts" , productController.showProductsList)
route.get("/:id" , productController.getProductInfo)
route.get("/recent/:id" , productController.getRecentProductInfo)

module.exports = route;