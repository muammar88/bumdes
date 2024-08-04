const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/slide/index");
const helper = require("../../../helpers/backend/slide/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// FILE
var multer = require("multer");

// define storage slide
var storage_slide = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/img/slide");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// ROUTER
const router = express.Router();

router.post(
  "/Users/Slide/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Slide/add_slide",
  [verify_token],
  multer({ storage: storage_slide }).single("photo"),
  body("name").notEmpty().withMessage("Judul Slide Tidak Boleh Kosong").trim(),
  controllers.add_slide
);

router.post(
  "/Users/Slide/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Slide Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

router.post(
  "/Users/Slide/get_info_edit_slide",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Slide Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_slide
);

router.post(
  "/Users/Slide/update_slide",
  [verify_token],
  multer({ storage: storage_slide }).single("photo"),
  body("id")
    .notEmpty()
    .withMessage("ID Slide Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("name").notEmpty().withMessage("Judul Slide Tidak Boleh Kosong").trim(),
  controllers.update_slide
);

// router.post(
//   "/Users/Slide/add_slide",
//   [verify_token],
//   multer({ storage: storage_slide }).single("photo"),
//   body("name").notEmpty().withMessage("Judul Slide Tidak Boleh Kosong").trim(),
//   controllers.add_slide
// );

module.exports = router;
