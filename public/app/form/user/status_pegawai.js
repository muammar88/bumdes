function status_pegawai_index(path, url) {
  var tb = tables({
    width: [40, 40, 20],
    columns: [
      { title: "Nama Status", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Status Pegawai Baru",
        title: "Tambah Status Pegawai Baru",
        icon: "fas fa-users",
        onclick: "add_new_status_pegawai",
      }) +
      search_btn({
        placeholder: "NAMA STATUS PEGAWAI",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Status Pegawai Tidak Ditemukan",
  });

  return tb;
}

function status_pegawai_start(path, url) {
  status_pegawai(100, path, url);
}

function status_pegawai(perpage, path, url, input) {
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
      '<td colspan="3"><center>Daftar Status Pegawai Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_status_pegawai(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Status Pegawai",
    onClick: ` onclick="edit_status_pegawai('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Status Pegawai",
    onClick: ` onclick="delete_status_pegawai('${json.id}')" `,
    icon: "fas fa-times",
  });

  var html = tr([
    td_center([json.name]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_status_pegawai() {
  $.confirm({
    columnClass: "col-5",
    title: "Tambah Status Pegawai Baru",
    type: "green",
    theme: "material",
    content: form_add_update_status_pegawai(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Status Pegawai",
        btnClass: "btn-primary",
        action: function () {
          ajax_default(
            {
              url: Urls("Status_pegawai/add_status_pegawai"),
              method: "post",
              form: true,
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              status_pegawai(100, "status_pegawai", "Status_pegawai");
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

function form_add_update_status_pegawai(JSONValue) {
  var id = "";
  var name = "";
  if (JSONValue != undefined) {
    const value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    name = value.name;
  }

  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      <div class="col-12"> 
                        <div class="form-group">
                          <label>Nama Status Pegawai</label>
                          <input type="text" class="form-control" name="status_pegawai" value="${name}" placeholder="Nama Status Pegawai">
                        </div>
                      </div>
                  </div>
              </form>`;
  return form;
}

function delete_status_pegawai(id) {
  ajax_default(
    {
      url: Urls("Status_pegawai/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      status_pegawai(100, "status_pegawai", "Status_pegawai");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_status_pegawai(id) {
  ajax_default(
    {
      url: Urls("Status_pegawai/get_info_edit_status_pegawai"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-5",
        title: "Edit Status Pegawai",
        type: "green",
        theme: "material",
        content: form_add_update_status_pegawai(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Perbaharui Status Pegawai",
            btnClass: "btn-primary",
            action: function () {
              ajax_default(
                {
                  url: Urls("Status_pegawai/update_status_pegawai"),
                  method: "post",
                  form: true,
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  status_pegawai(100, "status_pegawai", "Status_pegawai");
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
