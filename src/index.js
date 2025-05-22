import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";

//! Below is a way for including the pacakge (if we would have used commonjs type in package.json instead of module)
// require ('dotenv').config({path: './env'});
// If using this, then we would simply require the following in our package.json in scripts: "dev" : 'nodemon src/index.js'

import dotenv from "dotenv";
dotenv.config(
    {path: './env'}
);


//! FIRST APPROACH FOR DB CONNECTION
/*

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (err) => {
            console.log("Error in opening app", err);
        })

        app.listen(process.env.PORT, () => {
            console.log(`Listening on port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
})()

 */

//! SECOND APPROACH FOR DB CONNECTION
connectDB();