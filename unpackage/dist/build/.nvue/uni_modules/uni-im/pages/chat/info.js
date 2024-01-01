import { B as Bs, a as uniIm } from "../../../../utils.js";
import { _ as __easycom_0 } from "../../../../uni-list-chat.js";
import { resolveDynamicComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, withCtx, createBlock, createTextVNode } from "vue";
import { _ as _export_sfc, a as resolveEasycom } from "../../../../_plugin-vue_export-helper.js";
import { _ as __easycom_1 } from "../../../../uni-list.js";
const _style_0 = { "container": { "": { "width": "750rpx", "alignItems": "center", "flex": 1, "backgroundColor": "#ffffff" } }, "list": { "": { "width": "750rpx", "height": 100 } }, "btn": { "": { "width": "600rpx", "textAlign": "center", "lineHeight": 45, "borderRadius": "20rpx" } } };
const db = Bs.database();
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
      let friendList = uniIm.friend.get();
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
        let conversation = await uniIm.conversation.get(options.conversation_id);
        options.user_id = conversation.friend_uid;
      }
      this.friend_uid = options.user_id;
      let res = await db.collection("uni-id-users").doc(this.friend_uid).field("_id,nickname,avatar_file").get();
      this.friend_info = res.result.data[0];
    },
    async deteleFriend() {
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
            try {
              await db.collection("uni-im-friend").where({
                friend_uid: this.friend_uid,
                user_id: Bs.getCurrentUserInfo().uid
              }).remove();
              uni.navigateBack({ delta: 2 });
            } catch (e2) {
              uni.showModal({
                content: JSON.stringify(e2.message),
                showCancel: false
              });
            }
            uni.hideLoading();
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_list_chat = resolveEasycom(resolveDynamicComponent("uni-list-chat"), __easycom_0);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  const _component_button = resolveComponent("button");
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "container" }, [
      createVNode(_component_uni_list, {
        border: false,
        class: "list"
      }, {
        default: withCtx(() => [
          createVNode(_component_uni_list_chat, {
            avatar: $data.friend_info.avatar_file ? $data.friend_info.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
            title: $data.friend_info.nickname
          }, null, 8, ["avatar", "title"])
        ]),
        _: 1
      }),
      $options.isFriend ? (openBlock(), createBlock(_component_button, {
        key: 0,
        class: "btn",
        plain: "",
        type: "warn",
        onClick: $options.deteleFriend
      }, {
        default: withCtx(() => [
          createTextVNode("删除好友")
        ]),
        _: 1
      }, 8, ["onClick"])) : (openBlock(), createElementBlock("u-text", {
        key: 1,
        style: { "color": "#999", "font-size": "14px" }
      }, "- 非好友的临时会话无法设置 -"))
    ])
  ]);
}
const info = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  info as default
};
