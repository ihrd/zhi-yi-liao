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
  emits: ["clickMenu"],
  props: {
    // pc端时会控制隐藏
    showMenu: {
      type: Boolean,
      default: true
    },
    // pc端时会控制隐藏
    showUser: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollLeft: {
        0: 0,
        1: 1
      },
      activeIndex: false,
      menuList: [
        {
          title: "加人/加群",
          path: "./addPeopleGroups/addPeopleGroups",
          srcName: "search"
        },
        {
          title: "群聊",
          path: "./groupList/groupList",
          srcName: "group"
        },
        {
          title: "创建群聊",
          path: "./createGroup/createGroup",
          srcName: "createGroup"
        }
      ]
    };
  },
  computed: {
    //是否为pc宽屏（width>960px）
    isWidescreen() {
      return uni_modules_uniIm_lib_main.uniIm.isWidescreen;
    },
    friendList() {
      return uni_modules_uniIm_lib_main.uniIm.friend.dataList;
    },
    friendHasMore() {
      return uni_modules_uniIm_lib_main.uniIm.friend.hasMore;
    },
    noticeList() {
      return [
        {
          title: "新朋友",
          param: {
            type: ["uni-im-friend-invite"]
          },
          icon: "/uni_modules/uni-im/static/noticeIcon/newFriend.png"
        },
        {
          title: "群通知",
          param: {
            type: ["uni-im-group-join-request"]
          },
          icon: "/uni_modules/uni-im/static/noticeIcon/groupNotice.png"
        },
        {
          title: "系统通知",
          param: {
            excludeType: ["uni-im-group-join-request", "uni-im-friend-invite"]
          },
          icon: "/uni_modules/uni-im/static/noticeIcon/notification.png"
        }
      ].reduce((sum, item, index) => {
        let { param: filterNotice, title } = item, param = { filterNotice, title };
        sum.push({
          title: item.title,
          badge: this.getUnreadCount(item.param),
          badgeStyle: {
            backgroundColor: "#d60000"
          },
          path: "./notification/notification?param=" + encodeURIComponent(JSON.stringify(param)),
          param,
          icon: item.icon,
          id: Date.now() + "-" + index
        });
        return sum;
      }, []);
    }
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData({
      clear: true
    }, () => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  onReachBottom() {
  },
  methods: {
    openPages(item, index) {
      common_vendor.index.navigateTo({
        url: item.path,
        fail: (e) => {
          console.error(e, item.path);
        }
      });
    },
    getUnreadCount(param) {
      return uni_modules_uniIm_lib_main.uniIm.notification.unreadCount(param);
    },
    toChat(item) {
      if (this.isWidescreen) {
        common_vendor.index.$emit("uni-im-toChat", { user_id: item._id });
      } else {
        openPages("/uni_modules/uni-im/pages/chat/chat?user_id=" + item._id);
      }
      function openPages(url) {
        common_vendor.index.navigateTo({
          url,
          fail: (err1) => {
            console.log({ err1 });
            common_vendor.index.switchTab({
              url,
              fail: (err2) => {
                console.error({ err1, err2 });
              }
            });
          }
        });
      }
    },
    hiddenDeleteBtn() {
      this.activeIndex = false;
      this.$nextTick(() => {
        for (let i in this.scrollLeft) {
          this.$set(this.scrollLeft, i, 0);
        }
      });
    },
    async deleteItem(item, index, event) {
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
            await db.collection("uni-im-friend").where({
              friend_uid: item._id,
              user_id: common_vendor.Bs.getCurrentUserInfo().uid
            }).remove();
            common_vendor.index.hideLoading();
          }
        }
      });
      this.hiddenDeleteBtn();
      event.stopPropagation();
      event.preventDefault();
    },
    scroll(e) {
      this.$set(this.scrollLeft, this.activeIndex, e.detail.scrollLeft);
      for (let i in this.scrollLeft) {
        if (i != this.activeIndex) {
          this.$set(this.scrollLeft, i, 0);
        }
      }
    },
    handleItemClick(id) {
      common_vendor.index.navigateTo({
        url: "./detail?id=" + id
      });
    },
    fabClick() {
      common_vendor.index.navigateTo({
        url: "./add",
        events: {
          // 监听新增数据成功后, 刷新当前页面数据
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_load_more2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_load_more + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showMenu
  }, $props.showMenu ? {
    b: common_vendor.f($data.menuList, (menu, menuIndex, i0) => {
      return {
        a: "/uni_modules/uni-im/static/noticeIcon/" + menu.srcName + ".png",
        b: menuIndex,
        c: common_vendor.o(($event) => $options.openPages(menu), menuIndex),
        d: "1f1592fe-1-" + i0 + ",1f1592fe-0",
        e: common_vendor.p({
          title: menu.title,
          link: true,
          border: false,
          showBadge: true
        })
      };
    }),
    c: common_vendor.f($options.noticeList, (item, index, i0) => {
      return {
        a: item.icon,
        b: item.id,
        c: common_vendor.o(($event) => $options.openPages(item), item.id),
        d: "1f1592fe-2-" + i0 + ",1f1592fe-0",
        e: common_vendor.p({
          title: item.title,
          showBadge: true,
          badgeText: item.badge,
          badgeStyle: item.badgeStyle,
          link: true,
          border: false
        })
      };
    })
  } : {}, {
    d: $props.showUser
  }, $props.showUser ? {
    e: common_vendor.p({
      customStyle: {
        padding: 0
      },
      border: false
    }),
    f: common_vendor.f($options.friendList, (item, index, i0) => {
      return {
        a: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
        b: common_vendor.t(item.nickname),
        c: common_vendor.o(($event) => $options.deleteItem(item, index, $event), item._id),
        d: common_vendor.o(($event) => $options.toChat(item), item._id),
        e: common_vendor.o(($event) => $data.activeIndex = index, item._id),
        f: common_vendor.o((...args) => $options.scroll && $options.scroll(...args), item._id),
        g: $data.activeIndex === index ? "" : $data.scrollLeft[index],
        h: item._id,
        i: "1f1592fe-4-" + i0 + ",1f1592fe-0"
      };
    }),
    g: common_vendor.p({
      customStyle: {
        padding: 0
      }
    }),
    h: common_vendor.p({
      status: $options.friendHasMore ? "loading" : "noMore"
    }),
    i: common_vendor.p({
      customStyle: {
        padding: 0
      }
    })
  } : {}, {
    j: common_vendor.p({
      border: false
    }),
    k: common_vendor.o((...args) => $options.hiddenDeleteBtn && $options.hiddenDeleteBtn(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f1592fe"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/contacts/contacts.nvue"]]);
wx.createPage(MiniProgramPage);
