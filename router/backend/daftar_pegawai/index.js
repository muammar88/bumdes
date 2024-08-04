const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/daftar_pegawai/index");
const helper = require("../../../helpers/backend/daftar_pegawai/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Daftar_pegawai/server_side",
  [verify_session],
  controllers.server_side
);

router.get(
  "/Users/Daftar_pegawai/get_info_add_pegawai",
  [verify_token],
  controllers.get_info_add_pegawai
);

router.post(
  "/Users/Daftar_pegawai/add_pegawai",
  [verify_token],
  body("status_pegawai")
    .notEmpty()
    .withMessage("ID Status Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_status_pegawai_id),
  body("usaha")
    .notEmpty()
    .withMessage("ID Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_usaha_id),
  body("fullname")
    .notEmpty()
    .withMessage("Nama Lengkap Tidak Boleh Kosong")
    .trim(),
  body("username")
    .notEmpty()
    .withMessage("Username Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_username_pegawai),
  body("password").trim(),
  body("konfirmasi_password")
    .trim()
    .custom(helper.check_password_konfirmasi_pegawai),
  controllers.add_pegawai
);

router.post(
  "/Users/Daftar_pegawai/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

router.post(
  "/Users/Daftar_pegawai/get_info_edit_pegawai",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_pegawai
);

router.post(
  "/Users/Daftar_pegawai/update_pegawai",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("status_pegawai")
    .notEmpty()
    .withMessage("ID Status Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_status_pegawai_id),
  body("usaha")
    .notEmpty()
    .withMessage("ID Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_usaha_id),
  body("fullname")
    .notEmpty()
    .withMessage("Nama Lengkap Tidak Boleh Kosong")
    .trim(),
  body("username")
    .notEmpty()
    .withMessage("Username Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_username_pegawai),
  body("password").trim(),
  body("konfirmasi_password")
    .trim()
    .custom(helper.check_password_konfirmasi_pegawai),
  controllers.update_pegawai
);

module.exports = router;
