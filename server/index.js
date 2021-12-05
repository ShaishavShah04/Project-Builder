import { PORT, DB_URL } from "./secret_stuff.js"
import app from "./app.js"
import mongoose from "mongoose";

/* Listening */

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})

mongoose.connect(DB_URL)
    .then(()=>console.log("Connected!"))
    .catch(err => console.log(err));

