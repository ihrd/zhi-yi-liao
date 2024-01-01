import { _ as _export_sfc, a as resolveEasycom, f as formatAppLog } from "../../../../../_plugin-vue_export-helper.js";
import { B as Bs, a as uniIm } from "../../../../../utils.js";
import { _ as __easycom_0$1 } from "../../../../../uni-icons.js";
import { openBlock, createElementBlock, normalizeStyle, renderSlot, resolveComponent, resolveDynamicComponent, normalizeClass, createElementVNode, createBlock, createCommentVNode, createVNode, toDisplayString, withCtx, Fragment, renderList } from "vue";
import { _ as __easycom_0$2 } from "../../../../../uni-search-bar.js";
import { _ as __easycom_0$3 } from "../../../../../uni-list-chat.js";
import { _ as __easycom_1 } from "../../../../../uni-list.js";
import { _ as __easycom_3 } from "../../../../../uni-load-more.js";
import { _ as __easycom_5, a as __easycom_6 } from "../../../../../uni-popup.js";
import "../../../../../uni-i18n.es.js";
const _style_0$2 = { "uni-status-bar": { "": { "height": 20 } } };
const _sfc_main$2 = {
  name: "UniStatusBar",
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px"
    };
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    style: normalizeStyle({ height: $data.statusBarHeight }),
    class: "uni-status-bar",
    renderWhole: true
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}
const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$2]]]);
const _style_0$1 = { "uni-nvue-fixed": { "": { "position": "sticky" } }, "uni-nav-bar-text": { "": { "fontSize": "34rpx" } }, "uni-nav-bar-right-text": { "": { "fontSize": 12 } }, "uni-navbar__content": { "": { "position": "relative", "backgroundColor": "rgba(0,0,0,0)" } }, "uni-navbar-btn-text": { "": { "flexDirection": "column", "justifyContent": "flex-start", "alignItems": "center", "lineHeight": 12 } }, "uni-navbar__header": { "": { "paddingTop": 0, "paddingRight": 10, "paddingBottom": 0, "paddingLeft": 10, "flexDirection": "row", "height": 44, "fontSize": 12 } }, "uni-navbar__header-btns": { "": { "flexWrap": "nowrap", "flexDirection": "row", "width": "120rpx", "justifyContent": "center", "alignItems": "center" } }, "uni-navbar__header-btns-left": { "": { "width": "120rpx", "justifyContent": "flex-start", "alignItems": "center" } }, "uni-navbar__header-btns-right": { "": { "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "uni-navbar__header-container": { "": { "flex": 1, "paddingTop": 0, "paddingRight": 10, "paddingBottom": 0, "paddingLeft": 10, "overflow": "hidden" } }, "uni-navbar__header-container-inner": { "": { "flex": 1, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "fontSize": 12, "overflow": "hidden" } }, "uni-navbar__placeholder-view": { "": { "height": 44 } }, "uni-navbar--fixed": { "": { "position": "fixed", "zIndex": 998, "left": 0, "right": 0 } }, "uni-navbar--shadow": { "": { "boxShadow": "0 1px 6px #ccc" } }, "uni-navbar--border": { "": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#eeeeee" } }, "uni-ellipsis-1": { "": { "overflow": "hidden", "lines": 1, "textOverflow": "ellipsis" } } };
const getVal = (val) => typeof val === "number" ? val + "px" : val;
const _sfc_main$1 = {
  name: "UniNavBar",
  components: {
    statusBar
  },
  emits: ["clickLeft", "clickRight", "clickTitle"],
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    statusBar: {
      type: [Boolean, String],
      default: false
    },
    shadow: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [Number, String],
      default: 44
    },
    leftWidth: {
      type: [Number, String],
      default: 60
    },
    rightWidth: {
      type: [Number, String],
      default: 60
    },
    stat: {
      type: [Boolean, String],
      default: ""
    }
  },
  computed: {
    themeBgColor() {
      if (this.dark) {
        if (this.backgroundColor) {
          return this.backgroundColor;
        } else {
          return this.dark ? "#333" : "#FFF";
        }
      }
      return this.backgroundColor || "#FFF";
    },
    themeColor() {
      if (this.dark) {
        if (this.color) {
          return this.color;
        } else {
          return this.dark ? "#fff" : "#333";
        }
      }
      return this.color || "#333";
    },
    navbarHeight() {
      return getVal(this.height);
    },
    leftIconWidth() {
      return getVal(this.leftWidth);
    },
    rightIconWidth() {
      return getVal(this.rightWidth);
    }
  },
  mounted() {
    if (uni.report && this.stat && this.title !== "") {
      uni.report("title", this.title);
    }
  },
  methods: {
    onClickLeft() {
      this.$emit("clickLeft");
    },
    onClickRight() {
      this.$emit("clickRight");
    },
    onClickTitle() {
      this.$emit("clickTitle");
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_status_bar = resolveComponent("status-bar");
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0$1);
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["uni-navbar", { "uni-dark": $props.dark, "uni-nvue-fixed": $props.fixed }]),
    renderWhole: true
  }, [
    createElementVNode("view", {
      class: normalizeClass(["uni-navbar__content", { "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }]),
      style: normalizeStyle({ "background-color": $options.themeBgColor, "border-bottom-color": $options.themeColor })
    }, [
      $props.statusBar ? (openBlock(), createBlock(_component_status_bar, { key: 0 })) : createCommentVNode("", true),
      createElementVNode("view", {
        style: normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight }),
        class: "uni-navbar__header"
      }, [
        createElementVNode("view", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
          class: "uni-navbar__header-btns uni-navbar__header-btns-left",
          style: normalizeStyle({ width: $options.leftIconWidth })
        }, [
          renderSlot(_ctx.$slots, "left", {}, () => [
            $props.leftIcon.length > 0 ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "uni-navbar__content_view"
            }, [
              createVNode(_component_uni_icons, {
                color: $options.themeColor,
                type: $props.leftIcon,
                size: "20"
              }, null, 8, ["color", "type"])
            ])) : createCommentVNode("", true),
            $props.leftText.length ? (openBlock(), createElementBlock("view", {
              key: 1,
              class: normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
            }, [
              createElementVNode("u-text", {
                style: normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
              }, toDisplayString($props.leftText), 5)
            ], 2)) : createCommentVNode("", true)
          ])
        ], 4),
        createElementVNode("view", {
          class: "uni-navbar__header-container",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            $props.title.length > 0 ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "uni-navbar__header-container-inner"
            }, [
              createElementVNode("u-text", {
                class: "uni-nav-bar-text uni-ellipsis-1",
                style: normalizeStyle({ color: $options.themeColor })
              }, toDisplayString($props.title), 5)
            ])) : createCommentVNode("", true)
          ])
        ]),
        createElementVNode("view", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
          class: "uni-navbar__header-btns uni-navbar__header-btns-right",
          style: normalizeStyle({ width: $options.rightIconWidth })
        }, [
          renderSlot(_ctx.$slots, "right", {}, () => [
            $props.rightIcon.length ? (openBlock(), createElementBlock("view", { key: 0 }, [
              createVNode(_component_uni_icons, {
                color: $options.themeColor,
                type: $props.rightIcon,
                size: "22"
              }, null, 8, ["color", "type"])
            ])) : createCommentVNode("", true),
            $props.rightText.length && !$props.rightIcon.length ? (openBlock(), createElementBlock("view", {
              key: 1,
              class: "uni-navbar-btn-text"
            }, [
              createElementVNode("u-text", {
                class: "uni-nav-bar-right-text",
                style: normalizeStyle({ color: $options.themeColor })
              }, toDisplayString($props.rightText), 5)
            ])) : createCommentVNode("", true)
          ])
        ], 4)
      ], 4)
    ], 6)
  ], 2);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const _style_0 = { "segmented-box": { "": { "flex": 1, "justifyContent": "center", "alignItems": "center" } }, "content": { "": { "marginTop": 75 } }, "tab-item": { "": { "borderBottomWidth": 1, "borderBottomStyle": "solid", "borderBottomColor": "#f5f5f5", "height": 60, "justifyContent": "center", "paddingTop": 0, "paddingRight": "15rpx", "paddingBottom": 0, "paddingLeft": "15rpx" } }, "uni-list-item": { "": { "width": "720rpx" } }, "background": { "": { "backgroundColor": "#f5f5f5" } }, "grey": { "": { "color": "#dddddd" } }, "chat-custom-right": { "": { "width": 70, "height": 30, "lineHeight": 30, "color": "#666666", "fontSize": 12, "textAlign": "center", "backgroundColor": "#efefef", "borderRadius": 100 } }, "border": { "": { "borderWidth": 1, "borderStyle": "solid", "borderColor": "#dddddd" } }, "state-text": { "": { "textAlign": "center", "fontSize": "28rpx" } } };
