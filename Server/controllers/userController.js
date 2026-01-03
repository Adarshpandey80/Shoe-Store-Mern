const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

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

        await UserModel.create({
            username,
            email,
            password: passwordHash,
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

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Invalid Password" });
        }

      const token = jwt.sign({ id: user._id }, "adarsh111", {
            expiresIn: 3 * 24 * 60 * 60,
        });
        
         res.send({ token: token, msg: "You are succesfully Login" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};







module.exports = {
    register,
    login
}