import jwt from "jsonwebtoken";
import { SECRET_KEY, REFRESH_KEY } from "../secret_stuff.js"


export const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, SECRET_KEY, {
      expiresIn: "10s",
    });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, REFRESH_KEY, {
        expiresIn: "200d"
    } );
};

export const verify = (req, res, next) => {

    try {
        const { accessToken, refreshToken } = req.cookies;
        let handled = false;

        if (accessToken) {
            // Check Access Token
            jwt.verify(accessToken, SECRET_KEY, (err, user) => {
                if (!err) {
                    req.user = user;
                    handled = true;
                    return next();
                }
            });
        }

        // Try to use refresh token
        if (refreshToken && !handled) {
            jwt.verify(refreshToken, REFRESH_KEY, (err, user) => {
                if (!err) {
                    const newAccessToken = generateAccessToken(user);
                    req.user = user;
                    res.cookie("accessToken", newAccessToken, {
                        maxAge: 300000, // 5 minutes
                        httpOnly: true,
                    });
                    return next();
                } else {
                    return res.status(401).json({ msg: "Access Expired. Please login!" });
                }
            });
            
        } else if (!handled) {
            return res.status(401).json({ msg: "No authorization detected. Login!" });
        }

    } catch (error) {
        res.sendStatus(500);
    }
};