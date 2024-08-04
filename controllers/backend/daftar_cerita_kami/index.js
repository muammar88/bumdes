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
 * Fungsi untuk mengambil info sinkronisasi produk IAK
 **/
controllers.add_cerita_kami = async (req, res) => {
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
    // method untu mengubah urutan
    await model_cud.add_cerita_kami();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menambah Cerita Baru Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menambah Cerita Baru Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk menghapus cerita kami dari database
 **/
controllers.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_cerita_kami();
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete();
    // get response
    if (await model_cud.response()) {
      // delete photo lama
      if (data.error == false) {
        const oldFile =
          process.cwd() + "/public/img/cerita_aksi/" + data.data.img;
        await fs.unlink(oldFile, function (err) {
          if (err) {
            console.log("File lama gagal dihapus");
          }
        });
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Menghapus Cerita Kami Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menghapus Cerita Kami Gagal Dilakukan.",
      });
    }
  }
};

controllers.get_info_edit_cerita_kami = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info_cerita = await model_r.get_info_edit_cerita_kami();
    // get response
    if (info_cerita.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Cerita Kami Berhasil Didapatkan.",
        data: info_cerita.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Cerita Kami Gagal Didapatkan.",
      });
    }
  }
};

controllers.update_cerita_kami = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_cerita_kami();
    const model_cud = new Model_cud(req);
    // update cerita kami
    await model_cud.update_cerita_kami();
    // get response
    if (await model_cud.response()) {
      if (req.file != undefined) {
        // delete photo lama
        if (data.error == false) {
          const oldFile =
            process.cwd() + "/public/img/cerita_aksi/" + data.data.img;
          await fs.unlink(oldFile, function (err) {
            if (err) {
              console.log("File lama gagal dihapus");
            }
          });
        }
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Memperbaharui Cerita Kami Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Memperbaharui Cerita Kami Gagal Dilakukan.",
      });
    }
  }
};

module.exports = controllers;
