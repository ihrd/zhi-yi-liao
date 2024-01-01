"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uniIm_common_md5 = require("./md5.js");
const uni_modules_uniIm_common_toFriendlyTime = require("./toFriendlyTime.js");
const uni_modules_uniIm_common_appEvent = require("./appEvent.js");
const uni_modules_uniIdPages_common_store = require("../../uni-id-pages/common/store.js");
const uni_modules_uniIm_lib_main = require("../lib/main.js");
const uniIdCo = common_vendor.Bs.importObject("uni-id-co", {
  customUI: true
});
const db = common_vendor.Bs.database();
let getCloudMsgIng = false;
let socketIsClose = true;
const utils = {
  init() {
    uni_modules_uniIm_lib_main.uniIm.socketOpenIndex = 0;
    common_vendor.index.onSocketClose(function(res) {
      socketIsClose = true;
      console.log("WebSocket 已关闭！");
    });
    common_vendor.index.onSocketOpen(function(res) {
      console.log("WebSocket连接已打开！");
      socketIsClose = false;
      uni_modules_uniIm_lib_main.uniIm.socketOpenIndex++;
      if (uni_modules_uniIm_lib_main.uniIm.socketOpenIndex > 1) {
        getCloudMsg();
      }
    });
    uni_modules_uniIm_common_appEvent.appEvent.onAppShow(async () => {
      getCloudMsg();
    });
    function getCloudMsg() {
      if (getCloudMsgIng) {
        return;
      }
      getCloudMsgIng = true;
      setTimeout(async () => {
        let maxConversation = (await uni_modules_uniIm_lib_main.uniIm.conversation.get())[0];
        if (!maxConversation) {
          getCloudMsgIng = false;
          return;
        }
        let res = await db.collection("uni-im-msg").where({
          to_uid: common_vendor.Bs.getCurrentUserInfo().uid,
          create_time: db.command.gt(maxConversation.update_time)
        }).get();
        console.log("getCloudMsg res", maxConversation.update_time, res.result.data);
        let clodMsgData = {};
        res.result.data.forEach((item) => {
          if (clodMsgData[item.conversation_id]) {
            clodMsgData[item.conversation_id].push(item);
          } else {
            clodMsgData[item.conversation_id] = [item];
          }
        });
        for (let conversation_id in clodMsgData) {
          let conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(conversation_id);
          let msg = clodMsgData[conversation_id];
          if (msg.length) {
            conversation.msgList.push(...msg);
            conversation.msgManager.localMsg.add(msg);
            conversation.unread_count += msg.length;
          }
        }
        getCloudMsgIng = false;
      }, 0);
    }
    this.listenImMsg();
    setInterval(() => {
      uni_modules_uniIm_lib_main.uniIm.heartbeat = Date.now();
    }, 1e3);
    const audioContext = common_vendor.index.createInnerAudioContext();
    let _audioContext = {};
    Object.defineProperty(_audioContext, "src", {
      set(url) {
        audioContext.src = url;
      },
      get() {
        return audioContext.src;
      }
    });
    uni_modules_uniIm_lib_main.uniIm.audioContext = new Proxy(_audioContext, {
      get(target, propKey, receiver) {
        return audioContext[propKey];
      }
    });
    uni_modules_uniIm_lib_main.uniIm.systemInfo = common_vendor.index.getSystemInfoSync();
    function initData() {
      uni_modules_uniIm_lib_main.uniIm.conversation.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.notification.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.notification.loadMore();
      uni_modules_uniIm_lib_main.uniIm.friend.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.friend.loadMore();
      uni_modules_uniIm_lib_main.uniIm.group.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.group.loadMore();
      let userInfo = {};
      userInfo[uni_modules_uniIdPages_common_store.store.userInfo._id] = uni_modules_uniIdPages_common_store.store.userInfo;
      uni_modules_uniIm_lib_main.uniIm.mergeUsersInfo(userInfo);
    }
    if (common_vendor.Bs.getCurrentUserInfo().tokenExpired > Date.now()) {
      setTimeout(initData, 0);
    }
    common_vendor.index.$on("uni-id-pages-login-success", async () => {
      initData();
    });
    common_vendor.index.onPushMessage(async (res) => {
      if (res.data.payload.type == "uni-im-notification") {
        console.log("uni-im-notification-res.data", res.data);
        res.data.create_time = Date.now();
        if (typeof res.data.is_read == "undefined") {
          res.data.is_read = false;
        }
        console.log("res.data notification.add", res.data);
        res.data._id = res.data.payload.notificationId;
        res.data;
        delete res.data.payload.notificationId;
        delete res.data.unipush_version;
        uni_modules_uniIm_lib_main.uniIm.notification.add(res.data);
      }
    });
    ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"].forEach((item) => {
      common_vendor.index.addInterceptor(item, {
        success: (event) => {
          updateTabBarBadge();
        }
      });
    });
    common_vendor.wx$1.onAppRoute((res) => {
      updateTabBarBadge();
    });
    function updateTabBarBadge() {
      setTimeout(() => {
        let unread_count = uni_modules_uniIm_lib_main.uniIm.notification.unreadCount();
        set(2, unread_count);
        unread_count = uni_modules_uniIm_lib_main.uniIm.conversation.unreadCount();
        set(0, unread_count);
        function set(index, number) {
          if (number == 0) {
            common_vendor.index.removeTabBarBadge({
              index,
              complete: (e) => {
              }
            });
          } else {
            common_vendor.index.setTabBarBadge({
              index,
              text: number + "",
              complete: (e) => {
              }
            });
          }
        }
      }, 300);
    }
    common_vendor.index.$on("uni-id-pages-logout", () => {
      uni_modules_uniIm_lib_main.uniIm.conversation.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.conversation.hasMore = true;
      uni_modules_uniIm_lib_main.uniIm.notification.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.notification.hasMore = true;
      uni_modules_uniIm_lib_main.uniIm.friend.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.friend.hasMore = true;
      uni_modules_uniIm_lib_main.uniIm.group.dataList = [];
      uni_modules_uniIm_lib_main.uniIm.group.hasMore = true;
      uni_modules_uniIm_lib_main.uniIm.currentConversationId = false;
    });
    uni_modules_uniIm_common_appEvent.appEvent.onAppHide(async () => {
    });
    uni_modules_uniIm_common_appEvent.appEvent.onAppShow(async () => {
    });
  },
  getConversationId(id, type = "single") {
    if (type == "single") {
      let current_uid = common_vendor.Bs.getCurrentUserInfo().uid;
      if (!current_uid) {
        console.error("错误current_uid不能为空", current_uid);
      }
      let param = [id, current_uid];
      return "single_" + uni_modules_uniIm_common_md5.md5(param.sort().toString());
    } else {
      return "group_" + id;
    }
  },
  listenImMsg() {
    common_vendor.index.onPushMessage(async (res) => {
      console.log("收到消息", res);
      const {
        payload
      } = res.data;
      if (payload.type == "uni-im") {
        const msg = payload.data;
        if (msg.LongMsg) {
          const db2 = common_vendor.Bs.database();
          let res2 = await db2.collection("uni-im-msg").where({
            "_id": msg._id,
            "conversation_id": msg.conversation_id
            // conversation_id 必传否则会被触发器拦截
          }).get();
          if (res2.result.code == 0) {
            payload.data.body = res2.result.data[0].body;
          } else {
            console.error("超长文本类型消息查库失败", msg._id);
          }
        }
        if (payload.device_id == common_vendor.index.getSystemInfoSync().deviceId) {
          return console.log("当前设备发的消息，不用接收；忽略");
        }
        if (res.type == "receive") {
          const {
            conversation_id,
            group_id
          } = msg;
          let conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(conversation_id);
          let msgList = conversation.msgList;
          let lastMsg = [...msgList].pop();
          if (lastMsg && lastMsg._id != msg._id) {
            msgList.push(msg);
            conversation.unread_count++;
          }
          if (!socketIsClose) {
            conversation.msgManager.localMsg.add(msg);
          }
          if (msg.group_id && msg.about_msg_id) {
            let current_uid = common_vendor.Bs.getCurrentUserInfo().uid;
            let aboutMsg = msgList.find((i) => i._id == msg.about_msg_id);
            if (aboutMsg && aboutMsg.from_uid == current_uid) {
              conversation.call_list.push(msg._id);
              console.log("conversation.call_list", conversation.call_list);
            }
          }
          if (msg.action == "join-group-notice") {
            console.log('"join-group-notice"', msg);
            let conversation2 = await uni_modules_uniIm_lib_main.uniIm.conversation.get(msg.conversation_id);
            console.log('"join-group-notice"conversation', conversation2);
            if (conversation2) {
              let userList = msg.body.user_list;
              if (userList && Object.keys(conversation2.group_member)) {
                for (let i = 0; i < userList.length; i++) {
                  conversation2.group_member[userList[i]._id] = userList[i];
                }
                console.log("add user to group_member", conversation2.group_member);
              }
              uni_modules_uniIm_lib_main.uniIm.mergeUsersInfo(conversation2.group_member);
              let hasIsGroup = uni_modules_uniIm_lib_main.uniIm.group.dataList.find((i) => i.group_info._id == group_id);
              if (!hasIsGroup) {
                await uni_modules_uniIm_lib_main.uniIm.group.loadMore({
                  group_id
                });
              }
            }
          }
        } else {
          let currentPages = getCurrentPages();
          let topViewRoute = currentPages[currentPages.length - 1].route;
          if (topViewRoute == "uni_modules/uni-im/pages/chat/chat") {
            common_vendor.index.redirectTo({
              url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + msg.conversation_id,
              complete(e) {
                console.log(e);
              }
            });
          } else {
            common_vendor.index.navigateTo({
              url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + msg.conversation_id,
              complete(e) {
                console.log(e);
              }
            });
          }
        }
      } else if (payload.type == "uni-im-group-exit" || payload.type == "uni-im-group-expel" || payload.subType == "uni-im-group-expel") {
        let {
          timestamp,
          group_id
        } = payload.data;
        let conversation_id = "group_" + group_id;
        let noticeBody = res.data.content;
        let conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(conversation_id);
        let msg = {
          conversation_id,
          group_id,
          client_create_time: Date.now(),
          create_time: Date.now(),
          type: "system",
          body: noticeBody
        };
        conversation.msgList.push(msg);
        if (!socketIsClose) {
          conversation.msgManager.localMsg.add(msg);
        }
        if (payload.data.user_id == common_vendor.Bs.getCurrentUserInfo().uid) {
          let currentConversationId = uni_modules_uniIm_lib_main.uniIm.currentConversationId;
          let topPageInfo = getTopPageInfo();
          let {
            route,
            options
          } = topPageInfo.$page;
          if (route == "uni_modules/uni-im/pages/group/info") {
            currentConversationId = options.conversation_id;
          }
          if (currentConversationId == "group_" + payload.data.group_id) {
            common_vendor.index.navigateBack({
              delta: 2
            });
          }
          setTimeout(() => {
            uni_modules_uniIm_lib_main.uniIm.conversation.remove(conversation_id);
            uni_modules_uniIm_lib_main.uniIm.group.remove({
              group_id: payload.data.group_id
            });
          }, 1e3);
        } else {
          let data = await uni_modules_uniIm_lib_main.uniIm.conversation.get(conversation_id);
          delete data.group_member[payload.data.user_id];
        }
      } else if (payload.type == "uni-im-group-join-request") {
        console.log("有用户申请加入群聊");
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-group-cancellation") {
        let {
          group_id
        } = payload.data;
        let conversationId = "group_" + group_id;
        let currentConversationId = uni_modules_uniIm_lib_main.uniIm.currentConversationId;
        let topPageInfo = getTopPageInfo();
        let {
          route,
          options
        } = topPageInfo.$page;
        if (route == "uni_modules/uni-im/pages/group/info") {
          currentConversationId = options.conversation_id;
        }
        if (currentConversationId == conversationId) {
          common_vendor.index.navigateBack({
            delta: 2
          });
        }
        setTimeout(() => {
          uni_modules_uniIm_lib_main.uniIm.conversation.remove(conversationId);
          uni_modules_uniIm_lib_main.uniIm.group.remove({
            group_id
          });
        }, 1e3);
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-friend-add") {
        let {
          from_uid,
          to_uid
        } = payload.data;
        let friend_uid = from_uid == common_vendor.Bs.getCurrentUserInfo().uid ? to_uid : from_uid;
        await uni_modules_uniIm_lib_main.uniIm.conversation.get({
          friend_uid
        });
        uni_modules_uniIm_lib_main.uniIm.friend.loadMore({
          friend_uid
        });
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-friend-delete") {
        let {
          from_uid,
          to_uid
        } = payload.data;
        let friend_uid = from_uid == common_vendor.Bs.getCurrentUserInfo().uid ? to_uid : from_uid;
        uni_modules_uniIm_lib_main.uniIm.conversation.remove(payload.data.conversationId);
        uni_modules_uniIm_lib_main.uniIm.friend.remove(friend_uid);
      } else if (payload.type == "uni-im-revoke-msg") {
        await uni_modules_uniIm_lib_main.uniIm.conversation.revokeMsg(payload.data);
        common_vendor.index.setStorageSync("uni-im-lastTaskTime", payload.data.taskCreateTime);
      }
    });
  },
  toFriendlyTime(timestamp) {
    if (timestamp - Date.now() < 3600 * 1e3 * 2) {
      timestamp += uni_modules_uniIm_lib_main.uniIm.heartbeat * 0;
    }
    if (!timestamp) {
      return "";
    }
    return uni_modules_uniIm_common_toFriendlyTime.toFriendlyTime(timestamp);
  },
  async login({
    token,
    tokenExpired
  }) {
    common_vendor.index.setStorage({
      key: "uni_id_token_expired",
      data: tokenExpired
    });
    common_vendor.index.setStorage({
      key: "uni_id_token",
      data: token
    });
    common_vendor.index.getPushClientId({
      success: async function(e) {
        let pushClientId = e.cid;
        await uniIdCo.setPushCid({
          pushClientId
        });
      },
      fail(e) {
        console.log(e);
      }
    });
    await uni_modules_uniIdPages_common_store.mutations.updateUserInfo();
    common_vendor.index.$emit("uni-id-pages-login-success");
  }
};
function getTopPageInfo() {
  let pages = getCurrentPages();
  return pages[pages.length - 1];
}
exports.utils = utils;
