function daftar_pegawai_index(path, url) {
  var tb = tables({
    width: [15, 20, 15, 20, 20, 10],
    columns: [
      { title: "Kode Pegawai", center: true },
      { title: "Nama Pegawai", center: true },
      { title: "Username", center: true },
      { title: "Nama Usaha", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Pegawai Baru",
        title: "Tambah Pegawai Baru",
        icon: "fas fa-users",
        onclick: "add_new_pegawai",
      }) +
      search_btn({
        placeholder: "NAMA PEGAWAI",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Pegawai Tidak Ditemukan",
  });

  return tb;
}

function daftar_pegawai_start(path, url) {
  daftar_pegawai(100, path, url);
}

function daftar_pegawai(perpage, path, url, input) {
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
      '<td colspan="6"><center>Daftar Pegawai Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_daftar_pegawai(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Pegawai",
    onClick: ` onclick="edit_pegawai('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Pegawai",
    onClick: ` onclick="delete_pegawai('${json.id}')" `,
    icon: "fas fa-times",
  });

  var html = tr([
    td_center([json.kode_pegawai]),
    td_center([json.nama_pegawai, "<br>", "(" + json.status + ")"]),
    td_center([json.username]),
    td_center([json.usaha]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_pegawai() {
  ajax_default(
    {
      url: Urls("Daftar_pegawai/get_info_add_pegawai"),
      method: "get",
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-6",
        title: "Tambah Pegawai Baru",
        type: "green",
        theme: "material",
        content: form_add_update_pegawai(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Tambah Pegawai Baru",
            btnClass: "btn-primary",
            action: function () {
              const usaha_id = $("#usaha").val();
              const status_pegawai = $("#status_pegawai").val();
              const fullname = $("#fullname").val();
              const username = $("#username").val();
              const password = $("#password_pegawai").val();
              const konfirmasi_password = $(
                "#konfirmasi_password_pegawai"
              ).val();
              var error = false;
              var message = "";
              if (usaha_id == "" || usaha_id == 0) {
                error = true;
                message +=
                  "<li>Anda wajib memilih salah satu <b>Usaha</b></li>";
              }

              if (status_pegawai == "" || status_pegawai == 0) {
                error = true;
                message +=
                  "<li>Anda wajib memilih salah satu <b>Status Pegawai</b></li>";
              }

              if (fullname == "") {
                error = true;
                message += "<li><b>Nama Pegawai</b> tidak boleh kosong</li>";
              }
              if (username == "") {
                error = true;
                message +=
                  "<li><b>Username Pegawai</b> tidak boleh kosong</li>";
              }

              if (password == "") {
                error = true;
                message += "<li><b>Password</b> tidak boleh kosong</li>";
              }

              if (konfirmasi_password == "") {
                error = true;
                message +=
                  "<li><b>Konfirmasi Password</b> tidak boleh kosong</li>";
              }

              if (konfirmasi_password != password) {
                error = true;
                message +=
                  "<li><b>Konfirmasi Password</b> tidak cocok dengan Password tidak boleh kosong</li>";
              }

              if (error == true) {
                frown_alert(`<ul class="pl-3">${message}</ul>`);
                return false;
              } else {
                ajax_default(
                  {
                    url: Urls("Daftar_pegawai/add_pegawai"),
                    method: "post",
                    form: true,
                  },
                  function (e, xhr) {
                    smile_alert(e.error_msg);
                    daftar_pegawai(100, "daftar_pegawai", "Daftar_pegawai");
                  },
                  function (status, errMsg) {
                    frown_alert(errMsg.error_msg);
                  }
                );
              }
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

function form_add_update_pegawai(JSONData, JSONValue) {
  const json = JSON.parse(JSONData);
  var id = "";
  var fullname = "";
  var username = "";
  var usaha_id = "";
  var status_pegawai_id = "";

  if (JSONValue != undefined) {
    const value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    fullname = value.fullname;
    username = value.username;
    usaha_id = value.usaha_id;
    status_pegawai_id = value.status_id;
  }

  var option_usaha = `<option value="0">Pilih Salah Satu Usaha</option>`;
  for (let x in json.usaha) {
    option_usaha += `<option value="${json.usaha[x].id}" ${
      json.usaha[x].id == usaha_id ? "selected" : ""
    }>${json.usaha[x].name}</option>`;
  }

  var option_status = `<option value="0">Pilih Status Pegawai</option>`;
  for (let x in json.status_pegawai) {
    option_status += `<option value="${json.status_pegawai[x].id}" ${
      json.status_pegawai[x].id == status_pegawai_id ? "selected" : ""
    }>${json.status_pegawai[x].name}</option>`;
  }

  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      <div class="col-12"> 
                        <div class="form-group">
                          <label>Usaha</label>
                          <select class="form-control" name="usaha" id="usaha">
                           ${option_usaha}
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Status Pegawai</label>
                          <select class="form-control" name="status_pegawai" id="status_pegawai">
                           ${option_status}
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Nama Lengkap Pengawai</label>
                          <input type="text" class="form-control" name="fullname" value="${fullname}" placeholder="Nama Lengkap Pegawai">
                        </div>
                        <div class="form-group">
                          <label>Username</label>
                          <input type="text" class="form-control" name="username" id="username" value="${username}" placeholder="Username">
                        </div>
                        <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control" name="password" id="password_pegawai" placeholder="Password">
                        </div>
                        <div class="form-group">
                          <label>Konfirmasi Password</label>
                          <input type="password" class="form-control" name="konfirmasi_password" id="konfirmasi_password_pegawai" placeholder="Konfirmasi Password">
                        </div>
                      </div>
                  </div>
              </form>`;
  return form;
}

function delete_pegawai(id) {
  ajax_default(
    {
      url: Urls("Daftar_pegawai/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      daftar_pegawai(100, "daftar_pegawai", "Daftar_pegawai");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_pegawai(id) {
  ajax_default(
    {
      url: Urls("Daftar_pegawai/get_info_edit_pegawai"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-6",
        title: "Edit Pegawai",
        type: "green",
        theme: "material",
        content: form_add_update_pegawai(
          JSON.stringify(e.data),
          JSON.stringify(e.value)
        ),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Perbaharui Data Pegawai",
            btnClass: "btn-primary",
            action: function () {
              const usaha_id = $("#usaha").val();
              const status_pegawai = $("#status_pegawai").val();
              const fullname = $("#fullname").val();
              const username = $("#username").val();
              const password = $("#password_pegawai").val();
              const konfirmasi_password = $(
                "#konfirmasi_password_pegawai"
              ).val();
              var error = false;
              var message = "";
              if (usaha_id == "" || usaha_id == 0) {
                error = true;
                message +=
                  "<li>Anda wajib memilih salah satu <b>Usaha</b></li>";
              }

              if (status_pegawai == "" || status_pegawai == 0) {
                error = true;
                message +=
                  "<li>Anda wajib memilih salah satu <b>Status Pegawai</b></li>";
              }

              if (fullname == "") {
                error = true;
                message += "<li><b>Nama Pegawai</b> tidak boleh kosong</li>";
              }
              if (username == "") {
                error = true;
                message +=
                  "<li><b>Username Pegawai</b> tidak boleh kosong</li>";
              }
              if (password != "") {
                if (konfirmasi_password != password) {
                  error = true;
                  message +=
                    "<li><b>Konfirmasi Password</b> tidak cocok dengan Password tidak boleh kosong</li>";
                }
              }
              // filter
              if (error == true) {
                frown_alert(`<ul class="pl-3">${message}</ul>`);
                return false;
              } else {
                ajax_default(
                  {
                    url: Urls("Daftar_pegawai/update_pegawai"),
                    method: "post",
                    form: true,
                  },
                  function (e, xhr) {
                    smile_alert(e.error_msg);
                    daftar_pegawai(100, "daftar_pegawai", "Daftar_pegawai");
                  },
                  function (status, errMsg) {
                    frown_alert(errMsg.error_msg);
                  }
                );
              }
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
