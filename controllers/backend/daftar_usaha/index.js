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
 * Fungsi untuk menambah usaha baru
 **/
controllers.add_usaha = async (req, res) => {
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
    // method untuk menambahkan usaha baru
    await model_cud.add_usaha();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menambah Usaha Baru Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menambah Usaha Baru Gagal Dilakukan.",
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
    const model_r = new Model_r(req);
    const data = await model_r.info_usaha();
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete();
    // get response
    if (await model_cud.response()) {
      // delete photo lama
      if (data.error == false) {
        const oldFile = process.cwd() + "/public/img/usaha/" + data.data.img;
        await fs.unlink(oldFile, function (err) {
          if (err) {
            console.log("File lama gagal dihapus");
          }
        });
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Menghapus Usaha Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menghapus Usaha Gagal Dilakukan.",
      });
    }
  }
};

controllers.get_info_usaha = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info_usaha = await model_r.get_info_usaha();
    // get response
    if (info_usaha.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Usaha Berhasil Didapatkan.",
        data: info_usaha.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Usaha Gagal Didapatkan.",
      });
    }
  }
};

controllers.update_usaha = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_usaha();
    const model_cud = new Model_cud(req);
    // update usaha
    await model_cud.update_usaha();
    // get response
    if (await model_cud.response()) {
      if (req.file != undefined) {
        // delete photo lama
        if (data.error == false) {
          const oldFile = process.cwd() + "/public/img/usaha/" + data.data.img;
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
