import { f as formatAppLog, _ as _export_sfc } from "../../../../_plugin-vue_export-helper.js";
import { openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, createCommentVNode, renderSlot, toDisplayString } from "vue";
function o(o2) {
  this.mode = r.MODE_8BIT_BYTE, this.data = o2;
}
function e(o2, e2) {
  this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
}
o.prototype = { getLength: function(o2) {
  return this.data.length;
}, write: function(o2) {
  for (var e2 = 0; e2 < this.data.length; e2++)
    o2.put(this.data.charCodeAt(e2), 8);
} }, e.prototype = { addData: function(e2) {
  var r = new o(e2);
  this.dataList.push(r), this.dataCache = null;
}, isDark: function(o2, e2) {
  if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
    throw new Error(o2 + "," + e2);
  return this.modules[o2][e2];
}, getModuleCount: function() {
  return this.moduleCount;
}, make: function() {
  if (this.typeNumber < 1) {
    var o2 = 1;
    for (o2 = 1; o2 < 40; o2++) {
      for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r = new p(), t = 0, i2 = 0; i2 < e2.length; i2++)
        t += e2[i2].dataCount;
      for (i2 = 0; i2 < this.dataList.length; i2++) {
        var n = this.dataList[i2];
        r.put(n.mode, 4), r.put(n.getLength(), h.getLengthInBits(n.mode, o2)), n.write(r);
      }
      if (r.getLengthInBits() <= 8 * t)
        break;
    }
    this.typeNumber = o2;
  }
  this.makeImpl(false, this.getBestMaskPattern());
}, makeImpl: function(o2, r) {
  this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
  for (var t = 0; t < this.moduleCount; t++) {
    this.modules[t] = new Array(this.moduleCount);
    for (var i2 = 0; i2 < this.moduleCount; i2++)
      this.modules[t][i2] = null;
  }
  this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r);
}, setupPositionProbePattern: function(o2, e2) {
  for (var r = -1; r <= 7; r++)
    if (!(o2 + r <= -1 || this.moduleCount <= o2 + r))
      for (var t = -1; t <= 7; t++)
        e2 + t <= -1 || this.moduleCount <= e2 + t || (this.modules[o2 + r][e2 + t] = 0 <= r && r <= 6 && (0 == t || 6 == t) || 0 <= t && t <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= t && t <= 4);
}, getBestMaskPattern: function() {
  for (var o2 = 0, e2 = 0, r = 0; r < 8; r++) {
    this.makeImpl(true, r);
    var t = h.getLostPoint(this);
    (0 == r || o2 > t) && (o2 = t, e2 = r);
  }
  return e2;
}, createMovieClip: function(o2, e2, r) {
  var t = o2.createEmptyMovieClip(e2, r);
  this.make();
  for (var i2 = 0; i2 < this.modules.length; i2++)
    for (var n = 1 * i2, a = 0; a < this.modules[i2].length; a++) {
      var d = 1 * a;
      this.modules[i2][a] && (t.beginFill(0, 100), t.moveTo(d, n), t.lineTo(d + 1, n), t.lineTo(d + 1, n + 1), t.lineTo(d, n + 1), t.endFill());
    }
  return t;
}, setupTimingPattern: function() {
  for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
    null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
  for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
    null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
}, setupPositionAdjustPattern: function() {
  for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
    for (var r = 0; r < o2.length; r++) {
      var t = o2[e2], i2 = o2[r];
      if (null == this.modules[t][i2])
        for (var n = -2; n <= 2; n++)
          for (var a = -2; a <= 2; a++)
            this.modules[t + n][i2 + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a;
    }
}, setupTypeNumber: function(o2) {
  for (var e2 = h.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
    var t = !o2 && 1 == (e2 >> r & 1);
    this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = t;
  }
  for (r = 0; r < 18; r++) {
    t = !o2 && 1 == (e2 >> r & 1);
    this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = t;
  }
}, setupTypeInfo: function(o2, e2) {
  for (var r = this.errorCorrectLevel << 3 | e2, t = h.getBCHTypeInfo(r), i2 = 0; i2 < 15; i2++) {
    var n = !o2 && 1 == (t >> i2 & 1);
    i2 < 6 ? this.modules[i2][8] = n : i2 < 8 ? this.modules[i2 + 1][8] = n : this.modules[this.moduleCount - 15 + i2][8] = n;
  }
  for (i2 = 0; i2 < 15; i2++) {
    n = !o2 && 1 == (t >> i2 & 1);
    i2 < 8 ? this.modules[8][this.moduleCount - i2 - 1] = n : i2 < 9 ? this.modules[8][15 - i2 - 1 + 1] = n : this.modules[8][15 - i2 - 1] = n;
  }
  this.modules[this.moduleCount - 8][8] = !o2;
}, mapData: function(o2, e2) {
  for (var r = -1, t = this.moduleCount - 1, i2 = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2)
    for (6 == a && a--; ; ) {
      for (var d = 0; d < 2; d++)
        if (null == this.modules[t][a - d]) {
          var u = false;
          n < o2.length && (u = 1 == (o2[n] >>> i2 & 1)), h.getMask(e2, t, a - d) && (u = !u), this.modules[t][a - d] = u, -1 == --i2 && (n++, i2 = 7);
        }
      if ((t += r) < 0 || this.moduleCount <= t) {
        t -= r, r = -r;
        break;
      }
    }
} }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r, t) {
  for (var i2 = v.getRSBlocks(o2, r), n = new p(), a = 0; a < t.length; a++) {
    var d = t[a];
    n.put(d.mode, 4), n.put(d.getLength(), h.getLengthInBits(d.mode, o2)), d.write(n);
  }
  var u = 0;
  for (a = 0; a < i2.length; a++)
    u += i2[a].dataCount;
  if (n.getLengthInBits() > 8 * u)
    throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * u + ")");
  for (n.getLengthInBits() + 4 <= 8 * u && n.put(0, 4); n.getLengthInBits() % 8 != 0; )
    n.putBit(false);
  for (; !(n.getLengthInBits() >= 8 * u || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * u)); )
    n.put(e.PAD1, 8);
  return e.createBytes(n, i2);
}, e.createBytes = function(o2, e2) {
  for (var r = 0, t = 0, i2 = 0, n = new Array(e2.length), a = new Array(e2.length), d = 0; d < e2.length; d++) {
    var u = e2[d].dataCount, s = e2[d].totalCount - u;
    t = Math.max(t, u), i2 = Math.max(i2, s), n[d] = new Array(u);
    for (var g = 0; g < n[d].length; g++)
      n[d][g] = 255 & o2.buffer[g + r];
    r += u;
    var l = h.getErrorCorrectPolynomial(s), c = new f(n[d], l.getLength() - 1).mod(l);
    a[d] = new Array(l.getLength() - 1);
    for (g = 0; g < a[d].length; g++) {
      var m = g + c.getLength() - a[d].length;
      a[d][g] = m >= 0 ? c.get(m) : 0;
    }
  }
  var v2 = 0;
  for (g = 0; g < e2.length; g++)
    v2 += e2[g].totalCount;
  var p2 = new Array(v2), C2 = 0;
  for (g = 0; g < t; g++)
    for (d = 0; d < e2.length; d++)
      g < n[d].length && (p2[C2++] = n[d][g]);
  for (g = 0; g < i2; g++)
    for (d = 0; d < e2.length; d++)
      g < a[d].length && (p2[C2++] = a[d][g]);
  return p2;
};
for (var r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i$1 = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function(o2) {
  for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
    e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
  return (o2 << 10 | e2) ^ h.G15_MASK;
}, getBCHTypeNumber: function(o2) {
  for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
    e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
  return o2 << 12 | e2;
}, getBCHDigit: function(o2) {
  for (var e2 = 0; 0 != o2; )
    e2++, o2 >>>= 1;
  return e2;
}, getPatternPosition: function(o2) {
  return h.PATTERN_POSITION_TABLE[o2 - 1];
}, getMask: function(o2, e2, r2) {
  switch (o2) {
    case i$1:
      return (e2 + r2) % 2 == 0;
    case n:
      return e2 % 2 == 0;
    case a:
      return r2 % 3 == 0;
    case d:
      return (e2 + r2) % 3 == 0;
    case u:
      return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
    case s:
      return e2 * r2 % 2 + e2 * r2 % 3 == 0;
    case g:
      return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
    case l:
      return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
    default:
      throw new Error("bad maskPattern:" + o2);
  }
}, getErrorCorrectPolynomial: function(o2) {
  for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
    e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
  return e2;
}, getLengthInBits: function(o2, e2) {
  if (1 <= e2 && e2 < 10)
    switch (o2) {
      case r.MODE_NUMBER:
        return 10;
      case r.MODE_ALPHA_NUM:
        return 9;
      case r.MODE_8BIT_BYTE:
      case r.MODE_KANJI:
        return 8;
      default:
        throw new Error("mode:" + o2);
    }
  else if (e2 < 27)
    switch (o2) {
      case r.MODE_NUMBER:
        return 12;
      case r.MODE_ALPHA_NUM:
        return 11;
      case r.MODE_8BIT_BYTE:
        return 16;
      case r.MODE_KANJI:
        return 10;
      default:
        throw new Error("mode:" + o2);
    }
  else {
    if (!(e2 < 41))
      throw new Error("type:" + e2);
    switch (o2) {
      case r.MODE_NUMBER:
        return 14;
      case r.MODE_ALPHA_NUM:
        return 13;
      case r.MODE_8BIT_BYTE:
        return 16;
      case r.MODE_KANJI:
        return 12;
      default:
        throw new Error("mode:" + o2);
    }
  }
}, getLostPoint: function(o2) {
  for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
    for (var i2 = 0; i2 < e2; i2++) {
      for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
        if (!(t2 + d2 < 0 || e2 <= t2 + d2))
          for (var u2 = -1; u2 <= 1; u2++)
            i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
      n2 > 5 && (r2 += 3 + n2 - 5);
    }
  for (t2 = 0; t2 < e2 - 1; t2++)
    for (i2 = 0; i2 < e2 - 1; i2++) {
      var s2 = 0;
      o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
    }
  for (t2 = 0; t2 < e2; t2++)
    for (i2 = 0; i2 < e2 - 6; i2++)
      o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
  for (i2 = 0; i2 < e2; i2++)
    for (t2 = 0; t2 < e2 - 6; t2++)
      o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
  var g2 = 0;
  for (i2 = 0; i2 < e2; i2++)
    for (t2 = 0; t2 < e2; t2++)
      o2.isDark(t2, i2) && g2++;
  return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
} }, c = { glog: function(o2) {
  if (o2 < 1)
    throw new Error("glog(" + o2 + ")");
  return c.LOG_TABLE[o2];
}, gexp: function(o2) {
  for (; o2 < 0; )
    o2 += 255;
  for (; o2 >= 256; )
    o2 -= 255;
  return c.EXP_TABLE[o2];
}, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, m = 0; m < 8; m++)
  c.EXP_TABLE[m] = 1 << m;
for (m = 8; m < 256; m++)
  c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
for (m = 0; m < 255; m++)
  c.LOG_TABLE[c.EXP_TABLE[m]] = m;
