import express from "express";

import User from "../Models/User.mjs";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { username, mail, uid } = req.body;

    try {
        const newUser = new User({ username, mail, uid });
        await newUser.save();
        res.status(201).json({ message: "User Registered In Database!" });
    } catch (error) {
        console.error("Register Route Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { uid } = req.body;

    try {
        const user = await User.findOne({ uid });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Invalid Credentials!" });
        }
    } catch (error) {
        console.error("Login Route Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
