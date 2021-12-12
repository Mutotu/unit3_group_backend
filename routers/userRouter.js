const userRouter = require("express").Router();

const jwtAuth = require('../controllers/middleware/jwtAuth');
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.create);
userRouter.post("/login", userController.findUser);
userRouter.get("/verify", [jwtAuth.verifyToken], userController.verify);

module.exports = userRouter;
