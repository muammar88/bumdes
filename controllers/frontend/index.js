const fs = require("fs");
const process = require("process");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { dirname } = require("path");
var request = require("request");
const Model_r = require("./Model_r");

const frontend = require("../../helpers/frontend");

const { validationResult } = require("express-validator");

const controllers = {};

controllers.main = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.get_data_frontend();

  res.render("frontend/index", {
    usaha: data.usaha,
    cerita_kami: data.cerita_kami,
  });
};

controllers.kontak = async (req, res) => {
  res.render("frontend/kontak_page");
};

controllers.profil = async (req, res) => {
  res.render("frontend/profil_page");
};

controllers.login = async (req, res) => {
  res.render("frontend/login_page");
};

// controllers.laporan = async (req, res) => {
//   res.render("frontend/laporan_page");
// };

// controllers.kontak_kami = async (req, res) => {
//   res.render("frontend/kontak_kami_page");
// };

// controllers.rekening_zakat = async (req, res) => {
//   res.render("frontend/rekening_zakat_page");
// };

// controllers.artikel = async (req, res) => {
//   res.render("frontend/artikel_page");
// };

// controllers.cerita_aksi = async (req, res) => {
//   res.render("frontend/cerita_aksi_page");
// };

// controllers.bayar_zakat = async (req, res) => {
//   res.render("frontend/bayar_zakat_page");
// };

// controllers.infak = async (req, res) => {
//   res.render("frontend/infak_page");
// };

// controllers.fidyah = async (req, res) => {
//   res.render("frontend/fidyah_page");
// };

// controllers.kalkulator_zakat = async (req, res) => {
//   res.render("frontend/kalkulator_zakat_page");
// };

// controllers.masuk = async (req, res) => {
//   res.render("frontend/masuk_page");
// };

// controllers.daftar = async (req, res) => {
//   res.render("frontend/daftar_page");
// };

// controllers.bantuan_sosial = async (req, res) => {
//   res.render("frontend/bantuan_sosial_page");
// };
module.exports = controllers;
