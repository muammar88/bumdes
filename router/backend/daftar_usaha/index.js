const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/daftar_usaha/index");
const helper = require("../../../helpers/backend/daftar_usaha/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// FILE
var multer = require("multer");

// define storage post
var storage_post = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/img/usaha");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// ROUTER
const router = express.Router();

router.post(
  "/Users/Daftar_usaha/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Daftar_usaha/add_usaha",
  [verify_token],
  multer({ storage: storage_post }).single("photo"),
  body("name").notEmpty().withMessage("Nama Usaha Tidak Boleh Kosong").trim(),
  body("alamat")
    .notEmpty()
    .withMessage("Alamat Usaha Tidak Boleh Kosong")
    .trim(),
  body("deskripsi")
    .notEmpty()
    .withMessage("Deskripsi Usaha Tidak Boleh Kosong")
    .trim(),
  controllers.add_usaha
);

router.post(
  "/Users/Daftar_usaha/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Cerita Kami Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

router.post(
  "/Users/Daftar_usaha/get_info_usaha",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_usaha
);

router.post(
  "/Users/Daftar_usaha/update_usaha",
  [verify_token],
  multer({ storage: storage_post }).single("photo"),
  body("id")
    .notEmpty()
    .withMessage("ID Usaha Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("name").notEmpty().withMessage("Nama Usaha Tidak Boleh Kosong").trim(),
  body("alamat")
    .notEmpty()
    .withMessage("Alamat Usaha Tidak Boleh Kosong")
    .trim(),
  body("deskripsi")
    .notEmpty()
    .withMessage("Deskripsi Usaha Tidak Boleh Kosong")
    .trim(),
  controllers.update_usaha
);

module.exports = router;
