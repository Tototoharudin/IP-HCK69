"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsTo(models.Score, {
        foreignKey: "ScoreId",
      });
      Anime.hasMany(models.Favorite, {
        foreignKey: "AnimeId",
      });
    }
  }
  Anime.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title Can't be empty",
          },
          notEmpty: {
            msg: "Title Can't be empty",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Can't be empty",
          },
          notEmpty: {
            msg: "Image Can't be empty",
          },
          isUrl: {
            msg: "Image Must be URL Format",
          },
        },
      },
      episode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Episode Can't be empty",
          },
          notEmpty: {
            msg: "Episode Can't be empty",
          },
        },
      },
      watchEps: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0.0,
      },
      ScoreId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Synopsis Can't be empty",
          },
          notEmpty: {
            msg: "Synopsis Can't be empty",
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Genre Can't be empty",
          },
          notEmpty: {
            msg: "Genre Can't be empty",
          },
        },
      },
      trailer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Trailer Can't be empty",
          },
          notEmpty: {
            msg: "Trailer Can't be empty",
          },
          isUrl: {
            msg: "Trailer Must be URL Format",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Watching",
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "TV",
      },
    },
    {
      sequelize,
      modelName: "Anime",
    }
  );
  return Anime;
};
