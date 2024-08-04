const moment = require("moment");
const { Op, Staff, Usaha, Status_pegawai } = require("../../../db/models");
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
    sql["attributes"] = ["id", "kode", "fullname", "username", "updatedAt"];
    sql["where"] = where;
    sql["include"] = [
      {
        require: true,
        model: Usaha,
        attributes: ["name"],
      },
      {
        require: true,
        model: Status_pegawai,
        attributes: ["name"],
      },
    ];

    const query = await db_list_server(sql);
    const q = await Staff.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    if (total > 0) {
      await Staff.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              nama_pegawai: e.fullname,
              kode_pegawai: e.kode,
              username: e.username,
              usaha: e.Usaha.name,
              status: e.Status_pegawai.name,
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

  async get_info_add_pegawai() {
    try {
      const query_status = await Status_pegawai.findAll();

      const query_usaha = await Usaha.findAll();
      return {
        error: false,
        data: { usaha: query_usaha, status_pegawai: query_status },
      };
    } catch (error) {
      return { error: true };
    }
  }

  async get_info_edit_pegawai() {
    const body = this.req.body;
    var value = {};
    try {
      const query_status = await Status_pegawai.findAll();

      const query_usaha = await Usaha.findAll();

      await Staff.findOne({
        where: { id: body.id },
      }).then(async (val) => {
        if (val) {
          value["id"] = val.id;
          value["usaha_id"] = val.usaha_id;
          value["status_id"] = val.status_id;
          value["fullname"] = val.fullname;
          value["username"] = val.username;
        }
      });
      return {
        error: false,
        value: value,
        data: { usaha: query_usaha, status_pegawai: query_status },
      };
    } catch (error) {
      console.log("error");
      console.log(error);
      console.log("error");
      return { error: true };
    }
  }

  // async info_cerita_kami() {
  //   const body = this.req.body;
  //   try {
  //     const query = await Cerita_kami.findOne({ where: { id: body.id } });
  //     return { error: false, data: query };
  //   } catch (error) {
  //     return { error: true };
  //   }
  // }

  // async get_info_edit_cerita_kami() {
  //   const body = this.req.body;
  //   var data = {};
  //   try {
  //     await Cerita_kami.findOne({
  //       where: { id: body.id },
  //     }).then(async (val) => {
  //       if (val) {
  //         data["id"] = val.id;
  //         data["title"] = val.title;
  //         data["img"] = val.img;
  //         data["desc"] = val.desc;
  //       }
  //     });
  //     return { error: false, data: data };
  //   } catch (error) {
  //     return { error: true };
  //   }
  // }
}

module.exports = Model_r;
