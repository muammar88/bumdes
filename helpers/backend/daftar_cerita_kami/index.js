const { Cerita_kami } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Cerita_kami.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Cerita Kami Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
