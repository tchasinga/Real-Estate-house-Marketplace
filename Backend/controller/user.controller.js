const errorhandler = require("../Utils/error");
const bycrypt =  require('bcrypt');
const User = require("../model/user.model.js");

 const test = (req,  res) =>{
    res.json({message: "Welcome to the backend!"});
}

// Update user with his all  informations
const updateUser = async (req, res, next) =>{
    try {
        if(req.body.password){
            req.body.password =  bycrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new: true});

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest); 
    } catch (error) {
     next(error)
    }
}

// Deleting a user from the database
const deleteUser = async (req, res, next) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User were deleted successfully");
    } catch (error) {
        next(error);
    }
}

module.exports = { test , updateUser , deleteUser};