const errorhandler = require("../Utils/error");
const bycrypt =  require('bcrypt');
const User = require("../model/user.model.js");

 const test = (req,  res) =>{
    res.json({message: "Welcome to the backend!"});
}

const updateUser = async (req, res, next) =>{
    if(req.user.id !== req.params.id) return next(errorhandler(401,"You can update only your account!"));
    try {
        if(req.body.password){
            req.body.password = bycrypt.hashSync(req.body.password, 10);
        }
        const  updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
               avatar: req.body.avatar,
                // coverPicture: req.body.coverPicture,
                // followers: req.body.followers,
                // following: req.body.following,
                // isAdmin: req.body.isAdmin,
                // desc: req.body.desc,
                // city: req.body.city,
                // from: req.body.from,
                // relationship: req.body.relationship,
            }
        },{new: true});
          const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);
    } catch (error) {
       next(error);  
    }
}
module.exports = { test , updateUser };