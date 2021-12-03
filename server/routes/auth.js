import { Router } from "express";
import { post_login_handler, post_logout_handler, post_signup_handler, post_isAuth_handler } from "../controllers/authController.js";
import { verify } from "../controllers/authHelpers.js";

const authRouter = Router();

authRouter.post("/login", post_login_handler);

authRouter.post("/signup", post_signup_handler);

authRouter.get("/isAuth", post_isAuth_handler);

authRouter.post("/logout", verify, post_logout_handler);

export default authRouter;
