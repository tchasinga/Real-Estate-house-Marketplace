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
        default: "https://imgs.search.brave.com/km7CvfdD0vDUDgEoBI5srkLJiTZ3v_VGK2zEBWnVZOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE5LzMyLzkz/LzM2MF9GXzExOTMy/OTM4N19zVVRiVWRl/eWhrMG51aE53NVdh/RnZPeVFGbXhlcHBq/WC5qcGc",
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;