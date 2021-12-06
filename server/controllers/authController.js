import bcrypt from "bcrypt";
import {User} from "../models/userModel.js";
import {generateAccessToken, generateRefreshToken} from "./authHelpers.js";

export const post_login_handler = async (req, res) => {
    try { 
        // --- Destructure out info
        const {email, password} = req.body;

        // Check Info
        if (!email || !password) {
            return res.status(400).json({msg: "Not all fields are valid!"});
        }

        // -- Check Password
        const user = await User.findOne({ email: email });

        if (! user) 
            return res.status(400).json({msg: "No account with that email found!"})

        const isMatch = await bcrypt.compare(password, user.password);

        if (! isMatch) 
            res.status(401).json({msg: "Invalid credentials!"});
        


        // -- Send Credentials
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            maxAge: 300000, // 5 minutes
            httpOnly: true
        })

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1.577e7, // 6 months
            httpOnly: true
        })

        res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })

    } catch (error) {
        res.status(500).json({err: error.message});
    }
};

export const post_signup_handler = async (req, res) => {

    try { // --- Destructure out info
        const {email, password, firstName, lastName} = req.body;

        // -- Checks

        // Check Info
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({msg: "Not all fields are valid!"});
        }
        // Check for existing email!
        const existingEmail = await User.findOne({email: email});
        if (existingEmail) 
            return res.status(400).json({msg: "Email already in use! Try another email! Try logging in if this email is yours"});
        


        // -- Generate Hashed Password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // -- Creating a new user!
        const newUser = new User({firstName, lastName, email, password: hashedPassword});

        // -- Save and Response
        const savedUser = await newUser.save();
        res.status(201).json({ user: savedUser});

    } catch (error) {
        res.status(500).json({err: error.message});
    }
}

export const post_logout_handler = async (req, res) => {
    const user = req.user;

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json(user);
}

export const post_isAuth_handler = (req, res) => {
    res.status(200).json({msg: "Logged in!"});
}
