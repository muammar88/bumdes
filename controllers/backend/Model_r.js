const { Menu, Submenu, Tab } = require("../../db/models");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async menu() {
    var list = [];
    await Menu.findAll().then(async (value) => {
      await Promise.all(
        await value.map(async (e) => {
          list[e.id] = {
            name: e.name,
            path: e.path,
            icon: e.icon,
            tab: e.tab,
          };
        })
      );
    });
    return list;
  }

  async submenu() {
    var list = [];
    await Submenu.findAll().then(async (value) => {
      let i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list[i] = {
            id: e.id,
            name: e.name,
            path: e.path,
            menu_id: e.menu_id,
            tab: e.tab,
          };
          i++;
        })
      );
    });
    return list;
  }

  async tab() {
    var list = {};
    await Tab.findAll().then(async (value) => {
      let i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list[e.id] = {
            id: e.id,
            name: e.name,
            path: e.path,
            icon: e.icon,
            description: e.description,
          };
          i++;
        })
      );
    });
    return list;
  }
}

module.exports = Model_r;
