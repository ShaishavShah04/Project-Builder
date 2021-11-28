/* Import */ 
import express from "express";
import authRouter from "./routes/auth.js"
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

/* Init */
const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb+srv://shaishav:mernstack@cluster0.8ctsf.mongodb.net/ProjectBuildR?retryWrites=true&w=majority";


/* MiddleWare */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))
/* Routes */
app.use("/api", authRouter);


/* Listening */

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})

mongoose.connect(DB_URL)
    .then(()=>console.log("Connected!"))
    .catch(err => console.log(err));

