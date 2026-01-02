const express = require("express")
const route = express.Router();
const productController = require("../controllers/productController")

route.post("/listProducts" , productController.addProducts)
route.get("/showProducts" , productController.showProductsList)
route.get("/:id" , productController.getProductInfo)
route.get("/recent/:id" , productController.getRecentProductInfo)
route.get("/related/:category" , productController.getRelatedProducts)
route.get("/mensProducts", productController.getMensProducts);

// route.get("/womenProducts" , productController.getWomenProducts)
// route.get("/newArrivals" , productController.getNewArrivals)
// route.get("/saleProducts" , productController.getSaleProducts)

module.exports = route;