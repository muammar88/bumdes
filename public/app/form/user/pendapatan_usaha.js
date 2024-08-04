function pendapatan_usaha_index(path, url) {
  var tb = tables({
    width: [10, 25, 20, 25, 15, 5],
    columns: [
      { title: "Kode", center: true },
      { title: "Info Pegawai Input", center: true },
      { title: "Info Pendapatan", center: true },
      { title: "Keterangan", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools: search_btn({
      placeholder: "KODE",
      width: 450,
      onclick: `onClick="${path}_start('${path}', '${url}')"`,
      path: path,
    }),
    path: path,
    not_found_label: "Riwayat Pendapatan Tidak Ditemukan",
  });

  return tb;
}

function pendapatan_usaha_start(path, url) {
  pendapatan_usaha(100, path, url);
}

function pendapatan_usaha(perpage, path, url, input) {
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
      '<td colspan="6"><center>Riwayat Pendapatan  Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_pendapatan_usaha(JSONData) {
  const json = JSON.parse(JSONData);
  var btn = [];
  btn[1] = btnDanger({
    title: "Delete Pendapatan Usaha",
    onClick: ` onclick="delete_pendapatan_usaha('${json.id}')" `,
    icon: "fas fa-times",
  });

  var obj_info_pegawai = [
    { title: "NAMA PEGAWAI", value: json.nama_pegawai },
    { title: "NAMA USAHA", value: json.nama_usaha },
  ];

  var obj_info_pendapataan = [
    { title: "PENDAPATAN", value: "Rp " + numberFormat(json.pendapatan) },
    { title: "PENGELUARAN", value: "Rp " + numberFormat(json.pengeluaran) },
    { title: "SISA", value: "Rp " + numberFormat(json.sisa) },
  ];

  var info_pegawai = simpleTableFunc(obj_info_pegawai, "40");
  var info_pendapatan = simpleTableFunc(obj_info_pendapataan, "40");

  var html = tr([
    td_center(["<b>#" + json.kode + "</b>"]),
    td_center([info_pegawai]),
    td_center([info_pendapatan]),
    td_center([json.keterangan]),
    td_center([json.updatedAt]),
    td_center(btn, 'style="text-align:right;"'),
  ]);
  return html;
}

function delete_pendapatan_usaha(id) {
  $.confirm({
    columnClass: "col-6",
    title: "Peringatan",
    type: "green",
    theme: "material",
    content: "Apakah anda yakin akan menghapus riwayat pendapatan ini?.",
    closeIcon: false,
    buttons: {
      tutup: function () {
        return true;
      },
      iya: {
        text: "Iya",
        btnClass: "btn-danger",
        action: function () {
          ajax_default(
            {
              url: Urls("Pendapatan_usaha/delete"),
              method: "post",
              data: { id: id },
            },
            function (e, xhr) {
              smile_alert(e.error_msg);
              pendapatan_usaha(100, "pendapatan_usaha", "Pendapatan_usaha");
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
