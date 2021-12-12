// ----------------------------------
// | Install the required libraries.
// ----------------------------------
const models = require("../models");
// Used for authentication of the user.
const jwt = require('jsonwebtoken');
// Used for password hashing.
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.create = async (req, res) => {
  try {
    // Hash the new user's password before storing it.
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // Attempt to create the new user. This will fail if the username of email has already been taken.
    const newUser = await models.user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    // Get the relevant user attributes.
    const { dataValues, ...notNeeded } = newUser;
    // If the user is successfully made, create a jwt authorization token to return for said user.
    const authorization = jwt.sign({ id: dataValues.id }, process.env.JWT_SECRET);
    // Return the relevant user attributes.
    const { id, password, createdAt, updatedAt, ...userReturn } = dataValues;
    userReturn.authorization = authorization;
    res.json({ user: userReturn });
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
        // Get the relevant user attributes.
        const { dataValues, ...notNeeded } = foundUser;
        // Create a jwt authorization token to return for the found user.
        const authorization = jwt.sign({ id: dataValues.id }, process.env.JWT_SECRET);
        // Separate the user's data values into only the parts we will return.
        const { password, createdAt, updatedAt, id, ...userReturn } = dataValues;
        userReturn.authorization = authorization;
        res.json({ user: userReturn });
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
    const verifiedUser = await models.user.findByPk(req.verifiedId);
    // if verfied, then res.json
    if (verifiedUser) {
      // Get the relevant user attributes.
      const { dataValues, ...notNeeded } = verifiedUser;
      // Create a jwt authorization token to return for the found user.
      const authorization = jwt.sign({ id: dataValues.id }, process.env.JWT_SECRET);
      // Separate the user's data values into only the parts we will return.
      const { password, createdAt, updatedAt, id, ...userReturn } = dataValues;
      userReturn.authorization = authorization;
      // Return the relevant user info.
      res.json({ user: userReturn });
    } else {
      res.status(400).json({ message: "User not found" });
    }
    //If errored, return the error.
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = userController;
