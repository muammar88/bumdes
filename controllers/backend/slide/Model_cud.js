const moment = require("moment");
const { sequelize, Slide } = require("../../../db/models");
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

  async add_slide() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      // insert new slide
      const insert = await Slide.create(
        {
          name: body.name,
          img: this.req.file.filename,
          createdAt: myDate,
          updatedAt: myDate,
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menambahkan Slide Baru dengan Slide Id : ${insert.id}`;
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
      // delete slide
      await Slide.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Data Slide dengan Slide Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update_slide() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      var data = {};
      data["name"] = body.name;
      data["updatedAt"] = myDate;
      if (this.req.file != undefined) {
        data["img"] = this.req.file.filename;
      }
      await Slide.update(
        data,
        {
          where: { id: body.id },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Memperbaharui Data Slide dengan Slide Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  // async add_status_pegawai() {
  //   // initialize general property
  //   await this.initialize();
  //   const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   const body = this.req.body;
  //   // insert process
  //   try {
  //     // insert new status pegawai
  //     const insert = await Status_pegawai.create(
  //       {
  //         name: body.status_pegawai,
  //         createdAt: myDate,
  //         updatedAt: myDate,
  //       },
  //       {
  //         transaction: this.t,
  //       }
  //     );
  //     this.message = `Menambahkan Status Pegawai Baru dengan Status Pegawai Id : ${insert.id}`;
  //   } catch (error) {
  //     this.state = false;
  //   }
  // }

  // async delete() {
  //   // initialize general property
  //   await this.initialize();
  //   const body = this.req.body;
  //   // insert process
  //   try {
  //     // delete status pegawai
  //     await Status_pegawai.destroy(
  //       {
  //         where: {
  //           id: body.id,
  //         },
  //       },
  //       {
  //         transaction: this.t,
  //       }
  //     );
  //     this.message = `Menghapus Status Pegawai dengan Status Pegawai Id : ${body.id}`;
  //   } catch (error) {
  //     this.state = false;
  //   }
  // }

  // async update_status_pegawai() {
  //   // initialize general property
  //   await this.initialize();
  //   const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   const body = this.req.body;
  //   // update process
  //   try {
  //     await Status_pegawai.update(
  //       { name: body.status_pegawai, updatedAt: myDate },
  //       {
  //         where: { id: body.id },
  //       },
  //       {
  //         transaction: this.t,
  //       }
  //     );
  //     this.message = `Memperbaharui Data Status Pegawai dengan Status Pegawai d : ${body.id}`;
  //   } catch (error) {
  //     this.state = false;
  //   }
  // }

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