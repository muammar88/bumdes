const moment = require("moment");
const { sequelize, Setting } = require("../../../db/models");
const { write_log } = require("../../../helpers/backend/write_log");

class Model_cud {
  constructor(req) {
    this.req = req;
    this.t;
    this.state;
  }

  async initialize() {
    // initialize transaction
    this.t = await sequelize.transaction();
    this.state = true;
    console.log("-------------2-----------------");
  }

  async update() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const data = {
        nama_desa: body.nama_desa,
        alamat: body.alamat_kantor_bumdes,
        telepon: body.telpon,
        whatsapp: body.nomor_whatsapp,
        facebook: body.link_facebook,
        youtube: body.link_youtube,
      };
      for (x in data) {
        await Setting.update(
          { value: data[x], updatedAt: myDate },
          {
            where: { name: x },
          },
          {
            transaction: this.t,
          }
        );
      }
      this.message = `Memperbaharui Data Pengaturan`;
    } catch (error) {
      this.state = false;
    }
  }

  async response() {
    if (this.state) {
      await write_log(this.req, this.t, {
        msg: this.message,
      });
      // commit
      await this.t.commit();
      return true;
    } else {
      // rollback
      await this.t.rollback();
      return false;
    }
  }
}

module.exports = Model_cud;
