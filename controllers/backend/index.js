const { jwt_value } = require("../../helpers/jwt");
const Model_r = require("./Model_r");

const controllers = {};

/**
 * User Area
 **/
controllers.Backend_area = async (req, res) => {
  const model_r = new Model_r(req);
  const menu = await model_r.menu();
  const submenu = await model_r.submenu();
  const tab = await model_r.tab();

  const jwt = await jwt_value(req);
  const token = req.query.token;

  var list_tab = {};
  for (x in menu) {
    if (menu[x].tab != null) {
      var tabs = JSON.parse(menu[x].tab);
      var tempTab = [];
      var i = 0;
      for (let y in tabs) {
        tempTab[i] = tab[tabs[y].id];
        i++;
      }
      list_tab[menu[x].path] = tempTab;
    }
  }

  var list_submenu = {};
  submenu.forEach((e) => {
    if (e.tab != null) {
      console.log("+++++++++++++++++++");
      console.log(e.tab);
      console.log("+++++++++++++++++++");
      var tabs = JSON.parse(e.tab);
      var tempTab = [];
      var i = 0;
      for (let y in tabs) {
        tempTab[i] = tab[tabs[y].id];
        i++;
      }
      list_tab[e.path] = tempTab;
    }
    if (!list_submenu.hasOwnProperty(e.menu_id)) {
      list_submenu[e.menu_id] = [
        {
          id: e.id,
          name: e.name,
          path: e.path,
          tab: e.tab,
        },
      ];
    } else {
      list_submenu[e.menu_id].push({
        id: e.id,
        name: e.name,
        path: e.path,
        tab: e.tab,
      });
    }
  });

  res.render("backend/index", {
    kode: jwt.kode,
    name: jwt.name,
    token: token,
    menu: menu,
    default_menu: { icon: "fas fa-home", path: "beranda" },
    submenu: list_submenu,
    list_tab: list_tab,
    tab: tab,
  });
};

controllers.get_info_profil_admin = async (req, res) => {};

module.exports = controllers;
