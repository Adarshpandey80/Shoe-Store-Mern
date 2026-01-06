const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register" , userController.register )
router.post("/login" , userController.login)
router.post("/userauth" , userController.authfun) 
router.get("/getuserdata/:id" , userController.userdata) 
router.post("/setuserdata/:id" , userController.updateuserdata) 
router.get("/getaddress/:id" , userController.useraddress) 
router.get("/getOrderHistory/:id" , userController.fetchOrderHistory)
router.post("/newaddaddress/:userId", userController.addAddress);
router.put("/updateaddress/:userId/:addressId",userController.updateUserAddress);
router.delete("/deleteaddress/:userId/:addressId",userController.deleteUserAddress);








module.exports = router;