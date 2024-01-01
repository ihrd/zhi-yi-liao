import { _ as _export_sfc, f as formatAppLog, a as resolveEasycom } from "../../../../_plugin-vue_export-helper.js";
import { B as Bs, a as uniIm, s as store, u as uniImUtils } from "../../../../utils.js";
import { openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createElementVNode, toDisplayString, resolveDynamicComponent, createVNode, createCommentVNode, withCtx, Fragment, renderList, createBlock, withModifiers } from "vue";
import { _ as __easycom_0$1 } from "../../../../uni-list-chat.js";
import { _ as __easycom_3 } from "../../../../uni-load-more.js";
import { _ as __easycom_3$1 } from "../../../../uni-list-item.js";
import { _ as __easycom_1 } from "../../../../uni-list.js";
import "../contacts/contacts.js";
import "../../../../uni-i18n.es.js";
import "../../../../uni-icons.js";
const _style_0$1 = { "uni-link--withline": { "": { "textDecoration": "underline" } } };
const _sfc_main$1 = {
  name: "uniLink",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    download: {
      type: String,
      default: ""
    },
    showUnderLine: {
      type: [Boolean, String],
      default: true
    },
    copyTips: {
      type: String,
      default: "已自动复制网址，请在手机浏览器里粘贴该网址"
    },
    color: {
      type: String,
      default: "#999999"
    },
    fontSize: {
      type: [Number, String],
      default: 14
    }
  },
  computed: {
    isShowA() {
      if ((this.isMail() || this.isTel()) && this._isH5 === true) {
        return true;
      }
      return false;
    }
  },
  created() {
    this._isH5 = null;
  },
  methods: {
    isMail() {
      return this.href.startsWith("mailto:");
    },
    isTel() {
      return this.href.startsWith("tel:");
    },
    openURL() {
      if (this.isTel()) {
        this.makePhoneCall(this.href.replace("tel:", ""));
      } else {
        plus.runtime.openURL(this.href);
      }
    },
    makePhoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber
      });
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.isShowA ? (openBlock(), createElementBlock("a", {
    key: 0,
    class: normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
    href: $props.href,
    style: normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
    download: $props.download
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createElementVNode("u-text", null, toDisplayString($props.text), 1)
    ])
  ], 14, ["href", "download"])) : (openBlock(), createElementBlock("u-text", {
    key: 1,
    class: normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
    style: normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.openURL && $options.openURL(...args))
  }, toDisplayString($props.text), 7));
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const _style_0 = { "group-icon": { "": { "position": "absolute", "top": 5, "left": 55, "backgroundColor": "#ea4938", "color": "#ffffff", "fontSize": 12, "width": 16, "height": 16, "lineHeight": 16, "textAlign": "center" } }, "tip": { "": { "flex": 1 } }, "user-list": { "": { "flex": 1, "backgroundColor": "#f5f5f5" } } };
const db = Bs.database();
let lastConversationId = false;
let sortIndex = 0;
const _sfc_main = {
  data() {
    return {
      wHeight: "auto",
      userInfo: {},
      dynamicComponentName: "uni-im-addPeopleGroups",
      //通过动态组件引入页面在pc端显示
      view2Title: "加人/加群",
      showContactsView: false,
      chatInfoIsShow: false,
      currentConversation: {}
    };
  },
  computed: {
    conversationList() {
      sortIndex++;
      let conversationList = uniIm.conversation.dataList;
      setTimeout(() => {
        sortIndex = 0;
      }, 1e3);
      if (sortIndex > 6) {
        return conversationList;
      }
      return conversationList.sort(function(a, b) {
        if (b.id == uniIm.currentConversationId) {
          return 0;
        }
        if (b.chatText) {
          b.update_time = Date.now();
        }
        let a_update_time = a.update_time || 0;
        let b_update_time = b.update_time || 0;
        let aml = a.msgList.length;
        let bml = b.msgList.length;
        if (aml) {
          let create_time = a.msgList[aml - 1].create_time;
          if (create_time > a_update_time) {
            a_update_time = create_time;
          }
        }
        if (bml) {
          let create_time = b.msgList[bml - 1].create_time;
          if (create_time > b_update_time) {
            b_update_time = create_time;
          }
        }
        return b_update_time - a_update_time;
      });
    },
    loadMoreContentText() {
      return {
        contentrefresh: "正在加载...",
        contentnomore: this.conversationList.length ? "没有更多数据了" : "没有会话数据"
      };
    },
    conversationHasMore() {
      return uniIm.conversation.hasMore;
    },
    // 导入uniIm响应式数据，支持别名：比如:['a as b']
    ...uniIm.mapState(["currentConversationId", "isWidescreen"]),
    unreadMsgCount() {
      return uniIm.conversation.unreadCount();
    },
    unreadnotificationCount() {
      return uniIm.notification.unreadCount();
    },
    currentUserInfo() {
      return store.userInfo;
    },
    avatarUrl() {
      if (this.currentUserInfo.avatar_file && this.currentUserInfo.avatar_file.url) {
        return this.currentUserInfo.avatar_file.url;
      }
      return "/uni_modules/uni-im/static/avatarUrl.png";
    }
  },
  watch: {
    unreadMsgCount(unreadMsgCount) {
      formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:233", {
        unreadMsgCount
      });
      plus.runtime.setBadgeNumber(unreadMsgCount);
      if (unreadMsgCount == 0) {
        uni.removeTabBarBadge({
          index: 0,
          complete: (e) => {
            formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:245", e);
          }
        });
      } else {
        uni.setTabBarBadge({
          index: 0,
          text: unreadMsgCount + "",
          complete: (e) => {
          }
        });
      }
    },
    showContactsView(showContactsView) {
      if (showContactsView) {
        lastConversationId = this.currentConversationId;
        uniIm.currentConversationId = false;
      } else {
        if (lastConversationId) {
          uniIm.currentConversationId = lastConversationId;
          this.$nextTick(() => {
            this.toChat(lastConversationId);
          });
        }
      }
    },
    async currentConversationId(id) {
      this.currentConversation = await uniIm.conversation.get(id);
    }
  },
  created() {
    this.wHeight = uni.getSystemInfoSync().windowHeight + "px";
  },
  async onLoad(param) {
    let {
      token,
      user_id,
      conversation_id,
      joinGroup
    } = param;
    let version = "2023-05-22-01";
    let lastVersion = uni.getStorageSync("uni-im-storage-version");
    if (lastVersion && lastVersion != version) {
      uni.setStorageSync("uni-im-storage-version", version);
      uni.clearStorage();
    }
    let {
      tokenExpired
    } = Bs.getCurrentUserInfo();
    if (!tokenExpired || tokenExpired < Date.now()) {
      formatAppLog("info", "at uni_modules/uni-im/pages/index/index.nvue:300", "当前用户的登录状态无效，将自动跳转至登录页面。", param);
      let url = "/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=";
      let paramString = "/uni_modules/uni-im/pages/index/index?";
      for (let key in param) {
        paramString += `${key}=${param[key]}&`;
      }
      paramString = paramString.substring(0, paramString.length - 1);
      url += encodeURIComponent(paramString);
      return uni.reLaunch({
        url
      });
    }
    this.$nextTick(() => {
      this.init({
        user_id,
        conversation_id
      });
    });
    this.onLoginSuccess = async () => {
      this.init({
        user_id,
        conversation_id
      });
    };
    uni.$on("uni-id-pages-login-success", this.onLoginSuccess);
    uni.$on("uni-im-toChat", (param2) => {
      if (param2) {
        lastConversationId = false;
        this.toChat(param2);
      }
      this.showContactsView = false;
    });
    if (joinGroup) {
      let group_id = joinGroup;
      formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:347", "group_id", group_id);
      db.collection("uni-im-group-join").add({
        group_id,
        "message": ""
      }).then((res) => {
        formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:352", "res: ", res);
        uni.showToast({
          icon: "none",
          title: "已申请"
        });
      }).catch((err) => {
        uni.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    }
  },
  async onReady() {
  },
  onUnload() {
    uni.$off("uni-id-pages-login-success", this.onLoginSuccess);
  },
  onHide() {
  },
  methods: {
    clickSearchBarBox() {
      uni.showToast({
        title: "暂不支持",
        icon: "none"
      });
    },
    async loadMore() {
      let data = await uniIm.conversation.loadMore();
      return data;
    },
    clickMenu(data) {
      this.dynamicComponentName = data.componentName;
      if (data.title) {
        this.view2Title = data.title;
      }
      if (data.param) {
        this.$nextTick(() => {
          this.$refs.dynamicComponent.setParam(data.param);
        });
      }
      if (data.componentName == "uni-im-createGroup") {
        this.$nextTick(() => {
          this.$refs.dynamicComponent.getFriendsData();
        });
      }
    },
    readQrCode() {
      uni.scanCode({
        complete: (e) => {
          try {
            let data = JSON.parse(e.result);
            if (data.type == "uni-im" && data.subType == "groupInfo") {
            }
          } catch (e2) {
          }
        }
      });
    },
    async init({
      conversation_id,
      user_id
    }) {
      await this.loadMore();
      if (conversation_id) {
        this.toChat(conversation_id);
      } else if (user_id) {
        const currentConversation = await uniIm.conversation.get({
          friend_uid: user_id
        });
        this.toChat(currentConversation.id);
      } else {
        if (this.isWidescreen) {
          let [firstConversation] = this.conversationList;
          if (firstConversation) {
            this.currentConversation = await uniIm.conversation.get(firstConversation.id);
            this.toChat(firstConversation.id);
          }
        }
      }
    },
    search(e) {
      uni.showToast({
        title: "加好友功能入口，暂时在左侧菜单的通讯录中",
        icon: "none",
        duration: 3e3
      });
    },
    addUser() {
      uni.showToast({
        title: "加好友功能入口，暂时在左侧菜单的通讯录中",
        icon: "none",
        duration: 3e3
      });
    },
    async toChat(param) {
      this.chatInfoIsShow = false;
      let conversation_id = "";
      if (typeof param == "string") {
        conversation_id = param;
      } else {
        if (param.conversation_id) {
          conversation_id = param.conversation_id;
        } else if (param.group_id) {
          conversation_id = "group_" + param.group_id;
        } else if (param.user_id || param.friend_uid) {
          conversation_id = uniImUtils.getConversationId(param.user_id || param.friend_uid);
        } else {
          throw new Error("toChat param is error");
        }
      }
      uniIm.currentConversationId = conversation_id;
      if (this.isWidescreen) {
        this.$nextTick(() => {
          let chatViewRef = this.$refs["chat-view"];
          if (chatViewRef) {
            chatViewRef.load(conversation_id);
          }
        });
      } else {
        uni.navigateTo({
          url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + conversation_id,
          animationDuration: 300
        });
      }
    },
    showChatInfo() {
      this.chatInfoIsShow = !this.chatInfoIsShow;
    },
    toUcenter() {
      uni.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true",
        complete(e) {
          formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:524", "e: " + JSON.stringify(e));
        }
      });
    },
    friendlyTime(timestamp) {
      return uniImUtils.toFriendlyTime(timestamp);
    }
  },
  async onReachBottom() {
    await this.loadMore();
  },
  onNavigationBarButtonTap(e) {
    if (e.index) {
      let data = uni.getStorageInfoSync();
      data.keys.forEach((item) => {
        if (item.includes("uni-im-msg:") || item.includes("uni-im-conversation")) {
          uni.removeStorageSync(item);
        }
      });
      uni.showToast({
        title: "clear storage ok",
        icon: "none"
      });
    } else {
      uni.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true",
        complete: (e2) => {
          formatAppLog("log", "at uni_modules/uni-im/pages/index/index.nvue:555", e2);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_link = resolveEasycom(resolveDynamicComponent("uni-link"), __easycom_0);
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
    createElementVNode("view", { id: "page" }, [
      _ctx.isWidescreen ? (openBlock(), createElementBlock("view", {
        key: 0,
        id: "about",
        space: "nbsp"
      }, [
        createElementVNode("u-text", null, "欢迎体验uni-im ​"),
        createVNode(_component_uni_link, {
          href: "https://ext.dcloud.net.cn/plugin?id=9711",
          text: "[点此下载插件]"
        })
      ])) : createCommentVNode("", true),
      createElementVNode("view", { id: "center-view" }, [
        createVNode(_component_uni_list, {
          class: "user-list",
          style: normalizeStyle({ "height": $data.wHeight, "width": "750rpx" }),
          border: false
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.conversationList, (item, index2) => {
              return openBlock(), createBlock(_component_uni_list_chat, {
                onContextmenu: withModifiers(($event) => $options.toChat(item.id), ["prevent"]),
                key: item.id,
                showBadge: item.unread_count > 0,
                badgeText: item.unread_count,
                link: "",
                title: item.title,
                class: normalizeClass(["user-list-item", { activeConversation: _ctx.currentConversationId == item.id }]),
                note: item.last_msg_note,
                avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
                onClick: ($event) => $options.toChat(item.id),
                direction: "column",
                time: $options.friendlyTime(item.update_time),
                hasCallMe: item.call_list.length
              }, {
                header: withCtx(() => [
                  item.group_id ? (openBlock(), createElementBlock("u-text", {
                    key: 0,
                    class: "group-icon"
                  }, "群")) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["onContextmenu", "showBadge", "badgeText", "title", "class", "note", "avatar", "onClick", "time", "hasCallMe"]);
            }), 128)),
            $options.conversationList.length ? (openBlock(), createElementBlock("cell", {
              key: 0,
              onAppear: _cache[0] || (_cache[0] = ($event) => $options.loadMore())
            }, null, 32)) : createCommentVNode("", true),
            createVNode(_component_uni_list_item, { customStyle: { backgroundColor: "#f5f5f5", padding: 0 } }, {
              body: withCtx(() => [
                createVNode(_component_uni_load_more, {
                  class: "tip",
                  contentText: $options.loadMoreContentText,
                  status: $options.conversationHasMore ? "loading" : "noMore"
                }, null, 8, ["contentText", "status"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["style"])
      ])
    ])
  ]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  index as default
};
