function pengaturan_index(path, url) {
  var form = `<div class="col-lg-12 mt-0 pt-0" >
                  <form class="py-2" id="form" class="formName" onsubmit="updatePengaturan(event)">
                     <div class="row mb-3 px-2">
                        <div class="col-12 p-2 text-right" style="background-color: #e9ecef;">
                           <div class="row">
                              <div class="col-12 submitButtonArea" >
                                 <button type="button" class="btn btn-default" onclick="activeEditPengaturan()">Edit Pengaturan</button>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-3">
                           <div class="row">
                              <div class="col-12" >
                                 <div class="form-group">
                                    <label>Logo</label>
                                    <div class="text-center py-5" style="border: 1px solid #ced4da;height: 180px;border-radius: 10px;" id="area_logo">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12" >
                                 <div class="form-group">
                                    <label>Upload Logo</label>
                                    <input type="file" class="form-control form-control-sm" id="logo" name="logo" value="" placeholder="Logo" disabled="">
                                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-3">
                           <div class="row">
                              <div class="col-12" >
                                 <div class="form-group">
                                    <label>Logo Backend</label>
                                    <div class="text-center py-5" style="border: 1px solid #ced4da;height: 180px;border-radius: 10px;" id="area_logo_backend">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12" >
                                 <div class="form-group">
                                    <label>Upload Logo Backend</label>
                                    <input type="file" class="form-control form-control-sm" id="logo_backend" name="logo_backend" value="" placeholder="Logo Backend" disabled="">
                                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-6">
                           <div class="row">
                              <div class="col-12">
                                 <div class="form-group">
                                    <label>Nama Desa</label>
                                    <input type="text" class="form-control form-control-sm" id="nama_desa" name="nama_desa" value="" placeholder="Nama Desa" disabled="">
                                 </div>
                                 <div class="form-group">
                                    <label>Alamat Kantor BUMDes</label>
                                    <textarea class="form-control" id="alamat_kantor_bumdes" name="alamat_kantor_bumdes" rows="3" style="resize:none;" placeholder="Alamat Kantor BUMDes" disabled=""></textarea>
                                 </div>
                              </div>
                              <div class="col-6">
                                 <div class="form-group">
                                    <label>Telpon</label>
                                    <input type="text" class="form-control form-control-sm" id="telpon" name="telpon" value="" placeholder="Telpon" disabled="">
                                 </div>
                              </div>
                              <div class="col-6">
                                 <div class="form-group">
                                    <label>Nomor Whatsapp</label>
                                    <input type="text" class="form-control form-control-sm" id="nomor_whatsapp" name="nomor_whatsapp" value="" placeholder="Nomor Whatsapp" disabled="">
                                 </div>
                              </div>
                              <div class="col-6">
                                 <div class="form-group">
                                    <label>Link Facebook</label>
                                    <input type="text" class="form-control form-control-sm" id="link_facebook" name="link_facebook" value="" placeholder="Link Facebook" disabled="">
                                 </div>
                              </div>
                              <div class="col-6">
                                 <div class="form-group">
                                    <label>Link Youtube</label>
                                    <input type="text" class="form-control form-control-sm" id="link_youtube" name="link_youtube" value="" placeholder="Link Youtube" disabled="">
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="w-100"></div>
                     </div>
                     <div class="row mb-3 px-2 pt-3">
                        <div class="col-12 p-2 text-right" style="background-color: #e9ecef;">
                           <div class="row">
                              <div class="col-12 submitButtonArea" >
                                 <button type="button" class="btn btn-default" onclick="activeEditPengaturan()">Edit Pengaturan</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>`;
  return form;
}

function activeEditPengaturan() {
  $(".form-control").prop("disabled", false);
  $(".submitButtonArea").html(
    `<button type="button" class="btn btn-default submitButtonArea" onclick="batalEditPengaturan()">Batal</button>
     <button type="submit" class="btn btn-success">Simpan</button>`
  );
}

function batalEditPengaturan() {
  pengaturan();
  $(".form-control").prop("disabled", true);
  $(".submitButtonArea").html(
    `<button type="button" class="btn btn-default" onclick="activeEditPengaturan()">Edit Pengaturan</button>`
  );
}

function updatePengaturan(e) {
  e.preventDefault();
  ajax_file(
    {
      url: Urls("Pengaturan/update_pengaturan"),
      method: "post",
      form: true,
    },
    function (e, xhr) {
      // smile_alert(e.error_msg);
      // pengaturan();
      // $(".form-control").prop("disabled", true);
      // $(".submitButtonArea").html(
      //   `<button type="button" class="btn btn-default" onclick="activeEditPengaturan()">Edit Pengaturan</button>`
      // );
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}

function pengaturan_start(path, url) {
  pengaturan();
}

function pengaturan() {
  ajax_default(
    {
      url: Urls("Pengaturan/get_info_pengaturan"),
      method: "get",
    },
    function (e, xhr) {
      $("#area_logo").html(
        `<img  class="img-fluid" src="static/img/logo.png">`
      );
      $("#area_logo_backend").html(
        `<img  class="img-fluid" src="static/img/logo-backend.png">`
      );
      $("#nama_desa").val(e.nama_desa);
      $("#alamat_kantor_bumdes").val(e.alamat);
      $("#telpon").val(e.telepon);
      $("#nomor_whatsapp").val(e.whatsapp);
      $("#link_facebook").val(e.facebook);
      $("#link_youtube").val(e.youtube);
    },
    function (status, errMsg) {
      frown_alert(errMsg.error_msg);
    }
  );
}
