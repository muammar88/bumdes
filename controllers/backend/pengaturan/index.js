const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
//const Model_cud = require("./Model_cud");

const controllers = {};

/**
 * Fungsi untuk mengambil info pengaturan
 **/
controllers.get_info_pengaturan = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.get_info_pengaturan();
  res.status(200).json(data);
};

controllers.update_pengaturan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    // const model_r = new Model_r(req);
    // const info = await model_r.get_info_edit_pegawai();
    // // get response
    // if (info.error == false) {
    //   res.status(200).json({
    //     error: false,
    //     error_msg: "Info Edit Pegawai Berhasil Didapatkan.",
    //     data: info.data,
    //     value: info.value,
    //   });
    // } else {
    //   res.status(400).json({
    //     error: true,
    //     error_msg: "Info Edit Pegawai Gagal Didapatkan.",
    //   });
    // }
  }
};
module.exports = controllers;
