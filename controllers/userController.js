const models = require("../models");

const userController = {};

userController.create = async (req, res) => {
  console.log("lollololo");
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

module.exports = userController;
