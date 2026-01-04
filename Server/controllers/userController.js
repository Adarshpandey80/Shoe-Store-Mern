const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
    try {
        const { username, email, password ,phone , address , pincode , gender } = req.body;

        // 1️⃣ Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username or Email already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Transform address string into the expected object format for the embedded schema
        const addressData = [{
            fullName: username,
            phone: phone,
            address: address,
            pincode: pincode,
            gender: gender
        }];

        await UserModel.create({
            username,
            email,
            password: passwordHash,
            phone,
            address: addressData,
            pincode,
            gender
        });
        res.status(201).send({
            message: "You are successfully registered!",
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).send({
            message: "Internal server error", error
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
 
    try {

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Invalid Password" });
        }

      const token = jwt.sign({ id: user._id }, "adarsh222", {
            expiresIn: 3 * 24 * 60 * 60,
        });

         res.send({ token: token, msg: "You are succesfully Login" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};

 
const authfun = async (req, res) => {
    try {
        const token = req.header("auth_token")
        const decode = jwt.verify(token, "adarsh222");
        const user = await UserModel.findById(decode.id);
        console.log(user);
        res.status(200).send(user)
    } catch (error) {
        res.status(401).send("error in empAuth")
    }
}


const userdata = async (req,res) =>{
   try {
     const {id} = req.params;
     const data = await UserModel.findById(id)
     res.status(200).send(data)
   } catch (error) {
     res.status(500).send("Error fatching user data  products: " + error.message); 
   }
}


const updateuserdata = async (req,res) =>{
    try {
        const {id} = req.params;
        const userdata = req.body;
        // Add {new: true} to return the updated document instead of the old one
        const updatedata = await UserModel.findByIdAndUpdate(id , userdata, {new: true, runValidators: true}) ;
        if (!updatedata) {
            return res.status(404).json({ message: "User not found" });
        }
       res.status(200).json({ message: "Profile updated successfully", data: updatedata });
    } catch (error) {
         console.error("Update error:", error);
         res.status(500).json({ message: "Error updating user data", error: error.message }); 
    }
}

const useraddress = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).select("address");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({address: user.address});

  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error: error.message }); 
  }
};


module.exports = {
    register,
    login,
    authfun,
    userdata,
    updateuserdata,
    useraddress
}