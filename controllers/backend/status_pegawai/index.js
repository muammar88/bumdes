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
 * Fungsi untuk menambah status pegawai baru
 **/
controllers.add_status_pegawai = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // method untuk menambahkan status pegawai baru
    await model_cud.add_status_pegawai();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menambah Status Pegawai Baru Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menambah Status Pegawai Baru Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk menghapus usaha dari database
 **/
controllers.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menghapus Status Pegawai Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menghapus Status Pegawai  Gagal Dilakukan.",
      });
    }
  }
};

controllers.get_info_edit_status_pegawai = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.get_info_edit_status_pegawai();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Status Pegawai Berhasil Didapatkan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Status Pegawai Gagal Didapatkan.",
      });
    }
  }
};

controllers.update_status_pegawai = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // update status pegawai
    await model_cud.update_status_pegawai();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Memperbaharui Status Pegawai Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Memperbaharui Status Pegawai Gagal Dilakukan.",
      });
    }
  }
};

module.exports = controllers;
