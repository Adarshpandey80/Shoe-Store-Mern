const ProductModel = require("../models/productModel")

const showProductsList = async (req, res) => {
    try {
        const products =  await ProductModel.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Error retrieving products: " + error.message);
    }
}


module.exports = {
     showProductsList
}