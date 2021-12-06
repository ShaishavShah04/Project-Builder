/* Import */ 
import express from "express";
import authRouter from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import projectRouter from "./routes/project.js";

/* Init */
const app = express();

/* MiddleWare */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(cookieParser())
// app.use(morgan("dev"))

/* Routes */
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

export default app;