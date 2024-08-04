const moment = require("moment");
const bcrypt = require("bcrypt");
const { sequelize, Op, Usaha, Staff } = require("../../../db/models");
const { write_log } = require("../../../helpers/backend/write_log");
const { generate_staff_code } = require("../../../helpers/random");

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

  async add_pegawai() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const saltRounds = 10;
      await bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(body.password, salt);
        })
        .then(async (hash) => {
          // generated kode
          const kode = await generate_staff_code();
          // insert new pegawai
          const insert = await Staff.create(
            {
              kode: kode,
              fullname: body.fullname,
              username: body.username,
              usaha_id: body.usaha,
              status_id: body.status_pegawai,
              password: hash,
              createdAt: myDate,
              updatedAt: myDate,
            },
            {
              transaction: this.t,
            }
          );
          this.message = `Menambahkan Pegawai Baru dengan Pegawai Id : ${insert.id}`;
        });
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
      // delete Pegawai
      await Staff.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Data Pegawai dengan Pegawai Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update_pegawai() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const saltRounds = 10;
      var data = {};
      data["fullname"] = body.fullname;
      data["username"] = body.username;
      data["usaha_id"] = body.usaha;
      data["status_id"] = body.status_pegawai;
      data["updatedAt"] = myDate;
      // checking password exist
      if (body.password != "" && body.password != undefined) {
        await bcrypt
          .genSalt(saltRounds)
          .then((salt) => {
            return bcrypt.hash(body.password, salt);
          })
          .then(async (hash) => {
            data["password"] = hash;
            await Staff.update(
              data,
              {
                where: { id: body.id },
              },
              {
                transaction: this.t,
              }
            );
          });
      } else {
        await Staff.update(
          data,
          {
            where: { id: body.id },
          },
          {
            transaction: this.t,
          }
        );
      }
      this.message = `Memperbaharui Data Pegawai dengan Pegawai Id : ${body.id}`;
    } catch (error) {
      console.log("-----------11");
      console.log(error);
      console.log("-----------11");
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
