const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
const Model_cud = require("./Model_cud");

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
  console.log("-------------1-----------------");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // update process
    await model_cud.update();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg: "Proses Update Pengaturan Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Proses Update Pengaturan Gagal Dilakukan.",
      });
    }
  }
};
module.exports = controllers;
