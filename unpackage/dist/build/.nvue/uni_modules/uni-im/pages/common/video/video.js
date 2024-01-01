import { _ as __easycom_0 } from "../../../../../uni-icons.js";
import { resolveDynamicComponent, openBlock, createElementBlock, createElementVNode, createCommentVNode, createBlock } from "vue";
import { _ as _export_sfc, a as resolveEasycom } from "../../../../../_plugin-vue_export-helper.js";
const _style_0 = { "video-box": { "": { "width": "750rpx", "flex": 1 } }, "video": { "": { "width": "750rpx", "flex": 1 } }, "close-icon": { "": { "position": "fixed", "top": "80rpx", "left": "30rpx", "zIndex": 9999 } } };
const _sfc_main = {
  data() {
    return {
      url: "",
      showCloseBtn: true
    };
  },
  onLoad({ url }) {
    this.url = url;
    setTimeout(() => {
      this.showCloseBtn = false;
    }, 1e3);
  },
  methods: {
    close() {
      uni.navigateBack();
    },
    showCloseBtnFn() {
      this.showCloseBtn = true;
      setTimeout(() => {
        this.showCloseBtn = false;
      }, 5e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "video-box" }, [
      $data.url ? (openBlock(), createElementBlock("u-video", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.showCloseBtnFn && $options.showCloseBtnFn(...args)),
        src: $data.url,
        autoplay: true,
        pageGesture: true,
        showFullscreenBtn: false,
        class: "video"
      }, null, 8, ["src"])) : createCommentVNode("", true),
      $data.showCloseBtn ? (openBlock(), createBlock(_component_uni_icons, {
        key: 1,
        onClick: $options.close,
        size: "30px",
        color: "#FFFFFF",
        type: "closeempty",
        class: "close-icon"
      }, null, 8, ["onClick"])) : createCommentVNode("", true)
    ])
  ]);
}
const video = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  video as default
};
