"use strict";
const uni_modules_uniIm_lib_markdownIt_min = require("../../lib/markdown-it.min.js");
const uni_modules_uniIm_lib_highlight_highlightUni_min = require("../../lib/highlight/highlight-uni.min.js");
require("../../lib/html-parser.js");
const common_vendor = require("../../../../common/vendor.js");
const markdownIt = uni_modules_uniIm_lib_markdownIt_min.mt({
  // 在源码中启用 HTML 标签
  html: true,
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function(str, lang) {
    try {
      return '<pre class="hljs" style="tab-size: 4;padding: 5px 8px;overflow: auto;"><code>' + uni_modules_uniIm_lib_highlight_highlightUni_min.$e.highlightAuto(str).value + "</code></pre>";
    } catch (__) {
    }
    return '<pre class="hljs" style="tab-size: 4;padding: 5px 8px;overflow: auto;"><code>' + markdownIt.utils.escapeHtml(str) + "</code></pre>";
  }
});
let htmlString = "";
const _sfc_main = {
  data() {
    return {
      nodes: []
    };
  },
  props: {
    code: {
      type: String,
      default() {
        return `alert(5);`;
      }
    }
  },
  watch: {
    code: {
      handler(code, oldValue) {
        htmlString = markdownIt.render("``` \n\n" + code + " \n\n ```");
        this.nodes = htmlString;
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.nodes.length
  }, $data.nodes.length ? {
    b: $data.nodes
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-code-view/uni-im-code-view.vue"]]);
wx.createComponent(Component);
