const { Profil } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Profil.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Profil Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
