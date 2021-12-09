'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plantOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  plantOrder.init({
    orderId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plantOrder',
  });
  return plantOrder;
};