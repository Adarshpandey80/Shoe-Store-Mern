
const ProductModel = require("../models/productModel");
const cloudinary = require("../cloudinary");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images', // folder name Cloudinary account
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});


const upload = multer({ storage: storage }).array('images', 10); //image size



const addProducts = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send("Error uploading files: " + err.message);
        }

        try {
            const { name, category, description, price , isNewArrival , isSale , gender} = req.body;
            console.log(req.files);
            console.log(req.body);
            const imageUrls = req.files.map(file => file.path);

            const newProduct = new ProductModel({
                name: name,
                category: category,
                description: description,
                price: price,
                isNewArrival: isNewArrival,
                isSale: isSale,
                gender: gender,
                defaultImage: imageUrls[0],
                images: imageUrls
            });

            await newProduct.save();

            console.log("SAVEEEE")
            res.status(200).send("Data saved successfully!");

        } catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
    });
}
 
const showProductsList = async (req, res) => {
    try {
        const products =  await ProductModel.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Error retrieving products: " + error.message);
    }
}

const getProductInfo = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send("Error retrieving product: " + error.message);
    }
}

const getRecentProductInfo =  async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send("Error retrieving product: " + error.message);
    }
}

const getRelatedProducts = async (req,res) =>{
    try {
        const category = req.params.category;
        const relatedProducts = await ProductModel.find({ category: category });
        res.status(200).send(relatedProducts);
    } catch (error) {
        res.status(500).send("Error retrieving related products: " + error.message);
    }
}

const getMensProducts =  (req, res) => {

  console.log("getMensProducts controller called");
};


// const getWomenProducts = async (req,res) =>{
//     try {
//         const womenProducts = await ProductModel.find({gender : "women"});
//         res.status(200).send(womenProducts);  
//         console.log("women products", womenProducts);         
//     } catch (error) {
//         res.status(500).send("Error retrieving women products: " + error.message);          
//     }
// }

// const getNewArrivals = async (req,res) =>{
//     try {
//         const newArrivals = await ProductModel.find({isNewArrival : true});
//         res.status(200).send(newArrivals);        
//     } catch (error) {
//         res.status(500).send("Error retrieving new arrivals: " + error.message);          
//     }
// }

// const getSaleProducts = async (req,res) =>{
//     try {
//         const saleProducts = await ProductModel.find({isSale : true});
//         res.status(200).send(saleProducts);        
//     } catch (error) {
//         res.status(500).send("Error retrieving sale products: " + error.message);          
//     }
// }
 



module.exports = {
    addProducts,
    showProductsList,
    getProductInfo,
    getRecentProductInfo,
    getRelatedProducts,
    getMensProducts
    // getWomenProducts,
    // getNewArrivals,
    // getSaleProducts
}
