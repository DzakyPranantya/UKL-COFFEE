'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.order_detail,{
        foreignKey: 'order_id', as: 'listcoffee'
      })
    }
  }
  order_list.init({
    orderID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_name: DataTypes.STRING,
    order_type: DataTypes.STRING,
    order_date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};