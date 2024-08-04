const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error_msg } = require("../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");

const controllers = {};

/**
 * Login Area Views
 **/
controllers.Login_area = async (req, res) => {
  res.render("login/index");
};

/**
 * Melakukan authentikasi proses login user
 **/
controllers.Login_process = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    try {
      const body = req.body;
      const tipe = body.tipe;
      // get data
      var data = await model_r.get_one_user();
      // check data
      if (data != undefined && data) {
        const valid_password = await bcrypt.compare(
          body.password,
          data.password
        );
        // check validation password
        if (!valid_password) {
          res.status(400).json({ error_msg: "Password Tidak Valid" });
        } else {
          if (typeof req.session.login_session !== "undefined") {
            if (!req.session.login_session.hasOwnProperty(data.kode)) {
              var list = [];
              req.session.login_session.forEach((element, key) => {
                list[key] = element;
              });
              list[data.kode] = { name: data.username };
              req.session.login_session = list;
            }
          } else {
            req.session.login_session = {
              [data.kode]: { name: data.username },
            };
          }
          const access_token = jwt.sign(
            { kode: data.kode, name: data.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "360d" }
          );
          res.status(200).json({
            error_msg: "Login Berhasih Dilakukan",
            kode: data.kode,
            access_token: access_token,
          });
        }
      } else {
        res.status(400).json({ error_msg: "Username tidak ditemukan" });
      }
    } catch (error) {
      res.status(400).json({ error_msg: error });
    }
  }
};

module.exports = controllers;
