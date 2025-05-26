import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
        // To optimise searching in any field, we turn index to true
    },
    //watchHistory is an array
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
    ],
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true, p
        //We will provide Cloudinary URLp
    },
    coverImage: {
        type: String,
    },
    // there is a standard practice to always keep the encrypted password in the database
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    }

}, {timestamps: true});

// 'save' is an event here on which the function will be triggered and since it is pre middleware function, it will get run just before saving the data. Also don't use arrow function as it will not get the refernece of 'this' keyword. Also use async keyword, as the task inside takes some time to get exceuted.

// next is the name of the flag of a middleware, which gets call which transfers the flag forward.

// isModified is a built-in method
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()

})

// Adding our own custom method to userSchema
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//async is not required for both the below methods, as the process it very fast
userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        //below is payload (we can pass as many as we want, _id is enough which is stored in the mongoDB)
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {

    return await jwt.sign(
        //there is less payload in Refresh token
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User', userSchema);