import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.js";
const _style_0 = { "uni-list": { "": { "backgroundColor": "#ffffff", "position": "relative", "flexDirection": "column" } }, "uni-list--border": { "": { "position": "relative", "borderTopColor": "#e5e5e5", "borderTopStyle": "solid", "borderTopWidth": 0.5, "borderBottomColor": "#e5e5e5", "borderBottomStyle": "solid", "borderBottomWidth": 0.5, "zIndex": -1 } } };
const _sfc_main = {
  name: "uniList",
  "mp-weixin": {
    options: {
      multipleSlots: false
    }
  },
  props: {
    stackFromEnd: {
      type: Boolean,
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    renderReverse: {
      type: Boolean,
      default: false
    }
  },
  // provide() {
  // 	return {
  // 		list: this
  // 	};
  // },
  created() {
    this.firstChildAppend = false;
  },
  methods: {
    loadMore(e) {
      this.$emit("scrolltolower");
    },
    scroll(e) {
      this.$emit("scroll", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("list", {
    bounce: false,
    scrollable: true,
    showScrollbar: "",
    renderReverse: $props.renderReverse,
    onScroll: _cache[0] || (_cache[0] = (...args) => $options.scroll && $options.scroll(...args)),
    class: normalizeClass(["uni-list", { "uni-list--border": $props.border }]),
    enableBackToTop: $props.enableBackToTop,
    loadmoreoffset: "15"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, ["renderReverse", "enableBackToTop"]);
}
const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  __easycom_1 as _
};
