const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/status_pegawai/index");
const helper = require("../../../helpers/backend/status_pegawai/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Status_pegawai/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Status_pegawai/add_status_pegawai",
  [verify_token],
  body("status_pegawai")
    .notEmpty()
    .withMessage("Nama Status Pegawai Tidak Boleh Kosong")
    .trim(),
  controllers.add_status_pegawai
);
// delete
router.post(
  "/Users/Status_pegawai/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Status Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

//
router.post(
  "/Users/Status_pegawai/get_info_edit_status_pegawai",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Status Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.get_info_edit_status_pegawai
);

//

router.post(
  "/Users/Status_pegawai/update_status_pegawai",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Status Pegawai Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("status_pegawai")
    .notEmpty()
    .withMessage("Nama Status Pegawai Tidak Boleh Kosong")
    .trim(),
  controllers.update_status_pegawai
);

module.exports = router;
