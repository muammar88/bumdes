const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/daftar_pengguna/index");
const helper = require("../../../helpers/backend/daftar_pengguna/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Daftar_pengguna/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Daftar_pengguna/add_pengguna",
  [verify_token],
  body("fullname")
    .notEmpty()
    .withMessage("Nama Lengkap Pengguna Tidak Boleh Kosong")
    .trim(),
  body("status")
    .notEmpty()
    .withMessage("Alamat Usaha Tidak Boleh Kosong")
    .trim()
    .isIn(["administrator", "member"]),
  body("username")
    .notEmpty()
    .withMessage("Deskripsi Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_username),
  body("password").notEmpty().withMessage("Password Tidak Boleh Kosong").trim(),
  body("konfirmasi_password")
    .trim()
    .custom(helper.check_password_konfirmasi_user),
  controllers.add_pengguna
);

router.post(
  "/Users/Daftar_pengguna/delete_pengguna",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pengguna Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete_pengguna
);

router.post(
  "/Users/Daftar_pengguna/get_info_edit_pengguna",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pengguna Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_pengguna
);

router.post(
  "/Users/Daftar_pengguna/update_pengguna",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pengguna Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("fullname")
    .notEmpty()
    .withMessage("Nama Lengkap Pengguna Tidak Boleh Kosong")
    .trim(),
  body("status")
    .notEmpty()
    .withMessage("Alamat Usaha Tidak Boleh Kosong")
    .trim()
    .isIn(["administrator", "member"]),
  body("username")
    .notEmpty()
    .withMessage("Deskripsi Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_username),
  body("password").trim(),
  body("konfirmasi_password")
    .trim()
    .custom(helper.check_password_konfirmasi_user),
  controllers.update_pengguna
);

module.exports = router;
