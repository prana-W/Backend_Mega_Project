import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

//! SECOND APPROACH FOR DB CONNECTION

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\nMONGODB connected! DB Host: ${connectionInstance.connection.host}`);

        //TODO: Kindly check the below. I have added the below statement by my own. Hope it doens't crash... mongoose.connect() is returning a promise, which we store and return back, which gets handled in the index.js
        return connectionInstance;

        //? See what we get in console.log () for above. Check what is connectionInstance in the console...
    }
    catch (error) {
        console.error("MONGODB connection error!", error);
        process.exit(1);
        //? The above is a concept in Node.js. Read about process and process.exit()

        //TODO: Below is also added by me.
        throw error;
        // The above throws the error which will go to .catch block when handling this async function

    }
}

export default connectDB;