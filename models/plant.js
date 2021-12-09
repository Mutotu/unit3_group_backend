'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.plant.belongsToMany(models.order, { through: 'plantOrder' });
    }
  };
  plant.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plant',
  });
  return plant;
};