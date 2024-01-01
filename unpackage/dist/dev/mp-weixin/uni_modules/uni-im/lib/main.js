"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uniIm_common_utils = require("../common/utils.js");
const uni_modules_uniIm_lib_MsgManager = require("./MsgManager.js");
const uni_modules_uniIm_lib_createObservable = require("./createObservable.js");
const db = common_vendor.Bs.database();
const uniImCo = common_vendor.Bs.importObject("uni-im-co", {
  customUI: true
});
function current_uid() {
  return common_vendor.Bs.getCurrentUserInfo().uid;
}
const state = uni_modules_uniIm_lib_createObservable.createObservable({
  // 会话数据
  conversation: {
    dataList: [],
    hasMore: true,
    loading: false
    // 加锁防止意外重复请求时出错
  },
  // 正在对话的会话id
  currentConversationId: false,
  // 全局响应式心跳，用于更新消息距离当前时长 等
  heartbeat: "",
  // 好友列表
  friend: {
    dataList: [],
    hasMore: true
  },
  // 群列表
  group: {
    dataList: [],
    hasMore: true
  },
  // 系统通知消息
  notification: {
    dataList: [],
    hasMore: true
  },
  //存储所有出现过的用户信息，包括群好友信息
  usersInfo: {},
  //是否为pc宽屏
  isWidescreen: false,
  //系统信息
  systemInfo: {},
  indexDB: false,
  audioContext: false,
  // sqlite数据库是否已经打开
  dataBaseIsOpen: false,
  // 记录socket连接次数（用于处理，断开重连）
  socketOpenIndex: 0
});
const methods = {
  /**
   * 会话对象
   * data:会话对象数据模型（conversationDatas是原始数据，data为经过转化的数据）
   * loadMore：加载更多数据方法
   */
  conversation: {
    // 撤回消息，参数： 消息id 会话id ，操作者id
    async revokeMsg({
      msg_id,
      _id,
      conversation_id,
      user_id = false,
      create_time
    }) {
      if (_id) {
        msg_id = _id;
      }
      if (!user_id) {
        try {
          let res = await uniImCo.revokeMsg(msg_id);
        } catch (err) {
          console.log("err", err);
          return common_vendor.index.showToast({
            title: err.message,
            icon: "none"
          });
        }
      }
      let conversation = await this.get(conversation_id);
      let msgList = conversation.msgList;
      let index = msgList.findIndex((item) => item._id == msg_id);
      if (index != -1) {
        let msg = msgList[index];
        msg.is_revoke = true;
        msg.body = "[此消息已被撤回]";
        conversation.msgList.splice(index, 1, Object.assign({}, msg));
      }
      let localMsgs = await conversation.msgManager.localMsg.get({
        "minTime": create_time - 1,
        "maxTime": create_time + 1
      });
      let localMsg = localMsgs.find((item) => item._id == msg_id);
      if (localMsg) {
        localMsg.is_revoke = true;
        localMsg.body = "[此消息已被撤回]";
        conversation.msgManager.localMsg.update(localMsg.unique_id, localMsg);
      }
    },
    async get(param) {
      let conversationId = false;
      if (param) {
        if (typeof param == "object") {
          let {
            friend_uid,
            user_id,
            group_id,
            conversation_id
          } = param;
          conversationId = conversation_id;
          if (user_id) {
            friend_uid = user_id;
            param.friend_uid = user_id;
          }
          if (!conversationId) {
            if (!group_id && !friend_uid) {
              console.log("param---------", param);
              throw new Error("会话对象不详，请检查参数", param);
            }
            conversationId = uni_modules_uniIm_common_utils.utils.getConversationId(friend_uid || group_id, friend_uid ? "single" : "group");
          }
        } else if (typeof param == "string") {
          conversationId = param;
        } else {
          throw new Error("会话对象不详，请检查参数", param);
        }
      }
      let conversationDatas = state.conversation.dataList;
      if (conversationId) {
        conversationDatas = conversationDatas.filter((i) => i.id == conversationId);
        if (conversationDatas.length == 0) {
          let conversationData = await this.loadMore(conversationId);
          if (conversationData) {
            conversationDatas = [conversationData];
          } else {
            if (param.group_id) {
              throw new Error("未找到此群会话");
            }
            if (typeof param != "object") {
              console.log("param", param);
              throw new Error("参数错误");
            }
            if (!param.user_info) {
              let res = await common_vendor.Bs.database().collection("uni-id-users").doc(param.friend_uid).field("_id,nickname,avatar_file").get();
              console.log("user_info", res);
              param.user_info = res.result.data[0];
              if (!param.user_info) {
                throw new Error("用户查找失败");
              }
            }
            let conversationData2 = {
              group_id: param.group_id,
              friend_uid: param.friend_uid,
              unread_count: 0
            };
            try {
              const db2 = common_vendor.Bs.database();
              let res = await db2.collection("uni-im-conversation").add(conversationData2);
            } catch (e) {
              throw new Error(e);
            }
            conversationData2 = Object.assign(conversationData2, {
              user_id: current_uid(),
              id: conversationId,
              user_info: param.user_info,
              type: param.friend_uid ? 1 : 2,
              msgList: [],
              update_time: Date.now()
            });
            this.add(conversationData2);
            conversationDatas.push(conversationData2);
          }
        }
      }
      if (conversationId) {
        let conversationData = conversationDatas[0];
        if (conversationData.group_id && Object.keys(conversationData.group_member).length == 0) {
          let res = await db.collection(
            db.collection("uni-im-group-member").where({
              group_id: conversationData.group_id
            }).getTemp(),
            db.collection("uni-id-users").field("_id,nickname,avatar_file").getTemp()
          ).limit(1e3).get();
          let group_member = {};
          res.result.data.forEach((item) => {
            let usersInfo = item.user_id[0];
            group_member[usersInfo._id] = usersInfo;
          });
          methods.mergeUsersInfo(group_member);
          conversationData.group_member = group_member;
        }
        return conversationData;
      } else {
        return conversationDatas;
      }
    },
    async loadMore(conversation_id) {
      if (!conversation_id) {
        if (state.conversation.loading) {
          return [];
        } else {
          state.conversation.loading = true;
        }
      }
      let conversationDatas = await this.get();
      let lastConversation = conversationDatas[conversationDatas.length - 1];
      let maxUpdateTime = lastConversation ? lastConversation.update_time : "";
      if (conversation_id) {
        maxUpdateTime = "";
      }
      let res = {
        data: []
      };
      try {
        res = await uniImCo.getConversationList({
          maxUpdateTime,
          limit: 30,
          conversation_id
        });
      } catch (e) {
        console.log(e);
        if (!conversation_id) {
          state.conversation.loading = false;
        }
      }
      if (res.data.length) {
        this.add(res.data);
      }
      if (!conversation_id) {
        state.conversation.loading = false;
        state.conversation.hasMore = res.data.length == 30;
        let whereString = "user_id == $cloudEnv_uid";
        let group_ids = res.data.filter((item) => item.group_id).map((i) => i.group_id) || [];
        if (group_ids.length) {
          whereString = `(user_id == $cloudEnv_uid || "group_id" in ${JSON.stringify(group_ids)})`;
        }
        let lastTaskTime = common_vendor.index.getStorageSync("uni-im-lastTaskTime");
        if (lastTaskTime) {
          whereString += `&& "create_time" > ${lastTaskTime}`;
        }
        db.collection("uni-im-task").where(whereString).orderBy("create_time desc").get().then((e) => {
          if (e.result.data.length) {
            e.result.data.forEach((item) => {
              if (item.type == "revoke_msg") {
                this.revokeMsg(item.payload);
              }
            });
            common_vendor.index.setStorageSync("uni-im-lastTaskTime", e.result.data[0].create_time);
          }
        }).catch((e) => {
          console.error(e);
        });
        return res.data;
      } else {
        return res.data[0];
      }
    },
    add(data) {
      if (!Array.isArray(data)) {
        data = [data];
      }
      data.forEach((item) => {
        if (Array.isArray(item.user_info)) {
          item.user_info = item.user_info[0];
        }
        if (Array.isArray(item.group_info)) {
          item.group_info = item.group_info[0];
          if (item.group_id) {
            if (!item.group_member) {
              item.group_member = {};
            }
            if (item.group_info.introduction === void 0) {
              item.group_info.introduction = "";
            }
            if (item.group_info.avatar_file === void 0) {
              item.group_info.avatar_file = {
                url: ""
              };
            }
          }
        }
        item = Object.assign(item, {
          isInit: false,
          title: "",
          chatText: "",
          avatar_file: {},
          call_list: []
        });
        if (item.user_info) {
          Object.defineProperties(item, {
            title: {
              get() {
                return item.user_info.nickname;
              }
            },
            avatar_file: {
              get() {
                return item.user_info.avatar_file;
              }
            },
            group_info: {
              value: false
            }
          });
        } else if (item.group_info) {
          Object.defineProperties(item, {
            title: {
              get() {
                return item.group_info.name;
              }
            },
            avatar_file: {
              get() {
                return item.group_info.avatar_file;
              }
            },
            user_info: {
              value: false
            }
          });
        } else {
          console.error("会话列表失效，疑似关联用户/群被删除(请改为软删除避免系统异常）：", JSON.stringify(item));
        }
        let update_time = item.update_time;
        Object.defineProperties(item, {
          last_msg_note: {
            get() {
              let last_msg_note = "暂无记录";
              let last_msg = item.msgList[item.msgList.length - 1];
              if (item.chatText && state.currentConversationId != item.id) {
                last_msg = {
                  body: "[uni-im-draft]" + item.chatText,
                  type: "text",
                  create_time: Date.now()
                };
              }
              if (last_msg) {
                last_msg_note = "[多媒体]";
                if (last_msg.type == "text") {
                  last_msg_note = last_msg.body.toString();
                  last_msg_note = last_msg_note.replace(/[\r\n]/g, "");
                  last_msg_note = last_msg_note.slice(0, 30);
                }
                if (last_msg.is_revoke) {
                  last_msg_note = "消息已被撤回";
                }
                if (last_msg.is_delete) {
                  last_msg_note = "消息已被删除";
                }
              }
              return last_msg_note;
            }
          },
          update_time: {
            get() {
              let last_msg = item.msgList[item.msgList.length - 1];
              if (last_msg) {
                return last_msg.create_time;
              } else {
                return update_time;
              }
            }
          }
        });
        let {
          user_info,
          group_member
        } = item;
        let usersInfo = {};
        if (user_info) {
          usersInfo[user_info._id] = user_info;
        }
        methods.mergeUsersInfo(usersInfo);
        item.msgManager = new uni_modules_uniIm_lib_MsgManager.Message(item);
        let initMsg = (msgList) => {
          for (let i = 0; i < msgList.length; i++) {
            let msg = msgList[i];
            if (msg && typeof msg == "object") {
              if (!("is_delete" in msg)) {
                msg.is_delete = false;
              }
            }
          }
          let methodsList = ["push", "unshift"];
          methodsList.forEach((methods2) => {
            msgList[methods2] = function() {
              initMsg(arguments);
              Array.prototype[methods2].apply(this, arguments);
            };
          });
          return msgList;
        };
        initMsg(item.msgList);
        item.msgList.clear = function() {
          this.length = 0;
        };
        Object.defineProperty(item, "msgList", {
          writable: false
        });
        if (!state.conversation.dataList.find((conversation) => conversation.id == item.id)) {
          state.conversation.dataList.push(item);
        }
      });
      common_vendor.index.setStorage({
        key: "uni-im-conversation_uid:" + current_uid(),
        data: state.conversation
      });
      return data;
    },
    // 统计所有消息的未读数
    unreadCount() {
      let conversationDatas = state.conversation.dataList;
      return conversationDatas.reduce((sum, item, index, array) => sum + item.unread_count, 0);
    },
    remove(id) {
      let index = state.conversation.dataList.findIndex((i) => i.id == id);
      state.conversation.dataList.splice(index, 1);
    }
  },
  /**
   * 系统消息
   */
  notification: {
    get: ({
      type,
      excludeType
    } = {}) => {
      const notificationDatas = state.notification.dataList;
      if (notificationDatas) {
        return notificationDatas.reduce((sum, item) => {
          if (type) {
            typeof type == "string" ? type = [type] : "";
            if (type.includes(item.payload.subType)) {
              sum.push(item);
            }
          } else if (excludeType) {
            typeof excludeType == "string" ? excludeType = [excludeType] : "";
            if (!excludeType.includes(item.payload.subType)) {
              sum.push(item);
            }
          } else {
            sum.push(item);
          }
          return sum;
        }, []);
      } else {
        return false;
      }
    },
    async loadMore() {
      let res = await db.collection("uni-im-notification").aggregate().match('"payload.type" == "uni-im-notification" && "user_id" == $cloudEnv_uid').sort({
        create_time: -1
      }).limit(1e3).end();
      this.add(res.result.data);
      this.hasMore == (res.result.data.length != 0);
    },
    add(datas) {
      if (!Array.isArray(datas)) {
        datas = [datas];
      }
      let notificationDatas = datas.concat(state.notification.dataList);
      notificationDatas.sort((a, b) => a.create_time - b.create_time);
      let obj = {};
      for (var i = 0; i < notificationDatas.length; i++) {
        let item = notificationDatas[i];
        let {
          subType,
          unique
        } = item.payload;
        obj[unique ? subType + "_" + unique : Date.now() + "_" + i] = item;
      }
      let dataList = [];
      for (let key in obj) {
        let item = obj[key];
        dataList.push(item);
      }
      dataList.sort((a, b) => b.create_time - a.create_time);
      state.notification.dataList = dataList;
    },
    unreadCount(param = {}) {
      let notificationDatas = this.get(param);
      let unreadCount = notificationDatas.reduce((sum, item, index, array) => {
        if (!item.is_read) {
          sum++;
        }
        return sum;
      }, 0);
      if (unreadCount === 0) {
        common_vendor.index.removeTabBarBadge({
          index: 2,
          complete: (e) => {
          }
        });
      } else {
        common_vendor.index.setTabBarBadge({
          index: 2,
          text: unreadCount + "",
          complete: (e) => {
          }
        });
      }
      if (unreadCount) {
        return unreadCount + "";
      } else {
        return "";
      }
    }
  },
  friend: {
    get() {
      return state.friend.dataList;
    },
    async loadMore({
      friend_uid
    } = {}) {
      let whereString = '"user_id" == $cloudEnv_uid';
      if (friend_uid) {
        whereString += `&& "friend_uid" == "${friend_uid}"`;
      }
      let res = await db.collection(
        db.collection("uni-im-friend").where(whereString).field("friend_uid,mark,class_name").getTemp(),
        db.collection("uni-id-users").field("_id,nickname,avatar_file").getTemp()
      ).limit(500).get();
      let data = res.result.data;
      data.forEach((item, index) => {
        data[index] = item.friend_uid[0];
        let uid = data[index]._id;
        if (!state.usersInfo[uid]) {
          state.usersInfo[uid] = item.friend_uid[0];
        }
      });
      state.friend.hasMore = data.length == 500;
      state.friend.dataList.push(...data);
    },
    remove(friend_uid) {
      let friendList = state.friend.dataList;
      let index = friendList.findIndex((i) => i._id == friend_uid);
      friendList.splice(index, 1);
    }
  },
  group: {
    get() {
      return state.group.dataList;
    },
    async loadMore({
      group_id
    } = {}) {
      let whereString = '"user_id" == $cloudEnv_uid ';
      if (group_id) {
        whereString += `&& "group_id" == "${group_id}"`;
      }
      let res = await db.collection(
        db.collection("uni-im-group-member").where(whereString).getTemp(),
        db.collection("uni-im-group").getTemp()
      ).limit(500).get();
      res.result.data.map((item) => {
        item.group_info = item.group_id[0];
        delete item.group_id;
        return item;
      });
      res.result.data = res.result.data.filter((item) => item.group_info);
      state.group.hasMore = res.result.data.length == 500;
      if (group_id) {
        state.group.dataList.push(...res.result.data);
      } else {
        state.group.dataList = res.result.data;
      }
    },
    remove({
      group_id
    }) {
      let groupList = state.group.dataList;
      let index = groupList.findIndex((i) => i.group_info._id == group_id);
      if (index != -1) {
        groupList.splice(index, 1);
      }
    }
  },
  mergeUsersInfo(usersInfo) {
    state.usersInfo = Object.assign({}, state.usersInfo, usersInfo);
  },
  async clearUnreadCount(conversation_id) {
    let conversation = await this.conversation.get(conversation_id);
    setTimeout(function() {
      conversation.unread_count = 0;
    }, 10);
    common_vendor.Bs.database().collection("uni-im-conversation").where({
      user_id: current_uid(),
      id: conversation_id
    }).update({
      "unread_count": 0
    }).then((e) => {
      console.log("设置为已读", e.result.updated);
    });
  }
};
const mapState = function(keys = []) {
  let obj = {};
  keys.forEach((key) => {
    let keyName = key, keyCName = false;
    if (key.includes(" as ")) {
      let _key = key.trim().split(" as ");
      keyName = _key[0];
      keyCName = _key[1];
    }
    obj[keyCName || keyName] = function() {
      return state[keyName];
    };
  });
  return obj;
};
const uniIm = deepAssign(state, methods, {
  mapState
});
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
function isPlainObject(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Object]";
}
exports.uniIm = uniIm;
