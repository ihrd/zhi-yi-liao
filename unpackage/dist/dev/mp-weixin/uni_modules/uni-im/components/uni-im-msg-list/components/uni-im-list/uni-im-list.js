"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: {
    scrollTop: {
      default: 0
    },
    scrollIntoView: {
      type: String,
      default: ""
    },
    paddingBottom: {
      default: 0
    }
  },
  methods: {
    scroll(e) {
      this.$emit("scroll", e);
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    b: $props.scrollTop,
    c: $props.scrollIntoView,
    d: $props.paddingBottom
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ec08ace4"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-msg-list/components/uni-im-list/uni-im-list.vue"]]);
wx.createComponent(Component);
