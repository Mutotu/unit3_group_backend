const ordersRouter = require("express").Router();
const ordersController = require("../controllers/ordersController");

// ----------------------------------------
// | Set routes (base route is '/orders'). |
// ----------------------------------------

// GET '/' - Return all of the logged-in user's orders.
ordersRouter.get('/', ordersController.getAllOrders);

// GET '/:orderId' - Return one of the logged-in user's orders.
ordersRouter.get('/:orderId', ordersController.getOneOrder);

// POST '/new' - Create a new order for the logged-in user.
ordersRouter.post('/new', ordersController.createOrder);

// Export the userRouter as an express module for use in 'server.js'.
module.exports = ordersRouter;
