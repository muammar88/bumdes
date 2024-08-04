const moment = require("moment");
const bcrypt = require("bcrypt");
const { sequelize, User } = require("../../../db/models");
const { write_log } = require("../../../helpers/backend/write_log");
const { generate_pengguna_code } = require("../../../helpers/random");

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

  async add_pengguna() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const kode = await generate_pengguna_code();
      const saltRounds = 10;
      await bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(body.password, salt);
        })
        .then(async (hash) => {
          var data = {
            kode: kode,
            fullname: body.fullname,
            username: body.username,
            status: body.status,
            password: hash,
            createdAt: myDate,
            updatedAt: myDate,
          };
          var insert = await User.create(data, {
            transaction: this.t,
          });
          this.message = `Menambahkan User Baru dengan User Id : ${insert.id}`;
        });
    } catch (error) {
      this.state = false;
    }
  }

  async delete_pengguna() {
    // initialize general property
    await this.initialize();
    const body = this.req.body;
    // delete process
    try {
      // delete pendapatan
      await User.destroy(
        {
          where: {
            id: body.id,
          },
        },
        {
          transaction: this.t,
        }
      );
      this.message = `Menghapus Pengguna dengan Pengguna Id : ${body.id}`;
    } catch (error) {
      this.state = false;
    }
  }

  async update_pengguna() {
    // initialize general property
    await this.initialize();
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const body = this.req.body;
    // insert process
    try {
      const saltRounds = 10;
      var data = {
        fullname: body.fullname,
        username: body.username,
        status: body.status,
        updatedAt: myDate,
      };
      // checking password exist
      if (body.password != "" && body.password != undefined) {
        await bcrypt
          .genSalt(saltRounds)
          .then((salt) => {
            return bcrypt.hash(body.password, salt);
          })
          .then(async (hash) => {
            data["password"] = hash;
            await User.update(
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
        await User.update(
          data,
          {
            where: { id: body.id },
          },
          {
            transaction: this.t,
          }
        );
      }
      this.message = `Memperbaharui Data Pengguna dengan Pengguna Id : ${body.id}`;
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
