"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIm_common_utils = require("../../common/utils.js");
const uni_modules_uniIdPages_common_store = require("../../../uni-id-pages/common/store.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
require("../../common/md5.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
require("../../../uni-id-pages/config.js");
require("../../lib/MsgManager.js");
require("../../lib/createObservable.js");
const db = common_vendor.Bs.database();
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
      let conversationList = uni_modules_uniIm_lib_main.uniIm.conversation.dataList;
      setTimeout(() => {
        sortIndex = 0;
      }, 1e3);
      if (sortIndex > 6) {
        return conversationList;
      }
      return conversationList.sort(function(a, b) {
        if (b.id == uni_modules_uniIm_lib_main.uniIm.currentConversationId) {
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
      return uni_modules_uniIm_lib_main.uniIm.conversation.hasMore;
    },
    // 导入uniIm响应式数据，支持别名：比如:['a as b']
    ...uni_modules_uniIm_lib_main.uniIm.mapState(["currentConversationId", "isWidescreen"]),
    unreadMsgCount() {
      return uni_modules_uniIm_lib_main.uniIm.conversation.unreadCount();
    },
    unreadnotificationCount() {
      return uni_modules_uniIm_lib_main.uniIm.notification.unreadCount();
    },
    currentUserInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
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
      console.log({
        unreadMsgCount
      });
      if (unreadMsgCount == 0) {
        common_vendor.index.removeTabBarBadge({
          index: 0,
          complete: (e) => {
            console.log(e);
          }
        });
      } else {
        common_vendor.index.setTabBarBadge({
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
        uni_modules_uniIm_lib_main.uniIm.currentConversationId = false;
      } else {
        if (lastConversationId) {
          uni_modules_uniIm_lib_main.uniIm.currentConversationId = lastConversationId;
          this.$nextTick(() => {
            this.toChat(lastConversationId);
          });
        }
      }
    },
    async currentConversationId(id) {
      this.currentConversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(id);
    }
  },
  created() {
  },
  async onLoad(param) {
    let {
      token,
      user_id,
      conversation_id,
      joinGroup
    } = param;
    let version = "2023-05-22-01";
    let lastVersion = common_vendor.index.getStorageSync("uni-im-storage-version");
    if (lastVersion && lastVersion != version) {
      common_vendor.index.setStorageSync("uni-im-storage-version", version);
      common_vendor.index.clearStorage();
    }
    let {
      tokenExpired
    } = common_vendor.Bs.getCurrentUserInfo();
    if (!tokenExpired || tokenExpired < Date.now()) {
      console.info("当前用户的登录状态无效，将自动跳转至登录页面。", param);
      let url = "/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=";
      let paramString = "/uni_modules/uni-im/pages/index/index?";
      for (let key in param) {
        paramString += `${key}=${param[key]}&`;
      }
      paramString = paramString.substring(0, paramString.length - 1);
      url += encodeURIComponent(paramString);
      return common_vendor.index.reLaunch({
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
    common_vendor.index.$on("uni-id-pages-login-success", this.onLoginSuccess);
    common_vendor.index.$on("uni-im-toChat", (param2) => {
      if (param2) {
        lastConversationId = false;
        this.toChat(param2);
      }
      this.showContactsView = false;
    });
    if (joinGroup) {
      let group_id = joinGroup;
      console.log("group_id", group_id);
      db.collection("uni-im-group-join").add({
        group_id,
        "message": ""
      }).then((res) => {
        console.log("res: ", res);
        common_vendor.index.showToast({
          icon: "none",
          title: "已申请"
        });
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    }
  },
  async onReady() {
  },
  onUnload() {
    common_vendor.index.$off("uni-id-pages-login-success", this.onLoginSuccess);
  },
  onHide() {
  },
  methods: {
    clickSearchBarBox() {
      common_vendor.index.showToast({
        title: "暂不支持",
        icon: "none"
      });
    },
    async loadMore() {
      let data = await uni_modules_uniIm_lib_main.uniIm.conversation.loadMore();
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
      common_vendor.index.scanCode({
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
        const currentConversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get({
          friend_uid: user_id
        });
        this.toChat(currentConversation.id);
      } else {
        if (this.isWidescreen) {
          let [firstConversation] = this.conversationList;
          if (firstConversation) {
            this.currentConversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(firstConversation.id);
            this.toChat(firstConversation.id);
          }
        }
      }
    },
    search(e) {
      common_vendor.index.showToast({
        title: "加好友功能入口，暂时在左侧菜单的通讯录中",
        icon: "none",
        duration: 3e3
      });
    },
    addUser() {
      common_vendor.index.showToast({
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
          conversation_id = uni_modules_uniIm_common_utils.utils.getConversationId(param.user_id || param.friend_uid);
        } else {
          throw new Error("toChat param is error");
        }
      }
      uni_modules_uniIm_lib_main.uniIm.currentConversationId = conversation_id;
      if (this.isWidescreen) {
        this.$nextTick(() => {
          let chatViewRef = this.$refs["chat-view"];
          if (chatViewRef) {
            chatViewRef.load(conversation_id);
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + conversation_id,
          animationDuration: 300
        });
      }
    },
    showChatInfo() {
      this.chatInfoIsShow = !this.chatInfoIsShow;
    },
    toUcenter() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true",
        complete(e) {
          console.log("e: " + JSON.stringify(e));
        }
      });
    },
    friendlyTime(timestamp) {
      return uni_modules_uniIm_common_utils.utils.toFriendlyTime(timestamp);
    }
  },
  async onReachBottom() {
    await this.loadMore();
  },
  onNavigationBarButtonTap(e) {
    if (e.index) {
      let data = common_vendor.index.getStorageInfoSync();
      data.keys.forEach((item) => {
        if (item.includes("uni-im-msg:") || item.includes("uni-im-conversation")) {
          common_vendor.index.removeStorageSync(item);
        }
      });
      common_vendor.index.showToast({
        title: "clear storage ok",
        icon: "none"
      });
    } else {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true",
        complete: (e2) => {
          console.log(e2);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_link2 + _easycom_uni_list_chat2 + _easycom_uni_load_more2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_link = () => "../../../uni-link/components/uni-link/uni-link.js";
const _easycom_uni_list_chat = () => "../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_link + _easycom_uni_list_chat + _easycom_uni_load_more + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isWidescreen
  }, _ctx.isWidescreen ? {
    b: common_vendor.p({
      href: "https://ext.dcloud.net.cn/plugin?id=9711",
      text: "[点此下载插件]"
    })
  } : {}, {
    c: common_vendor.f($options.conversationList, (item, index, i0) => {
      return common_vendor.e({
        a: item.group_id
      }, item.group_id ? {} : {}, {
        b: common_vendor.o(($event) => $options.toChat(item.id), item.id),
        c: item.id,
        d: _ctx.currentConversationId == item.id ? 1 : "",
        e: common_vendor.o(($event) => $options.toChat(item.id), item.id),
        f: "d114458d-2-" + i0 + ",d114458d-1",
        g: common_vendor.p({
          showBadge: item.unread_count > 0,
          badgeText: item.unread_count,
          link: true,
          title: item.title,
          note: item.last_msg_note,
          avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
          direction: "column",
          time: $options.friendlyTime(item.update_time),
          hasCallMe: item.call_list.length
        })
      });
    }),
    d: common_vendor.p({
      contentText: $options.loadMoreContentText,
      status: $options.conversationHasMore ? "loading" : "noMore"
    }),
    e: common_vendor.p({
      customStyle: {
        backgroundColor: "#f5f5f5",
        padding: 0
      }
    }),
    f: $data.wHeight,
    g: common_vendor.p({
      border: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d114458d"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/index/index.nvue"]]);
wx.createPage(MiniProgramPage);
