const moment = require("moment");
const { sequelize, Profil } = require("../../../db/models");
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
  }

  async add_profil_bumdes() {
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      // insert new Profil
      const insert = await Profil.create(
        {
          img: this.req.file.filename,
          desc: body.deskripsi_profil,
          createdAt: myDate,
          updatedAt: myDate,
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menambahkan Profil Baru dengan Profil Id : ${insert.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async delete() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      // delete profil
      await Profil.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Data Profil dengan Profil Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      var data = { desc: body.deskripsi_profil, updatedAt: myDate };
      if (this.req.file != undefined) {
        data["img"] = this.req.file.filename;
      }
      await Profil.update(
        data,
        {
          where: { id: body.id },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Memperbaharui Data Profil dengan Profil Id : ${body.id}`;
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
