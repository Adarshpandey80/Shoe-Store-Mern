const express = require("express")
const route = express.Router();
const productController = require("../controllers/productController")
const sellerAuth = require("../middleware/auth")
const checkKyc = require("../middleware/checkKyc")


route.post("/listProducts" , sellerAuth, checkKyc , productController.addProducts)
route.get("/showProducts" , productController.showProductsList)
route.get("/mensproducts", productController.getMensProducts);
route.get("/womenProducts", productController.getWomenProducts);
route.get("/newArrivals", productController.getNewArrivals);
route.get("/saleProducts", productController.getSaleProducts);
route.get("/recent/:id" , productController.getRecentProductInfo)
route.get("/related/:category" , productController.getRelatedProducts)
route.get("/category/:category" , productController.getCategoryProducts)
route.get("/:id" , productController.getProductInfo)




module.exports = route;