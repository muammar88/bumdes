const { Slide } = require("../../../db/models");

const helper = {};

helper.check_id = async (value) => {
  check = await Slide.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("Id Slide Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

module.exports = helper;
