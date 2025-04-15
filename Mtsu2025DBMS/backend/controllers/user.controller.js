import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in fetching users ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
}

export const createUser = async (req, res) => {
    const user = req.body; // user will send this data

    if (!user.first_name || !user.last_name || !user.email || !user.password || !user.role) {
        return res.status(404).json({ success: false, message: "please provide all fields " })
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in create User ", error.message);
        res.status(500).json({ success: false, message: "server error" })

    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted " });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Please provide email and password");
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("Invalid email");
            return res.status(401).json({ success: false, message: "Invalid email" });
        }

        if (user.password !== password) {
            // return res.status(401).json({ success: false, message: "Invalid email or password" });
            console.log("Wrong Password");
            return res.status(401).json({ success: false, message: "Wrong Passowrd" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in login User ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
}