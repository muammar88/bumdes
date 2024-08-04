const { Usaha } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Usaha.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Usaha Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
