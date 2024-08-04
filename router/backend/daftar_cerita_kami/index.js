const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/daftar_cerita_kami/index");
const helper = require("../../../helpers/backend/daftar_cerita_kami/index");

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
    callback(null, "./public/img/cerita_aksi");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// ROUTER
const router = express.Router();

router.post(
  "/Users/Daftar_cerita_kami/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Daftar_cerita_kami/add_cerita_kami",
  [verify_token],
  multer({ storage: storage_post }).single("photo"),
  body("judul").notEmpty().withMessage("Judul Tidak Boleh Kosong").trim(),
  body("deskripsi_cerita")
    .notEmpty()
    .withMessage("Deskripsi Cerita Tidak Boleh Kosong")
    .trim(),
  controllers.add_cerita_kami
);

router.post(
  "/Users/Daftar_cerita_kami/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Cerita Kami Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

router.post(
  "/Users/Daftar_cerita_kami/get_info_edit_cerita_kami",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Cerita Kami Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_cerita_kami
);

router.post(
  "/Users/Daftar_cerita_kami/update_cerita_kami",
  [verify_token],
  multer({ storage: storage_post }).single("photo"),
  body("id")
    .notEmpty()
    .withMessage("ID Cerita Kami Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("judul").notEmpty().withMessage("Judul Tidak Boleh Kosong").trim(),
  body("deskripsi_cerita")
    .notEmpty()
    .withMessage("Deskripsi Cerita Tidak Boleh Kosong")
    .trim(),
  controllers.update_cerita_kami
);

module.exports = router;
