const express = require("express");
const controllers = require("../controllers/frontend/index");

// ROUTER
const router = express.Router();

router.get("/", controllers.main);

router.get("/Kontak", controllers.kontak);

router.get("/Profil", controllers.profil);

router.get("/Login", controllers.login);

// TENTANG KAMI

// router.get("/Profil", controllers.profil);

// router.get("/Laporan", controllers.laporan);

// // LAYANAN

// router.get("/Rekening_zakat", controllers.rekening_zakat);

// router.get("/Kalkulator_zakat", controllers.kalkulator_zakat);

// router.get("/Konfirmasi_donasi", controllers.main);

// router.get("/Channel_pembayaran", controllers.main);

// router.get("/Jemput_zakat", controllers.main);

// router.get("/Unit_pengumpulan_zakat", controllers.main);

// // KABAR

// router.get("/Artikel", controllers.artikel);

// router.get("/Cerita_aksi", controllers.cerita_aksi);

// // DONASI

// router.get("/Bantuan_sosial", controllers.bantuan_sosial);

// router.get("/Berbagi_hingga_pelosok", controllers.main);

// router.get("/Tunaikan_sedekah_terbaikmu", controllers.main);

// // BUTTON

// router.get("/Bayar_zakat", controllers.bayar_zakat);

// router.get("/Infak", controllers.infak);

// router.get("/Fidyah", controllers.fidyah);

// MASUK

// router.get("/Masuk", controllers.masuk);

// router.get("/Daftar", controllers.daftar);

module.exports = router;
