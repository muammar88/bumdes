const moment = require("moment");
const { Op, Usaha, Staff, Pendapatan } = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");

const { convertToRP } = require("../../../helpers/currency");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  // get data in server side
  async server_side() {
    const color = [
      "#E89005",
      "#EC7505",
      "#D84A05",
      "#F42B03",
      "#E70E02",
      "#9B6A6C",
      "#CEDFD9",
      "#5F5449",
      "#3B0D11",
    ];
    var sql = {};
    sql["order"] = [["id", "DESC"]];
    sql["attributes"] = [
      "id",
      "kode",
      "keterangan",
      "pendapatan",
      "pengeluaran",
      "sisa",
      "updatedAt",
      "createdAt",
    ];
    sql["include"] = {
      require: true,
      model: Staff,
      attributes: ["fullname"],
      include: {
        require: true,
        model: Usaha,
        attributes: ["id", "name"],
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
            var y = moment(e.createdAt).format("YYYY");
            var m = moment(e.createdAt).format("MM");
            var d = moment(e.createdAt).format("DD");
            var usaha_name = e.Staff.Usaha.name;
            var usaha_id = e.Staff.Usaha.id;
            var pendapatan = await convertToRP(e.pendapatan);
            list[i] = {
              title: usaha_name + " : " + pendapatan,
              y,
              m,
              d,
              color: color[usaha_id] != undefined ? color[usaha_id] : "#FFFFFF",
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
