function laporan_pendapatan_bumdes_index(path, url) {
  return `<div class="col-12 col-lg-12" id='calendar'></div>`;
}

function laporan_pendapatan_bumdes_start(path, url) {
  laporan_pendapatan_bumdes();
}

function laporan_pendapatan_bumdes() {
  ajax_default(
    {
      url: Urls("Laporan_pendapatan_desa/server_side"),
      method: "get",
    },
    function (e, xhr) {
      var data = {
        data: e.data,
        id: "calendar",
      };
      my_calendar(data);
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}
