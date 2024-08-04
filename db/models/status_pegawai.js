"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status_pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status_pegawai.hasMany(models.Staff, {
        foreignKey: "status_id",
      });
    }
  }
  Status_pegawai.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Status_pegawai",
    }
  );
  return Status_pegawai;
};
