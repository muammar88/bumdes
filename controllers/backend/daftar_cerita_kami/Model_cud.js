const moment = require("moment");
const { sequelize, Cerita_kami } = require("../../../db/models");
const { write_log } = require("../../../helpers/backend/write_log");
const { generate_slug } = require("../../../helpers/tools");

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

  async add_cerita_kami() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const slug = await generate_slug(body.judul);
      // insert new cerita kami
      const insert = await Cerita_kami.create(
        {
          title: body.judul,
          img: this.req.file.filename,
          path: slug,
          desc: body.deskripsi_cerita,
          createdAt: myDate,
          updatedAt: myDate,
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menambahkan Cerita Baru dengan Cerita Id : ${insert.id}`;
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
      // delete cerita kami
      await Cerita_kami.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Data Cerita dengan Cerita Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update_cerita_kami() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const slug = await generate_slug(body.judul);
      var data = {};
      data["title"] = body.judul;
      data["path"] = slug;
      data["desc"] = body.deskripsi_cerita;
      data["updatedAt"] = myDate;
      if (this.req.file != undefined) {
        data["img"] = this.req.file.filename;
      }
      await Cerita_kami.update(
        data,
        {
          where: { id: body.id },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Memperbaharui Data Cerita Kami dengan Cerita Id : ${body.id}`;
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
