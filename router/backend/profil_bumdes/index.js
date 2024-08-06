const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/profil_bumdes/index");
const helper = require("../../../helpers/backend/profil_bumdes/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// FILE
var multer = require("multer");

// define storage profil
var storage_profil = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/img/profil");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// ROUTER
const router = express.Router();

router.post(
  "/Users/Profil_bumdes/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Profil_bumdes/add_profil_bumdes",
  [verify_token],
  multer({ storage: storage_profil }).single("photo"),
  body("deskripsi_profil")
    .notEmpty()
    .withMessage("Deskripsi Profil Tidak Boleh Kosong")
    .trim(),
  controllers.add_profil_bumdes
);

router.post(
  "/Users/Profil_bumdes/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Profil Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

router.post(
  "/Users/Profil_bumdes/get_info_edit_profil",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Profil Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_profil
);

router.post(
  "/Users/Profil_bumdes/update_profil_bumdes",
  [verify_token],
  multer({ storage: storage_profil }).single("photo"),
  body("id")
    .notEmpty()
    .withMessage("ID Profil Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("deskripsi_profil")
    .notEmpty()
    .withMessage("Deskripsi Profil Tidak Boleh Kosong")
    .trim(),
  controllers.update_profil_bumdes
);

module.exports = router;
