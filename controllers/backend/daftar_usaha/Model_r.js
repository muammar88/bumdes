const moment = require("moment");
const { Op, Usaha } = require("../../../db/models");
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
          name: { [Op.like]: "%" + body.search + "%" },
        },
      };
    }

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["id", "DESC"]];
    sql["attributes"] = [
      "id",
      "name",
      "alamat",
      "img",
      "path",
      "desc",
      "updatedAt",
    ];
    sql["where"] = where;

    const query = await db_list_server(sql);
    const q = await Usaha.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    if (total > 0) {
      await Usaha.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              name: e.name,
              alamat: e.alamat,
              img: e.img,
              path: e.path,
              desc: e.desc,
              jumlah_pegawai: 0,
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

  async info_usaha() {
    const body = this.req.body;
    try {
      const query = await Usaha.findOne({ where: { id: body.id } });
      return { error: false, data: query };
    } catch (error) {
      return { error: true };
    }
  }

  async get_info_usaha() {
    const body = this.req.body;
    var data = {};
    try {
      await Usaha.findOne({
        where: { id: body.id },
      }).then(async (val) => {
        if (val) {
          data["id"] = val.id;
          data["name"] = val.name;
          data["alamat"] = val.alamat;
          data["img"] = val.img;
          data["desc"] = val.desc;
        }
      });
      return { error: false, data: data };
    } catch (error) {
      return { error: true };
    }
  }
}

module.exports = Model_r;
