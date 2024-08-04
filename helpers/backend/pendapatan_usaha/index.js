const { Pendapatan } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Pendapatan.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Pendapatan Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
