const User = require('../model/user.model');
const bycrypt = require('bcrypt');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
      // Hashing the password
      const hashedPassword = bycrypt.hashSync(password, 10);
      // Creating a new user
  const newUser = new User({username, email, password : hashedPassword});
  try {
    await newUser.save()
    res.json('User added Successfully!')
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = { signup }; 