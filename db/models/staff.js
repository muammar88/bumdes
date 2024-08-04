"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Staff.belongsTo(models.Usaha, {
        foreignKey: "usaha_id",
      });
      Staff.belongsTo(models.Status_pegawai, {
        foreignKey: "status_id",
      });
      Staff.hasMany(models.Pendapatan, {
        foreignKey: "staff_id",
      });
    }
  }
  Staff.init(
    {
      usaha_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      kode: DataTypes.STRING,
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Staff",
    }
  );
  return Staff;
};
