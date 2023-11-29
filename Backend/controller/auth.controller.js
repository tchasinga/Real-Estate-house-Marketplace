const User = require('../model/user.model.js');
const bycrypt = require('bcrypt');
const errorhandler = require('../Utils/error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res,  next) => {
  const { username, email, password } = req.body;
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

module.exports = { signup , getUsers , singin}; 