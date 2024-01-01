import { i as initVueI18n } from "./uni-i18n.es.js";
import { openBlock, createElementBlock, createElementVNode, normalizeClass, toDisplayString, renderSlot, normalizeStyle, createCommentVNode, resolveDynamicComponent, createBlock, createVNode, withCtx } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, f as formatAppLog, a as resolveEasycom } from "./_plugin-vue_export-helper.js";
const popup = {
  data() {
    return {};
  },
  created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
     * 获取父元素实例
     */
    getParent(name = "uniPopup") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
const en = {
  "uni-popup.cancel": "cancel",
  "uni-popup.ok": "ok",
  "uni-popup.placeholder": "pleace enter",
  "uni-popup.title": "Hint",
  "uni-popup.shareTitle": "Share to"
};
const zhHans = {
  "uni-popup.cancel": "取消",
  "uni-popup.ok": "确定",
  "uni-popup.placeholder": "请输入",
  "uni-popup.title": "提示",
  "uni-popup.shareTitle": "分享到"
};
const zhHant = {
  "uni-popup.cancel": "取消",
  "uni-popup.ok": "確定",
  "uni-popup.placeholder": "請輸入",
  "uni-popup.title": "提示",
  "uni-popup.shareTitle": "分享到"
};
const messages = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};
const _style_0$1 = { "uni-popup-dialog": { "": { "width": 300, "borderRadius": 11, "backgroundColor": "#ffffff" } }, "uni-dialog-title": { "": { "flexDirection": "row", "justifyContent": "center", "paddingTop": 25 } }, "uni-dialog-title-text": { "": { "fontSize": 16, "fontWeight": "500" } }, "uni-dialog-content": { "": { "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "paddingTop": 20, "paddingRight": 20, "paddingBottom": 20, "paddingLeft": 20 } }, "uni-dialog-content-text": { "": { "fontSize": 14, "color": "#6C6C6C" } }, "uni-dialog-button-group": { "": { "flexDirection": "row", "borderTopColor": "#f5f5f5", "borderTopStyle": "solid", "borderTopWidth": 1 } }, "uni-dialog-button": { "": { "flex": 1, "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "height": 45 } }, "uni-border-left": { "": { "borderLeftColor": "#f0f0f0", "borderLeftStyle": "solid", "borderLeftWidth": 1 } }, "uni-dialog-button-text": { "": { "fontSize": 16, "color": "#333333" } }, "uni-button-color": { "": { "color": "#007aff" } }, "uni-dialog-input": { "": { "flex": 1, "fontSize": 14, "borderWidth": 1, "borderStyle": "solid", "borderColor": "#eeeeee", "height": 40, "paddingTop": 0, "paddingRight": 10, "paddingBottom": 0, "paddingLeft": 10, "borderRadius": 5, "color": "#555555" } }, "uni-popup__success": { "": { "color": "#4cd964" } }, "uni-popup__warn": { "": { "color": "#f0ad4e" } }, "uni-popup__error": { "": { "color": "#dd524d" } }, "uni-popup__info": { "": { "color": "#909399" } } };
const { t } = initVueI18n(messages);
const _sfc_main$2 = {
  name: "uniPopupDialog",
  mixins: [popup],
  emits: ["confirm", "close"],
  props: {
    inputType: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "error"
    },
    mode: {
      type: String,
      default: "base"
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    beforeClose: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogType: "error",
      focus: false,
      val: ""
    };
  },
  computed: {
    okText() {
      return this.confirmText || t("uni-popup.ok");
    },
    closeText() {
      return this.cancelText || t("uni-popup.cancel");
    },
    placeholderText() {
      return this.placeholder || t("uni-popup.placeholder");
    },
    titleText() {
      return this.title || t("uni-popup.title");
    }
  },
  watch: {
    type(val) {
      this.dialogType = val;
    },
    mode(val) {
      if (val === "input") {
        this.dialogType = "info";
      }
    },
    value(val) {
      this.val = val;
    }
  },
  created() {
    this.popup.disableMask();
    if (this.mode === "input") {
      this.dialogType = "info";
      this.val = this.value;
    } else {
      this.dialogType = this.type;
    }
  },
  mounted() {
    this.focus = true;
  },
  methods: {
    /**
     * 点击确认按钮
     */
    onOk() {
      if (this.mode === "input") {
        this.$emit("confirm", this.val);
      } else {
        this.$emit("confirm");
      }
      if (this.beforeClose)
        return;
      this.popup.close();
    },
    /**
     * 点击取消按钮
     */
    closeDialog() {
      this.$emit("close");
      if (this.beforeClose)
        return;
      this.popup.close();
    },
    close() {
      this.popup.close();
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: "uni-popup-dialog",
    renderWhole: true
  }, [
    createElementVNode("view", { class: "uni-dialog-title" }, [
      createElementVNode("u-text", {
        class: normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
      }, toDisplayString($options.titleText), 3)
    ]),
    $props.mode === "base" ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: "uni-dialog-content"
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createElementVNode("u-text", { class: "uni-dialog-content-text" }, toDisplayString($props.content), 1)
      ])
    ])) : (openBlock(), createElementBlock("view", {
      key: 1,
      class: "uni-dialog-content"
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createElementVNode("u-input", {
          class: "uni-dialog-input",
          modelValue: $data.val,
          onInput: _cache[0] || (_cache[0] = ($event) => $data.val = $event.detail.value),
          type: $props.inputType,
          placeholder: $options.placeholderText,
          focus: $data.focus
        }, null, 40, ["modelValue", "type", "placeholder", "focus"])
      ])
    ])),
    createElementVNode("view", { class: "uni-dialog-button-group" }, [
      createElementVNode("view", {
        class: "uni-dialog-button",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
      }, [
        createElementVNode("u-text", { class: "uni-dialog-button-text" }, toDisplayString($options.closeText), 1)
      ]),
      createElementVNode("view", {
        class: "uni-dialog-button uni-border-left",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
      }, [
        createElementVNode("u-text", { class: "uni-dialog-button-text uni-button-color" }, toDisplayString($options.okText), 1)
      ])
    ])
  ]);
}
const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$1]]]);
const nvueAnimation = requireNativePlugin("animation");
class MPAnimation {
  constructor(options, _this) {
    this.options = options;
    this.animation = uni.createAnimation({
      ...options
    });
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  _nvuePushAnimates(type, args) {
    let aniObj = this.currentStepAnimates[this.next];
    let styles = {};
    if (!aniObj) {
      styles = {
        styles: {},
        config: {}
      };
    } else {
      styles = aniObj;
    }
    if (animateTypes1.includes(type)) {
      if (!styles.styles.transform) {
        styles.styles.transform = "";
      }
      let unit = "";
      if (type === "rotate") {
        unit = "deg";
      }
      styles.styles.transform += `${type}(${args + unit}) `;
    } else {
      styles.styles[type] = `${args}`;
    }
    this.currentStepAnimates[this.next] = styles;
  }
  _animateRun(styles = {}, config = {}) {
    let ref = this.$.$refs["ani"].ref;
    if (!ref)
      return;
    return new Promise((resolve, reject) => {
      nvueAnimation.transition(ref, {
        styles,
        ...config
      }, (res) => {
        resolve();
      });
    });
  }
  _nvueNextAnimate(animates, step = 0, fn) {
    let obj = animates[step];
    if (obj) {
      let {
        styles,
        config
      } = obj;
      this._animateRun(styles, config).then(() => {
        step += 1;
        this._nvueNextAnimate(animates, step, fn);
      });
    } else {
      this.currentStepAnimates = {};
      typeof fn === "function" && fn();
      this.isEnd = true;
    }
  }
  step(config = {}) {
    this.currentStepAnimates[this.next].config = Object.assign({}, this.options, config);
    this.currentStepAnimates[this.next].styles.transformOrigin = this.currentStepAnimates[this.next].config.transformOrigin;
    this.next++;
    return this;
  }
  run(fn) {
    this.isEnd = false;
    let ref = this.$.$refs["ani"] && this.$.$refs["ani"].ref;
    if (!ref)
      return;
    this._nvueNextAnimate(this.currentStepAnimates, 0, fn);
    this.next = 0;
  }
}
const animateTypes1 = [
  "matrix",
  "matrix3d",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skew",
  "skewX",
  "skewY",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ"
];
const animateTypes2 = ["opacity", "backgroundColor"];
const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
  MPAnimation.prototype[type] = function(...args) {
    this._nvuePushAnimates(type, args);
    return this;
  };
});
function createAnimation(option, _this) {
  if (!_this)
    return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
const _sfc_main$1 = {
  name: "uniTransition",
  emits: ["click", "change"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modeClass: {
      type: [Array, String],
      default() {
        return "fade";
      }
    },
    duration: {
      type: Number,
      default: 300
    },
    styles: {
      type: Object,
      default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ""
    },
    onceRender: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      transform: "",
      opacity: 1,
      animationData: {},
      durationTime: 300,
      config: {}
    };
  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.open();
        } else {
          if (this.isShow) {
            this.close();
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    // 生成样式数据
    stylesObject() {
      let styles = {
        ...this.styles,
        "transition-duration": this.duration / 1e3 + "s"
      };
      let transform = "";
      for (let i in styles) {
        let line = this.toLine(i);
        transform += line + ":" + styles[i] + ";";
      }
      return transform;
    },
    // 初始化动画条件
    transformStyles() {
      return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
    }
  },
  created() {
    this.config = {
      duration: this.duration,
      timingFunction: "ease",
      transformOrigin: "50% 50%",
      delay: 0
    };
    this.durationTime = this.duration;
  },
  methods: {
    /**
     *  ref 触发 初始化动画
     */
    init(obj = {}) {
      if (obj.duration) {
        this.durationTime = obj.duration;
      }
      this.animation = createAnimation(Object.assign(this.config, obj), this);
    },
    /**
     * 点击组件触发回调
     */
    onClick() {
      this.$emit("click", {
        detail: this.isShow
      });
    },
    /**
     * ref 触发 动画分组
     * @param {Object} obj
     */
    step(obj, config = {}) {
      if (!this.animation)
        return;
      for (let i in obj) {
        try {
          if (typeof obj[i] === "object") {
            this.animation[i](...obj[i]);
          } else {
            this.animation[i](obj[i]);
          }
        } catch (e) {
          formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
        }
      }
      this.animation.step(config);
      return this;
    },
    /**
     *  ref 触发 执行动画
     */
    run(fn) {
      if (!this.animation)
        return;
      this.animation.run(fn);
    },
    // 开始过度动画
    open() {
      clearTimeout(this.timer);
      this.transform = "";
      this.isShow = true;
      let { opacity, transform } = this.styleInit(false);
      if (typeof opacity !== "undefined") {
        this.opacity = opacity;
      }
      this.transform = transform;
      this.$nextTick(() => {
        this.timer = setTimeout(() => {
          this.animation = createAnimation(this.config, this);
          this.tranfromInit(false).step();
          this.animation.run();
          this.$emit("change", {
            detail: this.isShow
          });
        }, 20);
      });
    },
    // 关闭过度动画
    close(type) {
      if (!this.animation)
        return;
      this.tranfromInit(true).step().run(() => {
        this.isShow = false;
        this.animationData = null;
        this.animation = null;
        let { opacity, transform } = this.styleInit(false);
        this.opacity = opacity || 1;
        this.transform = transform;
        this.$emit("change", {
          detail: this.isShow
        });
      });
    },
    // 处理动画开始前的默认样式
    styleInit(type) {
      let styles = {
        transform: ""
      };
      let buildStyle = (type2, mode) => {
        if (mode === "fade") {
          styles.opacity = this.animationType(type2)[mode];
        } else {
          styles.transform += this.animationType(type2)[mode] + " ";
        }
      };
      if (typeof this.modeClass === "string") {
        buildStyle(type, this.modeClass);
      } else {
        this.modeClass.forEach((mode) => {
          buildStyle(type, mode);
        });
      }
      return styles;
    },
    // 处理内置组合动画
    tranfromInit(type) {
      let buildTranfrom = (type2, mode) => {
        let aniNum = null;
        if (mode === "fade") {
          aniNum = type2 ? 0 : 1;
        } else {
          aniNum = type2 ? "-100%" : "0";
          if (mode === "zoom-in") {
            aniNum = type2 ? 0.8 : 1;
          }
          if (mode === "zoom-out") {
            aniNum = type2 ? 1.2 : 1;
          }
          if (mode === "slide-right") {
            aniNum = type2 ? "100%" : "0";
          }
          if (mode === "slide-bottom") {
            aniNum = type2 ? "100%" : "0";
          }
        }
        this.animation[this.animationMode()[mode]](aniNum);
      };
      if (typeof this.modeClass === "string") {
        buildTranfrom(type, this.modeClass);
      } else {
        this.modeClass.forEach((mode) => {
          buildTranfrom(type, mode);
        });
      }
      return this.animation;
    },
    animationType(type) {
      return {
        fade: type ? 1 : 0,
        "slide-top": `translateY(${type ? "0" : "-100%"})`,
        "slide-right": `translateX(${type ? "0" : "100%"})`,
        "slide-bottom": `translateY(${type ? "0" : "100%"})`,
        "slide-left": `translateX(${type ? "0" : "-100%"})`,
        "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
        "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
      };
    },
    // 内置动画类型与实际动画对应字典
    animationMode() {
      return {
        fade: "opacity",
        "slide-top": "translateY",
        "slide-right": "translateX",
        "slide-bottom": "translateY",
        "slide-left": "translateX",
        "zoom-in": "scale",
        "zoom-out": "scale"
      };
    },
    // 驼峰转中横线
    toLine(name) {
      return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.isShow ? (openBlock(), createElementBlock("view", {
    key: 0,
    ref: "ani",
    animation: $data.animationData,
    class: normalizeClass($props.customClass),
    style: normalizeStyle($options.transformStyles),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
    renderWhole: true
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 14, ["animation"])) : createCommentVNode("", true);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _style_0 = { "uni-popup": { "": { "position": "fixed" }, ".top": { "top": 0 }, ".left": { "top": 0 }, ".right": { "top": 0 } }, "uni-popup__wrapper": { ".uni-popup ": { "position": "relative" }, ".uni-popup .left": { "paddingTop": 0, "flex": 1 }, ".uni-popup .right": { "paddingTop": 0, "flex": 1 } }, "fixforpc-top": { "": { "top": 0 } } };
const _sfc_main = {
  name: "uniPopup",
  components: {},
  emits: ["change", "maskClick"],
  props: {
    // 开启动画
    animation: {
      type: Boolean,
      default: true
    },
    // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
    // message: 消息提示 ; dialog : 对话框
    type: {
      type: String,
      default: "center"
    },
    // maskClick
    isMaskClick: {
      type: Boolean,
      default: null
    },
    // TODO 2 个版本后废弃属性 ，使用 isMaskClick
    maskClick: {
      type: Boolean,
      default: null
    },
    backgroundColor: {
      type: String,
      default: "none"
    },
    safeArea: {
      type: Boolean,
      default: true
    },
    maskBackgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.4)"
    }
  },
  watch: {
    /**
     * 监听type类型
     */
    type: {
      handler: function(type) {
        if (!this.config[type])
          return;
        this[this.config[type]](true);
      },
      immediate: true
    },
    isDesktop: {
      handler: function(newVal) {
        if (!this.config[newVal])
          return;
        this[this.config[this.type]](true);
      },
      immediate: true
    },
    /**
     * 监听遮罩是否可点击
     * @param {Object} val
     */
    maskClick: {
      handler: function(val) {
        this.mkclick = val;
      },
      immediate: true
    },
    isMaskClick: {
      handler: function(val) {
        this.mkclick = val;
      },
      immediate: true
    },
    // H5 下禁止底部滚动
    showPopup(show) {
    }
  },
  data() {
    return {
      duration: 300,
      ani: [],
      showPopup: false,
      showTrans: false,
      popupWidth: 0,
      popupHeight: 0,
      config: {
        top: "top",
        bottom: "bottom",
        center: "center",
        left: "left",
        right: "right",
        message: "top",
        dialog: "center",
        share: "bottom"
      },
      maskClass: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)"
      },
      transClass: {
        position: "fixed",
        left: 0,
        right: 0
      },
      maskShow: true,
      mkclick: true,
      popupstyle: this.isDesktop ? "fixforpc-top" : "top"
    };
  },
  computed: {
    isDesktop() {
      return this.popupWidth >= 500 && this.popupHeight >= 500;
    },
    bg() {
      if (this.backgroundColor === "" || this.backgroundColor === "none") {
        return "transparent";
      }
      return this.backgroundColor;
    }
  },
  mounted() {
    const fixSize = () => {
      const {
        windowWidth,
        windowHeight,
        windowTop,
        safeArea,
        screenHeight,
        safeAreaInsets
      } = uni.getSystemInfoSync();
      this.popupWidth = windowWidth;
      this.popupHeight = windowHeight + (windowTop || 0);
      if (safeArea && this.safeArea) {
        this.safeAreaInsets = safeAreaInsets.bottom;
      } else {
        this.safeAreaInsets = 0;
      }
    };
    fixSize();
  },
  // TODO vue3
  unmounted() {
    this.setH5Visible();
  },
  created() {
    if (this.isMaskClick === null && this.maskClick === null) {
      this.mkclick = true;
    } else {
      this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
    }
    if (this.animation) {
      this.duration = 300;
    } else {
      this.duration = 0;
    }
    this.messageChild = null;
    this.clearPropagation = false;
    this.maskClass.backgroundColor = this.maskBackgroundColor;
  },
  methods: {
    setH5Visible() {
    },
    /**
     * 公用方法，不显示遮罩层
     */
    closeMask() {
      this.maskShow = false;
    },
    /**
     * 公用方法，遮罩层禁止点击
     */
    disableMask() {
      this.mkclick = false;
    },
    // TODO nvue 取消冒泡
    clear(e) {
      this.clearPropagation = true;
    },
    open(direction) {
      if (this.showPopup) {
        return;
      }
      let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
      if (!(direction && innerType.indexOf(direction) !== -1)) {
        direction = this.type;
      }
      if (!this.config[direction]) {
        formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
        return;
      }
      this[this.config[direction]]();
      this.$emit("change", {
        show: true,
        type: direction
      });
    },
    close(type) {
      this.showTrans = false;
      this.$emit("change", {
        show: false,
        type: this.type
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showPopup = false;
      }, 300);
    },
    // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
    touchstart() {
      this.clearPropagation = false;
    },
    onTap() {
      if (this.clearPropagation) {
        this.clearPropagation = false;
        return;
      }
      this.$emit("maskClick");
      if (!this.mkclick)
        return;
      this.close();
    },
    /**
     * 顶部弹出样式处理
     */
    top(type) {
      this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
      this.ani = ["slide-top"];
      this.transClass = {
        position: "fixed",
        left: 0,
        right: 0,
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
      this.$nextTick(() => {
        if (this.messageChild && this.type === "message") {
          this.messageChild.timerClose();
        }
      });
    },
    /**
     * 底部弹出样式处理
     */
    bottom(type) {
      this.popupstyle = "bottom";
      this.ani = ["slide-bottom"];
      this.transClass = {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: this.safeAreaInsets + "px",
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    /**
     * 中间弹出样式处理
     */
    center(type) {
      this.popupstyle = "center";
      this.ani = ["zoom-out", "fade"];
      this.transClass = {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center"
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    left(type) {
      this.popupstyle = "left";
      this.ani = ["slide-left"];
      this.transClass = {
        position: "fixed",
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    right(type) {
      this.popupstyle = "right";
      this.ani = ["slide-right"];
      this.transClass = {
        position: "fixed",
        bottom: 0,
        right: 0,
        top: 0,
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_transition = resolveEasycom(resolveDynamicComponent("uni-transition"), __easycom_0);
  return $data.showPopup ? (openBlock(), createElementBlock("view", {
    key: 0,
    class: normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]]),
    renderWhole: true
  }, [
    createElementVNode("view", {
      onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
    }, [
      $data.maskShow ? (openBlock(), createBlock(_component_uni_transition, {
        key: "1",
        name: "mask",
        "mode-class": "fade",
        styles: $data.maskClass,
        duration: $data.duration,
        show: $data.showTrans,
        onClick: $options.onTap
      }, null, 8, ["styles", "duration", "show", "onClick"])) : createCommentVNode("", true),
      createVNode(_component_uni_transition, {
        key: "2",
        "mode-class": $data.ani,
        name: "content",
        styles: $data.transClass,
        duration: $data.duration,
        show: $data.showTrans,
        onClick: $options.onTap
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
            style: normalizeStyle({ backgroundColor: $options.bg }),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 6)
        ]),
        _: 3
      }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
    ], 32)
  ], 2)) : createCommentVNode("", true);
}
const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  __easycom_5 as _,
  __easycom_6 as a
};
