const models = require("../models");

const plantsController = {};

plantsController.get = async (req, res) => {
    console.log("plants gotten");
    try{
        const allPlants = await models.plant.findAll()
        res.json({allPlants})
    }
    catch(err){
        res.json({message: err})
    }
}


module.exports = plantsController;
