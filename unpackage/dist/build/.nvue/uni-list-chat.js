import { B as Bs } from "./utils.js";
import { openBlock, createElementBlock, createElementVNode, withModifiers, normalizeClass, Fragment, renderList, normalizeStyle, renderSlot, toDisplayString, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.js";
const _style_0 = { "uni-list-chat": { "": { "fontSize": 16, "position": "relative", "flexDirection": "column", "justifyContent": "space-between", "backgroundColor": "#ffffff" } }, "uni-list-chat--hover": { "": { "backgroundColor": "#f5f5f5" } }, "uni-list--border": { "": { "position": "relative", "marginLeft": 15, "borderTopColor": "#e5e5e5", "borderTopStyle": "solid", "borderTopWidth": 0.5 } }, "uni-list-chat--first": { "": { "borderTopWidth": 0 } }, "uni-ellipsis": { "": { "lines": 1 } }, "uni-ellipsis-2": { "": { "lines": 2 } }, "uni-list-chat__container": { "": { "position": "relative", "flexDirection": "row", "flex": 1, "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "overflow": "hidden" } }, "uni-list-chat__header-warp": { "": { "position": "relative" } }, "uni-list-chat__header": { "": { "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "flexWrap": "wrap-reverse", "width": 50, "height": 50, "borderRadius": 5, "borderColor": "#eeeeee", "borderWidth": 1, "borderStyle": "solid", "overflow": "hidden" } }, "uni-list-chat__header-box": { "": { "width": 50, "height": 50, "overflow": "hidden", "borderRadius": 2 } }, "uni-list-chat__header-image": { "": { "marginTop": 1, "marginRight": 1, "marginBottom": 1, "marginLeft": 1, "width": 50, "height": 50 } }, "header--circle": { "": { "borderRadius": 50 } }, "uni-list-chat__content": { "": { "flexDirection": "row", "flex": 1, "overflow": "hidden", "paddingTop": 2, "paddingRight": 0, "paddingBottom": 2, "paddingLeft": 0 } }, "uni-list-chat__content-main": { "": { "flexDirection": "column", "justifyContent": "space-between", "paddingLeft": 10, "flex": 1, "overflow": "hidden" } }, "uni-list-chat__content-title": { "": { "fontSize": 16, "color": "#3b4144", "fontWeight": "normal", "overflow": "hidden" } }, "draft": { "": { "marginTop": 3, "color": "#eb3a41", "fontSize": 12, "fontWeight": "normal", "overflow": "hidden", "paddingRight": 3 } }, "uni-list-chat__content-note": { "": { "marginTop": 3, "color": "#999999", "fontSize": 12, "fontWeight": "normal", "overflow": "hidden" } }, "uni-list-chat__content-extra": { "": { "flexDirection": "column", "justifyContent": "space-between", "alignItems": "flex-end", "marginLeft": 5 } }, "uni-list-chat__content-extra-text": { "": { "color": "#999999", "fontSize": 12, "fontWeight": "normal", "overflow": "hidden" } }, "uni-list-chat__badge-pos": { "": { "position": "absolute", "left": 55, "top": 3 } }, "uni-list-chat__badge": { "": { "justifyContent": "center", "alignItems": "center", "borderRadius": 100, "backgroundColor": "#ff5a5f" } }, "uni-list-chat__badge-text": { "": { "color": "#ffffff", "fontSize": 12 } }, "uni-badge--single": { "": { "width": 18, "height": 18 } }, "uni-badge--complex": { "": { "left": 50, "height": 18, "paddingTop": 0, "paddingRight": 6, "paddingBottom": 0, "paddingLeft": 6 } }, "uni-badge--dot": { "": { "left": 60, "top": 6, "width": 10, "height": 10, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0 } }, "uni-list-chat--right": { "": { "left": 0 } } };
const avatarWidth = 45;
const _sfc_main = {
  name: "UniListChat",
  emits: ["click"],
  props: {
    title: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    },
    clickable: {
      type: Boolean,
      default: false
    },
    link: {
      type: [Boolean, String],
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    badgeText: {
      type: [String, Number],
      default: ""
    },
    badgePositon: {
      type: String,
      default: "right"
    },
    time: {
      type: String,
      default: ""
    },
    avatarCircle: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    avatarList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  // inject: ['list'],
  computed: {
    isDraft() {
      return this.note.slice(0, 14) == "[uni-im-draft]";
    },
    isSingle() {
      if (this.badgeText === "dot") {
        return "uni-badge--dot";
      } else {
        const badgeText = this.badgeText.toString();
        if (badgeText.length > 1) {
          return "uni-badge--complex";
        } else {
          return "uni-badge--single";
        }
      }
    },
    computedAvatar() {
      if (this.avatarList.length > 4) {
        this.imageWidth = avatarWidth * 0.31;
        return "avatarItem--3";
      } else if (this.avatarList.length > 1) {
        this.imageWidth = avatarWidth * 0.47;
        return "avatarItem--2";
      } else {
        this.imageWidth = avatarWidth;
        return "avatarItem--1";
      }
    }
  },
  watch: {
    avatar: {
      handler(avatar) {
        if (avatar.substr(0, 8) == "cloud://") {
          Bs.getTempFileURL({
            fileList: [avatar]
          }).then((res) => {
            let fileList = res.fileList || res.result.fileList;
            this.avatarUrl = fileList[0].tempFileURL;
          });
        } else {
          this.avatarUrl = avatar;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      isFirstChild: false,
      border: true,
      // avatarList: 3,
      imageWidth: 50,
      avatarUrl: ""
    };
  },
  mounted() {
    this.list = this.getForm();
    if (this.list) {
      if (!this.list.firstChildAppend) {
        this.list.firstChildAppend = true;
        this.isFirstChild = true;
      }
      this.border = this.list.border;
    }
  },
  methods: {
    /**
     * 获取父元素实例
     */
    getForm(name = "uniList") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    onClick() {
      if (this.to !== "") {
        this.openPage();
        return;
      }
      if (this.clickable || this.link) {
        this.$emit("click", {
          data: {}
        });
      }
    },
    openPage() {
      if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
        this.pageApi(this.link);
      } else {
        this.pageApi("navigateTo");
      }
    },
    pageApi(api) {
      let callback = {
        url: this.to,
        success: (res) => {
          this.$emit("click", {
            data: res
          });
        },
        fail: (err) => {
          this.$emit("click", {
            data: err
          });
        }
      };
      switch (api) {
        case "navigateTo":
          uni.navigateTo(callback);
          break;
        case "redirectTo":
          uni.redirectTo(callback);
          break;
        case "reLaunch":
          uni.reLaunch(callback);
          break;
        case "switchTab":
          uni.switchTab(callback);
          break;
        default:
          uni.navigateTo(callback);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("cell", null, [
    createElementVNode("view", {
      hoverClass: !$props.clickable && !$props.link ? "" : "uni-list-chat--hover",
      class: "uni-list-chat",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.onClick && $options.onClick(...args), ["stop"]))
    }, [
      createElementVNode("view", {
        class: normalizeClass({ "uni-list--border": $data.border, "uni-list-chat--first": $data.isFirstChild })
      }, null, 2),
      createElementVNode("view", { class: "uni-list-chat__container" }, [
        createElementVNode("view", { class: "uni-list-chat__header-warp" }, [
          $props.avatarCircle || $props.avatarList.length === 0 ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass(["uni-list-chat__header", { "header--circle": $props.avatarCircle }])
          }, [
            createElementVNode("u-image", {
              class: normalizeClass(["uni-list-chat__header-image", { "header--circle": $props.avatarCircle }]),
              src: $data.avatarUrl,
              mode: "aspectFill"
            }, null, 10, ["src"])
          ], 2)) : (openBlock(), createElementBlock("view", {
            key: 1,
            class: "uni-list-chat__header"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.avatarList, (item, index) => {
              return openBlock(), createElementBlock("view", {
                key: index,
                class: normalizeClass(["uni-list-chat__header-box", $options.computedAvatar]),
                style: normalizeStyle({ width: $data.imageWidth + "px", height: $data.imageWidth + "px" })
              }, [
                createElementVNode("u-image", {
                  class: "uni-list-chat__header-image",
                  style: normalizeStyle({ width: $data.imageWidth + "px", height: $data.imageWidth + "px" }),
                  src: item.url,
                  mode: "aspectFill"
                }, null, 12, ["src"])
              ], 6);
            }), 128))
          ]))
        ]),
        renderSlot(_ctx.$slots, "header"),
        $props.badgeText && $props.badgePositon === "left" ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: normalizeClass(["uni-list-chat__badge uni-list-chat__badge-pos", [$options.isSingle]])
        }, [
          createElementVNode("u-text", { class: "uni-list-chat__badge-text" }, toDisplayString($props.badgeText === "dot" ? "" : $props.badgeText), 1)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("view", { class: "uni-list-chat__content" }, [
          createElementVNode("view", { class: "uni-list-chat__content-main" }, [
            createElementVNode("u-text", { class: "uni-list-chat__content-title uni-ellipsis" }, toDisplayString($props.title), 1),
            createElementVNode("view", { style: { "flex-direction": "row" } }, [
              $options.isDraft ? (openBlock(), createElementBlock("u-text", {
                key: 0,
                class: "draft"
              }, "[草稿]")) : createCommentVNode("", true),
              createElementVNode("u-text", { class: "uni-list-chat__content-note uni-ellipsis" }, toDisplayString($options.isDraft ? $props.note.slice(14) : $props.note), 1)
            ])
          ]),
          createElementVNode("view", { class: "uni-list-chat__content-extra" }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createElementVNode("u-text", { class: "uni-list-chat__content-extra-text" }, toDisplayString($props.time), 1),
              $props.badgeText && $props.badgePositon === "right" ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: normalizeClass(["uni-list-chat__badge", [$options.isSingle, $props.badgePositon === "right" ? "uni-list-chat--right" : ""]])
              }, [
                createElementVNode("u-text", { class: "uni-list-chat__badge-text" }, toDisplayString($props.badgeText === "dot" ? "" : $props.badgeText), 1)
              ], 2)) : createCommentVNode("", true)
            ])
          ])
        ])
      ])
    ], 8, ["hoverClass"])
  ]);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  __easycom_0 as _
};
