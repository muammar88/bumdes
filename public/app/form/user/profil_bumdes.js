function profil_bumdes_index(path, url) {
  var tb = tables({
    width: [20, 50, 20, 10],
    columns: [
      { title: "Image", center: true },
      { title: "Desc", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools: btn_primary({
      label: "Tambah Data Profil BUMDes Baru",
      title: "Tambah Data Profil BUMDes Baru",
      icon: "fas fa-house-user",
      onclick: "add_new_profil",
    }),
    path: path,
    not_found_label: "Daftar Profil BUMDes Tidak Ditemukan",
  });

  return tb;
}

function profil_bumdes_start(path, url) {
  profil_bumdes(100, path, url);
}

function profil_bumdes(perpage, path, url, input) {
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
      '<td colspan="4"><center>Daftar Profil BUMDes Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_profil_bumdes(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Profil",
    onClick: ` onclick="edit_profil('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Profil",
    onClick: ` onclick="delete_profil('${json.id}')" `,
    icon: "fas fa-times",
  });

  var html = tr([
    td_center([
      `<img class="card-img-top" src="static/img/profil/${json.img}">`,
    ]),
    td([json.desc], "", 'style="font-weight: normal;"'),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_profil() {
  $.confirm({
    columnClass: "col-10",
    title: "Tambah Profil Baru",
    type: "green",
    theme: "material",
    content: form_add_update_profil(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Profil Baru",
        btnClass: "btn-primary",
        action: function () {
          ajax_file(
            {
              url: Urls("Profil_bumdes/add_profil_bumdes"),
              method: "post",
              form: true,
              ckeditor: true,
              ckeditor_name: "deskripsi_profil",
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              profil_bumdes(100, "profil_bumdes", "Profil_bumdes");
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

function form_add_update_profil(JSONValue) {
  var id = "";
  var desc = "";
  var img = "";

  if (JSONValue != undefined) {
    var value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    img = `<div class="col-6"> 
            <div class="form-group">
                <label>Photo Profil</label>
                <div class="mx-auto">
                  <img src="static/img/profil/${value.img}" class="img-fluid w-100" alt="Photo Profil">
                </div>
            </div>
            <div class="form-group">
              <label>Upload Photo Profil</label>
              <input type="file" class="form-control form-control-sm" name="photo" placeholder="Upload Photo Profil">
            </div>
          </div>`;
    desc = value.desc;
  } else {
    img = `<div class="col-6"> 
            <div class="form-group">
              <label>Upload Photo Profil</label>
              <input type="file" class="form-control form-control-sm" name="photo" placeholder="Upload Photo Profil">
            </div>
          </div>`;
  }
  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      ${img}
                      <div class="col-12">
                        <div class="form-group">
                          <label>Deskripsi</label>
                          <textarea class="form-control" id="deskripsi_profil" rows="3" style="resize:none;" placeholder="Deskripsi Profil">${desc}</textarea>
                        </div>
                      </div>
                  </div>
              </form>
              <script>CKEDITOR.replace('deskripsi_profil');</script>`;
  return form;
}

function delete_profil(id) {
  ajax_default(
    {
      url: Urls("Profil_bumdes/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      profil_bumdes(100, "profil_bumdes", "Profil_bumdes");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_profil(id) {
  ajax_default(
    {
      url: Urls("Profil_bumdes/get_info_edit_profil"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-10",
        title: "Edit Profil",
        type: "green",
        theme: "material",
        content: form_add_update_profil(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Perbaharui Data Profil",
            btnClass: "btn-primary",
            action: function () {
              ajax_file(
                {
                  url: Urls("Profil_bumdes/update_profil_bumdes"),
                  method: "post",
                  form: true,
                  ckeditor: true,
                  ckeditor_name: "deskripsi_profil",
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  profil_bumdes(100, "profil_bumdes", "Profil_bumdes");
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
