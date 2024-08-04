const { Op, User } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await User.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id User Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

helper.check_username = async (value, { req }) => {
  const body = req.body;
  if (body.id) {
    var check = await User.findOne({
      where: { username: value, id: { [Op.ne]: body.id } },
    });
  } else {
    var check = await User.findOne({
      where: { username: value },
    });
  }
  if (check) {
    throw new Error("Username Sudah Terdaftar Dipangkalan Data.");
  }
  return true;
};

helper.check_password_konfirmasi_user = async (value, { req }) => {
  const body = req.body;
  if (!body.id) {
    if (
      body.konfirmasi_password == "" ||
      body.konfirmasi_password == undefined
    ) {
      throw new Error("Password Konfirmasi Tidak Boleh Kosong.");
    }
    if (body.password == "" || body.password == undefined) {
      throw new Error("Password Tidak Boleh Kosong.");
    }
  }
  if (body.password != "") {
    if (body.password != body.konfirmasi_password) {
      throw new Error(
        "Password Konfirmasi Tidak Cocok dengan Password, Silahkan dicek kembali."
      );
    }
  }

  return true;
};

module.exports = helper;
