const User = require('../model/user.model');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({username, email, password}); 
   await newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { signup }; 