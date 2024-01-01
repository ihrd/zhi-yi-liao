"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      code: "",
      isRotate: false
    };
  },
  onLoad({
    code
  }) {
    this.code = decodeURIComponent(code);
  },
  methods: {
    rotate() {
      this.isRotate = !this.isRotate;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isRotate ? 1 : ""
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/common/uni-im-code-pages/uni-im-code-pages.vue"]]);
wx.createPage(MiniProgramPage);
