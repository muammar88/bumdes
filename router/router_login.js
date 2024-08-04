const express = require("express");
const { body } = require("express-validator");
const controllers = require("../controllers/login/index");

// ROUTER
const router = express.Router();

router.get("/Users/Login", controllers.Login_area);

router.post(
  "/Login/process_login",
  // body("tipe")
  //   .notEmpty()
  //   .withMessage("Tipe Tidak Boleh Kosong")
  //   .isIn(["staff", "administrator"])
  //   .withMessage("Tipe withdraw tidak ditemukan"),
  body("username").notEmpty().withMessage("Username Tidak Boleh Kosong"),
  body("password").notEmpty().withMessage("Password Tidak Boleh Kosong"),
  controllers.Login_process
);

module.exports = router;
