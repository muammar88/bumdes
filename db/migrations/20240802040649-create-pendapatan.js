"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pendapatans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode: {
        type: Sequelize.STRING,
      },
      staff_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Staffs",
          key: "id",
        },
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      pendapatan: {
        type: Sequelize.INTEGER,
      },
      pengeluaran: {
        type: Sequelize.INTEGER,
      },
      sisa: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pendapatans");
  },
};
