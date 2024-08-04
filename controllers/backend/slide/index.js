const fs = require("fs");
const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
const Model_cud = require("./Model_cud");

const controllers = {};

controllers.server_side;

/**
 * Fungsi untuk menampilkan daftar slide
 **/
controllers.server_side = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.server_side();
  res.status(200).json(data);
};

/**
 * Fungsi untuk menambahkan slide baru
 **/
controllers.add_slide = async (req, res) => {
  const errors = validationResult(req);
  if (req.file == undefined) {
    errors.push = {
      value: "",
      msg: "Photo Slide Wajib Diupload.",
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
    // method untuk menambahkan slide baru
    await model_cud.add_slide();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Menambah Slide Baru Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Menambah Slide Baru Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk menghapus slide dari database
 **/
controllers.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_slide();
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete();
    // get response
    if (await model_cud.response()) {
      // delete photo slide lama
      if (data.error == false) {
        const oldFile = process.cwd() + "/public/img/slide/" + data.data.img;
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

// /**
//  * Fungsi untuk menambah status pegawai baru
//  **/
// controllers.add_status_pegawai = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // method untuk menambahkan status pegawai baru
//     await model_cud.add_status_pegawai();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Menambah Status Pegawai Baru Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Menambah Status Pegawai Baru Gagal Dilakukan.",
//       });
//     }
//   }
// };

// /**
//  * Fungsi untuk menghapus usaha dari database
//  **/
// controllers.delete = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // delete process
//     await model_cud.delete();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Menghapus Status Pegawai Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Menghapus Status Pegawai  Gagal Dilakukan.",
//       });
//     }
//   }
// };

controllers.get_info_edit_slide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.get_info_edit_slide();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Edit Slide Berhasil Didapatkan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Edit Slide Gagal Didapatkan.",
      });
    }
  }
};

controllers.update_slide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const data = await model_r.info_slide();
    const model_cud = new Model_cud(req);
    // update cerita kami
    await model_cud.update_slide();
    // get response
    if (await model_cud.response()) {
      if (req.file != undefined) {
        // delete photo lama
        if (data.error == false) {
          const oldFile = process.cwd() + "/public/img/slide/" + data.data.img;
          await fs.unlink(oldFile, function (err) {
            if (err) {
              console.log("File lama gagal dihapus");
            }
          });
        }
      }
      res.status(200).json({
        error: false,
        error_msg: "Proses Memperbaharui Slide Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Memperbaharui Slide Gagal Dilakukan.",
      });
    }
  }
};

// controllers.update_status_pegawai = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // update status pegawai
//     await model_cud.update_status_pegawai();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Memperbaharui Status Pegawai Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Memperbaharui Status Pegawai Gagal Dilakukan.",
//       });
//     }
//   }
// };

module.exports = controllers;
