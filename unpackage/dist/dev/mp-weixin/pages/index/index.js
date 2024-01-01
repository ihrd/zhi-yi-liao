"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../uni_modules/uni-im/lib/main.js");
require("../../uni_modules/uni-im/common/utils.js");
require("../../uni_modules/uni-im/common/md5.js");
require("../../uni_modules/uni-im/common/toFriendlyTime.js");
require("../../uni_modules/uni-im/common/appEvent.js");
require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
require("../../uni_modules/uni-im/lib/MsgManager.js");
require("../../uni_modules/uni-im/lib/createObservable.js");
const _sfc_main = {
  computed: {
    unreadMsgCount() {
      return uni_modules_uniIm_lib_main.uniIm.conversation.unreadCount();
    },
    notificationUnreadCount() {
      return uni_modules_uniIm_lib_main.uniIm.notification.unreadCount();
    }
  },
  data() {
    return {};
  },
  async onReady() {
    if (!uni_modules_uniIm_lib_main.uniIm.isWidescreen) {
      common_vendor.index.showLoading({ mask: true });
      try {
        await uni_modules_uniIm_lib_main.uniIm.conversation.loadMore();
      } catch (e) {
        console.log(e);
      }
      common_vendor.index.hideLoading();
    }
  },
  methods: {
    toPath(path) {
      common_vendor.index.navigateTo({
        url: path,
        fail: () => {
          common_vendor.index.switchTab({
            url: path,
            fail: (e) => {
              console.error(e);
            }
          });
        }
      });
    },
    async clear() {
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toPath("/uni_modules/uni-im/pages/index/index")),
    b: common_vendor.p({
      title: "会话列表",
      link: true,
      ["show-badge"]: $options.unreadMsgCount > 0,
      ["badge-text"]: $options.unreadMsgCount + "",
      ["badge-style"]: {
        "background": "#f41500"
      }
    }),
    c: common_vendor.o(($event) => $options.toPath("/uni_modules/uni-im/pages/userList/userList")),
    d: common_vendor.p({
      title: "用户列表",
      link: true
    }),
    e: common_vendor.o(($event) => $options.toPath("/uni_modules/uni-im/pages/contacts/contacts")),
    f: common_vendor.p({
      title: "通讯录",
      link: true,
      ["show-badge"]: $options.notificationUnreadCount > 0,
      ["badge-text"]: $options.notificationUnreadCount + "",
      ["badge-style"]: {
        "background": "#f41500"
      }
    }),
    g: common_vendor.o(($event) => $options.toPath("/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true")),
    h: common_vendor.p({
      title: "个人中心",
      link: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
