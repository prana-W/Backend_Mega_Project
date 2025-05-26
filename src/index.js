import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js";

//! Below is a way for including the package (if we had used commonjs type in package.json instead of module)
// require ('dotenv').config({path: './env'});
// If using this, then we would simply require the following in our package.json in scripts: "dev" : 'nodemon src/index.js'

import dotenv from "dotenv";
dotenv.config(
    {path: './env'}
);

const port = process.env.PORT || 8000;


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

//* connectDB() is returnning a promise, therefore we handle it here.
connectDB()
    .then(() => {
//TODO: below is done by us.
        app.on("error", (err) => {
            console.log("Error in opening app", err);
        })

        app.listen(port, () => console.log (`Server is running at port ${port}`));
    })
    .catch(err => console.log('MONGODB connection failed!', err));


// connectDB() is used to handle the mongoose.connect() promise, which on completion returns a promise which we return from connectDB(). This returned promise is handled here using .then(). If the returned promise in connectDB() was rejected/not fulfilled, it would first enter the catch block inside the async function from where the error was throw out, which gets handled in the .catch() here.