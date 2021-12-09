const userRouter = require("express").Router();

const userController = require("../controllers/userController");

userRouter.post("/signup", userController.create);

module.exports = userRouter;
