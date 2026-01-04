const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register" , userController.register )
router.post("/login" , userController.login)
router.post("/userauth" , userController.authfun) 
router.get("/getuserdata/:id" , userController.userdata) 
router.post("/setuserdata/:id" , userController.updateuserdata) 
router.get("/getaddress/:id" , userController.useraddress) 





module.exports = router;