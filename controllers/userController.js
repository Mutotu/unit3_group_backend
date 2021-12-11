const models = require("../models");

const userController = {};

userController.create = async (req, res) => {
  try {
    const user = await models.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    console.log(user);

    res.json({ user });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
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
    //when ready, use this below
    if (foundUser && foundUser.password === req.body.password) {
      console.log("found user:", foundUser);
      res.json({ foundUser });
    }
    else {
      res.status(400).json({ message: "No user found." }); //=> return nothing
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
