function daftar_cerita_kami_index(path, url) {
  var tb = tables({
    width: [20, 20, 20, 30, 10],
    columns: [
      { title: "Image", center: true },
      { title: "Judul", center: true },
      { title: "Path", center: true },
      { title: "Desc", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Cerita Baru",
        title: "Tambah Cerita Baru",
        icon: "fas fa-newspaper",
        onclick: "add_new_cerita_kami",
      }) +
      search_btn({
        placeholder: "JUDUL CERITA KAMI",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Cerita Kami Tidak Ditemukan",
  });

  return tb;
}

function daftar_cerita_kami_start(path, url) {
  daftar_cerita_kami(100, path, url);
}

function daftar_cerita_kami(perpage, path, url, input) {
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
      '<td colspan="7"><center>Daftar Cerita Kami Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_daftar_cerita_kami(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Cerita Kami",
    onClick: ` onclick="edit_cerita_kami('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Cerita Kami",
    onClick: ` onclick="delete_cerita_kami('${json.id}')" `,
    icon: "fas fa-times",
  });

  var html = tr([
    td_center([
      `<img class="card-img-top" src="static/img/cerita_aksi/${json.img}" alt="${json.title}">`,
    ]),
    td_center([json.title]),
    td_center([json.path]),
    td([json.desc], "", 'style="font-weight: normal;"'),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_cerita_kami() {
  $.confirm({
    columnClass: "col-10",
    title: "Tambah Cerita Kami",
    type: "green",
    theme: "material",
    content: form_add_new_cerita_kami(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Cerita Kami",
        btnClass: "btn-primary",
        action: function () {
          ajax_file(
            {
              url: Urls("Daftar_cerita_kami/add_cerita_kami"),
              method: "post",
              form: true,
              ckeditor: true,
              ckeditor_name: "deskripsi_cerita",
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              daftar_cerita_kami(
                100,
                "daftar_cerita_kami",
                "Daftar_cerita_kami"
              );
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

function form_add_new_cerita_kami(JSONValue) {
  var id = "";
  var judul = "";
  var desc = "";
  var photo = "";
  if (JSONValue != undefined) {
    var value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    judul = value.title;
    desc = value.desc;
    photo = `<div class="col-6"> 
                <div class="form-group">
                    <label>Photo Cerita</label>
                    <div class="mx-auto">
                      <img src="static/img/cerita_aksi/${value.img}" class="img-fluid w-100" alt="Photo Cerita">
                    </div>
                </div>
              </div>
              <div class="w-100"></div>`;
  }
  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      ${photo}
                      <div class="col-6"> 
                        <div class="form-group">
                          <label>Upload Photo Cerita</label>
                          <input type="file" class="form-control form-control-sm" name="photo" placeholder="Upload Photo Cerita">
                        </div>
                      </div>
                      
                      <div class="col-12">
                        <div class="form-group">
                          <label>Judul Cerita</label>
                          <textarea class="form-control" id="judul" name="judul" rows="3" style="resize:none;" placeholder="Judul Cerita">${judul}</textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Deskripsi Cerita</label>
                          <textarea class="form-control" id="deskripsi_cerita" rows="3" style="resize:none;" placeholder="Deskripsi Cerita">${desc}</textarea>
                        </div>
                      </div>
                  </div>
              </form>
              <script>CKEDITOR.replace('deskripsi_cerita');</script>`;
  return form;
}

function delete_cerita_kami(id) {
  ajax_default(
    {
      url: Urls("Daftar_cerita_kami/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      daftar_cerita_kami(100, "daftar_cerita_kami", "Daftar_cerita_kami");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_cerita_kami(id) {
  ajax_default(
    {
      url: Urls("Daftar_cerita_kami/get_info_edit_cerita_kami"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-10",
        title: "Edit Cerita Kami",
        type: "green",
        theme: "material",
        content: form_add_new_cerita_kami(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Update Cerita Kami",
            btnClass: "btn-primary",
            action: function () {
              ajax_file(
                {
                  url: Urls("Daftar_cerita_kami/update_cerita_kami"),
                  method: "post",
                  form: true,
                  ckeditor: true,
                  ckeditor_name: "deskripsi_cerita",
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  daftar_cerita_kami(
                    100,
                    "daftar_cerita_kami",
                    "Daftar_cerita_kami"
                  );
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
