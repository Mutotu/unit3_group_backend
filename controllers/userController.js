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
      //  //reassign req.id = foundUSer.id   whatever
      req.userId = foundUser.id;
    } else {
      res.json(null); //=> return nothing
    }

    console.log("found user:", foundUser);
    res.json({ foundUser });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// verfiy the user
userController.verify = async (req, res) => {
  try {
    const veryfiedUser = await models.user.findOne({
      where: {
        id: req.headers.authorization,
      },
    });
    console.log(veryfiedUser);
    // if verfied, then res.json
    if (veryfiedUser) {
      console.log("verfied user: ", veryfiedUser);
      res.json({ veryfiedUser });
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
