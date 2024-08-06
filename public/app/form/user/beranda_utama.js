function beranda_utama_index(path, url) {
  const div = (input) => {
    return `<div class="${input.class}">${input.value}</div>`;
  };
  const col_3 = (input) => {
    return div({ class: "col-lg-3", value: input });
  };
  const form_small_box = (input) => {
    return div({
      class: "small-box bg-success",
      value:
        div({
          class: "inner",
          value: `  <h3 id="${input.id}" style="font-size: 30px;">0</h3>
                <p>${input.title}</p>`,
        }) +
        div({ class: "icon", value: `<i class="fas fa-info-circle"></i>` }),
    });
  };

  const tb = tables({
    width: [10, 25, 20, 25, 20],
    columns: [
      { title: "Kode", center: true },
      { title: "Info Pegawai Input", center: true },
      { title: "Info Pendapatan", center: true },
      { title: "Keterangan", center: true },
      { title: "DateTimes", center: true },
      // { title: "Aksi", center: true },
    ],
    tools: `<label class="mt-2 mb-0" style="font-size: 14px;">DETAIL PENDAPATAN HARI INI</label>`,
    path: path,
    not_found_label: "Riwayat Pendapatan Tidak Ditemukan",
  });

  var obj = [
    {
      title: "Total Usaha",
      id: "total_usaha",
    },
    {
      title: "Total Pegawai",
      id: "total_pegawai",
    },
    {
      title: "Pendapatan Bulan Ini",
      id: "pendapatan_bulan_ini",
    },
    {
      title: "Pendapatan Hari Ini",
      id: "pendapatan_hari_ini",
    },
  ];
  var form = "";
  for (let x in obj) {
    form += col_3(form_small_box(obj[x]));
  }
  form += tb;

  return form;
}

function beranda_utama_start(path, url) {
  beranda_utama();
}

function beranda_utama() {
  ajax_default(
    {
      url: Urls("Beranda_utama/server_side"),
      method: "get",
    },
    function (e, xhr) {
      $("#total_usaha").html(e.total_usaha);
      $("#total_pegawai").html(e.total_pegawai);
      $("#pendapatan_bulan_ini").html(e.pendapatan_bulan_ini);
      $("#pendapatan_hari_ini").html(e.pendapatan_hari_ini);

      var list_table = "";
      for (let x in e.data) {
        list_table += List_pendapatan_hari_ini(JSON.stringify(e.data[x]));
      }
      $("#body_beranda_utama").html(list_table);
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function List_pendapatan_hari_ini(JSONData) {
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
    //  td_center(btn, 'style="text-align:right;"'),
  ]);
  return html;
}
