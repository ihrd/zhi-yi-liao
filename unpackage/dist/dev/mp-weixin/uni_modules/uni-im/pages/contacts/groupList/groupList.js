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
const _sfc_main = {
  data() {
    return {
      keyword: "",
      groupData: false
    };
  },
  computed: {
    //是否为pc宽屏（width>960px）
    isWidescreen() {
      return uni_modules_uniIm_lib_main.uniIm.isWidescreen;
    },
    groupList() {
      let groupList = uni_modules_uniIm_lib_main.uniIm.group.get();
      if (this.keyword) {
        return groupList.filter((item) => {
          return item.group_info.name.includes(this.keyword) || item.group_info._id.includes(this.keyword);
        });
      } else {
        return groupList;
      }
    },
    groupHasMore() {
      return uni_modules_uniIm_lib_main.uniIm.group.hasMore;
    }
  },
  onLoad() {
  },
  methods: {
    doClear() {
      this.keyword = "";
    },
    toChat(group_id) {
      let conversation_id = "group_" + group_id;
      if (this.isWidescreen) {
        common_vendor.index.$emit("uni-im-toChat", conversation_id);
      } else {
        let url = "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + conversation_id;
        common_vendor.index.navigateTo({
          url,
          animationDuration: 300,
          fail: (error1) => {
            common_vendor.index.switchTab({
              url,
              animationDuration: 300,
              fail: (error2) => {
                console.error(error1, error2);
              }
            });
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
    a: common_vendor.o($options.doClear),
    b: common_vendor.o($options.doClear),
    c: common_vendor.o(($event) => $data.keyword = $event),
    d: common_vendor.p({
      placeholder: "搜索群号/群名称",
      radius: 100,
      bgColor: "#eeeeee",
      modelValue: $data.keyword
    }),
    e: common_vendor.f($options.groupList, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.toChat(item.group_info._id), index),
        c: "f7ac02c0-2-" + i0 + ",f7ac02c0-1",
        d: common_vendor.p({
          link: true,
          title: item.group_info.name,
          avatar: item.group_info.avatar_file && item.group_info.avatar_file.url ? item.group_info.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
        })
      };
    }),
    f: common_vendor.p({
      border: false
    }),
    g: common_vendor.p({
      status: $options.groupHasMore ? "loading" : "noMore"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/contacts/groupList/groupList.vue"]]);
wx.createPage(MiniProgramPage);
