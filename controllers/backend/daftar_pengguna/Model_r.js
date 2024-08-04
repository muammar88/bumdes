const moment = require("moment");
const { Op, User } = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  // get data in server side
  async server_side() {
    const body = this.req.body;
    var limit = body.perpage;
    var page = 1;

    if (body.pageNumber != undefined) page = body.pageNumber;

    var where = {};

    if (body.search != undefined && body.search != "") {
      where = {
        ...where,
        ...{
          fullname: { [Op.like]: "%" + body.search + "%" },
        },
      };
    }

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["id", "DESC"]];
    sql["attributes"] = [
      "id",
      "kode",
      "fullname",
      "username",
      "status",
      "updatedAt",
    ];
    sql["where"] = where;

    const query = await db_list_server(sql);
    const q = await User.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    if (total > 0) {
      await User.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              kode: e.kode,
              fullname: e.fullname,
              username: e.username,
              status: e.status,
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
            i++;
          })
        );
      });
    }

    return {
      data: list,
      total: total,
    };
  }

  async get_info_edit_pengguna() {
    const body = this.req.body;
    var data = {};
    try {
      await User.findOne({
        where: { id: body.id },
      }).then(async (val) => {
        if (val) {
          data["id"] = val.id;
          data["fullname"] = val.fullname;
          data["username"] = val.username;
          data["status"] = val.status;
        }
      });
      return { error: false, data: data };
    } catch (error) {
      return { error: true };
    }
  }
}

module.exports = Model_r;
