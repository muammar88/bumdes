const { Op, Staff, Usaha, Status_pegawai } = require("../../../db/models");

const helper = {};

helper.check_status_pegawai_id = async (value) => {
  check = await Status_pegawai.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Status Pegawai Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

helper.check_id = async (value) => {
  check = await Staff.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Staff Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

helper.check_usaha_id = async (value) => {
  if (value != 0) {
    check = await Usaha.findOne({
      where: { id: value },
    });
    if (!check) {
      throw new Error("Id Usaha Tidak Terdaftar Dipangkalan Data.");
    }
  }
  return true;
};

helper.check_password_konfirmasi_pegawai = async (value, { req }) => {
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

helper.check_username_pegawai = async (value, { req }) => {
  const body = req.body;
  if (body.id) {
    check = await Staff.findOne({
      where: {
        [Op.and]: {
          username: value,
          id: { [Op.ne]: body.id },
        },
      },
    });
  } else {
    check = await Staff.findOne({
      where: {
        username: value,
      },
    });
  }

  if (check) {
    throw new Error("Username Sudah Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
