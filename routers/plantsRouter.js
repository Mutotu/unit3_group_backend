const plantsRouter = require("express").Router();

const plantsController = require("../controllers/plantsController");

plantsRouter.get("/", plantsController.get)

module.exports = plantsRouter;
