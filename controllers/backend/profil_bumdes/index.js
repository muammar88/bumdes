const fs = require("fs");
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
 * Fungsi untuk menambah profil baru
 **/
controllers.add_profil_bumdes = async (req, res) => {
  const errors = validationResult(req);
  if (req.file == undefined) {
    errors.push = {
      value: "",
      msg: "Photo Wajib Diupload.",
      param: "file",
      location: "body",
    };
  }
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // method untuk menambahkan profil baru
    await model_cud.add_profil_bumdes();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menambah Profil Baru Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menambah Profil Baru Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk menghapus profil dari database
 **/
controllers.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_profil();
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete();
    // get response
    if (await model_cud.response()) {
      // delete photo lama
      if (data.error == false) {
        const oldFile = process.cwd() + "/public/img/profil/" + data.data.img;
        await fs.unlink(oldFile, function (err) {
          if (err) {
            console.log("File lama gagal dihapus");
          }
        });
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Menghapus Profil Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menghapus Profil Gagal Dilakukan.",
      });
    }
  }
};

controllers.get_info_edit_profil = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info_usaha = await model_r.get_info_edit_profil();
    // get response
    if (info_usaha.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Profil Berhasil Didapatkan.",
        data: info_usaha.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Profil Gagal Didapatkan.",
      });
    }
  }
};

controllers.update_profil_bumdes = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_profil();
    const model_cud = new Model_cud(req);
    // update
    await model_cud.update();
    // get response
    if (await model_cud.response()) {
      if (req.file != undefined) {
        // delete photo lama
        if (data.error == false) {
          const oldFile = process.cwd() + "/public/img/profil/" + data.data.img;
          await fs.unlink(oldFile, function (err) {
            if (err) {
              console.log("File lama gagal dihapus");
            }
          });
        }
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Memperbaharui Usaha Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Memperbaharui Usaha Gagal Dilakukan.",
      });
    }
  }
};

module.exports = controllers;
