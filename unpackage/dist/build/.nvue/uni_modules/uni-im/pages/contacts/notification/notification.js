import { f as formatAppLog, _ as _export_sfc, a as resolveEasycom } from "../../../../../_plugin-vue_export-helper.js";
import { B as Bs, a as uniIm, u as uniImUtils } from "../../../../../utils.js";
import { _ as __easycom_0 } from "../../../../../uni-icons.js";
import { resolveDynamicComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode, createVNode, withCtx, Fragment, renderList, createBlock, withModifiers } from "vue";
import { _ as __easycom_0$1 } from "../../../../../uni-list-chat.js";
import { _ as __easycom_3 } from "../../../../../uni-load-more.js";
import { _ as __easycom_3$1 } from "../../../../../uni-list-item.js";
import { _ as __easycom_1 } from "../../../../../uni-list.js";
import "../../../../../uni-i18n.es.js";
const db$1 = Bs.database();
async function action({
  subType,
  confirm,
  cancel,
  item
}, callback) {
  formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/action.js:8", {
    subType,
    confirm,
    cancel,
    item
  });
  switch (subType) {
    case "uni-im-friend-invite":
      uni.showLoading({
        mask: false
      });
      return db$1.collection("uni-im-friend-invite").doc(item.payload.data._id).update({
        state: confirm ? 100 : -100
      }).then((res) => {
        uni.hideLoading();
        callback();
      }).catch((err) => {
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/action.js:28", err);
        uni.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    case "uni-im-group-join-request":
      uni.showLoading({
        mask: false
      });
      await db$1.collection("uni-im-group-join").where({
        _id: item.payload.data.doc_id
      }).update({
        state: confirm ? 100 : -100
      }).then((res) => {
        uni.hideLoading();
        callback();
      }).catch((err) => {
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/action.js:50", err);
        uni.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
      break;
    default:
      formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/action.js:58", { subType });
      break;
  }
}
const _style_0 = { "notification-box": { "": { "flex": 1, "backgroundColor": "#f5f5f5" } }, "tips": { "": { "height": 40, "lineHeight": 40, "paddingLeft": "20rpx", "fontSize": "26rpx", "color": "#666666" } }, "handle-box": { "": { "flexDirection": "row", "height": 40, "alignItems": "center" } }, "handle": { "": { "width": 50, "textAlign": "center", "height": 25, "lineHeight": 25, "backgroundColor": "#efefef", "borderRadius": 50, "fontSize": 12, "marginTop": 0, "marginRight": 5, "marginBottom": 0, "marginLeft": 5 } }, "done": { "": { "width": 50, "backgroundColor": "#FFFFFF", "color": "#aaaaaa" } }, "load-more": { "": { "!backgroundColor": "#f5f5f5", "justifyContent": "center" } }, "tip": { "": { "position": "relative", "left": -15, "width": "750rpx" } } };
const db = Bs.database();
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
      return uniIm.isWidescreen;
    },
    notificationDatas() {
      let notificationDatas = uniIm.notification.get(this.filterNotice);
      if (notificationDatas.length == 0) {
        setTimeout(() => {
          this.hasMore = false;
        }, 100);
      }
      return notificationDatas;
    }
  },
  mounted() {
    this.hasMore = uniIm.notification.hasMore;
  },
  methods: {
    setParam({ filterNotice, title }) {
      if (typeof filterNotice == "string") {
        filterNotice = JSON.parse(decodeURIComponent(filterNotice));
      }
      this.filterNotice = filterNotice;
      formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/notification.nvue:89", "filterNotice", filterNotice);
      uni.setNavigationBarTitle({
        title
      });
      if (title == "新朋友" && !this.isWidescreen) {
        this.tips = "好友请求通知";
      }
    },
    async setItem({ _id }, param) {
      const datas = uniIm.notification.get(this.filterNotice);
      for (let i = 0; i < datas.length; i++) {
        if (datas[i]._id == _id) {
          datas[i] = deepAssign(datas[i], param);
          uniIm.notificationDatas = datas;
          formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/notification.nvue:104", "uniIm.notificationDatas", uniIm.notificationDatas);
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
        uni.navigateTo({
          url: path,
          fail: (e) => {
            formatAppLog("error", "at uni_modules/uni-im/pages/contacts/notification/notification.nvue:162", e);
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
      action(e, (data) => {
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/notification/notification.nvue:180", "doAction", data);
        this.setItem(item, {
          is_read: true,
          payload: {
            state: type === 1 ? "confirm" : "cancel"
          }
        });
      });
    },
    friendlyTime(timestamp) {
      return uniImUtils.toFriendlyTime(timestamp);
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  const _component_uni_list_chat = resolveEasycom(resolveDynamicComponent("uni-list-chat"), __easycom_0$1);
  const _component_uni_load_more = resolveEasycom(resolveDynamicComponent("uni-load-more"), __easycom_3);
  const _component_uni_list_item = resolveEasycom(resolveDynamicComponent("uni-list-item"), __easycom_3$1);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "notification-box" }, [
      $data.tips ? (openBlock(), createElementBlock("u-text", {
        key: 0,
        class: "tips"
      }, toDisplayString($data.tips), 1)) : createCommentVNode("", true),
      createVNode(_component_uni_list, { border: false }, {
        default: withCtx(() => [
          $options.notificationDatas && $options.notificationDatas.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options.notificationDatas, (item, index) => {
            return openBlock(), createBlock(_component_uni_list_chat, {
              key: item.id,
              avatarCircle: true,
              clickable: true,
              "badge-text": item.is_read ? "" : "dot",
              badgePositon: "left",
              title: item.payload.title || item.title,
              note: item.payload.content || item.content || "无",
              avatar: item.payload.avatar_file && item.payload.avatar_file.url ? item.payload.avatar_file.url : "/uni_modules/uni-im/static/noticeIcon/notification2.png",
              onClick: ($event) => $options.clickHandle(index, item),
              direction: "column",
              time: $options.friendlyTime(item.create_time)
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "handle-box" }, [
                  item.payload.state ? (openBlock(), createElementBlock("u-text", {
                    key: 0,
                    class: "handle done"
                  }, toDisplayString("已" + (item.payload.state == "confirm" ? item.payload.confirmText : item.payload.cancelText)), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    item.payload.cancelText ? (openBlock(), createElementBlock("u-text", {
                      key: 0,
                      class: "handle",
                      onClick: withModifiers(($event) => $options.doAction(index, 0), ["stop"])
                    }, toDisplayString(item.payload.cancelText), 9, ["onClick"])) : createCommentVNode("", true),
                    item.payload.confirmText ? (openBlock(), createElementBlock("u-text", {
                      key: 1,
                      class: "handle",
                      onClick: withModifiers(($event) => $options.doAction(index, 1), ["stop"])
                    }, toDisplayString(item.payload.confirmText), 9, ["onClick"])) : createCommentVNode("", true),
                    !item.payload.cancelText && !item.payload.confirmText && item.path ? (openBlock(), createBlock(_component_uni_icons, {
                      key: 2,
                      type: "right",
                      color: "#cccccc"
                    })) : createCommentVNode("", true)
                  ], 64))
                ])
              ]),
              _: 2
            }, 1032, ["badge-text", "title", "note", "avatar", "onClick", "time"]);
          }), 128)) : (openBlock(), createBlock(_component_uni_list_item, {
            key: 1,
            class: "load-more"
          }, {
            body: withCtx(() => [
              createVNode(_component_uni_load_more, {
                class: "tip",
                status: $data.hasMore ? "loading" : "noMore"
              }, null, 8, ["status"])
            ]),
            _: 1
          }))
        ]),
        _: 1
      })
    ])
  ]);
}
const notification = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  notification as default
};
