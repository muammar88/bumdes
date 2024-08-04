const express = require("express");
const sharp = require("sharp");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/pengaturan/index");
// const helper = require("../../../helpers/backend/daftar_usaha/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// FILE
var multer = require("multer");

// define storage
const storage_logo = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/img/");
  },
  filename: function (req, file, callback) {
    if (file.fieldname === "logo") {
      callback(null, "logo.png");
    } else if (file.fieldname === "logo_backend") {
      callback(null, "logo-backend.png");
    }
  },
});

const file_filter = (req, file, callback) => {
  if (file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// const checkDimensions = (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   sharp(req.file.buffer)
//     .metadata()
//     .then((metadata) => {
//       const { width, height } = metadata;
//       const maxWidth = 1024;
//       const maxHeight = 768;
//       if (width > maxWidth || height > maxHeight) {
//         return res
//           .status(400)
//           .send(
//             `Image dimensions should be at most ${maxWidth}x${maxHeight} pixels.`
//           );
//       }

//       next();
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error processing image.");
//     });
// };

// ROUTER
const router = express.Router();

router.get(
  "/Users/Pengaturan/get_info_pengaturan",
  [verify_session],
  controllers.get_info_pengaturan
);

router.post(
  "/Users/Pengaturan/update_pengaturan",
  [verify_token],
  multer({ storage: storage_logo, fileFilter: file_filter }).fields([
    { name: "logo", maxCount: 1 },
    { name: "logo_backend", maxCount: 1 },
  ]),
  body("nama_desa")
    .notEmpty()
    .withMessage("Nama Desa Tidak Boleh Kosong")
    .trim(),
  body("alamat_kantor_bumdes")
    .notEmpty()
    .withMessage("Alamat Kantor BUMDes Tidak Boleh Kosong")
    .trim(),
  body("telpon").trim(),
  body("nomor_whatsapp").trim(),
  body("link_facebook").trim(),
  body("link_youtube").trim(),
  controllers.update_pengaturan
);

module.exports = router;
