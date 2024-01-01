"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../../lib/main.js");
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
      activeIndex: 0,
      value: "",
      items: ["找人", "找群"],
      searchFocus: false,
      //是否展示搜索列表
      keyword: "",
      tabs: [
        {
          "title": "添加手机联系人",
          "url": ""
        },
        {
          "title": "扫一扫加好友",
          "url": ""
        },
        {
          "title": "查找陌生人",
          "url": ""
        }
      ],
      usersData: [],
      checkIndex: "",
      //申请加的群index
      groupData: []
    };
  },
  computed: {
    usersList() {
      let current_uid = common_vendor.Bs.getCurrentUserInfo().uid;
      let friendList = uni_modules_uniIm_lib_main.uniIm.friend.dataList;
      return this.usersData.filter((item) => {
        if (friendList.find((i) => i._id == item._id) || item._id == current_uid) {
          return false;
        } else {
          return true;
        }
      });
    },
    groupList() {
      let groupList = uni_modules_uniIm_lib_main.uniIm.group.dataList;
      return this.groupData.filter((item) => {
        console.log("i.group_info._id == item._id", item.group_info, item._id);
        if (item.group_info && groupList.find((i) => i.group_info._id == item._id)) {
          return false;
        } else {
          return true;
        }
      });
    }
  },
  mounted() {
    this.getUserList();
    this.getGroupsList();
  },
  methods: {
    async getGroupsList() {
      const res = await db.collection("uni-im-group").get();
      if (res.result.data.length) {
        this.loading = false;
        this.hasMore = true;
        this.groupData = res.result.data;
      }
    },
    async getUserList() {
      try {
        let res = await db.collection("uni-id-users").field("_id,nickname,avatar_file").get();
        let data = res.result.data;
        if (data.length) {
          this.loading = false;
          this.hasMore = true;
          this.usersData = data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    back() {
      common_vendor.index.navigateBack();
    },
    async doSearch(e) {
      console.log("doSearch: ", e, this.keyword);
      if (this.activeIndex) {
        let res = await db.collection("uni-im-group").where(`
							"name" == "${this.keyword}" || 
							"_id" == "${this.keyword}"
						`).get();
        console.log(res);
        this.groupData = res.result.data;
      } else {
        let res = await db.collection("uni-id-users").where(`
											"_id"		==	"${this.keyword}" || 
											"username"	==	"${this.keyword}" || 
											"nickname"	==	"${this.keyword}" || 
											"email"		==	"${this.keyword}" || 
											"mobile"	==	"${this.keyword}" 
										`).field("_id,nickname,avatar_file").get();
        console.log(res);
        this.usersData = res.result.data;
      }
    },
    doClear() {
      this.keyword = "";
      this.getUserList();
      this.getGroupsList();
    },
    setActiveIndex(e) {
      if (this.activeIndex != e.currentIndex) {
        this.activeIndex = e.currentIndex;
      }
    },
    addUser(index) {
      this.checkIndex = index;
      this.$refs.popup.open();
    },
    async confirm(value) {
      this.value = value;
      this.$refs.popup.close();
      if (this.activeIndex === 0) {
        const uniImCo = common_vendor.Bs.importObject("uni-im-co");
        await uniImCo.addFriendInvite({
          "to_uid": this.usersList[this.checkIndex]._id,
          "message": this.value
        }).then((res) => {
          console.log("res: ", res);
          common_vendor.index.showToast({
            title: "已申请",
            icon: "none"
          });
        }).catch((err) => {
          common_vendor.index.showModal({
            content: err.message || "请求服务失败",
            showCancel: false
          });
        });
      } else {
        db.collection("uni-im-group-join").add({
          "group_id": this.groupList[this.checkIndex]._id,
          "message": this.value
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
      setTimeout(() => {
        this.value = "";
      }, 100);
    },
    close() {
      console.log("取消了");
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_nav_bar2 + _easycom_uni_search_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../../../uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_nav_bar = () => "../../../../uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_search_bar = () => "../../../../uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_chat = () => "../../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup_dialog = () => "../../../../uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_nav_bar + _easycom_uni_search_bar + _easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_load_more + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.setActiveIndex),
    b: common_vendor.p({
      values: $data.items,
      styleType: "button",
      activeColor: "#5fc08e"
    }),
    c: common_vendor.o($options.back),
    d: common_vendor.p({
      color: "#999",
      fixed: true,
      ["background-color"]: "#ffffff",
      ["status-bar"]: true,
      ["left-icon"]: "left"
    }),
    e: common_vendor.o($options.doSearch),
    f: common_vendor.o(($event) => $data.searchFocus = true),
    g: common_vendor.o(($event) => $data.searchFocus = false),
    h: common_vendor.o($options.doClear),
    i: common_vendor.o($options.doClear),
    j: common_vendor.o(($event) => $data.keyword = $event),
    k: common_vendor.p({
      placeholder: $data.activeIndex ? "搜索群名称/群号" : "搜索手机号/用户名/用户昵称",
      radius: 100,
      bgColor: "#eeeeee",
      modelValue: $data.keyword
    }),
    l: $data.activeIndex === 0
  }, $data.activeIndex === 0 ? common_vendor.e({
    m: $options.usersList.length
  }, $options.usersList.length ? {
    n: common_vendor.f($options.usersList, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.addUser(index), index),
        b: index,
        c: "6012384a-4-" + i0 + ",6012384a-3",
        d: common_vendor.p({
          title: item.nickname,
          avatarCircle: true,
          avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
        })
      };
    })
  } : {
    o: common_vendor.p({
      status: $data.loading ? "loading" : $data.hasMore ? "hasMore" : "noMore"
    })
  }) : {}, {
    p: $data.activeIndex === 1
  }, $data.activeIndex === 1 ? common_vendor.e({
    q: $options.groupList.length
  }, $options.groupList.length ? {
    r: common_vendor.f($options.groupList, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.addUser(index), index),
        b: index,
        c: "6012384a-7-" + i0 + ",6012384a-6",
        d: common_vendor.p({
          title: item.name,
          avatarCircle: true,
          avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
        })
      };
    })
  } : {
    s: common_vendor.p({
      status: $data.loading ? "loading" : $data.hasMore ? "hasMore" : "noMore"
    })
  }) : {}, {
    t: common_vendor.o($options.close),
    v: common_vendor.o($options.confirm),
    w: common_vendor.p({
      mode: "input",
      title: $data.activeIndex ? "申请加群" : "申请添加好友",
      placeholder: "请输入验证信息",
      confirmText: "发送",
      message: "成功消息",
      duration: 2e3,
      ["before-close"]: true,
      value: $data.value
    }),
    x: common_vendor.sr("popup", "6012384a-9"),
    y: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6012384a"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue"]]);
wx.createPage(MiniProgramPage);
