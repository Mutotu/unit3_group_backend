// Install the required libraries.
const models = require("../models");
// Used for password hashing.
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Used for authentication of the user.
const jwt = require('jsonwebtoken');

const userController = {};

userController.create = async (req, res) => {
  try {
    // Hash the new user's password before storing it.
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // Attempt to create the new user. This will fail if the username of email has already been taken.
    const user = await models.user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // If the user is successfully made, return the user.
    res.json({ user });
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
};

//find a user and check if the password is correct and if so, send res.json
userController.findUser = async (req, res) => {
  try {
    const foundUser = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    // After finding the user with that email, check if the given password matches the password for that user.
    let passwordMatch = false;
    if (foundUser) {
      console.log("found user:", foundUser);
      passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);
      // If the found user's password matches, return the user.
      if (passwordMatch) {
        res.json({ foundUser });
      }
      // If the found user's password doesn't match, return an error message, but no user.
      else {
        res.status(400).json({ message: "Incorrect email / password combination." });
      }
    }
    //If no user was found, return an error message, but no user.
    else {
      res.status(400).json({ message: "No user found." });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// verfiy the user
userController.verify = async (req, res) => {
  try {
    const verifiedUser = await models.user.findOne({
      where: {
        id: req.headers.authorization,
      },
    });
    // if verfied, then res.json
    if (verifiedUser) {
      console.log("verfied user: ", verifiedUser);
      res.json({ verifiedUser: verifiedUser });
    } else {
      console.log("not verfied");
      res.json({ message: "User not found" });
    }
    //see why catch is not working
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = userController;
