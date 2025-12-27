const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const Productroute = require("./routes/productRoute")



app.use(cors());
app.use("/product" , Productroute)



app.get("/" , (req,res)=>{
    res.send("home route")
})

app.listen(8000 , ()=>{
    console.log("app is listing on port 8000")
})