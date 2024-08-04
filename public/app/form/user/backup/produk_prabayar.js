function produk_prabayar_index(path, url) {
  var tb = tables({
    width: [25, 25, 10, 20, 10, 10],
    columns: [
      { title: "Info Produk", center: true },
      { title: "Info Harga", center: true },
      { title: "Server", center: true },
      { title: "Koneksi Server", center: true },
      { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      btn_primary({
        label: "Pilih Server",
        title: "Update Produk Digiflaz",
        icon: "fas fa-server",
        onclick: "pilih_server",
      }) +
      btn_primary({
        label: "Tambah Produk",
        title: "Pilih Produk Seller Terbaik",
        icon: "fas fa-plus",
        onclick: "add_produk",
        class: "mx-2",
      }) +
      btn_primary({
        label: "Markup",
        title: "Pilih Produk Seller Terbaik",
        icon: "fas fa-money-bill",
        onclick: "markup",
      }) +
      btn_primary({
        label: "Update Harga",
        title: "Pilih Produk Seller Terbaik",
        icon: "fas fa-money-bill",
        onclick: "update_harga",
        class: "mx-2",
      }) +
      search_btn({
        placeholder: "KODE PRODUK",
        width: 250,
        onclick: `onClick="iak_prabayar(100, '${path}', '${url}')"`,
        path: path,
      }) +
      selectFN({
        name_id: "param_koneksi_digiflaz",
        option: [
          { id: "semua", value: "Semua" },
          { id: "sudah_konek", value: "Sudah Konek" },
          { id: "belum_konek", value: "Belum Konek" },
        ],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }) +
      selectFN({
        name_id: "param_active_digiflaz",
        option: [
          { id: "active", value: "Aktif" },
          { id: "inactive", value: "Non Aktif" },
        ],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }) +
      selectFN({
        name_id: "param_server_produk",
        option: [{ id: "0", value: "Pilih Semua Server Produk" }],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }) +
      selectFN({
        name_id: "param_operator_produk",
        option: [{ id: "0", value: "Pilih Semua Operator Produk" }],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }) +
      selectFN({
        name_id: "param_kategori_produk",
        option: [{ id: "0", value: "Pilih Semua Kategori Produk" }],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }),
    path: path,
    not_found_label: "Daftar Produk Prabayar Tidak Ditemukan",
  });

  return tb;
}

function produk_prabayar_start(path, url) {
  ajax_default(
    {
      url: Urls("Produk_prabayar/get_param_produk_prabayar"),
      method: "get",
      loader: true,
    },
    function (e, xhr) {
      var option = `<option value="0">Pilih Semua Operator</option>`;
      for (let x in e.data) {
        option += `<option value="${e.data[x].id}" >${e.data[x].name}</option>`;
      }
      $("#param_operator").html(option);

      produk_prabayar(100, path, url);
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function produk_prabayar(perpage, path, url, input) {
  var param = [];
  param["search"] = $("#search_" + path).val();
  param["operator"] = $("#param_operator").val();
  param["active"] = $("#param_active_digiflaz").val();
  param["koneksi"] = $("#param_koneksi").val();

  if (input != undefined) {
    param["pageNumber"] = input;
  }

  get_data(perpage, {
    url: Urls(url + "/server_side"),
    pagination_id: "pagination_" + path,
    bodyTable_id: "body_" + path,
    fn: "List_" + path,
    warning_text:
      '<td colspan="8"><center>Daftar Produk Prabayar IAK Tidak Ditemukan</center></td>',
    param: param,
  });
}

function List_produk_prabayar(JSONData) {
  var json = JSON.parse(JSONData);
  var btn = [];
  btn[0] = btnDefault({
    title: "Tambah Kostumer",
    onClick: ` onclick="add_kostumer_agen('${json.id}')" `,
    icon: "fas fa-user-plus",
  });
  btn[1] = btnDefault({
    title: "Pembayaran Fee Agen",
    onClick: ` onclick="pembayaran_fee_agen('${json.id}')" `,
    icon: "fas fa-money-bill-alt",
  });
  btn[2] = btnDanger({
    title: "Delete Daftar Agen",
    onClick: ` onclick="delete_daftar_agen('${json.id}')" `,
    icon: "fas fa-times",
  });

  var obj_info_product = [
    { title: "KODE", value: "<b>#" + json.kode + "</b>" },
    { title: "NAME", value: json.name },
    { title: "KATEGORI", value: json.kategori },
    { title: "OPERATOR", value: json.operator },
  ];

  var obj_info_harga = [
    { title: "HARGA SERVER", value: "Rp " + numberFormat(json.harga_server) },
    { title: "MARKUP", value: "Rp " + numberFormat(json.markup) },
    {
      title: "HARGA JUAL",
      value: "Rp " + numberFormat(json.harga_server + json.markup),
    },
    {
      title: "STATUS",
      value:
        json.status == "active"
          ? `<span style="color:green">Active</span>`
          : `<span style="color:red">Inactive</span>`,
    },
  ];

  var info_product = simpleTableFunc(obj_info_product, "30");
  var info_harga = simpleTableFunc(obj_info_harga, "40");

  var html = tr([
    td_center([info_product]),
    td_center([info_harga]),
    td_center([json.server_name]),
    td_center([]),
    td_center([json.updatedAt]),
    td(btn, 'style="text-align:right;"'),
  ]);
  return html;
}
