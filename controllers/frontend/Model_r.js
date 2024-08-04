const moment = require("moment");
const { Op, Member, Agen } = require("../../db/models");
const { db_list_server } = require("../../helpers/db_ops");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async get_data_frontend() {
    const usaha = [
      {
        title: "Pertanian Organik BUMDes Desa A",
        img: "1",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...`,
        path: "pertanian",
      },
      {
        title: "Wisata Desa",
        img: "2",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...`,
        path: "wisata_desa",
      },
      {
        title: "Usaha Kreatif",
        img: "3",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...`,
        path: "usaha_kreatif",
      },
      {
        title: "Usaha Kreatif",
        img: "3",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...`,
        path: "usaha_kreatif",
      },
    ];

    const cerita_kami = [
      {
        img: "1",
        title: "Arti Alhamdulillah, keutamannya, dan kapan saja penggunannya",
        desc: `Kita sering mengucapkan “Alhamdulillah" yang merupakan ungkapan syukur serta memiliki makna mendalam. Namun tidak hanya sekedar ungkapan untuk menyatakan rasa terima kasih dan pujian kepada Allah SWT.`,
      },
      {
        img: "1",
        title: "Arti Alhamdulillah, keutamannya, dan kapan saja penggunannya",
        desc: `Kita sering mengucapkan “Alhamdulillah" yang merupakan ungkapan syukur serta memiliki makna mendalam. Namun tidak hanya sekedar ungkapan untuk menyatakan rasa terima kasih dan pujian kepada Allah SWT.`,
      },
      {
        img: "2",
        title: "Doa Naik Kendaraan Darat, Laut, Udara dan Artinya",
        desc: `Kita sering mengucapkan “Alhamdulillah" yang merupakan ungkapan syukur serta memiliki makna mendalam. Namun tidak hanya sekedar ungkapan untuk menyatakan rasa terima kasih dan pujian kepada Allah SWT.`,
      },
      {
        img: "2",
        title: "Doa Naik Kendaraan Darat, Laut, Udara dan Artinya",
        desc: `Kita sering mengucapkan “Alhamdulillah" yang merupakan ungkapan syukur serta memiliki makna mendalam. Namun tidak hanya sekedar ungkapan untuk menyatakan rasa terima kasih dan pujian kepada Allah SWT.`,
      },
    ];
    return { cerita_kami, usaha };
  }
}

module.exports = Model_r;
