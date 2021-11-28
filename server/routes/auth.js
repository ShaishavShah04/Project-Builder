import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { config } from "dotenv";

const SECRET_KEY =  "mySecretKey";
const REFRESH_KEY =  "mySecretKey";


const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, SECRET_KEY, {
      expiresIn: "6m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, REFRESH_KEY, {
        expiresIn: "200d"
    } );
};

const verify = (req, res, next) => {

    try {
        const { accessToken, refreshToken } = req.cookies;
        // Check access token
        if (accessToken) {
            jwt.verify(accessToken, SECRET_KEY, (err, user)=>{
                if (!err) {
                    req.user = user;
                    return next();
                }
            });
        } else if (refreshToken) {
        // Check Refresh Token ( since access token is not valid / provided )
            // Check refresh is valid
            jwt.verify(refreshToken, REFRESH_KEY, (err, payload) => {
                if (err) {
                    return res.status(401).json({ msg: "Please login!" })
                } else {
                    const newAccessToken = generateAccessToken(payload);
                    res.cookie("accessToken", newAccessToken, {
                        maxAge: 300000, // 5 minutes
                        httpOnly: true,
                    });
                    req.user = payload;
                    return next();
                }
            })
        } else {
            res.status(401).json({ msg: "Please login!" });
        }
        
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

const authRouter = Router();

authRouter.post("/login", async (req, res)=>{
    try {
        //--- Destructure out info
        const { email, password } = req.body;

        // -- Checks
        
        // Check Info
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }
        
        // -- Check Password
        const user =  await User.findOne({ email: email });
        
        if (!user) return res.status(400).json({ msg: "No account with that email found!"})
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) res.status(401).json({ msg: "Invalid credentials!"});

        //-- Send Credentials
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            maxAge: 300000, // 5 minutes
            httpOnly: true,
        })

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1.577e7, // 6 months
            httpOnly: true,
        })
        
        res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        })

    } catch (error) {

    }
})

authRouter.post("/signup", async (req, res)=>{
    
    try {

        //--- Destructure out info
        const { email, password, firstName, lastName } = req.body;
        
        // -- Checks
        
        // Check Info
        if (!email || !password || !firstName || !lastName ) {
            return res.status(400).json({ msg: "Not all fields are valid!" });
        }
        // Check for existing email!
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) return res.status(400).json({ msg: "Email already in use! Try another email! Try logging in if this email is yours"});
        
        // -- Generate Hashed Password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // -- Creating a new user!
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // -- Save and Response
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

authRouter.delete("/delete", verify, (req, res)=>{
    res.json({ msg: "Delete good!" });
})

export default authRouter;
