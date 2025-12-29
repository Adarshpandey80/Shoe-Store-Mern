const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const Productroute = require("./routes/productRoute")
const bodyparser = require("body-parser")
const paymentRoute = require('./routes/paymentRoute');

require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/shoeWebsite').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());





app.use("/products" , Productroute)
app.use('/payment', paymentRoute);






app.get("/" , (req,res)=>{
    res.send("home route")
})

app.listen(8000 , ()=>{
    console.log("app is listing on port 8000")
})