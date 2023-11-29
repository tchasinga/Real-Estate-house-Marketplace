const User = require('../model/user.model.js');
const bycrypt = require('bcrypt');
const errorhandler = require('../Utils/error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res,  next) => {
  const { username, email, password} = req.body;
      // Hashing the password
      const hashedPassword = bycrypt.hashSync(password, 10);
      // Creating a new user
  const newUser = new User({username, email, password : hashedPassword});
  try {
    await newUser.save()
    res.json('User added Successfully!')
  } catch (error) {
    next(error)
  }
}

// Adding get request
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

// Adding a user singing 
const singin =  async(req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email })
    if (!validUser) {
      throw new errorhandler(404, 'User not found in the system')
    }  
    const validPassword = bycrypt.compareSync(password, validUser.password)
    if (!validPassword) {
      throw new errorhandler(401, 'Wrong credentials or password')
    } 
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '4d' })
    const {password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error) 
  } 
}

// Adding auhtation with google
const google = async (req, res, next) =>{
  try {
    const user = await User.findOne({ email: req.body.email })
    if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4d' })
      const {password: pass, ...rest} = user._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bycrypt.hashSync(generatedPassword, 10);
      const newUser = new User({username: req.body.name, email: req.body.email, password : hashedPassword, avatar: req.body.photo});
      await newUser.save();

      // Creating a token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '4d' })
      const {password: pass, ...rest} = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
  }
} 

module.exports = { signup , getUsers , singin , google}; 