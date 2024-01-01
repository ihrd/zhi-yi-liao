import { _ as __easycom_0$1 } from "./uni-icons.js";
import { resolveDynamicComponent, openBlock, createElementBlock, createElementVNode, normalizeStyle, renderSlot, createVNode, toDisplayString, createCommentVNode } from "vue";
import { _ as _export_sfc, a as resolveEasycom } from "./_plugin-vue_export-helper.js";
import { i as initVueI18n } from "./uni-i18n.es.js";
const en = {
  "uni-search-bar.cancel": "cancel",
  "uni-search-bar.placeholder": "Search enter content"
};
const zhHans = {
  "uni-search-bar.cancel": "取消",
  "uni-search-bar.placeholder": "请输入搜索内容"
};
const zhHant = {
  "uni-search-bar.cancel": "取消",
  "uni-search-bar.placeholder": "請輸入搜索內容"
};
const messages = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};
const _style_0 = { "uni-searchbar": { "": { "flexDirection": "row", "position": "relative", "paddingTop": 10, "paddingRight": 10, "paddingBottom": 10, "paddingLeft": 10 } }, "uni-searchbar__box": { "": { "overflow": "hidden", "position": "relative", "flex": 1, "justifyContent": "center", "flexDirection": "row", "alignItems": "center", "height": 36, "paddingTop": 5, "paddingRight": 8, "paddingBottom": 5, "paddingLeft": 0 } }, "uni-searchbar__box-icon-search": { "": { "flexDirection": "row", "paddingTop": 0, "paddingRight": 8, "paddingBottom": 0, "paddingLeft": 8, "justifyContent": "center", "alignItems": "center", "color": "#B3B3B3" } }, "uni-searchbar__box-search-input": { "": { "flex": 1, "fontSize": 14, "color": "#333333" } }, "uni-searchbar__box-icon-clear": { "": { "alignItems": "center", "lineHeight": 24, "paddingLeft": 8 } }, "uni-searchbar__text-placeholder": { "": { "fontSize": 14, "color": "#B3B3B3", "marginLeft": 5 } }, "uni-searchbar__cancel": { "": { "paddingLeft": 10, "lineHeight": 36, "fontSize": 14, "color": "#333333" } } };
const {
  t
} = initVueI18n(messages);
const _sfc_main = {
  name: "UniSearchBar",
  emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    radius: {
      type: [Number, String],
      default: 5
    },
    clearButton: {
      type: String,
      default: "auto"
    },
    cancelButton: {
      type: String,
      default: "auto"
    },
    cancelText: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: "#F8F8F8"
    },
    maxlength: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: ""
    },
    modelValue: {
      type: [Number, String],
      default: ""
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      showSync: false,
      searchVal: ""
    };
  },
  computed: {
    cancelTextI18n() {
      return this.cancelText || t("uni-search-bar.cancel");
    },
    placeholderText() {
      return this.placeholder || t("uni-search-bar.placeholder");
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.searchVal = newVal;
        if (newVal) {
          this.show = true;
        }
      }
    },
    focus: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (this.readonly)
            return;
          this.show = true;
          this.$nextTick(() => {
            this.showSync = true;
          });
        }
      }
    },
    searchVal(newVal, oldVal) {
      this.$emit("input", newVal);
      this.$emit("update:modelValue", newVal);
    }
  },
  methods: {
    searchClick() {
      if (this.readonly)
        return;
      if (this.show) {
        return;
      }
      this.show = true;
      this.$nextTick(() => {
        this.showSync = true;
      });
    },
    clear() {
      this.$emit("clear", {
        value: this.searchVal
      });
      this.searchVal = "";
    },
    cancel() {
      if (this.readonly)
        return;
      this.$emit("cancel", {
        value: this.searchVal
      });
      this.searchVal = "";
      this.show = false;
      this.showSync = false;
      plus.key.hideSoftKeybord();
    },
    confirm() {
      plus.key.hideSoftKeybord();
      this.$emit("confirm", {
        value: this.searchVal
      });
    },
    blur() {
      plus.key.hideSoftKeybord();
      this.$emit("blur", {
        value: this.searchVal
      });
    },
    emitFocus(e) {
      this.$emit("focus", e.detail);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0$1);
  return openBlock(), createElementBlock("view", {
    class: "uni-searchbar",
    renderWhole: true
  }, [
    createElementVNode("view", {
      style: normalizeStyle({ borderRadius: $props.radius + "px", backgroundColor: $props.bgColor }),
      class: "uni-searchbar__box",
      onClick: _cache[5] || (_cache[5] = (...args) => $options.searchClick && $options.searchClick(...args))
    }, [
      createElementVNode("view", { class: "uni-searchbar__box-icon-search" }, [
        renderSlot(_ctx.$slots, "searchIcon", {}, () => [
          createVNode(_component_uni_icons, {
            color: "#c0c4cc",
            size: "18",
            type: "search"
          })
        ])
      ]),
      $data.show || $data.searchVal ? (openBlock(), createElementBlock("u-input", {
        key: 0,
        focus: $data.showSync,
        disabled: $props.readonly,
        placeholder: $options.placeholderText,
        maxlength: $props.maxlength,
        class: "uni-searchbar__box-search-input",
        confirmType: "search",
        type: "text",
        modelValue: $data.searchVal,
        onInput: _cache[0] || (_cache[0] = ($event) => $data.searchVal = $event.detail.value),
        onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
        onBlur: _cache[2] || (_cache[2] = (...args) => $options.blur && $options.blur(...args)),
        onFocus: _cache[3] || (_cache[3] = (...args) => $options.emitFocus && $options.emitFocus(...args))
      }, null, 40, ["focus", "disabled", "placeholder", "maxlength", "modelValue"])) : (openBlock(), createElementBlock("u-text", {
        key: 1,
        class: "uni-searchbar__text-placeholder"
      }, toDisplayString($props.placeholder), 1)),
      $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") && !$props.readonly ? (openBlock(), createElementBlock("view", {
        key: 2,
        class: "uni-searchbar__box-icon-clear",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
      }, [
        renderSlot(_ctx.$slots, "clearIcon", {}, () => [
          createVNode(_component_uni_icons, {
            color: "#c0c4cc",
            size: "20",
            type: "clear"
          })
        ])
      ])) : createCommentVNode("", true)
    ], 4),
    $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto" ? (openBlock(), createElementBlock("u-text", {
      key: 0,
      onClick: _cache[6] || (_cache[6] = (...args) => $options.cancel && $options.cancel(...args)),
      class: "uni-searchbar__cancel"
    }, toDisplayString($options.cancelTextI18n), 1)) : createCommentVNode("", true)
  ]);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  __easycom_0 as _
};
