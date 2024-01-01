import { _ as _export_sfc, f as formatAppLog, a as resolveEasycom } from "../../../../_plugin-vue_export-helper.js";
import { B as Bs, a as uniIm } from "../../../../utils.js";
import { _ as __easycom_3 } from "../../../../uni-list-item.js";
import { resolveDynamicComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, withCtx, Fragment, renderList, createBlock, createCommentVNode, toDisplayString, withModifiers, createTextVNode } from "vue";
import { _ as __easycom_3$1 } from "../../../../uni-load-more.js";
import { _ as __easycom_1 } from "../../../../uni-list.js";
import "../../../../uni-icons.js";
import "../../../../uni-i18n.es.js";
const _style_0 = { "tip": { "": { "width": "750rpx", "textAlign": "center", "paddingTop": 30, "paddingRight": 0, "paddingBottom": 30, "paddingLeft": 0, "color": "#999999", "backgroundColor": "#f5f5f5" } }, "grey": { "": { "backgroundColor": "#f5f5f5", "textAlign": "left", "paddingTop": 8, "paddingRight": 8, "paddingBottom": 8, "paddingLeft": 8, "fontSize": 12, "width": "750rpx" } }, "container": { "": { "width": "750rpx", "flex": 1, "backgroundColor": "#f5f5f5" } }, "list-box": { "": { "backgroundColor": "#f5f5f5" } }, "menu-item": { "": { "width": "750rpx", "height": 60, "borderBottomWidth": 1, "borderBottomStyle": "solid", "borderBottomColor": "#f5f5f5", "justifyContent": "space-around" } }, "user-list-item-scroll-view": { "": { "width": "750rpx", "backgroundColor": "#ffffff" } }, "item": { "": { "width": "880rpx", "position": "relative", "height": 60, "alignItems": "center", "paddingTop": 8, "paddingRight": 15, "paddingBottom": 8, "paddingLeft": 15, "flexDirection": "row" } }, "avatar": { "": { "backgroundColor": "#fefefe", "width": 40, "height": 40, "borderRadius": 5 } }, "username": { "": { "lineHeight": 30, "marginLeft": "30rpx", "fontSize": 16 } }, "delete-btn": { "": { "borderRadius": 0, "position": "absolute", "right": 0, "top": 0, "height": 60, "lineHeight": 60, "width": "130rpx", "fontSize": "26rpx", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0 } }, "slot-icon-box": { "": { "width": "80rpx", "height": "80rpx", "alignItems": "center", "justifyContent": "center", "borderRadius": "10rpx", "marginRight": "20rpx" } }, "slot-icon": { "": { "width": "50rpx", "height": "50rpx" } }, "warn": { "": { "backgroundColor": "#FA9E3B" } }, "green": { "": { "backgroundColor": "#08C060" } }, "blue": { "": { "backgroundColor": "#5DBAFF" } } };
const db = Bs.database();
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
          // title:'加人/加群',
          title: "加人",
          path: "./addPeopleGroups/addPeopleGroups",
          srcName: "search"
        }
        // {
        // 	title:'群聊',
        // 	path:'./groupList/groupList',
        // 	srcName:'group'
        // },
        // {
        // 	title:'创建群聊',
        // 	path:'./createGroup/createGroup',
        // 	srcName:'createGroup'
        // }
      ]
    };
  },
  computed: {
    //是否为pc宽屏（width>960px）
    isWidescreen() {
      return uniIm.isWidescreen;
    },
    friendList() {
      return uniIm.friend.dataList;
    },
    friendHasMore() {
      return uniIm.friend.hasMore;
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
        // {
        // 	title: "群通知",
        // 	param: {
        // 		type: ['uni-im-group-join-request']
        // 	},
        // 	icon: "/uni_modules/uni-im/static/noticeIcon/groupNotice.png"
        // },
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
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
  },
  methods: {
    openPages(item, index) {
      uni.navigateTo({
        url: item.path,
        fail: (e) => {
          formatAppLog("error", "at uni_modules/uni-im/pages/contacts/contacts.nvue:176", e, item.path);
        }
      });
    },
    getUnreadCount(param) {
      return uniIm.notification.unreadCount(param);
    },
    toChat(item) {
      if (this.isWidescreen) {
        uni.$emit("uni-im-toChat", { user_id: item._id });
      } else {
        openPages("/uni_modules/uni-im/pages/chat/chat?user_id=" + item._id);
      }
      function openPages(url) {
        uni.navigateTo({
          url,
          fail: (err1) => {
            formatAppLog("log", "at uni_modules/uni-im/pages/contacts/contacts.nvue:197", { err1 });
            uni.switchTab({
              url,
              fail: (err2) => {
                formatAppLog("error", "at uni_modules/uni-im/pages/contacts/contacts.nvue:201", { err1, err2 });
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
      uni.showModal({
        title: "确认要删除好友吗",
        content: "此操作不可撤销",
        showCancel: true,
        cancelText: "取消",
        confirmText: "确认",
        complete: async (e) => {
          if (e.confirm) {
            uni.showLoading({
              mask: true
            });
            await db.collection("uni-im-friend").where({
              friend_uid: item._id,
              user_id: Bs.getCurrentUserInfo().uid
            }).remove();
            uni.hideLoading();
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
      uni.navigateTo({
        url: "./detail?id=" + id
      });
    },
    fabClick() {
      uni.navigateTo({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_list_item = resolveEasycom(resolveDynamicComponent("uni-list-item"), __easycom_3);
  const _component_button = resolveComponent("button");
  const _component_uni_load_more = resolveEasycom(resolveDynamicComponent("uni-load-more"), __easycom_3$1);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", {
      class: "container",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.hiddenDeleteBtn && $options.hiddenDeleteBtn(...args))
    }, [
      createVNode(_component_uni_list, {
        border: false,
        class: "list-box"
      }, {
        default: withCtx(() => [
          $props.showMenu ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.menuList, (menu, menuIndex) => {
              return openBlock(), createBlock(_component_uni_list_item, {
                key: menuIndex,
                class: "menu-item",
                title: menu.title,
                link: "",
                onClick: ($event) => $options.openPages(menu),
                border: false,
                showBadge: true
              }, {
                header: withCtx(() => [
                  createElementVNode("view", { class: "slot-icon-box green" }, [
                    createElementVNode("u-image", {
                      class: "slot-icon",
                      src: "/uni_modules/uni-im/static/noticeIcon/" + menu.srcName + ".png",
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ])
                ]),
                _: 2
              }, 1032, ["title", "onClick"]);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.noticeList, (item, index) => {
              return openBlock(), createBlock(_component_uni_list_item, {
                key: item.id,
                class: "menu-item",
                title: item.title,
                showBadge: true,
                badgeText: item.badge,
                badgeStyle: item.badgeStyle,
                link: "",
                onClick: ($event) => $options.openPages(item),
                border: false
              }, {
                header: withCtx(() => [
                  createElementVNode("view", { class: "slot-icon-box blue" }, [
                    createElementVNode("u-image", {
                      class: "slot-icon",
                      src: item.icon,
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ])
                ]),
                _: 2
              }, 1032, ["title", "badgeText", "badgeStyle", "onClick"]);
            }), 128))
          ], 64)) : createCommentVNode("", true),
          $props.showUser ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(_component_uni_list_item, {
              customStyle: { padding: 0 },
              border: false
            }, {
              body: withCtx(() => [
                createElementVNode("u-text", { class: "grey" }, "好友列表")
              ]),
              _: 1
            }),
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.friendList, (item, index) => {
              return openBlock(), createBlock(_component_uni_list_item, {
                key: item._id,
                customStyle: { padding: 0 },
                class: "user-list-item"
              }, {
                body: withCtx(() => [
                  createElementVNode("scroll-view", {
                    scrollX: "true",
                    onScroll: _cache[0] || (_cache[0] = (...args) => $options.scroll && $options.scroll(...args)),
                    scrollLeft: $data.activeIndex === index ? "" : $data.scrollLeft[index],
                    showScrollbar: false,
                    scrollWithAnimation: true,
                    class: "user-list-item-scroll-view"
                  }, [
                    createElementVNode("view", {
                      class: "item",
                      onClick: ($event) => $options.toChat(item),
                      onTouchstartPassive: ($event) => $data.activeIndex = index
                    }, [
                      createElementVNode("u-image", {
                        class: "avatar",
                        src: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
                        mode: "widthFix"
                      }, null, 8, ["src"]),
                      createElementVNode("u-text", { class: "username" }, toDisplayString(item.nickname), 1),
                      createVNode(_component_button, {
                        onClick: withModifiers(($event) => $options.deleteItem(item, index, $event), ["stop"]),
                        class: "delete-btn",
                        size: "mini",
                        type: "warn"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ], 40, ["onClick", "onTouchstartPassive"])
                  ], 40, ["scrollLeft"])
                ]),
                _: 2
              }, 1024);
            }), 128)),
            createVNode(_component_uni_list_item, { customStyle: { padding: 0 } }, {
              body: withCtx(() => [
                createVNode(_component_uni_load_more, {
                  class: "tip",
                  status: $options.friendHasMore ? "loading" : "noMore"
                }, null, 8, ["status"])
              ]),
              _: 1
            })
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ])
  ]);
}
const contacts = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  contacts as default
};
