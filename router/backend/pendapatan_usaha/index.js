const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/backend/pendapatan_usaha/index");
const helper = require("../../../helpers/backend/pendapatan_usaha/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Pendapatan_usaha/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Pendapatan_usaha/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("ID Pendapatan Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

module.exports = router;
