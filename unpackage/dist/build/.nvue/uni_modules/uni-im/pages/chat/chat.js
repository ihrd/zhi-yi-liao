import { _ as _export_sfc, o as onResize, r as requireNativePlugin, f as formatAppLog, a as resolveEasycom } from "../../../../_plugin-vue_export-helper.js";
import { u as uniImUtils, B as Bs, a as uniIm, s as store } from "../../../../utils.js";
import { openBlock, createElementBlock, renderSlot, toDisplayString, normalizeStyle, createCommentVNode, createElementVNode, resolveDynamicComponent, resolveComponent, normalizeClass, Fragment, createVNode, createBlock, withCtx, renderList, createTextVNode, withModifiers } from "vue";
import { _ as __easycom_0$2 } from "../../../../uni-icons.js";
import { _ as __easycom_3$2 } from "../../../../uni-load-more.js";
import "../../../../uni-i18n.es.js";
const attrs = [
  "titleIcon",
  "titleIconRadius",
  "subtitleText",
  "subtitleSize",
  "subtitleColor",
  "subtitleOverflow",
  "titleAlign",
  "backgroundImage",
  "backgroundRepeat",
  "blurEffect"
];
const _sfc_main$c = {
  props: {
    title: {
      type: String,
      default: ""
    },
    titleIcon: {
      type: String,
      default: ""
    },
    titleIconRadius: {
      type: String,
      default: ""
    },
    subtitleText: {
      type: String,
      default: ""
    },
    subtitleSize: {
      type: String,
      default: ""
    },
    subtitleColor: {
      type: String,
      default: ""
    },
    subtitleOverflow: {
      type: String,
      default: ""
    },
    titleAlign: {
      type: String,
      default: ""
    },
    backgroundImage: {
      type: String,
      default: ""
    },
    backgroundRepeat: {
      type: String,
      default: ""
    },
    blurEffect: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    frontColor: {
      type: String,
      default: "#ffffff"
    },
    backgroundColor: {
      type: String,
      default: "#000000"
    },
    colorAnimationDuration: {
      type: Number,
      default: 0
    },
    colorAnimationTimingFunc: {
      type: String,
      default: "linear"
    }
  },
  created() {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    this.__$page = page;
    this.$watch("title", () => {
      this.setNavigationBarTitle();
    });
    this.$watch("loading", () => {
      this.setNavigationBarLoading();
    });
    this.$watch(
      () => [
        this.frontColor,
        this.backgroundColor,
        this.colorAnimationDuration,
        this.colorAnimationTimingFunc
      ],
      () => {
        this.setNavigationBarColor();
      }
    );
    this.__$webview = page.$getAppWebview();
    attrs.forEach((key) => {
      const titleNView = {};
      if (this[key] || this[key].length > 0) {
        titleNView[key] = this[key];
      }
      this.setTitleNView(titleNView);
      this.$watch(key, (val) => {
        const titleStyle = {};
        titleStyle[key] = val;
        this.setTitleNView(titleStyle);
      });
    });
  },
  beforeMount() {
    this.title && this.setNavigationBarTitle();
    this.setNavigationBarLoading();
    this.setNavigationBarColor();
  },
  methods: {
    setNavigationBarTitle() {
      uni.setNavigationBarTitle({
        __page__: this.__$page,
        title: this.title
      });
    },
    setNavigationBarLoading() {
      uni[(this.loading ? "show" : "hide") + "NavigationBarLoading"]({
        __page__: this.__$page
      });
    },
    setNavigationBarColor() {
      uni.setNavigationBarColor({
        __page__: this.__$page,
        frontColor: this.frontColor,
        backgroundColor: this.backgroundColor,
        animation: {
          duration: this.colorAnimationDuration,
          timingFunc: this.colorAnimationTimingFunc
        }
      });
    },
    setTitleNView(titleNView) {
      const webview = this.__$webview;
      const style = webview.getStyle();
      if (style && style.titleNView) {
        webview.setStyle({
          titleNView
        });
      }
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    style: { "display": "none" },
    renderWhole: true
  });
}
const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = {
  name: "PageMeta",
  setup(props, { emit }) {
    onResize((evt) => {
      emit("resize", evt);
    });
  },
  props: {
    backgroundTextStyle: {
      type: String,
      default: "dark",
      validator(value) {
        return ["dark", "light"].indexOf(value) !== -1;
      }
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    backgroundColorTop: {
      type: String,
      default: "#ffffff"
    },
    backgroundColorBottom: {
      type: String,
      default: "#ffffff"
    },
    scrollTop: {
      type: String,
      default: ""
    },
    scrollDuration: {
      type: Number,
      default: 300
    },
    pageStyle: {
      type: String,
      default: ""
    },
    enablePullDownRefresh: {
      type: [Boolean, String],
      default: false
    },
    rootFontSize: {
      type: String,
      default: ""
    }
  },
  created() {
    const page = getCurrentPages()[0];
    this.$pageVm = page.$vm || page;
    this._currentWebview = page.$getAppWebview();
    if (this.enablePullDownRefresh) {
      this.setPullDownRefresh(this._currentWebview, true);
    }
    this.$watch("enablePullDownRefresh", (val) => {
      this.setPullDownRefresh(this._currentWebview, val);
    });
    this.$watch("backgroundTextStyle", () => {
      this.setBackgroundTextStyle();
    });
    this.$watch(() => [
      this.rootFontSize,
      this.pageStyle
    ], () => {
      this.setPageMeta();
    });
    this.$watch(() => [
      this.backgroundColor,
      this.backgroundColorTop,
      this.backgroundColorBottom
    ], () => {
      this.setBackgroundColor();
    });
    this.$watch(() => [
      this.scrollTop,
      this.scrollDuration
    ], () => {
      this.pageScrollTo();
    });
  },
  beforeMount() {
    this.setBackgroundColor();
    if (this.rootFontSize || this.pageStyle) {
      this.setPageMeta();
    }
    this.backgroundTextStyle && this.setBackgroundTextStyle();
  },
  mounted() {
    this.scrollTop && this.pageScrollTo();
  },
  methods: {
    setPullDownRefresh(webview, enabled) {
      webview.setStyle({
        pullToRefresh: {
          support: enabled,
          style: plus.os.name === "Android" ? "circle" : "default"
        }
      });
    },
    setPageMeta() {
      uni.setPageMeta({
        pageStyle: this.pageStyle,
        rootFontSize: this.rootFontSize
      });
    },
    setBackgroundTextStyle() {
    },
    setBackgroundColor() {
    },
    pageScrollTo() {
      let scrollTop = String(this.scrollTop);
      if (scrollTop.indexOf("rpx") !== -1) {
        scrollTop = uni.upx2px(scrollTop.replace("rpx", ""));
      }
      scrollTop = parseFloat(scrollTop);
      if (isNaN(scrollTop)) {
        return;
      }
      uni.pageScrollTo({
        scrollTop,
        duration: this.scrollDuration,
        success: () => {
        }
      });
    }
  }
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    style: { "display": "none" },
    renderWhole: true
  }, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _style_0$8 = { "system-msg": { "": { "backgroundColor": "#f2f2f2", "color": "#9d9e9d", "fontSize": 14, "height": 30, "lineHeight": 30, "paddingTop": 0, "paddingRight": "15rpx", "paddingBottom": 0, "paddingLeft": "15rpx", "borderRadius": 8 } } };
const _sfc_main$a = {
  props: {
    msg: {
      type: Object,
      default() {
        return {
          userList: []
        };
      }
    }
  },
  computed: {
    friendlyTime() {
      return uniImUtils.toFriendlyTime(this.msg.create_time || this.msg.client_create_time);
    },
    content() {
      switch (this.msg.action) {
        case "join-group-notice":
          return "" + this.msg.body.user_list.map((item) => item.nickname).join(" , ") + " 加入群聊";
        default:
          return this.msg.body;
      }
    }
  },
  data() {
    return {};
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("u-text", { class: "system-msg" }, toDisplayString($options.friendlyTime) + " " + toDisplayString($options.content), 1);
}
const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["styles", [_style_0$8]]]);
const _sfc_main$9 = {
  name: "cloud-image",
  emits: ["click"],
  props: {
    mode: {
      type: String,
      default() {
        return "widthFix";
      }
    },
    src: {
      // type:String,
      default() {
        return "";
      }
    },
    width: {
      type: String,
      default() {
        return "100rpx";
      }
    },
    height: {
      type: String,
      default() {
        return "100rpx";
      }
    }
  },
  watch: {
    src: {
      handler(src) {
        if (src && src.substring(0, 8) == "cloud://") {
          Bs.getTempFileURL({
            fileList: [src]
          }).then((res) => {
            this.cSrc = res.fileList[0].tempFileURL;
          });
        } else {
          this.cSrc = src;
        }
      },
      immediate: true
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  data() {
    return {
      cSrc: false
    };
  }
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
    style: normalizeStyle([{ width: $props.width, height: $props.height }, { "justify-content": "center" }]),
    renderWhole: true
  }, [
    $data.cSrc ? (openBlock(), createElementBlock("u-image", {
      key: 0,
      style: normalizeStyle({ width: $props.width, height: $props.height }),
      src: $data.cSrc,
      mode: $props.mode
    }, null, 12, ["src", "mode"])) : createCommentVNode("", true)
  ], 4);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _style_0$7 = { "uni-im-icons": { "": { "!fontFamily": "uni-im-icons", "fontSize": 16, "fontStyle": "normal" } } };
const getVal = (val) => {
  const reg = /^[0-9]*$/g;
  return typeof val === "number" || reg.test(val) ? val + "px" : val;
};
const domModule = requireNativePlugin("dom");
domModule.addRule("fontFace", {
  "fontFamily": "uni-im-icons",
  // 'src': "url('"+iconUrl+"')"
  "src": "url('https://at.alicdn.com/t/c/font_3726059_20zdv1uemg2.ttf?t=1670230205644')"
});
const _sfc_main$8 = {
  emits: ["click"],
  data() {
    return {};
  },
  props: {
    code: {
      type: String,
      default() {
        return "";
      }
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  computed: {
    unicode() {
      return unescape(`%u${this.code}`);
    },
    iconSize() {
      return getVal(this.size);
    }
  },
  methods: {
    _onClick(e2) {
      this.$emit("click", e2);
    }
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", { renderWhole: true }, [
    createElementVNode("u-text", {
      style: normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args)),
      class: "uni-im-icons"
    }, toDisplayString($options.unicode), 5)
  ]);
}
const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["styles", [_style_0$7]]]);
function e$1(e2) {
  if (e2.__esModule)
    return e2;
  var r2 = Object.defineProperty({}, "__esModule", { value: true });
  return Object.keys(e2).forEach(function(t2) {
    var n2 = Object.getOwnPropertyDescriptor(e2, t2);
    Object.defineProperty(r2, t2, n2.get ? n2 : { enumerable: true, get: function() {
      return e2[t2];
    } });
  }), r2;
}
var r$1 = {}, t$1 = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", amp: "&", AMP: "&", andand: "⩕", And: "⩓", and: "∧", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angmsd: "∡", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", apacir: "⩯", ap: "≈", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxHd: "╤", boxhD: "╥", boxHD: "╦", boxhu: "┴", boxHu: "╧", boxhU: "╨", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsolb: "⧅", bsol: "\\", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", capand: "⩄", capbrcup: "⩉", capcap: "⩋", cap: "∩", Cap: "⋒", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cir: "○", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cup: "∪", Cup: "⋓", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", Darr: "↡", dArr: "⇓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", ddagger: "‡", ddarr: "⇊", DD: "ⅅ", dd: "ⅆ", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrowBar: "⤓", downarrow: "↓", DownArrow: "↓", Downarrow: "⇓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVectorBar: "⥖", DownLeftVector: "↽", DownRightTeeVector: "⥟", DownRightVectorBar: "⥗", DownRightVector: "⇁", DownTeeArrow: "↧", DownTee: "⊤", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", Ecirc: "Ê", ecirc: "ê", ecir: "≖", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", edot: "ė", eDot: "≑", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp13: " ", emsp14: " ", emsp: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", ge: "≥", gE: "≧", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", gescc: "⪩", ges: "⩾", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gla: "⪥", gl: "≷", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gtcc: "⪧", gtcir: "⩺", gt: ">", GT: ">", Gt: "≫", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", harrcir: "⥈", harr: "↔", hArr: "⇔", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", Im: "ℑ", imof: "⊷", imped: "Ƶ", Implies: "⇒", incare: "℅", in: "∈", infin: "∞", infintie: "⧝", inodot: "ı", intcal: "⊺", int: "∫", Int: "∬", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larrb: "⇤", larrbfs: "⤟", larr: "←", Larr: "↞", lArr: "⇐", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", latail: "⤙", lAtail: "⤛", lat: "⪫", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", LeftArrowBar: "⇤", leftarrow: "←", LeftArrow: "←", Leftarrow: "⇐", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVectorBar: "⥙", LeftDownVector: "⇃", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTeeArrow: "↤", LeftTee: "⊣", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangleBar: "⧏", LeftTriangle: "⊲", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVectorBar: "⥘", LeftUpVector: "↿", LeftVectorBar: "⥒", LeftVector: "↼", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", lescc: "⪨", les: "⩽", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", llarr: "⇇", ll: "≪", Ll: "⋘", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoustache: "⎰", lmoust: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftrightarrow: "⟷", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longmapsto: "⟼", longrightarrow: "⟶", LongRightArrow: "⟶", Longrightarrow: "⟹", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", ltcc: "⪦", ltcir: "⩹", lt: "<", LT: "<", Lt: "≪", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", midast: "*", midcir: "⫰", mid: "∣", middot: "·", minusb: "⊟", minus: "−", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natural: "♮", naturals: "ℕ", natur: "♮", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", ne: "≠", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nlE: "≦̸", nle: "≰", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangleBar: "⧏̸", NotLeftTriangle: "⋪", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangleBar: "⧐̸", NotRightTriangle: "⋫", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", nparallel: "∦", npar: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", nprec: "⊀", npreceq: "⪯̸", npre: "⪯̸", nrarrc: "⤳̸", nrarr: "↛", nrArr: "⇏", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", Ocirc: "Ô", ocirc: "ô", ocir: "⊚", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", orarr: "↻", Or: "⩔", or: "∨", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", otimesas: "⨶", Otimes: "⨷", otimes: "⊗", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", para: "¶", parallel: "∥", par: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plus: "+", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", prap: "⪷", Pr: "⪻", pr: "≺", prcue: "≼", precapprox: "⪷", prec: "≺", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", pre: "⪯", prE: "⪳", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportional: "∝", Proportion: "∷", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarr: "→", Rarr: "↠", rArr: "⇒", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", Re: "ℜ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrowBar: "⇥", rightarrow: "→", RightArrow: "→", Rightarrow: "⇒", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVectorBar: "⥕", RightDownVector: "⇂", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTeeArrow: "↦", RightTee: "⊢", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangleBar: "⧐", RightTriangle: "⊳", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVectorBar: "⥔", RightUpVector: "↾", RightVectorBar: "⥓", RightVector: "⇀", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoustache: "⎱", rmoust: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", scap: "⪸", Scaron: "Š", scaron: "š", Sc: "⪼", sc: "≻", sccue: "≽", sce: "⪰", scE: "⪴", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdotb: "⊡", sdot: "⋅", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", solbar: "⌿", solb: "⧄", sol: "/", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squ: "□", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succapprox: "⪸", succ: "≻", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", Sup: "⋑", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", therefore: "∴", Therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", ThinSpace: " ", thinsp: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", timesbar: "⨱", timesb: "⊠", times: "×", timesd: "⨰", tint: "∭", toea: "⤨", topbot: "⌶", topcir: "⫱", top: "⊤", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", uarr: "↑", Uarr: "↟", uArr: "⇑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrowBar: "⤒", uparrow: "↑", UpArrow: "↑", Uparrow: "⇑", UpArrowDownArrow: "⇅", updownarrow: "↕", UpDownArrow: "↕", Updownarrow: "⇕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTeeArrow: "↥", UpTee: "⊥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", Vcy: "В", vcy: "в", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", veebar: "⊻", vee: "∨", Vee: "⋁", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xharr: "⟷", xhArr: "⟺", Xi: "Ξ", xi: "ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", yuml: "ÿ", Yuml: "Ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", zfr: "𝔷", Zfr: "ℨ", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" }, n$1 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, s$1 = {}, o$1 = {};
function i$1(e2, r2, t2) {
  var n2, s2, a2, c2, l2, u2 = "";
  for ("string" != typeof r2 && (t2 = r2, r2 = i$1.defaultChars), void 0 === t2 && (t2 = true), l2 = function(e3) {
    var r3, t3, n3 = o$1[e3];
    if (n3)
      return n3;
    for (n3 = o$1[e3] = [], r3 = 0; r3 < 128; r3++)
      t3 = String.fromCharCode(r3), /^[0-9a-z]$/i.test(t3) ? n3.push(t3) : n3.push("%" + ("0" + r3.toString(16).toUpperCase()).slice(-2));
    for (r3 = 0; r3 < e3.length; r3++)
      n3[e3.charCodeAt(r3)] = e3[r3];
    return n3;
  }(r2), n2 = 0, s2 = e2.length; n2 < s2; n2++)
    if (a2 = e2.charCodeAt(n2), t2 && 37 === a2 && n2 + 2 < s2 && /^[0-9a-f]{2}$/i.test(e2.slice(n2 + 1, n2 + 3)))
      u2 += e2.slice(n2, n2 + 3), n2 += 2;
    else if (a2 < 128)
      u2 += l2[a2];
    else if (a2 >= 55296 && a2 <= 57343) {
      if (a2 >= 55296 && a2 <= 56319 && n2 + 1 < s2 && (c2 = e2.charCodeAt(n2 + 1)) >= 56320 && c2 <= 57343) {
        u2 += encodeURIComponent(e2[n2] + e2[n2 + 1]), n2++;
        continue;
      }
      u2 += "%EF%BF%BD";
    } else
      u2 += encodeURIComponent(e2[n2]);
  return u2;
}
i$1.defaultChars = ";/?:@&=+$,-_.!~*'()#", i$1.componentChars = "-_.!~*'()";
var a$1 = i$1, c$1 = {};
function l$1(e2, r2) {
  var t2;
  return "string" != typeof r2 && (r2 = l$1.defaultChars), t2 = function(e3) {
    var r3, t3, n2 = c$1[e3];
    if (n2)
      return n2;
    for (n2 = c$1[e3] = [], r3 = 0; r3 < 128; r3++)
      t3 = String.fromCharCode(r3), n2.push(t3);
    for (r3 = 0; r3 < e3.length; r3++)
      n2[t3 = e3.charCodeAt(r3)] = "%" + ("0" + t3.toString(16).toUpperCase()).slice(-2);
    return n2;
  }(r2), e2.replace(/(%[a-f0-9]{2})+/gi, function(e3) {
    var r3, n2, s2, o2, i2, a2, c2, l2 = "";
    for (r3 = 0, n2 = e3.length; r3 < n2; r3 += 3)
      (s2 = parseInt(e3.slice(r3 + 1, r3 + 3), 16)) < 128 ? l2 += t2[s2] : 192 == (224 & s2) && r3 + 3 < n2 && 128 == (192 & (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16))) ? (l2 += (c2 = s2 << 6 & 1984 | 63 & o2) < 128 ? "��" : String.fromCharCode(c2), r3 += 3) : 224 == (240 & s2) && r3 + 6 < n2 && (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16), i2 = parseInt(e3.slice(r3 + 7, r3 + 9), 16), 128 == (192 & o2) && 128 == (192 & i2)) ? (l2 += (c2 = s2 << 12 & 61440 | o2 << 6 & 4032 | 63 & i2) < 2048 || c2 >= 55296 && c2 <= 57343 ? "���" : String.fromCharCode(c2), r3 += 6) : 240 == (248 & s2) && r3 + 9 < n2 && (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16), i2 = parseInt(e3.slice(r3 + 7, r3 + 9), 16), a2 = parseInt(e3.slice(r3 + 10, r3 + 12), 16), 128 == (192 & o2) && 128 == (192 & i2) && 128 == (192 & a2)) ? ((c2 = s2 << 18 & 1835008 | o2 << 12 & 258048 | i2 << 6 & 4032 | 63 & a2) < 65536 || c2 > 1114111 ? l2 += "����" : (c2 -= 65536, l2 += String.fromCharCode(55296 + (c2 >> 10), 56320 + (1023 & c2))), r3 += 9) : l2 += "�";
    return l2;
  });
}
l$1.defaultChars = ";/?:@&=+$,#", l$1.componentChars = "";
var u$1 = l$1;
function p$1() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var h$1 = /^([a-z0-9.+-]+:)/i, f$1 = /:[0-9]*$/, d$1 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, m$1 = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]), g$1 = ["'"].concat(m$1), _$1 = ["%", "/", "?", ";", "#"].concat(g$1), k$1 = ["/", "?", "#"], b$1 = /^[+a-z0-9A-Z_-]{0,63}$/, v$1 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, C$1 = { javascript: true, "javascript:": true }, y$1 = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
p$1.prototype.parse = function(e2, r2) {
  var t2, n2, s2, o2, i2, a2 = e2;
  if (a2 = a2.trim(), !r2 && 1 === e2.split("#").length) {
    var c2 = d$1.exec(a2);
    if (c2)
      return this.pathname = c2[1], c2[2] && (this.search = c2[2]), this;
  }
  var l2 = h$1.exec(a2);
  if (l2 && (s2 = (l2 = l2[0]).toLowerCase(), this.protocol = l2, a2 = a2.substr(l2.length)), (r2 || l2 || a2.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(i2 = "//" === a2.substr(0, 2)) || l2 && C$1[l2] || (a2 = a2.substr(2), this.slashes = true)), !C$1[l2] && (i2 || l2 && !y$1[l2])) {
    var u2, p2, f2 = -1;
    for (t2 = 0; t2 < k$1.length; t2++)
      -1 !== (o2 = a2.indexOf(k$1[t2])) && (-1 === f2 || o2 < f2) && (f2 = o2);
    for (-1 !== (p2 = -1 === f2 ? a2.lastIndexOf("@") : a2.lastIndexOf("@", f2)) && (u2 = a2.slice(0, p2), a2 = a2.slice(p2 + 1), this.auth = u2), f2 = -1, t2 = 0; t2 < _$1.length; t2++)
      -1 !== (o2 = a2.indexOf(_$1[t2])) && (-1 === f2 || o2 < f2) && (f2 = o2);
    -1 === f2 && (f2 = a2.length), ":" === a2[f2 - 1] && f2--;
    var m2 = a2.slice(0, f2);
    a2 = a2.slice(f2), this.parseHost(m2), this.hostname = this.hostname || "";
    var g2 = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
    if (!g2) {
      var A2 = this.hostname.split(/\./);
      for (t2 = 0, n2 = A2.length; t2 < n2; t2++) {
        var x2 = A2[t2];
        if (x2 && !x2.match(b$1)) {
          for (var D2 = "", w2 = 0, E2 = x2.length; w2 < E2; w2++)
            x2.charCodeAt(w2) > 127 ? D2 += "x" : D2 += x2[w2];
          if (!D2.match(b$1)) {
            var q2 = A2.slice(0, t2), S2 = A2.slice(t2 + 1), F2 = x2.match(v$1);
            F2 && (q2.push(F2[1]), S2.unshift(F2[2])), S2.length && (a2 = S2.join(".") + a2), this.hostname = q2.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > 255 && (this.hostname = ""), g2 && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var L2 = a2.indexOf("#");
  -1 !== L2 && (this.hash = a2.substr(L2), a2 = a2.slice(0, L2));
  var z2 = a2.indexOf("?");
  return -1 !== z2 && (this.search = a2.substr(z2), a2 = a2.slice(0, z2)), a2 && (this.pathname = a2), y$1[s2] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, p$1.prototype.parseHost = function(e2) {
  var r2 = f$1.exec(e2);
  r2 && (":" !== (r2 = r2[0]) && (this.port = r2.substr(1)), e2 = e2.substr(0, e2.length - r2.length)), e2 && (this.hostname = e2);
};
var A$1 = function(e2, r2) {
  if (e2 && e2 instanceof p$1)
    return e2;
  var t2 = new p$1();
  return t2.parse(e2, r2), t2;
};
s$1.encode = a$1, s$1.decode = u$1, s$1.format = function(e2) {
  var r2 = "";
  return r2 += e2.protocol || "", r2 += e2.slashes ? "//" : "", r2 += e2.auth ? e2.auth + "@" : "", e2.hostname && -1 !== e2.hostname.indexOf(":") ? r2 += "[" + e2.hostname + "]" : r2 += e2.hostname || "", r2 += e2.port ? ":" + e2.port : "", r2 += e2.pathname || "", r2 += e2.search || "", r2 += e2.hash || "";
}, s$1.parse = A$1;
var x$1 = {}, D$1 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, w$1 = /[\0-\x1F\x7F-\x9F]/, E$1 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
x$1.Any = D$1, x$1.Cc = w$1, x$1.Cf = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, x$1.P = n$1, x$1.Z = E$1, function(e2) {
  var r2 = Object.prototype.hasOwnProperty;
  function o2(e3, t2) {
    return r2.call(e3, t2);
  }
  function i2(e3) {
    return !(e3 >= 55296 && e3 <= 57343) && (!(e3 >= 64976 && e3 <= 65007) && (65535 != (65535 & e3) && 65534 != (65535 & e3) && (!(e3 >= 0 && e3 <= 8) && (11 !== e3 && (!(e3 >= 14 && e3 <= 31) && (!(e3 >= 127 && e3 <= 159) && !(e3 > 1114111)))))));
  }
  function a2(e3) {
    if (e3 > 65535) {
      var r3 = 55296 + ((e3 -= 65536) >> 10), t2 = 56320 + (1023 & e3);
      return String.fromCharCode(r3, t2);
    }
    return String.fromCharCode(e3);
  }
  var c2 = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, l2 = new RegExp(c2.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi"), u2 = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, p2 = t$1;
  var h2 = /[&<>"]/, f2 = /[&<>"]/g, d2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function m2(e3) {
    return d2[e3];
  }
  var g2 = /[.?*+^$[\]\\(){}|-]/g;
  var _2 = n$1;
  e2.lib = {}, e2.lib.mdurl = s$1, e2.lib.ucmicro = x$1, e2.assign = function(e3) {
    var r3 = Array.prototype.slice.call(arguments, 1);
    return r3.forEach(function(r4) {
      if (r4) {
        if ("object" != typeof r4)
          throw new TypeError(r4 + "must be object");
        Object.keys(r4).forEach(function(t2) {
          e3[t2] = r4[t2];
        });
      }
    }), e3;
  }, e2.isString = function(e3) {
    return "[object String]" === function(e4) {
      return Object.prototype.toString.call(e4);
    }(e3);
  }, e2.has = o2, e2.unescapeMd = function(e3) {
    return e3.indexOf("\\") < 0 ? e3 : e3.replace(c2, "$1");
  }, e2.unescapeAll = function(e3) {
    return e3.indexOf("\\") < 0 && e3.indexOf("&") < 0 ? e3 : e3.replace(l2, function(e4, r3, t2) {
      return r3 || function(e5, r4) {
        var t3 = 0;
        return o2(p2, r4) ? p2[r4] : 35 === r4.charCodeAt(0) && u2.test(r4) && i2(t3 = "x" === r4[1].toLowerCase() ? parseInt(r4.slice(2), 16) : parseInt(r4.slice(1), 10)) ? a2(t3) : e5;
      }(e4, t2);
    });
  }, e2.isValidEntityCode = i2, e2.fromCodePoint = a2, e2.escapeHtml = function(e3) {
    return h2.test(e3) ? e3.replace(f2, m2) : e3;
  }, e2.arrayReplaceAt = function(e3, r3, t2) {
    return [].concat(e3.slice(0, r3), t2, e3.slice(r3 + 1));
  }, e2.isSpace = function(e3) {
    switch (e3) {
      case 9:
      case 32:
        return true;
    }
    return false;
  }, e2.isWhiteSpace = function(e3) {
    if (e3 >= 8192 && e3 <= 8202)
      return true;
    switch (e3) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return true;
    }
    return false;
  }, e2.isMdAsciiPunct = function(e3) {
    switch (e3) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }, e2.isPunctChar = function(e3) {
    return _2.test(e3);
  }, e2.escapeRE = function(e3) {
    return e3.replace(g2, "\\$&");
  }, e2.normalizeReference = function(e3) {
    return e3 = e3.trim().replace(/\s+/g, " "), "Ṿ" === "ẞ".toLowerCase() && (e3 = e3.replace(/ẞ/g, "ß")), e3.toLowerCase().toUpperCase();
  };
}(r$1);
var q$1 = {}, S$1 = r$1.unescapeAll, F$1 = r$1.unescapeAll;
q$1.parseLinkLabel = function(e2, r2, t2) {
  var n2, s2, o2, i2, a2 = -1, c2 = e2.posMax, l2 = e2.pos;
  for (e2.pos = r2 + 1, n2 = 1; e2.pos < c2; ) {
    if (93 === (o2 = e2.src.charCodeAt(e2.pos)) && 0 === --n2) {
      s2 = true;
      break;
    }
    if (i2 = e2.pos, e2.md.inline.skipToken(e2), 91 === o2) {
      if (i2 === e2.pos - 1)
        n2++;
      else if (t2)
        return e2.pos = l2, -1;
    }
  }
  return s2 && (a2 = e2.pos), e2.pos = l2, a2;
}, q$1.parseLinkDestination = function(e2, r2, t2) {
  var n2, s2, o2 = r2, i2 = { ok: false, pos: 0, lines: 0, str: "" };
  if (60 === e2.charCodeAt(r2)) {
    for (r2++; r2 < t2; ) {
      if (10 === (n2 = e2.charCodeAt(r2)))
        return i2;
      if (60 === n2)
        return i2;
      if (62 === n2)
        return i2.pos = r2 + 1, i2.str = S$1(e2.slice(o2 + 1, r2)), i2.ok = true, i2;
      92 === n2 && r2 + 1 < t2 ? r2 += 2 : r2++;
    }
    return i2;
  }
  for (s2 = 0; r2 < t2 && 32 !== (n2 = e2.charCodeAt(r2)) && !(n2 < 32 || 127 === n2); )
    if (92 === n2 && r2 + 1 < t2) {
      if (32 === e2.charCodeAt(r2 + 1))
        break;
      r2 += 2;
    } else {
      if (40 === n2 && ++s2 > 32)
        return i2;
      if (41 === n2) {
        if (0 === s2)
          break;
        s2--;
      }
      r2++;
    }
  return o2 === r2 || 0 !== s2 || (i2.str = S$1(e2.slice(o2, r2)), i2.lines = 0, i2.pos = r2, i2.ok = true), i2;
}, q$1.parseLinkTitle = function(e2, r2, t2) {
  var n2, s2, o2 = 0, i2 = r2, a2 = { ok: false, pos: 0, lines: 0, str: "" };
  if (r2 >= t2)
    return a2;
  if (34 !== (s2 = e2.charCodeAt(r2)) && 39 !== s2 && 40 !== s2)
    return a2;
  for (r2++, 40 === s2 && (s2 = 41); r2 < t2; ) {
    if ((n2 = e2.charCodeAt(r2)) === s2)
      return a2.pos = r2 + 1, a2.lines = o2, a2.str = F$1(e2.slice(i2 + 1, r2)), a2.ok = true, a2;
    if (40 === n2 && 41 === s2)
      return a2;
    10 === n2 ? o2++ : 92 === n2 && r2 + 1 < t2 && (r2++, 10 === e2.charCodeAt(r2) && o2++), r2++;
  }
  return a2;
};
var L$1 = r$1.assign, z$1 = r$1.unescapeAll, T$1 = r$1.escapeHtml, I$1 = {};
function M$1() {
  this.rules = L$1({}, I$1);
}
I$1.code_inline = function(e2, r2, t2, n2, s2) {
  var o2 = e2[r2];
  return "<code" + s2.renderAttrs(o2) + ">" + T$1(e2[r2].content) + "</code>";
}, I$1.code_block = function(e2, r2, t2, n2, s2) {
  var o2 = e2[r2];
  return "<pre" + s2.renderAttrs(o2) + "><code>" + T$1(e2[r2].content) + "</code></pre>\n";
}, I$1.fence = function(e2, r2, t2, n2, s2) {
  var o2, i2, a2, c2, l2, u2 = e2[r2], p2 = u2.info ? z$1(u2.info).trim() : "", h2 = "", f2 = "";
  return p2 && (h2 = (a2 = p2.split(/(\s+)/g))[0], f2 = a2.slice(2).join("")), 0 === (o2 = t2.highlight && t2.highlight(u2.content, h2, f2) || T$1(u2.content)).indexOf("<pre") ? o2 + "\n" : p2 ? (i2 = u2.attrIndex("class"), c2 = u2.attrs ? u2.attrs.slice() : [], i2 < 0 ? c2.push(["class", t2.langPrefix + h2]) : (c2[i2] = c2[i2].slice(), c2[i2][1] += " " + t2.langPrefix + h2), l2 = { attrs: c2 }, "<pre><code" + s2.renderAttrs(l2) + ">" + o2 + "</code></pre>\n") : "<pre><code" + s2.renderAttrs(u2) + ">" + o2 + "</code></pre>\n";
}, I$1.image = function(e2, r2, t2, n2, s2) {
  var o2 = e2[r2];
  return o2.attrs[o2.attrIndex("alt")][1] = s2.renderInlineAsText(o2.children, t2, n2), s2.renderToken(e2, r2, t2);
}, I$1.hardbreak = function(e2, r2, t2) {
  return t2.xhtmlOut ? "<br />\n" : "<br>\n";
}, I$1.softbreak = function(e2, r2, t2) {
  return t2.breaks ? t2.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, I$1.text = function(e2, r2) {
  return T$1(e2[r2].content);
}, I$1.html_block = function(e2, r2) {
  return e2[r2].content;
}, I$1.html_inline = function(e2, r2) {
  return e2[r2].content;
}, M$1.prototype.renderAttrs = function(e2) {
  var r2, t2, n2;
  if (!e2.attrs)
    return "";
  for (n2 = "", r2 = 0, t2 = e2.attrs.length; r2 < t2; r2++)
    n2 += " " + T$1(e2.attrs[r2][0]) + '="' + T$1(e2.attrs[r2][1]) + '"';
  return n2;
}, M$1.prototype.renderToken = function(e2, r2, t2) {
  var n2, s2 = "", o2 = false, i2 = e2[r2];
  return i2.hidden ? "" : (i2.block && -1 !== i2.nesting && r2 && e2[r2 - 1].hidden && (s2 += "\n"), s2 += (-1 === i2.nesting ? "</" : "<") + i2.tag, s2 += this.renderAttrs(i2), 0 === i2.nesting && t2.xhtmlOut && (s2 += " /"), i2.block && (o2 = true, 1 === i2.nesting && r2 + 1 < e2.length && ("inline" === (n2 = e2[r2 + 1]).type || n2.hidden || -1 === n2.nesting && n2.tag === i2.tag) && (o2 = false)), s2 += o2 ? ">\n" : ">");
}, M$1.prototype.renderInline = function(e2, r2, t2) {
  for (var n2, s2 = "", o2 = this.rules, i2 = 0, a2 = e2.length; i2 < a2; i2++)
    void 0 !== o2[n2 = e2[i2].type] ? s2 += o2[n2](e2, i2, r2, t2, this) : s2 += this.renderToken(e2, i2, r2);
  return s2;
}, M$1.prototype.renderInlineAsText = function(e2, r2, t2) {
  for (var n2 = "", s2 = 0, o2 = e2.length; s2 < o2; s2++)
    "text" === e2[s2].type ? n2 += e2[s2].content : "image" === e2[s2].type ? n2 += this.renderInlineAsText(e2[s2].children, r2, t2) : "softbreak" === e2[s2].type && (n2 += "\n");
  return n2;
}, M$1.prototype.render = function(e2, r2, t2) {
  var n2, s2, o2, i2 = "", a2 = this.rules;
  for (n2 = 0, s2 = e2.length; n2 < s2; n2++)
    "inline" === (o2 = e2[n2].type) ? i2 += this.renderInline(e2[n2].children, r2, t2) : void 0 !== a2[o2] ? i2 += a2[e2[n2].type](e2, n2, r2, t2, this) : i2 += this.renderToken(e2, n2, r2, t2);
  return i2;
};
var R$1 = M$1;
function B$1() {
  this.__rules__ = [], this.__cache__ = null;
}
B$1.prototype.__find__ = function(e2) {
  for (var r2 = 0; r2 < this.__rules__.length; r2++)
    if (this.__rules__[r2].name === e2)
      return r2;
  return -1;
}, B$1.prototype.__compile__ = function() {
  var e2 = this, r2 = [""];
  e2.__rules__.forEach(function(e3) {
    e3.enabled && e3.alt.forEach(function(e4) {
      r2.indexOf(e4) < 0 && r2.push(e4);
    });
  }), e2.__cache__ = {}, r2.forEach(function(r3) {
    e2.__cache__[r3] = [], e2.__rules__.forEach(function(t2) {
      t2.enabled && (r3 && t2.alt.indexOf(r3) < 0 || e2.__cache__[r3].push(t2.fn));
    });
  });
}, B$1.prototype.at = function(e2, r2, t2) {
  var n2 = this.__find__(e2), s2 = t2 || {};
  if (-1 === n2)
    throw new Error("Parser rule not found: " + e2);
  this.__rules__[n2].fn = r2, this.__rules__[n2].alt = s2.alt || [], this.__cache__ = null;
}, B$1.prototype.before = function(e2, r2, t2, n2) {
  var s2 = this.__find__(e2), o2 = n2 || {};
  if (-1 === s2)
    throw new Error("Parser rule not found: " + e2);
  this.__rules__.splice(s2, 0, { name: r2, enabled: true, fn: t2, alt: o2.alt || [] }), this.__cache__ = null;
}, B$1.prototype.after = function(e2, r2, t2, n2) {
  var s2 = this.__find__(e2), o2 = n2 || {};
  if (-1 === s2)
    throw new Error("Parser rule not found: " + e2);
  this.__rules__.splice(s2 + 1, 0, { name: r2, enabled: true, fn: t2, alt: o2.alt || [] }), this.__cache__ = null;
}, B$1.prototype.push = function(e2, r2, t2) {
  var n2 = t2 || {};
  this.__rules__.push({ name: e2, enabled: true, fn: r2, alt: n2.alt || [] }), this.__cache__ = null;
}, B$1.prototype.enable = function(e2, r2) {
  Array.isArray(e2) || (e2 = [e2]);
  var t2 = [];
  return e2.forEach(function(e3) {
    var n2 = this.__find__(e3);
    if (n2 < 0) {
      if (r2)
        return;
      throw new Error("Rules manager: invalid rule name " + e3);
    }
    this.__rules__[n2].enabled = true, t2.push(e3);
  }, this), this.__cache__ = null, t2;
}, B$1.prototype.enableOnly = function(e2, r2) {
  Array.isArray(e2) || (e2 = [e2]), this.__rules__.forEach(function(e3) {
    e3.enabled = false;
  }), this.enable(e2, r2);
}, B$1.prototype.disable = function(e2, r2) {
  Array.isArray(e2) || (e2 = [e2]);
  var t2 = [];
  return e2.forEach(function(e3) {
    var n2 = this.__find__(e3);
    if (n2 < 0) {
      if (r2)
        return;
      throw new Error("Rules manager: invalid rule name " + e3);
    }
    this.__rules__[n2].enabled = false, t2.push(e3);
  }, this), this.__cache__ = null, t2;
}, B$1.prototype.getRules = function(e2) {
  return null === this.__cache__ && this.__compile__(), this.__cache__[e2] || [];
};
var N$1 = B$1, O$1 = /\r\n?|\n/g, P$1 = /\0/g, j$1 = r$1.arrayReplaceAt;
function U$1(e2) {
  return /^<\/a\s*>/i.test(e2);
}
var V$1 = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, Z$1 = /\((c|tm|r)\)/i, $$1 = /\((c|tm|r)\)/gi, G$1 = { c: "©", r: "®", tm: "™" };
function H$1(e2, r2) {
  return G$1[r2.toLowerCase()];
}
function J$1(e2) {
  var r2, t2, n2 = 0;
  for (r2 = e2.length - 1; r2 >= 0; r2--)
    "text" !== (t2 = e2[r2]).type || n2 || (t2.content = t2.content.replace($$1, H$1)), "link_open" === t2.type && "auto" === t2.info && n2--, "link_close" === t2.type && "auto" === t2.info && n2++;
}
function W$1(e2) {
  var r2, t2, n2 = 0;
  for (r2 = e2.length - 1; r2 >= 0; r2--)
    "text" !== (t2 = e2[r2]).type || n2 || V$1.test(t2.content) && (t2.content = t2.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), "link_open" === t2.type && "auto" === t2.info && n2--, "link_close" === t2.type && "auto" === t2.info && n2++;
}
var Y$1 = r$1.isWhiteSpace, K$1 = r$1.isPunctChar, Q$1 = r$1.isMdAsciiPunct, X$1 = /['"]/, ee$1 = /['"]/g;
function re$1(e2, r2, t2) {
  return e2.slice(0, r2) + t2 + e2.slice(r2 + 1);
}
function te$1(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2;
  for (v2 = [], t2 = 0; t2 < e2.length; t2++) {
    for (n2 = e2[t2], c2 = e2[t2].level, k2 = v2.length - 1; k2 >= 0 && !(v2[k2].level <= c2); k2--)
      ;
    if (v2.length = k2 + 1, "text" === n2.type) {
      i2 = 0, a2 = (s2 = n2.content).length;
      e:
        for (; i2 < a2 && (ee$1.lastIndex = i2, o2 = ee$1.exec(s2)); ) {
          if (g2 = _2 = true, i2 = o2.index + 1, b2 = "'" === o2[0], u2 = 32, o2.index - 1 >= 0)
            u2 = s2.charCodeAt(o2.index - 1);
          else
            for (k2 = t2 - 1; k2 >= 0 && ("softbreak" !== e2[k2].type && "hardbreak" !== e2[k2].type); k2--)
              if (e2[k2].content) {
                u2 = e2[k2].content.charCodeAt(e2[k2].content.length - 1);
                break;
              }
          if (p2 = 32, i2 < a2)
            p2 = s2.charCodeAt(i2);
          else
            for (k2 = t2 + 1; k2 < e2.length && ("softbreak" !== e2[k2].type && "hardbreak" !== e2[k2].type); k2++)
              if (e2[k2].content) {
                p2 = e2[k2].content.charCodeAt(0);
                break;
              }
          if (h2 = Q$1(u2) || K$1(String.fromCharCode(u2)), f2 = Q$1(p2) || K$1(String.fromCharCode(p2)), d2 = Y$1(u2), (m2 = Y$1(p2)) ? g2 = false : f2 && (d2 || h2 || (g2 = false)), d2 ? _2 = false : h2 && (m2 || f2 || (_2 = false)), 34 === p2 && '"' === o2[0] && u2 >= 48 && u2 <= 57 && (_2 = g2 = false), g2 && _2 && (g2 = h2, _2 = f2), g2 || _2) {
            if (_2) {
              for (k2 = v2.length - 1; k2 >= 0 && (l2 = v2[k2], !(v2[k2].level < c2)); k2--)
                if (l2.single === b2 && v2[k2].level === c2) {
                  l2 = v2[k2], b2 ? (C2 = r2.md.options.quotes[2], y2 = r2.md.options.quotes[3]) : (C2 = r2.md.options.quotes[0], y2 = r2.md.options.quotes[1]), n2.content = re$1(n2.content, o2.index, y2), e2[l2.token].content = re$1(e2[l2.token].content, l2.pos, C2), i2 += y2.length - 1, l2.token === t2 && (i2 += C2.length - 1), a2 = (s2 = n2.content).length, v2.length = k2;
                  continue e;
                }
            }
            g2 ? v2.push({ token: t2, pos: o2.index, single: b2, level: c2 }) : _2 && b2 && (n2.content = re$1(n2.content, o2.index, "’"));
          } else
            b2 && (n2.content = re$1(n2.content, o2.index, "’"));
        }
    }
  }
}
function ne$1(e2, r2, t2) {
  this.type = e2, this.tag = r2, this.attrs = null, this.map = null, this.nesting = t2, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = false, this.hidden = false;
}
ne$1.prototype.attrIndex = function(e2) {
  var r2, t2, n2;
  if (!this.attrs)
    return -1;
  for (t2 = 0, n2 = (r2 = this.attrs).length; t2 < n2; t2++)
    if (r2[t2][0] === e2)
      return t2;
  return -1;
}, ne$1.prototype.attrPush = function(e2) {
  this.attrs ? this.attrs.push(e2) : this.attrs = [e2];
}, ne$1.prototype.attrSet = function(e2, r2) {
  var t2 = this.attrIndex(e2), n2 = [e2, r2];
  t2 < 0 ? this.attrPush(n2) : this.attrs[t2] = n2;
}, ne$1.prototype.attrGet = function(e2) {
  var r2 = this.attrIndex(e2), t2 = null;
  return r2 >= 0 && (t2 = this.attrs[r2][1]), t2;
}, ne$1.prototype.attrJoin = function(e2, r2) {
  var t2 = this.attrIndex(e2);
  t2 < 0 ? this.attrPush([e2, r2]) : this.attrs[t2][1] = this.attrs[t2][1] + " " + r2;
};
var se$1 = ne$1, oe$1 = se$1;
function ie$1(e2, r2, t2) {
  this.src = e2, this.env = t2, this.tokens = [], this.inlineMode = false, this.md = r2;
}
ie$1.prototype.Token = oe$1;
var ae$1 = ie$1, ce$1 = N$1, le$1 = [["normalize", function(e2) {
  var r2;
  r2 = (r2 = e2.src.replace(O$1, "\n")).replace(P$1, "�"), e2.src = r2;
}], ["block", function(e2) {
  var r2;
  e2.inlineMode ? ((r2 = new e2.Token("inline", "", 0)).content = e2.src, r2.map = [0, 1], r2.children = [], e2.tokens.push(r2)) : e2.md.block.parse(e2.src, e2.md, e2.env, e2.tokens);
}], ["inline", function(e2) {
  var r2, t2, n2, s2 = e2.tokens;
  for (t2 = 0, n2 = s2.length; t2 < n2; t2++)
    "inline" === (r2 = s2[t2]).type && e2.md.inline.parse(r2.content, e2.md, e2.env, r2.children);
}], ["linkify", function(e2) {
  var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2 = e2.tokens;
  if (e2.md.options.linkify) {
    for (t2 = 0, n2 = b2.length; t2 < n2; t2++)
      if ("inline" === b2[t2].type && e2.md.linkify.pretest(b2[t2].content))
        for (f2 = 0, r2 = (s2 = b2[t2].children).length - 1; r2 >= 0; r2--)
          if ("link_close" !== (i2 = s2[r2]).type) {
            if ("html_inline" === i2.type && (k2 = i2.content, /^<a[>\s]/i.test(k2) && f2 > 0 && f2--, U$1(i2.content) && f2++), !(f2 > 0) && "text" === i2.type && e2.md.linkify.test(i2.content)) {
              for (l2 = i2.content, _2 = e2.md.linkify.match(l2), a2 = [], h2 = i2.level, p2 = 0, _2.length > 0 && 0 === _2[0].index && r2 > 0 && "text_special" === s2[r2 - 1].type && (_2 = _2.slice(1)), c2 = 0; c2 < _2.length; c2++)
                d2 = _2[c2].url, m2 = e2.md.normalizeLink(d2), e2.md.validateLink(m2) && (g2 = _2[c2].text, g2 = _2[c2].schema ? "mailto:" !== _2[c2].schema || /^mailto:/i.test(g2) ? e2.md.normalizeLinkText(g2) : e2.md.normalizeLinkText("mailto:" + g2).replace(/^mailto:/, "") : e2.md.normalizeLinkText("http://" + g2).replace(/^http:\/\//, ""), (u2 = _2[c2].index) > p2 && ((o2 = new e2.Token("text", "", 0)).content = l2.slice(p2, u2), o2.level = h2, a2.push(o2)), (o2 = new e2.Token("link_open", "a", 1)).attrs = [["href", m2]], o2.level = h2++, o2.markup = "linkify", o2.info = "auto", a2.push(o2), (o2 = new e2.Token("text", "", 0)).content = g2, o2.level = h2, a2.push(o2), (o2 = new e2.Token("link_close", "a", -1)).level = --h2, o2.markup = "linkify", o2.info = "auto", a2.push(o2), p2 = _2[c2].lastIndex);
              p2 < l2.length && ((o2 = new e2.Token("text", "", 0)).content = l2.slice(p2), o2.level = h2, a2.push(o2)), b2[t2].children = s2 = j$1(s2, r2, a2);
            }
          } else
            for (r2--; s2[r2].level !== i2.level && "link_open" !== s2[r2].type; )
              r2--;
  }
}], ["replacements", function(e2) {
  var r2;
  if (e2.md.options.typographer)
    for (r2 = e2.tokens.length - 1; r2 >= 0; r2--)
      "inline" === e2.tokens[r2].type && (Z$1.test(e2.tokens[r2].content) && J$1(e2.tokens[r2].children), V$1.test(e2.tokens[r2].content) && W$1(e2.tokens[r2].children));
}], ["smartquotes", function(e2) {
  var r2;
  if (e2.md.options.typographer)
    for (r2 = e2.tokens.length - 1; r2 >= 0; r2--)
      "inline" === e2.tokens[r2].type && X$1.test(e2.tokens[r2].content) && te$1(e2.tokens[r2].children, e2);
}], ["text_join", function(e2) {
  var r2, t2, n2, s2, o2, i2, a2 = e2.tokens;
  for (r2 = 0, t2 = a2.length; r2 < t2; r2++)
    if ("inline" === a2[r2].type) {
      for (o2 = (n2 = a2[r2].children).length, s2 = 0; s2 < o2; s2++)
        "text_special" === n2[s2].type && (n2[s2].type = "text");
      for (s2 = i2 = 0; s2 < o2; s2++)
        "text" === n2[s2].type && s2 + 1 < o2 && "text" === n2[s2 + 1].type ? n2[s2 + 1].content = n2[s2].content + n2[s2 + 1].content : (s2 !== i2 && (n2[i2] = n2[s2]), i2++);
      s2 !== i2 && (n2.length = i2);
    }
}]];
function ue$1() {
  this.ruler = new ce$1();
  for (var e2 = 0; e2 < le$1.length; e2++)
    this.ruler.push(le$1[e2][0], le$1[e2][1]);
}
ue$1.prototype.process = function(e2) {
  var r2, t2, n2;
  for (r2 = 0, t2 = (n2 = this.ruler.getRules("")).length; r2 < t2; r2++)
    n2[r2](e2);
}, ue$1.prototype.State = ae$1;
var pe$1 = ue$1, he$1 = r$1.isSpace;
function fe$1(e2, r2) {
  var t2 = e2.bMarks[r2] + e2.tShift[r2], n2 = e2.eMarks[r2];
  return e2.src.slice(t2, n2);
}
function de$1(e2) {
  var r2, t2 = [], n2 = 0, s2 = e2.length, o2 = false, i2 = 0, a2 = "";
  for (r2 = e2.charCodeAt(n2); n2 < s2; )
    124 === r2 && (o2 ? (a2 += e2.substring(i2, n2 - 1), i2 = n2) : (t2.push(a2 + e2.substring(i2, n2)), a2 = "", i2 = n2 + 1)), o2 = 92 === r2, n2++, r2 = e2.charCodeAt(n2);
  return t2.push(a2 + e2.substring(i2)), t2;
}
var me$1 = r$1.isSpace, ge$1 = r$1.isSpace, _e$1 = r$1.isSpace;
function ke$1(e2, r2) {
  var t2, n2, s2, o2;
  return n2 = e2.bMarks[r2] + e2.tShift[r2], s2 = e2.eMarks[r2], 42 !== (t2 = e2.src.charCodeAt(n2++)) && 45 !== t2 && 43 !== t2 || n2 < s2 && (o2 = e2.src.charCodeAt(n2), !_e$1(o2)) ? -1 : n2;
}
function be$1(e2, r2) {
  var t2, n2 = e2.bMarks[r2] + e2.tShift[r2], s2 = n2, o2 = e2.eMarks[r2];
  if (s2 + 1 >= o2)
    return -1;
  if ((t2 = e2.src.charCodeAt(s2++)) < 48 || t2 > 57)
    return -1;
  for (; ; ) {
    if (s2 >= o2)
      return -1;
    if (!((t2 = e2.src.charCodeAt(s2++)) >= 48 && t2 <= 57)) {
      if (41 === t2 || 46 === t2)
        break;
      return -1;
    }
    if (s2 - n2 >= 10)
      return -1;
  }
  return s2 < o2 && (t2 = e2.src.charCodeAt(s2), !_e$1(t2)) ? -1 : s2;
}
var ve$1 = r$1.normalizeReference, Ce$1 = r$1.isSpace, ye$1 = {}, Ae$1 = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`, xe$1 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", De$1 = new RegExp("^(?:" + Ae$1 + "|" + xe$1 + "|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?][\\s\\S]*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"), we$1 = new RegExp("^(?:" + Ae$1 + "|" + xe$1 + ")");
ye$1.HTML_TAG_RE = De$1, ye$1.HTML_OPEN_CLOSE_TAG_RE = we$1;
var Ee$1 = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section", "source", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], qe = ye$1.HTML_OPEN_CLOSE_TAG_RE, Se$1 = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp("^</?(" + Ee$1.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true], [new RegExp(qe.source + "\\s*$"), /^$/, false]], Fe = r$1.isSpace, Le$1 = se$1, ze = r$1.isSpace;
function Te$1(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2;
  for (this.src = e2, this.md = r2, this.env = t2, this.tokens = n2, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = false, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", p2 = false, i2 = a2 = l2 = u2 = 0, c2 = (o2 = this.src).length; a2 < c2; a2++) {
    if (s2 = o2.charCodeAt(a2), !p2) {
      if (ze(s2)) {
        l2++, 9 === s2 ? u2 += 4 - u2 % 4 : u2++;
        continue;
      }
      p2 = true;
    }
    10 !== s2 && a2 !== c2 - 1 || (10 !== s2 && a2++, this.bMarks.push(i2), this.eMarks.push(a2), this.tShift.push(l2), this.sCount.push(u2), this.bsCount.push(0), p2 = false, l2 = 0, u2 = 0, i2 = a2 + 1);
  }
  this.bMarks.push(o2.length), this.eMarks.push(o2.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Te$1.prototype.push = function(e2, r2, t2) {
  var n2 = new Le$1(e2, r2, t2);
  return n2.block = true, t2 < 0 && this.level--, n2.level = this.level, t2 > 0 && this.level++, this.tokens.push(n2), n2;
}, Te$1.prototype.isEmpty = function(e2) {
  return this.bMarks[e2] + this.tShift[e2] >= this.eMarks[e2];
}, Te$1.prototype.skipEmptyLines = function(e2) {
  for (var r2 = this.lineMax; e2 < r2 && !(this.bMarks[e2] + this.tShift[e2] < this.eMarks[e2]); e2++)
    ;
  return e2;
}, Te$1.prototype.skipSpaces = function(e2) {
  for (var r2, t2 = this.src.length; e2 < t2 && (r2 = this.src.charCodeAt(e2), ze(r2)); e2++)
    ;
  return e2;
}, Te$1.prototype.skipSpacesBack = function(e2, r2) {
  if (e2 <= r2)
    return e2;
  for (; e2 > r2; )
    if (!ze(this.src.charCodeAt(--e2)))
      return e2 + 1;
  return e2;
}, Te$1.prototype.skipChars = function(e2, r2) {
  for (var t2 = this.src.length; e2 < t2 && this.src.charCodeAt(e2) === r2; e2++)
    ;
  return e2;
}, Te$1.prototype.skipCharsBack = function(e2, r2, t2) {
  if (e2 <= t2)
    return e2;
  for (; e2 > t2; )
    if (r2 !== this.src.charCodeAt(--e2))
      return e2 + 1;
  return e2;
}, Te$1.prototype.getLines = function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2 = e2;
  if (e2 >= r2)
    return "";
  for (l2 = new Array(r2 - e2), s2 = 0; p2 < r2; p2++, s2++) {
    for (o2 = 0, u2 = a2 = this.bMarks[p2], c2 = p2 + 1 < r2 || n2 ? this.eMarks[p2] + 1 : this.eMarks[p2]; a2 < c2 && o2 < t2; ) {
      if (i2 = this.src.charCodeAt(a2), ze(i2))
        9 === i2 ? o2 += 4 - (o2 + this.bsCount[p2]) % 4 : o2++;
      else {
        if (!(a2 - u2 < this.tShift[p2]))
          break;
        o2++;
      }
      a2++;
    }
    l2[s2] = o2 > t2 ? new Array(o2 - t2 + 1).join(" ") + this.src.slice(a2, c2) : this.src.slice(a2, c2);
  }
  return l2.join("");
}, Te$1.prototype.Token = Le$1;
var Ie$1 = Te$1, Me$1 = N$1, Re$1 = [["table", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2;
  if (r2 + 2 > t2)
    return false;
  if (l2 = r2 + 1, e2.sCount[l2] < e2.blkIndent)
    return false;
  if (e2.sCount[l2] - e2.blkIndent >= 4)
    return false;
  if ((i2 = e2.bMarks[l2] + e2.tShift[l2]) >= e2.eMarks[l2])
    return false;
  if (124 !== (v2 = e2.src.charCodeAt(i2++)) && 45 !== v2 && 58 !== v2)
    return false;
  if (i2 >= e2.eMarks[l2])
    return false;
  if (124 !== (C2 = e2.src.charCodeAt(i2++)) && 45 !== C2 && 58 !== C2 && !he$1(C2))
    return false;
  if (45 === v2 && he$1(C2))
    return false;
  for (; i2 < e2.eMarks[l2]; ) {
    if (124 !== (s2 = e2.src.charCodeAt(i2)) && 45 !== s2 && 58 !== s2 && !he$1(s2))
      return false;
    i2++;
  }
  for (u2 = (o2 = fe$1(e2, r2 + 1)).split("|"), f2 = [], a2 = 0; a2 < u2.length; a2++) {
    if (!(d2 = u2[a2].trim())) {
      if (0 === a2 || a2 === u2.length - 1)
        continue;
      return false;
    }
    if (!/^:?-+:?$/.test(d2))
      return false;
    58 === d2.charCodeAt(d2.length - 1) ? f2.push(58 === d2.charCodeAt(0) ? "center" : "right") : 58 === d2.charCodeAt(0) ? f2.push("left") : f2.push("");
  }
  if (-1 === (o2 = fe$1(e2, r2).trim()).indexOf("|"))
    return false;
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if ((u2 = de$1(o2)).length && "" === u2[0] && u2.shift(), u2.length && "" === u2[u2.length - 1] && u2.pop(), 0 === (p2 = u2.length) || p2 !== f2.length)
    return false;
  if (n2)
    return true;
  for (_2 = e2.parentType, e2.parentType = "table", b2 = e2.md.block.ruler.getRules("blockquote"), (h2 = e2.push("table_open", "table", 1)).map = m2 = [r2, 0], (h2 = e2.push("thead_open", "thead", 1)).map = [r2, r2 + 1], (h2 = e2.push("tr_open", "tr", 1)).map = [r2, r2 + 1], a2 = 0; a2 < u2.length; a2++)
    h2 = e2.push("th_open", "th", 1), f2[a2] && (h2.attrs = [["style", "text-align:" + f2[a2]]]), (h2 = e2.push("inline", "", 0)).content = u2[a2].trim(), h2.children = [], h2 = e2.push("th_close", "th", -1);
  for (h2 = e2.push("tr_close", "tr", -1), h2 = e2.push("thead_close", "thead", -1), l2 = r2 + 2; l2 < t2 && !(e2.sCount[l2] < e2.blkIndent); l2++) {
    for (k2 = false, a2 = 0, c2 = b2.length; a2 < c2; a2++)
      if (b2[a2](e2, l2, t2, true)) {
        k2 = true;
        break;
      }
    if (k2)
      break;
    if (!(o2 = fe$1(e2, l2).trim()))
      break;
    if (e2.sCount[l2] - e2.blkIndent >= 4)
      break;
    for ((u2 = de$1(o2)).length && "" === u2[0] && u2.shift(), u2.length && "" === u2[u2.length - 1] && u2.pop(), l2 === r2 + 2 && ((h2 = e2.push("tbody_open", "tbody", 1)).map = g2 = [r2 + 2, 0]), (h2 = e2.push("tr_open", "tr", 1)).map = [l2, l2 + 1], a2 = 0; a2 < p2; a2++)
      h2 = e2.push("td_open", "td", 1), f2[a2] && (h2.attrs = [["style", "text-align:" + f2[a2]]]), (h2 = e2.push("inline", "", 0)).content = u2[a2] ? u2[a2].trim() : "", h2.children = [], h2 = e2.push("td_close", "td", -1);
    h2 = e2.push("tr_close", "tr", -1);
  }
  return g2 && (h2 = e2.push("tbody_close", "tbody", -1), g2[1] = l2), h2 = e2.push("table_close", "table", -1), m2[1] = l2, e2.parentType = _2, e2.line = l2, true;
}, ["paragraph", "reference"]], ["code", function(e2, r2, t2) {
  var n2, s2, o2;
  if (e2.sCount[r2] - e2.blkIndent < 4)
    return false;
  for (s2 = n2 = r2 + 1; n2 < t2; )
    if (e2.isEmpty(n2))
      n2++;
    else {
      if (!(e2.sCount[n2] - e2.blkIndent >= 4))
        break;
      s2 = ++n2;
    }
  return e2.line = s2, (o2 = e2.push("code_block", "code", 0)).content = e2.getLines(r2, s2, 4 + e2.blkIndent, false) + "\n", o2.map = [r2, e2.line], true;
}], ["fence", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2 = false, h2 = e2.bMarks[r2] + e2.tShift[r2], f2 = e2.eMarks[r2];
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (h2 + 3 > f2)
    return false;
  if (126 !== (s2 = e2.src.charCodeAt(h2)) && 96 !== s2)
    return false;
  if (c2 = h2, (o2 = (h2 = e2.skipChars(h2, s2)) - c2) < 3)
    return false;
  if (u2 = e2.src.slice(c2, h2), i2 = e2.src.slice(h2, f2), 96 === s2 && i2.indexOf(String.fromCharCode(s2)) >= 0)
    return false;
  if (n2)
    return true;
  for (a2 = r2; !(++a2 >= t2) && !((h2 = c2 = e2.bMarks[a2] + e2.tShift[a2]) < (f2 = e2.eMarks[a2]) && e2.sCount[a2] < e2.blkIndent); )
    if (e2.src.charCodeAt(h2) === s2 && !(e2.sCount[a2] - e2.blkIndent >= 4 || (h2 = e2.skipChars(h2, s2)) - c2 < o2 || (h2 = e2.skipSpaces(h2)) < f2)) {
      p2 = true;
      break;
    }
  return o2 = e2.sCount[r2], e2.line = a2 + (p2 ? 1 : 0), (l2 = e2.push("fence", "code", 0)).info = i2, l2.content = e2.getLines(r2 + 1, a2, o2, true), l2.markup = u2, l2.map = [r2, e2.line], true;
}, ["paragraph", "reference", "blockquote", "list"]], ["blockquote", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2, A2, x2 = e2.lineMax, D2 = e2.bMarks[r2] + e2.tShift[r2], w2 = e2.eMarks[r2];
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (62 !== e2.src.charCodeAt(D2++))
    return false;
  if (n2)
    return true;
  for (a2 = h2 = e2.sCount[r2] + 1, 32 === e2.src.charCodeAt(D2) ? (D2++, a2++, h2++, s2 = false, b2 = true) : 9 === e2.src.charCodeAt(D2) ? (b2 = true, (e2.bsCount[r2] + h2) % 4 == 3 ? (D2++, a2++, h2++, s2 = false) : s2 = true) : b2 = false, f2 = [e2.bMarks[r2]], e2.bMarks[r2] = D2; D2 < w2 && (o2 = e2.src.charCodeAt(D2), me$1(o2)); )
    9 === o2 ? h2 += 4 - (h2 + e2.bsCount[r2] + (s2 ? 1 : 0)) % 4 : h2++, D2++;
  for (d2 = [e2.bsCount[r2]], e2.bsCount[r2] = e2.sCount[r2] + 1 + (b2 ? 1 : 0), l2 = D2 >= w2, _2 = [e2.sCount[r2]], e2.sCount[r2] = h2 - a2, k2 = [e2.tShift[r2]], e2.tShift[r2] = D2 - e2.bMarks[r2], C2 = e2.md.block.ruler.getRules("blockquote"), g2 = e2.parentType, e2.parentType = "blockquote", p2 = r2 + 1; p2 < t2 && (A2 = e2.sCount[p2] < e2.blkIndent, !((D2 = e2.bMarks[p2] + e2.tShift[p2]) >= (w2 = e2.eMarks[p2]))); p2++)
    if (62 !== e2.src.charCodeAt(D2++) || A2) {
      if (l2)
        break;
      for (v2 = false, i2 = 0, c2 = C2.length; i2 < c2; i2++)
        if (C2[i2](e2, p2, t2, true)) {
          v2 = true;
          break;
        }
      if (v2) {
        e2.lineMax = p2, 0 !== e2.blkIndent && (f2.push(e2.bMarks[p2]), d2.push(e2.bsCount[p2]), k2.push(e2.tShift[p2]), _2.push(e2.sCount[p2]), e2.sCount[p2] -= e2.blkIndent);
        break;
      }
      f2.push(e2.bMarks[p2]), d2.push(e2.bsCount[p2]), k2.push(e2.tShift[p2]), _2.push(e2.sCount[p2]), e2.sCount[p2] = -1;
    } else {
      for (a2 = h2 = e2.sCount[p2] + 1, 32 === e2.src.charCodeAt(D2) ? (D2++, a2++, h2++, s2 = false, b2 = true) : 9 === e2.src.charCodeAt(D2) ? (b2 = true, (e2.bsCount[p2] + h2) % 4 == 3 ? (D2++, a2++, h2++, s2 = false) : s2 = true) : b2 = false, f2.push(e2.bMarks[p2]), e2.bMarks[p2] = D2; D2 < w2 && (o2 = e2.src.charCodeAt(D2), me$1(o2)); )
        9 === o2 ? h2 += 4 - (h2 + e2.bsCount[p2] + (s2 ? 1 : 0)) % 4 : h2++, D2++;
      l2 = D2 >= w2, d2.push(e2.bsCount[p2]), e2.bsCount[p2] = e2.sCount[p2] + 1 + (b2 ? 1 : 0), _2.push(e2.sCount[p2]), e2.sCount[p2] = h2 - a2, k2.push(e2.tShift[p2]), e2.tShift[p2] = D2 - e2.bMarks[p2];
    }
  for (m2 = e2.blkIndent, e2.blkIndent = 0, (y2 = e2.push("blockquote_open", "blockquote", 1)).markup = ">", y2.map = u2 = [r2, 0], e2.md.block.tokenize(e2, r2, p2), (y2 = e2.push("blockquote_close", "blockquote", -1)).markup = ">", e2.lineMax = x2, e2.parentType = g2, u2[1] = e2.line, i2 = 0; i2 < k2.length; i2++)
    e2.bMarks[i2 + r2] = f2[i2], e2.tShift[i2 + r2] = k2[i2], e2.sCount[i2 + r2] = _2[i2], e2.bsCount[i2 + r2] = d2[i2];
  return e2.blkIndent = m2, true;
}, ["paragraph", "reference", "blockquote", "list"]], ["hr", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (42 !== (s2 = e2.src.charCodeAt(c2++)) && 45 !== s2 && 95 !== s2)
    return false;
  for (o2 = 1; c2 < l2; ) {
    if ((i2 = e2.src.charCodeAt(c2++)) !== s2 && !ge$1(i2))
      return false;
    i2 === s2 && o2++;
  }
  return !(o2 < 3) && (n2 || (e2.line = r2 + 1, (a2 = e2.push("hr", "hr", 0)).map = [r2, e2.line], a2.markup = Array(o2 + 1).join(String.fromCharCode(s2))), true);
}, ["paragraph", "reference", "blockquote", "list"]], ["list", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2, A2, x2, D2, w2, E2, q2, S2, F2, L2, z2 = false, T2 = true;
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (e2.listIndent >= 0 && e2.sCount[r2] - e2.listIndent >= 4 && e2.sCount[r2] < e2.blkIndent)
    return false;
  if (n2 && "paragraph" === e2.parentType && e2.sCount[r2] >= e2.blkIndent && (z2 = true), (w2 = be$1(e2, r2)) >= 0) {
    if (u2 = true, q2 = e2.bMarks[r2] + e2.tShift[r2], g2 = Number(e2.src.slice(q2, w2 - 1)), z2 && 1 !== g2)
      return false;
  } else {
    if (!((w2 = ke$1(e2, r2)) >= 0))
      return false;
    u2 = false;
  }
  if (z2 && e2.skipSpaces(w2) >= e2.eMarks[r2])
    return false;
  if (m2 = e2.src.charCodeAt(w2 - 1), n2)
    return true;
  for (d2 = e2.tokens.length, u2 ? (L2 = e2.push("ordered_list_open", "ol", 1), 1 !== g2 && (L2.attrs = [["start", g2]])) : L2 = e2.push("bullet_list_open", "ul", 1), L2.map = f2 = [r2, 0], L2.markup = String.fromCharCode(m2), k2 = r2, E2 = false, F2 = e2.md.block.ruler.getRules("list"), C2 = e2.parentType, e2.parentType = "list"; k2 < t2; ) {
    for (D2 = w2, _2 = e2.eMarks[k2], l2 = b2 = e2.sCount[k2] + w2 - (e2.bMarks[r2] + e2.tShift[r2]); D2 < _2; ) {
      if (9 === (s2 = e2.src.charCodeAt(D2)))
        b2 += 4 - (b2 + e2.bsCount[k2]) % 4;
      else {
        if (32 !== s2)
          break;
        b2++;
      }
      D2++;
    }
    if ((c2 = (o2 = D2) >= _2 ? 1 : b2 - l2) > 4 && (c2 = 1), a2 = l2 + c2, (L2 = e2.push("list_item_open", "li", 1)).markup = String.fromCharCode(m2), L2.map = p2 = [r2, 0], u2 && (L2.info = e2.src.slice(q2, w2 - 1)), x2 = e2.tight, A2 = e2.tShift[r2], y2 = e2.sCount[r2], v2 = e2.listIndent, e2.listIndent = e2.blkIndent, e2.blkIndent = a2, e2.tight = true, e2.tShift[r2] = o2 - e2.bMarks[r2], e2.sCount[r2] = b2, o2 >= _2 && e2.isEmpty(r2 + 1) ? e2.line = Math.min(e2.line + 2, t2) : e2.md.block.tokenize(e2, r2, t2, true), e2.tight && !E2 || (T2 = false), E2 = e2.line - r2 > 1 && e2.isEmpty(e2.line - 1), e2.blkIndent = e2.listIndent, e2.listIndent = v2, e2.tShift[r2] = A2, e2.sCount[r2] = y2, e2.tight = x2, (L2 = e2.push("list_item_close", "li", -1)).markup = String.fromCharCode(m2), k2 = r2 = e2.line, p2[1] = k2, o2 = e2.bMarks[r2], k2 >= t2)
      break;
    if (e2.sCount[k2] < e2.blkIndent)
      break;
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      break;
    for (S2 = false, i2 = 0, h2 = F2.length; i2 < h2; i2++)
      if (F2[i2](e2, k2, t2, true)) {
        S2 = true;
        break;
      }
    if (S2)
      break;
    if (u2) {
      if ((w2 = be$1(e2, k2)) < 0)
        break;
      q2 = e2.bMarks[k2] + e2.tShift[k2];
    } else if ((w2 = ke$1(e2, k2)) < 0)
      break;
    if (m2 !== e2.src.charCodeAt(w2 - 1))
      break;
  }
  return (L2 = u2 ? e2.push("ordered_list_close", "ol", -1) : e2.push("bullet_list_close", "ul", -1)).markup = String.fromCharCode(m2), f2[1] = k2, e2.line = k2, e2.parentType = C2, T2 && function(e3, r3) {
    var t3, n3, s3 = e3.level + 2;
    for (t3 = r3 + 2, n3 = e3.tokens.length - 2; t3 < n3; t3++)
      e3.tokens[t3].level === s3 && "paragraph_open" === e3.tokens[t3].type && (e3.tokens[t3 + 2].hidden = true, e3.tokens[t3].hidden = true, t3 += 2);
  }(e2, d2), true;
}, ["paragraph", "reference", "blockquote"]], ["reference", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2 = 0, C2 = e2.bMarks[r2] + e2.tShift[r2], y2 = e2.eMarks[r2], A2 = r2 + 1;
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (91 !== e2.src.charCodeAt(C2))
    return false;
  for (; ++C2 < y2; )
    if (93 === e2.src.charCodeAt(C2) && 92 !== e2.src.charCodeAt(C2 - 1)) {
      if (C2 + 1 === y2)
        return false;
      if (58 !== e2.src.charCodeAt(C2 + 1))
        return false;
      break;
    }
  for (a2 = e2.lineMax, k2 = e2.md.block.ruler.getRules("reference"), f2 = e2.parentType, e2.parentType = "reference"; A2 < a2 && !e2.isEmpty(A2); A2++)
    if (!(e2.sCount[A2] - e2.blkIndent > 3 || e2.sCount[A2] < 0)) {
      for (_2 = false, l2 = 0, u2 = k2.length; l2 < u2; l2++)
        if (k2[l2](e2, A2, a2, true)) {
          _2 = true;
          break;
        }
      if (_2)
        break;
    }
  for (y2 = (g2 = e2.getLines(r2, A2, e2.blkIndent, false).trim()).length, C2 = 1; C2 < y2; C2++) {
    if (91 === (s2 = g2.charCodeAt(C2)))
      return false;
    if (93 === s2) {
      h2 = C2;
      break;
    }
    (10 === s2 || 92 === s2 && ++C2 < y2 && 10 === g2.charCodeAt(C2)) && v2++;
  }
  if (h2 < 0 || 58 !== g2.charCodeAt(h2 + 1))
    return false;
  for (C2 = h2 + 2; C2 < y2; C2++)
    if (10 === (s2 = g2.charCodeAt(C2)))
      v2++;
    else if (!Ce$1(s2))
      break;
  if (!(d2 = e2.md.helpers.parseLinkDestination(g2, C2, y2)).ok)
    return false;
  if (c2 = e2.md.normalizeLink(d2.str), !e2.md.validateLink(c2))
    return false;
  for (o2 = C2 = d2.pos, i2 = v2 += d2.lines, m2 = C2; C2 < y2; C2++)
    if (10 === (s2 = g2.charCodeAt(C2)))
      v2++;
    else if (!Ce$1(s2))
      break;
  for (d2 = e2.md.helpers.parseLinkTitle(g2, C2, y2), C2 < y2 && m2 !== C2 && d2.ok ? (b2 = d2.str, C2 = d2.pos, v2 += d2.lines) : (b2 = "", C2 = o2, v2 = i2); C2 < y2 && (s2 = g2.charCodeAt(C2), Ce$1(s2)); )
    C2++;
  if (C2 < y2 && 10 !== g2.charCodeAt(C2) && b2)
    for (b2 = "", C2 = o2, v2 = i2; C2 < y2 && (s2 = g2.charCodeAt(C2), Ce$1(s2)); )
      C2++;
  return !(C2 < y2 && 10 !== g2.charCodeAt(C2)) && (!!(p2 = ve$1(g2.slice(1, h2))) && (n2 || (void 0 === e2.env.references && (e2.env.references = {}), void 0 === e2.env.references[p2] && (e2.env.references[p2] = { title: b2, href: c2 }), e2.parentType = f2, e2.line = r2 + v2 + 1), true));
}], ["html_block", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (!e2.md.options.html)
    return false;
  if (60 !== e2.src.charCodeAt(c2))
    return false;
  for (a2 = e2.src.slice(c2, l2), s2 = 0; s2 < Se$1.length && !Se$1[s2][0].test(a2); s2++)
    ;
  if (s2 === Se$1.length)
    return false;
  if (n2)
    return Se$1[s2][2];
  if (o2 = r2 + 1, !Se$1[s2][1].test(a2)) {
    for (; o2 < t2 && !(e2.sCount[o2] < e2.blkIndent); o2++)
      if (c2 = e2.bMarks[o2] + e2.tShift[o2], l2 = e2.eMarks[o2], a2 = e2.src.slice(c2, l2), Se$1[s2][1].test(a2)) {
        0 !== a2.length && o2++;
        break;
      }
  }
  return e2.line = o2, (i2 = e2.push("html_block", "", 0)).map = [r2, o2], i2.content = e2.getLines(r2, o2, e2.blkIndent, true), true;
}, ["paragraph", "reference", "blockquote"]], ["heading", function(e2, r2, t2, n2) {
  var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  if (35 !== (s2 = e2.src.charCodeAt(c2)) || c2 >= l2)
    return false;
  for (o2 = 1, s2 = e2.src.charCodeAt(++c2); 35 === s2 && c2 < l2 && o2 <= 6; )
    o2++, s2 = e2.src.charCodeAt(++c2);
  return !(o2 > 6 || c2 < l2 && !Fe(s2)) && (n2 || (l2 = e2.skipSpacesBack(l2, c2), (i2 = e2.skipCharsBack(l2, 35, c2)) > c2 && Fe(e2.src.charCodeAt(i2 - 1)) && (l2 = i2), e2.line = r2 + 1, (a2 = e2.push("heading_open", "h" + String(o2), 1)).markup = "########".slice(0, o2), a2.map = [r2, e2.line], (a2 = e2.push("inline", "", 0)).content = e2.src.slice(c2, l2).trim(), a2.map = [r2, e2.line], a2.children = [], (a2 = e2.push("heading_close", "h" + String(o2), -1)).markup = "########".slice(0, o2)), true);
}, ["paragraph", "reference", "blockquote"]], ["lheading", function(e2, r2, t2) {
  var n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2 = r2 + 1, d2 = e2.md.block.ruler.getRules("paragraph");
  if (e2.sCount[r2] - e2.blkIndent >= 4)
    return false;
  for (h2 = e2.parentType, e2.parentType = "paragraph"; f2 < t2 && !e2.isEmpty(f2); f2++)
    if (!(e2.sCount[f2] - e2.blkIndent > 3)) {
      if (e2.sCount[f2] >= e2.blkIndent && (c2 = e2.bMarks[f2] + e2.tShift[f2]) < (l2 = e2.eMarks[f2]) && (45 === (p2 = e2.src.charCodeAt(c2)) || 61 === p2) && (c2 = e2.skipChars(c2, p2), (c2 = e2.skipSpaces(c2)) >= l2)) {
        u2 = 61 === p2 ? 1 : 2;
        break;
      }
      if (!(e2.sCount[f2] < 0)) {
        for (s2 = false, o2 = 0, i2 = d2.length; o2 < i2; o2++)
          if (d2[o2](e2, f2, t2, true)) {
            s2 = true;
            break;
          }
        if (s2)
          break;
      }
    }
  return !!u2 && (n2 = e2.getLines(r2, f2, e2.blkIndent, false).trim(), e2.line = f2 + 1, (a2 = e2.push("heading_open", "h" + String(u2), 1)).markup = String.fromCharCode(p2), a2.map = [r2, e2.line], (a2 = e2.push("inline", "", 0)).content = n2, a2.map = [r2, e2.line - 1], a2.children = [], (a2 = e2.push("heading_close", "h" + String(u2), -1)).markup = String.fromCharCode(p2), e2.parentType = h2, true);
}], ["paragraph", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2 = r2 + 1, l2 = e2.md.block.ruler.getRules("paragraph"), u2 = e2.lineMax;
  for (a2 = e2.parentType, e2.parentType = "paragraph"; c2 < u2 && !e2.isEmpty(c2); c2++)
    if (!(e2.sCount[c2] - e2.blkIndent > 3 || e2.sCount[c2] < 0)) {
      for (n2 = false, s2 = 0, o2 = l2.length; s2 < o2; s2++)
        if (l2[s2](e2, c2, u2, true)) {
          n2 = true;
          break;
        }
      if (n2)
        break;
    }
  return t2 = e2.getLines(r2, c2, e2.blkIndent, false).trim(), e2.line = c2, (i2 = e2.push("paragraph_open", "p", 1)).map = [r2, e2.line], (i2 = e2.push("inline", "", 0)).content = t2, i2.map = [r2, e2.line], i2.children = [], i2 = e2.push("paragraph_close", "p", -1), e2.parentType = a2, true;
}]];
function Be$1() {
  this.ruler = new Me$1();
  for (var e2 = 0; e2 < Re$1.length; e2++)
    this.ruler.push(Re$1[e2][0], Re$1[e2][1], { alt: (Re$1[e2][2] || []).slice() });
}
Be$1.prototype.tokenize = function(e2, r2, t2) {
  for (var n2, s2 = this.ruler.getRules(""), o2 = s2.length, i2 = r2, a2 = false, c2 = e2.md.options.maxNesting; i2 < t2 && (e2.line = i2 = e2.skipEmptyLines(i2), !(i2 >= t2)) && !(e2.sCount[i2] < e2.blkIndent); ) {
    if (e2.level >= c2) {
      e2.line = t2;
      break;
    }
    for (n2 = 0; n2 < o2 && !s2[n2](e2, i2, t2, false); n2++)
      ;
    e2.tight = !a2, e2.isEmpty(e2.line - 1) && (a2 = true), (i2 = e2.line) < t2 && e2.isEmpty(i2) && (a2 = true, i2++, e2.line = i2);
  }
}, Be$1.prototype.parse = function(e2, r2, t2, n2) {
  var s2;
  e2 && (s2 = new this.State(e2, r2, t2, n2), this.tokenize(s2, s2.line, s2.lineMax));
}, Be$1.prototype.State = Ie$1;
var Ne$1 = Be$1;
function Oe$1(e2) {
  switch (e2) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
for (var Pe = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i, je = r$1.isSpace, Ue = r$1.isSpace, Ve = [], Ze = 0; Ze < 256; Ze++)
  Ve.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e2) {
  Ve[e2.charCodeAt(0)] = 1;
});
var $e$1 = {};
function Ge(e2, r2) {
  var t2, n2, s2, o2, i2, a2 = [], c2 = r2.length;
  for (t2 = 0; t2 < c2; t2++)
    126 === (s2 = r2[t2]).marker && -1 !== s2.end && (o2 = r2[s2.end], (i2 = e2.tokens[s2.token]).type = "s_open", i2.tag = "s", i2.nesting = 1, i2.markup = "~~", i2.content = "", (i2 = e2.tokens[o2.token]).type = "s_close", i2.tag = "s", i2.nesting = -1, i2.markup = "~~", i2.content = "", "text" === e2.tokens[o2.token - 1].type && "~" === e2.tokens[o2.token - 1].content && a2.push(o2.token - 1));
  for (; a2.length; ) {
    for (n2 = (t2 = a2.pop()) + 1; n2 < e2.tokens.length && "s_close" === e2.tokens[n2].type; )
      n2++;
    t2 !== --n2 && (i2 = e2.tokens[n2], e2.tokens[n2] = e2.tokens[t2], e2.tokens[t2] = i2);
  }
}
$e$1.tokenize = function(e2, r2) {
  var t2, n2, s2, o2, i2 = e2.pos, a2 = e2.src.charCodeAt(i2);
  if (r2)
    return false;
  if (126 !== a2)
    return false;
  if (s2 = (n2 = e2.scanDelims(e2.pos, true)).length, o2 = String.fromCharCode(a2), s2 < 2)
    return false;
  for (s2 % 2 && (e2.push("text", "", 0).content = o2, s2--), t2 = 0; t2 < s2; t2 += 2)
    e2.push("text", "", 0).content = o2 + o2, e2.delimiters.push({ marker: a2, length: 0, token: e2.tokens.length - 1, end: -1, open: n2.can_open, close: n2.can_close });
  return e2.pos += n2.length, true;
}, $e$1.postProcess = function(e2) {
  var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
  for (Ge(e2, e2.delimiters), r2 = 0; r2 < n2; r2++)
    t2[r2] && t2[r2].delimiters && Ge(e2, t2[r2].delimiters);
};
var He = {};
function Je(e2, r2) {
  var t2, n2, s2, o2, i2, a2;
  for (t2 = r2.length - 1; t2 >= 0; t2--)
    95 !== (n2 = r2[t2]).marker && 42 !== n2.marker || -1 !== n2.end && (s2 = r2[n2.end], a2 = t2 > 0 && r2[t2 - 1].end === n2.end + 1 && r2[t2 - 1].marker === n2.marker && r2[t2 - 1].token === n2.token - 1 && r2[n2.end + 1].token === s2.token + 1, i2 = String.fromCharCode(n2.marker), (o2 = e2.tokens[n2.token]).type = a2 ? "strong_open" : "em_open", o2.tag = a2 ? "strong" : "em", o2.nesting = 1, o2.markup = a2 ? i2 + i2 : i2, o2.content = "", (o2 = e2.tokens[s2.token]).type = a2 ? "strong_close" : "em_close", o2.tag = a2 ? "strong" : "em", o2.nesting = -1, o2.markup = a2 ? i2 + i2 : i2, o2.content = "", a2 && (e2.tokens[r2[t2 - 1].token].content = "", e2.tokens[r2[n2.end + 1].token].content = "", t2--));
}
He.tokenize = function(e2, r2) {
  var t2, n2, s2 = e2.pos, o2 = e2.src.charCodeAt(s2);
  if (r2)
    return false;
  if (95 !== o2 && 42 !== o2)
    return false;
  for (n2 = e2.scanDelims(e2.pos, 42 === o2), t2 = 0; t2 < n2.length; t2++)
    e2.push("text", "", 0).content = String.fromCharCode(o2), e2.delimiters.push({ marker: o2, length: n2.length, token: e2.tokens.length - 1, end: -1, open: n2.can_open, close: n2.can_close });
  return e2.pos += n2.length, true;
}, He.postProcess = function(e2) {
  var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
  for (Je(e2, e2.delimiters), r2 = 0; r2 < n2; r2++)
    t2[r2] && t2[r2].delimiters && Je(e2, t2[r2].delimiters);
};
var We = r$1.normalizeReference, Ye = r$1.isSpace, Ke = r$1.normalizeReference, Qe = r$1.isSpace, Xe = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, er = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, rr = ye$1.HTML_TAG_RE;
var tr = t$1, nr = r$1.has, sr = r$1.isValidEntityCode, or = r$1.fromCodePoint, ir = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, ar = /^&([a-z][a-z0-9]{1,31});/i;
function cr(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2 = {}, p2 = r2.length;
  if (p2) {
    var h2 = 0, f2 = -2, d2 = [];
    for (t2 = 0; t2 < p2; t2++)
      if (s2 = r2[t2], d2.push(0), r2[h2].marker === s2.marker && f2 === s2.token - 1 || (h2 = t2), f2 = s2.token, s2.length = s2.length || 0, s2.close) {
        for (u2.hasOwnProperty(s2.marker) || (u2[s2.marker] = [-1, -1, -1, -1, -1, -1]), i2 = u2[s2.marker][(s2.open ? 3 : 0) + s2.length % 3], a2 = n2 = h2 - d2[h2] - 1; n2 > i2; n2 -= d2[n2] + 1)
          if ((o2 = r2[n2]).marker === s2.marker && o2.open && o2.end < 0 && (c2 = false, (o2.close || s2.open) && (o2.length + s2.length) % 3 == 0 && (o2.length % 3 == 0 && s2.length % 3 == 0 || (c2 = true)), !c2)) {
            l2 = n2 > 0 && !r2[n2 - 1].open ? d2[n2 - 1] + 1 : 0, d2[t2] = t2 - n2 + l2, d2[n2] = l2, s2.open = false, o2.end = t2, o2.close = false, a2 = -1, f2 = -2;
            break;
          }
        -1 !== a2 && (u2[s2.marker][(s2.open ? 3 : 0) + (s2.length || 0) % 3] = a2);
      }
  }
}
var lr = se$1, ur = r$1.isWhiteSpace, pr = r$1.isPunctChar, hr = r$1.isMdAsciiPunct;
function fr(e2, r2, t2, n2) {
  this.src = e2, this.env = t2, this.md = r2, this.tokens = n2, this.tokens_meta = Array(n2.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = false, this.linkLevel = 0;
}
fr.prototype.pushPending = function() {
  var e2 = new lr("text", "", 0);
  return e2.content = this.pending, e2.level = this.pendingLevel, this.tokens.push(e2), this.pending = "", e2;
}, fr.prototype.push = function(e2, r2, t2) {
  this.pending && this.pushPending();
  var n2 = new lr(e2, r2, t2), s2 = null;
  return t2 < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n2.level = this.level, t2 > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], s2 = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n2), this.tokens_meta.push(s2), n2;
}, fr.prototype.scanDelims = function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2 = e2, h2 = true, f2 = true, d2 = this.posMax, m2 = this.src.charCodeAt(e2);
  for (t2 = e2 > 0 ? this.src.charCodeAt(e2 - 1) : 32; p2 < d2 && this.src.charCodeAt(p2) === m2; )
    p2++;
  return s2 = p2 - e2, n2 = p2 < d2 ? this.src.charCodeAt(p2) : 32, c2 = hr(t2) || pr(String.fromCharCode(t2)), u2 = hr(n2) || pr(String.fromCharCode(n2)), a2 = ur(t2), (l2 = ur(n2)) ? h2 = false : u2 && (a2 || c2 || (h2 = false)), a2 ? f2 = false : c2 && (l2 || u2 || (f2 = false)), r2 ? (o2 = h2, i2 = f2) : (o2 = h2 && (!f2 || c2), i2 = f2 && (!h2 || u2)), { can_open: o2, can_close: i2, length: s2 };
}, fr.prototype.Token = lr;
var dr = fr, mr = N$1, gr = [["text", function(e2, r2) {
  for (var t2 = e2.pos; t2 < e2.posMax && !Oe$1(e2.src.charCodeAt(t2)); )
    t2++;
  return t2 !== e2.pos && (r2 || (e2.pending += e2.src.slice(e2.pos, t2)), e2.pos = t2, true);
}], ["linkify", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2;
  return !!e2.md.options.linkify && (!(e2.linkLevel > 0) && (!((t2 = e2.pos) + 3 > e2.posMax) && (58 === e2.src.charCodeAt(t2) && (47 === e2.src.charCodeAt(t2 + 1) && (47 === e2.src.charCodeAt(t2 + 2) && (!!(n2 = e2.pending.match(Pe)) && (s2 = n2[1], !!(o2 = e2.md.linkify.matchAtStart(e2.src.slice(t2 - s2.length))) && (i2 = (i2 = o2.url).replace(/\*+$/, ""), a2 = e2.md.normalizeLink(i2), !!e2.md.validateLink(a2) && (r2 || (e2.pending = e2.pending.slice(0, -s2.length), (c2 = e2.push("link_open", "a", 1)).attrs = [["href", a2]], c2.markup = "linkify", c2.info = "auto", (c2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(i2), (c2 = e2.push("link_close", "a", -1)).markup = "linkify", c2.info = "auto"), e2.pos += i2.length - s2.length, true)))))))));
}], ["newline", function(e2, r2) {
  var t2, n2, s2, o2 = e2.pos;
  if (10 !== e2.src.charCodeAt(o2))
    return false;
  if (t2 = e2.pending.length - 1, n2 = e2.posMax, !r2)
    if (t2 >= 0 && 32 === e2.pending.charCodeAt(t2))
      if (t2 >= 1 && 32 === e2.pending.charCodeAt(t2 - 1)) {
        for (s2 = t2 - 1; s2 >= 1 && 32 === e2.pending.charCodeAt(s2 - 1); )
          s2--;
        e2.pending = e2.pending.slice(0, s2), e2.push("hardbreak", "br", 0);
      } else
        e2.pending = e2.pending.slice(0, -1), e2.push("softbreak", "br", 0);
    else
      e2.push("softbreak", "br", 0);
  for (o2++; o2 < n2 && je(e2.src.charCodeAt(o2)); )
    o2++;
  return e2.pos = o2, true;
}], ["escape", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2 = e2.pos, c2 = e2.posMax;
  if (92 !== e2.src.charCodeAt(a2))
    return false;
  if (++a2 >= c2)
    return false;
  if (10 === (t2 = e2.src.charCodeAt(a2))) {
    for (r2 || e2.push("hardbreak", "br", 0), a2++; a2 < c2 && (t2 = e2.src.charCodeAt(a2), Ue(t2)); )
      a2++;
    return e2.pos = a2, true;
  }
  return o2 = e2.src[a2], t2 >= 55296 && t2 <= 56319 && a2 + 1 < c2 && (n2 = e2.src.charCodeAt(a2 + 1)) >= 56320 && n2 <= 57343 && (o2 += e2.src[a2 + 1], a2++), s2 = "\\" + o2, r2 || (i2 = e2.push("text_special", "", 0), t2 < 256 && 0 !== Ve[t2] ? i2.content = o2 : i2.content = s2, i2.markup = s2, i2.info = "escape"), e2.pos = a2 + 1, true;
}], ["backticks", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2 = e2.pos;
  if (96 !== e2.src.charCodeAt(u2))
    return false;
  for (t2 = u2, u2++, n2 = e2.posMax; u2 < n2 && 96 === e2.src.charCodeAt(u2); )
    u2++;
  if (c2 = (s2 = e2.src.slice(t2, u2)).length, e2.backticksScanned && (e2.backticks[c2] || 0) <= t2)
    return r2 || (e2.pending += s2), e2.pos += c2, true;
  for (i2 = a2 = u2; -1 !== (i2 = e2.src.indexOf("`", a2)); ) {
    for (a2 = i2 + 1; a2 < n2 && 96 === e2.src.charCodeAt(a2); )
      a2++;
    if ((l2 = a2 - i2) === c2)
      return r2 || ((o2 = e2.push("code_inline", "code", 0)).markup = s2, o2.content = e2.src.slice(u2, i2).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e2.pos = a2, true;
    e2.backticks[l2] = i2;
  }
  return e2.backticksScanned = true, r2 || (e2.pending += s2), e2.pos += c2, true;
}], ["strikethrough", $e$1.tokenize], ["emphasis", He.tokenize], ["link", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2 = "", p2 = "", h2 = e2.pos, f2 = e2.posMax, d2 = e2.pos, m2 = true;
  if (91 !== e2.src.charCodeAt(e2.pos))
    return false;
  if (i2 = e2.pos + 1, (o2 = e2.md.helpers.parseLinkLabel(e2, e2.pos, true)) < 0)
    return false;
  if ((a2 = o2 + 1) < f2 && 40 === e2.src.charCodeAt(a2)) {
    for (m2 = false, a2++; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
      ;
    if (a2 >= f2)
      return false;
    if (d2 = a2, (c2 = e2.md.helpers.parseLinkDestination(e2.src, a2, e2.posMax)).ok) {
      for (u2 = e2.md.normalizeLink(c2.str), e2.md.validateLink(u2) ? a2 = c2.pos : u2 = "", d2 = a2; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
        ;
      if (c2 = e2.md.helpers.parseLinkTitle(e2.src, a2, e2.posMax), a2 < f2 && d2 !== a2 && c2.ok)
        for (p2 = c2.str, a2 = c2.pos; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
          ;
    }
    (a2 >= f2 || 41 !== e2.src.charCodeAt(a2)) && (m2 = true), a2++;
  }
  if (m2) {
    if (void 0 === e2.env.references)
      return false;
    if (a2 < f2 && 91 === e2.src.charCodeAt(a2) ? (d2 = a2 + 1, (a2 = e2.md.helpers.parseLinkLabel(e2, a2)) >= 0 ? s2 = e2.src.slice(d2, a2++) : a2 = o2 + 1) : a2 = o2 + 1, s2 || (s2 = e2.src.slice(i2, o2)), !(l2 = e2.env.references[We(s2)]))
      return e2.pos = h2, false;
    u2 = l2.href, p2 = l2.title;
  }
  return r2 || (e2.pos = i2, e2.posMax = o2, e2.push("link_open", "a", 1).attrs = t2 = [["href", u2]], p2 && t2.push(["title", p2]), e2.linkLevel++, e2.md.inline.tokenize(e2), e2.linkLevel--, e2.push("link_close", "a", -1)), e2.pos = a2, e2.posMax = f2, true;
}], ["image", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2 = "", g2 = e2.pos, _2 = e2.posMax;
  if (33 !== e2.src.charCodeAt(e2.pos))
    return false;
  if (91 !== e2.src.charCodeAt(e2.pos + 1))
    return false;
  if (a2 = e2.pos + 2, (i2 = e2.md.helpers.parseLinkLabel(e2, e2.pos + 1, false)) < 0)
    return false;
  if ((c2 = i2 + 1) < _2 && 40 === e2.src.charCodeAt(c2)) {
    for (c2++; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
      ;
    if (c2 >= _2)
      return false;
    for (d2 = c2, (u2 = e2.md.helpers.parseLinkDestination(e2.src, c2, e2.posMax)).ok && (m2 = e2.md.normalizeLink(u2.str), e2.md.validateLink(m2) ? c2 = u2.pos : m2 = ""), d2 = c2; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
      ;
    if (u2 = e2.md.helpers.parseLinkTitle(e2.src, c2, e2.posMax), c2 < _2 && d2 !== c2 && u2.ok)
      for (p2 = u2.str, c2 = u2.pos; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
        ;
    else
      p2 = "";
    if (c2 >= _2 || 41 !== e2.src.charCodeAt(c2))
      return e2.pos = g2, false;
    c2++;
  } else {
    if (void 0 === e2.env.references)
      return false;
    if (c2 < _2 && 91 === e2.src.charCodeAt(c2) ? (d2 = c2 + 1, (c2 = e2.md.helpers.parseLinkLabel(e2, c2)) >= 0 ? o2 = e2.src.slice(d2, c2++) : c2 = i2 + 1) : c2 = i2 + 1, o2 || (o2 = e2.src.slice(a2, i2)), !(l2 = e2.env.references[Ke(o2)]))
      return e2.pos = g2, false;
    m2 = l2.href, p2 = l2.title;
  }
  return r2 || (s2 = e2.src.slice(a2, i2), e2.md.inline.parse(s2, e2.md, e2.env, f2 = []), (h2 = e2.push("image", "img", 0)).attrs = t2 = [["src", m2], ["alt", ""]], h2.children = f2, h2.content = s2, p2 && t2.push(["title", p2])), e2.pos = c2, e2.posMax = _2, true;
}], ["autolink", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2, c2 = e2.pos;
  if (60 !== e2.src.charCodeAt(c2))
    return false;
  for (i2 = e2.pos, a2 = e2.posMax; ; ) {
    if (++c2 >= a2)
      return false;
    if (60 === (o2 = e2.src.charCodeAt(c2)))
      return false;
    if (62 === o2)
      break;
  }
  return t2 = e2.src.slice(i2 + 1, c2), er.test(t2) ? (n2 = e2.md.normalizeLink(t2), !!e2.md.validateLink(n2) && (r2 || ((s2 = e2.push("link_open", "a", 1)).attrs = [["href", n2]], s2.markup = "autolink", s2.info = "auto", (s2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(t2), (s2 = e2.push("link_close", "a", -1)).markup = "autolink", s2.info = "auto"), e2.pos += t2.length + 2, true)) : !!Xe.test(t2) && (n2 = e2.md.normalizeLink("mailto:" + t2), !!e2.md.validateLink(n2) && (r2 || ((s2 = e2.push("link_open", "a", 1)).attrs = [["href", n2]], s2.markup = "autolink", s2.info = "auto", (s2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(t2), (s2 = e2.push("link_close", "a", -1)).markup = "autolink", s2.info = "auto"), e2.pos += t2.length + 2, true));
}], ["html_inline", function(e2, r2) {
  var t2, n2, s2, o2, i2, a2 = e2.pos;
  return !!e2.md.options.html && (s2 = e2.posMax, !(60 !== e2.src.charCodeAt(a2) || a2 + 2 >= s2) && (!(33 !== (t2 = e2.src.charCodeAt(a2 + 1)) && 63 !== t2 && 47 !== t2 && !function(e3) {
    var r3 = 32 | e3;
    return r3 >= 97 && r3 <= 122;
  }(t2)) && (!!(n2 = e2.src.slice(a2).match(rr)) && (r2 || ((o2 = e2.push("html_inline", "", 0)).content = e2.src.slice(a2, a2 + n2[0].length), i2 = o2.content, /^<a[>\s]/i.test(i2) && e2.linkLevel++, function(e3) {
    return /^<\/a\s*>/i.test(e3);
  }(o2.content) && e2.linkLevel--), e2.pos += n2[0].length, true))));
}], ["entity", function(e2, r2) {
  var t2, n2, s2, o2 = e2.pos, i2 = e2.posMax;
  if (38 !== e2.src.charCodeAt(o2))
    return false;
  if (o2 + 1 >= i2)
    return false;
  if (35 === e2.src.charCodeAt(o2 + 1)) {
    if (n2 = e2.src.slice(o2).match(ir))
      return r2 || (t2 = "x" === n2[1][0].toLowerCase() ? parseInt(n2[1].slice(1), 16) : parseInt(n2[1], 10), (s2 = e2.push("text_special", "", 0)).content = sr(t2) ? or(t2) : or(65533), s2.markup = n2[0], s2.info = "entity"), e2.pos += n2[0].length, true;
  } else if ((n2 = e2.src.slice(o2).match(ar)) && nr(tr, n2[1]))
    return r2 || ((s2 = e2.push("text_special", "", 0)).content = tr[n2[1]], s2.markup = n2[0], s2.info = "entity"), e2.pos += n2[0].length, true;
  return false;
}]], _r = [["balance_pairs", function(e2) {
  var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
  for (cr(0, e2.delimiters), r2 = 0; r2 < n2; r2++)
    t2[r2] && t2[r2].delimiters && cr(0, t2[r2].delimiters);
}], ["strikethrough", $e$1.postProcess], ["emphasis", He.postProcess], ["fragments_join", function(e2) {
  var r2, t2, n2 = 0, s2 = e2.tokens, o2 = e2.tokens.length;
  for (r2 = t2 = 0; r2 < o2; r2++)
    s2[r2].nesting < 0 && n2--, s2[r2].level = n2, s2[r2].nesting > 0 && n2++, "text" === s2[r2].type && r2 + 1 < o2 && "text" === s2[r2 + 1].type ? s2[r2 + 1].content = s2[r2].content + s2[r2 + 1].content : (r2 !== t2 && (s2[t2] = s2[r2]), t2++);
  r2 !== t2 && (s2.length = t2);
}]];
function kr() {
  var e2;
  for (this.ruler = new mr(), e2 = 0; e2 < gr.length; e2++)
    this.ruler.push(gr[e2][0], gr[e2][1]);
  for (this.ruler2 = new mr(), e2 = 0; e2 < _r.length; e2++)
    this.ruler2.push(_r[e2][0], _r[e2][1]);
}
kr.prototype.skipToken = function(e2) {
  var r2, t2, n2 = e2.pos, s2 = this.ruler.getRules(""), o2 = s2.length, i2 = e2.md.options.maxNesting, a2 = e2.cache;
  if (void 0 === a2[n2]) {
    if (e2.level < i2)
      for (t2 = 0; t2 < o2 && (e2.level++, r2 = s2[t2](e2, true), e2.level--, !r2); t2++)
        ;
    else
      e2.pos = e2.posMax;
    r2 || e2.pos++, a2[n2] = e2.pos;
  } else
    e2.pos = a2[n2];
}, kr.prototype.tokenize = function(e2) {
  for (var r2, t2, n2 = this.ruler.getRules(""), s2 = n2.length, o2 = e2.posMax, i2 = e2.md.options.maxNesting; e2.pos < o2; ) {
    if (e2.level < i2)
      for (t2 = 0; t2 < s2 && !(r2 = n2[t2](e2, false)); t2++)
        ;
    if (r2) {
      if (e2.pos >= o2)
        break;
    } else
      e2.pending += e2.src[e2.pos++];
  }
  e2.pending && e2.pushPending();
}, kr.prototype.parse = function(e2, r2, t2, n2) {
  var s2, o2, i2, a2 = new this.State(e2, r2, t2, n2);
  for (this.tokenize(a2), i2 = (o2 = this.ruler2.getRules("")).length, s2 = 0; s2 < i2; s2++)
    o2[s2](a2);
}, kr.prototype.State = dr;
var br = kr;
function vr(e2) {
  var r2 = Array.prototype.slice.call(arguments, 1);
  return r2.forEach(function(r3) {
    r3 && Object.keys(r3).forEach(function(t2) {
      e2[t2] = r3[t2];
    });
  }), e2;
}
function Cr(e2) {
  return Object.prototype.toString.call(e2);
}
function yr(e2) {
  return "[object Function]" === Cr(e2);
}
function Ar(e2) {
  return e2.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var xr = { fuzzyLink: true, fuzzyEmail: true, fuzzyIP: false };
var Dr = { "http:": { validate: function(e2, r2, t2) {
  var n2 = e2.slice(r2);
  return t2.re.http || (t2.re.http = new RegExp("^\\/\\/" + t2.re.src_auth + t2.re.src_host_port_strict + t2.re.src_path, "i")), t2.re.http.test(n2) ? n2.match(t2.re.http)[0].length : 0;
} }, "https:": "http:", "ftp:": "http:", "//": { validate: function(e2, r2, t2) {
  var n2 = e2.slice(r2);
  return t2.re.no_http || (t2.re.no_http = new RegExp("^" + t2.re.src_auth + "(?:localhost|(?:(?:" + t2.re.src_domain + ")\\.)+" + t2.re.src_domain_root + ")" + t2.re.src_port + t2.re.src_host_terminator + t2.re.src_path, "i")), t2.re.no_http.test(n2) ? r2 >= 3 && ":" === e2[r2 - 3] || r2 >= 3 && "/" === e2[r2 - 3] ? 0 : n2.match(t2.re.no_http)[0].length : 0;
} }, "mailto:": { validate: function(e2, r2, t2) {
  var n2 = e2.slice(r2);
  return t2.re.mailto || (t2.re.mailto = new RegExp("^" + t2.re.src_email_name + "@" + t2.re.src_host_strict, "i")), t2.re.mailto.test(n2) ? n2.match(t2.re.mailto)[0].length : 0;
} } }, wr = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Er(e2) {
  var r2 = e2.re = function(e3) {
    var r3 = {};
    return e3 = e3 || {}, r3.src_Any = D$1.source, r3.src_Cc = w$1.source, r3.src_Z = E$1.source, r3.src_P = n$1.source, r3.src_ZPCc = [r3.src_Z, r3.src_P, r3.src_Cc].join("|"), r3.src_ZCc = [r3.src_Z, r3.src_Cc].join("|"), r3.src_pseudo_letter = "(?:(?![><｜]|" + r3.src_ZPCc + ")" + r3.src_Any + ")", r3.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", r3.src_auth = "(?:(?:(?!" + r3.src_ZCc + "|[@/\\[\\]()]).)+@)?", r3.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", r3.src_host_terminator = "(?=$|[><｜]|" + r3.src_ZPCc + ")(?!" + (e3["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + r3.src_ZPCc + "))", r3.src_path = "(?:[/?#](?:(?!" + r3.src_ZCc + `|[><｜]|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + r3.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + r3.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + r3.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + r3.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + r3.src_ZCc + "|[']).)+\\'|\\'(?=" + r3.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + r3.src_ZCc + "|[.]|$)|" + (e3["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + r3.src_ZCc + "|$)|;(?!" + r3.src_ZCc + "|$)|\\!+(?!" + r3.src_ZCc + "|[!]|$)|\\?(?!" + r3.src_ZCc + "|[?]|$))+|\\/)?", r3.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', r3.src_xn = "xn--[a-z0-9\\-]{1,59}", r3.src_domain_root = "(?:" + r3.src_xn + "|" + r3.src_pseudo_letter + "{1,63})", r3.src_domain = "(?:" + r3.src_xn + "|(?:" + r3.src_pseudo_letter + ")|(?:" + r3.src_pseudo_letter + "(?:-|" + r3.src_pseudo_letter + "){0,61}" + r3.src_pseudo_letter + "))", r3.src_host = "(?:(?:(?:(?:" + r3.src_domain + ")\\.)*" + r3.src_domain + "))", r3.tpl_host_fuzzy = "(?:" + r3.src_ip4 + "|(?:(?:(?:" + r3.src_domain + ")\\.)+(?:%TLDS%)))", r3.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + r3.src_domain + ")\\.)+(?:%TLDS%))", r3.src_host_strict = r3.src_host + r3.src_host_terminator, r3.tpl_host_fuzzy_strict = r3.tpl_host_fuzzy + r3.src_host_terminator, r3.src_host_port_strict = r3.src_host + r3.src_port + r3.src_host_terminator, r3.tpl_host_port_fuzzy_strict = r3.tpl_host_fuzzy + r3.src_port + r3.src_host_terminator, r3.tpl_host_port_no_ip_fuzzy_strict = r3.tpl_host_no_ip_fuzzy + r3.src_port + r3.src_host_terminator, r3.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + r3.src_ZPCc + "|>|$))", r3.tpl_email_fuzzy = '(^|[><｜]|"|\\(|' + r3.src_ZCc + ")(" + r3.src_email_name + "@" + r3.tpl_host_fuzzy_strict + ")", r3.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r3.src_ZPCc + "))((?![$+<=>^`|｜])" + r3.tpl_host_port_fuzzy_strict + r3.src_path + ")", r3.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r3.src_ZPCc + "))((?![$+<=>^`|｜])" + r3.tpl_host_port_no_ip_fuzzy_strict + r3.src_path + ")", r3;
  }(e2.__opts__), t2 = e2.__tlds__.slice();
  function s2(e3) {
    return e3.replace("%TLDS%", r2.src_tlds);
  }
  e2.onCompile(), e2.__tlds_replaced__ || t2.push("a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]"), t2.push(r2.src_xn), r2.src_tlds = t2.join("|"), r2.email_fuzzy = RegExp(s2(r2.tpl_email_fuzzy), "i"), r2.link_fuzzy = RegExp(s2(r2.tpl_link_fuzzy), "i"), r2.link_no_ip_fuzzy = RegExp(s2(r2.tpl_link_no_ip_fuzzy), "i"), r2.host_fuzzy_test = RegExp(s2(r2.tpl_host_fuzzy_test), "i");
  var o2 = [];
  function i2(e3, r3) {
    throw new Error('(LinkifyIt) Invalid schema "' + e3 + '": ' + r3);
  }
  e2.__compiled__ = {}, Object.keys(e2.__schemas__).forEach(function(r3) {
    var t3 = e2.__schemas__[r3];
    if (null !== t3) {
      var n2 = { validate: null, link: null };
      if (e2.__compiled__[r3] = n2, "[object Object]" === Cr(t3))
        return !function(e3) {
          return "[object RegExp]" === Cr(e3);
        }(t3.validate) ? yr(t3.validate) ? n2.validate = t3.validate : i2(r3, t3) : n2.validate = function(e3) {
          return function(r4, t4) {
            var n3 = r4.slice(t4);
            return e3.test(n3) ? n3.match(e3)[0].length : 0;
          };
        }(t3.validate), void (yr(t3.normalize) ? n2.normalize = t3.normalize : t3.normalize ? i2(r3, t3) : n2.normalize = function(e3, r4) {
          r4.normalize(e3);
        });
      !function(e3) {
        return "[object String]" === Cr(e3);
      }(t3) ? i2(r3, t3) : o2.push(r3);
    }
  }), o2.forEach(function(r3) {
    e2.__compiled__[e2.__schemas__[r3]] && (e2.__compiled__[r3].validate = e2.__compiled__[e2.__schemas__[r3]].validate, e2.__compiled__[r3].normalize = e2.__compiled__[e2.__schemas__[r3]].normalize);
  }), e2.__compiled__[""] = { validate: null, normalize: function(e3, r3) {
    r3.normalize(e3);
  } };
  var a2 = Object.keys(e2.__compiled__).filter(function(r3) {
    return r3.length > 0 && e2.__compiled__[r3];
  }).map(Ar).join("|");
  e2.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + r2.src_ZPCc + "))(" + a2 + ")", "i"), e2.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + r2.src_ZPCc + "))(" + a2 + ")", "ig"), e2.re.schema_at_start = RegExp("^" + e2.re.schema_search.source, "i"), e2.re.pretest = RegExp("(" + e2.re.schema_test.source + ")|(" + e2.re.host_fuzzy_test.source + ")|@", "i"), function(e3) {
    e3.__index__ = -1, e3.__text_cache__ = "";
  }(e2);
}
function qr(e2, r2) {
  var t2 = e2.__index__, n2 = e2.__last_index__, s2 = e2.__text_cache__.slice(t2, n2);
  this.schema = e2.__schema__.toLowerCase(), this.index = t2 + r2, this.lastIndex = n2 + r2, this.raw = s2, this.text = s2, this.url = s2;
}
function Sr(e2, r2) {
  var t2 = new qr(e2, r2);
  return e2.__compiled__[t2.schema].normalize(t2, e2), t2;
}
function Fr(e2, r2) {
  if (!(this instanceof Fr))
    return new Fr(e2, r2);
  var t2;
  r2 || (t2 = e2, Object.keys(t2 || {}).reduce(function(e3, r3) {
    return e3 || xr.hasOwnProperty(r3);
  }, false) && (r2 = e2, e2 = {})), this.__opts__ = vr({}, xr, r2), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = vr({}, Dr, e2), this.__compiled__ = {}, this.__tlds__ = wr, this.__tlds_replaced__ = false, this.re = {}, Er(this);
}
Fr.prototype.add = function(e2, r2) {
  return this.__schemas__[e2] = r2, Er(this), this;
}, Fr.prototype.set = function(e2) {
  return this.__opts__ = vr(this.__opts__, e2), this;
}, Fr.prototype.test = function(e2) {
  if (this.__text_cache__ = e2, this.__index__ = -1, !e2.length)
    return false;
  var r2, t2, n2, s2, o2, i2, a2, c2;
  if (this.re.schema_test.test(e2)) {
    for ((a2 = this.re.schema_search).lastIndex = 0; null !== (r2 = a2.exec(e2)); )
      if (s2 = this.testSchemaAt(e2, r2[2], a2.lastIndex)) {
        this.__schema__ = r2[2], this.__index__ = r2.index + r2[1].length, this.__last_index__ = r2.index + r2[0].length + s2;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c2 = e2.search(this.re.host_fuzzy_test)) >= 0 && (this.__index__ < 0 || c2 < this.__index__) && null !== (t2 = e2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o2 = t2.index + t2[1].length, (this.__index__ < 0 || o2 < this.__index__) && (this.__schema__ = "", this.__index__ = o2, this.__last_index__ = t2.index + t2[0].length)), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && e2.indexOf("@") >= 0 && null !== (n2 = e2.match(this.re.email_fuzzy)) && (o2 = n2.index + n2[1].length, i2 = n2.index + n2[0].length, (this.__index__ < 0 || o2 < this.__index__ || o2 === this.__index__ && i2 > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o2, this.__last_index__ = i2)), this.__index__ >= 0;
}, Fr.prototype.pretest = function(e2) {
  return this.re.pretest.test(e2);
}, Fr.prototype.testSchemaAt = function(e2, r2, t2) {
  return this.__compiled__[r2.toLowerCase()] ? this.__compiled__[r2.toLowerCase()].validate(e2, t2, this) : 0;
}, Fr.prototype.match = function(e2) {
  var r2 = 0, t2 = [];
  this.__index__ >= 0 && this.__text_cache__ === e2 && (t2.push(Sr(this, r2)), r2 = this.__last_index__);
  for (var n2 = r2 ? e2.slice(r2) : e2; this.test(n2); )
    t2.push(Sr(this, r2)), n2 = n2.slice(this.__last_index__), r2 += this.__last_index__;
  return t2.length ? t2 : null;
}, Fr.prototype.matchAtStart = function(e2) {
  if (this.__text_cache__ = e2, this.__index__ = -1, !e2.length)
    return null;
  var r2 = this.re.schema_at_start.exec(e2);
  if (!r2)
    return null;
  var t2 = this.testSchemaAt(e2, r2[2], r2[0].length);
  return t2 ? (this.__schema__ = r2[2], this.__index__ = r2.index + r2[1].length, this.__last_index__ = r2.index + r2[0].length + t2, Sr(this, 0)) : null;
}, Fr.prototype.tlds = function(e2, r2) {
  return e2 = Array.isArray(e2) ? e2 : [e2], r2 ? (this.__tlds__ = this.__tlds__.concat(e2).sort().filter(function(e3, r3, t2) {
    return e3 !== t2[r3 - 1];
  }).reverse(), Er(this), this) : (this.__tlds__ = e2.slice(), this.__tlds_replaced__ = true, Er(this), this);
}, Fr.prototype.normalize = function(e2) {
  e2.schema || (e2.url = "http://" + e2.url), "mailto:" !== e2.schema || /^mailto:/i.test(e2.url) || (e2.url = "mailto:" + e2.url);
}, Fr.prototype.onCompile = function() {
};
var Lr = Fr, zr = 2147483647, Tr = /^xn--/, Ir = /[^\x20-\x7E]/, Mr = /[\x2E\u3002\uFF0E\uFF61]/g, Rr = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, Br = Math.floor, Nr = String.fromCharCode;
/*! https://mths.be/punycode v1.4.1 by @mathias */
function Or(e2) {
  throw new RangeError(Rr[e2]);
}
function Pr(e2, r2) {
  for (var t2 = e2.length, n2 = []; t2--; )
    n2[t2] = r2(e2[t2]);
  return n2;
}
function jr(e2, r2) {
  var t2 = e2.split("@"), n2 = "";
  return t2.length > 1 && (n2 = t2[0] + "@", e2 = t2[1]), n2 + Pr((e2 = e2.replace(Mr, ".")).split("."), r2).join(".");
}
function Ur(e2) {
  for (var r2, t2, n2 = [], s2 = 0, o2 = e2.length; s2 < o2; )
    (r2 = e2.charCodeAt(s2++)) >= 55296 && r2 <= 56319 && s2 < o2 ? 56320 == (64512 & (t2 = e2.charCodeAt(s2++))) ? n2.push(((1023 & r2) << 10) + (1023 & t2) + 65536) : (n2.push(r2), s2--) : n2.push(r2);
  return n2;
}
function Vr(e2) {
  return Pr(e2, function(e3) {
    var r2 = "";
    return e3 > 65535 && (r2 += Nr((e3 -= 65536) >>> 10 & 1023 | 55296), e3 = 56320 | 1023 & e3), r2 += Nr(e3);
  }).join("");
}
function Zr(e2, r2) {
  return e2 + 22 + 75 * (e2 < 26) - ((0 != r2) << 5);
}
function $r(e2, r2, t2) {
  var n2 = 0;
  for (e2 = t2 ? Br(e2 / 700) : e2 >> 1, e2 += Br(e2 / r2); e2 > 455; n2 += 36)
    e2 = Br(e2 / 35);
  return Br(n2 + 36 * e2 / (e2 + 38));
}
function Gr(e2) {
  var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2 = [], f2 = e2.length, d2 = 0, m2 = 128, g2 = 72;
  for ((t2 = e2.lastIndexOf("-")) < 0 && (t2 = 0), n2 = 0; n2 < t2; ++n2)
    e2.charCodeAt(n2) >= 128 && Or("not-basic"), h2.push(e2.charCodeAt(n2));
  for (s2 = t2 > 0 ? t2 + 1 : 0; s2 < f2; ) {
    for (o2 = d2, i2 = 1, a2 = 36; s2 >= f2 && Or("invalid-input"), ((c2 = (p2 = e2.charCodeAt(s2++)) - 48 < 10 ? p2 - 22 : p2 - 65 < 26 ? p2 - 65 : p2 - 97 < 26 ? p2 - 97 : 36) >= 36 || c2 > Br((zr - d2) / i2)) && Or("overflow"), d2 += c2 * i2, !(c2 < (l2 = a2 <= g2 ? 1 : a2 >= g2 + 26 ? 26 : a2 - g2)); a2 += 36)
      i2 > Br(zr / (u2 = 36 - l2)) && Or("overflow"), i2 *= u2;
    g2 = $r(d2 - o2, r2 = h2.length + 1, 0 == o2), Br(d2 / r2) > zr - m2 && Or("overflow"), m2 += Br(d2 / r2), d2 %= r2, h2.splice(d2++, 0, m2);
  }
  return Vr(h2);
}
function Hr(e2) {
  var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2 = [];
  for (h2 = (e2 = Ur(e2)).length, r2 = 128, t2 = 0, o2 = 72, i2 = 0; i2 < h2; ++i2)
    (p2 = e2[i2]) < 128 && g2.push(Nr(p2));
  for (n2 = s2 = g2.length, s2 && g2.push("-"); n2 < h2; ) {
    for (a2 = zr, i2 = 0; i2 < h2; ++i2)
      (p2 = e2[i2]) >= r2 && p2 < a2 && (a2 = p2);
    for (a2 - r2 > Br((zr - t2) / (f2 = n2 + 1)) && Or("overflow"), t2 += (a2 - r2) * f2, r2 = a2, i2 = 0; i2 < h2; ++i2)
      if ((p2 = e2[i2]) < r2 && ++t2 > zr && Or("overflow"), p2 == r2) {
        for (c2 = t2, l2 = 36; !(c2 < (u2 = l2 <= o2 ? 1 : l2 >= o2 + 26 ? 26 : l2 - o2)); l2 += 36)
          m2 = c2 - u2, d2 = 36 - u2, g2.push(Nr(Zr(u2 + m2 % d2, 0))), c2 = Br(m2 / d2);
        g2.push(Nr(Zr(c2, 0))), o2 = $r(t2, f2, n2 == s2), t2 = 0, ++n2;
      }
    ++t2, ++r2;
  }
  return g2.join("");
}
function Jr(e2) {
  return jr(e2, function(e3) {
    return Tr.test(e3) ? Gr(e3.slice(4).toLowerCase()) : e3;
  });
}
function Wr(e2) {
  return jr(e2, function(e3) {
    return Ir.test(e3) ? "xn--" + Hr(e3) : e3;
  });
}
var Yr = { decode: Ur, encode: Vr }, Kr = { version: "1.4.1", ucs2: Yr, toASCII: Wr, toUnicode: Jr, encode: Hr, decode: Gr }, Qr = r$1, Xr = q$1, et = R$1, rt = pe$1, tt = Ne$1, nt = br, st = Lr, ot = s$1, it = e$1(Object.freeze({ __proto__: null, decode: Gr, encode: Hr, toUnicode: Jr, toASCII: Wr, version: "1.4.1", ucs2: Yr, default: Kr })), at = { default: { options: { html: false, xhtmlOut: false, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 100 }, components: { core: {}, block: {}, inline: {} } }, zero: { options: { html: false, xhtmlOut: false, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["paragraph"] }, inline: { rules: ["text"], rules2: ["balance_pairs", "fragments_join"] } } }, commonmark: { options: { html: true, xhtmlOut: true, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"] }, inline: { rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"], rules2: ["balance_pairs", "emphasis", "fragments_join"] } } } }, ct = /^(vbscript|javascript|file|data):/, lt = /^data:image\/(gif|png|jpeg|webp);/;
function ut(e2) {
  var r2 = e2.trim().toLowerCase();
  return !ct.test(r2) || !!lt.test(r2);
}
var pt = ["http:", "https:", "mailto:"];
function ht(e2) {
  var r2 = ot.parse(e2, true);
  if (r2.hostname && (!r2.protocol || pt.indexOf(r2.protocol) >= 0))
    try {
      r2.hostname = it.toASCII(r2.hostname);
    } catch (e3) {
    }
  return ot.encode(ot.format(r2));
}
function ft(e2) {
  var r2 = ot.parse(e2, true);
  if (r2.hostname && (!r2.protocol || pt.indexOf(r2.protocol) >= 0))
    try {
      r2.hostname = it.toUnicode(r2.hostname);
    } catch (e3) {
    }
  return ot.decode(ot.format(r2), ot.decode.defaultChars + "%");
}
function dt(e2, r2) {
  if (!(this instanceof dt))
    return new dt(e2, r2);
  r2 || Qr.isString(e2) || (r2 = e2 || {}, e2 = "default"), this.inline = new nt(), this.block = new tt(), this.core = new rt(), this.renderer = new et(), this.linkify = new st(), this.validateLink = ut, this.normalizeLink = ht, this.normalizeLinkText = ft, this.utils = Qr, this.helpers = Qr.assign({}, Xr), this.options = {}, this.configure(e2), r2 && this.set(r2);
}
dt.prototype.set = function(e2) {
  return Qr.assign(this.options, e2), this;
}, dt.prototype.configure = function(e2) {
  var r2, t2 = this;
  if (Qr.isString(e2) && !(e2 = at[r2 = e2]))
    throw new Error('Wrong `markdown-it` preset "' + r2 + '", check name');
  if (!e2)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e2.options && t2.set(e2.options), e2.components && Object.keys(e2.components).forEach(function(r3) {
    e2.components[r3].rules && t2[r3].ruler.enableOnly(e2.components[r3].rules), e2.components[r3].rules2 && t2[r3].ruler2.enableOnly(e2.components[r3].rules2);
  }), this;
}, dt.prototype.enable = function(e2, r2) {
  var t2 = [];
  Array.isArray(e2) || (e2 = [e2]), ["core", "block", "inline"].forEach(function(r3) {
    t2 = t2.concat(this[r3].ruler.enable(e2, true));
  }, this), t2 = t2.concat(this.inline.ruler2.enable(e2, true));
  var n2 = e2.filter(function(e3) {
    return t2.indexOf(e3) < 0;
  });
  if (n2.length && !r2)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n2);
  return this;
}, dt.prototype.disable = function(e2, r2) {
  var t2 = [];
  Array.isArray(e2) || (e2 = [e2]), ["core", "block", "inline"].forEach(function(r3) {
    t2 = t2.concat(this[r3].ruler.disable(e2, true));
  }, this), t2 = t2.concat(this.inline.ruler2.disable(e2, true));
  var n2 = e2.filter(function(e3) {
    return t2.indexOf(e3) < 0;
  });
  if (n2.length && !r2)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n2);
  return this;
}, dt.prototype.use = function(e2) {
  var r2 = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e2.apply(e2, r2), this;
}, dt.prototype.parse = function(e2, r2) {
  if ("string" != typeof e2)
    throw new Error("Input data should be a String");
  var t2 = new this.core.State(e2, this, r2);
  return this.core.process(t2), t2.tokens;
}, dt.prototype.render = function(e2, r2) {
  return r2 = r2 || {}, this.renderer.render(this.parse(e2, r2), this.options, r2);
}, dt.prototype.parseInline = function(e2, r2) {
  var t2 = new this.core.State(e2, this, r2);
  return t2.inlineMode = true, this.core.process(t2), t2.tokens;
}, dt.prototype.renderInline = function(e2, r2) {
  return r2 = r2 || {}, this.renderer.render(this.parseInline(e2, r2), this.options, r2);
};
var mt = dt;
/*!
  Highlight.js v11.7.0 (git: 82688fad18)
  (c) 2006-2022 undefined and other contributors
  License: BSD-3-Clause
 */
var e = {
  exports: {}
};
function n(e2) {
  return e2 instanceof Map ? e2.clear = e2.delete = e2.set = () => {
    throw Error("map is read-only");
  } : e2 instanceof Set && (e2.add = e2.clear = e2.delete = () => {
    throw Error("set is read-only");
  }), Object.freeze(e2), Object.getOwnPropertyNames(e2).forEach((t2) => {
    var a2 = e2[t2];
    "object" != typeof a2 || Object.isFrozen(a2) || n(a2);
  }), e2;
}
e.exports = n, e.exports.default = n;
class t {
  constructor(e2) {
    void 0 === e2.data && (e2.data = {}), this.data = e2.data, this.isMatchIgnored = false;
  }
  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}
function a(e2) {
  return e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(
    /'/g,
    "&#x27;"
  );
}
function i(e2, ...n2) {
  const t2 = /* @__PURE__ */ Object.create(null);
  for (const n3 in e2)
    t2[n3] = e2[n3];
  return n2.forEach((e3) => {
    for (const n3 in e3)
      t2[n3] = e3[n3];
  }), t2;
}
const r = (e2) => !!e2.scope || e2.sublanguage && e2.language;
class s {
  constructor(e2, n2) {
    this.buffer = "", this.classPrefix = n2.classPrefix, e2.walk(this);
  }
  addText(e2) {
    this.buffer += a(e2);
  }
  openNode(e2) {
    if (!r(e2))
      return;
    let n2 = "";
    n2 = e2.sublanguage ? "language-" + e2.language : ((e3, {
      prefix: n3
    }) => {
      if (e3.includes(".")) {
        const t2 = e3.split(".");
        return [`${n3}${t2.shift()}`, ...t2.map((e4, n4) => `${e4}${"_".repeat(n4 + 1)}`)].join(" ");
      }
      return `${n3}${e3}`;
    })(e2.scope, {
      prefix: this.classPrefix
    }), this.span(n2);
  }
  closeNode(e2) {
    r(e2) && (this.buffer += "</span>");
  }
  value() {
    return this.buffer;
  }
  span(e2) {
    this.buffer += `<span class="${e2}">`;
  }
}
const o = (e2 = {}) => {
  const n2 = {
    children: []
  };
  return Object.assign(n2, e2), n2;
};
class l {
  constructor() {
    this.rootNode = o(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(e2) {
    this.top.children.push(e2);
  }
  openNode(e2) {
    const n2 = o({
      scope: e2
    });
    this.add(n2), this.stack.push(n2);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(e2) {
    return this.constructor._walk(e2, this.rootNode);
  }
  static _walk(e2, n2) {
    return "string" == typeof n2 ? e2.addText(n2) : n2.children && (e2.openNode(n2), n2.children.forEach((n3) => this._walk(e2, n3)), e2.closeNode(n2)), e2;
  }
  static _collapse(e2) {
    "string" != typeof e2 && e2.children && (e2.children.every((e3) => "string" == typeof e3) ? e2.children = [
      e2.children.join("")
    ] : e2.children.forEach((e3) => {
      l._collapse(e3);
    }));
  }
}
class c extends l {
  constructor(e2) {
    super(), this.options = e2;
  }
  addKeyword(e2, n2) {
    "" !== e2 && (this.openNode(n2), this.addText(e2), this.closeNode());
  }
  addText(e2) {
    "" !== e2 && this.add(e2);
  }
  addSublanguage(e2, n2) {
    const t2 = e2.root;
    t2.sublanguage = true, t2.language = n2, this.add(t2);
  }
  toHTML() {
    return new s(this, this.options).value();
  }
  finalize() {
    return true;
  }
}
function d(e2) {
  return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
}
function g(e2) {
  return m("(?=", e2, ")");
}
function u(e2) {
  return m("(?:", e2, ")*");
}
function b(e2) {
  return m("(?:", e2, ")?");
}
function m(...e2) {
  return e2.map((e3) => d(e3)).join("");
}
function p(...e2) {
  const n2 = ((e3) => {
    const n3 = e3[e3.length - 1];
    return "object" == typeof n3 && n3.constructor === Object ? (e3.splice(e3.length - 1, 1), n3) : {};
  })(e2);
  return "(" + (n2.capture ? "" : "?:") + e2.map((e3) => d(e3)).join("|") + ")";
}
function _(e2) {
  return RegExp(e2.toString() + "|").exec("").length - 1;
}
const h = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function f(e2, {
  joinWith: n2
}) {
  let t2 = 0;
  return e2.map((e3) => {
    t2 += 1;
    const n3 = t2;
    let a2 = d(e3), i2 = "";
    for (; a2.length > 0; ) {
      const e4 = h.exec(a2);
      if (!e4) {
        i2 += a2;
        break;
      }
      i2 += a2.substring(0, e4.index), a2 = a2.substring(e4.index + e4[0].length), "\\" === e4[0][0] && e4[1] ? i2 += "\\" + (Number(e4[1]) + n3) : (i2 += e4[0], "(" === e4[0] && t2++);
    }
    return i2;
  }).map((e3) => `(${e3})`).join(n2);
}
const E = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", y = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, w = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [y]
}, N = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [y]
}, v = (e2, n2, t2 = {}) => {
  const a2 = i({
    scope: "comment",
    begin: e2,
    end: n2,
    contains: []
  }, t2);
  a2.contains.push({
    scope: "doctag",
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const r2 = p(
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    /[A-Za-z]+[-][a-z]+/,
    /[A-Za-z][a-z]{2,}/
  );
  return a2.contains.push({
    begin: m(/[ ]+/, "(", r2, /[.]?[:]?([.][ ]|[ ])/, "){3}")
  }), a2;
}, O = v("//", "$"), k = v("/\\*", "\\*/"), x = v("#", "$");
var M = Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE: /\b\B/,
  IDENT_RE: "[a-zA-Z]\\w*",
  UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
  NUMBER_RE: "\\b\\d+(\\.\\d+)?",
  C_NUMBER_RE: E,
  BINARY_NUMBER_RE: "\\b(0b[01]+)",
  RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
  SHEBANG: (e2 = {}) => {
    const n2 = /^#![ ]*\//;
    return e2.binary && (e2.begin = m(n2, /.*\b/, e2.binary, /\b.*/)), i({
      scope: "meta",
      begin: n2,
      end: /$/,
      relevance: 0,
      "on:begin": (e3, n3) => {
        0 !== e3.index && n3.ignoreMatch();
      }
    }, e2);
  },
  BACKSLASH_ESCAPE: y,
  APOS_STRING_MODE: w,
  QUOTE_STRING_MODE: N,
  PHRASAL_WORDS_MODE: {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  },
  COMMENT: v,
  C_LINE_COMMENT_MODE: O,
  C_BLOCK_COMMENT_MODE: k,
  HASH_COMMENT_MODE: x,
  NUMBER_MODE: {
    scope: "number",
    begin: "\\b\\d+(\\.\\d+)?",
    relevance: 0
  },
  C_NUMBER_MODE: {
    scope: "number",
    begin: E,
    relevance: 0
  },
  BINARY_NUMBER_MODE: {
    scope: "number",
    begin: "\\b(0b[01]+)",
    relevance: 0
  },
  REGEXP_MODE: {
    begin: /(?=\/[^/\n]*\/)/,
    contains: [{
      scope: "regexp",
      begin: /\//,
      end: /\/[gimuy]*/,
      illegal: /\n/,
      contains: [y, {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [y]
      }]
    }]
  },
  TITLE_MODE: {
    scope: "title",
    begin: "[a-zA-Z]\\w*",
    relevance: 0
  },
  UNDERSCORE_TITLE_MODE: {
    scope: "title",
    begin: "[a-zA-Z_]\\w*",
    relevance: 0
  },
  METHOD_GUARD: {
    begin: "\\.\\s*[a-zA-Z_]\\w*",
    relevance: 0
  },
  END_SAME_AS_BEGIN: (e2) => Object.assign(e2, {
    "on:begin": (e3, n2) => {
      n2.data._beginMatch = e3[1];
    },
    "on:end": (e3, n2) => {
      n2.data._beginMatch !== e3[1] && n2.ignoreMatch();
    }
  })
});
function S(e2, n2) {
  "." === e2.input[e2.index - 1] && n2.ignoreMatch();
}
function A(e2, n2) {
  void 0 !== e2.className && (e2.scope = e2.className, delete e2.className);
}
function C(e2, n2) {
  n2 && e2.beginKeywords && (e2.begin = "\\b(" + e2.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e2.__beforeBegin = S, e2.keywords = e2.keywords || e2.beginKeywords, delete e2.beginKeywords, void 0 === e2.relevance && (e2.relevance = 0));
}
function T(e2, n2) {
  Array.isArray(e2.illegal) && (e2.illegal = p(...e2.illegal));
}
function R(e2, n2) {
  if (e2.match) {
    if (e2.begin || e2.end)
      throw Error("begin & end are not supported with match");
    e2.begin = e2.match, delete e2.match;
  }
}
function D(e2, n2) {
  void 0 === e2.relevance && (e2.relevance = 1);
}
const I = (e2, n2) => {
  if (!e2.beforeMatch)
    return;
  if (e2.starts)
    throw Error("beforeMatch cannot be used with starts");
  const t2 = Object.assign({}, e2);
  Object.keys(e2).forEach((n3) => {
    delete e2[n3];
  }), e2.keywords = t2.keywords, e2.begin = m(t2.beforeMatch, g(t2.begin)), e2.starts = {
    relevance: 0,
    contains: [Object.assign(t2, {
      endsParent: true
    })]
  }, e2.relevance = 0, delete t2.beforeMatch;
}, L = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
function B(e2, n2, t2 = "keyword") {
  const a2 = /* @__PURE__ */ Object.create(null);
  return "string" == typeof e2 ? i2(t2, e2.split(" ")) : Array.isArray(e2) ? i2(t2, e2) : Object.keys(e2).forEach((t3) => {
    Object.assign(a2, B(e2[t3], n2, t3));
  }), a2;
  function i2(e3, t3) {
    n2 && (t3 = t3.map((e4) => e4.toLowerCase())), t3.forEach((n3) => {
      const t4 = n3.split("|");
      a2[t4[0]] = [e3, $(t4[0], t4[1])];
    });
  }
}
function $(e2, n2) {
  return n2 ? Number(n2) : ((e3) => L.includes(e3.toLowerCase()))(e2) ? 0 : 1;
}
const z = {}, F = (e2) => {
  formatAppLog("error", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:392", e2);
}, U = (e2, ...n2) => {
  formatAppLog("log", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:395", "WARN: " + e2, ...n2);
}, j = (e2, n2) => {
  z[`${e2}/${n2}`] || (formatAppLog("log", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:398", `Deprecated as of ${e2}. ${n2}`), z[`${e2}/${n2}`] = true);
}, P = Error();
function K(e2, n2, {
  key: t2
}) {
  let a2 = 0;
  const i2 = e2[t2], r2 = {}, s2 = {};
  for (let e3 = 1; e3 <= n2.length; e3++)
    s2[e3 + a2] = i2[e3], r2[e3 + a2] = true, a2 += _(n2[e3 - 1]);
  e2[t2] = s2, e2[t2]._emit = r2, e2[t2]._multi = true;
}
function H(e2) {
  ((e3) => {
    e3.scope && "object" == typeof e3.scope && null !== e3.scope && (e3.beginScope = e3.scope, delete e3.scope);
  })(e2), "string" == typeof e2.beginScope && (e2.beginScope = {
    _wrap: e2.beginScope
  }), "string" == typeof e2.endScope && (e2.endScope = {
    _wrap: e2.endScope
  }), ((e3) => {
    if (Array.isArray(e3.begin)) {
      if (e3.skip || e3.excludeBegin || e3.returnBegin)
        throw F(
          "skip, excludeBegin, returnBegin not compatible with beginScope: {}"
        ), P;
      if ("object" != typeof e3.beginScope || null === e3.beginScope)
        throw F("beginScope must be object"), P;
      K(e3, e3.begin, {
        key: "beginScope"
      }), e3.begin = f(e3.begin, {
        joinWith: ""
      });
    }
  })(e2), ((e3) => {
    if (Array.isArray(e3.end)) {
      if (e3.skip || e3.excludeEnd || e3.returnEnd)
        throw F(
          "skip, excludeEnd, returnEnd not compatible with endScope: {}"
        ), P;
      if ("object" != typeof e3.endScope || null === e3.endScope)
        throw F("endScope must be object"), P;
      K(e3, e3.end, {
        key: "endScope"
      }), e3.end = f(e3.end, {
        joinWith: ""
      });
    }
  })(e2);
}
function q(e2) {
  function n2(n3, t3) {
    return RegExp(d(n3), "m" + (e2.case_insensitive ? "i" : "") + (e2.unicodeRegex ? "u" : "") + (t3 ? "g" : ""));
  }
  class t2 {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    addRule(e3, n3) {
      n3.position = this.position++, this.matchIndexes[this.matchAt] = n3, this.regexes.push([n3, e3]), this.matchAt += _(e3) + 1;
    }
    compile() {
      0 === this.regexes.length && (this.exec = () => null);
      const e3 = this.regexes.map((e4) => e4[1]);
      this.matcherRe = n2(f(e3, {
        joinWith: "|"
      }), true), this.lastIndex = 0;
    }
    exec(e3) {
      this.matcherRe.lastIndex = this.lastIndex;
      const n3 = this.matcherRe.exec(e3);
      if (!n3)
        return null;
      const t3 = n3.findIndex((e4, n4) => n4 > 0 && void 0 !== e4), a3 = this.matchIndexes[t3];
      return n3.splice(0, t3), Object.assign(n3, a3);
    }
  }
  class a2 {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    getMatcher(e3) {
      if (this.multiRegexes[e3])
        return this.multiRegexes[e3];
      const n3 = new t2();
      return this.rules.slice(e3).forEach(([e4, t3]) => n3.addRule(e4, t3)), n3.compile(), this.multiRegexes[e3] = n3, n3;
    }
    resumingScanAtSamePosition() {
      return 0 !== this.regexIndex;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(e3, n3) {
      this.rules.push([e3, n3]), "begin" === n3.type && this.count++;
    }
    exec(e3) {
      const n3 = this.getMatcher(this.regexIndex);
      n3.lastIndex = this.lastIndex;
      let t3 = n3.exec(e3);
      if (this.resumingScanAtSamePosition())
        if (t3 && t3.index === this.lastIndex)
          ;
        else {
          const n4 = this.getMatcher(0);
          n4.lastIndex = this.lastIndex + 1, t3 = n4.exec(e3);
        }
      return t3 && (this.regexIndex += t3.position + 1, this.regexIndex === this.count && this.considerAll()), t3;
    }
  }
  if (e2.compilerExtensions || (e2.compilerExtensions = []), e2.contains && e2.contains.includes("self"))
    throw Error(
      "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
    );
  return e2.classNameAliases = i(e2.classNameAliases || {}), function t3(r2, s2) {
    const o2 = r2;
    if (r2.isCompiled)
      return o2;
    [A, R, H, I].forEach((e3) => e3(r2, s2)), e2.compilerExtensions.forEach((e3) => e3(r2, s2)), r2.__beforeBegin = null, [C, T, D].forEach((e3) => e3(r2, s2)), r2.isCompiled = true;
    let l2 = null;
    return "object" == typeof r2.keywords && r2.keywords.$pattern && (r2.keywords = Object.assign({}, r2.keywords), l2 = r2.keywords.$pattern, delete r2.keywords.$pattern), l2 = l2 || /\w+/, r2.keywords && (r2.keywords = B(r2.keywords, e2.case_insensitive)), o2.keywordPatternRe = n2(l2, true), s2 && (r2.begin || (r2.begin = /\B|\b/), o2.beginRe = n2(o2.begin), r2.end || r2.endsWithParent || (r2.end = /\B|\b/), r2.end && (o2.endRe = n2(o2.end)), o2.terminatorEnd = d(o2.end) || "", r2.endsWithParent && s2.terminatorEnd && (o2.terminatorEnd += (r2.end ? "|" : "") + s2.terminatorEnd)), r2.illegal && (o2.illegalRe = n2(r2.illegal)), r2.contains || (r2.contains = []), r2.contains = [].concat(...r2.contains.map((e3) => ((e4) => (e4.variants && !e4.cachedVariants && (e4.cachedVariants = e4.variants.map((n3) => i(e4, {
      variants: null
    }, n3))), e4.cachedVariants ? e4.cachedVariants : Z(e4) ? i(e4, {
      starts: e4.starts ? i(e4.starts) : null
    }) : Object.isFrozen(e4) ? i(e4) : e4))("self" === e3 ? r2 : e3))), r2.contains.forEach((e3) => {
      t3(e3, o2);
    }), r2.starts && t3(r2.starts, s2), o2.matcher = ((e3) => {
      const n3 = new a2();
      return e3.contains.forEach((e4) => n3.addRule(e4.begin, {
        rule: e4,
        type: "begin"
      })), e3.terminatorEnd && n3.addRule(e3.terminatorEnd, {
        type: "end"
      }), e3.illegal && n3.addRule(e3.illegal, {
        type: "illegal"
      }), n3;
    })(o2), o2;
  }(e2);
}
function Z(e2) {
  return !!e2 && (e2.endsWithParent || Z(e2.starts));
}
class G extends Error {
  constructor(e2, n2) {
    super(e2), this.name = "HTMLInjectionError", this.html = n2;
  }
}
const W = a, Q = i, X = Symbol("nomatch");
var V = ((n2) => {
  const a2 = /* @__PURE__ */ Object.create(null), i2 = /* @__PURE__ */ Object.create(null), r2 = [];
  let s2 = true;
  const o2 = "Could not find the language '{}', did you forget to load/include a language module?", l2 = {
    disableAutodetect: true,
    name: "Plain text",
    contains: []
  };
  let d2 = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    __emitter: c
  };
  function _2(e2) {
    return d2.noHighlightRe.test(e2);
  }
  function h2(e2, n3, t2) {
    let a3 = "", i3 = "";
    "object" == typeof n3 ? (a3 = e2, t2 = n3.ignoreIllegals, i3 = n3.language) : (j("10.7.0", "highlight(lang, code, ...args) has been deprecated."), j(
      "10.7.0",
      "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"
    ), i3 = e2, a3 = n3), void 0 === t2 && (t2 = true);
    const r3 = {
      code: a3,
      language: i3
    };
    x2("before:highlight", r3);
    const s3 = r3.result ? r3.result : f2(r3.language, r3.code, t2);
    return s3.code = r3.code, x2("after:highlight", s3), s3;
  }
  function f2(e2, n3, i3, r3) {
    const l3 = /* @__PURE__ */ Object.create(null);
    function c2() {
      if (!k3.keywords)
        return void M2.addText(S2);
      let e3 = 0;
      k3.keywordPatternRe.lastIndex = 0;
      let n4 = k3.keywordPatternRe.exec(S2), t2 = "";
      for (; n4; ) {
        t2 += S2.substring(e3, n4.index);
        const i4 = w3.case_insensitive ? n4[0].toLowerCase() : n4[0], r4 = (a3 = i4, k3.keywords[a3]);
        if (r4) {
          const [e4, a4] = r4;
          if (M2.addText(t2), t2 = "", l3[i4] = (l3[i4] || 0) + 1, l3[i4] <= 7 && (A2 += a4), e4.startsWith("_"))
            t2 += n4[0];
          else {
            const t3 = w3.classNameAliases[e4] || e4;
            M2.addKeyword(n4[0], t3);
          }
        } else
          t2 += n4[0];
        e3 = k3.keywordPatternRe.lastIndex, n4 = k3.keywordPatternRe.exec(S2);
      }
      var a3;
      t2 += S2.substring(e3), M2.addText(t2);
    }
    function g2() {
      null != k3.subLanguage ? (() => {
        if ("" === S2)
          return;
        let e3 = null;
        if ("string" == typeof k3.subLanguage) {
          if (!a2[k3.subLanguage])
            return void M2.addText(S2);
          e3 = f2(k3.subLanguage, S2, true, x3[k3.subLanguage]), x3[k3.subLanguage] = e3._top;
        } else
          e3 = E2(S2, k3.subLanguage.length ? k3.subLanguage : null);
        k3.relevance > 0 && (A2 += e3.relevance), M2.addSublanguage(e3._emitter, e3.language);
      })() : c2(), S2 = "";
    }
    function u2(e3, n4) {
      let t2 = 1;
      const a3 = n4.length - 1;
      for (; t2 <= a3; ) {
        if (!e3._emit[t2]) {
          t2++;
          continue;
        }
        const a4 = w3.classNameAliases[e3[t2]] || e3[t2], i4 = n4[t2];
        a4 ? M2.addKeyword(i4, a4) : (S2 = i4, c2(), S2 = ""), t2++;
      }
    }
    function b2(e3, n4) {
      return e3.scope && "string" == typeof e3.scope && M2.openNode(w3.classNameAliases[e3.scope] || e3.scope), e3.beginScope && (e3.beginScope._wrap ? (M2.addKeyword(S2, w3.classNameAliases[e3.beginScope._wrap] || e3.beginScope._wrap), S2 = "") : e3.beginScope._multi && (u2(e3.beginScope, n4), S2 = "")), k3 = Object.create(e3, {
        parent: {
          value: k3
        }
      }), k3;
    }
    function m2(e3, n4, a3) {
      let i4 = ((e4, n5) => {
        const t2 = e4 && e4.exec(n5);
        return t2 && 0 === t2.index;
      })(e3.endRe, a3);
      if (i4) {
        if (e3["on:end"]) {
          const a4 = new t(e3);
          e3["on:end"](n4, a4), a4.isMatchIgnored && (i4 = false);
        }
        if (i4) {
          for (; e3.endsParent && e3.parent; )
            e3 = e3.parent;
          return e3;
        }
      }
      if (e3.endsWithParent)
        return m2(e3.parent, n4, a3);
    }
    function p2(e3) {
      return 0 === k3.matcher.regexIndex ? (S2 += e3[0], 1) : (R2 = true, 0);
    }
    function _3(e3) {
      const t2 = e3[0], a3 = n3.substring(e3.index), i4 = m2(k3, e3, a3);
      if (!i4)
        return X;
      const r4 = k3;
      k3.endScope && k3.endScope._wrap ? (g2(), M2.addKeyword(t2, k3.endScope._wrap)) : k3.endScope && k3.endScope._multi ? (g2(), u2(k3.endScope, e3)) : r4.skip ? S2 += t2 : (r4.returnEnd || r4.excludeEnd || (S2 += t2), g2(), r4.excludeEnd && (S2 = t2));
      do {
        k3.scope && M2.closeNode(), k3.skip || k3.subLanguage || (A2 += k3.relevance), k3 = k3.parent;
      } while (k3 !== i4.parent);
      return i4.starts && b2(i4.starts, e3), r4.returnEnd ? 0 : t2.length;
    }
    let h3 = {};
    function y3(a3, r4) {
      const o3 = r4 && r4[0];
      if (S2 += a3, null == o3)
        return g2(), 0;
      if ("begin" === h3.type && "end" === r4.type && h3.index === r4.index && "" === o3) {
        if (S2 += n3.slice(r4.index, r4.index + 1), !s2) {
          const n4 = Error(`0 width match regex (${e2})`);
          throw n4.languageName = e2, n4.badRule = h3.rule, n4;
        }
        return 1;
      }
      if (h3 = r4, "begin" === r4.type)
        return ((e3) => {
          const n4 = e3[0], a4 = e3.rule, i4 = new t(a4), r5 = [a4.__beforeBegin, a4["on:begin"]];
          for (const t2 of r5)
            if (t2 && (t2(e3, i4), i4.isMatchIgnored))
              return p2(n4);
          return a4.skip ? S2 += n4 : (a4.excludeBegin && (S2 += n4), g2(), a4.returnBegin || a4.excludeBegin || (S2 = n4)), b2(a4, e3), a4.returnBegin ? 0 : n4.length;
        })(r4);
      if ("illegal" === r4.type && !i3) {
        const e3 = Error('Illegal lexeme "' + o3 + '" for mode "' + (k3.scope || "<unnamed>") + '"');
        throw e3.mode = k3, e3;
      }
      if ("end" === r4.type) {
        const e3 = _3(r4);
        if (e3 !== X)
          return e3;
      }
      if ("illegal" === r4.type && "" === o3)
        return 1;
      if (T2 > 1e5 && T2 > 3 * r4.index)
        throw Error("potential infinite loop, way more iterations than matches");
      return S2 += o3, o3.length;
    }
    const w3 = v2(e2);
    if (!w3)
      throw F(o2.replace("{}", e2)), Error('Unknown language: "' + e2 + '"');
    const N3 = q(w3);
    let O3 = "", k3 = r3 || N3;
    const x3 = {}, M2 = new d2.__emitter(d2);
    (() => {
      const e3 = [];
      for (let n4 = k3; n4 !== w3; n4 = n4.parent)
        n4.scope && e3.unshift(n4.scope);
      e3.forEach((e4) => M2.openNode(e4));
    })();
    let S2 = "", A2 = 0, C2 = 0, T2 = 0, R2 = false;
    try {
      for (k3.matcher.considerAll(); ; ) {
        T2++, R2 ? R2 = false : k3.matcher.considerAll(), k3.matcher.lastIndex = C2;
        const e3 = k3.matcher.exec(n3);
        if (!e3)
          break;
        const t2 = y3(n3.substring(C2, e3.index), e3);
        C2 = e3.index + t2;
      }
      return y3(n3.substring(C2)), M2.closeAllNodes(), M2.finalize(), O3 = M2.toHTML(), {
        language: e2,
        value: O3,
        relevance: A2,
        illegal: false,
        _emitter: M2,
        _top: k3
      };
    } catch (t2) {
      if (t2.message && t2.message.includes("Illegal"))
        return {
          language: e2,
          value: W(n3),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: t2.message,
            index: C2,
            context: n3.slice(C2 - 100, C2 + 100),
            mode: t2.mode,
            resultSoFar: O3
          },
          _emitter: M2
        };
      if (s2)
        return {
          language: e2,
          value: W(n3),
          illegal: false,
          relevance: 0,
          errorRaised: t2,
          _emitter: M2,
          _top: k3
        };
      throw t2;
    }
  }
  function E2(e2, n3) {
    n3 = n3 || d2.languages || Object.keys(a2);
    const t2 = ((e3) => {
      const n4 = {
        value: W(e3),
        illegal: false,
        relevance: 0,
        _top: l2,
        _emitter: new d2.__emitter(d2)
      };
      return n4._emitter.addText(e3), n4;
    })(e2), i3 = n3.filter(v2).filter(k2).map((n4) => f2(n4, e2, false));
    i3.unshift(t2);
    const r3 = i3.sort((e3, n4) => {
      if (e3.relevance !== n4.relevance)
        return n4.relevance - e3.relevance;
      if (e3.language && n4.language) {
        if (v2(e3.language).supersetOf === n4.language)
          return 1;
        if (v2(n4.language).supersetOf === e3.language)
          return -1;
      }
      return 0;
    }), [s3, o3] = r3, c2 = s3;
    return c2.secondBest = o3, c2;
  }
  function y2(e2) {
    let n3 = null;
    const t2 = ((e3) => {
      let n4 = e3.className + " ";
      n4 += e3.parentNode ? e3.parentNode.className : "";
      const t3 = d2.languageDetectRe.exec(n4);
      if (t3) {
        const n5 = v2(t3[1]);
        return n5 || (U(o2.replace("{}", t3[1])), U("Falling back to no-highlight mode for this block.", e3)), n5 ? t3[1] : "no-highlight";
      }
      return n4.split(/\s+/).find((e4) => _2(e4) || v2(e4));
    })(e2);
    if (_2(t2))
      return;
    if (x2("before:highlightElement", {
      el: e2,
      language: t2
    }), e2.children.length > 0 && (d2.ignoreUnescapedHTML || (formatAppLog(
      "warn",
      "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:847",
      "One of your code blocks includes unescaped HTML. This is a potentially serious security risk."
    ), formatAppLog("warn", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:849", "https://github.com/highlightjs/highlight.js/wiki/security"), formatAppLog("warn", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:850", "The element with unescaped HTML:"), formatAppLog("warn", "at uni_modules/uni-im/lib/highlight/highlight-uni.min.js:851", e2)), d2.throwUnescapedHTML))
      throw new G("One of your code blocks includes unescaped HTML.", e2.innerHTML);
    n3 = e2;
    const a3 = n3.textContent, r3 = t2 ? h2(a3, {
      language: t2,
      ignoreIllegals: true
    }) : E2(a3);
    e2.innerHTML = r3.value, ((e3, n4, t3) => {
      const a4 = n4 && i2[n4] || t3;
      e3.classList.add("hljs"), e3.classList.add("language-" + a4);
    })(e2, t2, r3.language), e2.result = {
      language: r3.language,
      re: r3.relevance,
      relevance: r3.relevance
    }, r3.secondBest && (e2.secondBest = {
      language: r3.secondBest.language,
      relevance: r3.secondBest.relevance
    }), x2("after:highlightElement", {
      el: e2,
      result: r3,
      text: a3
    });
  }
  let w2 = false;
  function N2() {
    "loading" !== document.readyState ? document.querySelectorAll(d2.cssSelector).forEach(y2) : w2 = true;
  }
  function v2(e2) {
    return e2 = (e2 || "").toLowerCase(), a2[e2] || a2[i2[e2]];
  }
  function O2(e2, {
    languageName: n3
  }) {
    "string" == typeof e2 && (e2 = [e2]), e2.forEach((e3) => {
      i2[e3.toLowerCase()] = n3;
    });
  }
  function k2(e2) {
    const n3 = v2(e2);
    return n3 && !n3.disableAutodetect;
  }
  function x2(e2, n3) {
    const t2 = e2;
    r2.forEach((e3) => {
      e3[t2] && e3[t2](n3);
    });
  }
  "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", () => {
    w2 && N2();
  }, false), Object.assign(n2, {
    highlight: h2,
    highlightAuto: E2,
    highlightAll: N2,
    highlightElement: y2,
    highlightBlock: (e2) => (j("10.7.0", "highlightBlock will be removed entirely in v12.0"), j("10.7.0", "Please use highlightElement now."), y2(e2)),
    configure: (e2) => {
      d2 = Q(d2, e2);
    },
    initHighlighting: () => {
      N2(), j("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    },
    initHighlightingOnLoad: () => {
      N2(), j("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    },
    registerLanguage: (e2, t2) => {
      let i3 = null;
      try {
        i3 = t2(n2);
      } catch (n3) {
        if (F("Language definition for '{}' could not be registered.".replace("{}", e2)), !s2)
          throw n3;
        F(n3), i3 = l2;
      }
      i3.name || (i3.name = e2), a2[e2] = i3, i3.rawDefinition = t2.bind(null, n2), i3.aliases && O2(i3.aliases, {
        languageName: e2
      });
    },
    unregisterLanguage: (e2) => {
      delete a2[e2];
      for (const n3 of Object.keys(i2))
        i2[n3] === e2 && delete i2[n3];
    },
    listLanguages: () => Object.keys(a2),
    getLanguage: v2,
    registerAliases: O2,
    autoDetection: k2,
    inherit: Q,
    addPlugin: (e2) => {
      ((e3) => {
        e3["before:highlightBlock"] && !e3["before:highlightElement"] && (e3["before:highlightElement"] = (n3) => {
          e3["before:highlightBlock"](Object.assign({
            block: n3.el
          }, n3));
        }), e3["after:highlightBlock"] && !e3["after:highlightElement"] && (e3["after:highlightElement"] = (n3) => {
          e3["after:highlightBlock"](Object.assign({
            block: n3.el
          }, n3));
        });
      })(e2), r2.push(e2);
    }
  }), n2.debugMode = () => {
    s2 = false;
  }, n2.safeMode = () => {
    s2 = true;
  }, n2.versionString = "11.7.0", n2.regex = {
    concat: m,
    lookahead: g,
    either: p,
    optional: b,
    anyNumberOfTimes: u
  };
  for (const n3 in M)
    "object" == typeof M[n3] && e.exports(M[n3]);
  return Object.assign(n2, M), n2;
})({});
const J = (e2) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e2.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e2.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z][A-Za-z0-9_-]*/
  }
}), Y = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], ee = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  "min-width",
  "max-width",
  "min-height",
  "max-height"
], ne = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  "host",
  "host-context",
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  "nth-child",
  "nth-col",
  "nth-last-child",
  "nth-last-col",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
], te = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
], ae = [
  "align-content",
  "align-items",
  "align-self",
  "all",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-variant",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "gap",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "inline-size",
  "isolation",
  "justify-content",
  "left",
  "letter-spacing",
  "line-break",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "row-gap",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "speak",
  "speak-as",
  "src",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "z-index"
].reverse(), ie = ne.concat(te);
var re = "\\.([0-9](_*[0-9])*)", se = "[0-9a-fA-F](_*[0-9a-fA-F])*", oe = {
  className: "number",
  variants: [{
    begin: `(\\b([0-9](_*[0-9])*)((${re})|\\.)?|(${re}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
  }, {
    begin: `\\b([0-9](_*[0-9])*)((${re})[fFdD]?\\b|\\.([fFdD]\\b)?)`
  }, {
    begin: `(${re})[fFdD]?\\b`
  }, {
    begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b"
  }, {
    begin: `\\b0[xX]((${se})\\.?|(${se})?\\.(${se}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
  }, {
    begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
  }, {
    begin: `\\b0[xX](${se})[lL]?\\b`
  }, {
    begin: "\\b0(_*[0-7])*[lL]?\\b"
  }, {
    begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
  }],
  relevance: 0
};
function le(e2, n2, t2) {
  return -1 === t2 ? "" : e2.replace(n2, (a2) => le(e2, n2, t2 - 1));
}
const ce = "[A-Za-z$_][0-9A-Za-z$_]*", de = [
  "as",
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
], ge = ["true", "false", "null", "undefined", "NaN", "Infinity"], ue = [
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  "Math",
  "Date",
  "Number",
  "BigInt",
  "String",
  "RegExp",
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  "Reflect",
  "Proxy",
  "Intl",
  "WebAssembly"
], be = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], me = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], pe = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], _e = [].concat(me, ue, be);
function he(e2) {
  const n2 = e2.regex, t2 = ce, a2 = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    isTrulyOpeningTag: (e3, n3) => {
      const t3 = e3[0].length + e3.index, a3 = e3.input[t3];
      if ("<" === a3 || "," === a3)
        return void n3.ignoreMatch();
      let i3;
      ">" === a3 && (((e4, {
        after: n4
      }) => {
        const t4 = "</" + e4[0].slice(1);
        return -1 !== e4.input.indexOf(t4, n4);
      })(e3, {
        after: t3
      }) || n3.ignoreMatch());
      const r3 = e3.input.substring(t3);
      ((i3 = r3.match(/^\s*=/)) || (i3 = r3.match(/^\s+extends\s+/)) && 0 === i3.index) && n3.ignoreMatch();
    }
  }, i2 = {
    $pattern: ce,
    keyword: de,
    literal: ge,
    built_in: _e,
    "variable.language": pe
  }, r2 = "\\.([0-9](_?[0-9])*)", s2 = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", o2 = {
    className: "number",
    variants: [{
      begin: `(\\b(${s2})((${r2})|\\.)?|(${r2}))[eE][+-]?([0-9](_?[0-9])*)\\b`
    }, {
      begin: `\\b(${s2})\\b((${r2})\\b|\\.)?|(${r2})\\b`
    }, {
      begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
    }, {
      begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
    }, {
      begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
    }, {
      begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
    }, {
      begin: "\\b0[0-7]+n?\\b"
    }],
    relevance: 0
  }, l2 = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: i2,
    contains: []
  }, c2 = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [e2.BACKSLASH_ESCAPE, l2],
      subLanguage: "xml"
    }
  }, d2 = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [e2.BACKSLASH_ESCAPE, l2],
      subLanguage: "css"
    }
  }, g2 = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [e2.BACKSLASH_ESCAPE, l2]
  }, u2 = {
    className: "comment",
    variants: [e2.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
      relevance: 0,
      contains: [{
        begin: "(?=@[A-Za-z]+)",
        relevance: 0,
        contains: [{
          className: "doctag",
          begin: "@[A-Za-z]+"
        }, {
          className: "type",
          begin: "\\{",
          end: "\\}",
          excludeEnd: true,
          excludeBegin: true,
          relevance: 0
        }, {
          className: "variable",
          begin: t2 + "(?=\\s*(-)|$)",
          endsParent: true,
          relevance: 0
        }, {
          begin: /(?=[^\n])\s/,
          relevance: 0
        }]
      }]
    }), e2.C_BLOCK_COMMENT_MODE, e2.C_LINE_COMMENT_MODE]
  }, b2 = [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, c2, d2, g2, {
    match: /\$\d+/
  }, o2];
  l2.contains = b2.concat({
    begin: /\{/,
    end: /\}/,
    keywords: i2,
    contains: ["self"].concat(b2)
  });
  const m2 = [].concat(u2, l2.contains), p2 = m2.concat([{
    begin: /\(/,
    end: /\)/,
    keywords: i2,
    contains: ["self"].concat(m2)
  }]), _2 = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: i2,
    contains: p2
  }, h2 = {
    variants: [{
      match: [/class/, /\s+/, t2, /\s+/, /extends/, /\s+/, n2.concat(t2, "(", n2.concat(/\./, t2), ")*")],
      scope: {
        1: "keyword",
        3: "title.class",
        5: "keyword",
        7: "title.class.inherited"
      }
    }, {
      match: [/class/, /\s+/, t2],
      scope: {
        1: "keyword",
        3: "title.class"
      }
    }]
  }, f2 = {
    relevance: 0,
    match: n2.either(
      /\bJSON/,
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
    ),
    className: "title.class",
    keywords: {
      _: [...ue, ...be]
    }
  }, E2 = {
    variants: [{
      match: [/function/, /\s+/, t2, /(?=\s*\()/]
    }, {
      match: [/function/, /\s*(?=\()/]
    }],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [_2],
    illegal: /%/
  }, y2 = {
    match: n2.concat(/\b/, (w2 = [...me, "super", "import"], n2.concat("(?!", w2.join("|"), ")")), t2, n2.lookahead(/\(/)),
    className: "title.function",
    relevance: 0
  };
  var w2;
  const N2 = {
    begin: n2.concat(/\./, n2.lookahead(n2.concat(t2, /(?![0-9A-Za-z$_(])/))),
    end: t2,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, v2 = {
    match: [/get|set/, /\s+/, t2, /(?=\()/],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [{
      begin: /\(\)/
    }, _2]
  }, O2 = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e2.UNDERSCORE_IDENT_RE + ")\\s*=>", k2 = {
    match: [/const|var|let/, /\s+/, t2, /\s*/, /=\s*/, /(async\s*)?/, n2.lookahead(O2)],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [_2]
  };
  return {
    name: "Javascript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: i2,
    exports: {
      PARAMS_CONTAINS: p2,
      CLASS_REFERENCE: f2
    },
    illegal: /#(?![$_A-z])/,
    contains: [e2.SHEBANG({
      label: "shebang",
      binary: "node",
      relevance: 5
    }), {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, c2, d2, g2, u2, {
      match: /\$\d+/
    }, o2, f2, {
      className: "attr",
      begin: t2 + n2.lookahead(":"),
      relevance: 0
    }, k2, {
      begin: "(" + e2.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
      keywords: "return throw case",
      relevance: 0,
      contains: [u2, e2.REGEXP_MODE, {
        className: "function",
        begin: O2,
        returnBegin: true,
        end: "\\s*=>",
        contains: [{
          className: "params",
          variants: [{
            begin: e2.UNDERSCORE_IDENT_RE,
            relevance: 0
          }, {
            className: null,
            begin: /\(\s*\)/,
            skip: true
          }, {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: i2,
            contains: p2
          }]
        }]
      }, {
        begin: /,/,
        relevance: 0
      }, {
        match: /\s+/,
        relevance: 0
      }, {
        variants: [{
          begin: "<>",
          end: "</>"
        }, {
          match: /<[A-Za-z0-9\\._:-]+\s*\/>/
        }, {
          begin: a2.begin,
          "on:begin": a2.isTrulyOpeningTag,
          end: a2.end
        }],
        subLanguage: "xml",
        contains: [{
          begin: a2.begin,
          end: a2.end,
          skip: true,
          contains: ["self"]
        }]
      }]
    }, E2, {
      beginKeywords: "while if switch catch for"
    }, {
      begin: "\\b(?!function)" + e2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
      returnBegin: true,
      label: "func.def",
      contains: [_2, e2.inherit(e2.TITLE_MODE, {
        begin: t2,
        className: "title.function"
      })]
    }, {
      match: /\.\.\./,
      relevance: 0
    }, N2, {
      match: "\\$" + t2,
      relevance: 0
    }, {
      match: [/\bconstructor(?=\s*\()/],
      className: {
        1: "title.function"
      },
      contains: [_2]
    }, y2, {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    }, h2, v2, {
      match: /\$[(.]/
    }]
  };
}
const fe = (e2) => m(/\b/, e2, /\w$/.test(e2) ? /\b/ : /\B/), Ee = ["Protocol", "Type"].map(fe), ye = ["init", "self"].map(fe), we = ["Any", "Self"], Ne = [
  "actor",
  "any",
  "associatedtype",
  "async",
  "await",
  /as\?/,
  /as!/,
  "as",
  "break",
  "case",
  "catch",
  "class",
  "continue",
  "convenience",
  "default",
  "defer",
  "deinit",
  "didSet",
  "distributed",
  "do",
  "dynamic",
  "else",
  "enum",
  "extension",
  "fallthrough",
  /fileprivate\(set\)/,
  "fileprivate",
  "final",
  "for",
  "func",
  "get",
  "guard",
  "if",
  "import",
  "indirect",
  "infix",
  /init\?/,
  /init!/,
  "inout",
  /internal\(set\)/,
  "internal",
  "in",
  "is",
  "isolated",
  "nonisolated",
  "lazy",
  "let",
  "mutating",
  "nonmutating",
  /open\(set\)/,
  "open",
  "operator",
  "optional",
  "override",
  "postfix",
  "precedencegroup",
  "prefix",
  /private\(set\)/,
  "private",
  "protocol",
  /public\(set\)/,
  "public",
  "repeat",
  "required",
  "rethrows",
  "return",
  "set",
  "some",
  "static",
  "struct",
  "subscript",
  "super",
  "switch",
  "throws",
  "throw",
  /try\?/,
  /try!/,
  "try",
  "typealias",
  /unowned\(safe\)/,
  /unowned\(unsafe\)/,
  "unowned",
  "var",
  "weak",
  "where",
  "while",
  "willSet"
], ve = ["false", "nil", "true"], Oe = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"], ke = [
  "#colorLiteral",
  "#column",
  "#dsohandle",
  "#else",
  "#elseif",
  "#endif",
  "#error",
  "#file",
  "#fileID",
  "#fileLiteral",
  "#filePath",
  "#function",
  "#if",
  "#imageLiteral",
  "#keyPath",
  "#line",
  "#selector",
  "#sourceLocation",
  "#warn_unqualified_access",
  "#warning"
], xe = [
  "abs",
  "all",
  "any",
  "assert",
  "assertionFailure",
  "debugPrint",
  "dump",
  "fatalError",
  "getVaList",
  "isKnownUniquelyReferenced",
  "max",
  "min",
  "numericCast",
  "pointwiseMax",
  "pointwiseMin",
  "precondition",
  "preconditionFailure",
  "print",
  "readLine",
  "repeatElement",
  "sequence",
  "stride",
  "swap",
  "swift_unboxFromSwiftValueWithType",
  "transcode",
  "type",
  "unsafeBitCast",
  "unsafeDowncast",
  "withExtendedLifetime",
  "withUnsafeMutablePointer",
  "withUnsafePointer",
  "withVaList",
  "withoutActuallyEscaping",
  "zip"
], Me = p(
  /[/=\-+!*%<>&|^~?]/,
  /[\u00A1-\u00A7]/,
  /[\u00A9\u00AB]/,
  /[\u00AC\u00AE]/,
  /[\u00B0\u00B1]/,
  /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
  /[\u2016-\u2017]/,
  /[\u2020-\u2027]/,
  /[\u2030-\u203E]/,
  /[\u2041-\u2053]/,
  /[\u2055-\u205E]/,
  /[\u2190-\u23FF]/,
  /[\u2500-\u2775]/,
  /[\u2794-\u2BFF]/,
  /[\u2E00-\u2E7F]/,
  /[\u3001-\u3003]/,
  /[\u3008-\u3020]/,
  /[\u3030]/
), Se = p(Me, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/), Ae = m(Me, Se, "*"), Ce = p(
  /[a-zA-Z_]/,
  /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,
  /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,
  /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,
  /[\u1E00-\u1FFF]/,
  /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,
  /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,
  /[\u2C00-\u2DFF\u2E80-\u2FFF]/,
  /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,
  /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,
  /[\uFE47-\uFEFE\uFF00-\uFFFD]/
), Te = p(Ce, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/), Re = m(Ce, Te, "*"), De = m(/[A-Z]/, Te, "*"), Ie = [
  "autoclosure",
  m(/convention\(/, p("swift", "block", "c"), /\)/),
  "discardableResult",
  "dynamicCallable",
  "dynamicMemberLookup",
  "escaping",
  "frozen",
  "GKInspectable",
  "IBAction",
  "IBDesignable",
  "IBInspectable",
  "IBOutlet",
  "IBSegueAction",
  "inlinable",
  "main",
  "nonobjc",
  "NSApplicationMain",
  "NSCopying",
  "NSManaged",
  m(
    /objc\(/,
    Re,
    /\)/
  ),
  "objc",
  "objcMembers",
  "propertyWrapper",
  "requires_stored_property_inits",
  "resultBuilder",
  "testable",
  "UIApplicationMain",
  "unknown",
  "usableFromInline"
], Le = [
  "iOS",
  "iOSApplicationExtension",
  "macOS",
  "macOSApplicationExtension",
  "macCatalyst",
  "macCatalystApplicationExtension",
  "watchOS",
  "watchOSApplicationExtension",
  "tvOS",
  "tvOSApplicationExtension",
  "swift"
];
var Be = Object.freeze({
  __proto__: null,
  grmr_bash: (e2) => {
    const n2 = e2.regex, t2 = {}, a2 = {
      begin: /\$\{/,
      end: /\}/,
      contains: ["self", {
        begin: /:-/,
        contains: [t2]
      }]
    };
    Object.assign(t2, {
      className: "variable",
      variants: [{
        begin: n2.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
      }, a2]
    });
    const i2 = {
      className: "subst",
      begin: /\$\(/,
      end: /\)/,
      contains: [e2.BACKSLASH_ESCAPE]
    }, r2 = {
      begin: /<<-?\s*(?=\w+)/,
      starts: {
        contains: [e2.END_SAME_AS_BEGIN({
          begin: /(\w+)/,
          end: /(\w+)/,
          className: "string"
        })]
      }
    }, s2 = {
      className: "string",
      begin: /"/,
      end: /"/,
      contains: [e2.BACKSLASH_ESCAPE, t2, i2]
    };
    i2.contains.push(s2);
    const o2 = {
      begin: /\$?\(\(/,
      end: /\)\)/,
      contains: [{
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      }, e2.NUMBER_MODE, t2]
    }, l2 = e2.SHEBANG({
      binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
      relevance: 10
    }), c2 = {
      className: "function",
      begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
      returnBegin: true,
      contains: [e2.inherit(e2.TITLE_MODE, {
        begin: /\w[\w\d_]*/
      })],
      relevance: 0
    };
    return {
      name: "Bash",
      aliases: ["sh"],
      keywords: {
        $pattern: /\b[a-z][a-z0-9._-]+\b/,
        keyword: [
          "if",
          "then",
          "else",
          "elif",
          "fi",
          "for",
          "while",
          "in",
          "do",
          "done",
          "case",
          "esac",
          "function"
        ],
        literal: ["true", "false"],
        built_in: [
          "break",
          "cd",
          "continue",
          "eval",
          "exec",
          "exit",
          "export",
          "getopts",
          "hash",
          "pwd",
          "readonly",
          "return",
          "shift",
          "test",
          "times",
          "trap",
          "umask",
          "unset",
          "alias",
          "bind",
          "builtin",
          "caller",
          "command",
          "declare",
          "echo",
          "enable",
          "help",
          "let",
          "local",
          "logout",
          "mapfile",
          "printf",
          "read",
          "readarray",
          "source",
          "type",
          "typeset",
          "ulimit",
          "unalias",
          "set",
          "shopt",
          "autoload",
          "bg",
          "bindkey",
          "bye",
          "cap",
          "chdir",
          "clone",
          "comparguments",
          "compcall",
          "compctl",
          "compdescribe",
          "compfiles",
          "compgroups",
          "compquote",
          "comptags",
          "comptry",
          "compvalues",
          "dirs",
          "disable",
          "disown",
          "echotc",
          "echoti",
          "emulate",
          "fc",
          "fg",
          "float",
          "functions",
          "getcap",
          "getln",
          "history",
          "integer",
          "jobs",
          "kill",
          "limit",
          "log",
          "noglob",
          "popd",
          "print",
          "pushd",
          "pushln",
          "rehash",
          "sched",
          "setcap",
          "setopt",
          "stat",
          "suspend",
          "ttyctl",
          "unfunction",
          "unhash",
          "unlimit",
          "unsetopt",
          "vared",
          "wait",
          "whence",
          "where",
          "which",
          "zcompile",
          "zformat",
          "zftp",
          "zle",
          "zmodload",
          "zparseopts",
          "zprof",
          "zpty",
          "zregexparse",
          "zsocket",
          "zstyle",
          "ztcp",
          "chcon",
          "chgrp",
          "chown",
          "chmod",
          "cp",
          "dd",
          "df",
          "dir",
          "dircolors",
          "ln",
          "ls",
          "mkdir",
          "mkfifo",
          "mknod",
          "mktemp",
          "mv",
          "realpath",
          "rm",
          "rmdir",
          "shred",
          "sync",
          "touch",
          "truncate",
          "vdir",
          "b2sum",
          "base32",
          "base64",
          "cat",
          "cksum",
          "comm",
          "csplit",
          "cut",
          "expand",
          "fmt",
          "fold",
          "head",
          "join",
          "md5sum",
          "nl",
          "numfmt",
          "od",
          "paste",
          "ptx",
          "pr",
          "sha1sum",
          "sha224sum",
          "sha256sum",
          "sha384sum",
          "sha512sum",
          "shuf",
          "sort",
          "split",
          "sum",
          "tac",
          "tail",
          "tr",
          "tsort",
          "unexpand",
          "uniq",
          "wc",
          "arch",
          "basename",
          "chroot",
          "date",
          "dirname",
          "du",
          "echo",
          "env",
          "expr",
          "factor",
          "groups",
          "hostid",
          "id",
          "link",
          "logname",
          "nice",
          "nohup",
          "nproc",
          "pathchk",
          "pinky",
          "printenv",
          "printf",
          "pwd",
          "readlink",
          "runcon",
          "seq",
          "sleep",
          "stat",
          "stdbuf",
          "stty",
          "tee",
          "test",
          "timeout",
          "tty",
          "uname",
          "unlink",
          "uptime",
          "users",
          "who",
          "whoami",
          "yes"
        ]
      },
      contains: [l2, e2.SHEBANG(), c2, o2, e2.HASH_COMMENT_MODE, r2, {
        match: /(\/[a-z._-]+)+/
      }, s2, {
        className: "",
        begin: /\\"/
      }, {
        className: "string",
        begin: /'/,
        end: /'/
      }, t2]
    };
  },
  grmr_c: (e2) => {
    const n2 = e2.regex, t2 = e2.COMMENT("//", "$", {
      contains: [{
        begin: /\\\n/
      }]
    }), a2 = "[a-zA-Z_]\\w*::", i2 = "(decltype\\(auto\\)|" + n2.optional(a2) + "[a-zA-Z_]\\w*" + n2.optional("<[^<>]+>") + ")", r2 = {
      className: "type",
      variants: [{
        begin: "\\b[a-z\\d_]*_t\\b"
      }, {
        match: /\batomic_[a-z]{3,6}\b/
      }]
    }, s2 = {
      className: "string",
      variants: [{
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
        end: "'",
        illegal: "."
      }, e2.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })]
    }, o2 = {
      className: "number",
      variants: [{
        begin: "\\b(0b[01']+)"
      }, {
        begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
      }, {
        begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
      }],
      relevance: 0
    }, l2 = {
      className: "meta",
      begin: /#\s*[a-z]+\b/,
      end: /$/,
      keywords: {
        keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
      },
      contains: [{
        begin: /\\\n/,
        relevance: 0
      }, e2.inherit(s2, {
        className: "string"
      }), {
        className: "string",
        begin: /<.*?>/
      }, t2, e2.C_BLOCK_COMMENT_MODE]
    }, c2 = {
      className: "title",
      begin: n2.optional(a2) + e2.IDENT_RE,
      relevance: 0
    }, d2 = n2.optional(a2) + e2.IDENT_RE + "\\s*\\(", g2 = {
      keyword: [
        "asm",
        "auto",
        "break",
        "case",
        "continue",
        "default",
        "do",
        "else",
        "enum",
        "extern",
        "for",
        "fortran",
        "goto",
        "if",
        "inline",
        "register",
        "restrict",
        "return",
        "sizeof",
        "struct",
        "switch",
        "typedef",
        "union",
        "volatile",
        "while",
        "_Alignas",
        "_Alignof",
        "_Atomic",
        "_Generic",
        "_Noreturn",
        "_Static_assert",
        "_Thread_local",
        "alignas",
        "alignof",
        "noreturn",
        "static_assert",
        "thread_local",
        "_Pragma"
      ],
      type: [
        "float",
        "double",
        "signed",
        "unsigned",
        "int",
        "short",
        "long",
        "char",
        "void",
        "_Bool",
        "_Complex",
        "_Imaginary",
        "_Decimal32",
        "_Decimal64",
        "_Decimal128",
        "const",
        "static",
        "complex",
        "bool",
        "imaginary"
      ],
      literal: "true false NULL",
      built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
    }, u2 = [l2, r2, t2, e2.C_BLOCK_COMMENT_MODE, o2, s2], b2 = {
      variants: [{
        begin: /=/,
        end: /;/
      }, {
        begin: /\(/,
        end: /\)/
      }, {
        beginKeywords: "new throw return else",
        end: /;/
      }],
      keywords: g2,
      contains: u2.concat([{
        begin: /\(/,
        end: /\)/,
        keywords: g2,
        contains: u2.concat(["self"]),
        relevance: 0
      }]),
      relevance: 0
    }, m2 = {
      begin: "(" + i2 + "[\\*&\\s]+)+" + d2,
      returnBegin: true,
      end: /[{;=]/,
      excludeEnd: true,
      keywords: g2,
      illegal: /[^\w\s\*&:<>.]/,
      contains: [{
        begin: "decltype\\(auto\\)",
        keywords: g2,
        relevance: 0
      }, {
        begin: d2,
        returnBegin: true,
        contains: [e2.inherit(c2, {
          className: "title.function"
        })],
        relevance: 0
      }, {
        relevance: 0,
        match: /,/
      }, {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: g2,
        relevance: 0,
        contains: [t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2, {
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          relevance: 0,
          contains: ["self", t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2]
        }]
      }, r2, t2, e2.C_BLOCK_COMMENT_MODE, l2]
    };
    return {
      name: "C",
      aliases: ["h"],
      keywords: g2,
      disableAutodetect: true,
      illegal: "</",
      contains: [].concat(b2, m2, u2, [l2, {
        begin: e2.IDENT_RE + "::",
        keywords: g2
      }, {
        className: "class",
        beginKeywords: "enum class struct union",
        end: /[{;:<>=]/,
        contains: [{
          beginKeywords: "final class struct"
        }, e2.TITLE_MODE]
      }]),
      exports: {
        preprocessor: l2,
        strings: s2,
        keywords: g2
      }
    };
  },
  grmr_cpp: (e2) => {
    const n2 = e2.regex, t2 = e2.COMMENT("//", "$", {
      contains: [{
        begin: /\\\n/
      }]
    }), a2 = "[a-zA-Z_]\\w*::", i2 = "(?!struct)(decltype\\(auto\\)|" + n2.optional(a2) + "[a-zA-Z_]\\w*" + n2.optional("<[^<>]+>") + ")", r2 = {
      className: "type",
      begin: "\\b[a-z\\d_]*_t\\b"
    }, s2 = {
      className: "string",
      variants: [{
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
        end: "'",
        illegal: "."
      }, e2.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })]
    }, o2 = {
      className: "number",
      variants: [{
        begin: "\\b(0b[01']+)"
      }, {
        begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
      }, {
        begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
      }],
      relevance: 0
    }, l2 = {
      className: "meta",
      begin: /#\s*[a-z]+\b/,
      end: /$/,
      keywords: {
        keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
      },
      contains: [{
        begin: /\\\n/,
        relevance: 0
      }, e2.inherit(s2, {
        className: "string"
      }), {
        className: "string",
        begin: /<.*?>/
      }, t2, e2.C_BLOCK_COMMENT_MODE]
    }, c2 = {
      className: "title",
      begin: n2.optional(a2) + e2.IDENT_RE,
      relevance: 0
    }, d2 = n2.optional(a2) + e2.IDENT_RE + "\\s*\\(", g2 = {
      type: [
        "bool",
        "char",
        "char16_t",
        "char32_t",
        "char8_t",
        "double",
        "float",
        "int",
        "long",
        "short",
        "void",
        "wchar_t",
        "unsigned",
        "signed",
        "const",
        "static"
      ],
      keyword: [
        "alignas",
        "alignof",
        "and",
        "and_eq",
        "asm",
        "atomic_cancel",
        "atomic_commit",
        "atomic_noexcept",
        "auto",
        "bitand",
        "bitor",
        "break",
        "case",
        "catch",
        "class",
        "co_await",
        "co_return",
        "co_yield",
        "compl",
        "concept",
        "const_cast|10",
        "consteval",
        "constexpr",
        "constinit",
        "continue",
        "decltype",
        "default",
        "delete",
        "do",
        "dynamic_cast|10",
        "else",
        "enum",
        "explicit",
        "export",
        "extern",
        "false",
        "final",
        "for",
        "friend",
        "goto",
        "if",
        "import",
        "inline",
        "module",
        "mutable",
        "namespace",
        "new",
        "noexcept",
        "not",
        "not_eq",
        "nullptr",
        "operator",
        "or",
        "or_eq",
        "override",
        "private",
        "protected",
        "public",
        "reflexpr",
        "register",
        "reinterpret_cast|10",
        "requires",
        "return",
        "sizeof",
        "static_assert",
        "static_cast|10",
        "struct",
        "switch",
        "synchronized",
        "template",
        "this",
        "thread_local",
        "throw",
        "transaction_safe",
        "transaction_safe_dynamic",
        "true",
        "try",
        "typedef",
        "typeid",
        "typename",
        "union",
        "using",
        "virtual",
        "volatile",
        "while",
        "xor",
        "xor_eq"
      ],
      literal: ["NULL", "false", "nullopt", "nullptr", "true"],
      built_in: ["_Pragma"],
      _type_hints: [
        "any",
        "auto_ptr",
        "barrier",
        "binary_semaphore",
        "bitset",
        "complex",
        "condition_variable",
        "condition_variable_any",
        "counting_semaphore",
        "deque",
        "false_type",
        "future",
        "imaginary",
        "initializer_list",
        "istringstream",
        "jthread",
        "latch",
        "lock_guard",
        "multimap",
        "multiset",
        "mutex",
        "optional",
        "ostringstream",
        "packaged_task",
        "pair",
        "promise",
        "priority_queue",
        "queue",
        "recursive_mutex",
        "recursive_timed_mutex",
        "scoped_lock",
        "set",
        "shared_future",
        "shared_lock",
        "shared_mutex",
        "shared_timed_mutex",
        "shared_ptr",
        "stack",
        "string_view",
        "stringstream",
        "timed_mutex",
        "thread",
        "true_type",
        "tuple",
        "unique_lock",
        "unique_ptr",
        "unordered_map",
        "unordered_multimap",
        "unordered_multiset",
        "unordered_set",
        "variant",
        "vector",
        "weak_ptr",
        "wstring",
        "wstring_view"
      ]
    }, u2 = {
      className: "function.dispatch",
      relevance: 0,
      keywords: {
        _hint: [
          "abort",
          "abs",
          "acos",
          "apply",
          "as_const",
          "asin",
          "atan",
          "atan2",
          "calloc",
          "ceil",
          "cerr",
          "cin",
          "clog",
          "cos",
          "cosh",
          "cout",
          "declval",
          "endl",
          "exchange",
          "exit",
          "exp",
          "fabs",
          "floor",
          "fmod",
          "forward",
          "fprintf",
          "fputs",
          "free",
          "frexp",
          "fscanf",
          "future",
          "invoke",
          "isalnum",
          "isalpha",
          "iscntrl",
          "isdigit",
          "isgraph",
          "islower",
          "isprint",
          "ispunct",
          "isspace",
          "isupper",
          "isxdigit",
          "labs",
          "launder",
          "ldexp",
          "log",
          "log10",
          "make_pair",
          "make_shared",
          "make_shared_for_overwrite",
          "make_tuple",
          "make_unique",
          "malloc",
          "memchr",
          "memcmp",
          "memcpy",
          "memset",
          "modf",
          "move",
          "pow",
          "printf",
          "putchar",
          "puts",
          "realloc",
          "scanf",
          "sin",
          "sinh",
          "snprintf",
          "sprintf",
          "sqrt",
          "sscanf",
          "std",
          "stderr",
          "stdin",
          "stdout",
          "strcat",
          "strchr",
          "strcmp",
          "strcpy",
          "strcspn",
          "strlen",
          "strncat",
          "strncmp",
          "strncpy",
          "strpbrk",
          "strrchr",
          "strspn",
          "strstr",
          "swap",
          "tan",
          "tanh",
          "terminate",
          "to_underlying",
          "tolower",
          "toupper",
          "vfprintf",
          "visit",
          "vprintf",
          "vsprintf"
        ]
      },
      begin: n2.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e2.IDENT_RE, n2.lookahead(/(<[^<>]+>|)\s*\(/))
    }, b2 = [u2, l2, r2, t2, e2.C_BLOCK_COMMENT_MODE, o2, s2], m2 = {
      variants: [{
        begin: /=/,
        end: /;/
      }, {
        begin: /\(/,
        end: /\)/
      }, {
        beginKeywords: "new throw return else",
        end: /;/
      }],
      keywords: g2,
      contains: b2.concat([{
        begin: /\(/,
        end: /\)/,
        keywords: g2,
        contains: b2.concat(["self"]),
        relevance: 0
      }]),
      relevance: 0
    }, p2 = {
      className: "function",
      begin: "(" + i2 + "[\\*&\\s]+)+" + d2,
      returnBegin: true,
      end: /[{;=]/,
      excludeEnd: true,
      keywords: g2,
      illegal: /[^\w\s\*&:<>.]/,
      contains: [{
        begin: "decltype\\(auto\\)",
        keywords: g2,
        relevance: 0
      }, {
        begin: d2,
        returnBegin: true,
        contains: [c2],
        relevance: 0
      }, {
        begin: /::/,
        relevance: 0
      }, {
        begin: /:/,
        endsWithParent: true,
        contains: [s2, o2]
      }, {
        relevance: 0,
        match: /,/
      }, {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: g2,
        relevance: 0,
        contains: [t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2, {
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          relevance: 0,
          contains: ["self", t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2]
        }]
      }, r2, t2, e2.C_BLOCK_COMMENT_MODE, l2]
    };
    return {
      name: "C++",
      aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
      keywords: g2,
      illegal: "</",
      classNameAliases: {
        "function.dispatch": "built_in"
      },
      contains: [].concat(m2, p2, u2, b2, [l2, {
        begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
        end: ">",
        keywords: g2,
        contains: ["self", r2]
      }, {
        begin: e2.IDENT_RE + "::",
        keywords: g2
      }, {
        match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/],
        className: {
          1: "keyword",
          3: "title.class"
        }
      }])
    };
  },
  grmr_csharp: (e2) => {
    const n2 = {
      keyword: [
        "abstract",
        "as",
        "base",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "do",
        "else",
        "event",
        "explicit",
        "extern",
        "finally",
        "fixed",
        "for",
        "foreach",
        "goto",
        "if",
        "implicit",
        "in",
        "interface",
        "internal",
        "is",
        "lock",
        "namespace",
        "new",
        "operator",
        "out",
        "override",
        "params",
        "private",
        "protected",
        "public",
        "readonly",
        "record",
        "ref",
        "return",
        "scoped",
        "sealed",
        "sizeof",
        "stackalloc",
        "static",
        "struct",
        "switch",
        "this",
        "throw",
        "try",
        "typeof",
        "unchecked",
        "unsafe",
        "using",
        "virtual",
        "void",
        "volatile",
        "while"
      ].concat([
        "add",
        "alias",
        "and",
        "ascending",
        "async",
        "await",
        "by",
        "descending",
        "equals",
        "from",
        "get",
        "global",
        "group",
        "init",
        "into",
        "join",
        "let",
        "nameof",
        "not",
        "notnull",
        "on",
        "or",
        "orderby",
        "partial",
        "remove",
        "select",
        "set",
        "unmanaged",
        "value|0",
        "var",
        "when",
        "where",
        "with",
        "yield"
      ]),
      built_in: [
        "bool",
        "byte",
        "char",
        "decimal",
        "delegate",
        "double",
        "dynamic",
        "enum",
        "float",
        "int",
        "long",
        "nint",
        "nuint",
        "object",
        "sbyte",
        "short",
        "string",
        "ulong",
        "uint",
        "ushort"
      ],
      literal: ["default", "false", "null", "true"]
    }, t2 = e2.inherit(e2.TITLE_MODE, {
      begin: "[a-zA-Z](\\.?\\w)*"
    }), a2 = {
      className: "number",
      variants: [{
        begin: "\\b(0b[01']+)"
      }, {
        begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
      }, {
        begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
      }],
      relevance: 0
    }, i2 = {
      className: "string",
      begin: '@"',
      end: '"',
      contains: [{
        begin: '""'
      }]
    }, r2 = e2.inherit(i2, {
      illegal: /\n/
    }), s2 = {
      className: "subst",
      begin: /\{/,
      end: /\}/,
      keywords: n2
    }, o2 = e2.inherit(s2, {
      illegal: /\n/
    }), l2 = {
      className: "string",
      begin: /\$"/,
      end: '"',
      illegal: /\n/,
      contains: [{
        begin: /\{\{/
      }, {
        begin: /\}\}/
      }, e2.BACKSLASH_ESCAPE, o2]
    }, c2 = {
      className: "string",
      begin: /\$@"/,
      end: '"',
      contains: [{
        begin: /\{\{/
      }, {
        begin: /\}\}/
      }, {
        begin: '""'
      }, s2]
    }, d2 = e2.inherit(c2, {
      illegal: /\n/,
      contains: [{
        begin: /\{\{/
      }, {
        begin: /\}\}/
      }, {
        begin: '""'
      }, o2]
    });
    s2.contains = [c2, l2, i2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, a2, e2.C_BLOCK_COMMENT_MODE], o2.contains = [d2, l2, r2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, a2, e2.inherit(e2.C_BLOCK_COMMENT_MODE, {
      illegal: /\n/
    })];
    const g2 = {
      variants: [c2, l2, i2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
    }, u2 = {
      begin: "<",
      end: ">",
      contains: [{
        beginKeywords: "in out"
      }, t2]
    }, b2 = e2.IDENT_RE + "(<" + e2.IDENT_RE + "(\\s*,\\s*" + e2.IDENT_RE + ")*>)?(\\[\\])?", m2 = {
      begin: "@" + e2.IDENT_RE,
      relevance: 0
    };
    return {
      name: "C#",
      aliases: ["cs", "c#"],
      keywords: n2,
      illegal: /::/,
      contains: [e2.COMMENT("///", "$", {
        returnBegin: true,
        contains: [{
          className: "doctag",
          variants: [{
            begin: "///",
            relevance: 0
          }, {
            begin: "<!--|-->"
          }, {
            begin: "</?",
            end: ">"
          }]
        }]
      }), e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          keyword: "if else elif endif define undef warning error line region endregion pragma checksum"
        }
      }, g2, a2, {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [{
          beginKeywords: "where class"
        }, t2, u2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, {
        beginKeywords: "namespace",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [t2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, {
        beginKeywords: "record",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [t2, u2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, {
        className: "meta",
        begin: "^\\s*\\[(?=[\\w])",
        excludeBegin: true,
        end: "\\]",
        excludeEnd: true,
        contains: [{
          className: "string",
          begin: /"/,
          end: /"/
        }]
      }, {
        beginKeywords: "new return throw await else",
        relevance: 0
      }, {
        className: "function",
        begin: "(" + b2 + "\\s+)+" + e2.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
        returnBegin: true,
        end: /\s*[{;=]/,
        excludeEnd: true,
        keywords: n2,
        contains: [{
          beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
          relevance: 0
        }, {
          begin: e2.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
          returnBegin: true,
          contains: [e2.TITLE_MODE, u2],
          relevance: 0
        }, {
          match: /\(\)/
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          keywords: n2,
          relevance: 0,
          contains: [g2, a2, e2.C_BLOCK_COMMENT_MODE]
        }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, m2]
    };
  },
  grmr_css: (e2) => {
    const n2 = e2.regex, t2 = J(e2), a2 = [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE];
    return {
      name: "CSS",
      case_insensitive: true,
      illegal: /[=|'\$]/,
      keywords: {
        keyframePosition: "from to"
      },
      classNameAliases: {
        keyframePosition: "selector-tag"
      },
      contains: [t2.BLOCK_COMMENT, {
        begin: /-(webkit|moz|ms|o)-(?=[a-z])/
      }, t2.CSS_NUMBER_MODE, {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      }, {
        className: "selector-class",
        begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
        relevance: 0
      }, t2.ATTRIBUTE_SELECTOR_MODE, {
        className: "selector-pseudo",
        variants: [{
          begin: ":(" + ne.join("|") + ")"
        }, {
          begin: ":(:)?(" + te.join("|") + ")"
        }]
      }, t2.CSS_VARIABLE, {
        className: "attribute",
        begin: "\\b(" + ae.join("|") + ")\\b"
      }, {
        begin: /:/,
        end: /[;}{]/,
        contains: [t2.BLOCK_COMMENT, t2.HEXCOLOR, t2.IMPORTANT, t2.CSS_NUMBER_MODE, ...a2, {
          begin: /(url|data-uri)\(/,
          end: /\)/,
          relevance: 0,
          keywords: {
            built_in: "url data-uri"
          },
          contains: [...a2, {
            className: "string",
            begin: /[^)]/,
            endsWithParent: true,
            excludeEnd: true
          }]
        }, t2.FUNCTION_DISPATCH]
      }, {
        begin: n2.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [{
          className: "keyword",
          begin: /@-?\w[\w]*(-\w+)*/
        }, {
          begin: /\s/,
          endsWithParent: true,
          excludeEnd: true,
          relevance: 0,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: "and or not only",
            attribute: ee.join(" ")
          },
          contains: [{
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          }, ...a2, t2.CSS_NUMBER_MODE]
        }]
      }, {
        className: "selector-tag",
        begin: "\\b(" + Y.join("|") + ")\\b"
      }]
    };
  },
  grmr_diff: (e2) => {
    const n2 = e2.regex;
    return {
      name: "Diff",
      aliases: ["patch"],
      contains: [{
        className: "meta",
        relevance: 10,
        match: n2.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/)
      }, {
        className: "comment",
        variants: [{
          begin: n2.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/),
          end: /$/
        }, {
          match: /^\*{15}$/
        }]
      }, {
        className: "addition",
        begin: /^\+/,
        end: /$/
      }, {
        className: "deletion",
        begin: /^-/,
        end: /$/
      }, {
        className: "addition",
        begin: /^!/,
        end: /$/
      }]
    };
  },
  grmr_go: (e2) => {
    const n2 = {
      keyword: [
        "break",
        "case",
        "chan",
        "const",
        "continue",
        "default",
        "defer",
        "else",
        "fallthrough",
        "for",
        "func",
        "go",
        "goto",
        "if",
        "import",
        "interface",
        "map",
        "package",
        "range",
        "return",
        "select",
        "struct",
        "switch",
        "type",
        "var"
      ],
      type: [
        "bool",
        "byte",
        "complex64",
        "complex128",
        "error",
        "float32",
        "float64",
        "int8",
        "int16",
        "int32",
        "int64",
        "string",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "int",
        "uint",
        "uintptr",
        "rune"
      ],
      literal: ["true", "false", "iota", "nil"],
      built_in: [
        "append",
        "cap",
        "close",
        "complex",
        "copy",
        "imag",
        "len",
        "make",
        "new",
        "panic",
        "print",
        "println",
        "real",
        "recover",
        "delete"
      ]
    };
    return {
      name: "Go",
      aliases: ["golang"],
      keywords: n2,
      illegal: "</",
      contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
        className: "string",
        variants: [e2.QUOTE_STRING_MODE, e2.APOS_STRING_MODE, {
          begin: "`",
          end: "`"
        }]
      }, {
        className: "number",
        variants: [{
          begin: e2.C_NUMBER_RE + "[i]",
          relevance: 1
        }, e2.C_NUMBER_MODE]
      }, {
        begin: /:=/
      }, {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)",
        excludeEnd: true,
        contains: [e2.TITLE_MODE, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          endsParent: true,
          keywords: n2,
          illegal: /["']/
        }]
      }]
    };
  },
  grmr_graphql: (e2) => {
    const n2 = e2.regex;
    return {
      name: "GraphQL",
      aliases: ["gql"],
      case_insensitive: true,
      disableAutodetect: false,
      keywords: {
        keyword: [
          "query",
          "mutation",
          "subscription",
          "type",
          "input",
          "schema",
          "directive",
          "interface",
          "union",
          "scalar",
          "fragment",
          "enum",
          "on"
        ],
        literal: ["true", "false", "null"]
      },
      contains: [e2.HASH_COMMENT_MODE, e2.QUOTE_STRING_MODE, e2.NUMBER_MODE, {
        scope: "punctuation",
        match: /[.]{3}/,
        relevance: 0
      }, {
        scope: "punctuation",
        begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
        relevance: 0
      }, {
        scope: "variable",
        begin: /\$/,
        end: /\W/,
        excludeEnd: true,
        relevance: 0
      }, {
        scope: "meta",
        match: /@\w+/,
        excludeEnd: true
      }, {
        scope: "symbol",
        begin: n2.concat(/[_A-Za-z][_0-9A-Za-z]*/, n2.lookahead(/\s*:/)),
        relevance: 0
      }],
      illegal: [/[;<']/, /BEGIN/]
    };
  },
  grmr_ini: (e2) => {
    const n2 = e2.regex, t2 = {
      className: "number",
      relevance: 0,
      variants: [{
        begin: /([+-]+)?[\d]+_[\d_]+/
      }, {
        begin: e2.NUMBER_RE
      }]
    }, a2 = e2.COMMENT();
    a2.variants = [{
      begin: /;/,
      end: /$/
    }, {
      begin: /#/,
      end: /$/
    }];
    const i2 = {
      className: "variable",
      variants: [{
        begin: /\$[\w\d"][\w\d_]*/
      }, {
        begin: /\$\{(.*?)\}/
      }]
    }, r2 = {
      className: "literal",
      begin: /\bon|off|true|false|yes|no\b/
    }, s2 = {
      className: "string",
      contains: [e2.BACKSLASH_ESCAPE],
      variants: [{
        begin: "'''",
        end: "'''",
        relevance: 10
      }, {
        begin: '"""',
        end: '"""',
        relevance: 10
      }, {
        begin: '"',
        end: '"'
      }, {
        begin: "'",
        end: "'"
      }]
    }, o2 = {
      begin: /\[/,
      end: /\]/,
      contains: [a2, r2, i2, s2, t2, "self"],
      relevance: 0
    }, l2 = n2.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
    return {
      name: "TOML, also INI",
      aliases: ["toml"],
      case_insensitive: true,
      illegal: /\S/,
      contains: [a2, {
        className: "section",
        begin: /\[+/,
        end: /\]+/
      }, {
        begin: n2.concat(l2, "(\\s*\\.\\s*", l2, ")*", n2.lookahead(/\s*=\s*[^#\s]/)),
        className: "attr",
        starts: {
          end: /$/,
          contains: [a2, o2, r2, i2, s2, t2]
        }
      }]
    };
  },
  grmr_java: (e2) => {
    const n2 = e2.regex, t2 = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", a2 = t2 + le("(?:<" + t2 + "~~~(?:\\s*,\\s*" + t2 + "~~~)*>)?", /~~~/g, 2), i2 = {
      keyword: [
        "synchronized",
        "abstract",
        "private",
        "var",
        "static",
        "if",
        "const ",
        "for",
        "while",
        "strictfp",
        "finally",
        "protected",
        "import",
        "native",
        "final",
        "void",
        "enum",
        "else",
        "break",
        "transient",
        "catch",
        "instanceof",
        "volatile",
        "case",
        "assert",
        "package",
        "default",
        "public",
        "try",
        "switch",
        "continue",
        "throws",
        "protected",
        "public",
        "private",
        "module",
        "requires",
        "exports",
        "do",
        "sealed",
        "yield",
        "permits"
      ],
      literal: ["false", "true", "null"],
      type: ["char", "boolean", "long", "float", "int", "byte", "short", "double"],
      built_in: ["super", "this"]
    }, r2 = {
      className: "meta",
      begin: "@" + t2,
      contains: [{
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
      }]
    }, s2 = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      keywords: i2,
      relevance: 0,
      contains: [e2.C_BLOCK_COMMENT_MODE],
      endsParent: true
    };
    return {
      name: "Java",
      aliases: ["jsp"],
      keywords: i2,
      illegal: /<\/|#/,
      contains: [e2.COMMENT("/\\*\\*", "\\*/", {
        relevance: 0,
        contains: [{
          begin: /\w+@/,
          relevance: 0
        }, {
          className: "doctag",
          begin: "@[A-Za-z]+"
        }]
      }), {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [e2.BACKSLASH_ESCAPE]
      }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, {
        match: [/\b(?:class|interface|enum|extends|implements|new)/, /\s+/, t2],
        className: {
          1: "keyword",
          3: "title.class"
        }
      }, {
        match: /non-sealed/,
        scope: "keyword"
      }, {
        begin: [n2.concat(/(?!else)/, t2), /\s+/, t2, /\s+/, /=(?!=)/],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      }, {
        begin: [/record/, /\s+/, t2],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [s2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, {
        beginKeywords: "new throw return else",
        relevance: 0
      }, {
        begin: ["(?:" + a2 + "\\s+)", e2.UNDERSCORE_IDENT_RE, /\s*(?=\()/],
        className: {
          2: "title.function"
        },
        keywords: i2,
        contains: [{
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: i2,
          relevance: 0,
          contains: [r2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, oe, e2.C_BLOCK_COMMENT_MODE]
        }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
      }, oe, r2]
    };
  },
  grmr_javascript: he,
  grmr_json: (e2) => {
    const n2 = ["true", "false", "null"], t2 = {
      scope: "literal",
      beginKeywords: n2.join(" ")
    };
    return {
      name: "JSON",
      keywords: {
        literal: n2
      },
      contains: [{
        className: "attr",
        begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
        relevance: 1.01
      }, {
        match: /[{}[\],:]/,
        className: "punctuation",
        relevance: 0
      }, e2.QUOTE_STRING_MODE, t2, e2.C_NUMBER_MODE, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE],
      illegal: "\\S"
    };
  },
  grmr_kotlin: (e2) => {
    const n2 = {
      keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
      built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
      literal: "true false null"
    }, t2 = {
      className: "symbol",
      begin: e2.UNDERSCORE_IDENT_RE + "@"
    }, a2 = {
      className: "subst",
      begin: /\$\{/,
      end: /\}/,
      contains: [e2.C_NUMBER_MODE]
    }, i2 = {
      className: "variable",
      begin: "\\$" + e2.UNDERSCORE_IDENT_RE
    }, r2 = {
      className: "string",
      variants: [{
        begin: '"""',
        end: '"""(?=[^"])',
        contains: [i2, a2]
      }, {
        begin: "'",
        end: "'",
        illegal: /\n/,
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [e2.BACKSLASH_ESCAPE, i2, a2]
      }]
    };
    a2.contains.push(r2);
    const s2 = {
      className: "meta",
      begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e2.UNDERSCORE_IDENT_RE + ")?"
    }, o2 = {
      className: "meta",
      begin: "@" + e2.UNDERSCORE_IDENT_RE,
      contains: [{
        begin: /\(/,
        end: /\)/,
        contains: [e2.inherit(r2, {
          className: "string"
        }), "self"]
      }]
    }, l2 = oe, c2 = e2.COMMENT("/\\*", "\\*/", {
      contains: [e2.C_BLOCK_COMMENT_MODE]
    }), d2 = {
      variants: [{
        className: "type",
        begin: e2.UNDERSCORE_IDENT_RE
      }, {
        begin: /\(/,
        end: /\)/,
        contains: []
      }]
    }, g2 = d2;
    return g2.variants[1].contains = [d2], d2.variants[1].contains = [g2], {
      name: "Kotlin",
      aliases: ["kt", "kts"],
      keywords: n2,
      contains: [e2.COMMENT("/\\*\\*", "\\*/", {
        relevance: 0,
        contains: [{
          className: "doctag",
          begin: "@[A-Za-z]+"
        }]
      }), e2.C_LINE_COMMENT_MODE, c2, {
        className: "keyword",
        begin: /\b(break|continue|return|this)\b/,
        starts: {
          contains: [{
            className: "symbol",
            begin: /@\w+/
          }]
        }
      }, t2, s2, o2, {
        className: "function",
        beginKeywords: "fun",
        end: "[(]|$",
        returnBegin: true,
        excludeEnd: true,
        keywords: n2,
        relevance: 5,
        contains: [{
          begin: e2.UNDERSCORE_IDENT_RE + "\\s*\\(",
          returnBegin: true,
          relevance: 0,
          contains: [e2.UNDERSCORE_TITLE_MODE]
        }, {
          className: "type",
          begin: /</,
          end: />/,
          keywords: "reified",
          relevance: 0
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          endsParent: true,
          keywords: n2,
          relevance: 0,
          contains: [{
            begin: /:/,
            end: /[=,\/]/,
            endsWithParent: true,
            contains: [d2, e2.C_LINE_COMMENT_MODE, c2],
            relevance: 0
          }, e2.C_LINE_COMMENT_MODE, c2, s2, o2, r2, e2.C_NUMBER_MODE]
        }, c2]
      }, {
        begin: [/class|interface|trait/, /\s+/, e2.UNDERSCORE_IDENT_RE],
        beginScope: {
          3: "title.class"
        },
        keywords: "class interface trait",
        end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: "extends implements",
        contains: [{
          beginKeywords: "public protected internal private constructor"
        }, e2.UNDERSCORE_TITLE_MODE, {
          className: "type",
          begin: /</,
          end: />/,
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0
        }, {
          className: "type",
          begin: /[,:]\s*/,
          end: /[<\(,){\s]|$/,
          excludeBegin: true,
          returnEnd: true
        }, s2, o2]
      }, r2, {
        className: "meta",
        begin: "^#!/usr/bin/env",
        end: "$",
        illegal: "\n"
      }, l2]
    };
  },
  grmr_less: (e2) => {
    const n2 = J(e2), t2 = ie, a2 = "([\\w-]+|@\\{[\\w-]+\\})", i2 = [], r2 = [], s2 = (e3) => ({
      className: "string",
      begin: "~?" + e3 + ".*?" + e3
    }), o2 = (e3, n3, t3) => ({
      className: e3,
      begin: n3,
      relevance: t3
    }), l2 = {
      $pattern: /[a-z-]+/,
      keyword: "and or not only",
      attribute: ee.join(" ")
    }, c2 = {
      begin: "\\(",
      end: "\\)",
      contains: r2,
      keywords: l2,
      relevance: 0
    };
    r2.push(e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, s2("'"), s2('"'), n2.CSS_NUMBER_MODE, {
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: true
      }
    }, n2.HEXCOLOR, c2, o2("variable", "@@?[\\w-]+", 10), o2("variable", "@\\{[\\w-]+\\}"), o2(
      "built_in",
      "~?`[^`]*?`"
    ), {
      className: "attribute",
      begin: "[\\w-]+\\s*:",
      end: ":",
      returnBegin: true,
      excludeEnd: true
    }, n2.IMPORTANT, {
      beginKeywords: "and not"
    }, n2.FUNCTION_DISPATCH);
    const d2 = r2.concat({
      begin: /\{/,
      end: /\}/,
      contains: i2
    }), g2 = {
      beginKeywords: "when",
      endsWithParent: true,
      contains: [{
        beginKeywords: "and not"
      }].concat(r2)
    }, u2 = {
      begin: a2 + "\\s*:",
      returnBegin: true,
      end: /[;}]/,
      relevance: 0,
      contains: [{
        begin: /-(webkit|moz|ms|o)-/
      }, n2.CSS_VARIABLE, {
        className: "attribute",
        begin: "\\b(" + ae.join("|") + ")\\b",
        end: /(?=:)/,
        starts: {
          endsWithParent: true,
          illegal: "[<=$]",
          relevance: 0,
          contains: r2
        }
      }]
    }, b2 = {
      className: "keyword",
      begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
      starts: {
        end: "[;{}]",
        keywords: l2,
        returnEnd: true,
        contains: r2,
        relevance: 0
      }
    }, m2 = {
      className: "variable",
      variants: [{
        begin: "@[\\w-]+\\s*:",
        relevance: 15
      }, {
        begin: "@[\\w-]+"
      }],
      starts: {
        end: "[;}]",
        returnEnd: true,
        contains: d2
      }
    }, p2 = {
      variants: [{
        begin: "[\\.#:&\\[>]",
        end: "[;{}]"
      }, {
        begin: a2,
        end: /\{/
      }],
      returnBegin: true,
      returnEnd: true,
      illegal: `[<='$"]`,
      relevance: 0,
      contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, g2, o2("keyword", "all\\b"), o2(
        "variable",
        "@\\{[\\w-]+\\}"
      ), {
        begin: "\\b(" + Y.join("|") + ")\\b",
        className: "selector-tag"
      }, n2.CSS_NUMBER_MODE, o2("selector-tag", a2, 0), o2("selector-id", "#" + a2), o2("selector-class", "\\." + a2, 0), o2("selector-tag", "&", 0), n2.ATTRIBUTE_SELECTOR_MODE, {
        className: "selector-pseudo",
        begin: ":(" + ne.join("|") + ")"
      }, {
        className: "selector-pseudo",
        begin: ":(:)?(" + te.join("|") + ")"
      }, {
        begin: /\(/,
        end: /\)/,
        relevance: 0,
        contains: d2
      }, {
        begin: "!important"
      }, n2.FUNCTION_DISPATCH]
    }, _2 = {
      begin: `[\\w-]+:(:)?(${t2.join("|")})`,
      returnBegin: true,
      contains: [p2]
    };
    return i2.push(e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, b2, m2, _2, u2, p2, g2, n2.FUNCTION_DISPATCH), {
      name: "Less",
      case_insensitive: true,
      illegal: `[=>'/<($"]`,
      contains: i2
    };
  },
  grmr_lua: (e2) => {
    const n2 = "\\[=*\\[", t2 = "\\]=*\\]", a2 = {
      begin: n2,
      end: t2,
      contains: ["self"]
    }, i2 = [e2.COMMENT("--(?!\\[=*\\[)", "$"), e2.COMMENT("--\\[=*\\[", t2, {
      contains: [a2],
      relevance: 10
    })];
    return {
      name: "Lua",
      keywords: {
        $pattern: e2.UNDERSCORE_IDENT_RE,
        literal: "true false nil",
        keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
        built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
      },
      contains: i2.concat([{
        className: "function",
        beginKeywords: "function",
        end: "\\)",
        contains: [e2.inherit(e2.TITLE_MODE, {
          begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
        }), {
          className: "params",
          begin: "\\(",
          endsWithParent: true,
          contains: i2
        }].concat(i2)
      }, e2.C_NUMBER_MODE, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, {
        className: "string",
        begin: n2,
        end: t2,
        contains: [a2],
        relevance: 5
      }])
    };
  },
  grmr_makefile: (e2) => {
    const n2 = {
      className: "variable",
      variants: [{
        begin: "\\$\\(" + e2.UNDERSCORE_IDENT_RE + "\\)",
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: /\$[@%<?\^\+\*]/
      }]
    }, t2 = {
      className: "string",
      begin: /"/,
      end: /"/,
      contains: [e2.BACKSLASH_ESCAPE, n2]
    }, a2 = {
      className: "variable",
      begin: /\$\([\w-]+\s/,
      end: /\)/,
      keywords: {
        built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
      },
      contains: [n2]
    }, i2 = {
      begin: "^" + e2.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
    }, r2 = {
      className: "section",
      begin: /^[^\s]+:/,
      end: /$/,
      contains: [n2]
    };
    return {
      name: "Makefile",
      aliases: ["mk", "mak", "make"],
      keywords: {
        $pattern: /[\w-]+/,
        keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
      },
      contains: [e2.HASH_COMMENT_MODE, n2, t2, a2, i2, {
        className: "meta",
        begin: /^\.PHONY:/,
        end: /$/,
        keywords: {
          $pattern: /[\.\w]+/,
          keyword: ".PHONY"
        }
      }, r2]
    };
  },
  grmr_xml: (e2) => {
    const n2 = e2.regex, t2 = n2.concat(
      /(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/,
      n2.optional(
        /(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*:/
      ),
      /(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*/
    ), a2 = {
      className: "symbol",
      begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
    }, i2 = {
      begin: /\s/,
      contains: [{
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }]
    }, r2 = e2.inherit(i2, {
      begin: /\(/,
      end: /\)/
    }), s2 = e2.inherit(e2.APOS_STRING_MODE, {
      className: "string"
    }), o2 = e2.inherit(e2.QUOTE_STRING_MODE, {
      className: "string"
    }), l2 = {
      endsWithParent: true,
      illegal: /</,
      relevance: 0,
      contains: [{
        className: "attr",
        begin: /(?:[\x2D\.0-:A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])+/,
        relevance: 0
      }, {
        begin: /=\s*/,
        relevance: 0,
        contains: [{
          className: "string",
          endsParent: true,
          variants: [{
            begin: /"/,
            end: /"/,
            contains: [a2]
          }, {
            begin: /'/,
            end: /'/,
            contains: [a2]
          }, {
            begin: /[^\s"'=<>`]+/
          }]
        }]
      }]
    };
    return {
      name: "HTML, XML",
      aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
      case_insensitive: true,
      unicodeRegex: true,
      contains: [{
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [i2, o2, s2, r2, {
          begin: /\[/,
          end: /\]/,
          contains: [{
            className: "meta",
            begin: /<![a-z]/,
            end: />/,
            contains: [i2, r2, o2, s2]
          }]
        }]
      }, e2.COMMENT(/<!--/, /-->/, {
        relevance: 10
      }), {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      }, a2, {
        className: "meta",
        end: /\?>/,
        variants: [{
          begin: /<\?xml/,
          relevance: 10,
          contains: [o2]
        }, {
          begin: /<\?[a-z][a-z0-9]+/
        }]
      }, {
        className: "tag",
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: {
          name: "style"
        },
        contains: [l2],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: ["css", "xml"]
        }
      }, {
        className: "tag",
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: {
          name: "script"
        },
        contains: [l2],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: ["javascript", "handlebars", "xml"]
        }
      }, {
        className: "tag",
        begin: /<>|<\/>/
      }, {
        className: "tag",
        begin: n2.concat(/</, n2.lookahead(n2.concat(t2, n2.either(/\/>/, />/, /\s/)))),
        end: /\/?>/,
        contains: [{
          className: "name",
          begin: t2,
          relevance: 0,
          starts: l2
        }]
      }, {
        className: "tag",
        begin: n2.concat(/<\//, n2.lookahead(n2.concat(t2, />/))),
        contains: [{
          className: "name",
          begin: t2,
          relevance: 0
        }, {
          begin: />/,
          relevance: 0,
          endsParent: true
        }]
      }]
    };
  },
  grmr_markdown: (e2) => {
    const n2 = {
      begin: /<\/?[A-Za-z_]/,
      end: ">",
      subLanguage: "xml",
      relevance: 0
    }, t2 = {
      variants: [{
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      }, {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      }, {
        begin: e2.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
        relevance: 2
      }, {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      }, {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }],
      returnBegin: true,
      contains: [{
        match: /\[(?=\])/
      }, {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: true,
        returnEnd: true
      }, {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: true,
        excludeEnd: true
      }, {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: true,
        excludeEnd: true
      }]
    }, a2 = {
      className: "strong",
      contains: [],
      variants: [{
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      }, {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }]
    }, i2 = {
      className: "emphasis",
      contains: [],
      variants: [{
        begin: /\*(?![*\s])/,
        end: /\*/
      }, {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }]
    }, r2 = e2.inherit(a2, {
      contains: []
    }), s2 = e2.inherit(i2, {
      contains: []
    });
    a2.contains.push(s2), i2.contains.push(r2);
    let o2 = [n2, t2];
    return [a2, i2, r2, s2].forEach((e3) => {
      e3.contains = e3.contains.concat(o2);
    }), o2 = o2.concat(a2, i2), {
      name: "Markdown",
      aliases: ["md", "mkdown", "mkd"],
      contains: [{
        className: "section",
        variants: [{
          begin: "^#{1,6}",
          end: "$",
          contains: o2
        }, {
          begin: "(?=^.+?\\n[=-]{2,}$)",
          contains: [{
            begin: "^[=-]*$"
          }, {
            begin: "^",
            end: "\\n",
            contains: o2
          }]
        }]
      }, n2, {
        className: "bullet",
        begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
        end: "\\s+",
        excludeEnd: true
      }, a2, i2, {
        className: "quote",
        begin: "^>\\s+",
        contains: o2,
        end: "$"
      }, {
        className: "code",
        variants: [{
          begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
        }, {
          begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
        }, {
          begin: "```",
          end: "```+[ ]*$"
        }, {
          begin: "~~~",
          end: "~~~+[ ]*$"
        }, {
          begin: "`.+?`"
        }, {
          begin: "(?=^( {4}|\\t))",
          contains: [{
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }],
          relevance: 0
        }]
      }, {
        begin: "^[-\\*]{3,}",
        end: "$"
      }, t2, {
        begin: /^\[[^\n]+\]:/,
        returnBegin: true,
        contains: [{
          className: "symbol",
          begin: /\[/,
          end: /\]/,
          excludeBegin: true,
          excludeEnd: true
        }, {
          className: "link",
          begin: /:\s*/,
          end: /$/,
          excludeBegin: true
        }]
      }]
    };
  },
  grmr_objectivec: (e2) => {
    const n2 = /[a-zA-Z@][a-zA-Z0-9_]*/, t2 = {
      $pattern: n2,
      keyword: ["@interface", "@class", "@protocol", "@implementation"]
    };
    return {
      name: "Objective-C",
      aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
      keywords: {
        "variable.language": ["this", "super"],
        $pattern: n2,
        keyword: [
          "while",
          "export",
          "sizeof",
          "typedef",
          "const",
          "struct",
          "for",
          "union",
          "volatile",
          "static",
          "mutable",
          "if",
          "do",
          "return",
          "goto",
          "enum",
          "else",
          "break",
          "extern",
          "asm",
          "case",
          "default",
          "register",
          "explicit",
          "typename",
          "switch",
          "continue",
          "inline",
          "readonly",
          "assign",
          "readwrite",
          "self",
          "@synchronized",
          "id",
          "typeof",
          "nonatomic",
          "IBOutlet",
          "IBAction",
          "strong",
          "weak",
          "copy",
          "in",
          "out",
          "inout",
          "bycopy",
          "byref",
          "oneway",
          "__strong",
          "__weak",
          "__block",
          "__autoreleasing",
          "@private",
          "@protected",
          "@public",
          "@try",
          "@property",
          "@end",
          "@throw",
          "@catch",
          "@finally",
          "@autoreleasepool",
          "@synthesize",
          "@dynamic",
          "@selector",
          "@optional",
          "@required",
          "@encode",
          "@package",
          "@import",
          "@defs",
          "@compatibility_alias",
          "__bridge",
          "__bridge_transfer",
          "__bridge_retained",
          "__bridge_retain",
          "__covariant",
          "__contravariant",
          "__kindof",
          "_Nonnull",
          "_Nullable",
          "_Null_unspecified",
          "__FUNCTION__",
          "__PRETTY_FUNCTION__",
          "__attribute__",
          "getter",
          "setter",
          "retain",
          "unsafe_unretained",
          "nonnull",
          "nullable",
          "null_unspecified",
          "null_resettable",
          "class",
          "instancetype",
          "NS_DESIGNATED_INITIALIZER",
          "NS_UNAVAILABLE",
          "NS_REQUIRES_SUPER",
          "NS_RETURNS_INNER_POINTER",
          "NS_INLINE",
          "NS_AVAILABLE",
          "NS_DEPRECATED",
          "NS_ENUM",
          "NS_OPTIONS",
          "NS_SWIFT_UNAVAILABLE",
          "NS_ASSUME_NONNULL_BEGIN",
          "NS_ASSUME_NONNULL_END",
          "NS_REFINED_FOR_SWIFT",
          "NS_SWIFT_NAME",
          "NS_SWIFT_NOTHROW",
          "NS_DURING",
          "NS_HANDLER",
          "NS_ENDHANDLER",
          "NS_VALUERETURN",
          "NS_VOIDRETURN"
        ],
        literal: ["false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL"],
        built_in: ["dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once"],
        type: [
          "int",
          "float",
          "char",
          "unsigned",
          "signed",
          "short",
          "long",
          "double",
          "wchar_t",
          "unichar",
          "void",
          "bool",
          "BOOL",
          "id|0",
          "_Bool"
        ]
      },
      illegal: "</",
      contains: [
        {
          className: "built_in",
          begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
        },
        e2.C_LINE_COMMENT_MODE,
        e2.C_BLOCK_COMMENT_MODE,
        e2.C_NUMBER_MODE,
        e2.QUOTE_STRING_MODE,
        e2.APOS_STRING_MODE,
        {
          className: "string",
          variants: [{
            begin: '@"',
            end: '"',
            illegal: "\\n",
            contains: [e2.BACKSLASH_ESCAPE]
          }]
        },
        {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include"
          },
          contains: [{
            begin: /\\\n/,
            relevance: 0
          }, e2.inherit(e2.QUOTE_STRING_MODE, {
            className: "string"
          }), {
            className: "string",
            begin: /<.*?>/,
            end: /$/,
            illegal: "\\n"
          }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        },
        {
          className: "class",
          begin: "(" + t2.keyword.join("|") + ")\\b",
          end: /(\{|$)/,
          excludeEnd: true,
          keywords: t2,
          contains: [e2.UNDERSCORE_TITLE_MODE]
        },
        {
          begin: "\\." + e2.UNDERSCORE_IDENT_RE,
          relevance: 0
        }
      ]
    };
  },
  grmr_perl: (e2) => {
    const n2 = e2.regex, t2 = /[dualxmsipngr]{0,12}/, a2 = {
      $pattern: /[\w.]+/,
      keyword: "abs accept alarm and atan2 bind binmode bless break caller chdir chmod chomp chop chown chr chroot close closedir connect continue cos crypt dbmclose dbmopen defined delete die do dump each else elsif endgrent endhostent endnetent endprotoent endpwent endservent eof eval exec exists exit exp fcntl fileno flock for foreach fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt given glob gmtime goto grep gt hex if index int ioctl join keys kill last lc lcfirst length link listen local localtime log lstat lt ma map mkdir msgctl msgget msgrcv msgsnd my ne next no not oct open opendir or ord our pack package pipe pop pos print printf prototype push q|0 qq quotemeta qw qx rand read readdir readline readlink readpipe recv redo ref rename require reset return reverse rewinddir rindex rmdir say scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat state study sub substr symlink syscall sysopen sysread sysseek system syswrite tell telldir tie tied time times tr truncate uc ucfirst umask undef unless unlink unpack unshift untie until use utime values vec wait waitpid wantarray warn when while write x|0 xor y|0"
    }, i2 = {
      className: "subst",
      begin: "[$@]\\{",
      end: "\\}",
      keywords: a2
    }, r2 = {
      begin: /->\{/,
      end: /\}/
    }, s2 = {
      variants: [{
        begin: /\$\d/
      }, {
        begin: n2.concat(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
      }, {
        begin: /[$%@][^\s\w{]/,
        relevance: 0
      }]
    }, o2 = [e2.BACKSLASH_ESCAPE, i2, s2], l2 = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/], c2 = (e3, a3, i3 = "\\1") => {
      const r3 = "\\1" === i3 ? i3 : n2.concat(i3, a3);
      return n2.concat(n2.concat("(?:", e3, ")"), a3, /(?:\\.|[^\\\/])*?/, r3, /(?:\\.|[^\\\/])*?/, i3, t2);
    }, d2 = (e3, a3, i3) => n2.concat(n2.concat("(?:", e3, ")"), a3, /(?:\\.|[^\\\/])*?/, i3, t2), g2 = [s2, e2.HASH_COMMENT_MODE, e2.COMMENT(/^=\w/, /=cut/, {
      endsWithParent: true
    }), r2, {
      className: "string",
      contains: o2,
      variants: [{
        begin: "q[qwxr]?\\s*\\(",
        end: "\\)",
        relevance: 5
      }, {
        begin: "q[qwxr]?\\s*\\[",
        end: "\\]",
        relevance: 5
      }, {
        begin: "q[qwxr]?\\s*\\{",
        end: "\\}",
        relevance: 5
      }, {
        begin: "q[qwxr]?\\s*\\|",
        end: "\\|",
        relevance: 5
      }, {
        begin: "q[qwxr]?\\s*<",
        end: ">",
        relevance: 5
      }, {
        begin: "qw\\s+q",
        end: "q",
        relevance: 5
      }, {
        begin: "'",
        end: "'",
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: '"',
        end: '"'
      }, {
        begin: "`",
        end: "`",
        contains: [e2.BACKSLASH_ESCAPE]
      }, {
        begin: /\{\w+\}/,
        relevance: 0
      }, {
        begin: "-?\\w+\\s*=>",
        relevance: 0
      }]
    }, {
      className: "number",
      begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      relevance: 0
    }, {
      begin: "(\\/\\/|" + e2.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      keywords: "split return print reverse grep",
      relevance: 0,
      contains: [e2.HASH_COMMENT_MODE, {
        className: "regexp",
        variants: [{
          begin: c2("s|tr|y", n2.either(...l2, {
            capture: true
          }))
        }, {
          begin: c2("s|tr|y", "\\(", "\\)")
        }, {
          begin: c2("s|tr|y", "\\[", "\\]")
        }, {
          begin: c2("s|tr|y", "\\{", "\\}")
        }],
        relevance: 2
      }, {
        className: "regexp",
        variants: [{
          begin: /(m|qr)\/\//,
          relevance: 0
        }, {
          begin: d2("(?:m|qr)?", /\//, /\//)
        }, {
          begin: d2("m|qr", n2.either(...l2, {
            capture: true
          }), /\1/)
        }, {
          begin: d2("m|qr", /\(/, /\)/)
        }, {
          begin: d2("m|qr", /\[/, /\]/)
        }, {
          begin: d2("m|qr", /\{/, /\}/)
        }]
      }]
    }, {
      className: "function",
      beginKeywords: "sub",
      end: "(\\s*\\(.*?\\))?[;{]",
      excludeEnd: true,
      relevance: 5,
      contains: [e2.TITLE_MODE]
    }, {
      begin: "-\\w\\b",
      relevance: 0
    }, {
      begin: "^__DATA__$",
      end: "^__END__$",
      subLanguage: "mojolicious",
      contains: [{
        begin: "^@@.*",
        end: "$",
        className: "comment"
      }]
    }];
    return i2.contains = g2, r2.contains = g2, {
      name: "Perl",
      aliases: ["pl", "pm"],
      keywords: a2,
      contains: g2
    };
  },
  grmr_php: (e2) => {
    const n2 = e2.regex, t2 = /(?![A-Za-z0-9])(?![$])/, a2 = n2.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, t2), i2 = n2.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, t2), r2 = {
      scope: "variable",
      match: "\\$+" + a2
    }, s2 = {
      scope: "subst",
      variants: [{
        begin: /\$\w+/
      }, {
        begin: /\{\$/,
        end: /\}/
      }]
    }, o2 = e2.inherit(e2.APOS_STRING_MODE, {
      illegal: null
    }), l2 = "[ 	\n]", c2 = {
      scope: "string",
      variants: [e2.inherit(e2.QUOTE_STRING_MODE, {
        illegal: null,
        contains: e2.QUOTE_STRING_MODE.contains.concat(s2)
      }), o2, e2.END_SAME_AS_BEGIN({
        begin: /<<<[ \t]*(\w+)\n/,
        end: /[ \t]*(\w+)\b/,
        contains: e2.QUOTE_STRING_MODE.contains.concat(s2)
      })]
    }, d2 = {
      scope: "number",
      variants: [{
        begin: "\\b0[bB][01]+(?:_[01]+)*\\b"
      }, {
        begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b"
      }, {
        begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"
      }, {
        begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"
      }],
      relevance: 0
    }, g2 = ["false", "null", "true"], u2 = [
      "__CLASS__",
      "__DIR__",
      "__FILE__",
      "__FUNCTION__",
      "__COMPILER_HALT_OFFSET__",
      "__LINE__",
      "__METHOD__",
      "__NAMESPACE__",
      "__TRAIT__",
      "die",
      "echo",
      "exit",
      "include",
      "include_once",
      "print",
      "require",
      "require_once",
      "array",
      "abstract",
      "and",
      "as",
      "binary",
      "bool",
      "boolean",
      "break",
      "callable",
      "case",
      "catch",
      "class",
      "clone",
      "const",
      "continue",
      "declare",
      "default",
      "do",
      "double",
      "else",
      "elseif",
      "empty",
      "enddeclare",
      "endfor",
      "endforeach",
      "endif",
      "endswitch",
      "endwhile",
      "enum",
      "eval",
      "extends",
      "final",
      "finally",
      "float",
      "for",
      "foreach",
      "from",
      "global",
      "goto",
      "if",
      "implements",
      "instanceof",
      "insteadof",
      "int",
      "integer",
      "interface",
      "isset",
      "iterable",
      "list",
      "match|0",
      "mixed",
      "new",
      "never",
      "object",
      "or",
      "private",
      "protected",
      "public",
      "readonly",
      "real",
      "return",
      "string",
      "switch",
      "throw",
      "trait",
      "try",
      "unset",
      "use",
      "var",
      "void",
      "while",
      "xor",
      "yield"
    ], b2 = [
      "Error|0",
      "AppendIterator",
      "ArgumentCountError",
      "ArithmeticError",
      "ArrayIterator",
      "ArrayObject",
      "AssertionError",
      "BadFunctionCallException",
      "BadMethodCallException",
      "CachingIterator",
      "CallbackFilterIterator",
      "CompileError",
      "Countable",
      "DirectoryIterator",
      "DivisionByZeroError",
      "DomainException",
      "EmptyIterator",
      "ErrorException",
      "Exception",
      "FilesystemIterator",
      "FilterIterator",
      "GlobIterator",
      "InfiniteIterator",
      "InvalidArgumentException",
      "IteratorIterator",
      "LengthException",
      "LimitIterator",
      "LogicException",
      "MultipleIterator",
      "NoRewindIterator",
      "OutOfBoundsException",
      "OutOfRangeException",
      "OuterIterator",
      "OverflowException",
      "ParentIterator",
      "ParseError",
      "RangeException",
      "RecursiveArrayIterator",
      "RecursiveCachingIterator",
      "RecursiveCallbackFilterIterator",
      "RecursiveDirectoryIterator",
      "RecursiveFilterIterator",
      "RecursiveIterator",
      "RecursiveIteratorIterator",
      "RecursiveRegexIterator",
      "RecursiveTreeIterator",
      "RegexIterator",
      "RuntimeException",
      "SeekableIterator",
      "SplDoublyLinkedList",
      "SplFileInfo",
      "SplFileObject",
      "SplFixedArray",
      "SplHeap",
      "SplMaxHeap",
      "SplMinHeap",
      "SplObjectStorage",
      "SplObserver",
      "SplPriorityQueue",
      "SplQueue",
      "SplStack",
      "SplSubject",
      "SplTempFileObject",
      "TypeError",
      "UnderflowException",
      "UnexpectedValueException",
      "UnhandledMatchError",
      "ArrayAccess",
      "BackedEnum",
      "Closure",
      "Fiber",
      "Generator",
      "Iterator",
      "IteratorAggregate",
      "Serializable",
      "Stringable",
      "Throwable",
      "Traversable",
      "UnitEnum",
      "WeakReference",
      "WeakMap",
      "Directory",
      "__PHP_Incomplete_Class",
      "parent",
      "php_user_filter",
      "self",
      "static",
      "stdClass"
    ], m2 = {
      keyword: u2,
      literal: ((e3) => {
        const n3 = [];
        return e3.forEach((e4) => {
          n3.push(e4), e4.toLowerCase() === e4 ? n3.push(e4.toUpperCase()) : n3.push(e4.toLowerCase());
        }), n3;
      })(g2),
      built_in: b2
    }, p2 = (e3) => e3.map((e4) => e4.replace(/\|\d+$/, "")), _2 = {
      variants: [{
        match: [/new/, n2.concat(l2, "+"), n2.concat("(?!", p2(b2).join("\\b|"), "\\b)"), i2],
        scope: {
          1: "keyword",
          4: "title.class"
        }
      }]
    }, h2 = n2.concat(a2, "\\b(?!\\()"), f2 = {
      variants: [{
        match: [n2.concat(/::/, n2.lookahead(/(?!class\b)/)), h2],
        scope: {
          2: "variable.constant"
        }
      }, {
        match: [/::/, /class/],
        scope: {
          2: "variable.language"
        }
      }, {
        match: [i2, n2.concat(/::/, n2.lookahead(/(?!class\b)/)), h2],
        scope: {
          1: "title.class",
          3: "variable.constant"
        }
      }, {
        match: [i2, n2.concat("::", n2.lookahead(/(?!class\b)/))],
        scope: {
          1: "title.class"
        }
      }, {
        match: [i2, /::/, /class/],
        scope: {
          1: "title.class",
          3: "variable.language"
        }
      }]
    }, E2 = {
      scope: "attr",
      match: n2.concat(a2, n2.lookahead(":"), n2.lookahead(/(?!::)/))
    }, y2 = {
      relevance: 0,
      begin: /\(/,
      end: /\)/,
      keywords: m2,
      contains: [E2, r2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2, _2]
    }, w2 = {
      relevance: 0,
      match: [
        /\b/,
        n2.concat("(?!fn\\b|function\\b|", p2(u2).join("\\b|"), "|", p2(b2).join("\\b|"), "\\b)"),
        a2,
        n2.concat(l2, "*"),
        n2.lookahead(/(?=\()/)
      ],
      scope: {
        3: "title.function.invoke"
      },
      contains: [y2]
    };
    y2.contains.push(w2);
    const N2 = [E2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2, _2];
    return {
      case_insensitive: false,
      keywords: m2,
      contains: [{
        begin: n2.concat(/#\[\s*/, i2),
        beginScope: "meta",
        end: /]/,
        endScope: "meta",
        keywords: {
          literal: g2,
          keyword: ["new", "array"]
        },
        contains: [{
          begin: /\[/,
          end: /]/,
          keywords: {
            literal: g2,
            keyword: ["new", "array"]
          },
          contains: ["self", ...N2]
        }, ...N2, {
          scope: "meta",
          match: i2
        }]
      }, e2.HASH_COMMENT_MODE, e2.COMMENT("//", "$"), e2.COMMENT("/\\*", "\\*/", {
        contains: [{
          scope: "doctag",
          match: "@[A-Za-z]+"
        }]
      }), {
        match: /__halt_compiler\(\);/,
        keywords: "__halt_compiler",
        starts: {
          scope: "comment",
          end: e2.MATCH_NOTHING_RE,
          contains: [{
            match: /\?>/,
            scope: "meta",
            endsParent: true
          }]
        }
      }, {
        scope: "meta",
        variants: [{
          begin: /<\?php/,
          relevance: 10
        }, {
          begin: /<\?=/
        }, {
          begin: /<\?/,
          relevance: 0.1
        }, {
          begin: /\?>/
        }]
      }, {
        scope: "variable.language",
        match: /\$this\b/
      }, r2, w2, f2, {
        match: [/const/, /\s/, a2],
        scope: {
          1: "keyword",
          3: "variable.constant"
        }
      }, _2, {
        scope: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: true,
        illegal: "[$%\\[]",
        contains: [{
          beginKeywords: "use"
        }, e2.UNDERSCORE_TITLE_MODE, {
          begin: "=>",
          endsParent: true
        }, {
          scope: "params",
          begin: "\\(",
          end: "\\)",
          excludeBegin: true,
          excludeEnd: true,
          keywords: m2,
          contains: ["self", r2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2]
        }]
      }, {
        scope: "class",
        variants: [{
          beginKeywords: "enum",
          illegal: /[($"]/
        }, {
          beginKeywords: "class interface trait",
          illegal: /[:($"]/
        }],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [{
          beginKeywords: "extends implements"
        }, e2.UNDERSCORE_TITLE_MODE]
      }, {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/,
        contains: [e2.inherit(e2.UNDERSCORE_TITLE_MODE, {
          scope: "title.class"
        })]
      }, {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [{
          match: /\b(as|const|function)\b/,
          scope: "keyword"
        }, e2.UNDERSCORE_TITLE_MODE]
      }, c2, d2]
    };
  },
  grmr_php_template: (e2) => ({
    name: "PHP template",
    subLanguage: "xml",
    contains: [{
      begin: /<\?(php|=)?/,
      end: /\?>/,
      subLanguage: "php",
      contains: [{
        begin: "/\\*",
        end: "\\*/",
        skip: true
      }, {
        begin: 'b"',
        end: '"',
        skip: true
      }, {
        begin: "b'",
        end: "'",
        skip: true
      }, e2.inherit(e2.APOS_STRING_MODE, {
        illegal: null,
        className: null,
        contains: null,
        skip: true
      }), e2.inherit(e2.QUOTE_STRING_MODE, {
        illegal: null,
        className: null,
        contains: null,
        skip: true
      })]
    }]
  }),
  grmr_plaintext: (e2) => ({
    name: "Plain text",
    aliases: ["text", "txt"],
    disableAutodetect: true
  }),
  grmr_python: (e2) => {
    const n2 = e2.regex, t2 = /(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u0870-\u0887\u0889-\u088E\u0898-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1715\u171F-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B4C\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDEFD-\uDF1C\uDF27\uDF30-\uDF50\uDF70-\uDF85\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC75\uDC7F-\uDCBA\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E-\uDE41\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39\uDF40-\uDF46]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDF00-\uDF10\uDF12-\uDF3A\uDF3E-\uDF42\uDF50-\uDF59\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC40-\uDC55]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC30-\uDC6D\uDC8F\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAE\uDEC0-\uDEF9]|\uD839[\uDCD0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF]|\uDB40[\uDD00-\uDDEF])*/, a2 = [
      "and",
      "as",
      "assert",
      "async",
      "await",
      "break",
      "case",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "in",
      "is",
      "lambda",
      "match",
      "nonlocal|10",
      "not",
      "or",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield"
    ], i2 = {
      $pattern: /[A-Za-z]\w+|__\w+__/,
      keyword: a2,
      built_in: [
        "__import__",
        "abs",
        "all",
        "any",
        "ascii",
        "bin",
        "bool",
        "breakpoint",
        "bytearray",
        "bytes",
        "callable",
        "chr",
        "classmethod",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "exec",
        "filter",
        "float",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "int",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "list",
        "locals",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "range",
        "repr",
        "reversed",
        "round",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "vars",
        "zip"
      ],
      literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
      type: [
        "Any",
        "Callable",
        "Coroutine",
        "Dict",
        "List",
        "Literal",
        "Generic",
        "Optional",
        "Sequence",
        "Set",
        "Tuple",
        "Type",
        "Union"
      ]
    }, r2 = {
      className: "meta",
      begin: /^(>>>|\.\.\.) /
    }, s2 = {
      className: "subst",
      begin: /\{/,
      end: /\}/,
      keywords: i2,
      illegal: /#/
    }, o2 = {
      begin: /\{\{/,
      relevance: 0
    }, l2 = {
      className: "string",
      contains: [e2.BACKSLASH_ESCAPE],
      variants: [{
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [e2.BACKSLASH_ESCAPE, r2],
        relevance: 10
      }, {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [e2.BACKSLASH_ESCAPE, r2],
        relevance: 10
      }, {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [e2.BACKSLASH_ESCAPE, r2, o2, s2]
      }, {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [e2.BACKSLASH_ESCAPE, r2, o2, s2]
      }, {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      }, {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      }, {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      }, {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      }, {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [e2.BACKSLASH_ESCAPE, o2, s2]
      }, {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [e2.BACKSLASH_ESCAPE, o2, s2]
      }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
    }, c2 = "[0-9](_?[0-9])*", d2 = `(\\b(${c2}))?\\.(${c2})|\\b(${c2})\\.`, g2 = "\\b|" + a2.join("|"), u2 = {
      className: "number",
      relevance: 0,
      variants: [{
        begin: `(\\b(${c2})|(${d2}))[eE][+-]?(${c2})[jJ]?(?=${g2})`
      }, {
        begin: `(${d2})[jJ]?`
      }, {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${g2})`
      }, {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${g2})`
      }, {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${g2})`
      }, {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${g2})`
      }, {
        begin: `\\b(${c2})[jJ](?=${g2})`
      }]
    }, b2 = {
      className: "comment",
      begin: n2.lookahead(/# type:/),
      end: /$/,
      keywords: i2,
      contains: [{
        begin: /# type:/
      }, {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }]
    }, m2 = {
      className: "params",
      variants: [{
        className: "",
        begin: /\(\s*\)/,
        skip: true
      }, {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: i2,
        contains: ["self", r2, u2, l2, e2.HASH_COMMENT_MODE]
      }]
    };
    return s2.contains = [l2, u2, r2], {
      name: "Python",
      aliases: ["py", "gyp", "ipython"],
      unicodeRegex: true,
      keywords: i2,
      illegal: /(<\/|->|\?)|=>/,
      contains: [r2, u2, {
        begin: /\bself\b/
      }, {
        beginKeywords: "if",
        relevance: 0
      }, l2, b2, e2.HASH_COMMENT_MODE, {
        match: [/\bdef/, /\s+/, t2],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [m2]
      }, {
        variants: [{
          match: [/\bclass/, /\s+/, t2, /\s*/, /\(\s*/, t2, /\s*\)/]
        }, {
          match: [/\bclass/, /\s+/, t2]
        }],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      }, {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [u2, m2, l2]
      }]
    };
  },
  grmr_python_repl: (e2) => ({
    aliases: ["pycon"],
    contains: [{
      className: "meta.prompt",
      starts: {
        end: / |$/,
        starts: {
          end: "$",
          subLanguage: "python"
        }
      },
      variants: [{
        begin: /^>>>(?=[ ]|$)/
      }, {
        begin: /^\.\.\.(?=[ ]|$)/
      }]
    }]
  }),
  grmr_r: (e2) => {
    const n2 = e2.regex, t2 = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, a2 = n2.either(
      /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
      /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
      /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
    ), i2 = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, r2 = n2.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/);
    return {
      name: "R",
      keywords: {
        $pattern: t2,
        keyword: "function if in break next repeat else for while",
        literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
        built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
      },
      contains: [e2.COMMENT(/#'/, /$/, {
        contains: [{
          scope: "doctag",
          match: /@examples/,
          starts: {
            end: n2.lookahead(n2.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
            endsParent: true
          }
        }, {
          scope: "doctag",
          begin: "@param",
          end: /$/,
          contains: [{
            scope: "variable",
            variants: [{
              match: t2
            }, {
              match: /`(?:\\.|[^`\\])+`/
            }],
            endsParent: true
          }]
        }, {
          scope: "doctag",
          match: /@[a-zA-Z]+/
        }, {
          scope: "keyword",
          match: /\\[a-zA-Z]+/
        }]
      }), e2.HASH_COMMENT_MODE, {
        scope: "string",
        contains: [e2.BACKSLASH_ESCAPE],
        variants: [e2.END_SAME_AS_BEGIN({
          begin: /[rR]"(-*)\(/,
          end: /\)(-*)"/
        }), e2.END_SAME_AS_BEGIN({
          begin: /[rR]"(-*)\{/,
          end: /\}(-*)"/
        }), e2.END_SAME_AS_BEGIN({
          begin: /[rR]"(-*)\[/,
          end: /\](-*)"/
        }), e2.END_SAME_AS_BEGIN({
          begin: /[rR]'(-*)\(/,
          end: /\)(-*)'/
        }), e2.END_SAME_AS_BEGIN({
          begin: /[rR]'(-*)\{/,
          end: /\}(-*)'/
        }), e2.END_SAME_AS_BEGIN({
          begin: /[rR]'(-*)\[/,
          end: /\](-*)'/
        }), {
          begin: '"',
          end: '"',
          relevance: 0
        }, {
          begin: "'",
          end: "'",
          relevance: 0
        }]
      }, {
        relevance: 0,
        variants: [{
          scope: {
            1: "operator",
            2: "number"
          },
          match: [i2, a2]
        }, {
          scope: {
            1: "operator",
            2: "number"
          },
          match: [/%[^%]*%/, a2]
        }, {
          scope: {
            1: "punctuation",
            2: "number"
          },
          match: [r2, a2]
        }, {
          scope: {
            2: "number"
          },
          match: [/[^a-zA-Z0-9._]|^/, a2]
        }]
      }, {
        scope: {
          3: "operator"
        },
        match: [t2, /\s+/, /<-/, /\s+/]
      }, {
        scope: "operator",
        relevance: 0,
        variants: [{
          match: i2
        }, {
          match: /%[^%]*%/
        }]
      }, {
        scope: "punctuation",
        relevance: 0,
        match: r2
      }, {
        begin: "`",
        end: "`",
        contains: [{
          begin: /\\./
        }]
      }]
    };
  },
  grmr_ruby: (e2) => {
    const n2 = e2.regex, t2 = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", a2 = n2.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/), i2 = n2.concat(a2, /(::\w+)*/), r2 = {
      "variable.constant": ["__FILE__", "__LINE__", "__ENCODING__"],
      "variable.language": ["self", "super"],
      keyword: [
        "alias",
        "and",
        "begin",
        "BEGIN",
        "break",
        "case",
        "class",
        "defined",
        "do",
        "else",
        "elsif",
        "end",
        "END",
        "ensure",
        "for",
        "if",
        "in",
        "module",
        "next",
        "not",
        "or",
        "redo",
        "require",
        "rescue",
        "retry",
        "return",
        "then",
        "undef",
        "unless",
        "until",
        "when",
        "while",
        "yield",
        "include",
        "extend",
        "prepend",
        "public",
        "private",
        "protected",
        "raise",
        "throw"
      ],
      built_in: [
        "proc",
        "lambda",
        "attr_accessor",
        "attr_reader",
        "attr_writer",
        "define_method",
        "private_constant",
        "module_function"
      ],
      literal: ["true", "false", "nil"]
    }, s2 = {
      className: "doctag",
      begin: "@[A-Za-z]+"
    }, o2 = {
      begin: "#<",
      end: ">"
    }, l2 = [e2.COMMENT("#", "$", {
      contains: [s2]
    }), e2.COMMENT("^=begin", "^=end", {
      contains: [s2],
      relevance: 10
    }), e2.COMMENT("^__END__", e2.MATCH_NOTHING_RE)], c2 = {
      className: "subst",
      begin: /#\{/,
      end: /\}/,
      keywords: r2
    }, d2 = {
      className: "string",
      contains: [e2.BACKSLASH_ESCAPE, c2],
      variants: [{
        begin: /'/,
        end: /'/
      }, {
        begin: /"/,
        end: /"/
      }, {
        begin: /`/,
        end: /`/
      }, {
        begin: /%[qQwWx]?\(/,
        end: /\)/
      }, {
        begin: /%[qQwWx]?\[/,
        end: /\]/
      }, {
        begin: /%[qQwWx]?\{/,
        end: /\}/
      }, {
        begin: /%[qQwWx]?</,
        end: />/
      }, {
        begin: /%[qQwWx]?\//,
        end: /\//
      }, {
        begin: /%[qQwWx]?%/,
        end: /%/
      }, {
        begin: /%[qQwWx]?-/,
        end: /-/
      }, {
        begin: /%[qQwWx]?\|/,
        end: /\|/
      }, {
        begin: /\B\?(\\\d{1,3})/
      }, {
        begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
      }, {
        begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
      }, {
        begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
      }, {
        begin: /\B\?\\(c|C-)[\x20-\x7e]/
      }, {
        begin: /\B\?\\?\S/
      }, {
        begin: n2.concat(/<<[-~]?'?/, n2.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
        contains: [e2.END_SAME_AS_BEGIN({
          begin: /(\w+)/,
          end: /(\w+)/,
          contains: [e2.BACKSLASH_ESCAPE, c2]
        })]
      }]
    }, g2 = "[0-9](_?[0-9])*", u2 = {
      className: "number",
      relevance: 0,
      variants: [{
        begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g2}))?([eE][+-]?(${g2})|r)?i?\\b`
      }, {
        begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
      }, {
        begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
      }, {
        begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
      }, {
        begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
      }, {
        begin: "\\b0(_?[0-7])+r?i?\\b"
      }]
    }, b2 = {
      variants: [{
        match: /\(\)/
      }, {
        className: "params",
        begin: /\(/,
        end: /(?=\))/,
        excludeBegin: true,
        endsParent: true,
        keywords: r2
      }]
    }, m2 = [d2, {
      variants: [{
        match: [/class\s+/, i2, /\s+<\s+/, i2]
      }, {
        match: [/\b(class|module)\s+/, i2]
      }],
      scope: {
        2: "title.class",
        4: "title.class.inherited"
      },
      keywords: r2
    }, {
      match: [/(include|extend)\s+/, i2],
      scope: {
        2: "title.class"
      },
      keywords: r2
    }, {
      relevance: 0,
      match: [i2, /\.new[. (]/],
      scope: {
        1: "title.class"
      }
    }, {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    }, {
      relevance: 0,
      match: a2,
      scope: "title.class"
    }, {
      match: [/def/, /\s+/, t2],
      scope: {
        1: "keyword",
        3: "title.function"
      },
      contains: [b2]
    }, {
      begin: e2.IDENT_RE + "::"
    }, {
      className: "symbol",
      begin: e2.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    }, {
      className: "symbol",
      begin: ":(?!\\s)",
      contains: [d2, {
        begin: t2
      }],
      relevance: 0
    }, u2, {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
    }, {
      className: "params",
      begin: /\|/,
      end: /\|/,
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0,
      keywords: r2
    }, {
      begin: "(" + e2.RE_STARTERS_RE + "|unless)\\s*",
      keywords: "unless",
      contains: [{
        className: "regexp",
        contains: [e2.BACKSLASH_ESCAPE, c2],
        illegal: /\n/,
        variants: [{
          begin: "/",
          end: "/[a-z]*"
        }, {
          begin: /%r\{/,
          end: /\}[a-z]*/
        }, {
          begin: "%r\\(",
          end: "\\)[a-z]*"
        }, {
          begin: "%r!",
          end: "![a-z]*"
        }, {
          begin: "%r\\[",
          end: "\\][a-z]*"
        }]
      }].concat(o2, l2),
      relevance: 0
    }].concat(o2, l2);
    c2.contains = m2, b2.contains = m2;
    const p2 = [{
      begin: /^\s*=>/,
      starts: {
        end: "$",
        contains: m2
      }
    }, {
      className: "meta.prompt",
      begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
      starts: {
        end: "$",
        keywords: r2,
        contains: m2
      }
    }];
    return l2.unshift(o2), {
      name: "Ruby",
      aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
      keywords: r2,
      illegal: /\/\*/,
      contains: [e2.SHEBANG({
        binary: "ruby"
      })].concat(p2).concat(l2).concat(m2)
    };
  },
  grmr_rust: (e2) => {
    const n2 = e2.regex, t2 = {
      className: "title.function.invoke",
      relevance: 0,
      begin: n2.concat(/\b/, /(?!let\b)/, e2.IDENT_RE, n2.lookahead(/\s*\(/))
    }, a2 = "([ui](8|16|32|64|128|size)|f(32|64))?", i2 = [
      "drop ",
      "Copy",
      "Send",
      "Sized",
      "Sync",
      "Drop",
      "Fn",
      "FnMut",
      "FnOnce",
      "ToOwned",
      "Clone",
      "Debug",
      "PartialEq",
      "PartialOrd",
      "Eq",
      "Ord",
      "AsRef",
      "AsMut",
      "Into",
      "From",
      "Default",
      "Iterator",
      "Extend",
      "IntoIterator",
      "DoubleEndedIterator",
      "ExactSizeIterator",
      "SliceConcatExt",
      "ToString",
      "assert!",
      "assert_eq!",
      "bitflags!",
      "bytes!",
      "cfg!",
      "col!",
      "concat!",
      "concat_idents!",
      "debug_assert!",
      "debug_assert_eq!",
      "env!",
      "panic!",
      "file!",
      "format!",
      "format_args!",
      "include_bytes!",
      "include_str!",
      "line!",
      "local_data_key!",
      "module_path!",
      "option_env!",
      "print!",
      "println!",
      "select!",
      "stringify!",
      "try!",
      "unimplemented!",
      "unreachable!",
      "vec!",
      "write!",
      "writeln!",
      "macro_rules!",
      "assert_ne!",
      "debug_assert_ne!"
    ], r2 = [
      "i8",
      "i16",
      "i32",
      "i64",
      "i128",
      "isize",
      "u8",
      "u16",
      "u32",
      "u64",
      "u128",
      "usize",
      "f32",
      "f64",
      "str",
      "char",
      "bool",
      "Box",
      "Option",
      "Result",
      "String",
      "Vec"
    ];
    return {
      name: "Rust",
      aliases: ["rs"],
      keywords: {
        $pattern: e2.IDENT_RE + "!?",
        type: r2,
        keyword: [
          "abstract",
          "as",
          "async",
          "await",
          "become",
          "box",
          "break",
          "const",
          "continue",
          "crate",
          "do",
          "dyn",
          "else",
          "enum",
          "extern",
          "false",
          "final",
          "fn",
          "for",
          "if",
          "impl",
          "in",
          "let",
          "loop",
          "macro",
          "match",
          "mod",
          "move",
          "mut",
          "override",
          "priv",
          "pub",
          "ref",
          "return",
          "self",
          "Self",
          "static",
          "struct",
          "super",
          "trait",
          "true",
          "try",
          "type",
          "typeof",
          "unsafe",
          "unsized",
          "use",
          "virtual",
          "where",
          "while",
          "yield"
        ],
        literal: ["true", "false", "Some", "None", "Ok", "Err"],
        built_in: i2
      },
      illegal: "</",
      contains: [e2.C_LINE_COMMENT_MODE, e2.COMMENT("/\\*", "\\*/", {
        contains: ["self"]
      }), e2.inherit(e2.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }), {
        className: "string",
        variants: [{
          begin: /b?r(#*)"(.|\n)*?"\1(?!#)/
        }, {
          begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
        }]
      }, {
        className: "symbol",
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      }, {
        className: "number",
        variants: [{
          begin: "\\b0b([01_]+)" + a2
        }, {
          begin: "\\b0o([0-7_]+)" + a2
        }, {
          begin: "\\b0x([A-Fa-f0-9_]+)" + a2
        }, {
          begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + a2
        }],
        relevance: 0
      }, {
        begin: [/fn/, /\s+/, e2.UNDERSCORE_IDENT_RE],
        className: {
          1: "keyword",
          3: "title.function"
        }
      }, {
        className: "meta",
        begin: "#!?\\[",
        end: "\\]",
        contains: [{
          className: "string",
          begin: /"/,
          end: /"/
        }]
      }, {
        begin: [/let/, /\s+/, /(?:mut\s+)?/, e2.UNDERSCORE_IDENT_RE],
        className: {
          1: "keyword",
          3: "keyword",
          4: "variable"
        }
      }, {
        begin: [/for/, /\s+/, e2.UNDERSCORE_IDENT_RE, /\s+/, /in/],
        className: {
          1: "keyword",
          3: "variable",
          5: "keyword"
        }
      }, {
        begin: [/type/, /\s+/, e2.UNDERSCORE_IDENT_RE],
        className: {
          1: "keyword",
          3: "title.class"
        }
      }, {
        begin: [/(?:trait|enum|struct|union|impl|for)/, /\s+/, e2.UNDERSCORE_IDENT_RE],
        className: {
          1: "keyword",
          3: "title.class"
        }
      }, {
        begin: e2.IDENT_RE + "::",
        keywords: {
          keyword: "Self",
          built_in: i2,
          type: r2
        }
      }, {
        className: "punctuation",
        begin: "->"
      }, t2]
    };
  },
  grmr_scss: (e2) => {
    const n2 = J(e2), t2 = te, a2 = ne, i2 = "@[a-z-]+", r2 = {
      className: "variable",
      begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b",
      relevance: 0
    };
    return {
      name: "SCSS",
      case_insensitive: true,
      illegal: "[=/|']",
      contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, n2.CSS_NUMBER_MODE, {
        className: "selector-id",
        begin: "#[A-Za-z0-9_-]+",
        relevance: 0
      }, {
        className: "selector-class",
        begin: "\\.[A-Za-z0-9_-]+",
        relevance: 0
      }, n2.ATTRIBUTE_SELECTOR_MODE, {
        className: "selector-tag",
        begin: "\\b(" + Y.join("|") + ")\\b",
        relevance: 0
      }, {
        className: "selector-pseudo",
        begin: ":(" + a2.join("|") + ")"
      }, {
        className: "selector-pseudo",
        begin: ":(:)?(" + t2.join("|") + ")"
      }, r2, {
        begin: /\(/,
        end: /\)/,
        contains: [n2.CSS_NUMBER_MODE]
      }, n2.CSS_VARIABLE, {
        className: "attribute",
        begin: "\\b(" + ae.join("|") + ")\\b"
      }, {
        begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
      }, {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          n2.BLOCK_COMMENT,
          r2,
          n2.HEXCOLOR,
          n2.CSS_NUMBER_MODE,
          e2.QUOTE_STRING_MODE,
          e2.APOS_STRING_MODE,
          n2.IMPORTANT,
          n2.FUNCTION_DISPATCH
        ]
      }, {
        begin: "@(page|font-face)",
        keywords: {
          $pattern: i2,
          keyword: "@page @font-face"
        }
      }, {
        begin: "@",
        end: "[{;]",
        returnBegin: true,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: "and or not only",
          attribute: ee.join(" ")
        },
        contains: [{
          begin: i2,
          className: "keyword"
        }, {
          begin: /[a-z-]+(?=:)/,
          className: "attribute"
        }, r2, e2.QUOTE_STRING_MODE, e2.APOS_STRING_MODE, n2.HEXCOLOR, n2.CSS_NUMBER_MODE]
      }, n2.FUNCTION_DISPATCH]
    };
  },
  grmr_shell: (e2) => ({
    name: "Shell Session",
    aliases: ["console", "shellsession"],
    contains: [{
      className: "meta.prompt",
      begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
      starts: {
        end: /[^\\](?=\s*$)/,
        subLanguage: "bash"
      }
    }]
  }),
  grmr_sql: (e2) => {
    const n2 = e2.regex, t2 = e2.COMMENT("--", "$"), a2 = ["true", "false", "unknown"], i2 = [
      "bigint",
      "binary",
      "blob",
      "boolean",
      "char",
      "character",
      "clob",
      "date",
      "dec",
      "decfloat",
      "decimal",
      "float",
      "int",
      "integer",
      "interval",
      "nchar",
      "nclob",
      "national",
      "numeric",
      "real",
      "row",
      "smallint",
      "time",
      "timestamp",
      "varchar",
      "varying",
      "varbinary"
    ], r2 = [
      "abs",
      "acos",
      "array_agg",
      "asin",
      "atan",
      "avg",
      "cast",
      "ceil",
      "ceiling",
      "coalesce",
      "corr",
      "cos",
      "cosh",
      "count",
      "covar_pop",
      "covar_samp",
      "cume_dist",
      "dense_rank",
      "deref",
      "element",
      "exp",
      "extract",
      "first_value",
      "floor",
      "json_array",
      "json_arrayagg",
      "json_exists",
      "json_object",
      "json_objectagg",
      "json_query",
      "json_table",
      "json_table_primitive",
      "json_value",
      "lag",
      "last_value",
      "lead",
      "listagg",
      "ln",
      "log",
      "log10",
      "lower",
      "max",
      "min",
      "mod",
      "nth_value",
      "ntile",
      "nullif",
      "percent_rank",
      "percentile_cont",
      "percentile_disc",
      "position",
      "position_regex",
      "power",
      "rank",
      "regr_avgx",
      "regr_avgy",
      "regr_count",
      "regr_intercept",
      "regr_r2",
      "regr_slope",
      "regr_sxx",
      "regr_sxy",
      "regr_syy",
      "row_number",
      "sin",
      "sinh",
      "sqrt",
      "stddev_pop",
      "stddev_samp",
      "substring",
      "substring_regex",
      "sum",
      "tan",
      "tanh",
      "translate",
      "translate_regex",
      "treat",
      "trim",
      "trim_array",
      "unnest",
      "upper",
      "value_of",
      "var_pop",
      "var_samp",
      "width_bucket"
    ], s2 = [
      "create table",
      "insert into",
      "primary key",
      "foreign key",
      "not null",
      "alter table",
      "add constraint",
      "grouping sets",
      "on overflow",
      "character set",
      "respect nulls",
      "ignore nulls",
      "nulls first",
      "nulls last",
      "depth first",
      "breadth first"
    ], o2 = r2, l2 = [
      "abs",
      "acos",
      "all",
      "allocate",
      "alter",
      "and",
      "any",
      "are",
      "array",
      "array_agg",
      "array_max_cardinality",
      "as",
      "asensitive",
      "asin",
      "asymmetric",
      "at",
      "atan",
      "atomic",
      "authorization",
      "avg",
      "begin",
      "begin_frame",
      "begin_partition",
      "between",
      "bigint",
      "binary",
      "blob",
      "boolean",
      "both",
      "by",
      "call",
      "called",
      "cardinality",
      "cascaded",
      "case",
      "cast",
      "ceil",
      "ceiling",
      "char",
      "char_length",
      "character",
      "character_length",
      "check",
      "classifier",
      "clob",
      "close",
      "coalesce",
      "collate",
      "collect",
      "column",
      "commit",
      "condition",
      "connect",
      "constraint",
      "contains",
      "convert",
      "copy",
      "corr",
      "corresponding",
      "cos",
      "cosh",
      "count",
      "covar_pop",
      "covar_samp",
      "create",
      "cross",
      "cube",
      "cume_dist",
      "current",
      "current_catalog",
      "current_date",
      "current_default_transform_group",
      "current_path",
      "current_role",
      "current_row",
      "current_schema",
      "current_time",
      "current_timestamp",
      "current_path",
      "current_role",
      "current_transform_group_for_type",
      "current_user",
      "cursor",
      "cycle",
      "date",
      "day",
      "deallocate",
      "dec",
      "decimal",
      "decfloat",
      "declare",
      "default",
      "define",
      "delete",
      "dense_rank",
      "deref",
      "describe",
      "deterministic",
      "disconnect",
      "distinct",
      "double",
      "drop",
      "dynamic",
      "each",
      "element",
      "else",
      "empty",
      "end",
      "end_frame",
      "end_partition",
      "end-exec",
      "equals",
      "escape",
      "every",
      "except",
      "exec",
      "execute",
      "exists",
      "exp",
      "external",
      "extract",
      "false",
      "fetch",
      "filter",
      "first_value",
      "float",
      "floor",
      "for",
      "foreign",
      "frame_row",
      "free",
      "from",
      "full",
      "function",
      "fusion",
      "get",
      "global",
      "grant",
      "group",
      "grouping",
      "groups",
      "having",
      "hold",
      "hour",
      "identity",
      "in",
      "indicator",
      "initial",
      "inner",
      "inout",
      "insensitive",
      "insert",
      "int",
      "integer",
      "intersect",
      "intersection",
      "interval",
      "into",
      "is",
      "join",
      "json_array",
      "json_arrayagg",
      "json_exists",
      "json_object",
      "json_objectagg",
      "json_query",
      "json_table",
      "json_table_primitive",
      "json_value",
      "lag",
      "language",
      "large",
      "last_value",
      "lateral",
      "lead",
      "leading",
      "left",
      "like",
      "like_regex",
      "listagg",
      "ln",
      "local",
      "localtime",
      "localtimestamp",
      "log",
      "log10",
      "lower",
      "match",
      "match_number",
      "match_recognize",
      "matches",
      "max",
      "member",
      "merge",
      "method",
      "min",
      "minute",
      "mod",
      "modifies",
      "module",
      "month",
      "multiset",
      "national",
      "natural",
      "nchar",
      "nclob",
      "new",
      "no",
      "none",
      "normalize",
      "not",
      "nth_value",
      "ntile",
      "null",
      "nullif",
      "numeric",
      "octet_length",
      "occurrences_regex",
      "of",
      "offset",
      "old",
      "omit",
      "on",
      "one",
      "only",
      "open",
      "or",
      "order",
      "out",
      "outer",
      "over",
      "overlaps",
      "overlay",
      "parameter",
      "partition",
      "pattern",
      "per",
      "percent",
      "percent_rank",
      "percentile_cont",
      "percentile_disc",
      "period",
      "portion",
      "position",
      "position_regex",
      "power",
      "precedes",
      "precision",
      "prepare",
      "primary",
      "procedure",
      "ptf",
      "range",
      "rank",
      "reads",
      "real",
      "recursive",
      "ref",
      "references",
      "referencing",
      "regr_avgx",
      "regr_avgy",
      "regr_count",
      "regr_intercept",
      "regr_r2",
      "regr_slope",
      "regr_sxx",
      "regr_sxy",
      "regr_syy",
      "release",
      "result",
      "return",
      "returns",
      "revoke",
      "right",
      "rollback",
      "rollup",
      "row",
      "row_number",
      "rows",
      "running",
      "savepoint",
      "scope",
      "scroll",
      "search",
      "second",
      "seek",
      "select",
      "sensitive",
      "session_user",
      "set",
      "show",
      "similar",
      "sin",
      "sinh",
      "skip",
      "smallint",
      "some",
      "specific",
      "specifictype",
      "sql",
      "sqlexception",
      "sqlstate",
      "sqlwarning",
      "sqrt",
      "start",
      "static",
      "stddev_pop",
      "stddev_samp",
      "submultiset",
      "subset",
      "substring",
      "substring_regex",
      "succeeds",
      "sum",
      "symmetric",
      "system",
      "system_time",
      "system_user",
      "table",
      "tablesample",
      "tan",
      "tanh",
      "then",
      "time",
      "timestamp",
      "timezone_hour",
      "timezone_minute",
      "to",
      "trailing",
      "translate",
      "translate_regex",
      "translation",
      "treat",
      "trigger",
      "trim",
      "trim_array",
      "true",
      "truncate",
      "uescape",
      "union",
      "unique",
      "unknown",
      "unnest",
      "update",
      "upper",
      "user",
      "using",
      "value",
      "values",
      "value_of",
      "var_pop",
      "var_samp",
      "varbinary",
      "varchar",
      "varying",
      "versioning",
      "when",
      "whenever",
      "where",
      "width_bucket",
      "window",
      "with",
      "within",
      "without",
      "year",
      "add",
      "asc",
      "collation",
      "desc",
      "final",
      "first",
      "last",
      "view"
    ].filter((e3) => !r2.includes(e3)), c2 = {
      begin: n2.concat(/\b/, n2.either(...o2), /\s*\(/),
      relevance: 0,
      keywords: {
        built_in: o2
      }
    };
    return {
      name: "SQL",
      case_insensitive: true,
      illegal: /[{}]|<\//,
      keywords: {
        $pattern: /\b[\w\.]+/,
        keyword: ((e3, {
          exceptions: n3,
          when: t3
        } = {}) => {
          const a3 = t3;
          return n3 = n3 || [], e3.map((e4) => e4.match(/\|\d+$/) || n3.includes(e4) ? e4 : a3(e4) ? e4 + "|0" : e4);
        })(l2, {
          when: (e3) => e3.length < 3
        }),
        literal: a2,
        type: i2,
        built_in: [
          "current_catalog",
          "current_date",
          "current_default_transform_group",
          "current_path",
          "current_role",
          "current_schema",
          "current_transform_group_for_type",
          "current_user",
          "session_user",
          "system_time",
          "system_user",
          "current_time",
          "localtime",
          "current_timestamp",
          "localtimestamp"
        ]
      },
      contains: [{
        begin: n2.either(...s2),
        relevance: 0,
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: l2.concat(s2),
          literal: a2,
          type: i2
        }
      }, {
        className: "type",
        begin: n2.either("double precision", "large object", "with timezone", "without timezone")
      }, c2, {
        className: "variable",
        begin: /@[a-z0-9]+/
      }, {
        className: "string",
        variants: [{
          begin: /'/,
          end: /'/,
          contains: [{
            begin: /''/
          }]
        }]
      }, {
        begin: /"/,
        end: /"/,
        contains: [{
          begin: /""/
        }]
      }, e2.C_NUMBER_MODE, e2.C_BLOCK_COMMENT_MODE, t2, {
        className: "operator",
        begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
        relevance: 0
      }]
    };
  },
  grmr_swift: (e2) => {
    const n2 = {
      match: /\s+/,
      relevance: 0
    }, t2 = e2.COMMENT("/\\*", "\\*/", {
      contains: ["self"]
    }), a2 = [e2.C_LINE_COMMENT_MODE, t2], i2 = {
      match: [/\./, p(...Ee, ...ye)],
      className: {
        2: "keyword"
      }
    }, r2 = {
      match: m(/\./, p(...Ne)),
      relevance: 0
    }, s2 = Ne.filter((e3) => "string" == typeof e3).concat(["_|0"]), o2 = {
      variants: [{
        className: "keyword",
        match: p(...Ne.filter((e3) => "string" != typeof e3).concat(we).map(fe), ...ye)
      }]
    }, l2 = {
      $pattern: p(/\b\w+/, /#\w+/),
      keyword: s2.concat(ke),
      literal: ve
    }, c2 = [i2, r2, o2], d2 = [{
      match: m(/\./, p(...xe)),
      relevance: 0
    }, {
      className: "built_in",
      match: m(/\b/, p(...xe), /(?=\()/)
    }], u2 = {
      match: /->/,
      relevance: 0
    }, b2 = [u2, {
      className: "operator",
      relevance: 0,
      variants: [{
        match: Ae
      }, {
        match: `\\.(\\.|${Se})+`
      }]
    }], _2 = "([0-9a-fA-F]_*)+", h2 = {
      className: "number",
      relevance: 0,
      variants: [{
        match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
      }, {
        match: `\\b0x(${_2})(\\.(${_2}))?([pP][+-]?(([0-9]_*)+))?\\b`
      }, {
        match: /\b0o([0-7]_*)+\b/
      }, {
        match: /\b0b([01]_*)+\b/
      }]
    }, f2 = (e3 = "") => ({
      className: "subst",
      variants: [{
        match: m(/\\/, e3, /[0\\tnr"']/)
      }, {
        match: m(/\\/, e3, /u\{[0-9a-fA-F]{1,8}\}/)
      }]
    }), E2 = (e3 = "") => ({
      className: "subst",
      match: m(/\\/, e3, /[\t ]*(?:[\r\n]|\r\n)/)
    }), y2 = (e3 = "") => ({
      className: "subst",
      label: "interpol",
      begin: m(/\\/, e3, /\(/),
      end: /\)/
    }), w2 = (e3 = "") => ({
      begin: m(e3, /"""/),
      end: m(/"""/, e3),
      contains: [f2(e3), E2(e3), y2(e3)]
    }), N2 = (e3 = "") => ({
      begin: m(e3, /"/),
      end: m(/"/, e3),
      contains: [f2(e3), y2(e3)]
    }), v2 = {
      className: "string",
      variants: [w2(), w2("#"), w2("##"), w2("###"), N2(), N2("#"), N2("##"), N2("###")]
    }, O2 = {
      match: m(/`/, Re, /`/)
    }, k2 = [O2, {
      className: "variable",
      match: /\$\d+/
    }, {
      className: "variable",
      match: `\\$${Te}+`
    }], x2 = [{
      match: /(@|#(un)?)available/,
      className: "keyword",
      starts: {
        contains: [{
          begin: /\(/,
          end: /\)/,
          keywords: Le,
          contains: [...b2, h2, v2]
        }]
      }
    }, {
      className: "keyword",
      match: m(/@/, p(...Ie))
    }, {
      className: "meta",
      match: m(/@/, Re)
    }], M2 = {
      match: g(/\b[A-Z]/),
      relevance: 0,
      contains: [{
        className: "type",
        match: m(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Te, "+")
      }, {
        className: "type",
        match: De,
        relevance: 0
      }, {
        match: /[?!]+/,
        relevance: 0
      }, {
        match: /\.\.\./,
        relevance: 0
      }, {
        match: m(/\s+&\s+/, g(De)),
        relevance: 0
      }]
    }, S2 = {
      begin: /</,
      end: />/,
      keywords: l2,
      contains: [...a2, ...c2, ...x2, u2, M2]
    };
    M2.contains.push(S2);
    const A2 = {
      begin: /\(/,
      end: /\)/,
      relevance: 0,
      keywords: l2,
      contains: ["self", {
        match: m(Re, /\s*:/),
        keywords: "_|0",
        relevance: 0
      }, ...a2, ...c2, ...d2, ...b2, h2, v2, ...k2, ...x2, M2]
    }, C2 = {
      begin: /</,
      end: />/,
      contains: [...a2, M2]
    }, T2 = {
      begin: /\(/,
      end: /\)/,
      keywords: l2,
      contains: [{
        begin: p(g(m(Re, /\s*:/)), g(m(Re, /\s+/, Re, /\s*:/))),
        end: /:/,
        relevance: 0,
        contains: [{
          className: "keyword",
          match: /\b_\b/
        }, {
          className: "params",
          match: Re
        }]
      }, ...a2, ...c2, ...b2, h2, v2, ...x2, M2, A2],
      endsParent: true,
      illegal: /["']/
    }, R2 = {
      match: [/func/, /\s+/, p(O2.match, Re, Ae)],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [C2, T2, n2],
      illegal: [/\[/, /%/]
    }, D2 = {
      match: [/\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/],
      className: {
        1: "keyword"
      },
      contains: [C2, T2, n2],
      illegal: /\[|%/
    }, I2 = {
      match: [/operator/, /\s+/, Ae],
      className: {
        1: "keyword",
        3: "title"
      }
    }, L2 = {
      begin: [/precedencegroup/, /\s+/, De],
      className: {
        1: "keyword",
        3: "title"
      },
      contains: [M2],
      keywords: [...Oe, ...ve],
      end: /}/
    };
    for (const e3 of v2.variants) {
      const n3 = e3.contains.find((e4) => "interpol" === e4.label);
      n3.keywords = l2;
      const t3 = [...c2, ...d2, ...b2, h2, v2, ...k2];
      n3.contains = [...t3, {
        begin: /\(/,
        end: /\)/,
        contains: ["self", ...t3]
      }];
    }
    return {
      name: "Swift",
      keywords: l2,
      contains: [...a2, R2, D2, {
        beginKeywords: "struct protocol class extension enum actor",
        end: "\\{",
        excludeEnd: true,
        keywords: l2,
        contains: [e2.inherit(e2.TITLE_MODE, {
          className: "title.class",
          begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
        }), ...c2]
      }, I2, L2, {
        beginKeywords: "import",
        end: /$/,
        contains: [...a2],
        relevance: 0
      }, ...c2, ...d2, ...b2, h2, v2, ...k2, ...x2, M2, A2]
    };
  },
  grmr_typescript: (e2) => {
    const n2 = he(e2), t2 = ["any", "void", "number", "boolean", "string", "object", "never", "symbol", "bigint", "unknown"], a2 = {
      beginKeywords: "namespace",
      end: /\{/,
      excludeEnd: true,
      contains: [n2.exports.CLASS_REFERENCE]
    }, i2 = {
      beginKeywords: "interface",
      end: /\{/,
      excludeEnd: true,
      keywords: {
        keyword: "interface extends",
        built_in: t2
      },
      contains: [n2.exports.CLASS_REFERENCE]
    }, r2 = {
      $pattern: ce,
      keyword: de.concat([
        "type",
        "namespace",
        "interface",
        "public",
        "private",
        "protected",
        "implements",
        "declare",
        "abstract",
        "readonly",
        "enum",
        "override"
      ]),
      literal: ge,
      built_in: _e.concat(t2),
      "variable.language": pe
    }, s2 = {
      className: "meta",
      begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
    }, o2 = (e3, n3, t3) => {
      const a3 = e3.contains.findIndex((e4) => e4.label === n3);
      if (-1 === a3)
        throw Error("can not find mode to replace");
      e3.contains.splice(a3, 1, t3);
    };
    return Object.assign(n2.keywords, r2), n2.exports.PARAMS_CONTAINS.push(s2), n2.contains = n2.contains.concat([s2, a2, i2]), o2(n2, "shebang", e2.SHEBANG()), o2(n2, "use_strict", {
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use strict['"]/
    }), n2.contains.find((e3) => "func.def" === e3.label).relevance = 0, Object.assign(n2, {
      name: "TypeScript",
      aliases: ["ts", "tsx"]
    }), n2;
  },
  grmr_vbnet: (e2) => {
    const n2 = e2.regex, t2 = /\d{1,2}\/\d{1,2}\/\d{4}/, a2 = /\d{4}-\d{1,2}-\d{1,2}/, i2 = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, r2 = /\d{1,2}(:\d{1,2}){1,2}/, s2 = {
      className: "literal",
      variants: [{
        begin: n2.concat(/# */, n2.either(a2, t2), / *#/)
      }, {
        begin: n2.concat(/# */, r2, / *#/)
      }, {
        begin: n2.concat(/# */, i2, / *#/)
      }, {
        begin: n2.concat(/# */, n2.either(a2, t2), / +/, n2.either(i2, r2), / *#/)
      }]
    }, o2 = e2.COMMENT(/'''/, /$/, {
      contains: [{
        className: "doctag",
        begin: /<\/?/,
        end: />/
      }]
    }), l2 = e2.COMMENT(null, /$/, {
      variants: [{
        begin: /'/
      }, {
        begin: /([\t ]|^)REM(?=\s)/
      }]
    });
    return {
      name: "Visual Basic .NET",
      aliases: ["vb"],
      case_insensitive: true,
      classNameAliases: {
        label: "symbol"
      },
      keywords: {
        keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
        built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
        type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
        literal: "true false nothing"
      },
      illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
      contains: [{
        className: "string",
        begin: /"(""|[^/n])"C\b/
      }, {
        className: "string",
        begin: /"/,
        end: /"/,
        illegal: /\n/,
        contains: [{
          begin: /""/
        }]
      }, s2, {
        className: "number",
        relevance: 0,
        variants: [{
          begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
        }, {
          begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
        }, {
          begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
        }, {
          begin: /&O[0-7_]+((U?[SIL])|[%&])?/
        }, {
          begin: /&B[01_]+((U?[SIL])|[%&])?/
        }]
      }, {
        className: "label",
        begin: /^\w+:/
      }, o2, l2, {
        className: "meta",
        begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
        end: /$/,
        keywords: {
          keyword: "const disable else elseif enable end externalsource if region then"
        },
        contains: [l2]
      }]
    };
  },
  grmr_wasm: (e2) => {
    e2.regex;
    const n2 = e2.COMMENT(/\(;/, /;\)/);
    return n2.contains.push("self"), {
      name: "WebAssembly",
      keywords: {
        $pattern: /[\w.]+/,
        keyword: [
          "anyfunc",
          "block",
          "br",
          "br_if",
          "br_table",
          "call",
          "call_indirect",
          "data",
          "drop",
          "elem",
          "else",
          "end",
          "export",
          "func",
          "global.get",
          "global.set",
          "local.get",
          "local.set",
          "local.tee",
          "get_global",
          "get_local",
          "global",
          "if",
          "import",
          "local",
          "loop",
          "memory",
          "memory.grow",
          "memory.size",
          "module",
          "mut",
          "nop",
          "offset",
          "param",
          "result",
          "return",
          "select",
          "set_global",
          "set_local",
          "start",
          "table",
          "tee_local",
          "then",
          "type",
          "unreachable"
        ]
      },
      contains: [e2.COMMENT(/;;/, /$/), n2, {
        match: [/(?:offset|align)/, /\s*/, /=/],
        className: {
          1: "keyword",
          3: "operator"
        }
      }, {
        className: "variable",
        begin: /\$[\w_]+/
      }, {
        match: /(\((?!;)|\))+/,
        className: "punctuation",
        relevance: 0
      }, {
        begin: [/(?:func|call|call_indirect)/, /\s+/, /\$[^\s)]+/],
        className: {
          1: "keyword",
          3: "title.function"
        }
      }, e2.QUOTE_STRING_MODE, {
        match: /(i32|i64|f32|f64)(?!\.)/,
        className: "type"
      }, {
        className: "keyword",
        match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
      }, {
        className: "number",
        relevance: 0,
        match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
      }]
    };
  },
  grmr_yaml: (e2) => {
    const n2 = "true false yes no null", t2 = "[\\w#;/?:@&=+$,.~*'()[\\]]+", a2 = {
      className: "string",
      relevance: 0,
      variants: [{
        begin: /'/,
        end: /'/
      }, {
        begin: /"/,
        end: /"/
      }, {
        begin: /\S+/
      }],
      contains: [e2.BACKSLASH_ESCAPE, {
        className: "template-variable",
        variants: [{
          begin: /\{\{/,
          end: /\}\}/
        }, {
          begin: /%\{/,
          end: /\}/
        }]
      }]
    }, i2 = e2.inherit(a2, {
      variants: [{
        begin: /'/,
        end: /'/
      }, {
        begin: /"/,
        end: /"/
      }, {
        begin: /[^\s,{}[\]]+/
      }]
    }), r2 = {
      end: ",",
      endsWithParent: true,
      excludeEnd: true,
      keywords: n2,
      relevance: 0
    }, s2 = {
      begin: /\{/,
      end: /\}/,
      contains: [r2],
      illegal: "\\n",
      relevance: 0
    }, o2 = {
      begin: "\\[",
      end: "\\]",
      contains: [r2],
      illegal: "\\n",
      relevance: 0
    }, l2 = [{
      className: "attr",
      variants: [{
        begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)"
      }, {
        begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
      }, {
        begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)"
      }]
    }, {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    }, {
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    }, {
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    }, {
      className: "type",
      begin: "!\\w+!" + t2
    }, {
      className: "type",
      begin: "!<" + t2 + ">"
    }, {
      className: "type",
      begin: "!" + t2
    }, {
      className: "type",
      begin: "!!" + t2
    }, {
      className: "meta",
      begin: "&" + e2.UNDERSCORE_IDENT_RE + "$"
    }, {
      className: "meta",
      begin: "\\*" + e2.UNDERSCORE_IDENT_RE + "$"
    }, {
      className: "bullet",
      begin: "-(?=[ ]|$)",
      relevance: 0
    }, e2.HASH_COMMENT_MODE, {
      beginKeywords: n2,
      keywords: {
        literal: n2
      }
    }, {
      className: "number",
      begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
    }, {
      className: "number",
      begin: e2.C_NUMBER_RE + "\\b",
      relevance: 0
    }, s2, o2, a2], c2 = [...l2];
    return c2.pop(), c2.push(i2), r2.contains = c2, {
      name: "YAML",
      case_insensitive: true,
      aliases: ["yml"],
      contains: l2
    };
  }
});
const $e = V;
for (const e2 of Object.keys(Be)) {
  const n2 = e2.replace("grmr_", "").replace("_", "-");
  $e.registerLanguage(n2, Be[e2]);
}
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = makeMap("script,style");
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;
  stack.last = function() {
    return this[this.length - 1];
  };
  while (html) {
    chars = true;
    if (!stack.last() || !special[stack.last()]) {
      if (html.indexOf("<!--") == 0) {
        index = html.indexOf("-->");
        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }
          html = html.substring(index + 3);
          chars = false;
        }
      } else if (html.indexOf("</") == 0) {
        match = html.match(endTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        }
      } else if (html.indexOf("<") == 0) {
        match = html.match(startTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }
      if (chars) {
        index = html.indexOf("<");
        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);
        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text2) {
        text2 = text2.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
        if (handler.chars) {
          handler.chars(text2);
        }
        return "";
      });
      parseEndTag("", stack.last());
    }
    if (html == last) {
      throw "Parse Error: " + html;
    }
    last = html;
  }
  parseEndTag();
  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();
    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag("", stack.last());
      }
    }
    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }
    unary = empty[tagName] || !!unary;
    if (!unary) {
      stack.push(tagName);
    }
    if (handler.start) {
      var attrs2 = [];
      rest.replace(attr, function(match2, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
        attrs2.push({
          name,
          value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
          // "
        });
      });
      if (handler.start) {
        handler.start(tagName, attrs2, unary);
      }
    }
  }
  function parseEndTag(tag, tagName) {
    if (!tagName) {
      var pos = 0;
    } else {
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) {
          break;
        }
      }
    }
    if (pos >= 0) {
      for (var i2 = stack.length - 1; i2 >= pos; i2--) {
        if (handler.end) {
          handler.end(stack[i2]);
        }
      }
      stack.length = pos;
    }
  }
}
function makeMap(str) {
  var obj = {};
  var items = str.split(",");
  for (var i2 = 0; i2 < items.length; i2++) {
    obj[items[i2]] = true;
  }
  return obj;
}
function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs2) {
  return attrs2.reduce(function(pre, attr2) {
    var value = attr2.value;
    var name = attr2.name;
    if (pre[name]) {
      pre[name] = pre[name] + " " + value;
    } else {
      pre[name] = value;
    }
    return pre;
  }, {});
}
function parseHtml(html) {
  html = removeDOCTYPE(html);
  var stacks = [];
  var results = {
    node: "root",
    children: []
  };
  HTMLParser(html, {
    start: function start(tag, attrs2, unary) {
      var node = {
        name: tag
      };
      if (attrs2.length !== 0) {
        node.attrs = parseAttrs(attrs2);
      }
      if (unary) {
        var parent = stacks[0] || results;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function end(tag) {
      var node = stacks.shift();
      if (node.name !== tag)
        formatAppLog("error", "at uni_modules/uni-im/lib/html-parser.js:303", "invalid state: mismatch end tag");
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    chars: function chars(text) {
      var node = {
        type: "text",
        text
      };
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    comment: function comment(text) {
      var node = {
        node: "comment",
        text
      };
      var parent = stacks[0];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return results.children;
}
const _style_0$6 = { "rich-text-box": { "": { "width": "500rpx", "position": "relative", "!paddingTop": 0, "!paddingRight": 0, "!paddingBottom": 0, "!paddingLeft": 0 } }, "rich-text": { "": { "width": "500rpx", "fontSize": 14, "borderRadius": 10 } } };
const markdownIt = mt({
  // 在源码中启用 HTML 标签
  html: true,
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function(str, lang) {
    try {
      return '<pre class="hljs" style="tab-size: 4;padding: 5px 8px;overflow: auto;"><code>' + $e.highlightAuto(str).value + "</code></pre>";
    } catch (__) {
    }
    return '<pre class="hljs" style="tab-size: 4;padding: 5px 8px;overflow: auto;"><code>' + markdownIt.utils.escapeHtml(str) + "</code></pre>";
  }
});
let htmlString = "";
const _sfc_main$7 = {
  data() {
    return {
      nodes: [],
      webViewHeight: "100px"
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
        this.setWebViewConetnt(htmlString);
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    setWebViewConetnt(htmlString2) {
      if (this.$refs.web) {
        this.$refs.web.evalJs(`setHtml(${JSON.stringify(htmlString2)})`);
      }
    },
    onWebViewMsg(e2) {
      let [data] = e2.detail.data;
      if (data.action == "onJSBridgeReady") {
        this.setWebViewConetnt(htmlString);
      } else if (data.action == "onHeightChange") {
        this.webViewHeight = data.height;
      }
    }
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: "rich-text-box",
    renderWhole: true
  }, [
    createElementVNode("u-web-view", {
      ref: "web",
      "on:onPostMessage": _cache[0] || (_cache[0] = (...args) => $options.onWebViewMsg && $options.onWebViewMsg(...args)),
      src: "/static/app-plus/mp-html/uni-im-code-view-local.html",
      style: normalizeStyle({ "height": $data.webViewHeight }),
      class: "web-view"
    }, null, 36)
  ]);
}
const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["styles", [_style_0$6]]]);
const _imports_0 = "/uni_modules/uni-im/static/sound-ing.gif";
const _style_0$5 = { "box": { "": { "flexDirection": "column" } }, "msg-box": { "": { "width": "750rpx", "flexDirection": "row", "justifyContent": "flex-start", "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx", "marginTop": "16rpx", "marginRight": 0, "marginBottom": "16rpx", "marginLeft": 0, "position": "relative" } }, "msg-content": { "": { "marginTop": 0, "marginRight": "16rpx", "marginBottom": 0, "marginLeft": "16rpx", "flexDirection": "row", "alignItems": "center" } }, "username": { "": { "fontSize": "26rpx", "color": "#666666", "paddingLeft": "18rpx" } }, "text-box": { "": { "paddingTop": "18rpx", "paddingRight": "18rpx", "paddingBottom": "18rpx", "paddingLeft": "18rpx", "borderRadius": 5, "backgroundColor": "#FFFFFF", "flexDirection": "row", "flexWrap": "wrap", "justifyContent": "flex-start", "lineHeight": 20 } }, "rich-text-box": { "": { "paddingTop": "18rpx", "paddingRight": "18rpx", "paddingBottom": "18rpx", "paddingLeft": "18rpx", "borderRadius": 5, "backgroundColor": "#FFFFFF" } }, "rich-text": { "": { "backgroundColor": "rgba(0,0,0,0)", "width": "500rpx" } }, "msg-text": { "": { "fontSize": "30rpx", "justifyContent": "space-between" } }, "link": { "": { "color": "#007fff" } }, "self-text-box": { "": { "backgroundColor": "#4CD964" } }, "exceed": { "": { "width": "400rpx" } }, "msgStateIcon": { "": { "marginRight": "10rpx" } }, "video-box": { "": { "width": "200rpx", "height": "200rpx", "position": "relative" } }, "video-img": { "": { "width": "200rpx", "height": "200rpx" } }, "play-video-icon": { "": { "position": "absolute", "width": "60rpx", "height": "60rpx", "top": "70rpx", "left": "70rpx" } }, "video-box-mark": { "": { "position": "absolute", "top": 0, "left": 0, "backgroundColor": "rgba(0,0,0,0.1)" } }, "sound-box": { "": { "flexDirection": "row", "backgroundColor": "#94EB6A", "height": 44, "paddingTop": 10, "paddingRight": 10, "paddingBottom": 10, "paddingLeft": 10, "width": 66, "borderRadius": 5, "justifyContent": "flex-end", "alignItems": "center" } }, "sound-time": { "": { "fontSize": 14, "marginTop": 0, "marginRight": 4, "marginBottom": 0, "marginLeft": 4 } }, "sound-icon-active": { "": { "transform": "option", "opacity": 10, "backgroundColor": "#007AFF", "transitionProperty": "backgroundColor", "transitionDuration": 300, "transitionDelay": 100, "transitionTimingFunction": "cubic-bezier(0.25,0.1,0.25,1)" } }, "file-msg-box": { "": { "backgroundColor": "#FFFFFF", "width": "500rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "borderRadius": 8, "flexDirection": "row", "justifyContent": "space-between" } }, "file-msg-info": { "": { "width": "300rpx", "flexDirection": "column", "justifyContent": "space-around" } }, "file-msg-info-name": { "": { "fontSize": 16 } }, "file-msg-info-size": { "": { "fontSize": 12, "color": "#666666" } }, "reverse": { "": { "flexDirection": "row-reverse" } }, "rotate": { "": { "transform": "rotate(180deg)" } }, "revoke-text": { "": { "width": "750rpx", "textAlign": "center", "color": "#999999", "fontSize": 12 } }, "reverse-align": { "": { "alignItems": "flex-end" } }, "cite-box": { "": { "paddingTop": 5, "paddingRight": 8, "paddingBottom": 5, "paddingLeft": 8, "marginTop": 3, "marginRight": 5, "marginBottom": 3, "marginLeft": 5, "backgroundColor": "#e3e3e3", "color": "#6a6a6a", "borderRadius": 5, "width": "400rpx" } }, "cite-box-text": { "": { "lines": 2, "textOverflow": "ellipsis", "fontSize": 14 } }, "friendlyTime": { "": { "height": 22 } }, "format-time-text": { "": { "fontSize": 14, "textAlign": "center", "color": "#999999" } }, "@TRANSITION": { "sound-icon-active": { "property": "backgroundColor", "duration": 300, "delay": 100, "timingFunction": "cubic-bezier(0.25,0.1,0.25,1)" } } };
let audioContext = uniIm.audioContext;
const _sfc_main$6 = {
  data() {
    return {
      username: "用户名",
      videoUrl: "",
      soundPlayState: 0,
      mouseIn: false
      //鼠标在上面
    };
  },
  async mounted() {
    if (this.msg.type == "video") {
      this.videoUrl = await this.getTempFileURL();
    } else if (this.msg.type == "sound") {
      this.onPlay = async () => {
        let currentAudioUrl = await this.getTempFileURL();
        let src = uniIm.audioContext.src;
        if (src == currentAudioUrl) {
          this.soundPlayState = 1;
        } else {
          this.soundPlayState = 0;
        }
      };
      audioContext.onPlay(this.onPlay);
      this.soundPlayEnd = () => {
        this.soundPlayState = 0;
      };
      audioContext.onPause(this.soundPlayEnd);
      audioContext.onStop(this.soundPlayEnd);
      audioContext.onEnded(this.soundPlayEnd);
      audioContext.onError(this.soundPlayEnd);
    }
  },
  props: {
    msg: {
      type: Object,
      default() {
        return {
          body: ""
        };
      }
    },
    aboutMsg: {
      type: [Object, null],
      default() {
        return {};
      }
    },
    self: {
      type: Boolean,
      default() {
        return false;
      }
    },
    avatar_file: {
      type: [Object, String, Boolean],
      default() {
        return {
          url: "/uni_modules/uni-im/static/avatarUrl.png"
        };
      }
    },
    index: {
      type: Number
    },
    equalPrevTime: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    friendlyTime() {
      return uniImUtils.toFriendlyTime(this.msg.create_time || this.msg.client_create_time);
    },
    showDatetime() {
      return this.mouseIn || !this.equalPrevTime;
    },
    userInfo() {
      return uniIm.usersInfo[this.msg.from_uid] || {};
    },
    msgStateIcon() {
      switch (this.msg.state) {
        case 0:
          return "spinner-cycle";
        case -100:
          return "refresh-filled";
        case -200:
          return "info-filled";
        default:
          return false;
      }
    },
    mineId() {
      return Bs.getCurrentUserInfo().uid;
    },
    msgClass() {
      var msgClass = "";
      if (this.msg.type == "text") {
        this.msg.body += "";
        let textLength = this.msg.body.replace(/[\u0000-\u007f]/g, "a").replace(/[\u0080-\u07ff]/g, "aa").replace(
          /[\u0800-\uffff]/g,
          "aa"
        ).length;
        if (textLength > 30) {
          msgClass += " exceed";
        }
      }
      if (this.self) {
        msgClass += " self-text-box";
      }
      return msgClass;
    },
    avatarUrl() {
      var _a, _b;
      if (this.self) {
        return (_a = store.userInfo.avatar_file) == null ? void 0 : _a.url;
      } else {
        return (_b = this.userInfo.avatar_file) == null ? void 0 : _b.url;
      }
    },
    soundBoxWidth() {
      return uni.upx2px(750 / 60 * this.msg.body.time) + 50 + "px";
    },
    htmlString() {
      if (this.msg.type != "text") {
        return "";
      }
      let content = this.msg.body;
      if (/</g.test(content)) {
        return content;
      }
      if (!content) {
        return "";
      }
      let urlPattern = /(https?:\/\/|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
      content = content.replace(urlPattern, function(match) {
        var href = match;
        if (match.indexOf("http") == -1) {
          href = "http://" + match;
        }
        return '<a class="link" target="_blank" href="' + href + '">' + match + "</a> ";
      });
      return content;
    },
    nodes() {
      if (this.msg.body == this.htmlString) {
        return;
      }
      try {
        let nodes = parseHtml(this.htmlString);
        nodes.map((item) => {
          if (item.attrs && item.attrs.class) {
            item.attrs.class += " msg-text";
          } else {
            item.attrs = {
              class: "msg-text"
            };
          }
          return item;
        });
        return nodes;
      } catch (e2) {
        formatAppLog("error", "at uni_modules/uni-im/components/uni-im-msg/uni-im-msg.vue:303", "htmlString error：", e2);
        return "";
      }
    },
    fileSize() {
      if (this.msg.type == "file") {
        let size = this.msg.body.size;
        if (size < Math.pow(1024, 1)) {
          return parseInt(size * 10) / 10 + "B";
        } else if (size < Math.pow(1024, 2)) {
          return parseInt(size / Math.pow(1024, 1) * 10) / 10 + "KB";
        } else if (size < Math.pow(1024, 3)) {
          return parseInt(size / Math.pow(1024, 2) * 10) / 10 + "MB";
        } else {
          return "err";
        }
      }
    },
    fileName() {
      if (this.msg.type == "file") {
        let name = this.msg.body.name;
        if (name.length < 30) {
          return name;
        } else {
          return name.slice(0, 15) + "..." + name.slice(-15);
        }
      }
    }
  },
  methods: {
    getNicknameByUid(uid) {
      let userInfo = uniIm.usersInfo[uid];
      if (userInfo) {
        return userInfo.nickname;
      } else {
        return "";
      }
    },
    showMsgById() {
      this.$emit("showMsgById", this.aboutMsg._id);
    },
    clickLink(href) {
      plus.runtime.openURL(href);
    },
    async playSound() {
      audioContext.src = await this.getTempFileURL();
      setTimeout(() => {
        if (this.soundPlayState === 1) {
          audioContext.stop();
        } else {
          audioContext.stop();
          audioContext.play();
        }
      }, 0);
    },
    async previewImage() {
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-msg/uni-im-msg.vue:379", 213);
      uni.showLoading();
      let url = await this.getTempFileURL();
      uni.previewImage({
        urls: [url],
        complete() {
          uni.hideLoading();
        }
      });
    },
    async playVideo() {
      let url = await this.getTempFileURL();
      uni.navigateTo({
        url: "/uni_modules/uni-im/pages/common/video/video?url=" + url,
        animationDuration: 300,
        animationType: "fade-in"
      });
    },
    async showControl(e2) {
      let msgContentDomInfo;
      let ref = this.$refs["msg-content"];
      await new Promise((callback) => {
        const dom = weex.requireModule("dom");
        dom.getComponentRect(ref, (e3) => {
          msgContentDomInfo = e3.size;
          callback(e3);
        });
      });
      this.$emit("showControl", {
        index: this.index,
        msgContentDomInfo
      });
    },
    retriesSendMsg() {
      this.$emit("retriesSendMsg", this.msg);
    },
    async downLoadFile() {
      let url = await this.getTempFileURL();
      uni.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res2) => {
                uni.openDocument({
                  filePath: res2.savedFilePath
                });
              }
            });
          }
        }
      });
    },
    async getTempFileURL(param) {
      let fileid = param || this.msg.body.url;
      if (fileid.substring(0, 8) != "cloud://") {
        return fileid;
      }
      let res = await Bs.getTempFileURL({
        fileList: [fileid]
      });
      return res.fileList[0].tempFileURL;
    }
  },
  destroyed() {
    audioContext.offPlay(this.onPlay);
    audioContext.offPause(this.soundPlayEnd);
    audioContext.offStop(this.soundPlayEnd);
    audioContext.offEnded(this.soundPlayEnd);
    audioContext.offError(this.soundPlayEnd);
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cloud_image = resolveEasycom(resolveDynamicComponent("cloud-image"), __easycom_0);
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0$2);
  const _component_uni_im_icons = resolveEasycom(resolveDynamicComponent("uni-im-icons"), __easycom_3$1);
  const _component_rich_text = resolveComponent("rich-text");
  const _component_uni_im_code_view = resolveEasycom(resolveDynamicComponent("uni-im-code-view"), __easycom_3);
  return !$props.msg.is_delete ? (openBlock(), createElementBlock("view", {
    key: 0,
    class: "box",
    onMouseenter: _cache[5] || (_cache[5] = ($event) => $data.mouseIn = true),
    onMouseleave: _cache[6] || (_cache[6] = ($event) => $data.mouseIn = false),
    renderWhole: true
  }, [
    createElementVNode("view", { class: "friendlyTime" }, [
      $options.showDatetime ? (openBlock(), createElementBlock("u-text", {
        key: 0,
        class: "format-time-text"
      }, toDisplayString($options.friendlyTime), 1)) : createCommentVNode("", true)
    ]),
    createElementVNode("view", {
      class: normalizeClass(["msg-box", { reverse: $props.self }])
    }, [
      $props.msg.is_revoke ? (openBlock(), createElementBlock("u-text", {
        key: 0,
        class: "revoke-text"
      }, "已被撤回")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createVNode(_component_cloud_image, {
          width: "80rpx",
          height: "80rpx",
          borderRadius: "5px",
          src: $options.avatarUrl || "/uni_modules/uni-im/static/avatarUrl.png",
          mode: "widthFix",
          class: "avatarUrl"
        }, null, 8, ["src"]),
        createElementVNode("view", {
          class: normalizeClass({ "reverse-align": $props.self })
        }, [
          !$props.self ? (openBlock(), createElementBlock("u-text", {
            key: 0,
            selectable: true,
            class: "username"
          }, toDisplayString($options.userInfo.nickname), 1)) : createCommentVNode("", true),
          $props.msg.about_msg_id ? (openBlock(), createElementBlock("view", {
            key: 1,
            class: "cite-box"
          }, [
            $props.aboutMsg.is_revoke ? (openBlock(), createElementBlock("u-text", {
              key: 0,
              class: "cite-box-text"
            }, "回复的消息已被撤回")) : (openBlock(), createElementBlock("u-text", {
              key: 1,
              class: "cite-box-text pointer",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.showMsgById && $options.showMsgById(...args))
            }, toDisplayString($options.getNicknameByUid($props.aboutMsg.from_uid)) + "：" + toDisplayString($props.aboutMsg.body), 1))
          ])) : createCommentVNode("", true),
          createElementVNode("view", {
            class: "msg-content",
            onLongpress: _cache[4] || (_cache[4] = (...args) => $options.showControl && $options.showControl(...args)),
            ref: "msg-content"
          }, [
            $props.self && $props.msg.state != 100 && $options.msgStateIcon ? (openBlock(), createBlock(_component_uni_icons, {
              key: 0,
              onClick: $options.retriesSendMsg,
              color: $props.msg.state === 0 ? "#999" : "#d22",
              type: $options.msgStateIcon,
              class: "msgStateIcon"
            }, null, 8, ["onClick", "color", "type"])) : createCommentVNode("", true),
            $props.msg.type == "image" ? (openBlock(), createBlock(_component_cloud_image, {
              key: 1,
              width: "200rpx",
              height: "200rpx",
              onClick: $options.previewImage,
              class: "cloud-image",
              src: $props.msg.body.url,
              mode: "aspectFill"
            }, null, 8, ["onClick", "src"])) : createCommentVNode("", true),
            $props.msg.type == "sound" ? (openBlock(), createElementBlock("view", {
              key: 2,
              onClick: _cache[1] || (_cache[1] = (...args) => $options.playSound && $options.playSound(...args)),
              class: normalizeClass(["text selfText sound-box", { reverse: !$props.self }]),
              style: normalizeStyle({ width: $options.soundBoxWidth })
            }, [
              createElementVNode("u-text", { class: "sound-time" }, toDisplayString($props.msg.body.time) + "''", 1),
              createElementVNode("view", {
                class: normalizeClass(["sound-icon-box", { rotate: !$props.self }]),
                style: { "width": "18px", "height": "18px" }
              }, [
                $data.soundPlayState ? (openBlock(), createElementBlock("u-image", {
                  key: 0,
                  src: _imports_0,
                  style: { "width": "18px", "height": "18px" },
                  mode: "widthFix"
                })) : (openBlock(), createBlock(_component_uni_im_icons, {
                  key: 1,
                  class: normalizeClass({ "sound-icon-active": $data.soundPlayState }),
                  code: "e6f5",
                  size: "18px",
                  color: "#000000"
                }, null, 8, ["class"]))
              ], 2)
            ], 6)) : createCommentVNode("", true),
            $props.msg.type == "text" ? (openBlock(), createElementBlock("view", {
              key: 3,
              class: normalizeClass(["rich-text-box", $options.msgClass])
            }, [
              $props.msg.body == $options.htmlString ? (openBlock(), createElementBlock("u-text", {
                key: 0,
                class: "msg-text"
              }, toDisplayString($props.msg.body), 1)) : (openBlock(), createBlock(_component_rich_text, {
                key: 1,
                class: "rich-text",
                onClickLink: $options.clickLink,
                nodes: $options.nodes
              }, null, 8, ["onClickLink", "nodes"]))
            ], 2)) : createCommentVNode("", true),
            $props.msg.type == "code" ? (openBlock(), createBlock(_component_uni_im_code_view, {
              key: 4,
              code: $props.msg.body
            }, null, 8, ["code"])) : createCommentVNode("", true),
            $props.msg.type == "video" ? (openBlock(), createElementBlock("view", {
              key: 5,
              onClick: _cache[2] || (_cache[2] = (...args) => $options.playVideo && $options.playVideo(...args)),
              class: "video-box"
            }, [
              createElementVNode("u-image", {
                class: "video-img",
                mode: "aspectFill",
                src: $data.videoUrl + "?x-oss-process=video/snapshot,t_1000,f_jpg,w_200,m_fast,ar_auto"
              }, null, 8, ["src"]),
              createElementVNode("view", { class: "video-box-mark" }),
              createVNode(_component_uni_im_icons, {
                code: "e650",
                size: "35",
                color: "#FFF",
                class: "play-video-icon"
              })
            ])) : createCommentVNode("", true),
            $props.msg.type == "file" ? (openBlock(), createElementBlock("view", {
              key: 6,
              class: "file-msg-box",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.downLoadFile && $options.downLoadFile(...args))
            }, [
              createElementVNode("view", { class: "file-msg-info" }, [
                createElementVNode("u-text", { class: "file-msg-info-name" }, toDisplayString($options.fileName), 1),
                createElementVNode("u-text", { class: "file-msg-info-size" }, toDisplayString($options.fileSize), 1)
              ]),
              createVNode(_component_uni_im_icons, {
                code: "e858",
                size: "50",
                color: "#EEEEEE",
                class: "file-icon"
              })
            ])) : createCommentVNode("", true)
          ], 544)
        ], 2)
      ], 64))
    ], 2)
  ], 32)) : createCommentVNode("", true);
}
const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["styles", [_style_0$5]]]);
const _style_0$4 = { "list-root": { "": { "flex": 1 } }, "list": { "": { "flex": 1 } } };
const _sfc_main$5 = {
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
    scroll(e2) {
      this.$emit("scroll", e2);
    }
  },
  mounted() {
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: "list-root",
    renderWhole: true
  }, [
    createElementVNode("list", {
      class: "list",
      bounce: false,
      renderReverse: true
    }, [
      renderSlot(_ctx.$slots, "default"),
      createElementVNode("cell", {
        keepScrollPosition: true,
        renderReversePosition: true,
        ref: "uni-im-list-last-item"
      }, null, 512)
    ])
  ]);
}
const uniImList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["styles", [_style_0$4]]]);
const _sfc_main$4 = {
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {}
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("cell", { keepScrollPosition: true }, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const uniImListItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _style_0$3 = { "root": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "uni-im-list": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "item": { "": { "marginTop": 15, "marginRight": 0, "marginBottom": 15, "marginLeft": 0 } }, "mg-15": { "": { "marginTop": 15, "marginRight": 15, "marginBottom": 15, "marginLeft": 15 } }, "data-state-tip-box": { "": { "alignItems": "center", "justifyContent": "center", "flexDirection": "row", "color": "#999999" } }, "data-state-tip-text": { "": { "height": 36, "lineHeight": 36, "fontSize": 12, "marginTop": 0, "marginRight": 5, "marginBottom": 0, "marginLeft": 5, "color": "#999999" } }, "system-msg-box": { "": { "marginBottom": 10, "alignItems": "center" } }, "msg-box": { "": { "transitionProperty": "backgroundColor", "transitionDuration": 2e3 } }, "active-index": { "": { "backgroundColor": "#f9f9f9" } }, "slider-box": { "": { "borderWidth": 1, "borderStyle": "solid", "borderColor": "#000000", "position": "fixed", "width": "750rpx", "height": 55, "top": 60, "right": 0, "zIndex": 999, "backgroundColor": "#FFFFFF" } }, "ask-line": { "": { "width": "750rpx", "textAlign": "center", "color": "#666666", "fontSize": 12 } }, "showCallMe": { "": { "backgroundColor": "#62caf8", "borderRadius": 50, "paddingTop": 2, "paddingRight": 15, "paddingBottom": 2, "paddingLeft": 15, "fontSize": 12, "color": "#FFFFFF", "position": "fixed", "right": 5, "top": 10 } }, "@TRANSITION": { "msg-box": { "property": "backgroundColor", "duration": 2e3 } } };
let loadMoreIndex = 0;
let pageLimit = 10;
let currentScrollTop = 0;
const nativePluginDom = requireNativePlugin("dom");
const _sfc_main$3 = {
  components: {
    uniImList,
    uniImListItem
  },
  computed: {
    ...uniIm.mapState(["systemInfo", "isWidescreen", "heartbeat"]),
    loadState() {
      return this.hasMore ? "正在加载历史消息" : "没有更多历史消息";
    },
    msgList() {
      return this.conversation.msgList || [];
    },
    isSafariPc() {
      return false;
    },
    listHeight() {
      return this.systemInfo.windowHeight - parseInt(this.paddingBottom) - 44 + "px";
    }
  },
  data() {
    return {
      val: 0,
      conversation: {},
      scrollIntoView: "",
      nextScrollIntoView: "11",
      scrollTop: 0,
      hasMore: true,
      tasksList: [],
      call_list: [],
      activeIndex: ""
    };
  },
  watch: {
    "conversation.call_list"(call_list) {
      this.call_list = call_list;
    }
  },
  props: {
    paddingBottom: {
      default: ""
    },
    conversationId: {
      default() {
        return false;
      }
    }
  },
  async mounted() {
  },
  methods: {
    getAboutMsg(about_msg_id) {
      return this.msgList.find((i2) => i2._id == about_msg_id);
    },
    equalPrevTime(index) {
      const getFriendlyTime = (msg) => {
        return uniImUtils.toFriendlyTime(msg.create_time || msg.client_create_time);
      };
      if (index === 0) {
        return false;
      } else if (index == this.msgList.length - 1) {
        return false;
      } else {
        return getFriendlyTime(this.msgList[index]) == getFriendlyTime(this.msgList[index - 1]);
      }
    },
    async showCallMe() {
      let msgId = this.conversation.call_list.pop();
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-msg-list/uni-im-msg-list.vue:155", "msgId", msgId);
      this.showMsgById(msgId);
    },
    async showViewByIndex(index, duration = 300) {
      if (index == -1) {
        return;
      }
      let target = this.$refs["item-" + index][0];
      nativePluginDom.scrollToElement(target, {
        // animated: duration != 0,
        // offset: 999
      });
    },
    async sliderChange(e2) {
      let index = e2.detail.value;
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-msg-list/uni-im-msg-list.vue:204", index);
      this.val = index;
      this.showViewByIndex(index);
    },
    async init() {
      this.conversation = await uniIm.conversation.get(this.conversationId);
      this.scrollIntoView = "";
      this.scrollTop = 0;
      currentScrollTop = 0;
      this.hasMore = true;
      this.tasksList = [];
      this.loadMore.lock = false;
      loadMoreIndex = 0;
      if (!this.conversation.isInit) {
        await this.loadMore({ "showLast": true });
      } else {
        if (this.msgList.length < pageLimit) {
          this.hasMore = false;
        }
      }
    },
    async loadMore(param = { "showLast": false }) {
      if (this.loadMore.lock || !this.hasMore) {
        return [];
      }
      this.loadMore.lock = true;
      let data = await this.conversation.msgManager.getMore() || [];
      this.hasMore = data.length != 0;
      if (data.length) {
        this.tasksList.push(async () => {
          await uniIm.conversation.get(data[0].conversation_id);
          if (!this.conversation.isInit) {
            this.conversation.msgList.clear();
          }
          this.conversation.msgList.unshift(...data);
          this.conversation.isInit = true;
          this.$nextTick(async () => {
            this.loadMore.lock = false;
            if (param.showLast) {
              this.showLast();
            }
            loadMoreIndex++;
            if (this.hasMore && this.msgList.length < pageLimit && loadMoreIndex < 3) {
              await this.loadMore({ "showLast": true });
            }
          });
        });
        await this.doTasksListBefore();
      }
      return data;
    },
    async doTasksListBefore() {
      if (this.tasksList.length) {
        await this.doTasksList();
      }
    },
    showMsgById(showMsgById) {
      let index = this.msgList.findIndex((i2) => i2._id == showMsgById);
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = "";
      }, 1500);
      this.showViewByIndex(index);
    },
    async doTasksList() {
      let length = this.tasksList.length;
      for (let i2 = 0; i2 < length; i2++) {
        let fun = this.tasksList.shift();
        if (typeof fun == "function") {
          await fun();
        }
      }
    },
    showLast(duration = 300) {
      let mLength = this.msgList.length;
      this.showViewByIndex(mLength - 1);
    },
    onScroll(e2) {
      currentScrollTop = e2.detail.scrollTop;
      if (currentScrollTop < 300) {
        this.loadMore();
      }
      let fun = () => {
        if (currentScrollTop < 300) {
          this.loadMore();
        }
      };
      debounce(fun, 1500)();
    },
    showControl(e2) {
      this.$emit("showControl", e2);
    },
    retriesSendMsg(e2) {
      this.$emit("retriesSendMsg", e2);
    },
    //当前用户自己的uid
    current_uid() {
      return Bs.getCurrentUserInfo().uid;
    },
    clickItem() {
      this.$emit("clickItem");
    }
  }
};
let timers = [];
function debounce(fn, delay) {
  return function() {
    if (timers.length) {
      timers.forEach((timer2) => clearTimeout(timer2));
    }
    let timer = setTimeout(fn, delay);
    timers.push(timer);
  };
}
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_button = resolveComponent("button");
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0$2);
  const _component_uni_im_msg_system = resolveEasycom(resolveDynamicComponent("uni-im-msg-system"), __easycom_1);
  const _component_uni_im_msg = resolveEasycom(resolveDynamicComponent("uni-im-msg"), __easycom_2$1);
  const _component_uni_im_list_item = resolveComponent("uni-im-list-item");
  const _component_uni_im_list = resolveComponent("uni-im-list");
  const _component_uni_load_more = resolveEasycom(resolveDynamicComponent("uni-load-more"), __easycom_3$2);
  return openBlock(), createElementBlock("view", {
    class: "root",
    renderWhole: true
  }, [
    $options.msgList.length ? (openBlock(), createBlock(_component_uni_im_list, {
      key: 0,
      class: "uni-im-list",
      onScroll: $options.onScroll,
      style: normalizeStyle({ "height": $options.listHeight }),
      scrollTop: $data.scrollTop,
      "scroll-into-view": $data.scrollIntoView,
      paddingBottom: $props.paddingBottom,
      ref: "uni-im-list"
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.msgList, (msg, index) => {
          return openBlock(), createBlock(_component_uni_im_list_item, {
            key: msg._id,
            ref_for: true,
            ref: "item-" + index
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: "item",
                id: "item-" + index,
                onClick: _cache[1] || (_cache[1] = (...args) => $options.clickItem && $options.clickItem(...args))
              }, [
                index === 0 ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "data-state-tip-box",
                  onAppear: _cache[0] || (_cache[0] = (...args) => $options.loadMore && $options.loadMore(...args))
                }, [
                  $options.isSafariPc ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    $data.hasMore ? (openBlock(), createBlock(_component_button, {
                      key: 0,
                      class: "loadMore-btn",
                      onClick: $options.loadMore
                    }, {
                      default: withCtx(() => [
                        createTextVNode("点击加载更多")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : (openBlock(), createElementBlock("u-text", {
                      key: 1,
                      class: "data-state-tip-text"
                    }, "没有更多历史消息"))
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    $data.hasMore ? (openBlock(), createBlock(_component_uni_icons, {
                      key: 0,
                      size: "25px",
                      color: "#ccc",
                      type: "spinner-cycle",
                      class: "data-state-tip-icon"
                    })) : createCommentVNode("", true),
                    createElementVNode("u-text", { class: "data-state-tip-text" }, toDisplayString($data.hasMore ? "正在加载历史消息" : "没有更多历史消息"), 1)
                  ], 64))
                ], 32)) : createCommentVNode("", true),
                msg.type == "system" ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "system-msg-box"
                }, [
                  createVNode(_component_uni_im_msg_system, { msg }, null, 8, ["msg"])
                ])) : (openBlock(), createElementBlock("view", {
                  key: 2,
                  class: normalizeClass(["msg-box", { "active-index": index === $data.activeIndex }])
                }, [
                  createVNode(_component_uni_im_msg, {
                    onShowMsgById: $options.showMsgById,
                    msg,
                    self: $options.current_uid() == msg.from_uid,
                    index,
                    onShowControl: $options.showControl,
                    onRetriesSendMsg: $options.retriesSendMsg,
                    equalPrevTime: $options.equalPrevTime(index),
                    avatar_file: $data.conversation.avatar_file,
                    aboutMsg: $options.getAboutMsg(msg.about_msg_id),
                    ref_for: true,
                    ref: "uni-im-msg",
                    class: "uni-im-msg"
                  }, null, 8, ["onShowMsgById", "msg", "self", "index", "onShowControl", "onRetriesSendMsg", "equalPrevTime", "avatar_file", "aboutMsg"])
                ], 2))
              ], 8, ["id"])
            ]),
            _: 2
          }, 1024);
        }), 128))
      ]),
      _: 1
    }, 8, ["onScroll", "style", "scrollTop", "scroll-into-view", "paddingBottom"])) : createCommentVNode("", true),
    $options.msgList.length == 0 ? (openBlock(), createBlock(_component_uni_load_more, {
      key: 1,
      status: $data.hasMore ? "loading" : "noMore",
      class: "mg-15",
      contentText: { "contentrefresh": "加载中", "contentnomore": "- 没有聊天记录 -" }
    }, null, 8, ["status"])) : createCommentVNode("", true),
    $data.call_list.length ? (openBlock(), createElementBlock("view", {
      key: 2,
      class: "showCallMe",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.showCallMe && $options.showCallMe(...args))
    }, [
      createElementVNode("u-text", null, "@回复我(" + toDisplayString($data.call_list.length) + ")", 1)
    ])) : createCommentVNode("", true)
  ]);
}
const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["styles", [_style_0$3]]]);
const _style_0$2 = { "sound-buttom": { "": { "backgroundColor": "#ffffff", "paddingTop": 10, "paddingRight": 10, "paddingBottom": 10, "paddingLeft": 10, "width": "450rpx", "height": 46, "fontSize": 16, "alignItems": "flex-start", "justifyContent": "center" } }, "sound-text": { "": { "position": "relative", "left": "-20rpx", "width": "450rpx", "fontSize": 14, "textAlign": "center" } }, "sound-tip": { "": { "position": "fixed", "left": 0, "bottom": 95, "width": "750rpx", "textAlign": "center", "justifyContent": "center", "alignItems": "center" } }, "sound-tip-text": { "": { "marginBottom": 10, "color": "#999999", "fontSize": 14 } }, "closeIcon": { "": { "width": 30, "height": 30, "backgroundColor": "#DDDDDD", "borderRadius": 100, "justifyContent": "center", "alignItems": "center" } }, "sound-progress": { "": { "height": 44, "position": "absolute", "left": 0, "top": 0, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "transitionProperty": "width", "transitionDuration": 200, "transitionTimingFunction": "linear", "backgroundColor": "#2faf4c", "opacity": 0.3 } }, "soundState": { "": { "backgroundColor": "#efefef" } }, "mark": { "": { "width": "750rpx", "position": "fixed", "top": 0, "left": 0, "bottom": 57, "right": 0, "backgroundColor": "rgba(0,0,0,0.7)", "flex": 1 } }, "@TRANSITION": { "sound-progress": { "property": "width", "duration": 200, "timingFunction": "linear" } } };
const recorderManager = uni.getRecorderManager();
const systemInfo = uniIm.systemInfo;
let soundInterval, startTime;
const _sfc_main$2 = {
  emits: ["success"],
  data() {
    return {
      soundState: 0,
      soundProgress: 0,
      cancel: false,
      time: 0,
      phoneBH: 0
    };
  },
  computed: {
    markBottom() {
      let markBottom = 58;
      return markBottom + "px";
    }
  },
  created() {
    recorderManager.onStop((res) => {
      if (!this.cancel) {
        if (this.time < 2) {
          return uni.showToast({
            title: "语音时间过短",
            icon: "none"
          });
        }
        uni.showLoading({
          title: "上传中",
          mask: false
        });
        Bs.uploadFile({
          filePath: res.tempFilePath,
          cloudPath: "uni-im/" + Bs.getCurrentUserInfo().uid + "/sound/" + Date.now() + ".mp3",
          // fileType:"audio",
          success: (e2) => {
            formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:67", "uniCloud.uploadFile-success", e2, "success", { "url": e2.fileID, time: this.time });
            try {
              this.$emit("success", { "url": e2.fileID, time: this.time });
            } catch (e3) {
              formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:71", e3);
            }
            uni.hideLoading();
          },
          fail: (e2) => {
            formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:77", e2);
            uni.showModal({
              content: JSON.stringify(e2),
              showCancel: false,
              confirmText: "知道了"
            });
          },
          complete: (e2) => {
            formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:85", "complete", e2);
            uni.hideLoading();
          }
        });
      } else {
        formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:90", "用户取消了录音功能", "this.time:" + this.time);
      }
    });
    recorderManager.onStart((e2) => {
    });
    recorderManager.onPause((e2) => {
    });
    recorderManager.onError((e2) => {
      formatAppLog("error", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:101", e2);
    });
  },
  methods: {
    touchmove(e2) {
      let y2 = e2.touches[0].screenY;
      if (systemInfo.safeArea.bottom - y2 > 58) {
        this.cancel = true;
      } else {
        this.cancel = false;
      }
    },
    soundStart(e2) {
      uniIm.audioContext.stop();
      this.time = 0;
      recorderManager.start({
        sampleRate: 16e3,
        numberOfChannels: 2,
        format: "mp3"
      });
      startTime = Date.now();
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:148", "soundStart");
      this.soundState = 1;
      soundInterval = setInterval(() => {
        this.soundProgress = parseInt(this.soundProgress) + uni.upx2px(450 / 60) + "px";
        this.time = parseInt((Date.now() - startTime) / 1e3);
      }, 1e3);
    },
    soundEnd() {
      recorderManager.stop();
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue:163", "soundEnd");
      clearInterval(soundInterval);
      setTimeout(() => {
        this.soundState = 0;
        this.soundProgress = 0;
        this.cancel = false;
      }, 300);
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_im_icons = resolveEasycom(resolveDynamicComponent("uni-im-icons"), __easycom_3$1);
  return openBlock(), createElementBlock("view", { renderWhole: true }, [
    createElementVNode("view", {
      style: normalizeStyle({ "height": $data.soundState ? "" : 0, bottom: $options.markBottom }),
      class: "mark"
    }, null, 4),
    createElementVNode("view", {
      onTouchmove: _cache[0] || (_cache[0] = (...args) => $options.touchmove && $options.touchmove(...args)),
      onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.soundStart && $options.soundStart(...args)),
      onTouchend: _cache[2] || (_cache[2] = (...args) => $options.soundEnd && $options.soundEnd(...args)),
      onTouchcancel: _cache[3] || (_cache[3] = (...args) => $options.soundEnd && $options.soundEnd(...args)),
      class: normalizeClass(["sound-buttom", { soundState: $data.soundState }])
    }, [
      $data.soundProgress ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "sound-progress",
        style: normalizeStyle({ "width": $data.soundProgress })
      }, null, 4)) : createCommentVNode("", true),
      createElementVNode("u-text", { class: "sound-text" }, toDisplayString($data.soundState ? "录音中（" + $data.time + "s）" : "按住 说话"), 1),
      $data.soundState ? (openBlock(), createElementBlock("view", {
        key: 1,
        class: "sound-tip"
      }, [
        createElementVNode("u-text", {
          class: "sound-tip-text",
          style: normalizeStyle({ color: $data.cancel ? "#f70000" : "#FFFFFF" })
        }, toDisplayString($data.cancel ? "松手取消" : "松手发送，上划取消"), 5),
        createElementVNode("view", {
          class: "closeIcon",
          style: normalizeStyle({ "background-color": $data.cancel ? "#f70000" : "#EEEEEE" })
        }, [
          createVNode(_component_uni_im_icons, {
            code: "e61a",
            size: "10px",
            color: "#FFFFFF"
          })
        ], 4)
      ])) : createCommentVNode("", true)
    ], 34)
  ]);
}
const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$2]]]);
const _style_0$1 = { "control": { "": { "backgroundColor": "#252a30", "height": 55, "position": "fixed", "top": 0, "borderRadius": 5, "flexDirection": "row", "justifyContent": "space-around", "alignItems": "center" } }, "control-item": { "": { "width": "100rpx", "justifyContent": "center", "alignItems": "center" } }, "control-item-text": { "": { "fontSize": 12, "color": "#FFFFFF", "marginTop": 1 } }, "uni-im-control-mark": { "": { "position": "fixed", "top": 0, "left": 0, "width": "750rpx", "flex": 1, "height": 9e3, "backgroundColor": "rgba(0,0,0,0.1)" } }, "icon-box": { "": { "width": "750rpx", "height": 20, "position": "fixed", "transform": "translate(0, -10px)", "justifyContent": "center", "alignItems": "center" } }, "icon": { "": { "position": "absolute", "backgroundColor": "#252a30", "width": 10, "height": 10, "transform": "rotate(45deg)" } }, "isInTop": { "": { "transform": "translate(0, 45px)" } } };
const _sfc_main$1 = {
  beforeCreate() {
  },
  data() {
    return {
      isShow: false,
      data: {
        top: "",
        left: "",
        right: "",
        width: "",
        msg: {},
        isInTop: false
      }
    };
  },
  computed: {
    iconBoxLeft() {
      let n2 = parseInt(this.data.left);
      return n2 ? n2 * 3 / 2 + 55 + "px" : "";
    },
    iconBoxRight() {
      let n2 = parseInt(this.data.right);
      return n2 ? n2 * 3 / 2 + 50 + "px" : "";
    }
  },
  watch: {
    isShow(isShow) {
    }
  },
  mounted() {
  },
  methods: {
    show(data) {
      this.data = data;
      this.isShow = true;
    },
    copyText() {
      formatAppLog("log", "at uni_modules/uni-im/components/uni-im-control/uni-im-control.vue:113", "this.data", this.data);
      uni.setClipboardData({
        data: this.data.msg.body,
        complete: (e2) => {
          uni.hideToast();
          formatAppLog("log", "at uni_modules/uni-im/components/uni-im-control/uni-im-control.vue:118", e2);
          this.isShow = false;
        }
      });
    },
    canRevoke() {
      let current_uid = Bs.getCurrentUserInfo().uid;
      let { group_id, from_uid, conversation_id, create_time } = this.data.msg || {};
      let isGroupAdmin = false;
      if (group_id) {
        let conversation = uniIm.conversation.dataList.find((i2) => i2.id == conversation_id);
        isGroupAdmin = conversation.group_info.user_id == current_uid;
      }
      if (isGroupAdmin) {
        return true;
      } else {
        return from_uid == current_uid && Date.now() - create_time < 1e3 * 60 * 2;
      }
    },
    async revokeMsg() {
      if (this.canRevoke()) {
        await uniIm.conversation.revokeMsg(this.data.msg);
      } else {
        uni.showToast({
          title: "已超过2分钟，不能撤回",
          icon: "none"
        });
      }
      this.isShow = false;
    },
    async answer() {
      this.$emit("answer", this.data.msgIndex);
      this.isShow = false;
    },
    async deleteMsg() {
      return this.other();
    },
    other() {
      uni.showToast({
        title: "暂不支持",
        icon: "none",
        complete: () => {
          this.isShow = false;
        }
      });
    },
    closeMe() {
      setTimeout(() => {
        this.isShow = false;
      }, 300);
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.isShow ? (openBlock(), createElementBlock("view", {
    key: 0,
    renderWhole: true
  }, [
    createElementVNode("view", {
      class: "uni-im-control-mark",
      onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.closeMe && $options.closeMe(...args)),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.closeMe && $options.closeMe(...args))
    }, null, 32),
    createElementVNode("view", {
      class: "control",
      style: normalizeStyle({ top: $data.data.top, left: $data.data.left, right: $data.data.right })
    }, [
      $data.data.msg.type == "text" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createElementVNode("view", {
          class: "control-item",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.copyText && $options.copyText(...args))
        }, [
          createElementVNode("u-text", { class: "control-item-text" }, "复制")
        ]),
        createElementVNode("view", {
          class: "control-item",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.answer && $options.answer(...args))
        }, [
          createElementVNode("u-text", { class: "control-item-text" }, "回复")
        ]),
        $options.canRevoke() ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "control-item",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.revokeMsg && $options.revokeMsg(...args))
        }, [
          createElementVNode("u-text", { class: "control-item-text" }, "撤回")
        ])) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true),
      createElementVNode("view", {
        class: "control-item",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.deleteMsg && $options.deleteMsg(...args))
      }, [
        createElementVNode("u-text", { class: "control-item-text" }, "删除")
      ]),
      createElementVNode("view", {
        class: "control-item",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.other && $options.other(...args))
      }, [
        createElementVNode("u-text", { class: "control-item-text" }, "转发")
      ])
    ], 4),
    createElementVNode("view", {
      class: normalizeClass(["icon-box", { isInTop: $data.data.isInTop }]),
      style: normalizeStyle({ top: $data.data.top })
    }, [
      createElementVNode("view", {
        class: "icon",
        style: normalizeStyle({ right: $options.iconBoxRight, left: $options.iconBoxLeft })
      }, null, 4)
    ], 6)
  ])) : createCommentVNode("", true);
}
const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const emojiCodes = `😀,😁,😂,🤣,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,☺️,🙂,🤗,🤩,🤔,🤨,😐,😑,😶,🙄,😏,😣,😥,😮,🤐,😯,😪,😫,😴,😌,😛,😜,😝,🤤,😒,😓,😔,😕,🙃,🤑,😲,☹️,🙁,😖,😞,😟,😤,😢,😭,😦,😧,😨,😩,🤯,😬,😰,😱,😳,🤪,😵,😡,😠,🤬,😷,🤒,🤕,🤢,🤮,🤧,😇,🤠,🤡,🤥,🤫,🤭,🧐,🤓,😈,👿,👹,👺,💀,☠️,👻,👽,🤖,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🙈,🙉,🙊,👶,🧒,👦,👧,🧑,👨,👩,🧓,👴,👵,👨‍⚕️,👩‍⚕️,👨‍🎓,👩‍🎓,👨‍🏫,👩‍🏫,👨‍⚖️,👩‍⚖️,👨‍🌾,👩‍🌾,👨‍🍳,👩‍🍳,👨‍🔧,👩‍🔧,👨‍🏭,👩‍🏭,👨‍💼,👩‍💼,👨‍🔬,👩‍🔬,👨‍💻,👩‍💻,👨‍🎤,👩‍🎤,👨‍🎨,👩‍🎨,👨‍✈️,👩‍✈️,👨‍🚀,👩‍🚀,👨‍🚒,👩‍🚒,👮,👮‍♂️,👮‍♀️,🕵️,🕵️‍♂️,🕵️‍♀️,💂,💂‍♂️,💂‍♀️,👷,👷‍♂️,👷‍♀️,🤴,👸,👳,👳‍♂️,👳‍♀️,👲,🧕,🧔,👱,👱‍♂️,👱‍♀️,🤵,👰,🤰,🤱,👼,🎅,🤶,🧙,🧙‍♀️,🧙‍♂️,🧚,🧚‍♀️,🧚‍♂️,🧛,🧛‍♀️,🧛‍♂️,🧜,🧜‍♀️,🧜‍♂️,🧝,🧝‍♀️,🧝‍♂️,🧞,🧞‍♀️,🧟,🧟‍♀️,🙍,🙍‍♂️,🙍‍♀️,🙎,🙎‍♂️,🙎‍♀️,🙅,🙅‍♂️,🙅‍♀️,🙆,🙆‍♂️,🙆‍♀️,💁,💁‍♂️,💁‍♀️,🙋,🙋‍♂️,🙋‍♀️,🙇,🙇‍♂️,🙇‍♀️,🤦,🤦‍♂️,🤦‍♀️,🤷,🤷‍♂️,🤷‍♀️,💆,💆‍♂️,💆‍♀️,💇,💇‍♂️,💇‍♀️,🚶,🚶‍♂️,🚶‍♀️,🏃,🏃‍♂️,🏃‍♀️,💃,🕺,👯,👯‍♂️,👯‍♀️,🧖,🧖‍♀️,🧖‍♂️,🧗,🧗‍♀️,🧗‍♂️,🧘,🧘‍♀️,🧘‍♂️,🕴️,👤,👥,👫,👬,👭,💏,👨‍❤️‍💋‍👨,👩‍❤️‍💋‍👩,💑,👨‍❤️‍👨,👩‍❤️‍👩,👪,👨‍👩‍👧,👨‍👩‍👧‍👦,👨‍👩‍👦‍👦,👨‍👩‍👧‍👧,👨‍👨‍👦,👨‍👨‍👧,👨‍👨‍👧‍👦,👨‍👨‍👦‍👦,👨‍👨‍👧‍👧,👩‍👩‍👦,👩‍👩‍👧,👩‍👩‍👧‍👦,👩‍👩‍👦‍👦,👩‍👩‍👧‍👧,👨‍👦,👨‍👧,👨‍👧‍👦,👨‍👧‍👧,👩‍👦‍👦,👩‍👧,👩‍👧‍👦,🤳,👃,👅,👄,💋,💘,❤️,💓,💔,💕,💖,💗,💙,💚,💛,🧡,💜,🖤,💝,💞,❣️,💌,💬,🌬️,☃️,⛄,🎎,🗿,👾,💩,🛀,🛌,💅,👂,👣,👀,👁️,🧠,💭,👓,👔,👕,👖,🧣,🧤,🧥,🧦,👗,👘,👙,👚,👛,👜,👝,🎒,👞,👟,👠,👡,👢,👑,👒,🎩,🎓,🧢,📿,💄,💍,💎,🥄,🔪,🏺,🗺️,🗾,🎠,🎡,🎢,💈,🎪,🛰️,🚀,🛸,🛎️,⌛,⏳,⌚,⏰,🕰️,🌡️,🌂,☂️,☔,⛱️,⚡,🎃,🎄,🎆,🎇,🎈,🎉,🎊,🎏,🎐,🎑,🎀,🎁,🎗️,🎟️,🎫,🔮,🎮,🕹️,🎰,🃏,🎴,🎭,🖼️,🎨,🔇,🔈,🔉,🔊,📢,📣,📯,🔔,🔕,🎼,🎵,🎶,🎙️,🎚️,🎛️,🎤,🎧,📻,🎷,🎸,🎹,🎺,🎻,🥁,📱,📲,☎️,📞,📟,📠,🔋,🔌,💻,🖥️,🖨️,⌨️,🖱️,🖲️,💽,💾,💿,📀,🎥,🎞️,📽️,🎬,📺,📷,📸,📹,📼,🔍,🔎,💡,🔦,🏮,📔,📕,📖,📗,📘,📙,📚,📓,📒,📃,📜,📄,📰,📑,🔖,💰,💴,💵,💶,💷,💸,💳,✉️,📧,📨,📩,📤,📥,📦,📫,📪,📬,📭,📮,✏️,✒️,📝,💼,📁,📂,📅,📆,📇,📈,📉,📊,📋,📌,📍,📎,📏,📐,✂️,🔒,🔓,🔏,🔐,🔑,🔨,🔫,🔧,🔩,🔬,🔭,📡,💉,💊,🚪,🚽,🚿,🛁,🛒,🚬,🔅,🔆,⚜️,🔱,📛,🚂,🚃,🚄,🚅,🚆,🚇,🚈,🚉,🚊,🚝,🚞,🚋,🚌,🚍,🚎,🚐,🚑,🚒,🚓,🚔,🚕,🚖,🚗,🚘,🚙,🚚,🚛,🚜,🚲,🛴,🛵,🚏,🛣️,🛤️,🛢️,⛽,🚨,🚥,🚦,🛑,🚧,⛵,🛶,🚤,🛳️,⛴️,🛥️,🚢,✈️,🛩️,🛫,🛬,💺,🚁,🚟,🚠,🚡,⚠️,⛔,🦗,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🥝,🍅,🥥,🥑,🍆,🥔,🥕,🌽,🌶️,🥒,🥦,🥜,🍞,🥐,🥖,🥨,🥞,🧀,🍖,🍗,🥩,🥓,🍔,🍟,🍕,🌭,🥪,🌮,🌯,🥙,🥚,🍳,🥘,🍲,🥣,🥗,🍿,🥫,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🥟,🥠,🥡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🥧,🍫,🍬,🍭,🍮,🍯,🍼,🥛,☕,🍵,🍶,🍾,🍷,🍸,🍹,🍺,🍻,🥂,🥃,🥤,🥢,🍽️,🍴`.split(",");
const _style_0 = { "page": { "": { "flex": 1 } }, "chat-foot": { "": { "flexDirection": "column", "borderTopWidth": "1rpx", "borderTopStyle": "solid", "borderTopColor": "#BBBBBB", "backgroundColor": "#F7F7F7", "width": "750rpx", "position": "fixed", "bottom": 0 } }, "textarea-box": { "": { "backgroundColor": "#ffffff", "paddingTop": 10, "paddingRight": 10, "paddingBottom": 10, "paddingLeft": 10, "width": "450rpx", "borderRadius": 10 } }, "textarea": { "": { "width": "400rpx", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "backgroundColor": "#ffffff", "color": "#666666", "fontSize": "32rpx" } }, "tip-view": { "": { "position": "fixed", "top": 100, "width": "750rpx", "alignItems": "center", "color": "#999999" } }, "tip-null-msg": { "": { "color": "#999999", "fontSize": 14 } }, "beforeSendMsg": { "": { "color": "#ffffff", "fontSize": "24rpx", "borderRadius": 6, "backgroundColor": "#2faf4c", "height": 28, "lineHeight": 28, "textAlign": "center" } }, "icon": { "": { "width": "70rpx", "justifyContent": "center", "alignItems": "center" } }, "loadMore": { "": { "lineHeight": "80rpx", "height": "80rpx", "textAlign": "center", "width": "750rpx", "color": "#adb3b7", "fontSize": 12 } }, "hasNewMsg": { "": { "position": "fixed", "right": 20, "backgroundColor": "#4CD964", "borderRadius": 100, "width": 20, "height": 20, "lineHeight": 20, "textAlign": "center", "transform": "rotate(270deg)" } }, "input-box": { "": { "flexDirection": "row", "paddingTop": "10rpx", "paddingRight": "18rpx", "paddingBottom": "10rpx", "paddingLeft": "18rpx", "justifyContent": "space-around", "alignItems": "center" } }, "menu": { "": { "paddingTop": "36rpx", "paddingRight": "36rpx", "paddingBottom": "36rpx", "paddingLeft": "36rpx", "width": "750rpx", "borderTopWidth": 1, "borderTopStyle": "solid", "borderTopColor": "#ededed", "flexDirection": "row", "flexWrap": "wrap" } }, "menu-item": { "": { "width": "160rpx", "height": "160rpx", "justifyContent": "space-around", "alignItems": "center" } }, "menu-item-icon": { "": { "width": "80rpx", "height": "80rpx", "justifyContent": "space-around", "alignItems": "center", "backgroundColor": "#ffffff", "color": "#6F6F6F", "borderRadius": 10 } }, "menu-item-text": { "": { "fontSize": 12 } }, "emojiListBox": { "": { "width": "750rpx", "paddingTop": "27rpx", "paddingRight": "27rpx", "paddingBottom": "27rpx", "paddingLeft": "27rpx", "flexDirection": "row", "flexWrap": "wrap", "justifyContent": "space-between" } }, "emoji-item": { "": { "textAlign": "center", "fontSize": "65rpx", "width": "87rpx", "height": "87rpx", "justifyContent": "center", "alignItems": "center" } }, "uni-im-sound": { "": { "position": "absolute", "top": 0, "left": 0, "zIndex": 999 } }, "system-msg-box": { "": { "width": "750rpx", "marginBottom": 10, "alignItems": "center" } }, "system-msg": { "": { "backgroundColor": "#f2f2f2", "color": "#9d9e9d", "fontSize": 14, "height": 30, "lineHeight": 30, "paddingTop": 0, "paddingRight": "15rpx", "paddingBottom": 0, "paddingLeft": "15rpx", "borderRadius": 8 } }, "answer-msg": { "": { "width": "450rpx", "paddingTop": 2, "paddingRight": 5, "paddingBottom": 2, "paddingLeft": 5, "marginTop": 5, "marginRight": 0, "marginBottom": 3, "marginLeft": 0, "backgroundColor": "#efefef", "color": "#6a6a6a", "borderRadius": 5, "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "answer-msg-text": { "": { "width": "400rpx", "lines": 2, "textOverflow": "ellipsis", "fontSize": 12 } } };
weex.requireModule("dom") || {};
const _sfc_main = {
  data() {
    return {
      // 当前会话对象
      conversation: {
        id: false
      },
      //聊天输入框高度
      textareaHeight: 26,
      //收到正在对话的用户发来新消息，时悬浮按钮提示 (暂不支持)
      hasNewMsg: false,
      isCodeText: false,
      menuIsShow: false,
      emojiIsShow: false,
      soundIsShow: false,
      menuList: [
        {
          "title": "图片",
          "iconCode": "e7be"
        },
        {
          "title": "视频",
          "iconCode": "e690"
        },
        {
          "title": "文件",
          "iconCode": "e69e"
        }
      ],
      keyboardHeight: 0,
      keyboardMaxHeight: 260,
      emojiCodes,
      isFocus: false,
      answerMsgIndex: false
    };
  },
  computed: {
    ...uniIm.mapState(["currentConversationId", "conversationDatas", "isWidescreen", "systemInfo"]),
    unread_count() {
      const unreadCount = uniIm.conversation.unreadCount();
      plus.webview.currentWebview().setTitleNViewButtonBadge({
        index: 0,
        text: unreadCount
      });
      return unreadCount;
    },
    isSafariPc() {
      return this.systemInfo.browserName == "safari" && this.isWidescreen;
    },
    msgList() {
      return this.conversation.msgList || [];
    },
    //聊天数据
    //当前会话的聊天框文字内容
    chatText: {
      get() {
        var _a;
        return (_a = this.conversation) == null ? void 0 : _a.chatText;
      },
      set(chatText) {
        this.conversation.chatText = chatText;
      }
    },
    //当前用户自己的uid
    current_uid() {
      return store.userInfo._id;
    },
    phoneBH() {
      return this.systemInfo.screenHeight - this.systemInfo.safeArea.bottom;
    },
    chatTootPaddingBottom() {
      return 0;
    },
    imPlaceholderheight() {
      let imPlaceholderheight = 32 + this.textareaHeight;
      if (this.keyboardHeight || this.menuIsShow || this.emojiIsShow) {
        imPlaceholderheight += this.keyboardMaxHeight;
      }
      if (!this.keyboardHeight) {
        imPlaceholderheight += this.phoneBH;
      }
      return imPlaceholderheight;
    },
    mpIsFocus() {
    },
    // 临时方案 修复（兼容）微信小程序框架的bug：iOS端textarea组件 在 iOS 真机下 无法动态切换绑定 input 事件
    // 大家可以一起顶帖 链接地址：https://developers.weixin.qq.com/community/develop/doc/0002a02800cd90b9632efeab55b000
    showInputBox() {
      return true;
    },
    navTitle() {
      let { title } = this.conversation;
      if (this.conversation.group_id) {
        title += "(" + Object.keys(this.conversation.group_member).length + ")";
      }
      return title;
    }
  },
  created() {
    this.onPushMessage = (res) => {
      const {
        type,
        data
      } = res.data.payload;
      if (type == "uni-im" && data.conversation_id == this.currentConversationId) {
        uniIm.clearUnreadCount(this.currentConversationId);
        this.hasNewMsg = true;
        setTimeout(() => {
          this.showLast();
        }, 0);
      }
    };
    uni.onPushMessage(this.onPushMessage);
    this.onKeyboardHeightChange = ({ height }) => {
      this.keyboardHeight = height;
      if (height) {
        this.keyboardMaxHeight = height;
      }
      this.$nextTick(() => {
        this.showLast();
        setTimeout(() => {
          this.showLast();
        }, 800);
      });
    };
    uni.onKeyboardHeightChange(this.onKeyboardHeightChange);
  },
  mounted() {
  },
  onShow() {
    if (this.conversation.id) {
      uniIm.currentConversationId = this.conversation.id;
      uniIm.clearUnreadCount(this.currentConversationId);
    }
  },
  onUnload() {
    uni.offPushMessage(this.onPushMessage);
    uni.offKeyboardHeightChange(this.onKeyboardHeightChange);
    uniIm.currentConversationId = false;
    uniIm.audioContext.stop();
  },
  beforeDestroy() {
    uniIm.currentConversationId = false;
    uniIm.audioContext.stop();
  },
  onHide() {
    uniIm.currentConversationId = false;
    uniIm.audioContext.stop();
  },
  async onLoad(param) {
    await this.load(param);
  },
  methods: {
    async load(param) {
      this.answerMsgIndex = false;
      this.conversation = await uniIm.conversation.get(param);
      uniIm.currentConversationId = this.conversation.id;
      this.$nextTick(() => {
        this.$refs["msg-list"].init();
      });
      if (this.conversation.unread_count) {
        uniIm.clearUnreadCount(this.conversation.id);
      }
    },
    /*onKeydown(keyname){
    	__f__('log','at uni_modules/uni-im/pages/chat/chat.nvue:513','onKeydown keyname',keyname);
    	if(keyname == 'shift'){
    		//按下了shift键
    		shiftKeyPressed = true;
    	}
    	// 按下了回车 且 之前没按下 shift
    	if (keyname == 'enter' && !shiftKeyPressed) {
    		this.beforeSendMsg();
    	}
    },
    onKeyup(keyname){
    	__f__('log','at uni_modules/uni-im/pages/chat/chat.nvue:524','onKeyup keyname',keyname);
    	if(keyname == 'shift'){
    		//按下了shift键
    		shiftKeyPressed = false;
    	}
    },*/
    getNicknameByUid(uid) {
      let userInfo = uniIm.usersInfo[uid];
      if (userInfo) {
        return userInfo.nickname;
      } else {
        return "";
      }
    },
    onChatInputFocus() {
      this.isFocus = true;
      this.$nextTick(() => {
        this.menuIsShow = false;
        this.emojiIsShow = false;
      });
    },
    changeSoundIsShow() {
      this.soundIsShow = !this.soundIsShow;
      if (this.soundIsShow) {
        this.oldTextareaHeight = this.textareaHeight;
        this.textareaHeight = 26;
        uni.hideKeyboard();
      } else {
        this.textareaHeight = this.oldTextareaHeight;
        this.isFocus = true;
      }
      uni.$emit("changeSoundIsShow");
      this.$nextTick(() => {
        this.menuIsShow = false;
        this.emojiIsShow = false;
      });
    },
    changeMenuIsShow(e2) {
      if (this.keyboardHeight) {
        this.menuIsShow = true;
        uni.hideKeyboard();
      } else {
        this.menuIsShow = !this.menuIsShow;
      }
      this.emojiIsShow = false;
      this.showLast(0);
      e2.stopPropagation();
    },
    changeEmojiIsShow(e2) {
      this.soundIsShow = false;
      if (this.keyboardHeight) {
        this.emojiIsShow = true;
        uni.hideKeyboard();
      } else {
        this.emojiIsShow = !this.emojiIsShow;
      }
      this.menuIsShow = false;
      this.showLast(0);
      e2.stopPropagation();
    },
    async chooseAndUploadFile(type) {
      Bs.chooseAndUploadFile({
        type,
        count: 9,
        sizeType: ["compressed"],
        success: (e2) => {
          e2.tempFiles.forEach((event) => {
            let {
              url,
              name,
              size
            } = event;
            formatAppLog("log", "at uni_modules/uni-im/pages/chat/chat.nvue:602", "event", event);
            if (!["image", "video"].includes(type)) {
              type = "file";
            }
            let data = {};
            data[type] = { url, size, name };
            this.beforeSendMsg(data);
          });
        },
        fail(e2) {
          formatAppLog("error", "at uni_modules/uni-im/pages/chat/chat.nvue:620", e2);
        },
        complete() {
          uni.hideLoading();
        }
      });
    },
    hideKeyboard() {
      uni.hideKeyboard();
      this.$nextTick(() => {
        this.menuIsShow = false;
        this.emojiIsShow = false;
        this.isFocus = false;
      });
    },
    input() {
      if (!this.isWidescreen && this.systemInfo.platform != "android" && this.chatText && this.chatText.indexOf("\n") >= 0) {
        let clearBr = function(key) {
          key = key.replace(/<\/?.+?>/g, "");
          key = key.replace(/[\r\n]/g, "");
          return key;
        };
        this.chatText = this.chatText.substring(0, this.chatText.length - 1);
        if (clearBr(this.chatText).length) {
          this.beforeSendMsg();
        } else {
          uni.showToast({
            title: "不能发送空消息",
            icon: "none"
          });
          this.chatText = "";
          this.$nextTick(() => {
            this.chatText = "";
            this.textareaHeight = 26;
          });
        }
      }
    },
    sendSound(e2) {
      this.beforeSendMsg({ sound: e2 });
    },
    async answer(msgIndex) {
      this.answerMsgIndex = msgIndex;
      formatAppLog("log", "at uni_modules/uni-im/pages/chat/chat.nvue:673", "answer", msgIndex);
      this.isFocus = true;
    },
    async beforeSendMsg(param = {}) {
      let data = {
        type: "text",
        to_uid: this.conversation.friend_uid,
        conversation_id: this.conversation.id,
        group_id: this.conversation.group_id,
        client_create_time: Date.now(),
        from_uid: Bs.getCurrentUserInfo().uid,
        state: 0
      };
      for (let key in param) {
        if (param[key]) {
          data.type = key;
          data.body = param[key];
        }
      }
      if (data.type == "text") {
        data.body = this.chatText.trim();
        if (!data.body.length) {
          return uni.showToast({
            title: "不能发送空消息",
            icon: "none"
          });
        }
        this.$nextTick((e2) => {
          this.chatText = "";
          this.textareaHeight = 26;
          this.answerMsgIndex = false;
        });
        if (this.isCodeText) {
          data.type = "code";
        }
      }
      if (this.answerMsgIndex !== false) {
        data.about_msg_id = this.msgList[this.answerMsgIndex]._id;
      }
      this.conversation.msgList.push(data);
      this.$nextTick(() => {
        this.showLast();
        setTimeout(() => {
          this.showLast();
        }, 800);
      });
      data.state = 0;
      await this.conversation.msgManager.localMsg.add(data);
      this.sendMsg(data);
    },
    sendMsg(data, callback) {
      const uniImCo = Bs.importObject("uni-im-co", {
        customUI: true
      });
      data.appId = this.systemInfo.appId;
      let index = this.conversation.msgList.findIndex((i2) => i2.unique_id == data.unique_id);
      data = Object.assign({}, data);
      uniImCo.sendMsg(data).then((e2) => {
        data.state = e2.errCode === 0 ? 100 : -100;
        data.create_time = e2.data.create_time;
        data._id = e2.data._id;
        this.conversation.msgList.splice(index, 1, data);
        this.conversation.msgManager.localMsg.update(data.unique_id, data);
      }).catch((e2) => {
        uni.showModal({
          content: e2.message,
          showCancel: false,
          confirmText: "关闭"
        });
        formatAppLog("log", "at uni_modules/uni-im/pages/chat/chat.nvue:780", "uniImCo.sendMsg error:", e2.errCode, e2.message);
        data.create_time = Date.now();
        data.state = -200;
        this.conversation.msgList.splice(index, 1, data);
        this.conversation.msgManager.localMsg.update(data.unique_id, data);
      }).finally((e2) => {
        if (callback) {
          callback(e2);
        }
      });
    },
    retriesSendMsg(data) {
      uni.showLoading({
        mask: true
      });
      data.isRetries = true;
      this.sendMsg(data, (e2) => {
        uni.hideLoading();
      });
    },
    showLast(duration = 300) {
      let msgListRef = this.$refs["msg-list"];
      if (msgListRef) {
        msgListRef.showLast(duration);
        this.hasNewMsg = false;
      }
    },
    linechange(e2) {
      let {
        height,
        lineCount
      } = e2.detail;
      if (lineCount === 1) {
        this.textareaHeight = 26;
      } else if (height <= 100) {
        this.textareaHeight = height - 2;
      }
    },
    touchmove(e2) {
    },
    async showControl({
      index,
      msgContentDomInfo,
      coordinate
    }) {
      let isSelf = this.msgList[index].from_uid == Bs.getCurrentUserInfo().uid;
      let controlData = {
        msg: this.msgList[index],
        msgIndex: index,
        isInTop: false
      };
      let {
        top,
        bottom,
        left,
        right,
        width,
        height
      } = msgContentDomInfo;
      controlData.width = width;
      if (isSelf) {
        controlData.right = width / 3 + "px";
        controlData.left = "";
      } else {
        controlData.left = width / 3 + "px";
        controlData.right = "";
      }
      if (top < 60) {
        controlData.top = bottom + 8 + "px";
      } else {
        controlData.top = top - 65 + "px";
      }
      controlData.isInTop = top > 60;
      this.$refs["uni-im-control"].show(controlData);
    },
    clickMenu(index, e2) {
      if (index < 2) {
        this.chooseAndUploadFile(index === 0 ? "image" : "video");
      }
      if (index === 2) {
        return uni.showToast({
          title: "暂不支持，发送文件",
          icon: "none"
        });
      }
      e2.stopPropagation();
    },
    clickEmojiItem(emojiUniCode, e2) {
      this.chatText += emojiUniCode;
      e2.stopPropagation();
    },
    tapUnreadCount() {
      if (this.isWidescreen)
        ;
      else {
        uni.navigateBack();
      }
    },
    getkey(id, index) {
      return id;
    }
  },
  onNavigationBarButtonTap(e2) {
    if (e2.index === 0) {
      if (this.conversation.group_id) {
        uni.navigateTo({
          url: "/uni_modules/uni-im/pages/group/info?conversation_id=" + this.conversation.id
        });
      } else {
        uni.navigateTo({
          url: "/uni_modules/uni-im/pages/chat/info?user_id=" + this.conversation.friend_uid
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_navigation_bar = resolveEasycom(resolveDynamicComponent("navigation-bar"), __easycom_0$1);
  const _component_page_meta = resolveEasycom(resolveDynamicComponent("page-meta"), __easycom_1$1);
  const _component_uni_im_msg_list = resolveEasycom(resolveDynamicComponent("uni-im-msg-list"), __easycom_2);
  const _component_uni_im_icons = resolveEasycom(resolveDynamicComponent("uni-im-icons"), __easycom_3$1);
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0$2);
  const _component_uni_im_sound = resolveEasycom(resolveDynamicComponent("uni-im-sound"), __easycom_5);
  const _component_uni_im_control = resolveEasycom(resolveDynamicComponent("uni-im-control"), __easycom_6);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createVNode(_component_page_meta, null, {
      default: withCtx(() => [
        createVNode(_component_navigation_bar, {
          title: $options.navTitle,
          "background-color": "#f8f8f8",
          "front-color": "#000000"
        }, null, 8, ["title"])
      ]),
      _: 1
    }),
    createElementVNode("view", {
      class: "page",
      id: "uni-im-chat"
    }, [
      $data.conversation.id ? (openBlock(), createBlock(_component_uni_im_msg_list, {
        key: 0,
        conversationId: $data.conversation.id,
        ref: "msg-list",
        onShowControl: $options.showControl,
        onRetriesSendMsg: $options.retriesSendMsg,
        paddingBottom: $options.imPlaceholderheight + "px",
        class: "msg-list",
        onClickItem: $options.hideKeyboard
      }, null, 8, ["conversationId", "onShowControl", "onRetriesSendMsg", "paddingBottom", "onClickItem"])) : createCommentVNode("", true),
      createElementVNode("view", {
        class: "chat-foot",
        style: normalizeStyle({ "padding-bottom": $options.chatTootPaddingBottom })
      }, [
        !_ctx.isWidescreen ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          $options.showInputBox ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "input-box"
          }, [
            createVNode(_component_uni_im_icons, {
              onClick: $options.changeSoundIsShow,
              code: $data.soundIsShow ? "e69f" : "e684",
              size: "30",
              class: "icon"
            }, null, 8, ["onClick", "code"]),
            createElementVNode("view", { class: "input-box-conetnt" }, [
              createElementVNode("view", { class: "textarea-box" }, [
                createElementVNode("u-textarea", {
                  modelValue: $options.chatText,
                  onInput: [
                    _cache[0] || (_cache[0] = ($event) => $options.chatText = $event.detail.value),
                    _cache[1] || (_cache[1] = (...args) => $options.input && $options.input(...args))
                  ],
                  onConfirm: _cache[2] || (_cache[2] = ($event) => $options.beforeSendMsg()),
                  onLinechange: _cache[3] || (_cache[3] = (...args) => $options.linechange && $options.linechange(...args)),
                  flex: true,
                  style: normalizeStyle({ height: $data.textareaHeight + "px" }),
                  disableDefaultPadding: false,
                  holdKeyboard: true,
                  confirmHold: true,
                  autoBlur: false,
                  confirmType: "send",
                  showConfirmBar: false,
                  cursorSpacing: 20,
                  maxlength: "250",
                  focus: $options.mpIsFocus,
                  onFocus: _cache[4] || (_cache[4] = ($event) => $options.onChatInputFocus()),
                  onBlur: _cache[5] || (_cache[5] = ($event) => $data.isFocus = false),
                  fixed: true,
                  adjustPosition: false,
                  class: "textarea",
                  ref: "input-box",
                  onReturn: _cache[6] || (_cache[6] = ($event) => $options.beforeSendMsg())
                }, null, 44, ["modelValue", "focus"])
              ]),
              $data.answerMsgIndex !== false ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "answer-msg"
              }, [
                createElementVNode("u-text", { class: "answer-msg-text" }, toDisplayString($options.getNicknameByUid($options.msgList[$data.answerMsgIndex].from_uid)) + "：" + toDisplayString($options.msgList[$data.answerMsgIndex].body), 1),
                createVNode(_component_uni_icons, {
                  onClick: _cache[7] || (_cache[7] = ($event) => $data.answerMsgIndex = false),
                  type: "clear",
                  color: "#aaa",
                  size: "16"
                })
              ])) : createCommentVNode("", true),
              $data.soundIsShow ? (openBlock(), createBlock(_component_uni_im_sound, {
                key: 1,
                class: "uni-im-sound",
                onSuccess: $options.sendSound
              }, null, 8, ["onSuccess"])) : createCommentVNode("", true)
            ]),
            createVNode(_component_uni_im_icons, {
              onClick: withModifiers($options.changeEmojiIsShow, ["stop"]),
              code: $data.emojiIsShow ? "e69f" : "e646",
              size: "30",
              class: "icon"
            }, null, 8, ["onClick", "code"]),
            !$data.soundIsShow && $options.chatText ? (openBlock(), createElementBlock("u-text", {
              key: 0,
              onClick: _cache[8] || (_cache[8] = withModifiers(($event) => $options.beforeSendMsg(), ["prevent"])),
              class: "icon beforeSendMsg"
            }, "发送")) : (openBlock(), createBlock(_component_uni_im_icons, {
              key: 1,
              onClick: withModifiers($options.changeMenuIsShow, ["stop"]),
              code: "e75a",
              size: "30",
              class: "icon"
            }, null, 8, ["onClick"]))
          ])) : createCommentVNode("", true),
          $data.menuIsShow || $data.emojiIsShow ? (openBlock(), createElementBlock("view", {
            key: 1,
            class: "media-box",
            style: normalizeStyle({ height: $data.keyboardMaxHeight + "px" })
          }, [
            $data.menuIsShow ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "menu",
              style: normalizeStyle({ height: $data.keyboardMaxHeight + "px" })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.menuList, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  class: "menu-item",
                  key: index,
                  onClick: withModifiers(($event) => $options.clickMenu(index, $event), ["stop"])
                }, [
                  createElementVNode("view", { class: "menu-item-icon" }, [
                    createVNode(_component_uni_im_icons, {
                      code: item.iconCode,
                      size: "26"
                    }, null, 8, ["code"])
                  ]),
                  createElementVNode("u-text", { class: "menu-item-text" }, toDisplayString(item.title), 1)
                ], 8, ["onClick"]);
              }), 128))
            ], 4)) : createCommentVNode("", true),
            $data.emojiIsShow ? (openBlock(), createElementBlock("scroll-view", {
              key: 1,
              scrollY: true,
              class: "emojiListBox",
              style: normalizeStyle({ height: $data.keyboardMaxHeight + "px" })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.emojiCodes, (uniCodeEmoji, index) => {
                return openBlock(), createElementBlock("u-text", {
                  key: index,
                  onClick: withModifiers(($event) => $options.clickEmojiItem(uniCodeEmoji, $event), ["stop"]),
                  class: "emoji-item"
                }, toDisplayString(uniCodeEmoji), 9, ["onClick"]);
              }), 128))
            ], 4)) : createCommentVNode("", true)
          ], 4)) : (openBlock(), createElementBlock("view", {
            key: 2,
            style: normalizeStyle({ height: $data.keyboardHeight - $options.phoneBH + "px" })
          }, null, 4))
        ], 64)) : createCommentVNode("", true)
      ], 4),
      createVNode(_component_uni_im_control, {
        ref: "uni-im-control",
        onAnswer: $options.answer
      }, null, 8, ["onAnswer"])
    ])
  ]);
}
const chat = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  chat as default
};
