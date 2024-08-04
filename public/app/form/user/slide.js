function slide_index(path, url) {
  var tb = tables({
    width: [30, 30, 20, 20],
    columns: [
      { title: "Image", center: true },
      { title: "Nama", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Tambah Slide Baru",
        title: "Tambah Slide Baru",
        icon: "fas fa-sliders-h",
        onclick: "add_new_slide",
      }) +
      search_btn({
        placeholder: "NAMA SLIDE",
        width: 450,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }),
    path: path,
    not_found_label: "Daftar Slide Tidak Ditemukan",
  });

  return tb;
}

function slide_start(path, url) {
  slide(100, path, url);
}

function slide(perpage, path, url, input) {
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
      '<td colspan="4"><center>Daftar Slide Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_slide(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Edit Slide",
    onClick: ` onclick="edit_slide('${json.id}')" `,
    icon: "fas fa-pencil-alt",
  });
  btn[1] = btnDanger({
    title: "Delete Slide",
    onClick: ` onclick="delete_slide('${json.id}')" `,
    icon: "fas fa-times",
  });
  var html = tr([
    td_center([
      `<img class="card-img-top" src="static/img/slide/${json.img}" alt="${json.name}">`,
    ]),
    td_center([json.name]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function add_new_slide() {
  $.confirm({
    columnClass: "col-6",
    title: "Tambah Slide Baru",
    type: "green",
    theme: "material",
    content: form_add_update_slide(),
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      formSubmit: {
        text: "Tambah Slide Baru",
        btnClass: "btn-primary",
        action: function () {
          ajax_file(
            {
              url: Urls("Slide/add_slide"),
              method: "post",
              form: true,
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              slide(100, "slide", "Slide");
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

function form_add_update_slide(JSONValue) {
  var id = "";
  var name = "";
  var photo = "";
  if (JSONValue != undefined) {
    const value = JSON.parse(JSONValue);
    id = `<input type="hidden" name="id" value="${value.id}">`;
    name = value.name;
    photo = `<div class="col-12"> 
               <div class="form-group">
                  <label>Photo Slide</label>
                  <div class="mx-auto">
                     <img src="static/img/slide/${value.img}" class="img-fluid w-100" alt="Photo Slide">
                  </div>
               </div>
            </div>
            <div class="w-100"></div>`;
  }

  var form = `<form id="form" class="formName" enctype="multipart/form-data" method="post">
                  <div class="row px-0 py-3 mx-0">
                      ${id}
                      ${photo}
                      <div class="col-12"> 
                        <div class="form-group">
                          <label>Upload Photo Slide</label>
                          <input type="file" class="form-control form-control-sm" name="photo" placeholder="Upload Photo Slide">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Judul Slide</label>
                          <textarea class="form-control" id="name" name="name" rows="3" style="resize:none;" placeholder="Judul Slide">${name}</textarea>
                        </div>
                      </div>
                  </div>
              </form>`;
  return form;
}

function delete_slide(id) {
  ajax_default(
    {
      url: Urls("Slide/delete"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      smile_alert(e.error_msg);
      slide(100, "slide", "Slide");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function edit_slide(id) {
  ajax_default(
    {
      url: Urls("Slide/get_info_edit_slide"),
      method: "post",
      data: { id: id },
    },
    function (e, xhr) {
      $.confirm({
        columnClass: "col-6",
        title: "Edit Slide",
        type: "green",
        theme: "material",
        content: form_add_update_slide(JSON.stringify(e.data)),
        closeIcon: false,
        buttons: {
          tutup: function () {
            return true;
          },
          formSubmit: {
            text: "Perbaharui Slide",
            btnClass: "btn-primary",
            action: function () {
              ajax_file(
                {
                  url: Urls("Slide/update_slide"),
                  method: "post",
                  form: true,
                },
                function (e, xhr) {
                  smile_alert(e.error_msg);
                  slide(100, "slide", "Slide");
                },
                function (status, errMsg) {
                  frown_alert(errMsg.error_msg);
                }
              );
            },
          },
        },
      });
      // smile_alert(e.error_msg);
      // slide(100, "slide", "Slide");
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}
