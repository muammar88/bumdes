"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pendapatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pendapatan.belongsTo(models.Staff, {
        foreignKey: "staff_id",
      });
    }
  }
  Pendapatan.init(
    {
      kode: DataTypes.STRING,
      staff_id: DataTypes.INTEGER,
      keterangan: DataTypes.TEXT,
      pendapatan: DataTypes.INTEGER,
      pengeluaran: DataTypes.INTEGER,
      sisa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pendapatan",
    }
  );
  return Pendapatan;
};
