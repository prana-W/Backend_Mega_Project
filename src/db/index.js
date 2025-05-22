import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

//! SECOND APPROACH FOR DB CONNECTION

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\nMONGODB connected! DB Host: ${connectionInstance.connection.host}`);

        //? See what we get in console.log () for above. Check what is connectionInstance in the console...
    }
    catch (error) {
        console.error("MONGODB connection error!", error);
        process.exit(1);
        //? The above is a concept in Node.js. Read about process and process.exit()
    }
}

export default connectDB;