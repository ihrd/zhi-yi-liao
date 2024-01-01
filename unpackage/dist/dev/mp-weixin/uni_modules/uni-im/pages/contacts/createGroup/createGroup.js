"use strict";
const common_vendor = require("../../../../../common/vendor.js");
require("../../../lib/main.js");
require("../../../common/utils.js");
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
      loading: true,
      hasMore: false,
      keyword: "",
      checkFriendIds: [],
      friendData: [],
      groupMemberUid: [],
      //选人进群时，已经在群里的人的id
      group_id: false
    };
  },
  computed: {
    friendList() {
      return this.friendData.filter((item) => !this.groupMemberUid.includes(item._id));
    },
    checkFriendNum() {
      return this.checkFriendIds.length > 0 ? "（" + this.checkFriendIds.length + "）" : "";
    },
    btnText() {
      return this.group_id ? "立即邀请" : "立即创建";
    },
    checkFriendsWidth() {
      return this.checkFriendIds.length > 6 ? "360" : this.checkFriendIds.length * 65;
    },
    // checkFriendsSearchWidth() {
    // 	return this.checkFriendIds.length > 6 ? '360' : 720 - (this.checkFriendIds.length * 60)
    // },
    translateXWidth() {
      return this.checkFriendIds.length > 6 ? this.checkFriendIds.length * 65 : "60";
    },
    checkFriendImg() {
      return this.friendList.reduce((sum, current) => {
        if (this.checkFriendIds.includes(current._id)) {
          sum.push(current);
        }
        return sum;
      }, []).map((item) => item.avatar_file);
    }
  },
  async onLoad(options) {
    this.setParam(options);
  },
  methods: {
    async setParam(options = {}) {
      console.log("group_id", options);
      if (options.group_id) {
        this.group_id = options.group_id;
        common_vendor.index.setNavigationBarTitle({
          title: "邀请新成员"
        });
        let res = await db.collection("uni-im-group-member").where({
          group_id: options.group_id
        }).get();
        console.log("res:查本群，成员 ", res);
        this.groupMemberUid = res.result.data.map((item) => item.user_id);
        console.log("this.groupMemberUid", this.groupMemberUid);
      }
      this.getFriendsData();
    },
    async getFriendsData() {
      let whereString = {};
      if (this.keyword) {
        whereString = `
						"_id"		== 	"${this.keyword}" ||
						"username"	== 	"${this.keyword}" || 
						"nickname"	== 	"${this.keyword}" || 
						"email"		== 	"${this.keyword}" || 
						"mobile"	== 	"${this.keyword}" 
					`;
      }
      let res = await db.collection(
        db.collection("uni-im-friend").where('"user_id" == $cloudEnv_uid').field("friend_uid,mark,class_name").getTemp(),
        db.collection("uni-id-users").where(whereString).field("_id,nickname,avatar_file").getTemp()
      ).get();
      let data = res.result.data;
      data.forEach((item, index) => {
        if (item.friend_uid[0]) {
          data[index] = item.friend_uid[0];
        } else {
          delete data[index];
        }
      });
      this.friendData = data;
      this.loading = false;
      this.hasMore = this.friendList.length != 0;
    },
    doClear() {
      this.keyword = "";
      this.getFriendsData();
    },
    checkboxChange(e) {
      this.checkFriendIds = e.detail.value;
    },
    async createGroup() {
      const uniImCo = common_vendor.Bs.importObject("uni-im-co");
      let res = await uniImCo.chooseUserIntoGroup({
        user_ids: this.checkFriendIds,
        group_id: this.group_id
      });
      this.checkFriendIds = [];
      if (this.group_id) {
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.redirectTo({
          url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=group_" + res.data.group_id,
          animationDuration: 300,
          complete: (e) => {
            console.log(e);
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../../../uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_chat = () => "../../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../../../uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.getFriendsData),
    b: common_vendor.o($options.doClear),
    c: common_vendor.o($options.doClear),
    d: common_vendor.o(($event) => $data.keyword = $event),
    e: common_vendor.p({
      placeholder: "搜索",
      bgColor: "#fff",
      radius: 100,
      modelValue: $data.keyword
    }),
    f: common_vendor.f($options.friendList, (item, index, i0) => {
      return {
        a: item._id,
        b: "586b7eca-2-" + i0 + "," + ("586b7eca-1-" + i0),
        c: common_vendor.p({
          ["avatar-circle"]: true,
          title: item.nickname,
          avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
        }),
        d: "586b7eca-1-" + i0,
        e: index
      };
    }),
    g: common_vendor.p({
      border: false
    }),
    h: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    i: common_vendor.t($options.btnText),
    j: common_vendor.t($options.checkFriendNum),
    k: $data.group_id ? !$data.checkFriendIds.length : false,
    l: common_vendor.o((...args) => $options.createGroup && $options.createGroup(...args)),
    m: common_vendor.p({
      status: $data.loading ? "loading" : $data.hasMore ? "hasMore" : "noMore",
      contentText: {
        "contentnomore": $options.friendList.length ? "没有更多好友" : "没有可以选择的好友"
      }
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-586b7eca"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/contacts/createGroup/createGroup.nvue"]]);
wx.createPage(MiniProgramPage);
