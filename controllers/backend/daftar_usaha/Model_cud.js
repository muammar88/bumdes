const moment = require("moment");
const { sequelize, Usaha } = require("../../../db/models");
const { write_log } = require("../../../helpers/backend/write_log");
const { generate_slug_usaha } = require("../../../helpers/tools");

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

  async add_usaha() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const slug = await generate_slug_usaha(body.name);
      // insert new cerita kami
      const insert = await Usaha.create(
        {
          name: body.name,
          alamat: body.alamat,
          img: this.req.file.filename,
          path: slug,
          desc: body.deskripsi,
          createdAt: myDate,
          updatedAt: myDate,
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menambahkan Usaha Baru dengan Usaha Id : ${insert.id}`;
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
      // delete usaha
      await Usaha.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Data Usaha dengan Usaha Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update_usaha() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const slug = await generate_slug_usaha(body.name);

      var data = {};
      data["name"] = body.name;
      data["alamat"] = body.alamat;
      data["path"] = slug;
      data["desc"] = body.deskripsi;
      data["updatedAt"] = myDate;
      if (this.req.file != undefined) {
        data["img"] = this.req.file.filename;
      }
      await Usaha.update(
        data,
        {
          where: { id: body.id },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Memperbaharui Data Usaha dengan Usaha Id : ${body.id}`;
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
