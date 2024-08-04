"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usaha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usaha.hasMany(models.Staff, {
        foreignKey: "usaha_id",
      });
    }
  }
  Usaha.init(
    {
      name: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      img: DataTypes.STRING,
      path: DataTypes.TEXT,
      desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Usaha",
    }
  );
  return Usaha;
};
