"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uqrcode = () => "../../../Sansnn-uQRCode/components/uqrcode/uqrcode.js";
const _sfc_main = {
  components: {
    uqrcode
  },
  data() {
    return {
      group_id: "",
      name: "",
      avatar_file: ""
    };
  },
  computed: {
    qrcodeData() {
      let data = {
        "type": "uni-im",
        "subType": "groupInfo",
        "data": {
          group_id: this.group_id,
          name: this.name,
          avatar_file: this.avatar_file
        }
      };
      return JSON.stringify(data);
    }
  },
  onLoad(options) {
    this.group_id = options.id;
    this.name = options.name;
    this.avatar_file = options.avatar_file;
  },
  onReady() {
    setTimeout(() => {
      this.$refs.uqrcode.make({
        success: () => {
        },
        fail: (err) => {
        }
      });
    }, 1e3);
  },
  methods: {
    copyGroupID() {
      common_vendor.index.setClipboardData({
        data: this.group_id,
        success: function() {
          console.log("success");
        }
      });
    },
    save() {
      console.log("保存");
    },
    share() {
      console.log("分享");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.name),
    b: common_vendor.t($data.group_id),
    c: common_vendor.o((...args) => $options.copyGroupID && $options.copyGroupID(...args)),
    d: $data.avatar_file || "/uni_modules/uni-im/static/avatarUrl.png"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0d108bf5"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/group/groupQRCode.nvue"]]);
wx.createPage(MiniProgramPage);
