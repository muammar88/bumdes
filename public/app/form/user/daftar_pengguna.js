function daftar_pengguna_index(path, url) {
  var tb = tables({
    width: [10, 20, 20, 20, 20, 10],
    columns: [
      { title: "Kode", center: true },
      { title: "Nama Pengguna", center: true },
      { title: "Username", center: true },
      { title: "Status", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Pengguna Baru",
        title: "Tambah Pengguna Baru",
        icon: "fas fa-users",
        onclick: "add_new_pengguna",
      }) +
      search_btn({
        placeholder: "NAMA PENGGUNA",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Pengguna Tidak Ditemukan",
  });

  return tb;
}

function daftar_pengguna_start(path, url) {
  daftar_pengguna(100, path, url);
}

function daftar_pengguna(perpage, path, url, input) {
  var param = [];
  param["search"] = $("#search_" + path).val();
  if (input != undefined) {
    param["pageNumber"] = input;
  }
  get_data(perpage, {
    url: Urls(url + "/server_side"),
    pagination_id: "pagination_" + path,
    bodyTable_id: "body_" + path,
    fn: "List_" + path,
    warning_text:
      '<td colspan="6"><center>Daftar Pengguna Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_daftar_pengguna(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Pengguna",
    onClick: ` onclick="edit_pengguna('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Pengguna",
    onClick: ` onclick="delete_pengguna('${json.id}')" `,
    icon: "fas fa-times",
  });

  var html = tr([
    td_center([json.kode]),
    td_center([json.fullname]),
    td_center([json.username]),
    td_center([json.status]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_pengguna() {
  $.confirm({
    columnClass: "col-5",
    title: "Tambah Pengguna Baru",
    type: "green",
    theme: "material",
    content: form_add_update_pengguna(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Pengguna",
        btnClass: "btn-primary",
        action: function () {
          ajax_default(
            {
              url: Urls("Daftar_pengguna/add_pengguna"),
              method: "post",
              form: true,
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              daftar_pengguna(100, "daftar_pengguna", "Daftar_pengguna");
            },
            function (status, errMsg) {
              frown_alert(errMsg.error_msg);
            }
          );
        },
      },
    },
  });
}

function form_add_update_pengguna(JSONValue) {
  var id = "";
  var fullname = "";
  var username = "";
  var selected_status = "";

  if (JSONValue != undefined) {
    const value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    fullname = value.fullname;
    username = value.username;
    selected_status = value.status;
  }

  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      <div class="col-12"> 
                        <div class="form-group">
                          <label>Nama Lengkap</label>
                          <input type="text" class="form-control form-control-sm" name="fullname" value="${fullname}" placeholder="Nama Lengkap">
                        </div>
                        <div class="form-group">
                           <label>Status</label>
                           <select class="form-control" name="status" id="status">
                              <option value="0">Pilih Status</option>
                              <option value="administrator"  ${
                                selected_status == "administrator"
                                  ? "selected"
                                  : ""
                              }>Administrator</option>
                              <option value="member" ${
                                selected_status == "member" ? "selected" : ""
                              }>Member</option>
                           </select>
                        </div>
                        <div class="form-group">
                          <label>Username</label>
                          <input type="text" class="form-control form-control-sm" name="username" value="${username}" placeholder="Username">
                        </div>
                        <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control form-control-sm" name="password" placeholder="Password">
                        </div>
                        <div class="form-group">
                          <label>Konfirmasi Password</label>
                          <input type="password" class="form-control form-control-sm" name="konfirmasi_password" placeholder="Konfirmasi Password">
                        </div>
                      </div>
                  </div>
              </form>`;
  return form;
}

function delete_pengguna(id) {
  ajax_default(
    {
      url: Urls("Daftar_pengguna/delete_pengguna"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      daftar_pengguna(100, "daftar_pengguna", "Daftar_pengguna");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_pengguna(id) {
  ajax_default(
    {
      url: Urls("Daftar_pengguna/get_info_edit_pengguna"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-5",
        title: "Edit Pengguna",
        type: "green",
        theme: "material",
        content: form_add_update_pengguna(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Perbaharui Pengguna",
            btnClass: "btn-primary",
            action: function () {
              ajax_default(
                {
                  url: Urls("Daftar_pengguna/update_pengguna"),
                  method: "post",
                  form: true,
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  daftar_pengguna(100, "daftar_pengguna", "Daftar_pengguna");
                },
                function (status, errMsg) {
                  frown_alert(errMsg.error_msg);
                }
              );
            },
          },
        },
      });
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}
