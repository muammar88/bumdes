const moment = require("moment");
const { Op, Staff, Usaha, Pendapatan } = require("../../../db/models");
// const { db_list_server } = require("../../../helpers/db_ops");
const { convertToRP } = require("../../../helpers/currency");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  // get data in server side
  async server_side() {
    const q = await Usaha.findAndCountAll();
    const s = await Staff.findAndCountAll();
    const today = moment(new Date()).format("YYYY-MM-DD");
    var pendapatan_bulan_ini = 0;
    var pendapatan_hari_ini = 0;
    var list = [];
    await Pendapatan.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
        },
      },
      include: {
        require: true,
        model: Staff,
        attributes: ["fullname"],
        include: {
          require: true,
          model: Usaha,
          attributes: ["name"],
        },
      },
    }).then(async (value) => {
      var i = 0;
      await Promise.all(
        await value.map(async (e) => {
          pendapatan_bulan_ini = pendapatan_bulan_ini + e.pendapatan;
          var pendapatan_date = moment(e.createdAt).format("YYYY-MM-DD");
          if (today == pendapatan_date) {
            pendapatan_hari_ini = pendapatan_hari_ini + e.pendapatan;
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
          }
        })
      );
    });

    pendapatan_bulan_ini = await convertToRP(pendapatan_bulan_ini);
    pendapatan_hari_ini = await convertToRP(pendapatan_hari_ini);

    return {
      total_usaha: q.count + " Usaha",
      total_pegawai: s.count + " Orang",
      pendapatan_bulan_ini: pendapatan_bulan_ini,
      pendapatan_hari_ini: pendapatan_hari_ini,
      data: list,
    };
  }

  // async get_info_add_pegawai() {
  //   try {
  //     const query_status = await Status_pegawai.findAll();

  //     const query_usaha = await Usaha.findAll();
  //     return {
  //       error: false,
  //       data: { usaha: query_usaha, status_pegawai: query_status },
  //     };
  //   } catch (error) {
  //     return { error: true };
  //   }
  // }

  // async get_info_edit_pegawai() {
  //   const body = this.req.body;
  //   var value = {};
  //   try {
  //     const query_status = await Status_pegawai.findAll();

  //     const query_usaha = await Usaha.findAll();

  //     await Staff.findOne({
  //       where: { id: body.id },
  //     }).then(async (val) => {
  //       if (val) {
  //         value["id"] = val.id;
  //         value["usaha_id"] = val.usaha_id;
  //         value["status_id"] = val.status_id;
  //         value["fullname"] = val.fullname;
  //         value["username"] = val.username;
  //       }
  //     });
  //     return {
  //       error: false,
  //       value: value,
  //       data: { usaha: query_usaha, status_pegawai: query_status },
  //     };
  //   } catch (error) {
  //     console.log("error");
  //     console.log(error);
  //     console.log("error");
  //     return { error: true };
  //   }
  // }

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
