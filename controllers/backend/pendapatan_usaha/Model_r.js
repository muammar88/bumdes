const moment = require("moment");
const { Op, Usaha, Staff, Pendapatan } = require("../../../db/models");
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
          kode: { [Op.like]: "%" + body.search + "%" },
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
      "keterangan",
      "pendapatan",
      "pengeluaran",
      "sisa",
      "updatedAt",
    ];
    sql["where"] = where;
    sql["include"] = {
      require: true,
      model: Staff,
      attributes: ["fullname"],
      include: {
        require: true,
        model: Usaha,
        attributes: ["name"],
      },
    };

    const query = await db_list_server(sql);
    const q = await Pendapatan.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    if (total > 0) {
      await Pendapatan.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              kode: e.kode,
              keterangan: e.keterangan,
              pendapatan: e.pendapatan,
              pengeluaran: e.pengeluaran,
              sisa: e.sisa,
              nama_pegawai: e.Staff.fullname,
              nama_usaha: e.Staff.Usaha.name,
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
}

module.exports = Model_r;
