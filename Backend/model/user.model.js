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
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
export default User;