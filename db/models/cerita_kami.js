'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cerita_kami extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cerita_kami.init({
    title: DataTypes.TEXT,
    img: DataTypes.TEXT,
    path: DataTypes.TEXT,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Cerita_kami',
  });
  return Cerita_kami;
};