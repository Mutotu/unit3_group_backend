const userRouter = require("express").Router();

const userController = require("../controllers/userController");

userRouter.post("/signup", userController.create);
userRouter.get("/login", userController.findUser);
userRouter.get("/verify", userController.verify);

module.exports = userRouter;