const db = Bs.database();
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
      let current_uid = Bs.getCurrentUserInfo().uid;
      let friendList = uniIm.friend.dataList;
      return this.usersData.filter((item) => {
        if (friendList.find((i) => i._id == item._id) || item._id == current_uid) {
          return false;
        } else {
          return true;
        }
      });
    },
    groupList() {
      let groupList = uniIm.group.dataList;
      return this.groupData.filter((item) => {
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:116", "i.group_info._id == item._id", item.group_info, item._id);
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
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:154", e);
      }
    },
    back() {
      uni.navigateBack();
    },
    async doSearch(e) {
      formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:162", "doSearch: ", e, this.keyword);
      if (this.activeIndex) {
        let res = await db.collection("uni-im-group").where(`
							"name" == "${this.keyword}" || 
							"_id" == "${this.keyword}"
						`).get();
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:170", res);
        this.groupData = res.result.data;
      } else {
        let res = await db.collection("uni-id-users").where(`
											"_id"		==	"${this.keyword}" || 
											"username"	==	"${this.keyword}" || 
											"nickname"	==	"${this.keyword}" || 
											"email"		==	"${this.keyword}" || 
											"mobile"	==	"${this.keyword}" 
										`).field("_id,nickname,avatar_file").get();
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:183", res);
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
        const uniImCo = Bs.importObject("uni-im-co");
        await uniImCo.addFriendInvite({
          "to_uid": this.usersList[this.checkIndex]._id,
          "message": this.value
        }).then((res) => {
          formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:220", "res: ", res);
          uni.showToast({
            title: "已申请",
            icon: "none"
          });
        }).catch((err) => {
          uni.showModal({
            content: err.message || "请求服务失败",
            showCancel: false
          });
        });
      } else {
        db.collection("uni-im-group-join").add({
          "group_id": this.groupList[this.checkIndex]._id,
          "message": this.value
        }).then((res) => {
          formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:239", "res: ", res);
          uni.showToast({
            icon: "none",
            title: "已申请"
          });
        }).catch((err) => {
          uni.showModal({
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
      formatAppLog("log", "at uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.nvue:257", "取消了");
      this.$refs.popup.close();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_nav_bar = resolveEasycom(resolveDynamicComponent("uni-nav-bar"), __easycom_0);
  const _component_uni_search_bar = resolveEasycom(resolveDynamicComponent("uni-search-bar"), __easycom_0$2);
  const _component_uni_list_chat = resolveEasycom(resolveDynamicComponent("uni-list-chat"), __easycom_0$3);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  const _component_uni_load_more = resolveEasycom(resolveDynamicComponent("uni-load-more"), __easycom_3);
  const _component_uni_popup_dialog = resolveEasycom(resolveDynamicComponent("uni-popup-dialog"), __easycom_5);
  const _component_uni_popup = resolveEasycom(resolveDynamicComponent("uni-popup"), __easycom_6);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", null, [
      createVNode(_component_uni_nav_bar, {
        color: "#999",
        fixed: true,
        "background-color": "#ffffff",
        "status-bar": "",
        "left-icon": "left",
        onClickLeft: $options.back
      }, null, 8, ["onClickLeft"]),
      createElementVNode("view", { class: "content" }, [
        createVNode(_component_uni_search_bar, {
          placeholder: "搜索手机号/用户名/用户昵称",
          radius: 100,
          bgColor: "#eeeeee",
          modelValue: $data.keyword,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.keyword = $event),
          onConfirm: $options.doSearch,
          onFocus: _cache[1] || (_cache[1] = ($event) => $data.searchFocus = true),
          onBlur: _cache[2] || (_cache[2] = ($event) => $data.searchFocus = false),
          onCancel: $options.doClear,
          onClear: $options.doClear
        }, null, 8, ["modelValue", "onConfirm", "onCancel", "onClear"]),
        $data.activeIndex === 0 ? (openBlock(), createElementBlock("view", { key: 0 }, [
          $options.usersList.length ? (openBlock(), createBlock(_component_uni_list, { key: 0 }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.usersList, (item, index) => {
                return openBlock(), createBlock(_component_uni_list_chat, {
                  key: index,
                  title: item.nickname,
                  avatarCircle: true,
                  avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
                }, {
                  default: withCtx(() => [
                    createElementVNode("u-text", {
                      onClick: ($event) => $options.addUser(index),
                      class: "chat-custom-right"
                    }, "加为好友", 8, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["title", "avatar"]);
              }), 128))
            ]),
            _: 1
          })) : (openBlock(), createBlock(_component_uni_load_more, {
            key: 1,
            status: $data.loading ? "loading" : $data.hasMore ? "hasMore" : "noMore"
          }, null, 8, ["status"]))
        ])) : createCommentVNode("", true)
      ]),
      createVNode(_component_uni_popup, {
        ref: "popup",
        type: "dialog"
      }, {
        default: withCtx(() => [
          createVNode(_component_uni_popup_dialog, {
            mode: "input",
            title: "申请添加好友",
            placeholder: "请输入验证信息",
            confirmText: "发送",
            message: "成功消息",
            duration: 2e3,
            "before-close": true,
            value: $data.value,
            onClose: $options.close,
            onConfirm: $options.confirm
          }, null, 8, ["value", "onClose", "onConfirm"])
        ]),
        _: 1
      }, 512)
    ])
  ]);
}
const addPeopleGroups = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  addPeopleGroups as default
};
