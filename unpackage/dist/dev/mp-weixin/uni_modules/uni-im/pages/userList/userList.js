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
const _sfc_main = {
  onLoad() {
  },
  computed: {
    //是否为pc宽屏（width>960px）
    isWidescreen() {
      return uni_modules_uniIm_lib_main.uniIm.isWidescreen;
    }
  },
  data() {
    return {
      loadMoreStatus: "more",
      udbWhere: ""
      //'_id != $cloudEnv_uid',
    };
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData(
      {
        clear: true
      },
      () => {
        common_vendor.index.stopPullDownRefresh();
      }
    );
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  },
  onNavigationBarButtonTap(e) {
    console.log(e);
    if (e.index) {
      let data = common_vendor.index.getStorageInfoSync();
      console.log("data.keys", JSON.stringify(data.keys));
      data.keys.forEach((item) => {
        if (item.includes("uni-im-msg:") || item.includes("uni-im-conversation")) {
          common_vendor.index.removeStorageSync(item);
          console.log(common_vendor.index.getStorageSync(item));
        }
      });
      common_vendor.index.showToast({
        title: "clear storage ok",
        icon: "none"
      });
    } else {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
        complete: (e2) => {
          console.log(e2);
        }
      });
    }
  },
  methods: {
    handleLoad(data, ended) {
      this.loadMoreStatus = ended ? "noMore" : "more";
    },
    async toChat(user_id) {
      const currentConversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get({
        friend_uid: user_id
      });
      console.log("currentConversation", currentConversation);
      if (this.isWidescreen) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-im/pages/index/index?conversation_id=" + currentConversation.id
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + currentConversation.id
        });
      }
    },
    toAdd() {
      common_vendor.index.navigateTo({
        url: "../uni-id-users/add",
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_list_chat = () => "../../../uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      pagination,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : {
        c: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item._id,
            b: common_vendor.o(($event) => $options.toChat(item._id), item._id),
            c: "46aba8ae-2-" + i0 + "-" + i1 + "," + ("46aba8ae-1-" + i0),
            d: common_vendor.p({
              link: true,
              title: item.nickname,
              avatar: item.avatar_file ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
            })
          };
        }),
        d: "46aba8ae-1-" + i0 + ",46aba8ae-0"
      }, {
        e: "46aba8ae-3-" + i0 + ",46aba8ae-0",
        f: common_vendor.p({
          status: loading ? "loading" : $data.loadMoreStatus
        }),
        g: i0,
        h: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "46aba8ae-0"
    }),
    b: common_vendor.sr("udb", "46aba8ae-0"),
    c: common_vendor.o($options.handleLoad),
    d: common_vendor.p({
      collection: "uni-id-users",
      field: "_id,nickname,avatar_file",
      where: $data.udbWhere
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/userList/userList.vue"]]);
wx.createPage(MiniProgramPage);
