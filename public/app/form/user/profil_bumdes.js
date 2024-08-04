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
      icon: "fas fa-newspaper",
      onclick: "add_new_profil",
    }),
    path: path,
    not_found_label: "Daftar Profil BUMDes Tidak Ditemukan",
  });

  return tb;
}
