const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
// const Model_cud = require("./Model_cud");
const controllers = {};

controllers.server_side;

/**
 * Fungsi untuk menampilkan daftar pegawai
 **/
controllers.server_side = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.server_side();
  res.status(200).json(data);
};

// // get_info_add_pegawai

// controllers.get_info_add_pegawai = async (req, res) => {
//   const model_r = new Model_r(req);
//   const info_add_pegawai = await model_r.get_info_add_pegawai();

//   // data: { usaha: query_usaha, status_pegawai: query_status },
//   // get response
//   if (info_add_pegawai.error == false) {
//     res.status(200).json({
//       error: false,
//       error_msg: "Info Add Pegawai Berhasil Didapatkan.",
//       data: info_add_pegawai.data,
//     });
//   } else {
//     res.status(400).json({
//       error: true,
//       error_msg: "Info Add Pegawai Gagal Didapatkan.",
//     });
//   }
// };

// controllers.add_pegawai = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // update cerita kami
//     await model_cud.add_pegawai();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Menambah Pegawai Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Menambah Pegawai Gagal Dilakukan.",
//       });
//     }
//   }
// };

// controllers.delete = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // delete pegawai
//     await model_cud.delete();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Menghapus Pegawai Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Menghapus Pegawai Gagal Dilakukan.",
//       });
//     }
//   }
// };

// //

// controllers.get_info_edit_pegawai = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_r = new Model_r(req);
//     const info = await model_r.get_info_edit_pegawai();
//     // get response
//     if (info.error == false) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Info Edit Pegawai Berhasil Didapatkan.",
//         data: info.data,
//         value: info.value,
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Info Edit Pegawai Gagal Didapatkan.",
//       });
//     }
//   }
// };

// controllers.update_pegawai = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // update pegawai
//     await model_cud.update_pegawai();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Memperbaharui Pegawai Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Memperbaharui Pegawai Gagal Dilakukan.",
//       });
//     }
//   }
// };

module.exports = controllers;