function f(o2, e2) {
  if (null == o2.length)
    throw new Error(o2.length + "/" + e2);
  for (var r = 0; r < o2.length && 0 == o2[r]; )
    r++;
  this.num = new Array(o2.length - r + e2);
  for (var t = 0; t < o2.length - r; t++)
    this.num[t] = o2[t + r];
}
function v(o2, e2) {
  this.totalCount = o2, this.dataCount = e2;
}
function p() {
  this.buffer = new Array(), this.length = 0;
}
function C(o2) {
  return o2.setFillStyle = o2.setFillStyle || function(e2) {
    o2.fillStyle = e2;
  }, o2.setFontSize = o2.setFontSize || function(e2) {
    o2.font = `${e2}px`;
  }, o2.setTextAlign = o2.setTextAlign || function(e2) {
    o2.textAlign = e2;
  }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
    o2.textBaseline = e2;
  }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
    o2.globalAlpha = e2;
  }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
    o2.strokeStyle = e2;
  }, o2.setShadow = o2.setShadow || function(e2, r, t, i2) {
    o2.shadowOffsetX = e2, o2.shadowOffsetY = r, o2.shadowBlur = t, o2.shadowColor = i2;
  }, o2.draw = o2.draw || function(o3, e2) {
    e2 && e2();
  }, o2.clearRect = o2.clearRect || function(e2, r, t, i2) {
    o2.draw(false);
  }, o2;
}
function b(o2, e2) {
  var r = this.data = "", t = this.size = 200;
  this.useDynamicSize = false, this.dynamicSize = t;
  var i2 = this.typeNumber = -1;
  this.errorCorrectLevel = b.errorCorrectLevel.H;
  var n = this.margin = 0;
  this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
  var a = this.backgroundImageWidth = void 0, d = this.backgroundImageHeight = void 0, u = this.backgroundImageX = void 0, s = this.backgroundImageY = void 0;
  this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
  var g = this.backgroundPadding = 0;
  this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
  var l = this.foregroundImageWidth = void 0, h = this.foregroundImageHeight = void 0, c = this.foregroundImageX = void 0, m = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
  this.foregroundImageBackgroundColor = "#FFFFFF";
  var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, k = this.foregroundImageShadowOffsetY = 0, y = this.foregroundImageShadowBlur = 0;
  this.foregroundImageShadowColor = "#808080";
  var w = this.foregroundPadding = 0, I = this.positionProbeBackgroundColor = void 0, B = this.positionProbeForegroundColor = void 0, S = this.separatorColor = void 0, P = this.positionAdjustBackgroundColor = void 0, L = this.positionAdjustForegroundColor = void 0, D = this.timingBackgroundColor = void 0, A = this.timingForegroundColor = void 0, E = this.typeNumberBackgroundColor = void 0, T = this.typeNumberForegroundColor = void 0, N = this.darkBlockColor = void 0;
  this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
  var M = this.canvasContext = void 0;
  this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, { data: { get() {
    if ("" === r || void 0 === r)
      throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: data must be set!"), new b.Error("data must be set!");
    return r;
  }, set(o3) {
    r = String(o3);
  } }, size: { get: () => t, set(o3) {
    t = Number(o3);
  } }, typeNumber: { get: () => i2, set(o3) {
    i2 = Number(o3);
  } }, margin: { get: () => n, set(o3) {
    n = Number(o3);
  } }, backgroundImageWidth: { get() {
    return void 0 === a ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a : a;
  }, set(o3) {
    a = Number(o3);
  } }, backgroundImageHeight: { get() {
    return void 0 === d ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d : d;
  }, set(o3) {
    d = Number(o3);
  } }, backgroundImageX: { get() {
    return void 0 === u ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u : u;
  }, set(o3) {
    u = Number(o3);
  } }, backgroundImageY: { get() {
    return void 0 === s ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s : s;
  }, set(o3) {
    s = Number(o3);
  } }, backgroundPadding: { get: () => g, set(o3) {
    g = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
  } }, foregroundImageWidth: { get() {
    return void 0 === l ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l : l;
  }, set(o3) {
    l = Number(o3);
  } }, foregroundImageHeight: { get() {
    return void 0 === h ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h : h;
  }, set(o3) {
    h = Number(o3);
  } }, foregroundImageX: { get() {
    return void 0 === c ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c : c;
  }, set(o3) {
    c = Number(o3);
  } }, foregroundImageY: { get() {
    return void 0 === m ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m : m;
  }, set(o3) {
    m = Number(o3);
  } }, foregroundImagePadding: { get() {
    return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
  }, set(o3) {
    f2 = Number(o3);
  } }, foregroundImageBorderRadius: { get() {
    return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
  }, set(o3) {
    v2 = Number(o3);
  } }, foregroundImageShadowOffsetX: { get() {
    return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
  }, set(o3) {
    p2 = Number(o3);
  } }, foregroundImageShadowOffsetY: { get() {
    return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
  }, set(o3) {
    k = Number(o3);
  } }, foregroundImageShadowBlur: { get() {
    return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
  }, set(o3) {
    y = Number(o3);
  } }, foregroundPadding: { get: () => w, set(o3) {
    w = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
  } }, positionProbeBackgroundColor: { get() {
    return I || this.backgroundColor;
  }, set(o3) {
    I = o3;
  } }, positionProbeForegroundColor: { get() {
    return B || this.foregroundColor;
  }, set(o3) {
    B = o3;
  } }, separatorColor: { get() {
    return S || this.backgroundColor;
  }, set(o3) {
    S = o3;
  } }, positionAdjustBackgroundColor: { get() {
    return P || this.backgroundColor;
  }, set(o3) {
    P = o3;
  } }, positionAdjustForegroundColor: { get() {
    return L || this.foregroundColor;
  }, set(o3) {
    L = o3;
  } }, timingBackgroundColor: { get() {
    return D || this.backgroundColor;
  }, set(o3) {
    D = o3;
  } }, timingForegroundColor: { get() {
    return A || this.foregroundColor;
  }, set(o3) {
    A = o3;
  } }, typeNumberBackgroundColor: { get() {
    return E || this.backgroundColor;
  }, set(o3) {
    E = o3;
  } }, typeNumberForegroundColor: { get() {
    return T || this.foregroundColor;
  }, set(o3) {
    T = o3;
  } }, darkBlockColor: { get() {
    return N || this.foregroundColor;
  }, set(o3) {
    N = o3;
  } }, canvasContext: { get() {
    if (void 0 === M)
      throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");
    return M;
  }, set(o3) {
    M = C(o3);
  } } }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
}
f.prototype = { get: function(o2) {
  return this.num[o2];
}, getLength: function() {
  return this.num.length;
}, multiply: function(o2) {
  for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r = 0; r < this.getLength(); r++)
    for (var t = 0; t < o2.getLength(); t++)
      e2[r + t] ^= c.gexp(c.glog(this.get(r)) + c.glog(o2.get(t)));
  return new f(e2, 0);
}, mod: function(o2) {
  if (this.getLength() - o2.getLength() < 0)
    return this;
  for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r = new Array(this.getLength()), t = 0; t < this.getLength(); t++)
    r[t] = this.get(t);
  for (t = 0; t < o2.getLength(); t++)
    r[t] ^= c.gexp(c.glog(o2.get(t)) + e2);
  return new f(r, 0).mod(o2);
} }, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function(o2, e2) {
  var r = v.getRsBlockTable(o2, e2);
  if (null == r)
    throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
  for (var t = r.length / 3, i2 = new Array(), n = 0; n < t; n++)
    for (var a = r[3 * n + 0], d = r[3 * n + 1], u = r[3 * n + 2], s = 0; s < a; s++)
      i2.push(new v(d, u));
  return i2;
}, v.getRsBlockTable = function(o2, e2) {
  switch (e2) {
    case t.L:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
    case t.M:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
    case t.Q:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
    case t.H:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
    default:
      return;
  }
}, p.prototype = { get: function(o2) {
  var e2 = Math.floor(o2 / 8);
  return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
}, put: function(o2, e2) {
  for (var r = 0; r < e2; r++)
    this.putBit(1 == (o2 >>> e2 - r - 1 & 1));
}, getLengthInBits: function() {
  return this.length;
}, putBit: function(o2) {
  var e2 = Math.floor(this.length / 8);
  this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
} }, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
  this.errMsg = "[uQRCode]: " + o2;
}, b.plugins = [], b.use = function(o2) {
  "function" == typeof o2 && b.plugins.push(o2);
}, b.prototype.loadImage = function(o2) {
  return Promise.resolve(o2);
}, b.prototype.setOptions = function(o2) {
  var e2, r, t, i2, n, a, d, u, s, g, l, h, c, m, f2, v2, p2, C2, b2, k, y, w, I, B, S, P, L, D, A, E, T, N, M, z, R, _, O, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
  o2 && (Object.keys(o2).forEach((e3) => {
    this[e3] = o2[e3];
  }), function(o3 = {}, e3 = {}, r2 = false) {
    let t2;
    t2 = r2 ? o3 : { ...o3 };
    for (let o4 in e3) {
      var i3 = e3[o4];
      null != i3 && (i3.constructor == Object ? t2[o4] = this.deepReplace(t2[o4], i3) : i3.constructor != String || i3 ? t2[o4] = i3 : t2[o4] = t2[o4]);
    }
  }(this, { data: o2.data || o2.text, size: o2.size, useDynamicSize: o2.useDynamicSize, typeNumber: o2.typeNumber, errorCorrectLevel: o2.errorCorrectLevel, margin: o2.margin, areaColor: o2.areaColor, backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color), backgroundImageSrc: o2.backgroundImageSrc || (null === (r = o2.background) || void 0 === r || null === (t = r.image) || void 0 === t ? void 0 : t.src), backgroundImageWidth: o2.backgroundImageWidth || (null === (i2 = o2.background) || void 0 === i2 || null === (n = i2.image) || void 0 === n ? void 0 : n.width), backgroundImageHeight: o2.backgroundImageHeight || (null === (a = o2.background) || void 0 === a || null === (d = a.image) || void 0 === d ? void 0 : d.height), backgroundImageX: o2.backgroundImageX || (null === (u = o2.background) || void 0 === u || null === (s = u.image) || void 0 === s ? void 0 : s.x), backgroundImageY: o2.backgroundImageY || (null === (g = o2.background) || void 0 === g || null === (l = g.image) || void 0 === l ? void 0 : l.y), backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h = o2.background) || void 0 === h || null === (c = h.image) || void 0 === c ? void 0 : c.alpha), backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m = o2.background) || void 0 === m || null === (f2 = m.image) || void 0 === f2 ? void 0 : f2.borderRadius), backgroundPadding: o2.backgroundPadding, foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color), foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src), foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (k = b2.image) || void 0 === k ? void 0 : k.width), foregroundImageHeight: o2.foregroundImageHeight || (null === (y = o2.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height), foregroundImageX: o2.foregroundImageX || (null === (I = o2.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x), foregroundImageY: o2.foregroundImageY || (null === (S = o2.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y), foregroundImagePadding: o2.foregroundImagePadding || (null === (L = o2.foreground) || void 0 === L || null === (D = L.image) || void 0 === D ? void 0 : D.padding), foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (A = o2.foreground) || void 0 === A || null === (E = A.image) || void 0 === E ? void 0 : E.backgroundColor), foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (T = o2.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius), foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M = o2.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX), foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (R = o2.foreground) || void 0 === R || null === (_ = R.image) || void 0 === _ ? void 0 : _.shadowOffsetY), foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (O = o2.foreground) || void 0 === O || null === (F = O.image) || void 0 === F ? void 0 : F.shadowBlur), foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (x = o2.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor), foregroundPadding: o2.foregroundPadding, positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X = o2.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o2.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor), positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j = o2.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o2.positionDetection) || void 0 === W ? void 0 : W.foregroundColor), separatorColor: o2.separatorColor || (null === (G = o2.separator) || void 0 === G ? void 0 : G.color), positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K = o2.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o2.alignment) || void 0 === Q ? void 0 : Q.backgroundColor), positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U = o2.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o2.alignment) || void 0 === $ ? void 0 : $.foregroundColor), timingBackgroundColor: o2.timingBackgroundColor || (null === (J = o2.timing) || void 0 === J ? void 0 : J.backgroundColor), timingForegroundColor: o2.timingForegroundColor || (null === (q = o2.timing) || void 0 === q ? void 0 : q.foregroundColor), typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V = o2.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o2.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor), typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor), darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color) }, true));
}, b.prototype.make = function() {
  let { foregroundColor: o2, backgroundColor: r, typeNumber: t, errorCorrectLevel: i2, data: n, size: a, margin: d, useDynamicSize: u } = this;
  if (o2 === r)
    throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");
  var s = new e(t, i2);
  s.addData(function(o3) {
    o3 = o3.toString();
    for (var e2, r2 = "", t2 = 0; t2 < o3.length; t2++)
      (e2 = o3.charCodeAt(t2)) >= 1 && e2 <= 127 ? r2 += o3.charAt(t2) : e2 > 2047 ? (r2 += String.fromCharCode(224 | e2 >> 12 & 15), r2 += String.fromCharCode(128 | e2 >> 6 & 63), r2 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r2 += String.fromCharCode(192 | e2 >> 6 & 31), r2 += String.fromCharCode(128 | e2 >> 0 & 63));
    return r2;
  }(n)), s.make(), this.base = s, this.typeNumber = s.typeNumber, this.modules = s.modules, this.moduleCount = s.moduleCount, this.dynamicSize = u ? Math.ceil((a - 2 * d) / s.moduleCount) * s.moduleCount + 2 * d : a, function(o3) {
    let { dynamicSize: e2, margin: r2, backgroundColor: t2, backgroundPadding: i3, foregroundColor: n2, foregroundPadding: a2, modules: d2, moduleCount: u2 } = o3, s2 = (e2 - 2 * r2) / u2, g = s2, l = 0;
    i3 > 0 && (l = g * i3 / 2, g -= 2 * l);
    let h = s2, c = 0;
    a2 > 0 && (c = h * a2 / 2, h -= 2 * c);
    for (var m = 0; m < u2; m++)
      for (var f2 = 0; f2 < u2; f2++) {
        var v2 = f2 * s2 + r2, p2 = m * s2 + r2;
        if (d2[m][f2]) {
          var C2 = c, b2 = v2 + c, k = p2 + c, y = h, w = h;
          d2[m][f2] = { type: ["foreground"], color: n2, isBlack: true, isDrawn: false, destX: v2, destY: p2, destWidth: s2, destHeight: s2, x: b2, y: k, width: y, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
        } else
          C2 = l, b2 = v2 + l, k = p2 + l, y = g, w = g, d2[m][f2] = { type: ["background"], color: t2, isBlack: false, isDrawn: false, destX: v2, destY: p2, destWidth: s2, destHeight: s2, x: b2, y: k, width: y, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
      }
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, positionProbeBackgroundColor: t2, positionProbeForegroundColor: i3 } = o3, n2 = r2 - 7;
    [[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach((o4) => {
      var r3 = e2[o4[0]][o4[1]], a2 = e2[o4[0] + n2][o4[1]], d2 = e2[o4[0]][o4[1] + n2];
      d2.type.push("positionProbe"), a2.type.push("positionProbe"), r3.type.push("positionProbe"), r3.color = 1 == o4[2] ? i3 : t2, a2.color = 1 == o4[2] ? i3 : t2, d2.color = 1 == o4[2] ? i3 : t2;
    });
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, separatorColor: t2 } = o3;
    [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach((o4) => {
      var i3 = e2[o4[0]][o4[1]], n2 = e2[r2 - o4[0] - 1][o4[1]], a2 = e2[o4[0]][r2 - o4[1] - 1];
      a2.type.push("separator"), n2.type.push("separator"), i3.type.push("separator"), i3.color = t2, n2.color = t2, a2.color = t2;
    });
  }(this), function(o3) {
    let { typeNumber: e2, modules: r2, moduleCount: t2, foregroundColor: i3, backgroundColor: n2, positionAdjustForegroundColor: a2, positionAdjustBackgroundColor: d2, timingForegroundColor: u2, timingBackgroundColor: s2 } = o3;
    const g = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e2 - 1];
    if (g) {
      const o4 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]], e3 = g.length;
      for (let l = 0; l < e3; l++)
        for (let h = 0; h < e3; h++) {
          let { x: e4, y: c } = { x: g[l], y: g[h] };
          e4 < 9 && c < 9 || e4 > t2 - 9 - 1 && c < 9 || c > t2 - 9 - 1 && e4 < 9 || o4.forEach((o5) => {
            var t3 = r2[e4 + o5[0]][c + o5[1]];
            t3.type.push("positionAdjust"), t3.type.includes("timing") ? 1 == o5[2] ? t3.color = a2 == i3 ? u2 : a2 : t3.color = a2 == i3 && d2 == n2 ? s2 : d2 : t3.color = 1 == o5[2] ? a2 : d2;
          });
        }
    }
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, timingForegroundColor: t2, timingBackgroundColor: i3 } = o3, n2 = r2 - 16;
    for (let o4 = 0; o4 < n2; o4++) {
      var a2 = e2[6][8 + o4], d2 = e2[8 + o4][6];
      a2.type.push("timing"), d2.type.push("timing"), a2.color = 1 & o4 ^ 1 ? t2 : i3, d2.color = 1 & o4 ^ 1 ? t2 : i3;
    }
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, darkBlockColor: t2 } = o3;
    var i3 = e2[r2 - 7 - 1][8];
    i3.type.push("darkBlock"), i3.color = t2;
  }(this), function(o3) {
    let { typeNumber: e2, modules: r2, moduleCount: t2, typeNumberBackgroundColor: i3, typeNumberForegroundColor: n2 } = o3;
    if (e2 < 7)
      return r2;
    const a2 = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"];
    let d2 = a2[e2] + a2[e2], u2 = [t2 - 11, t2 - 10, t2 - 9];
    [[5, u2[2]], [5, u2[1]], [5, u2[0]], [4, u2[2]], [4, u2[1]], [4, u2[0]], [3, u2[2]], [3, u2[1]], [3, u2[0]], [2, u2[2]], [2, u2[1]], [2, u2[0]], [1, u2[2]], [1, u2[1]], [1, u2[0]], [0, u2[2]], [0, u2[1]], [0, u2[0]], [u2[2], 5], [u2[1], 5], [u2[0], 5], [u2[2], 4], [u2[1], 4], [u2[0], 4], [u2[2], 3], [u2[1], 3], [u2[0], 3], [u2[2], 2], [u2[1], 2], [u2[0], 2], [u2[2], 1], [u2[1], 1], [u2[0], 1], [u2[2], 0], [u2[1], 0], [u2[0], 0]].forEach((o4, e3) => {
      var t3 = r2[o4[0]][o4[1]];
      t3.type.push("typeNumber"), t3.color = "1" == d2[e3] ? n2 : i3;
    });
  }(this), this.isMaked = true, this.drawModules = [];
}, b.prototype.getDrawModules = function() {
  if (this.drawModules && this.drawModules.length > 0)
    return this.drawModules;
  let o2 = this.drawModules = [], { modules: e2, moduleCount: r, dynamicSize: t, areaColor: i2, backgroundImageSrc: n, backgroundImageX: a, backgroundImageY: d, backgroundImageWidth: u, backgroundImageHeight: s, backgroundImageAlpha: g, backgroundImageBorderRadius: l, foregroundImageSrc: h, foregroundImageX: c, foregroundImageY: m, foregroundImageWidth: f2, foregroundImageHeight: v2, foregroundImagePadding: p2, foregroundImageBackgroundColor: C2, foregroundImageBorderRadius: b2, foregroundImageShadowOffsetX: k, foregroundImageShadowOffsetY: y, foregroundImageShadowBlur: w, foregroundImageShadowColor: I } = this;
  i2 && o2.push({ name: "area", type: "area", color: i2, x: 0, y: 0, width: t, height: t }), n && o2.push({ name: "backgroundImage", type: "image", imageSrc: n, mappingName: "backgroundImageSrc", x: a, y: d, width: u, height: s, alpha: g, borderRadius: l });
  for (var B = 0; B < r; B++)
    for (var S = 0; S < r; S++) {
      var P = e2[B][S];
      P.isDrawn || (P.type.includes("foreground") ? o2.push({ name: "foreground", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }) : o2.push({ name: "background", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }), P.isDrawn = true);
    }
  return h && o2.push({ name: "foregroundImage", type: "image", imageSrc: h, mappingName: "foregroundImageSrc", x: c, y: m, width: f2, height: v2, padding: p2, backgroundColor: C2, borderRadius: b2, shadowOffsetX: k, shadowOffsetY: y, shadowBlur: w, shadowColor: I }), o2;
}, b.prototype.isBlack = function(o2, e2) {
  var r = this.moduleCount;
  return !(0 > o2 || 0 > e2 || o2 >= r || e2 >= r) && this.modules[o2][e2].isBlack;
}, b.prototype.drawCanvas = function() {
  let { isMaked: o2, canvasContext: e2, useDynamicSize: r, dynamicSize: t, foregroundColor: i2, foregroundPadding: n, backgroundColor: a, backgroundPadding: d, drawReserve: u, margin: s } = this;
  if (!o2)
    return formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));
  let g = this.getDrawModules(), l = async (o3, r2) => {
    try {
      e2.clearRect(0, 0, t, t), e2.draw(false);
      for (var i3 = 0; i3 < g.length; i3++) {
        var n2 = g[i3];
        switch (e2.save(), n2.type) {
          case "area":
            e2.setFillStyle(n2.color), e2.fillRect(n2.x, n2.y, n2.width, n2.height);
            break;
          case "tile":
            var a2 = n2.x, d2 = n2.y, s2 = n2.width, l2 = n2.height;
            e2.setFillStyle(n2.color), e2.fillRect(a2, d2, s2, l2);
            break;
          case "image":
            if ("backgroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), s2 = Math.round(n2.width), l2 = Math.round(n2.height);
              s2 < 2 * (c = Math.round(n2.borderRadius)) && (c = s2 / 2), l2 < 2 * c && (c = l2 / 2), e2.setGlobalAlpha(n2.alpha), c > 0 && (e2.beginPath(), e2.moveTo(a2 + c, d2), e2.arcTo(a2 + s2, d2, a2 + s2, d2 + l2, c), e2.arcTo(a2 + s2, d2 + l2, a2, d2 + l2, c), e2.arcTo(a2, d2 + l2, a2, d2, c), e2.arcTo(a2, d2, a2 + s2, d2, c), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
              try {
                var h = await this.loadImage(n2.imageSrc);
                e2.drawImage(h, a2, d2, s2, l2);
              } catch (o4) {
                throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n2.mappingName} invalid!`), new b.Error(`${n2.mappingName} invalid!`);
              }
            } else if ("foregroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), s2 = Math.round(n2.width), l2 = Math.round(n2.height);
              var c, m = Math.round(n2.padding);
              s2 < 2 * (c = Math.round(n2.borderRadius)) && (c = s2 / 2), l2 < 2 * c && (c = l2 / 2);
              var f2 = a2 - m, v2 = d2 - m, p2 = s2 + 2 * m, C2 = l2 + 2 * m, k = Math.round(p2 / s2 * c);
              p2 < 2 * k && (k = p2 / 2), C2 < 2 * k && (k = C2 / 2), e2.save(), e2.setShadow(n2.shadowOffsetX, n2.shadowOffsetY, n2.shadowBlur, n2.shadowColor), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(n2.backgroundColor), e2.fill()) : (e2.setFillStyle(n2.backgroundColor), e2.fillRect(f2, v2, p2, C2)), e2.restore(), e2.save(), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"), e2.fill()) : (e2.setFillStyle(m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"), e2.fillRect(f2, v2, p2, C2)), e2.restore(), c > 0 && (e2.beginPath(), e2.moveTo(a2 + c, d2), e2.arcTo(a2 + s2, d2, a2 + s2, d2 + l2, c), e2.arcTo(a2 + s2, d2 + l2, a2, d2 + l2, c), e2.arcTo(a2, d2 + l2, a2, d2, c), e2.arcTo(a2, d2, a2 + s2, d2, c), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
              try {
                h = await this.loadImage(n2.imageSrc);
                e2.drawImage(h, a2, d2, s2, l2);
              } catch (o4) {
                throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n2.mappingName} invalid!`), new b.Error(`${n2.mappingName} invalid!`);
              }
            }
        }
        u && e2.draw(true), e2.restore();
      }
      e2.draw(true), setTimeout(o3, 150);
    } catch (o4) {
      if (!(o4 instanceof b.Error))
        throw o4;
      r2(o4);
    }
  };
  return new Promise((o3, e3) => {
    l(o3, e3);
  });
}, b.prototype.draw = function() {
  return this.drawCanvas();
}, b.prototype.register = function(o2) {
  o2 && o2(b, this, true);
};
class FillStylePattern {
  constructor(img, pattern) {
    this._style = pattern;
    this._img = img;
  }
}
class FillStyleLinearGradient {
  constructor(x0, y0, x1, y1) {
    this.addColorStop = function(pos, color) {
      if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
        this._stops[this._stop_count] = { _pos: pos, _color: color };
        this._stop_count++;
      }
    };
    this._start_pos = { _x: x0, _y: y0 };
    this._end_pos = { _x: x1, _y: y1 };
    this._stop_count = 0;
    this._stops = [0, 0, 0, 0, 0];
  }
}
class FillStyleRadialGradient {
  constructor(x0, y0, r0, x1, y1, r1) {
    this._start_pos = { _x: x0, _y: y0, _r: r0 };
    this._end_pos = { _x: x1, _y: y1, _r: r1 };
    this._stop_count = 0;
    this._stops = [0, 0, 0, 0, 0];
  }
  addColorStop(pos, color) {
    if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
      this._stops[this._stop_count] = { _pos: pos, _color: color };
      this._stop_count++;
    }
  }
}
let incId = 1;
const noop = function() {
};
const _GImage = class {
  constructor() {
    this._id = incId++;
    this._width = 0;
    this._height = 0;
    this._src = void 0;
    this._onload = noop;
    this._onerror = noop;
    this.complete = false;
  }
  get width() {
    return this._width;
  }
  set width(v2) {
    this._width = v2;
  }
  get height() {
    return this._height;
  }
  set height(v2) {
    this._height = v2;
  }
  get src() {
    return this._src;
  }
  set src(v2) {
    if (v2.startsWith("//")) {
      v2 = "http:" + v2;
    }
    this._src = v2;
    _GImage.GBridge.perloadImage([this._src, this._id], (data) => {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (data.error) {
        var evt = { type: "error", target: this };
        this.onerror(evt);
      } else {
        this.complete = true;
        this.width = typeof data.width === "number" ? data.width : 0;
        this.height = typeof data.height === "number" ? data.height : 0;
        var evt = { type: "load", target: this };
        this.onload(evt);
      }
    });
  }
  addEventListener(name2, listener) {
    if (name2 === "load") {
      this.onload = listener;
    } else if (name2 === "error") {
      this.onerror = listener;
    }
  }
  removeEventListener(name2, listener) {
    if (name2 === "load") {
      this.onload = noop;
    } else if (name2 === "error") {
      this.onerror = noop;
    }
  }
  get onload() {
    return this._onload;
  }
  set onload(v2) {
    this._onload = v2;
  }
  get onerror() {
    return this._onerror;
  }
  set onerror(v2) {
    this._onerror = v2;
  }
};
let GImage = _GImage;
GImage.GBridge = null;
function ArrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8ClampedArray(buffer);
  for (var len = bytes.byteLength, i2 = 0; i2 < len; i2++) {
    binary += String.fromCharCode(bytes[i2]);
  }
  return btoa(binary);
}
function Base64ToUint8ClampedArray(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8ClampedArray(rawData.length);
  for (let i2 = 0; i2 < rawData.length; ++i2) {
    outputArray[i2] = rawData.charCodeAt(i2);
  }
  return outputArray;
}
class CanvasRenderingContext2D {
  // _imageMap = new GHashMap();
  // _textureMap = new GHashMap();
  constructor() {
    this._drawCommands = "";
    this._globalAlpha = 1;
    this._fillStyle = "rgb(0,0,0)";
    this._strokeStyle = "rgb(0,0,0)";
    this._lineWidth = 1;
    this._lineCap = "butt";
    this._lineJoin = "miter";
    this._miterLimit = 10;
    this._globalCompositeOperation = "source-over";
    this._textAlign = "start";
    this._textBaseline = "alphabetic";
    this._font = "10px sans-serif";
    this._savedGlobalAlpha = [];
    this.timer = null;
    this.componentId = null;
    this._notCommitDrawImageCache = [];
    this._needRedrawImageCache = [];
    this._redrawCommands = "";
    this._autoSaveContext = true;
    this.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
      return new FillStyleRadialGradient(x0, y0, r0, x1, y1, r1);
    };
    this.createCircularGradient = function(x0, y0, r0) {
      return new FillStyleRadialGradient(x0, y0, 0, x0, y0, r0);
    };
    this.quadraticCurveTo = function(cpx, cpy, x, y) {
      this._drawCommands = this._drawCommands.concat("u" + cpx + "," + cpy + "," + x + "," + y + ";");
    };
    this.strokeText = function(text, x, y) {
      let tmptext = text.replace(/!/g, "!!");
      tmptext = tmptext.replace(/,/g, "!,");
      tmptext = tmptext.replace(/;/g, "!;");
      this._drawCommands = this._drawCommands.concat("U" + tmptext + "," + x + "," + y + ",0.0;");
    };
    this.isPointInPath = function(x, y) {
      throw new Error("GCanvas not supported yet");
    };
    this.className = "CanvasRenderingContext2D";
  }
  setFillStyle(value) {
    this.fillStyle = value;
  }
  set fillStyle(value) {
    this._fillStyle = value;
    if (typeof value == "string") {
      this._drawCommands = this._drawCommands.concat("F" + value + ";");
    } else if (value instanceof FillStylePattern) {
      const image2 = value._img;
      if (!image2.complete) {
        image2.onload = () => {
          var index = this._needRedrawImageCache.indexOf(image2);
          if (index > -1) {
            this._needRedrawImageCache.splice(index, 1);
            CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
            this._redrawflush(true);
          }
        };
        this._notCommitDrawImageCache.push(image2);
      } else {
        CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
      }
      this._drawCommands = this._drawCommands.concat("G" + image2._id + "," + value._style + ";");
    } else if (value instanceof FillStyleLinearGradient) {
      var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    } else if (value instanceof FillStyleRadialGradient) {
      var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._end_pos._r.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    }
  }
  get fillStyle() {
    return this._fillStyle;
  }
  get globalAlpha() {
    return this._globalAlpha;
  }
  setGlobalAlpha(value) {
    this.globalAlpha = value;
  }
  set globalAlpha(value) {
    this._globalAlpha = value;
    this._drawCommands = this._drawCommands.concat("a" + value.toFixed(2) + ";");
  }
  get strokeStyle() {
    return this._strokeStyle;
  }
  setStrokeStyle(value) {
    this.strokeStyle = value;
  }
  set strokeStyle(value) {
    this._strokeStyle = value;
    if (typeof value == "string") {
      this._drawCommands = this._drawCommands.concat("S" + value + ";");
    } else if (value instanceof FillStylePattern) {
      CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image.src, image._id);
      this._drawCommands = this._drawCommands.concat("G" + image._id + "," + value._style + ";");
    } else if (value instanceof FillStyleLinearGradient) {
      var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    } else if (value instanceof FillStyleRadialGradient) {
      var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y + ",".toFixed(2) + value._end_pos._r.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    }
  }
  get lineWidth() {
    return this._lineWidth;
  }
  setLineWidth(value) {
    this.lineWidth = value;
  }
  set lineWidth(value) {
    this._lineWidth = value;
    this._drawCommands = this._drawCommands.concat("W" + value + ";");
  }
  get lineCap() {
    return this._lineCap;
  }
  setLineCap(value) {
    this.lineCap = value;
  }
  set lineCap(value) {
    this._lineCap = value;
    this._drawCommands = this._drawCommands.concat("C" + value + ";");
  }
  get lineJoin() {
    return this._lineJoin;
  }
  setLineJoin(value) {
    this.lineJoin = value;
  }
  set lineJoin(value) {
    this._lineJoin = value;
    this._drawCommands = this._drawCommands.concat("J" + value + ";");
  }
  get miterLimit() {
    return this._miterLimit;
  }
  setMiterLimit(value) {
    this.miterLimit = value;
  }
  set miterLimit(value) {
    this._miterLimit = value;
    this._drawCommands = this._drawCommands.concat("M" + value + ";");
  }
  get globalCompositeOperation() {
    return this._globalCompositeOperation;
  }
  set globalCompositeOperation(value) {
    this._globalCompositeOperation = value;
    let mode = 0;
    switch (value) {
      case "source-over":
        mode = 0;
        break;
      case "source-atop":
        mode = 5;
        break;
      case "source-in":
        mode = 0;
        break;
      case "source-out":
        mode = 2;
        break;
      case "destination-over":
        mode = 4;
        break;
      case "destination-atop":
        mode = 4;
        break;
      case "destination-in":
        mode = 4;
        break;
      case "destination-out":
        mode = 3;
        break;
      case "lighter":
        mode = 1;
        break;
      case "copy":
        mode = 2;
        break;
      case "xor":
        mode = 6;
        break;
      default:
        mode = 0;
    }
    this._drawCommands = this._drawCommands.concat("B" + mode + ";");
  }
  get textAlign() {
    return this._textAlign;
  }
  setTextAlign(value) {
    this.textAlign = value;
  }
  set textAlign(value) {
    this._textAlign = value;
    let Align = 0;
    switch (value) {
      case "start":
        Align = 0;
        break;
      case "end":
        Align = 1;
        break;
      case "left":
        Align = 2;
        break;
      case "center":
        Align = 3;
        break;
      case "right":
        Align = 4;
        break;
      default:
        Align = 0;
    }
    this._drawCommands = this._drawCommands.concat("A" + Align + ";");
  }
  get textBaseline() {
    return this._textBaseline;
  }
  setTextBaseline(value) {
    this.textBaseline = value;
  }
  set textBaseline(value) {
    this._textBaseline = value;
    let baseline = 0;
    switch (value) {
      case "alphabetic":
        baseline = 0;
        break;
      case "middle":
        baseline = 1;
        break;
      case "top":
        baseline = 2;
        break;
      case "hanging":
        baseline = 3;
        break;
      case "bottom":
        baseline = 4;
        break;
      case "ideographic":
        baseline = 5;
        break;
      default:
        baseline = 0;
        break;
    }
    this._drawCommands = this._drawCommands.concat("E" + baseline + ";");
  }
  get font() {
    return this._font;
  }
  setFontSize(size) {
    var str = this._font;
    var strs = str.trim().split(/\s+/);
    for (var i2 = 0; i2 < strs.length; i2++) {
      var values = [
        "normal",
        "italic",
        "oblique",
        "normal",
        "small-caps",
        "normal",
        "bold",
        "bolder",
        "lighter",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "normal",
        "ultra-condensed",
        "extra-condensed",
        "condensed",
        "semi-condensed",
        "semi-expanded",
        "expanded",
        "extra-expanded",
        "ultra-expanded"
      ];
      if (-1 == values.indexOf(strs[i2].trim())) {
        if (typeof size === "string") {
          strs[i2] = size;
        } else if (typeof size === "number") {
          strs[i2] = String(size) + "px";
        }
        break;
      }
    }
    this.font = strs.join(" ");
  }
  set font(value) {
    this._font = value;
    this._drawCommands = this._drawCommands.concat("j" + value + ";");
  }
  setTransform(a, b2, c, d, tx, ty) {
    this._drawCommands = this._drawCommands.concat("t" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b2 === 0 ? "0" : b2.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
  }
  transform(a, b2, c, d, tx, ty) {
    this._drawCommands = this._drawCommands.concat("f" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b2 === 0 ? "0" : b2.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx + "," + ty + ";");
  }
  resetTransform() {
    this._drawCommands = this._drawCommands.concat("m;");
  }
  scale(a, d) {
    this._drawCommands = this._drawCommands.concat("k" + a.toFixed(2) + "," + d.toFixed(2) + ";");
  }
  rotate(angle) {
    this._drawCommands = this._drawCommands.concat("r" + angle.toFixed(6) + ";");
  }
  translate(tx, ty) {
    this._drawCommands = this._drawCommands.concat("l" + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
  }
  save() {
    this._savedGlobalAlpha.push(this._globalAlpha);
    this._drawCommands = this._drawCommands.concat("v;");
  }
  restore() {
    this._drawCommands = this._drawCommands.concat("e;");
    this._globalAlpha = this._savedGlobalAlpha.pop();
  }
  createPattern(img, pattern) {
    if (typeof img === "string") {
      var imgObj = new GImage();
      imgObj.src = img;
      img = imgObj;
    }
    return new FillStylePattern(img, pattern);
  }
  createLinearGradient(x0, y0, x1, y1) {
    return new FillStyleLinearGradient(x0, y0, x1, y1);
  }
  strokeRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("s" + x + "," + y + "," + w + "," + h + ";");
  }
  clearRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("c" + x + "," + y + "," + w + "," + h + ";");
  }
  clip() {
    this._drawCommands = this._drawCommands.concat("p;");
  }
  resetClip() {
    this._drawCommands = this._drawCommands.concat("q;");
  }
  closePath() {
    this._drawCommands = this._drawCommands.concat("o;");
  }
  moveTo(x, y) {
    this._drawCommands = this._drawCommands.concat("g" + x.toFixed(2) + "," + y.toFixed(2) + ";");
  }
  lineTo(x, y) {
    this._drawCommands = this._drawCommands.concat("i" + x.toFixed(2) + "," + y.toFixed(2) + ";");
  }
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this._drawCommands = this._drawCommands.concat(
      "z" + cp1x.toFixed(2) + "," + cp1y.toFixed(2) + "," + cp2x.toFixed(2) + "," + cp2y.toFixed(2) + "," + x.toFixed(2) + "," + y.toFixed(2) + ";"
    );
  }
  arcTo(x1, y1, x2, y2, radius) {
    this._drawCommands = this._drawCommands.concat("h" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + radius + ";");
  }
  beginPath() {
    this._drawCommands = this._drawCommands.concat("b;");
  }
  fillRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("n" + x + "," + y + "," + w + "," + h + ";");
  }
  rect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("w" + x + "," + y + "," + w + "," + h + ";");
  }
  fill() {
    this._drawCommands = this._drawCommands.concat("L;");
  }
  stroke(path) {
    this._drawCommands = this._drawCommands.concat("x;");
  }
  arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    let ianticlockwise = 0;
    if (anticlockwise) {
      ianticlockwise = 1;
    }
    this._drawCommands = this._drawCommands.concat(
      "y" + x.toFixed(2) + "," + y.toFixed(2) + "," + radius.toFixed(2) + "," + startAngle + "," + endAngle + "," + ianticlockwise + ";"
    );
  }
  fillText(text, x, y) {
    let tmptext = text.replace(/!/g, "!!");
    tmptext = tmptext.replace(/,/g, "!,");
    tmptext = tmptext.replace(/;/g, "!;");
    this._drawCommands = this._drawCommands.concat("T" + tmptext + "," + x + "," + y + ",0.0;");
  }
  measureText(text) {
    return CanvasRenderingContext2D.GBridge.measureText(text, this.font, this.componentId);
  }
  drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (typeof image2 === "string") {
      var imgObj = new GImage();
      imgObj.src = image2;
      image2 = imgObj;
    }
    if (image2 instanceof GImage) {
      if (!image2.complete) {
        imgObj.onload = () => {
          var index = this._needRedrawImageCache.indexOf(image2);
          if (index > -1) {
            this._needRedrawImageCache.splice(index, 1);
            CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
            this._redrawflush(true);
          }
        };
        this._notCommitDrawImageCache.push(image2);
      } else {
        CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
      }
      var srcArgs = [image2, sx, sy, sw, sh, dx, dy, dw, dh];
      var args = [];
      for (var arg in srcArgs) {
        if (typeof srcArgs[arg] != "undefined") {
          args.push(srcArgs[arg]);
        }
      }
      this.__drawImage.apply(this, args);
    }
  }
  __drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
    const numArgs = arguments.length;
    function drawImageCommands() {
      if (numArgs === 3) {
        const x = parseFloat(sx) || 0;
        const y = parseFloat(sy) || 0;
        return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + image2.width + "," + image2.height + ";";
      } else if (numArgs === 5) {
        const x = parseFloat(sx) || 0;
        const y = parseFloat(sy) || 0;
        const width = parseInt(sw) || image2.width;
        const height = parseInt(sh) || image2.height;
        return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + width + "," + height + ";";
      } else if (numArgs === 9) {
        sx = parseFloat(sx) || 0;
        sy = parseFloat(sy) || 0;
        sw = parseInt(sw) || image2.width;
        sh = parseInt(sh) || image2.height;
        dx = parseFloat(dx) || 0;
        dy = parseFloat(dy) || 0;
        dw = parseInt(dw) || image2.width;
        dh = parseInt(dh) || image2.height;
        return "d" + image2._id + "," + sx + "," + sy + "," + sw + "," + sh + "," + dx + "," + dy + "," + dw + "," + dh + ";";
      }
    }
    this._drawCommands += drawImageCommands();
  }
  _flush(reserve, callback) {
    const commands = this._drawCommands;
    this._drawCommands = "";
    CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
    this._needRender = false;
  }
  _redrawflush(reserve, callback) {
    const commands = this._redrawCommands;
    CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
    if (this._needRedrawImageCache.length == 0) {
      this._redrawCommands = "";
    }
  }
  draw(reserve, callback) {
    if (!reserve) {
      this._globalAlpha = this._savedGlobalAlpha.pop();
      this._savedGlobalAlpha.push(this._globalAlpha);
      this._redrawCommands = this._drawCommands;
      this._needRedrawImageCache = this._notCommitDrawImageCache;
      if (this._autoSaveContext) {
        this._drawCommands = "v;" + this._drawCommands;
        this._autoSaveContext = false;
      } else {
        this._drawCommands = "e;X;v;" + this._drawCommands;
      }
    } else {
      this._needRedrawImageCache = this._needRedrawImageCache.concat(this._notCommitDrawImageCache);
      this._redrawCommands += this._drawCommands;
      if (this._autoSaveContext) {
        this._drawCommands = "v;" + this._drawCommands;
        this._autoSaveContext = false;
      }
    }
    this._notCommitDrawImageCache = [];
    if (this._flush) {
      this._flush(reserve, callback);
    }
  }
  getImageData(x, y, w, h, callback) {
    CanvasRenderingContext2D.GBridge.getImageData(this.componentId, x, y, w, h, function(res) {
      res.data = Base64ToUint8ClampedArray(res.data);
      if (typeof callback == "function") {
        callback(res);
      }
    });
  }
  putImageData(data, x, y, w, h, callback) {
    if (data instanceof Uint8ClampedArray) {
      data = ArrayBufferToBase64(data);
      CanvasRenderingContext2D.GBridge.putImageData(this.componentId, data, x, y, w, h, function(res) {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    }
  }
  toTempFilePath(x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
    CanvasRenderingContext2D.GBridge.toTempFilePath(
      this.componentId,
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      fileType,
      quality,
      function(res) {
        if (typeof callback == "function") {
          callback(res);
        }
      }
    );
  }
}
const GLenum = {
  "DEPTH_BUFFER_BIT": 256,
  "STENCIL_BUFFER_BIT": 1024,
  "COLOR_BUFFER_BIT": 16384,
  "POINTS": 0,
  "LINES": 1,
  "LINE_LOOP": 2,
  "LINE_STRIP": 3,
  "TRIANGLES": 4,
  "TRIANGLE_STRIP": 5,
  "TRIANGLE_FAN": 6,
  "ZERO": 0,
  "ONE": 1,
  "SRC_COLOR": 768,
  "ONE_MINUS_SRC_COLOR": 769,
  "SRC_ALPHA": 770,
  "ONE_MINUS_SRC_ALPHA": 771,
  "DST_ALPHA": 772,
  "ONE_MINUS_DST_ALPHA": 773,
  "DST_COLOR": 774,
  "ONE_MINUS_DST_COLOR": 775,
  "SRC_ALPHA_SATURATE": 776,
  "FUNC_ADD": 32774,
  "BLEND_EQUATION": 32777,
  "BLEND_EQUATION_RGB": 32777,
  "BLEND_EQUATION_ALPHA": 34877,
  "FUNC_SUBTRACT": 32778,
  "FUNC_REVERSE_SUBTRACT": 32779,
  "BLEND_DST_RGB": 32968,
  "BLEND_SRC_RGB": 32969,
  "BLEND_DST_ALPHA": 32970,
  "BLEND_SRC_ALPHA": 32971,
  "CONSTANT_COLOR": 32769,
  "ONE_MINUS_CONSTANT_COLOR": 32770,
  "CONSTANT_ALPHA": 32771,
  "ONE_MINUS_CONSTANT_ALPHA": 32772,
  "BLEND_COLOR": 32773,
  "ARRAY_BUFFER": 34962,
  "ELEMENT_ARRAY_BUFFER": 34963,
  "ARRAY_BUFFER_BINDING": 34964,
  "ELEMENT_ARRAY_BUFFER_BINDING": 34965,
  "STREAM_DRAW": 35040,
  "STATIC_DRAW": 35044,
  "DYNAMIC_DRAW": 35048,
  "BUFFER_SIZE": 34660,
  "BUFFER_USAGE": 34661,
  "CURRENT_VERTEX_ATTRIB": 34342,
  "FRONT": 1028,
  "BACK": 1029,
  "FRONT_AND_BACK": 1032,
  "TEXTURE_2D": 3553,
  "CULL_FACE": 2884,
  "BLEND": 3042,
  "DITHER": 3024,
  "STENCIL_TEST": 2960,
  "DEPTH_TEST": 2929,
  "SCISSOR_TEST": 3089,
  "POLYGON_OFFSET_FILL": 32823,
  "SAMPLE_ALPHA_TO_COVERAGE": 32926,
  "SAMPLE_COVERAGE": 32928,
  "NO_ERROR": 0,
  "INVALID_ENUM": 1280,
  "INVALID_VALUE": 1281,
  "INVALID_OPERATION": 1282,
  "OUT_OF_MEMORY": 1285,
  "CW": 2304,
  "CCW": 2305,
  "LINE_WIDTH": 2849,
  "ALIASED_POINT_SIZE_RANGE": 33901,
  "ALIASED_LINE_WIDTH_RANGE": 33902,
  "CULL_FACE_MODE": 2885,
  "FRONT_FACE": 2886,
  "DEPTH_RANGE": 2928,
  "DEPTH_WRITEMASK": 2930,
  "DEPTH_CLEAR_VALUE": 2931,
  "DEPTH_FUNC": 2932,
  "STENCIL_CLEAR_VALUE": 2961,
  "STENCIL_FUNC": 2962,
  "STENCIL_FAIL": 2964,
  "STENCIL_PASS_DEPTH_FAIL": 2965,
  "STENCIL_PASS_DEPTH_PASS": 2966,
  "STENCIL_REF": 2967,
  "STENCIL_VALUE_MASK": 2963,
  "STENCIL_WRITEMASK": 2968,
  "STENCIL_BACK_FUNC": 34816,
  "STENCIL_BACK_FAIL": 34817,
  "STENCIL_BACK_PASS_DEPTH_FAIL": 34818,
  "STENCIL_BACK_PASS_DEPTH_PASS": 34819,
  "STENCIL_BACK_REF": 36003,
  "STENCIL_BACK_VALUE_MASK": 36004,
  "STENCIL_BACK_WRITEMASK": 36005,
  "VIEWPORT": 2978,
  "SCISSOR_BOX": 3088,
  "COLOR_CLEAR_VALUE": 3106,
  "COLOR_WRITEMASK": 3107,
  "UNPACK_ALIGNMENT": 3317,
  "PACK_ALIGNMENT": 3333,
  "MAX_TEXTURE_SIZE": 3379,
  "MAX_VIEWPORT_DIMS": 3386,
  "SUBPIXEL_BITS": 3408,
  "RED_BITS": 3410,
  "GREEN_BITS": 3411,
  "BLUE_BITS": 3412,
  "ALPHA_BITS": 3413,
  "DEPTH_BITS": 3414,
  "STENCIL_BITS": 3415,
  "POLYGON_OFFSET_UNITS": 10752,
  "POLYGON_OFFSET_FACTOR": 32824,
  "TEXTURE_BINDING_2D": 32873,
  "SAMPLE_BUFFERS": 32936,
  "SAMPLES": 32937,
  "SAMPLE_COVERAGE_VALUE": 32938,
  "SAMPLE_COVERAGE_INVERT": 32939,
  "COMPRESSED_TEXTURE_FORMATS": 34467,
  "DONT_CARE": 4352,
  "FASTEST": 4353,
  "NICEST": 4354,
  "GENERATE_MIPMAP_HINT": 33170,
  "BYTE": 5120,
  "UNSIGNED_BYTE": 5121,
  "SHORT": 5122,
  "UNSIGNED_SHORT": 5123,
  "INT": 5124,
  "UNSIGNED_INT": 5125,
  "FLOAT": 5126,
  "DEPTH_COMPONENT": 6402,
  "ALPHA": 6406,
  "RGB": 6407,
  "RGBA": 6408,
  "LUMINANCE": 6409,
  "LUMINANCE_ALPHA": 6410,
  "UNSIGNED_SHORT_4_4_4_4": 32819,
  "UNSIGNED_SHORT_5_5_5_1": 32820,
  "UNSIGNED_SHORT_5_6_5": 33635,
  "FRAGMENT_SHADER": 35632,
  "VERTEX_SHADER": 35633,
  "MAX_VERTEX_ATTRIBS": 34921,
  "MAX_VERTEX_UNIFORM_VECTORS": 36347,
  "MAX_VARYING_VECTORS": 36348,
  "MAX_COMBINED_TEXTURE_IMAGE_UNITS": 35661,
  "MAX_VERTEX_TEXTURE_IMAGE_UNITS": 35660,
  "MAX_TEXTURE_IMAGE_UNITS": 34930,
  "MAX_FRAGMENT_UNIFORM_VECTORS": 36349,
  "SHADER_TYPE": 35663,
  "DELETE_STATUS": 35712,
  "LINK_STATUS": 35714,
  "VALIDATE_STATUS": 35715,
  "ATTACHED_SHADERS": 35717,
  "ACTIVE_UNIFORMS": 35718,
  "ACTIVE_ATTRIBUTES": 35721,
  "SHADING_LANGUAGE_VERSION": 35724,
  "CURRENT_PROGRAM": 35725,
  "NEVER": 512,
  "LESS": 513,
  "EQUAL": 514,
  "LEQUAL": 515,
  "GREATER": 516,
  "NOTEQUAL": 517,
  "GEQUAL": 518,
  "ALWAYS": 519,
  "KEEP": 7680,
  "REPLACE": 7681,
  "INCR": 7682,
  "DECR": 7683,
  "INVERT": 5386,
  "INCR_WRAP": 34055,
  "DECR_WRAP": 34056,
  "VENDOR": 7936,
  "RENDERER": 7937,
  "VERSION": 7938,
  "NEAREST": 9728,
  "LINEAR": 9729,
  "NEAREST_MIPMAP_NEAREST": 9984,
  "LINEAR_MIPMAP_NEAREST": 9985,
  "NEAREST_MIPMAP_LINEAR": 9986,
  "LINEAR_MIPMAP_LINEAR": 9987,
  "TEXTURE_MAG_FILTER": 10240,
  "TEXTURE_MIN_FILTER": 10241,
  "TEXTURE_WRAP_S": 10242,
  "TEXTURE_WRAP_T": 10243,
  "TEXTURE": 5890,
  "TEXTURE_CUBE_MAP": 34067,
  "TEXTURE_BINDING_CUBE_MAP": 34068,
  "TEXTURE_CUBE_MAP_POSITIVE_X": 34069,
  "TEXTURE_CUBE_MAP_NEGATIVE_X": 34070,
  "TEXTURE_CUBE_MAP_POSITIVE_Y": 34071,
  "TEXTURE_CUBE_MAP_NEGATIVE_Y": 34072,
  "TEXTURE_CUBE_MAP_POSITIVE_Z": 34073,
  "TEXTURE_CUBE_MAP_NEGATIVE_Z": 34074,
  "MAX_CUBE_MAP_TEXTURE_SIZE": 34076,
  "TEXTURE0": 33984,
  "TEXTURE1": 33985,
  "TEXTURE2": 33986,
  "TEXTURE3": 33987,
  "TEXTURE4": 33988,
  "TEXTURE5": 33989,
  "TEXTURE6": 33990,
  "TEXTURE7": 33991,
  "TEXTURE8": 33992,
  "TEXTURE9": 33993,
  "TEXTURE10": 33994,
  "TEXTURE11": 33995,
  "TEXTURE12": 33996,
  "TEXTURE13": 33997,
  "TEXTURE14": 33998,
  "TEXTURE15": 33999,
  "TEXTURE16": 34e3,
  "TEXTURE17": 34001,
  "TEXTURE18": 34002,
  "TEXTURE19": 34003,
  "TEXTURE20": 34004,
  "TEXTURE21": 34005,
  "TEXTURE22": 34006,
  "TEXTURE23": 34007,
  "TEXTURE24": 34008,
  "TEXTURE25": 34009,
  "TEXTURE26": 34010,
  "TEXTURE27": 34011,
  "TEXTURE28": 34012,
  "TEXTURE29": 34013,
  "TEXTURE30": 34014,
  "TEXTURE31": 34015,
  "ACTIVE_TEXTURE": 34016,
  "REPEAT": 10497,
  "CLAMP_TO_EDGE": 33071,
  "MIRRORED_REPEAT": 33648,
  "FLOAT_VEC2": 35664,
  "FLOAT_VEC3": 35665,
  "FLOAT_VEC4": 35666,
  "INT_VEC2": 35667,
  "INT_VEC3": 35668,
  "INT_VEC4": 35669,
  "BOOL": 35670,
  "BOOL_VEC2": 35671,
  "BOOL_VEC3": 35672,
  "BOOL_VEC4": 35673,
  "FLOAT_MAT2": 35674,
  "FLOAT_MAT3": 35675,
  "FLOAT_MAT4": 35676,
  "SAMPLER_2D": 35678,
  "SAMPLER_CUBE": 35680,
  "VERTEX_ATTRIB_ARRAY_ENABLED": 34338,
  "VERTEX_ATTRIB_ARRAY_SIZE": 34339,
  "VERTEX_ATTRIB_ARRAY_STRIDE": 34340,
  "VERTEX_ATTRIB_ARRAY_TYPE": 34341,
  "VERTEX_ATTRIB_ARRAY_NORMALIZED": 34922,
  "VERTEX_ATTRIB_ARRAY_POINTER": 34373,
  "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING": 34975,
  "IMPLEMENTATION_COLOR_READ_TYPE": 35738,
  "IMPLEMENTATION_COLOR_READ_FORMAT": 35739,
  "COMPILE_STATUS": 35713,
  "LOW_FLOAT": 36336,
  "MEDIUM_FLOAT": 36337,
  "HIGH_FLOAT": 36338,
  "LOW_INT": 36339,
  "MEDIUM_INT": 36340,
  "HIGH_INT": 36341,
  "FRAMEBUFFER": 36160,
  "RENDERBUFFER": 36161,
  "RGBA4": 32854,
  "RGB5_A1": 32855,
  "RGB565": 36194,
  "DEPTH_COMPONENT16": 33189,
  "STENCIL_INDEX8": 36168,
  "DEPTH_STENCIL": 34041,
  "RENDERBUFFER_WIDTH": 36162,
  "RENDERBUFFER_HEIGHT": 36163,
  "RENDERBUFFER_INTERNAL_FORMAT": 36164,
  "RENDERBUFFER_RED_SIZE": 36176,
  "RENDERBUFFER_GREEN_SIZE": 36177,
  "RENDERBUFFER_BLUE_SIZE": 36178,
  "RENDERBUFFER_ALPHA_SIZE": 36179,
  "RENDERBUFFER_DEPTH_SIZE": 36180,
  "RENDERBUFFER_STENCIL_SIZE": 36181,
  "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE": 36048,
  "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME": 36049,
  "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL": 36050,
  "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE": 36051,
  "COLOR_ATTACHMENT0": 36064,
  "DEPTH_ATTACHMENT": 36096,
  "STENCIL_ATTACHMENT": 36128,
  "DEPTH_STENCIL_ATTACHMENT": 33306,
  "NONE": 0,
  "FRAMEBUFFER_COMPLETE": 36053,
  "FRAMEBUFFER_INCOMPLETE_ATTACHMENT": 36054,
  "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT": 36055,
  "FRAMEBUFFER_INCOMPLETE_DIMENSIONS": 36057,
  "FRAMEBUFFER_UNSUPPORTED": 36061,
  "FRAMEBUFFER_BINDING": 36006,
  "RENDERBUFFER_BINDING": 36007,
  "MAX_RENDERBUFFER_SIZE": 34024,
  "INVALID_FRAMEBUFFER_OPERATION": 1286,
  "UNPACK_FLIP_Y_WEBGL": 37440,
  "UNPACK_PREMULTIPLY_ALPHA_WEBGL": 37441,
  "CONTEXT_LOST_WEBGL": 37442,
  "UNPACK_COLORSPACE_CONVERSION_WEBGL": 37443,
  "BROWSER_DEFAULT_WEBGL": 37444
};
class WebGLActiveInfo {
  constructor({
    type,
    name: name2,
    size
  }) {
    this.className = "WebGLActiveInfo";
    this.type = type;
    this.name = name2;
    this.size = size;
  }
}
function getTransferedObjectUUID(name2, id) {
  return `${name2.toLowerCase()}-${id}`;
}
const name$6 = "WebGLBuffer";
function uuid$6(id) {
  return getTransferedObjectUUID(name$6, id);
}
class WebGLBuffer {
  constructor(id) {
    this.className = name$6;
    this.id = id;
  }
  uuid() {
    return uuid$6(this.id);
  }
}
WebGLBuffer.uuid = uuid$6;
const name$5 = "WebGLFrameBuffer";
function uuid$5(id) {
  return getTransferedObjectUUID(name$5, id);
}
class WebGLFramebuffer {
  constructor(id) {
    this.className = name$5;
    this.id = id;
  }
  uuid() {
    return uuid$5(this.id);
  }
}
WebGLFramebuffer.uuid = uuid$5;
const name$4 = "WebGLRenderBuffer";
function uuid$4(id) {
  return getTransferedObjectUUID(name$4, id);
}
class WebGLRenderbuffer {
  constructor(id) {
    this.className = name$4;
    this.id = id;
  }
  uuid() {
    return uuid$4(this.id);
  }
}
WebGLRenderbuffer.uuid = uuid$4;
const name$3 = "WebGLTexture";
function uuid$3(id) {
  return getTransferedObjectUUID(name$3, id);
}
class WebGLTexture {
  constructor(id, type) {
    this.className = name$3;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid$3(this.id);
  }
}
WebGLTexture.uuid = uuid$3;
const name$2 = "WebGLProgram";
function uuid$2(id) {
  return getTransferedObjectUUID(name$2, id);
}
class WebGLProgram {
  constructor(id) {
    this.className = name$2;
    this.id = id;
  }
  uuid() {
    return uuid$2(this.id);
  }
}
WebGLProgram.uuid = uuid$2;
const name$1 = "WebGLShader";
function uuid$1(id) {
  return getTransferedObjectUUID(name$1, id);
}
class WebGLShader {
  constructor(id, type) {
    this.className = name$1;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid$1(this.id);
  }
}
WebGLShader.uuid = uuid$1;
class WebGLShaderPrecisionFormat {
  constructor({
    rangeMin,
    rangeMax,
    precision
  }) {
    this.className = "WebGLShaderPrecisionFormat";
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.precision = precision;
  }
}
const name = "WebGLUniformLocation";
function uuid(id) {
  return getTransferedObjectUUID(name, id);
}
class WebGLUniformLocation {
  constructor(id, type) {
    this.className = name;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid(this.id);
  }
}
WebGLUniformLocation.uuid = uuid;
let i = 1;
const GLmethod = {};
GLmethod.activeTexture = i++;
GLmethod.attachShader = i++;
GLmethod.bindAttribLocation = i++;
GLmethod.bindBuffer = i++;
GLmethod.bindFramebuffer = i++;
GLmethod.bindRenderbuffer = i++;
GLmethod.bindTexture = i++;
GLmethod.blendColor = i++;
GLmethod.blendEquation = i++;
GLmethod.blendEquationSeparate = i++;
GLmethod.blendFunc = i++;
GLmethod.blendFuncSeparate = i++;
GLmethod.bufferData = i++;
GLmethod.bufferSubData = i++;
GLmethod.checkFramebufferStatus = i++;
GLmethod.clear = i++;
GLmethod.clearColor = i++;
GLmethod.clearDepth = i++;
GLmethod.clearStencil = i++;
GLmethod.colorMask = i++;
GLmethod.compileShader = i++;
GLmethod.compressedTexImage2D = i++;
GLmethod.compressedTexSubImage2D = i++;
GLmethod.copyTexImage2D = i++;
GLmethod.copyTexSubImage2D = i++;
GLmethod.createBuffer = i++;
GLmethod.createFramebuffer = i++;
GLmethod.createProgram = i++;
GLmethod.createRenderbuffer = i++;
GLmethod.createShader = i++;
GLmethod.createTexture = i++;
GLmethod.cullFace = i++;
GLmethod.deleteBuffer = i++;
GLmethod.deleteFramebuffer = i++;
GLmethod.deleteProgram = i++;
GLmethod.deleteRenderbuffer = i++;
GLmethod.deleteShader = i++;
GLmethod.deleteTexture = i++;
GLmethod.depthFunc = i++;
GLmethod.depthMask = i++;
GLmethod.depthRange = i++;
GLmethod.detachShader = i++;
GLmethod.disable = i++;
GLmethod.disableVertexAttribArray = i++;
GLmethod.drawArrays = i++;
GLmethod.drawArraysInstancedANGLE = i++;
GLmethod.drawElements = i++;
GLmethod.drawElementsInstancedANGLE = i++;
GLmethod.enable = i++;
GLmethod.enableVertexAttribArray = i++;
GLmethod.flush = i++;
GLmethod.framebufferRenderbuffer = i++;
GLmethod.framebufferTexture2D = i++;
GLmethod.frontFace = i++;
GLmethod.generateMipmap = i++;
GLmethod.getActiveAttrib = i++;
GLmethod.getActiveUniform = i++;
GLmethod.getAttachedShaders = i++;
GLmethod.getAttribLocation = i++;
GLmethod.getBufferParameter = i++;
GLmethod.getContextAttributes = i++;
GLmethod.getError = i++;
GLmethod.getExtension = i++;
GLmethod.getFramebufferAttachmentParameter = i++;
GLmethod.getParameter = i++;
GLmethod.getProgramInfoLog = i++;
GLmethod.getProgramParameter = i++;
GLmethod.getRenderbufferParameter = i++;
GLmethod.getShaderInfoLog = i++;
GLmethod.getShaderParameter = i++;
GLmethod.getShaderPrecisionFormat = i++;
GLmethod.getShaderSource = i++;
GLmethod.getSupportedExtensions = i++;
GLmethod.getTexParameter = i++;
GLmethod.getUniform = i++;
GLmethod.getUniformLocation = i++;
GLmethod.getVertexAttrib = i++;
GLmethod.getVertexAttribOffset = i++;
GLmethod.isBuffer = i++;
GLmethod.isContextLost = i++;
GLmethod.isEnabled = i++;
GLmethod.isFramebuffer = i++;
GLmethod.isProgram = i++;
GLmethod.isRenderbuffer = i++;
GLmethod.isShader = i++;
GLmethod.isTexture = i++;
GLmethod.lineWidth = i++;
GLmethod.linkProgram = i++;
GLmethod.pixelStorei = i++;
GLmethod.polygonOffset = i++;
GLmethod.readPixels = i++;
GLmethod.renderbufferStorage = i++;
GLmethod.sampleCoverage = i++;
GLmethod.scissor = i++;
GLmethod.shaderSource = i++;
GLmethod.stencilFunc = i++;
GLmethod.stencilFuncSeparate = i++;
GLmethod.stencilMask = i++;
GLmethod.stencilMaskSeparate = i++;
GLmethod.stencilOp = i++;
GLmethod.stencilOpSeparate = i++;
GLmethod.texImage2D = i++;
GLmethod.texParameterf = i++;
GLmethod.texParameteri = i++;
GLmethod.texSubImage2D = i++;
GLmethod.uniform1f = i++;
GLmethod.uniform1fv = i++;
GLmethod.uniform1i = i++;
GLmethod.uniform1iv = i++;
GLmethod.uniform2f = i++;
GLmethod.uniform2fv = i++;
GLmethod.uniform2i = i++;
GLmethod.uniform2iv = i++;
GLmethod.uniform3f = i++;
GLmethod.uniform3fv = i++;
GLmethod.uniform3i = i++;
GLmethod.uniform3iv = i++;
GLmethod.uniform4f = i++;
GLmethod.uniform4fv = i++;
GLmethod.uniform4i = i++;
GLmethod.uniform4iv = i++;
GLmethod.uniformMatrix2fv = i++;
GLmethod.uniformMatrix3fv = i++;
GLmethod.uniformMatrix4fv = i++;
GLmethod.useProgram = i++;
GLmethod.validateProgram = i++;
GLmethod.vertexAttrib1f = i++;
GLmethod.vertexAttrib2f = i++;
GLmethod.vertexAttrib3f = i++;
GLmethod.vertexAttrib4f = i++;
GLmethod.vertexAttrib1fv = i++;
GLmethod.vertexAttrib2fv = i++;
GLmethod.vertexAttrib3fv = i++;
GLmethod.vertexAttrib4fv = i++;
GLmethod.vertexAttribPointer = i++;
GLmethod.viewport = i++;
const processArray = (array, checkArrayType = false) => {
  function joinArray2(arr, sep) {
    let res = "";
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (i2 !== 0) {
        res += sep;
      }
      res += arr[i2];
    }
    return res;
  }
  let type = "Float32Array";
  if (checkArrayType) {
    if (array instanceof Uint8Array) {
      type = "Uint8Array";
    } else if (array instanceof Uint16Array) {
      type = "Uint16Array";
    } else if (array instanceof Uint32Array) {
      type = "Uint32Array";
    } else if (array instanceof Float32Array) {
      type = "Float32Array";
    } else {
      throw new Error("Check array type failed. Array type is " + typeof array);
    }
  }
  const ArrayTypes = {
    Uint8Array: 1,
    Uint16Array: 2,
    Uint32Array: 4,
    Float32Array: 14
  };
  return ArrayTypes[type] + "," + btoa(joinArray2(array, ","));
};
class WebGLRenderingContext {
  constructor(canvas, type, attrs) {
    // static GBridge = null;
    this.className = "WebGLRenderingContext";
    this.activeTexture = function(textureUnit) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.activeTexture + "," + textureUnit,
        true
      );
    };
    this.attachShader = function(progarm, shader) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.attachShader + "," + progarm.id + "," + shader.id,
        true
      );
    };
    this.bindAttribLocation = function(program, index, name2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bindAttribLocation + "," + program.id + "," + index + "," + name2,
        true
      );
    };
    this.bindBuffer = function(target2, buffer) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bindBuffer + "," + target2 + "," + (buffer ? buffer.id : 0),
        true
      );
    };
    this.bindFramebuffer = function(target2, framebuffer) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bindFramebuffer + "," + target2 + "," + (framebuffer ? framebuffer.id : 0),
        true
      );
    };
    this.bindRenderbuffer = function(target2, renderBuffer) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bindRenderbuffer + "," + target2 + "," + (renderBuffer ? renderBuffer.id : 0),
        true
      );
    };
    this.bindTexture = function(target2, texture) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bindTexture + "," + target2 + "," + (texture ? texture.id : 0),
        true
      );
    };
    this.blendColor = function(r, g, b2, a) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.blendColor + "," + target + "," + r + "," + g + "," + b2 + "," + a,
        true
      );
    };
    this.blendEquation = function(mode) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.blendEquation + "," + mode,
        true
      );
    };
    this.blendEquationSeparate = function(modeRGB, modeAlpha) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.blendEquationSeparate + "," + modeRGB + "," + modeAlpha,
        true
      );
    };
    this.blendFunc = function(sfactor, dfactor) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.blendFunc + "," + sfactor + "," + dfactor,
        true
      );
    };
    this.blendFuncSeparate = function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.blendFuncSeparate + "," + srcRGB + "," + dstRGB + "," + srcAlpha + "," + dstAlpha,
        true
      );
    };
    this.bufferData = function(target2, data, usage) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bufferData + "," + target2 + "," + processArray(data, true) + "," + usage,
        true
      );
    };
    this.bufferSubData = function(target2, offset, data) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.bufferSubData + "," + target2 + "," + offset + "," + processArray(data, true),
        true
      );
    };
    this.checkFramebufferStatus = function(target2) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.checkFramebufferStatus + "," + target2
      );
      return Number(result);
    };
    this.clear = function(mask) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.clear + "," + mask
      );
      this._canvas._needRender = true;
    };
    this.clearColor = function(r, g, b2, a) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.clearColor + "," + r + "," + g + "," + b2,
        true
      );
    };
    this.clearDepth = function(depth) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.clearDepth + "," + depth,
        true
      );
    };
    this.clearStencil = function(s) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.clearStencil + "," + s
      );
    };
    this.colorMask = function(r, g, b2, a) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.colorMask + "," + r + "," + g + "," + b2 + "," + a
      );
    };
    this.compileShader = function(shader) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.compileShader + "," + shader.id,
        true
      );
    };
    this.compressedTexImage2D = function(target2, level, internalformat, width, height, border, pixels) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.compressedTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + processArray(pixels),
        true
      );
    };
    this.compressedTexSubImage2D = function(target2, level, xoffset, yoffset, width, height, format, pixels) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.compressedTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + width + "," + height + "," + format + "," + processArray(pixels),
        true
      );
    };
    this.copyTexImage2D = function(target2, level, internalformat, x, y, width, height, border) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.copyTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + x + "," + y + "," + width + "," + height + "," + border,
        true
      );
    };
    this.copyTexSubImage2D = function(target2, level, xoffset, yoffset, x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.copyTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + x + "," + y + "," + width + "," + height
      );
    };
    this.createBuffer = function() {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createBuffer + ""
      );
      const buffer = new WebGLBuffer(result);
      this._map.set(buffer.uuid(), buffer);
      return buffer;
    };
    this.createFramebuffer = function() {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createFramebuffer + ""
      );
      const framebuffer = new WebGLFramebuffer(result);
      this._map.set(framebuffer.uuid(), framebuffer);
      return framebuffer;
    };
    this.createProgram = function() {
      const id = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createProgram + ""
      );
      const program = new WebGLProgram(id);
      this._map.set(program.uuid(), program);
      return program;
    };
    this.createRenderbuffer = function() {
      const id = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createRenderbuffer + ""
      );
      const renderBuffer = new WebGLRenderbuffer(id);
      this._map.set(renderBuffer.uuid(), renderBuffer);
      return renderBuffer;
    };
    this.createShader = function(type) {
      const id = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createShader + "," + type
      );
      const shader = new WebGLShader(id, type);
      this._map.set(shader.uuid(), shader);
      return shader;
    };
    this.createTexture = function() {
      const id = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.createTexture + ""
      );
      const texture = new WebGLTexture(id);
      this._map.set(texture.uuid(), texture);
      return texture;
    };
    this.cullFace = function(mode) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.cullFace + "," + mode,
        true
      );
    };
    this.deleteBuffer = function(buffer) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteBuffer + "," + buffer.id,
        true
      );
    };
    this.deleteFramebuffer = function(framebuffer) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteFramebuffer + "," + framebuffer.id,
        true
      );
    };
    this.deleteProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteProgram + "," + program.id,
        true
      );
    };
    this.deleteRenderbuffer = function(renderbuffer2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteRenderbuffer + "," + renderbuffer2.id,
        true
      );
    };
    this.deleteShader = function(shader) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteShader + "," + shader.id,
        true
      );
    };
    this.deleteTexture = function(texture) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.deleteTexture + "," + texture.id,
        true
      );
    };
    this.depthFunc = function(func) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.depthFunc + "," + func
      );
    };
    this.depthMask = function(flag) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.depthMask + "," + Number(flag),
        true
      );
    };
    this.depthRange = function(zNear, zFar) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.depthRange + "," + zNear + "," + zFar,
        true
      );
    };
    this.detachShader = function(program, shader) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.detachShader + "," + program.id + "," + shader.id,
        true
      );
    };
    this.disable = function(cap) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.disable + "," + cap,
        true
      );
    };
    this.disableVertexAttribArray = function(index) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.disableVertexAttribArray + "," + index,
        true
      );
    };
    this.drawArrays = function(mode, first, count) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.drawArrays + "," + mode + "," + first + "," + count
      );
      this._canvas._needRender = true;
    };
    this.drawElements = function(mode, count, type, offset) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.drawElements + "," + mode + "," + count + "," + type + "," + offset + ";"
      );
      this._canvas._needRender = true;
    };
    this.enable = function(cap) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.enable + "," + cap,
        true
      );
    };
    this.enableVertexAttribArray = function(index) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.enableVertexAttribArray + "," + index,
        true
      );
    };
    this.flush = function() {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.flush + ""
      );
    };
    this.framebufferRenderbuffer = function(target2, attachment, textarget, texture, level) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.framebufferRenderbuffer + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level,
        true
      );
    };
    this.framebufferTexture2D = function(target2, attachment, textarget, texture, level) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.framebufferTexture2D + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level,
        true
      );
    };
    this.frontFace = function(mode) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.frontFace + "," + mode,
        true
      );
    };
    this.generateMipmap = function(target2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.generateMipmap + "," + target2,
        true
      );
    };
    this.getActiveAttrib = function(progarm, index) {
      const resultString = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getActiveAttrib + "," + progarm.id + "," + index
      );
      const [type, size, name2] = resultString.split(",");
      return new WebGLActiveInfo({
        type: Number(type),
        size: Number(size),
        name: name2
      });
    };
    this.getActiveUniform = function(progarm, index) {
      const resultString = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getActiveUniform + "," + progarm.id + "," + index
      );
      const [type, size, name2] = resultString.split(",");
      return new WebGLActiveInfo({
        type: Number(type),
        size: Number(size),
        name: name2
      });
    };
    this.getAttachedShaders = function(progarm) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getAttachedShaders + "," + progarm.id
      );
      const [type, ...ids] = result;
      return ids.map((id) => this._map.get(WebGLShader.uuid(id)));
    };
    this.getAttribLocation = function(progarm, name2) {
      return WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getAttribLocation + "," + progarm.id + "," + name2
      );
    };
    this.getBufferParameter = function(target2, pname) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getBufferParameter + "," + target2 + "," + pname
      );
      const [type, res] = getBufferParameter;
      return res;
    };
    this.getError = function() {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getError + ""
      );
      return result;
    };
    this.getExtension = function(name2) {
      return null;
    };
    this.getFramebufferAttachmentParameter = function(target2, attachment, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getFramebufferAttachmentParameter + "," + target2 + "," + attachment + "," + pname
      );
      switch (pname) {
        case GLenum.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:
          return this._map.get(WebGLRenderbuffer.uuid(result)) || this._map.get(WebGLTexture.uuid(result)) || null;
        default:
          return result;
      }
    };
    this.getParameter = function(pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getParameter + "," + pname
      );
      switch (pname) {
        case GLenum.VERSION:
          return this._version;
        case GLenum.ARRAY_BUFFER_BINDING:
        case GLenum.ELEMENT_ARRAY_BUFFER_BINDING:
          return this._map.get(WebGLBuffer.uuid(result)) || null;
        case GLenum.CURRENT_PROGRAM:
          return this._map.get(WebGLProgram.uuid(result)) || null;
        case GLenum.FRAMEBUFFER_BINDING:
          return this._map.get(WebGLFramebuffer.uuid(result)) || null;
        case GLenum.RENDERBUFFER_BINDING:
          return this._map.get(WebGLRenderbuffer.uuid(result)) || null;
        case GLenum.TEXTURE_BINDING_2D:
        case GLenum.TEXTURE_BINDING_CUBE_MAP:
          return this._map.get(WebGLTexture.uuid(result)) || null;
        case GLenum.ALIASED_LINE_WIDTH_RANGE:
        case GLenum.ALIASED_POINT_SIZE_RANGE:
        case GLenum.BLEND_COLOR:
        case GLenum.COLOR_CLEAR_VALUE:
        case GLenum.DEPTH_RANGE:
        case GLenum.MAX_VIEWPORT_DIMS:
        case GLenum.SCISSOR_BOX:
        case GLenum.VIEWPORT:
        case GLenum.COMPRESSED_TEXTURE_FORMATS:
        default:
          const [type, ...res] = result.split(",");
          if (res.length === 1) {
            return Number(res[0]);
          } else {
            return res.map(Number);
          }
      }
    };
    this.getProgramInfoLog = function(progarm) {
      return WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getProgramInfoLog + "," + progarm.id
      );
    };
    this.getProgramParameter = function(program, pname) {
      const res = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getProgramParameter + "," + program.id + "," + pname
      );
      const [type, result] = res.split(",").map((i2) => parseInt(i2));
      if (type === 1) {
        return Boolean(result);
      } else if (type === 2) {
        return result;
      } else {
        throw new Error("Unrecongized program paramater " + res + ", type: " + typeof res);
      }
    };
    this.getRenderbufferParameter = function(target2, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getRenderbufferParameter + "," + target2 + "," + pname
      );
      return result;
    };
    this.getShaderInfoLog = function(shader) {
      return WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getShaderInfoLog + "," + shader.id
      );
    };
    this.getShaderParameter = function(shader, pname) {
      return WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getShaderParameter + "," + shader.id + "," + pname
      );
    };
    this.getShaderPrecisionFormat = function(shaderType, precisionType) {
      const [rangeMin, rangeMax, precision] = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getShaderPrecisionFormat + "," + shaderType + "," + precisionType
      );
      const shaderPrecisionFormat = new WebGLShaderPrecisionFormat({
        rangeMin: Number(rangeMin),
        rangeMax: Number(rangeMax),
        precision: Number(precision)
      });
      return shaderPrecisionFormat;
    };
    this.getShaderSource = function(shader) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getShaderSource + "," + shader.id
      );
      return result;
    };
    this.getSupportedExtensions = function() {
      return Object.keys({});
    };
    this.getTexParameter = function(target2, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getTexParameter + "," + target2 + "," + pname
      );
      return result;
    };
    this.getUniformLocation = function(program, name2) {
      const id = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getUniformLocation + "," + program.id + "," + name2
      );
      if (id === -1) {
        return null;
      } else {
        return new WebGLUniformLocation(Number(id));
      }
    };
    this.getVertexAttrib = function(index, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getVertexAttrib + "," + index + "," + pname
      );
      switch (pname) {
        case GLenum.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
          return this._map.get(WebGLBuffer.uuid(result)) || null;
        case GLenum.CURRENT_VERTEX_ATTRIB:
        default:
          return result;
      }
    };
    this.getVertexAttribOffset = function(index, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.getVertexAttribOffset + "," + index + "," + pname
      );
      return Number(result);
    };
    this.isBuffer = function(buffer) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isBuffer + "," + buffer.id
      );
      return Boolean(result);
    };
    this.isContextLost = function() {
      return false;
    };
    this.isEnabled = function(cap) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isEnabled + "," + cap
      );
      return Boolean(result);
    };
    this.isFramebuffer = function(framebuffer) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isFramebuffer + "," + framebuffer.id
      );
      return Boolean(result);
    };
    this.isProgram = function(program) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isProgram + "," + program.id
      );
      return Boolean(result);
    };
    this.isRenderbuffer = function(renderBuffer) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isRenderbuffer + "," + renderbuffer.id
      );
      return Boolean(result);
    };
    this.isShader = function(shader) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isShader + "," + shader.id
      );
      return Boolean(result);
    };
    this.isTexture = function(texture) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.isTexture + "," + texture.id
      );
      return Boolean(result);
    };
    this.lineWidth = function(width) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.lineWidth + "," + width,
        true
      );
    };
    this.linkProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.linkProgram + "," + program.id,
        true
      );
    };
    this.pixelStorei = function(pname, param) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.pixelStorei + "," + pname + "," + Number(param)
      );
    };
    this.polygonOffset = function(factor, units) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.polygonOffset + "," + factor + "," + units
      );
    };
    this.readPixels = function(x, y, width, height, format, type, pixels) {
      const result = WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.readPixels + "," + x + "," + y + "," + width + "," + height + "," + format + "," + type
      );
      return result;
    };
    this.renderbufferStorage = function(target2, internalFormat, width, height) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.renderbufferStorage + "," + target2 + "," + internalFormat + "," + width + "," + height,
        true
      );
    };
    this.sampleCoverage = function(value, invert) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.sampleCoverage + "," + value + "," + Number(invert),
        true
      );
    };
    this.scissor = function(x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.scissor + "," + x + "," + y + "," + width + "," + height,
        true
      );
    };
    this.shaderSource = function(shader, source) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.shaderSource + "," + shader.id + "," + source
      );
    };
    this.stencilFunc = function(func, ref, mask) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilFunc + "," + func + "," + ref + "," + mask,
        true
      );
    };
    this.stencilFuncSeparate = function(face, func, ref, mask) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilFuncSeparate + "," + face + "," + func + "," + ref + "," + mask,
        true
      );
    };
    this.stencilMask = function(mask) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilMask + "," + mask,
        true
      );
    };
    this.stencilMaskSeparate = function(face, mask) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilMaskSeparate + "," + face + "," + mask,
        true
      );
    };
    this.stencilOp = function(fail, zfail, zpass) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilOp + "," + fail + "," + zfail + "," + zpass
      );
    };
    this.stencilOpSeparate = function(face, fail, zfail, zpass) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.stencilOp + "," + face + "," + fail + "," + zfail + "," + zpass,
        true
      );
    };
    this.texImage2D = function(...args) {
      WebGLRenderingContext.GBridge.texImage2D(this._canvas.id, ...args);
    };
    this.texParameterf = function(target2, pname, param) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.texParameterf + "," + target2 + "," + pname + "," + param,
        true
      );
    };
    this.texParameteri = function(target2, pname, param) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.texParameteri + "," + target2 + "," + pname + "," + param
      );
    };
    this.texSubImage2D = function(...args) {
      WebGLRenderingContext.GBridge.texSubImage2D(this._canvas.id, ...args);
    };
    this.uniform1f = function(location, v0) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform1f + "," + location.id + "," + v0
      );
    };
    this.uniform1fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform1fv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform1i = function(location, v0) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform1i + "," + location.id + "," + v0
        // true
      );
    };
    this.uniform1iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform1iv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform2f = function(location, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform2f + "," + location.id + "," + v0 + "," + v1,
        true
      );
    };
    this.uniform2fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform2fv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform2i = function(location, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform2i + "," + location.id + "," + v0 + "," + v1,
        true
      );
    };
    this.uniform2iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform2iv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform3f = function(location, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform3f + "," + location.id + "," + v0 + "," + v1 + "," + v2,
        true
      );
    };
    this.uniform3fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform3fv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform3i = function(location, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform3i + "," + location.id + "," + v0 + "," + v1 + "," + v2,
        true
      );
    };
    this.uniform3iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform3iv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform4f = function(location, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform4f + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3,
        true
      );
    };
    this.uniform4fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform4fv + "," + location.id + "," + processArray(value),
        true
      );
    };
    this.uniform4i = function(location, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform4i + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3,
        true
      );
    };
    this.uniform4iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniform4iv + "," + location.id + "," + processArray(value, true),
        true
      );
    };
    this.uniformMatrix2fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniformMatrix2fv + "," + location.id + "," + Number(transpose) + "," + processArray(value),
        true
      );
    };
    this.uniformMatrix3fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniformMatrix3fv + "," + location.id + "," + Number(transpose) + "," + processArray(value),
        true
      );
    };
    this.uniformMatrix4fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.uniformMatrix4fv + "," + location.id + "," + Number(transpose) + "," + processArray(value),
        true
      );
    };
    this.useProgram = function(progarm) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.useProgram + "," + progarm.id,
        true
      );
    };
    this.validateProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.validateProgram + "," + program.id,
        true
      );
    };
    this.vertexAttrib1f = function(index, v0) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib1f + "," + index + "," + v0,
        true
      );
    };
    this.vertexAttrib2f = function(index, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib2f + "," + index + "," + v0 + "," + v1,
        true
      );
    };
    this.vertexAttrib3f = function(index, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib3f + "," + index + "," + v0 + "," + v1 + "," + v2,
        true
      );
    };
    this.vertexAttrib4f = function(index, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib4f + "," + index + "," + v0 + "," + v1 + "," + v2 + "," + v3,
        true
      );
    };
    this.vertexAttrib1fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib1fv + "," + index + "," + processArray(value),
        true
      );
    };
    this.vertexAttrib2fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib2fv + "," + index + "," + processArray(value),
        true
      );
    };
    this.vertexAttrib3fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib3fv + "," + index + "," + processArray(value),
        true
      );
    };
    this.vertexAttrib4fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttrib4fv + "," + index + "," + processArray(value),
        true
      );
    };
    this.vertexAttribPointer = function(index, size, type, normalized, stride, offset) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.vertexAttribPointer + "," + index + "," + size + "," + type + "," + Number(normalized) + "," + stride + "," + offset,
        true
      );
    };
    this.viewport = function(x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(
        this._canvas.id,
        GLmethod.viewport + "," + x + "," + y + "," + width + "," + height,
        true
      );
    };
    this._canvas = canvas;
    this._type = type;
    this._version = "WebGL 1.0";
    this._attrs = attrs;
    this._map = /* @__PURE__ */ new Map();
    Object.keys(GLenum).forEach((name2) => Object.defineProperty(this, name2, {
      value: GLenum[name2]
    }));
  }
  get canvas() {
    return this._canvas;
  }
}
class GCanvas {
  constructor(id, { disableAutoSwap }) {
    // static GBridge = null;
    this.id = null;
    this._needRender = true;
    this.id = id;
    this._disableAutoSwap = disableAutoSwap;
    if (disableAutoSwap) {
      this._swapBuffers = () => {
        GCanvas.GBridge.render(this.id);
      };
    }
  }
  getContext(type) {
    let context = null;
    if (type.match(/webgl/i)) {
      context = new WebGLRenderingContext(this);
      context.componentId = this.id;
      if (!this._disableAutoSwap) {
        const render = () => {
          if (this._needRender) {
            GCanvas.GBridge.render(this.id);
            this._needRender = false;
          }
        };
        setInterval(render, 16);
      }
      GCanvas.GBridge.callSetContextType(this.id, 1);
    } else if (type.match(/2d/i)) {
      context = new CanvasRenderingContext2D(this);
      context.componentId = this.id;
      GCanvas.GBridge.callSetContextType(this.id, 0);
    } else {
      throw new Error("not supported context " + type);
    }
    return context;
  }
  reset() {
    GCanvas.GBridge.callReset(this.id);
  }
}
const isWeex = typeof WXEnvironment !== "undefined";
const isWeexIOS = isWeex && /ios/i.test(WXEnvironment.platform);
const isWeexAndroid = isWeex && !isWeexIOS;
const GCanvasModule = typeof weex !== "undefined" && weex.requireModule ? weex.requireModule("gcanvas") : typeof __weex_require__ !== "undefined" ? __weex_require__("@weex-module/gcanvas") : {};
let isDebugging = false;
let isComboDisabled = false;
const logCommand = function() {
  const methodQuery = [];
  Object.keys(GLmethod).forEach((key) => {
    methodQuery[GLmethod[key]] = key;
  });
  const queryMethod = (id) => {
    return methodQuery[parseInt(id)] || "NotFoundMethod";
  };
  const logCommand2 = (id, cmds) => {
    const mId = cmds.split(",")[0];
    const mName = queryMethod(mId);
    formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:26", `=== callNative - componentId:${id}; method: ${mName}; cmds: ${cmds}`);
  };
  return logCommand2;
}();
function joinArray(arr, sep) {
  let res = "";
  for (let i2 = 0; i2 < arr.length; i2++) {
    if (i2 !== 0) {
      res += sep;
    }
    res += arr[i2];
  }
  return res;
}
const commandsCache = {};
const GBridge = {
  callEnable: (ref, configArray) => {
    commandsCache[ref] = [];
    return GCanvasModule.enable({
      componentId: ref,
      config: configArray
    });
  },
  callEnableDebug: () => {
    isDebugging = true;
  },
  callEnableDisableCombo: () => {
    isComboDisabled = true;
  },
  callSetContextType: function(componentId2, context_type) {
    GCanvasModule.setContextType(context_type, componentId2);
  },
  callReset: function(id) {
    GCanvasModule.resetComponent && canvasModule.resetComponent(componentId);
  },
  render: isWeexIOS ? function(componentId2) {
    return GCanvasModule.extendCallNative({
      contextId: componentId2,
      type: 1610612737
    });
  } : function(componentId2) {
    return callGCanvasLinkNative(componentId2, 1610612737, "render");
  },
  render2d: isWeexIOS ? function(componentId2, commands, callback) {
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:84", ">>> >>> render2d ===");
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:85", ">>> commands: " + commands);
    }
    GCanvasModule.render([commands, callback ? true : false], componentId2, callback);
  } : function(componentId2, commands, callback) {
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:93", ">>> >>> render2d ===");
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:94", ">>> commands: " + commands);
    }
    callGCanvasLinkNative(componentId2, 536870913, commands);
    if (callback) {
      callback();
    }
  },
  callExtendCallNative: isWeexIOS ? function(componentId2, cmdArgs) {
    throw "should not be here anymore " + cmdArgs;
  } : function(componentId2, cmdArgs) {
    throw "should not be here anymore " + cmdArgs;
  },
  flushNative: isWeexIOS ? function(componentId2) {
    const cmdArgs = joinArray(commandsCache[componentId2], ";");
    commandsCache[componentId2] = [];
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:120", ">>> >>> flush native ===");
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:121", ">>> commands: " + cmdArgs);
    }
    const result = GCanvasModule.extendCallNative({
      "contextId": componentId2,
      "type": 1610612736,
      "args": cmdArgs
    });
    const res = result && result.result;
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:133", ">>> result: " + res);
    }
    return res;
  } : function(componentId2) {
    const cmdArgs = joinArray(commandsCache[componentId2], ";");
    commandsCache[componentId2] = [];
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:144", ">>> >>> flush native ===");
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:145", ">>> commands: " + cmdArgs);
    }
    const result = callGCanvasLinkNative(componentId2, 1610612736, cmdArgs);
    if (isDebugging) {
      formatAppLog("log", "at uni_modules/Sansnn-uQRCode/js_sdk/gcanvas/bridge/bridge-weex.js:151", ">>> result: " + result);
    }
    return result;
  },
  callNative: function(componentId2, cmdArgs, cache) {
    if (isDebugging) {
      logCommand(componentId2, cmdArgs);
    }
    commandsCache[componentId2].push(cmdArgs);
    if (!cache || isComboDisabled) {
      return GBridge.flushNative(componentId2);
    } else {
      return void 0;
    }
  },
  texImage2D(componentId2, ...args) {
    if (isWeexIOS) {
      if (args.length === 6) {
        const [target2, level, internalformat, format, type, image2] = args;
        GBridge.callNative(
          componentId2,
          GLmethod.texImage2D + ",6," + target2 + "," + level + "," + internalformat + "," + format + "," + type + "," + image2.src
        );
      } else if (args.length === 9) {
        const [target2, level, internalformat, width, height, border, format, type, image2] = args;
        GBridge.callNative(
          componentId2,
          GLmethod.texImage2D + ",9," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + +format + "," + type + "," + (image2 ? image2.src : 0)
        );
      }
    } else if (isWeexAndroid) {
      if (args.length === 6) {
        const [target2, level, internalformat, format, type, image2] = args;
        GCanvasModule.texImage2D(componentId2, target2, level, internalformat, format, type, image2.src);
      } else if (args.length === 9) {
        const [target2, level, internalformat, width, height, border, format, type, image2] = args;
        GCanvasModule.texImage2D(componentId2, target2, level, internalformat, width, height, border, format, type, image2 ? image2.src : 0);
      }
    }
  },
  texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2) {
    if (isWeexIOS) {
      if (arguments.length === 8) {
        GBridge.callNative(
          componentId2,
          GLmethod.texSubImage2D + ",6," + target2 + "," + level + "," + xoffset + "," + yoffset,
          +"," + format + "," + type + "," + image2.src
        );
      }
    } else if (isWeexAndroid) {
      GCanvasModule.texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2.src);
    }
  },
  bindImageTexture(componentId2, src, imageId) {
    GCanvasModule.bindImageTexture([src, imageId], componentId2);
  },
  perloadImage([url, id], callback) {
    GCanvasModule.preLoadImage([url, id], function(image2) {
      image2.url = url;
      image2.id = id;
      callback(image2);
    });
  },
  measureText(text, fontStyle, componentId2) {
    return GCanvasModule.measureText([text, fontStyle], componentId2);
  },
  getImageData(componentId2, x, y, w, h, callback) {
    GCanvasModule.getImageData([x, y, w, h], componentId2, callback);
  },
  putImageData(componentId2, data, x, y, w, h, callback) {
    GCanvasModule.putImageData([x, y, w, h, data], componentId2, callback);
  },
  toTempFilePath(componentId2, x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
    GCanvasModule.toTempFilePath([x, y, width, height, destWidth, destHeight, fileType, quality], componentId2, callback);
  }
};
let WeexBridge = GBridge;
function enable(el, { bridge, debug, disableAutoSwap, disableComboCommands } = {}) {
  const GBridge2 = GImage.GBridge = GCanvas.GBridge = WebGLRenderingContext.GBridge = CanvasRenderingContext2D.GBridge = bridge;
  GBridge2.callEnable(el.ref, [
    0,
    // renderMode: 0--RENDERMODE_WHEN_DIRTY, 1--RENDERMODE_CONTINUOUSLY
    -1,
    // hybridLayerType:  0--LAYER_TYPE_NONE 1--LAYER_TYPE_SOFTWARE 2--LAYER_TYPE_HARDWARE
    false,
    // supportScroll
    false,
    // newCanvasMode
    1,
    // compatible
    "white",
    // clearColor
    false
    // sameLevel: newCanvasMode = true && true => GCanvasView and Webview is same level
  ]);
  if (debug === true) {
    GBridge2.callEnableDebug();
  }
  if (disableComboCommands) {
    GBridge2.callEnableDisableCombo();
  }
  var canvas = new GCanvas(el.ref, { disableAutoSwap });
  canvas.width = el.style.width;
  canvas.height = el.style.height;
  return canvas;
}
function Queue() {
  let waitingQueue = this.waitingQueue = [];
  let isRunning = this.isRunning = false;
  function execute(task, resolve, reject) {
    task().then((data) => {
      resolve(data);
    }).catch((e2) => {
      reject(e2);
    }).finally(() => {
      if (waitingQueue.length) {
        const next = waitingQueue.shift();
        execute(next.task, next.resolve, next.reject);
      } else {
        isRunning = false;
      }
    });
  }
  this.exec = function(task) {
    return new Promise((resolve, reject) => {
      if (isRunning) {
        waitingQueue.push({
          task,
          resolve,
          reject
        });
      } else {
        isRunning = true;
        execute(task, resolve, reject);
      }
    });
  };
}
const queueDraw = new Queue();
const queueLoadImage = new Queue();
const cacheImageList = [];
const _style_0$1 = { "uqrcode": { "": { "position": "relative" } }, "uqrcode-hide": { "": { "position": "fixed", "left": "7500rpx" } }, "uqrcode-canvas": { "": { "transformOrigin": "top left" } }, "uqrcode-makeing": { "": { "position": "absolute", "top": 0, "right": 0, "bottom": 0, "left": 0, "zIndex": 10, "justifyContent": "center", "alignItems": "center" } }, "uqrcode-error": { "": { "position": "absolute", "top": 0, "right": 0, "bottom": 0, "left": 0, "justifyContent": "center", "alignItems": "center" } }, "uqrcode-error-message": { "": { "fontSize": 12, "color": "#939291" } } };
weex.requireModule("modal");
let instance = null;
const _sfc_main$1 = {
  name: "uqrcode",
  props: {
    /**
     * canvas组件id
     */
    canvasId: {
      type: String,
      required: true
      // canvasId在微信小程序初始值不能为空，created中赋值也不行，必须给一个值，否则挂载组件后无法绘制。不考虑用随机id，uuid
    },
    /**
     * 二维码内容
     */
    value: {
      type: [String, Number]
    },
    /**
     * 选项
     */
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 二维码大小
     */
    size: {
      type: [String, Number],
      default: 200
    },
    /**
     * 二维码尺寸单位
     */
    sizeUnit: {
      type: String,
      default: "px"
    },
    /**
     * 导出的文件类型
     */
    fileType: {
      type: String,
      default: "png"
    },
    /**
     * 是否初始化组件后就开始生成
     */
    start: {
      type: Boolean,
      default: true
    },
    /**
     * 是否数据发生改变自动重绘
     */
    auto: {
      type: Boolean,
      default: true
    },
    /**
     * 隐藏组件
     */
    hide: {
      type: Boolean,
      default: false
    },
    /**
     * canvas 类型，微信小程序默认使用2d，非2d微信官方已放弃维护，问题比较多
     * 注意：微信小程序type2d手机上正常，PC上微信内打开小程序toDataURL报错，看后期微信官方团队会不会做兼容，不兼容的话只能在自行判断在PC使用非2d，或者直接提示用户请在手机上操作，微信团队的海报中心小程序就是这么做的
     */
    type: {
      type: String,
      default: () => {
        return "normal";
      }
    },
    /**
     * 队列绘制，主要针对NVue端
     */
    queue: {
      type: Boolean,
      default: false
    },
    /**
     * 是否队列加载图片，可减少canvas发起的网络资源请求，节省服务器资源
     */
    isQueueLoadImage: {
      type: Boolean,
      default: false
    },
    /**
     * loading态
     */
    loading: {
      type: Boolean,
      default: void 0
    },
    /**
     * H5保存即自动下载（在支持的环境下），默认false为仅弹层提示用户需要长按图片保存，不会自动下载
     */
    h5SaveIsDownload: {
      type: Boolean,
      default: false
    },
    /**
     * H5下载名称
     */
    h5DownloadName: {
      type: String,
      default: "uQRCode"
    }
  },
  data() {
    return {
      canvas: void 0,
      canvasType: void 0,
      canvasContext: void 0,
      makeDelegate: void 0,
      drawDelegate: void 0,
      toTempFilePathDelegate: void 0,
      makeExecuted: false,
      makeing: false,
      drawing: false,
      isError: false,
      error: void 0,
      isH5Save: false,
      tempFilePath: "",
      templateOptions: {
        size: 0,
        width: 0,
        // 组件宽度
        height: 0,
        canvasWidth: 0,
        // canvas宽度
        canvasHeight: 0,
        canvasTransform: "",
        canvasDisplay: false
      },
      uqrcodeOptions: {
        data: ""
      },
      plugins: [],
      makeingPattern: [
        [
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true]
        ],
        [
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, false, false, false],
          [true, true, true, true, true, true, false, true, true, true],
          [true, true, true, true, true, true, false, true, true, true],
          [true, true, true, true, true, true, false, true, true, true]
        ],
        [
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, true, true, true, true, false, false, false],
          [true, true, true, true, true, true, true, false, false, false],
          [true, true, true, true, true, true, true, false, false, false],
          [true, true, true, false, false, false, false, true, true, true],
          [true, true, true, false, false, false, false, true, true, true]
        ],
        [
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, false, false, false, false, false, false, false],
          [true, true, true, false, false, false, false, false, false, false],
          [true, true, true, false, false, false, false, false, false, false],
          [true, true, true, false, false, false, false, false, false, false],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true, true, true]
        ]
      ]
    };
  },
  watch: {
    type: {
      handler(val) {
        const types = ["2d"];
        if (types.includes(val)) {
          this.canvasType = val;
        } else {
          this.canvasType = void 0;
        }
      },
      immediate: true
    },
    value: {
      handler() {
        if (this.auto) {
          this.remake();
        }
      }
    },
    size: {
      handler() {
        if (this.auto) {
          this.remake();
        }
      }
    },
    options: {
      handler() {
        if (this.auto) {
          this.remake();
        }
      },
      deep: true
    },
    makeing: {
      handler(val) {
        if (!val) {
          if (typeof this.toTempFilePathDelegate === "function") {
            this.toTempFilePathDelegate();
          }
        }
      }
    }
  },
  mounted() {
    this.templateOptions.size = this.sizeUnit == "rpx" ? uni.upx2px(this.size) : this.size;
    this.templateOptions.width = this.templateOptions.size;
    this.templateOptions.height = this.templateOptions.size;
    this.templateOptions.canvasWidth = this.templateOptions.size;
    this.templateOptions.canvasHeight = this.templateOptions.size;
    if (this.canvasType == "2d") {
      this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
    } else {
      this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
    }
    if (this.start) {
      this.make();
    }
  },
  methods: {
    /**
     * 获取模板选项
     */
    getTemplateOptions() {
      var size = this.sizeUnit == "rpx" ? uni.upx2px(this.size) : this.size;
      return deepReplace(this.templateOptions, {
        size,
        width: size,
        height: size
      });
    },
    /**
     * 获取插件选项
     */
    getUqrcodeOptions() {
      return deepReplace(this.options, {
        data: String(this.value),
        size: Number(this.templateOptions.size)
      });
    },
    /**
     * 重置画布
     */
    resetCanvas(callback) {
      this.templateOptions.canvasDisplay = false;
      this.$nextTick(() => {
        this.templateOptions.canvasDisplay = true;
        this.$nextTick(() => {
          callback && callback();
        });
      });
    },
    /**
     * 绘制二维码
     */
    async draw(callback = {}, isDrawDelegate = false) {
      if (typeof callback.success != "function") {
        callback.success = () => {
        };
      }
      if (typeof callback.fail != "function") {
        callback.fail = () => {
        };
      }
      if (typeof callback.complete != "function") {
        callback.complete = () => {
        };
      }
      if (this.drawing) {
        if (!isDrawDelegate) {
          this.drawDelegate = () => {
            this.draw(callback, true);
          };
          return;
        }
      } else {
        this.drawing = true;
      }
      if (!this.canvasId) {
        formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:405", "[uQRCode]: canvasId must be set!");
        this.isError = true;
        this.drawing = false;
        callback.fail({
          errMsg: "[uQRCode]: canvasId must be set!"
        });
        callback.complete({
          errMsg: "[uQRCode]: canvasId must be set!"
        });
        return;
      }
      if (!this.value) {
        formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:417", "[uQRCode]: value must be set!");
        this.isError = true;
        this.drawing = false;
        callback.fail({
          errMsg: "[uQRCode]: value must be set!"
        });
        callback.complete({
          errMsg: "[uQRCode]: value must be set!"
        });
        return;
      }
      this.templateOptions = this.getTemplateOptions();
      this.uqrcodeOptions = this.getUqrcodeOptions();
      if (typeof this.uqrcodeOptions.errorCorrectLevel === "string") {
        this.uqrcodeOptions.errorCorrectLevel = b.errorCorrectLevel[this.uqrcodeOptions.errorCorrectLevel];
      }
      if (typeof this.options.useDynamicSize === "undefined") {
        this.uqrcodeOptions.useDynamicSize = false;
      }
      const qr = instance = new b();
      this.plugins.forEach((p2) => qr.register(p2.plugin));
      qr.setOptions(this.uqrcodeOptions);
      qr.make();
      let canvasContext = null;
      const gcanvas = this.$refs["gcanvas"];
      const canvas = enable(gcanvas, {
        bridge: WeexBridge
      });
      canvasContext = this.canvasContext = canvas.getContext("2d");
      qr.loadImage = this.getLoadImage(function(src) {
        return new Promise((resolve, reject) => {
          if (src.startsWith(".")) {
            formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:583", "[uQRCode]: 本地图片路径仅支持绝对路径！");
            throw new Error("[uQRCode]: local image path only supports absolute path!");
          } else {
            uni.getImageInfo({
              src,
              success: (res) => {
                resolve(res.path);
              },
              fail: (err) => {
                reject(err);
              }
            });
          }
        });
      });
      qr.canvasContext = canvasContext;
      setTimeout(() => {
        var plugin = this.plugins.find((p2) => p2.name == qr.style);
        var drawCanvasName = plugin ? plugin.drawCanvas : "drawCanvas";
        var drawCanvas;
        if (this.queue) {
          drawCanvas = () => queueDraw.exec(() => qr[drawCanvasName]());
        } else {
          drawCanvas = () => qr[drawCanvasName]();
        }
        drawCanvas().then(() => {
          if (this.drawDelegate) {
            let delegate = this.drawDelegate;
            this.drawDelegate = void 0;
            delegate();
          } else {
            this.drawing = false;
            callback.success();
          }
        }).catch((err) => {
          formatAppLog("log", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:633", err);
          if (this.drawDelegate) {
            let delegate = this.drawDelegate;
            this.drawDelegate = void 0;
            delegate();
          } else {
            this.drawing = false;
            this.isError = true;
            callback.fail(err);
          }
        }).finally(() => {
          callback.complete();
        });
      }, 300);
    },
    /**
     * 生成二维码
     */
    make(callback = {}) {
      this.makeExecuted = true;
      this.makeing = true;
      this.isError = false;
      if (typeof callback.success != "function") {
        callback.success = () => {
        };
      }
      if (typeof callback.fail != "function") {
        callback.fail = () => {
        };
      }
      if (typeof callback.complete != "function") {
        callback.complete = () => {
        };
      }
      this.resetCanvas(() => {
        clearTimeout(this.makeDelegate);
        this.makeDelegate = setTimeout(() => {
          this.draw({
            success: () => {
              setTimeout(() => {
                callback.success();
                this.complete(true);
              }, 300);
            },
            fail: (err) => {
              callback.fail(err);
              this.error = err;
              this.complete(false, err.errMsg);
            },
            complete: () => {
              callback.complete();
              this.makeing = false;
            }
          });
        }, 300);
      });
    },
    /**
     * 重新生成
     */
    remake(callback) {
      this.$emit("change");
      this.make(callback);
    },
    /**
     * 生成完成
     */
    complete(success = true, errMsg = "") {
      if (success) {
        this.$emit("complete", {
          success
        });
      } else {
        this.$emit("complete", {
          success,
          errMsg
        });
      }
    },
    /**
     * 导出临时路径
     */
    toTempFilePath(callback = {}) {
      if (typeof callback.success != "function") {
        callback.success = () => {
        };
      }
      if (typeof callback.fail != "function") {
        callback.fail = () => {
        };
      }
      if (typeof callback.complete != "function") {
        callback.complete = () => {
        };
      }
      if (!this.makeExecuted) {
        formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:728", "[uQRCode]: make() 方法从未调用！请先成功调用 make() 后再进行操作。");
        var err = {
          errMsg: "[uQRCode]: make() method has never been executed! please execute make() successfully before operating."
        };
        callback.fail(err);
        callback.complete(err);
        return;
      }
      if (this.isError) {
        callback.fail(this.error);
        callback.complete(this.error);
        return;
      }
      if (this.makeing) {
        this.toTempFilePathDelegate = () => {
          this.toTempFilePath(callback);
        };
        return;
      } else {
        this.toTempFilePathDelegate = null;
      }
      const dpr = uni.getSystemInfoSync().pixelRatio;
      this.canvasContext.toTempFilePath(
        0,
        0,
        this.templateOptions.canvasWidth * dpr,
        this.templateOptions.canvasHeight * dpr,
        this.templateOptions.size * dpr,
        this.templateOptions.size * dpr,
        "",
        1,
        (res) => {
          callback.success(res);
          callback.complete(res);
        }
      );
    },
    /**
     * 保存
     */
    save(callback = {}) {
      if (typeof callback.success != "function") {
        callback.success = () => {
        };
      }
      if (typeof callback.fail != "function") {
        callback.fail = () => {
        };
      }
      if (typeof callback.complete != "function") {
        callback.complete = () => {
        };
      }
      this.toTempFilePath({
        success: (res) => {
          if (this.canvasType === "2d")
            ;
          else {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: (res1) => {
                callback.success(res1);
              },
              fail: (err1) => {
                callback.fail(err1);
              },
              complete: () => {
                callback.complete();
              }
            });
          }
        },
        fail: (err) => {
          callback.fail(err);
          callback.complete(err);
        }
      });
    },
    /**
     * 注册click事件
     */
    onClick(e2) {
      this.$emit("click", e2);
    },
    /**
     * 获取实例
     */
    getInstance() {
      return instance;
    },
    /**
     * 注册扩展，组件仅支持注册type为style的drawCanvas扩展
     * @param {Object} plugin
     */
    registerStyle(plugin) {
      if (plugin.Type != "style") {
        formatAppLog("warn", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:930", "[uQRCode]: registerStyle 仅支持注册 style 类型的扩展！");
        return {
          errMsg: "registerStyle 仅支持注册 style 类型的扩展！"
        };
      }
      if (typeof plugin === "function") {
        this.plugins.push({
          plugin,
          name: plugin.Name,
          drawCanvas: plugin.DrawCanvas
        });
      }
    },
    getLoadImage(loadImage) {
      var that = this;
      if (typeof loadImage == "function") {
        return function(src) {
          if (that.isQueueLoadImage) {
            return queueLoadImage.exec(() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  const cache = cacheImageList.find((x) => x.src == src);
                  if (cache) {
                    resolve(cache.img);
                  } else {
                    loadImage(src).then((img) => {
                      cacheImageList.push({
                        src,
                        img
                      });
                      resolve(img);
                    }).catch((err) => {
                      reject(err);
                    });
                  }
                }, 10);
              });
            });
          } else {
            return loadImage(src);
          }
        };
      } else {
        return function(src) {
          return Promise.resolve(src);
        };
      }
    }
  }
};
function deepReplace(o2 = {}, r = {}, c = false) {
  let obj;
  if (c) {
    obj = o2;
  } else {
    obj = {
      ...o2
    };
  }
  for (let k in r) {
    var vr = r[k];
    if (vr != void 0) {
      if (vr.constructor == Object) {
        obj[k] = this.deepReplace(obj[k], vr);
      } else if (vr.constructor == String && !vr) {
        obj[k] = obj[k];
      } else {
        obj[k] = vr;
      }
    }
  }
  return obj;
}
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["uqrcode", { "uqrcode-hide": $props.hide }]),
    style: normalizeStyle({ width: `${$data.templateOptions.width}px`, height: `${$data.templateOptions.height}px` }),
    renderWhole: true
  }, [
    createElementVNode("view", { class: "uqrcode-canvas-wrapper" }, [
      $data.templateOptions.canvasDisplay ? (openBlock(), createElementBlock("gcanvas", {
        key: 0,
        class: "uqrcode-canvas",
        ref: "gcanvas",
        style: normalizeStyle({
          width: `${$data.templateOptions.canvasWidth}px`,
          height: `${$data.templateOptions.canvasHeight}px`
        }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      }, null, 4)) : createCommentVNode("", true)
    ]),
    ($props.loading === void 0 ? $data.makeing : $props.loading) ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: "uqrcode-makeing"
    }, [
      renderSlot(_ctx.$slots, "loading", {}, () => [
        createElementVNode("u-image", {
          class: "uqrcode-makeing-image",
          style: normalizeStyle({ width: `${$data.templateOptions.size / 4}px`, height: `${$data.templateOptions.size / 4}px` }),
          src: "data:image/gif;base64,R0lGODlhAAEAAfIEAOHh4SSsWuDg4N3d3f///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODhGMzM4RDEwMTExRUM4MDhCRkVBQkE2QUZDQzkwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyODhGMzM5RDEwMTExRUM4MDhCRkVBQkE2QUZDQzkwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4OEYzMzZEMTAxMTFFQzgwOEJGRUFCQTZBRkNDOTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4OEYzMzdEMTAxMTFFQzgwOEJGRUFCQTZBRkNDOTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQ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"
        }, null, 4)
      ])
    ])) : createCommentVNode("", true),
    $data.isError ? (openBlock(), createElementBlock("view", {
      key: 1,
      class: "uqrcode-error",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      renderSlot(_ctx.$slots, "error", { error: $data.error }, () => [
        createElementVNode("u-text", { class: "uqrcode-error-message" }, toDisplayString($data.error.errMsg), 1)
      ])
    ])) : createCommentVNode("", true)
  ], 6);
}
const uqrcode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const _style_0 = { "container": { "": { "flex": 1, "paddingTop": "200rpx", "alignItems": "center", "backgroundColor": "#f5f5f5" } }, "qr-code": { "": { "width": "550rpx", "height": "780rpx", "alignItems": "center", "justifyContent": "center", "borderRadius": "20rpx", "backgroundColor": "#ffffff", "position": "relative" } }, "code-info": { "": { "alignItems": "center", "justifyContent": "center" } }, "group-avatar": { "": { "width": "150rpx", "height": "150rpx", "borderRadius": "100rpx", "position": "absolute", "top": "150rpx" } }, "group-name": { "": { "width": "400rpx", "fontSize": "46rpx", "lines": 1, "textOverflow": "ellipsis", "marginTop": "120rpx", "textAlign": "center" } }, "group-id": { "": { "marginTop": "40rpx", "marginRight": 0, "marginBottom": "40rpx", "marginLeft": 0, "fontSize": "30rpx" } }, "btn-box": { "": { "flexDirection": "row", "marginTop": "100rpx" } }, "btn-item": { "": { "alignItems": "center", "justifyContent": "center", "width": "130rpx", "height": "130rpx", "borderRadius": "100rpx", "backgroundColor": "#ffffff", "marginTop": 0, "marginRight": "80rpx", "marginBottom": 0, "marginLeft": "80rpx", "borderWidth": 1, "borderStyle": "solid", "borderColor": "#eeeeee" } }, "btn-text": { "": { "fontSize": "28rpx" } } };
const _sfc_main = {
  components: {
    uqrcode
  },
  data() {
    return {
      group_id: "",
      name: "",
      avatar_file: ""
    };
  },
  computed: {
    qrcodeData() {
      let data = {
        "type": "uni-im",
        "subType": "groupInfo",
        "data": {
          group_id: this.group_id,
          name: this.name,
          avatar_file: this.avatar_file
        }
      };
      return JSON.stringify(data);
    }
  },
  onLoad(options) {
    this.group_id = options.id;
    this.name = options.name;
    this.avatar_file = options.avatar_file;
  },
  onReady() {
    setTimeout(() => {
      this.$refs.uqrcode.make({
        success: () => {
        },
        fail: (err) => {
        }
      });
    }, 1e3);
  },
  methods: {
    copyGroupID() {
      uni.setClipboardData({
        data: this.group_id,
        success: function() {
          formatAppLog("log", "at uni_modules/uni-im/pages/group/groupQRCode.nvue:85", "success");
        }
      });
    },
    save() {
      formatAppLog("log", "at uni_modules/uni-im/pages/group/groupQRCode.nvue:90", "保存");
    },
    share() {
      formatAppLog("log", "at uni_modules/uni-im/pages/group/groupQRCode.nvue:93", "分享");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "container" }, [
      createElementVNode("view", { class: "qr-code" }, [
        createElementVNode("view", { class: "code-info" }, [
          createElementVNode("u-text", { class: "group-name" }, toDisplayString($data.name), 1),
          createElementVNode("u-text", {
            class: "group-id",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.copyGroupID && $options.copyGroupID(...args))
          }, "群号：" + toDisplayString($data.group_id), 1)
        ])
      ]),
      createElementVNode("u-image", {
        class: "group-avatar",
        src: $data.avatar_file || "/uni_modules/uni-im/static/avatarUrl.png",
        mode: ""
      }, null, 8, ["src"])
    ])
  ]);
}
const groupQRCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  groupQRCode as default
};
