import { _ as _export_sfc, f as formatAppLog, a as resolveEasycom } from "../../../../../_plugin-vue_export-helper.js";
import { B as Bs } from "../../../../../utils.js";
import { _ as __easycom_0 } from "../../../../../uni-search-bar.js";
import { resolveDynamicComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, withCtx, Fragment, renderList, createBlock, createTextVNode, toDisplayString } from "vue";
import { _ as __easycom_0$1 } from "../../../../../uni-list-chat.js";
import { _ as __easycom_1 } from "../../../../../uni-list.js";
import { _ as __easycom_3 } from "../../../../../uni-load-more.js";
import "../../../../../uni-icons.js";
import "../../../../../uni-i18n.es.js";
const _style_0 = { "create-group-box": { "": { "flex": 1, "flexDirection": "column", "position": "relative", "backgroundColor": "#f5f5f5" } }, "header-box": { "": { "width": "750rpx", "flexDirection": "column", "backgroundColor": "#f5f5f5" } }, "image-box": { "": { "flexDirection": "row", "alignItems": "center" } }, "avatar": { "": { "width": "60rpx", "height": "60rpx", "borderRadius": 50 } }, "uni-list-chat__content-title": { ".content-box .label-box ": { "lineHeight": 41 } }, "content-box": { "": { "backgroundColor": "#ffffff", "zIndex": 10 } }, "label-box": { "": { "flexDirection": "row", "alignItems": "center", "height": 80, "marginRight": "20rpx" } }, "checkbox": { "": { "marginTop": 0, "marginRight": "20rpx", "marginBottom": 0, "marginLeft": "30rpx", "transform": "scale(1.2)" } }, "foot-box": { "": { "width": "750rpx", "height": 80, "justifyContent": "center", "alignItems": "center", "position": "fixed", "bottom": 0, "zIndex": 99, "backgroundColor": "#f5f5f5" } }, "btn": { "": { "width": 300 } } };
const db = Bs.database();
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
      formatAppLog("log", "at uni_modules/uni-im/pages/contacts/createGroup/createGroup.nvue:94", "group_id", options);
      if (options.group_id) {
        this.group_id = options.group_id;
        uni.setNavigationBarTitle({
          title: "邀请新成员"
        });
        let res = await db.collection("uni-im-group-member").where({
          group_id: options.group_id
        }).get();
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/createGroup/createGroup.nvue:105", "res:查本群，成员 ", res);
        this.groupMemberUid = res.result.data.map((item) => item.user_id);
        formatAppLog("log", "at uni_modules/uni-im/pages/contacts/createGroup/createGroup.nvue:107", "this.groupMemberUid", this.groupMemberUid);
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
      const uniImCo = Bs.importObject("uni-im-co");
      let res = await uniImCo.chooseUserIntoGroup({
        user_ids: this.checkFriendIds,
        group_id: this.group_id
      });
      this.checkFriendIds = [];
      if (this.group_id) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        uni.redirectTo({
          url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=group_" + res.data.group_id,
          animationDuration: 300,
          complete: (e) => {
            formatAppLog("log", "at uni_modules/uni-im/pages/contacts/createGroup/createGroup.nvue:180", e);
          }
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_search_bar = resolveEasycom(resolveDynamicComponent("uni-search-bar"), __easycom_0);
  const _component_checkbox = resolveComponent("checkbox");
  const _component_uni_list_chat = resolveEasycom(resolveDynamicComponent("uni-list-chat"), __easycom_0$1);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  const _component_label = resolveComponent("label");
  const _component_checkbox_group = resolveComponent("checkbox-group");
  const _component_button = resolveComponent("button");
  const _component_uni_load_more = resolveEasycom(resolveDynamicComponent("uni-load-more"), __easycom_3);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "create-group-box" }, [
      createElementVNode("view", { class: "header-box" }, [
        createVNode(_component_uni_search_bar, {
          modelValue: $data.keyword,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.keyword = $event),
          placeholder: "搜索",
          bgColor: "#fff",
          radius: 100,
          onConfirm: $options.getFriendsData,
          onCancel: $options.doClear,
          onClear: $options.doClear
        }, null, 8, ["modelValue", "onConfirm", "onCancel", "onClear"])
      ]),
      createElementVNode("view", { class: "content-box" }, [
        createVNode(_component_checkbox_group, { onChange: $options.checkboxChange }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.friendList, (item, index) => {
              return openBlock(), createBlock(_component_label, {
                key: index,
                class: "label-box"
              }, {
                default: withCtx(() => [
                  createVNode(_component_checkbox, {
                    value: item._id,
                    class: "checkbox"
                  }, null, 8, ["value"]),
                  createElementVNode("view", null, [
                    createVNode(_component_uni_list, { border: false }, {
                      default: withCtx(() => [
                        createVNode(_component_uni_list_chat, {
                          "avatar-circle": true,
                          title: item.nickname,
                          avatar: item.avatar_file && item.avatar_file.url ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png"
                        }, null, 8, ["title", "avatar"])
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 8, ["onChange"])
      ]),
      createElementVNode("view", { class: "foot-box" }, [
        createVNode(_component_button, {
          disabled: $data.group_id ? !$data.checkFriendIds.length : false,
          class: "btn",
          type: "primary",
          onClick: $options.createGroup
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($options.btnText) + toDisplayString($options.checkFriendNum), 1)
          ]),
          _: 1
        }, 8, ["disabled", "onClick"])
      ]),
      createVNode(_component_uni_load_more, {
        status: $data.loading ? "loading" : $data.hasMore ? "hasMore" : "noMore",
        contentText: { "contentnomore": $options.friendList.length ? "没有更多好友" : "没有可以选择的好友" }
      }, null, 8, ["status", "contentText"])
    ])
  ]);
}
const createGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  createGroup as default
};
