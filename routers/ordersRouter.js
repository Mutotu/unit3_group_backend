const ordersRouter = require("express").Router();

const jwtAuth = require('../controllers/middleware/jwtAuth');
const ordersController = require("../controllers/ordersController");

// ----------------------------------------
// | Set routes (base route is '/orders'). |
// ----------------------------------------

// GET '/' - Return all of the logged-in user's orders.
ordersRouter.get('/', [jwtAuth.verifyToken], ordersController.getAllOrders);

// GET '/:orderId' - Return one of the logged-in user's orders.
ordersRouter.get('/:orderId', [jwtAuth.verifyToken], ordersController.getOneOrder);

// POST '/new' - Create a new order for the logged-in user.
ordersRouter.post('/new', [jwtAuth.verifyToken], ordersController.createOrder);

// Export the userRouter as an express module for use in 'server.js'.
module.exports = ordersRouter;
