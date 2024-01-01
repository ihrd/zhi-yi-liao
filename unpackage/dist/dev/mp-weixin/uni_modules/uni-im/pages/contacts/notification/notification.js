"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniIm_common_utils = require("../../../common/utils.js");
const uni_modules_uniIm_lib_main = require("../../../lib/main.js");
const uni_modules_uniIm_pages_contacts_notification_action = require("./action.js");
require("../../../common/md5.js");
require("../../../common/toFriendlyTime.js");
require("../../../common/appEvent.js");
require("../../../../uni-id-pages/common/store.js");
require("../../../../uni-id-pages/config.js");
require("../../../lib/MsgManager.js");
require("../../../lib/createObservable.js");
const db = common_vendor.Bs.database();
const _sfc_main = {
  data() {
    return {
      filterNotice: {},
      tips: "",
      hasMore: true
      // notificationDatas:[]
    };
  },
  async onLoad({ param }) {
    param = JSON.parse(decodeURIComponent(param));
    this.setParam(param);
  },
  computed: {
    //是否为pc宽屏（width>960px）
    isWidescreen() {
      return uni_modules_uniIm_lib_main.uniIm.isWidescreen;
    },
    notificationDatas() {
      let notificationDatas = uni_modules_uniIm_lib_main.uniIm.notification.get(this.filterNotice);
      if (notificationDatas.length == 0) {
        setTimeout(() => {
          this.hasMore = false;
        }, 100);
      }
      return notificationDatas;
    }
  },
  mounted() {
    this.hasMore = uni_modules_uniIm_lib_main.uniIm.notification.hasMore;
  },
  methods: {
    setParam({ filterNotice, title }) {
      if (typeof filterNotice == "string") {
        filterNotice = JSON.parse(decodeURIComponent(filterNotice));
      }
      this.filterNotice = filterNotice;
      console.log("filterNotice", filterNotice);
      common_vendor.index.setNavigationBarTitle({
        title
      });
      if (title == "新朋友" && !this.isWidescreen) {
        this.tips = "好友请求通知";
      }
    },
    async setItem({ _id }, param) {
      const datas = uni_modules_uniIm_lib_main.uniIm.notification.get(this.filterNotice);
      for (let i = 0; i < datas.length; i++) {
        if (datas[i]._id == _id) {
          datas[i] = deepAssign(datas[i], param);
          uni_modules_uniIm_lib_main.uniIm.notificationDatas = datas;
          console.log("uniIm.notificationDatas", uni_modules_uniIm_lib_main.uniIm.notificationDatas);
          break;
        }
      }
      await db.collection("uni-im-notification").where(`"_id" == "${_id}" && "user_id" == $cloudEnv_uid`).get();
      await db.collection("uni-im-notification").where(`"_id" == "${_id}" && "user_id" == $cloudEnv_uid`).update(param);
      function isPlainObject(obj) {
        return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Object]";
      }
      function deepAssign() {
        let len = arguments.length, target = arguments[0];
        if (!isPlainObject(target)) {
          target = {};
        }
        for (let i = 1; i < len; i++) {
          let source = arguments[i];
          if (isPlainObject(source)) {
            for (let s in source) {
              if (s === "__proto__" || target === source[s]) {
                continue;
              }
              if (isPlainObject(source[s])) {
                target[s] = deepAssign(target[s], source[s]);
              } else {
                target[s] = source[s];
              }
            }
          }
        }
        return target;
      }
    },
    async clickHandle(index, item) {
      if (!item.is_read) {
        this.setItem(item, { is_read: true });
      }
      let path = item.path || item.payload.path;
      if (path) {
        common_vendor.index.navigateTo({
          url: path,
          fail: (e) => {
            console.error(e);
          }
        });
      }
    },
    doAction(index, type) {
      let item = this.notificationDatas[index];
      let e = {
        subType: item.payload.subType,
        confirm: type === 1,
        cancel: type === 0,
        item
      };
      uni_modules_uniIm_pages_contacts_notification_action.action(e, (data) => {
        console.log("doAction", data);
        this.setItem(item, {
          is_read: true,
          payload: {
            state: type === 1 ? "confirm" : "cancel"
          }
        });
      });
    },
    friendlyTime(timestamp) {
      return uni_modules_uniIm_common_utils.utils.toFriendlyTime(timestamp);
    },
    handleText(state) {
      switch (state) {
        case 0:
          return "同意";
        case 100:
          return "已同意";
        case -100:
          return "已拒绝";
        default:
          return "其他";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_list_chat2 + _easycom_uni_load_more2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_chat = () => "../../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_load_more = () => "../../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_list_item = () => "../../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_chat + _easycom_uni_load_more + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.tips
  }, $data.tips ? {
    b: common_vendor.t($data.tips)
  } : {}, {
    c: $options.notificationDatas && $options.notificationDatas.length
  }, $options.notificationDatas && $options.notificationDatas.length ? {
    d: common_vendor.f($options.notificationDatas, (item, index, i0) => {
      return common_vendor.e({
        a: item.payload.state
      }, item.payload.state ? {
        b: common_vendor.t("已" + (item.payload.state == "confirm" ? item.payload.confirmText : item.payload.cancelText))
      } : common_vendor.e({
        c: item.payload.cancelText
      }, item.payload.cancelText ? {
        d: common_vendor.t(item.payload.cancelText),
        e: common_vendor.o(($event) => $options.doAction(index, 0), item.id)
      } : {}, {
        f: item.payload.confirmText
      }, item.payload.confirmText ? {
        g: common_vendor.t(item.payload.confirmText),
        h: common_vendor.o(($event) => $options.doAction(index, 1), item.id)
      } : {}, {
        i: !item.payload.cancelText && !item.payload.confirmText && item.path
      }, !item.payload.cancelText && !item.payload.confirmText && item.path ? {
        j: "9a43f6df-2-" + i0 + "," + ("9a43f6df-1-" + i0),
        k: common_vendor.p({
          type: "right",
          color: "#cccccc"
        })
      } : {}), {
        l: item.id,
        m: common_vendor.o(($event) => $options.clickHandle(index, item), item.id),
        n: "9a43f6df-1-" + i0 + ",9a43f6df-0",
        o: common_vendor.p({
          avatarCircle: true,
          clickable: true,
          ["badge-text"]: item.is_read ? "" : "dot",
          badgePositon: "left",
          title: item.payload.title || item.title,
          note: item.payload.content || item.content || "无",
          avatar: item.payload.avatar_file && item.payload.avatar_file.url ? item.payload.avatar_file.url : "/uni_modules/uni-im/static/noticeIcon/notification2.png",
          direction: "column",
          time: $options.friendlyTime(item.create_time)
        })
      });
    })
  } : {
    e: common_vendor.p({
      status: $data.hasMore ? "loading" : "noMore"
    })
  }, {
    f: common_vendor.p({
      border: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9a43f6df"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/contacts/notification/notification.nvue"]]);
wx.createPage(MiniProgramPage);
