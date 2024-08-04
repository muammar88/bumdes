function daftar_usaha_index(path, url) {
  var tb = tables({
    width: [20, 25, 25, 10, 10, 10],
    columns: [
      { title: "Image", center: true },
      { title: "Info Usaha", center: true },
      { title: "Desc", center: true },
      { title: "Jumlah Pegawai", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Usaha Baru",
        title: "Tambah Usaha Baru",
        icon: "fas fa-newspaper",
        onclick: "add_new_usaha",
      }) +
      search_btn({
        placeholder: "NAMA USAHA",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Usaha Tidak Ditemukan",
  });

  return tb;
}

function daftar_usaha_start(path, url) {
  daftar_usaha(100, path, url);
}

function daftar_usaha(perpage, path, url, input) {
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
      '<td colspan="6"><center>Daftar Usaha Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_daftar_usaha(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Usaha",
    onClick: ` onclick="edit_usaha('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Usaha",
    onClick: ` onclick="delete_usaha('${json.id}')" `,
    icon: "fas fa-times",
  });

  var obj_info_usaha = [
    { title: "NAME USAHA", value: json.name },
    { title: "ALAMAT USAHA", value: json.alamat },
  ];

  var info_usaha = simpleTableFunc(obj_info_usaha, "40");

  var html = tr([
    td_center([
      `<img class="card-img-top" src="static/img/usaha/${json.img}" alt="${json.title}">`,
    ]),
    td_center([info_usaha]),
    td([json.desc], "", 'style="font-weight: normal;"'),
    td_center([json.jumlah_pegawai]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_usaha() {
  $.confirm({
    columnClass: "col-10",
    title: "Tambah Usaha Baru",
    type: "green",
    theme: "material",
    content: form_add_update_usaha(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Usaha",
        btnClass: "btn-primary",
        action: function () {
          ajax_file(
            {
              url: Urls("Daftar_usaha/add_usaha"),
              method: "post",
              form: true,
              ckeditor: true,
              ckeditor_name: "deskripsi",
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              daftar_usaha(100, "daftar_usaha", "Daftar_usaha");
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

function form_add_update_usaha(JSONValue) {
  var id = "";
  var name = "";
  var alamat = "";
  var img = "";
  var desc = "";
  if (JSONValue != undefined) {
    var value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    name = value.name;
    alamat = value.alamat;
    desc = value.desc;
    img = `<div class="col-6"> 
                <div class="form-group">
                    <label>Photo Usaha</label>
                    <div class="mx-auto">
                      <img src="static/img/usaha/${value.img}" class="img-fluid w-100" alt="Photo usaha">
                    </div>
                </div>
              </div>
              <div class="w-100"></div>`;
  }
  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      ${img}
                      <div class="col-6"> 
                        <div class="form-group">
                          <label>Upload Photo Usaha</label>
                          <input type="file" class="form-control form-control-sm" name="photo" placeholder="Upload Photo Usaha">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Nama Usaha</label>
                          <textarea class="form-control" id="name" name="name" rows="1" style="resize:none;" placeholder="Nama Usaha">${name}</textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Alamat Usaha</label>
                          <textarea class="form-control" id="alamat" name="alamat" rows="3" style="resize:none;" placeholder="Alamat Usaha">${alamat}</textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Deskripsi Usaha</label>
                          <textarea class="form-control" id="deskripsi" rows="3" style="resize:none;" placeholder="Deskripsi Usaha">${desc}</textarea>
                        </div>
                      </div>
                  </div>
              </form>
              <script>CKEDITOR.replace('deskripsi');</script>`;
  return form;
}

function delete_usaha(id) {
  ajax_default(
    {
      url: Urls("Daftar_usaha/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      daftar_usaha(100, "daftar_usaha", "Daftar_usaha");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_usaha(id) {
  ajax_default(
    {
      url: Urls("Daftar_usaha/get_info_usaha"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-10",
        title: "Edit Usaha",
        type: "green",
        theme: "material",
        content: form_add_update_usaha(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Update Usaha",
            btnClass: "btn-primary",
            action: function () {
              ajax_file(
                {
                  url: Urls("Daftar_usaha/update_usaha"),
                  method: "post",
                  form: true,
                  ckeditor: true,
                  ckeditor_name: "deskripsi",
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  daftar_usaha(100, "daftar_usaha", "Daftar_usaha");
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
