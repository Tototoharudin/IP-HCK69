"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.hasMany(models.Anime, {
        foreignKey: "ScoreId",
      });
    }
  }
  Score.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Score",
    }
  );
  return Score;
};
