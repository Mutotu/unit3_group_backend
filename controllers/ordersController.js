// Get required libraries.
const models = require("../models");

// Create the base controller object.
const ordersController = {};

// --------------------
// | Route functions. |
// --------------------

// ---------------------------------------------------------
// *** GET '/' - Return all of the logged-in user's orders.
// ---------------------------------------------------------
ordersController.getAllOrders = async function (req, res) {
    try {
        let orders = [];
        const loggedInUser = await models.user.findByPk(req.verifiedId);
        const usersOrders = await loggedInUser.getOrders();
        for (let i = 0; i < usersOrders.length; i++) {
            const order = {};
            order.orderInfo = usersOrders[i];
            order.plants = await usersOrders[i].getPlants();
            orders.push(order);
        }
        res.json(orders);

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error retrieving user's orders." });
    }
}

// ----------------------------------------------------------------------
// *** GET '/:orderId' - Return one of the logged-in user's order.
// ----------------------------------------------------------------------
ordersController.getOneOrder = async function (req, res) {
    try {
        const loggedInUser = await models.user.findByPk(req.verifiedId);
        const order = {};
        const orderInfo = await models.order.findOne({
            where: {
                id: req.params.orderId,
                userId: req.verifiedId
            }
        });
        const plants = await orderInfo.getPlants();
        order.orderInfo = orderInfo;
        order.plants = plants;
        res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "Error retrieving single order." });
    }
}

// ------------------------------------------------------------------------
// *** POST '/new' - Create a new order for the logged-in user.
//          Requires:
//              - userId passed through headers as 'Authorization'
//              - address passed through body as an object with needed info
//              - creditNum passed through body
//              - plants passed through body as an array of plant objects
// ------------------------------------------------------------------------
ordersController.createOrder = async function (req, res) {
    try {
        const loggedInUser = await models.user.findByPk(req.verifiedId);
        const newOrder = await loggedInUser.createOrder({
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip,
            creditNum: req.body.creditNum
        });
        console.log(newOrder);
        for (let i = 0; i < req.body.plants.length; i++) {
            // Must manually create each plantOrder row (can't use 'magic method' - addPlant() - because the magic method won't allow the storage of duplicates of one plant, e.g., two fiddle leaf figs that were in the cart during checkout would only be stored in the database once and the order would show that the user only bought one fiddle leaf fig).
            // Manually creating each plantOrder row allows duplicates.
            await models.plantOrder.create({
                orderId: newOrder.dataValues.id,
                plantId: req.body.plants[i].id
            })
            /* const plantToAdd = await models.plant.findByPk(req.body.plants[i].id);
            await newOrder.addPlant(plantToAdd); */
        }
        res.send({ message: "Order saved successfully." });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Unable to create order." });
    }
}


// Export the ordersController as an express module for use in the ordersRouter.
module.exports = ordersController;
