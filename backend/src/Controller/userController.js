import { createToken } from "../Middleware/Token.Middleware.js";
import User from "../Models/user.Models.js";

export const Register = async (req,res) => {
    const { userName, email, password } = req.body;
    try {
        const check = await User.findOne({email})
        if (check) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            userName,
            email,
            password
        });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const Login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   
        const token = createToken(user);
        return res.status(200).json({ token, id: user._id, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}