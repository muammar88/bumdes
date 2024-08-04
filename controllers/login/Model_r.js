const { User, Staff } = require("../../db/models");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async get_one_user() {
    const body = this.req.body;
    return await User.findOne({
      where: { username: body.username },
    });
  }

  async get_one_staff() {
    const body = this.req.body;
    return await Staff.findOne({
      where: { username: body.username },
    });
  }
}

module.exports = Model_r;
