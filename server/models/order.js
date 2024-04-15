"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Order.init(
    {
      UserId: DataTypes.INTEGER,
      OrderId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "OrderId Required",
          },
          notEmpty: {
            msg: "OrderId Required",
          },
        },
      },
      amount: DataTypes.INTEGER,
      paidDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
