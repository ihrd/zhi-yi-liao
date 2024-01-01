"use strict";
const uni_modules_uniIm_common_utils = require("../../common/utils.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../common/md5.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
require("../../../uni-id-pages/common/store.js");
require("../../../uni-id-pages/config.js");
require("../../lib/main.js");
require("../../lib/MsgManager.js");
require("../../lib/createObservable.js");
const _sfc_main = {
  props: {
    msg: {
      type: Object,
      default() {
        return {
          userList: []
        };
      }
    }
  },
  computed: {
    friendlyTime() {
      return uni_modules_uniIm_common_utils.utils.toFriendlyTime(this.msg.create_time || this.msg.client_create_time);
    },
    content() {
      switch (this.msg.action) {
        case "join-group-notice":
          return "" + this.msg.body.user_list.map((item) => item.nickname).join(" , ") + " 加入群聊";
        default:
          return this.msg.body;
      }
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.friendlyTime),
    b: common_vendor.t($options.content)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-msg-system/uni-im-msg-system.vue"]]);
wx.createComponent(Component);
