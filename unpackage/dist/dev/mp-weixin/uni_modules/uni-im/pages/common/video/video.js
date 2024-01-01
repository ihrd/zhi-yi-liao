"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: "",
      showCloseBtn: true
    };
  },
  onLoad({ url }) {
    this.url = url;
    setTimeout(() => {
      this.showCloseBtn = false;
    }, 1e3);
  },
  methods: {
    close() {
      common_vendor.index.navigateBack();
    },
    showCloseBtnFn() {
      this.showCloseBtn = true;
      setTimeout(() => {
        this.showCloseBtn = false;
      }, 5e3);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.url
  }, $data.url ? {
    b: common_vendor.o((...args) => $options.showCloseBtnFn && $options.showCloseBtnFn(...args)),
    c: $data.url
  } : {}, {
    d: $data.showCloseBtn
  }, $data.showCloseBtn ? {
    e: common_vendor.o($options.close),
    f: common_vendor.p({
      size: "30px",
      color: "#FFFFFF",
      type: "closeempty"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/common/video/video.nvue"]]);
wx.createPage(MiniProgramPage);
