const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // This is to make sure that the username is trimmed
    },
    email: {
        type: String,
        required: true,
        unique: true, // This is to make sure that no two users have the same email
        trim: true, // This is to make sure that the email is triming
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;