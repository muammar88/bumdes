const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
const Model_cud = require("./Model_cud");

const controllers = {};

controllers.server_side;

/**
 * Fungsi untuk menampilkan daftar server
 **/
controllers.server_side = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.server_side();
  res.status(200).json(data);
};

/**
 * Fungsi untuk menambahkan pengguna baru
 **/
controllers.add_pengguna = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // add pengguna process
    await model_cud.add_pengguna();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Penambahan Pengguna Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Penambahan Pengguna Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk menghapus pengguna
 **/
controllers.delete_pengguna = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // delete pengguna
    await model_cud.delete_pengguna();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Delete Pengguna Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Delete Pengguna Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk mengambil info edit pengguna
 **/
controllers.get_info_edit_pengguna = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.get_info_edit_pengguna();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Pengguna Berhasil Didapatkan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Pengguna Gagal Didapatkan.",
      });
    }
  }
};

/**
 * Fungsi untuk mengupdate data pengguna
 **/
controllers.update_pengguna = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // update pengguna
    await model_cud.update_pengguna();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Memperbaharui Pengguna Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Memperbaharui Pengguna Gagal Dilakukan.",
      });
    }
  }
};

module.exports = controllers;
