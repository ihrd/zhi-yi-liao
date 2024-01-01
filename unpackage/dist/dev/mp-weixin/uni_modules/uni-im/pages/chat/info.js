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
const db = common_vendor.Bs.database();
const _sfc_main = {
  data() {
    return {
      friend_uid: "",
      friend_info: {
        username: "",
        nickname: "",
        avatar_file: {
          url: ""
        }
      }
    };
  },
  props: {
    conversation_id: {
      default() {
        return false;
      }
    }
  },
  computed: {
    isFriend() {
      let friendList = uni_modules_uniIm_lib_main.uniIm.friend.get();
      return friendList.find((i) => i._id == this.friend_uid);
    }
  },
  async onLoad(options) {
    this.load(options);
  },
  async mounted() {
    if (this.conversation_id) {
      this.load({ conversation_id: this.conversation_id });
    }
  },
  methods: {
    async load(options) {
      if (options.conversation_id) {
        let conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(options.conversation_id);
        options.user_id = conversation.friend_uid;
      }
      this.friend_uid = options.user_id;
      let res = await db.collection("uni-id-users").doc(this.friend_uid).field("_id,nickname,avatar_file").get();
      this.friend_info = res.result.data[0];
    },
    async deteleFriend() {
      common_vendor.index.showModal({
        title: "确认要删除好友吗",
        content: "此操作不可撤销",
        showCancel: true,
        cancelText: "取消",
        confirmText: "确认",
        complete: async (e) => {
          if (e.confirm) {
            common_vendor.index.showLoading({
              mask: true
            });
            try {
              await db.collection("uni-im-friend").where({
                friend_uid: this.friend_uid,
                user_id: common_vendor.Bs.getCurrentUserInfo().uid
              }).remove();
              common_vendor.index.navigateBack({ delta: 2 });
            } catch (e2) {
              common_vendor.index.showModal({
                content: JSON.stringify(e2.message),
                showCancel: false
              });
            }
            common_vendor.index.hideLoading();
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      avatar: $data.friend_info.avatar_file ? $data.friend_info.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
      title: $data.friend_info.nickname
    }),
    b: common_vendor.p({
      border: false
    }),
    c: $options.isFriend
  }, $options.isFriend ? {
    d: common_vendor.o((...args) => $options.deteleFriend && $options.deteleFriend(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c71fbb53"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/chat/info.nvue"]]);
wx.createPage(MiniProgramPage);
