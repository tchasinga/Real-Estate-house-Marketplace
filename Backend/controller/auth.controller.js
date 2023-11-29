const User = require('../model/user.model');
const bycrypt = require('bcrypt');
const errorhandler = require('../Utils/error');

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

module.exports = { signup , getUsers }; 