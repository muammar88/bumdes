const { Status_pegawai } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Status_pegawai.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Status Pegawai Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
