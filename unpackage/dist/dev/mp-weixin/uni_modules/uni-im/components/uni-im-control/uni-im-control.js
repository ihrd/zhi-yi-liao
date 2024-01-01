"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
require("../../common/utils.js");
require("../../common/md5.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
require("../../../uni-id-pages/common/store.js");
require("../../../uni-id-pages/config.js");
require("../../lib/MsgManager.js");
require("../../lib/createObservable.js");
const _sfc_main = {
  data() {
    return {
      isShow: false,
      data: {
        top: "",
        left: "",
        right: "",
        width: "",
        msg: {},
        isInTop: false
      }
    };
  },
  computed: {
    iconBoxLeft() {
      let n = parseInt(this.data.left);
      return n ? n * 3 / 2 + 55 + "px" : "";
    },
    iconBoxRight() {
      let n = parseInt(this.data.right);
      return n ? n * 3 / 2 + 50 + "px" : "";
    }
  },
  watch: {
    isShow(isShow) {
    }
  },
  mounted() {
  },
  methods: {
    show(data) {
      this.data = data;
      this.isShow = true;
    },
    copyText() {
      console.log("this.data", this.data);
      common_vendor.index.setClipboardData({
        data: this.data.msg.body,
        complete: (e) => {
          common_vendor.index.hideToast();
          console.log(e);
          this.isShow = false;
        }
      });
    },
    canRevoke() {
      let current_uid = common_vendor.Bs.getCurrentUserInfo().uid;
      let { group_id, from_uid, conversation_id, create_time } = this.data.msg || {};
      let isGroupAdmin = false;
      if (group_id) {
        let conversation = uni_modules_uniIm_lib_main.uniIm.conversation.dataList.find((i) => i.id == conversation_id);
        isGroupAdmin = conversation.group_info.user_id == current_uid;
      }
      if (isGroupAdmin) {
        return true;
      } else {
        return from_uid == current_uid && Date.now() - create_time < 1e3 * 60 * 2;
      }
    },
    async revokeMsg() {
      if (this.canRevoke()) {
        await uni_modules_uniIm_lib_main.uniIm.conversation.revokeMsg(this.data.msg);
      } else {
        common_vendor.index.showToast({
          title: "已超过2分钟，不能撤回",
          icon: "none"
        });
      }
      this.isShow = false;
    },
    async answer() {
      this.$emit("answer", this.data.msgIndex);
      this.isShow = false;
    },
    async deleteMsg() {
      return this.other();
    },
    other() {
      common_vendor.index.showToast({
        title: "暂不支持",
        icon: "none",
        complete: () => {
          this.isShow = false;
        }
      });
    },
    closeMe() {
      setTimeout(() => {
        this.isShow = false;
      }, 300);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShow
  }, $data.isShow ? common_vendor.e({
    b: common_vendor.o((...args) => $options.closeMe && $options.closeMe(...args)),
    c: common_vendor.o((...args) => $options.closeMe && $options.closeMe(...args)),
    d: $data.data.msg.type == "text"
  }, $data.data.msg.type == "text" ? common_vendor.e({
    e: common_vendor.o((...args) => $options.copyText && $options.copyText(...args)),
    f: common_vendor.o((...args) => $options.answer && $options.answer(...args)),
    g: $options.canRevoke()
  }, $options.canRevoke() ? {
    h: common_vendor.o((...args) => $options.revokeMsg && $options.revokeMsg(...args))
  } : {}) : {}, {
    i: common_vendor.o((...args) => $options.deleteMsg && $options.deleteMsg(...args)),
    j: common_vendor.o((...args) => $options.other && $options.other(...args)),
    k: $data.data.top,
    l: $data.data.left,
    m: $data.data.right
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8462d44f"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-control/uni-im-control.vue"]]);
wx.createComponent(Component);
