import { b as onShow, c as onHide, f as formatAppLog } from "./_plugin-vue_export-helper.js";
import { reactive } from "vue";
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "",
      enablePullDownRefresh: false
    }
  },
  {
    path: "uni_modules/uni-im/pages/chat/chat",
    style: {
      navigationBarTitleText: "",
      enablePullDownRefresh: false,
      "app-plus": {
        titleNView: {
          buttons: [
            {
              color: "#333",
              colorPressed: "#111111",
              float: "right",
              text: "...",
              fontSize: 26,
              onclick: "more"
            }
          ]
        }
      }
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: "实名认证"
    }
  }
];
const subPackages = [
  {
    root: "uni_modules/uni-im/pages",
    pages: [
      {
        path: "index/index",
        style: {
          navigationBarTitleText: "会话列表",
          enablePullDownRefresh: false,
          "app-plus": {
            titleNView: {
              buttons: [
                {
                  color: "#999999",
                  colorPressed: "#111111",
                  float: "right",
                  text: "我的",
                  fontSize: 14,
                  onclick: "toLogin"
                }
              ]
            }
          }
        }
      },
      {
        path: "common/uni-im-code-pages/uni-im-code-pages",
        style: {
          navigationBarTitleText: "代码浏览",
          enablePullDownRefresh: false
        }
      },
      {
        path: "userList/userList",
        style: {
          navigationBarTitleText: "用户列表",
          enablePullDownRefresh: true
        }
      },
      {
        path: "common/video/video",
        style: {
          navigationBarTitleText: "",
          enablePullDownRefresh: false,
          navigationStyle: "custom"
        }
      },
      {
        path: "group/info",
        style: {
          navigationBarTitleText: "群信息",
          enablePullDownRefresh: false,
          "app-plus": {
            titleNView: {
              buttons: [
                {
                  color: "#333",
                  colorPressed: "#111111",
                  float: "right",
                  text: "管理",
                  fontSize: 16,
                  onclick: "more"
                }
              ]
            }
          }
        }
      },
      {
        path: "contacts/notification/notification",
        style: {
          navigationBarTitleText: "",
          enablePullDownRefresh: false
        }
      },
      {
        path: "contacts/contacts",
        style: {
          navigationBarTitleText: "通讯录",
          enablePullDownRefresh: false
        }
      },
      {
        path: "contacts/addPeopleGroups/addPeopleGroups",
        style: {
          navigationStyle: "custom",
          enablePullDownRefresh: false
        }
      },
      {
        path: "contacts/createGroup/createGroup",
        style: {
          navigationBarTitleText: "创建群聊",
          enablePullDownRefresh: false,
          maxWidth: 950
        }
      },
      {
        path: "group/groupQRCode",
        style: {
          navigationBarTitleText: "群聊二维码",
          enablePullDownRefresh: false
        }
      },
      {
        path: "contacts/groupList/groupList",
        style: {
          navigationBarTitleText: "我的群聊",
          enablePullDownRefresh: false
        }
      },
      {
        path: "chat/info",
        style: {
          navigationBarTitleText: "聊天设置",
          enablePullDownRefresh: false
        }
      }
    ]
  },
  {
    root: "uni_modules/uni-id-pages/pages",
    pages: [
      {
        path: "userinfo/userinfo",
        style: {
          navigationBarTitleText: "个人资料"
        }
      },
      {
        path: "login/login-withoutpwd"
      },
      {
        path: "login/login-withpwd"
      },
      {
        path: "userinfo/deactivate/deactivate",
        style: {
          navigationBarTitleText: "注销账号"
        }
      },
      {
        path: "userinfo/bind-mobile/bind-mobile",
        style: {
          navigationBarTitleText: "绑定手机号码"
        }
      },
      {
        path: "login/login-smscode",
        style: {
          navigationBarTitleText: "手机验证码登录"
        }
      },
      {
        path: "register/register",
        style: {
          navigationBarTitleText: "注册"
        }
      },
      {
        path: "retrieve/retrieve",
        style: {
          navigationBarTitleText: "重置密码"
        }
      },
      {
        path: "common/webview/webview",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: ""
        }
      },
      {
        path: "userinfo/change_pwd/change_pwd",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: "修改密码"
        }
      },
      {
        path: "register/register-by-email",
        style: {
          navigationBarTitleText: "邮箱验证码注册"
        }
      },
      {
        path: "retrieve/retrieve-by-email",
        style: {
          navigationBarTitleText: "通过邮箱重置密码"
        }
      },
      {
        path: "userinfo/set-pwd/set-pwd",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: "设置密码"
        }
      }
    ]
  }
];
const tabBar = {
  color: "#999999",
  selectedColor: "#38BC48",
  borderStyle: "black",
  backgroundColor: "#FFFFFF",
  list: [
    {
      pagePath: "uni_modules/uni-im/pages/index/index",
      text: "会话",
      iconPath: "uni_modules/uni-im/static/tabbarIcon/chat.png",
      selectedIconPath: "uni_modules/uni-im/static/tabbarIcon/chatex.png"
    },
    {
      pagePath: "uni_modules/uni-im/pages/userList/userList",
      text: "用户列表",
      iconPath: "uni_modules/uni-im/static/tabbarIcon/contacts.png",
      selectedIconPath: "uni_modules/uni-im/static/tabbarIcon/contactsex.png"
    },
    {
      pagePath: "uni_modules/uni-im/pages/contacts/contacts",
      text: "通讯录",
      iconPath: "uni_modules/uni-im/static/tabbarIcon/contacts.png",
      selectedIconPath: "uni_modules/uni-im/static/tabbarIcon/contactsex.png"
    }
  ]
};
const uniIdRouter = {
  loginPage: "uni_modules/uni-id-pages/pages/login/login-withpwd",
  needLogin: [
    "uni_modules/uni-im/pages/userList/userList",
    "uni_modules/uni-im/pages/contacts/contacts",
    "pages/index/index"
  ]
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "智医聊+",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const pagesJson = {
  pages,
  subPackages,
  tabBar,
  uniIdRouter,
  globalStyle
};
function t(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function n(e, t2, n2) {
  return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e, t2) {
  var n2;
  e.exports = (n2 = n2 || function(e2, t3) {
    var n3 = Object.create || function() {
      function e3() {
      }
      return function(t4) {
        var n4;
        return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e3) {
      var t4 = n3(this);
      return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e3 = this.extend();
      return e3.init.apply(e3, arguments), e3;
    }, init: function() {
    }, mixIn: function(e3) {
      for (var t4 in e3)
        e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
      e3.hasOwnProperty("toString") && (this.toString = e3.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e3, n4) {
      e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
    }, toString: function(e3) {
      return (e3 || c2).stringify(this);
    }, concat: function(e3) {
      var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, r3 = e3.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
    }, clone: function() {
      var e3 = i2.clone.call(this);
      return e3.words = this.words.slice(0), e3;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e2.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
      for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e3) {
      for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e3) {
      for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e3) {
      for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e3) {
      try {
        return decodeURIComponent(escape(u2.stringify(e3)));
      } catch (e4) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e3) {
      return u2.parse(unescape(encodeURIComponent(e3)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e3) {
      "string" == typeof e3 && (e3 = h2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e2.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e3 = i2.clone.call(this);
      return e3._data = this._data.clone(), e3;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e3) {
      this.cfg = this.cfg.extend(e3), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e3) {
      return this._append(e3), this._process(), this;
    }, finalize: function(e3) {
      return e3 && this._append(e3), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e3) {
      return function(t4, n4) {
        return new e3.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e3) {
      return function(t4, n4) {
        return new d2.HMAC.init(e3, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e, t2) {
  var n2;
  e.exports = (n2 = r, function(e2) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e3, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e3[s3];
        e3[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e3[t4 + 0], c3 = e3[t4 + 1], p2 = e3[t4 + 2], f2 = e3[t4 + 3], g2 = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w2 = e3[t4 + 8], v2 = e3[t4 + 9], I2 = e3[t4 + 10], S2 = e3[t4 + 11], b2 = e3[t4 + 12], k = e3[t4 + 13], A2 = e3[t4 + 14], P2 = e3[t4 + 15], T = i3[0], C2 = i3[1], x = i3[2], O2 = i3[3];
      T = u2(T, C2, x, O2, o3, 7, a2[0]), O2 = u2(O2, T, C2, x, c3, 12, a2[1]), x = u2(x, O2, T, C2, p2, 17, a2[2]), C2 = u2(C2, x, O2, T, f2, 22, a2[3]), T = u2(T, C2, x, O2, g2, 7, a2[4]), O2 = u2(O2, T, C2, x, m2, 12, a2[5]), x = u2(x, O2, T, C2, y2, 17, a2[6]), C2 = u2(C2, x, O2, T, _2, 22, a2[7]), T = u2(T, C2, x, O2, w2, 7, a2[8]), O2 = u2(O2, T, C2, x, v2, 12, a2[9]), x = u2(x, O2, T, C2, I2, 17, a2[10]), C2 = u2(C2, x, O2, T, S2, 22, a2[11]), T = u2(T, C2, x, O2, b2, 7, a2[12]), O2 = u2(O2, T, C2, x, k, 12, a2[13]), x = u2(x, O2, T, C2, A2, 17, a2[14]), T = h2(T, C2 = u2(C2, x, O2, T, P2, 22, a2[15]), x, O2, c3, 5, a2[16]), O2 = h2(O2, T, C2, x, y2, 9, a2[17]), x = h2(x, O2, T, C2, S2, 14, a2[18]), C2 = h2(C2, x, O2, T, o3, 20, a2[19]), T = h2(T, C2, x, O2, m2, 5, a2[20]), O2 = h2(O2, T, C2, x, I2, 9, a2[21]), x = h2(x, O2, T, C2, P2, 14, a2[22]), C2 = h2(C2, x, O2, T, g2, 20, a2[23]), T = h2(T, C2, x, O2, v2, 5, a2[24]), O2 = h2(O2, T, C2, x, A2, 9, a2[25]), x = h2(x, O2, T, C2, f2, 14, a2[26]), C2 = h2(C2, x, O2, T, w2, 20, a2[27]), T = h2(T, C2, x, O2, k, 5, a2[28]), O2 = h2(O2, T, C2, x, p2, 9, a2[29]), x = h2(x, O2, T, C2, _2, 14, a2[30]), T = l2(T, C2 = h2(C2, x, O2, T, b2, 20, a2[31]), x, O2, m2, 4, a2[32]), O2 = l2(O2, T, C2, x, w2, 11, a2[33]), x = l2(x, O2, T, C2, S2, 16, a2[34]), C2 = l2(C2, x, O2, T, A2, 23, a2[35]), T = l2(T, C2, x, O2, c3, 4, a2[36]), O2 = l2(O2, T, C2, x, g2, 11, a2[37]), x = l2(x, O2, T, C2, _2, 16, a2[38]), C2 = l2(C2, x, O2, T, I2, 23, a2[39]), T = l2(T, C2, x, O2, k, 4, a2[40]), O2 = l2(O2, T, C2, x, o3, 11, a2[41]), x = l2(x, O2, T, C2, f2, 16, a2[42]), C2 = l2(C2, x, O2, T, y2, 23, a2[43]), T = l2(T, C2, x, O2, v2, 4, a2[44]), O2 = l2(O2, T, C2, x, b2, 11, a2[45]), x = l2(x, O2, T, C2, P2, 16, a2[46]), T = d2(T, C2 = l2(C2, x, O2, T, p2, 23, a2[47]), x, O2, o3, 6, a2[48]), O2 = d2(O2, T, C2, x, _2, 10, a2[49]), x = d2(x, O2, T, C2, A2, 15, a2[50]), C2 = d2(C2, x, O2, T, m2, 21, a2[51]), T = d2(T, C2, x, O2, b2, 6, a2[52]), O2 = d2(O2, T, C2, x, f2, 10, a2[53]), x = d2(x, O2, T, C2, I2, 15, a2[54]), C2 = d2(C2, x, O2, T, c3, 21, a2[55]), T = d2(T, C2, x, O2, w2, 6, a2[56]), O2 = d2(O2, T, C2, x, P2, 10, a2[57]), x = d2(x, O2, T, C2, y2, 15, a2[58]), C2 = d2(C2, x, O2, T, k, 21, a2[59]), T = d2(T, C2, x, O2, g2, 6, a2[60]), O2 = d2(O2, T, C2, x, S2, 10, a2[61]), x = d2(x, O2, T, C2, p2, 15, a2[62]), C2 = d2(C2, x, O2, T, v2, 21, a2[63]), i3[0] = i3[0] + T | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e2.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e3 = i2.clone.call(this);
      return e3._hash = this._hash.clone(), e3;
    } });
    function u2(e3, t4, n3, s3, r3, i3, o3) {
      var a3 = e3 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e3, t4, n3, s3, r3, i3, o3) {
      var a3 = e3 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e3, t4, n3, s3, r3, i3, o3) {
      var a3 = e3 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e3, t4, n3, s3, r3, i3, o3) {
      var a3 = e3 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e, t2) {
  var n2;
  e.exports = (n2 = r, void function() {
    var e2 = n2, t3 = e2.lib.Base, s2 = e2.enc.Utf8;
    e2.algo.HMAC = t3.extend({ init: function(e3, t4) {
      e3 = this._hasher = new e3.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e3.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e3.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e3 = this._hasher;
      e3.reset(), e3.update(this._iKey);
    }, update: function(e3) {
      return this._hasher.update(e3), this;
    }, finalize: function(e3) {
      var t4 = this._hasher, n3 = t4.finalize(e3);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e, t2) {
  e.exports = r.HmacMD5;
})), o = n(function(e, t2) {
  e.exports = r.enc.Utf8;
}), a = n(function(e, t2) {
  var n2;
  e.exports = (n2 = r, function() {
    var e2 = n2, t3 = e2.lib.WordArray;
    function s2(e3, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e3.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e3.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e2.enc.Base64 = { stringify: function(e3) {
      var t4 = e3.words, n3 = e3.sigBytes, s3 = this._map;
      e3.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e3) {
      var t4 = e3.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e3.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e3, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
function f(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
function g(e) {
  return "object" === f(e);
}
function m(e) {
  return "function" == typeof e;
}
function y(e) {
  return function() {
    try {
      return e.apply(e, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
const _ = "REJECTED", w = "NOT_PENDING";
class v {
  constructor({ createPromise: e, retryRule: t2 = _ } = {}) {
    this.createPromise = e, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case _:
        return this.status === p;
      case w:
        return this.status !== l;
    }
  }
  exec() {
    return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e) => (this.status = d, Promise.resolve(e)), (e) => (this.status = p, Promise.reject(e))), this.promise) : this.promise;
  }
}
function I(e) {
  return e && "string" == typeof e ? JSON.parse(e) : e;
}
const S = false, b = "app", A = I([]), P = b;
I("");
const C = I('[{"provider":"aliyun","spaceName":"chat-kyxf","spaceId":"mp-e3582cd1-8371-4a89-9221-663dc8b8b2a5","clientSecret":"QHrHbGTbhDOgGvAPLvpJPw=="}]') || [];
let O = "";
try {
  O = "__UNI__00A663C";
} catch (e) {
}
let E = {};
function L(e, t2 = {}) {
  var n2, s2;
  return n2 = E, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e] = t2), E[e];
}
E = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
function N(e, t2) {
  U[e] || (U[e] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e2, t3, n3) {
      let s2 = U[e2][t3];
      s2 || (s2 = U[e2][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
    }(e, n2, t2[n2]);
  });
}
function D(e, t2) {
  U[e] || (U[e] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e2, t3, n3) {
      const s2 = U[e2][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e, n2, t2[n2]);
  }) : delete U[e];
}
function M(e, t2) {
  return e && 0 !== e.length ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function q(e, t2) {
  return U[e] && U[e][t2] || [];
}
function F(e) {
  N("callObject", e);
}
const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", z = "cloudobject";
function J(e) {
  return K[e] || (K[e] = []), K[e];
}
function G(e, t2) {
  const n2 = J(e);
  n2.includes(t2) || n2.push(t2);
}
function V(e, t2) {
  const n2 = J(e), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function Y(e, t2) {
  const n2 = J(e);
  for (let e2 = 0; e2 < n2.length; e2++) {
    (0, n2[e2])(t2);
  }
}
let Q, X = false;
function Z() {
  return Q || (Q = new Promise((e) => {
    X && e(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (X = true, e());
      }
      X || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Q);
}
function ee(e) {
  const t2 = {};
  for (const n2 in e) {
    const s2 = e[n2];
    m(s2) && (t2[n2] = y(s2));
  }
  return t2;
}
class te extends Error {
  constructor(e) {
    super(e.message), this.errMsg = e.message || e.errMsg || "unknown system error", this.code = this.errCode = e.code || e.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e.subject || e.errSubject, this.cause = e.cause, this.requestId = e.requestId;
  }
  toJson(e = 0) {
    if (!(e >= 10))
      return e++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause };
  }
}
var ne = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() };
function se(e) {
  return e && se(e.__v_raw) || e;
}
function re() {
  return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
}
function ie({ token: e, tokenExpired: t2 } = {}) {
  e && ne.setStorageSync("uni_id_token", e), t2 && ne.setStorageSync("uni_id_token_expired", t2);
}
let oe, ae;
function ce() {
  return oe || (oe = uni.getSystemInfoSync()), oe;
}
function ue() {
  let e, t2;
  try {
    if (uni.getLaunchOptionsSync) {
      if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
      e = s2, t2 = n2;
    }
  } catch (e2) {
  }
  return { channel: e, scene: t2 };
}
function he() {
  const e = uni.getLocale && uni.getLocale() || "en";
  if (ae)
    return { ...ae, locale: e, LOCALE: e };
  const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
  for (let e2 = 0; e2 < o2.length; e2++) {
    delete t2[o2[e2]];
  }
  return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...ae, locale: e, LOCALE: e };
}
var le = { sign: function(e, t2) {
  let n2 = "";
  return Object.keys(e).sort().forEach(function(t3) {
    e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e, { complete(e2) {
      e2 || (e2 = {});
      const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
      if (!e2.statusCode || e2.statusCode >= 400)
        return s2(new te({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
      const r2 = e2.data;
      if (r2.error)
        return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e) {
  return a.stringify(o.parse(e));
} };
var de = class {
  constructor(e) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => {
      if (!e2.result || !e2.result.accessToken)
        throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e2.result.accessToken);
    }), retryRule: w });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e) {
    this.accessToken = e;
  }
  requestWrapped(e) {
    return le.wrappedRequest(e, this.adapter.request);
  }
  requestAuth(e) {
    return this.requestWrapped(e);
  }
  request(e, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e2();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e) {
    const t2 = Object.assign({}, e);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = le.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e, t2) {
    const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
        e2 && e2.statusCode < 400 ? o2(e2) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e2) {
        a2(new te({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
        i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e2 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = le.toBase64(e2);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e, fileID: c2 };
    if ((await this.reportOSSUpload({ id: g2 })).success)
      return { success: true, filePath: e, fileID: c2 };
    throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e) && 0 !== e.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
    });
  }
  async getFileInfo({ fileList: e } = {}) {
    if (!Array.isArray(e) || 0 === e.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e.map((e2) => e2.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var pe = { init(e) {
  const t2 = new de(e), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var ge;
!function(e) {
  e.local = "local", e.none = "none", e.session = "session";
}(ge || (ge = {}));
var me = function() {
}, ye = n(function(e, t2) {
  var n2;
  e.exports = (n2 = r, function(e2) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e2.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e3) {
        return 4294967296 * (e3 - (0 | e3)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e2.pow(s3, 0.5))), c2[r3] = n3(e2.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e3, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e3[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e2.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e3 = i2.clone.call(this);
      return e3._hash = this._hash.clone(), e3;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), _e = ye, we = n(function(e, t2) {
  e.exports = r.HmacSHA256;
});
const ve = () => {
  let e;
  if (!Promise) {
    e = () => {
    }, e.promise = {};
    const t3 = () => {
      throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
  }
  const t2 = new Promise((t3, n2) => {
    e = (e2, s2) => e2 ? n2(e2) : t3(s2);
  });
  return e.promise = t2, e;
};
function Ie(e) {
  return void 0 === e;
}
function Se(e) {
  return "[object Null]" === Object.prototype.toString.call(e);
}
var be;
function ke(e) {
  const t2 = (n2 = e, "[object Array]" === Object.prototype.toString.call(n2) ? e : [e]);
  var n2;
  for (const e2 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e) {
  e.WEB = "web", e.WX_MP = "wx_mp";
}(be || (be = {}));
const Ae = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
class Te extends me {
  constructor() {
    super(), Ae.adapter.root.tcbObject || (Ae.adapter.root.tcbObject = {});
  }
  setItem(e, t2) {
    Ae.adapter.root.tcbObject[e] = t2;
  }
  getItem(e) {
    return Ae.adapter.root.tcbObject[e];
  }
  removeItem(e) {
    delete Ae.adapter.root.tcbObject[e];
  }
  clear() {
    delete Ae.adapter.root.tcbObject;
  }
}
function Ce(e, t2) {
  switch (e) {
    case "local":
      return t2.localStorage || new Te();
    case "none":
      return new Te();
    default:
      return t2.sessionStorage || new Te();
  }
}
class xe {
  constructor(e) {
    if (!this._storage) {
      this._persistence = Ae.adapter.primaryStorage || e.persistence, this._storage = Ce(this._persistence, Ae.adapter);
      const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, r2 = `anonymous_uuid_${e.env}`, i2 = `login_type_${e.env}`, o2 = `user_info_${e.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
    }
  }
  updatePersistence(e) {
    if (e === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e;
    const n2 = Ce(e, Ae.adapter);
    for (const e2 in this.keys) {
      const s2 = this.keys[e2];
      if (t2 && Pe.includes(e2))
        continue;
      const r2 = this._storage.getItem(s2);
      Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e, r2);
    } catch (e2) {
      throw e2;
    }
  }
  getStore(e, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e2) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e) {
    this._storage.removeItem(e);
  }
}
const Oe = {}, Ee = {};
function Le(e) {
  return Oe[e];
}
class Re {
  constructor(e, t2) {
    this.data = t2 || null, this.name = e;
  }
}
class Ue extends Re {
  constructor(e, t2) {
    super("error", { error: e, data: t2 }), this.error = e;
  }
}
const Ne = new class {
  constructor() {
    this._listeners = {};
  }
  on(e, t2) {
    return function(e2, t3, n2) {
      n2[e2] = n2[e2] || [], n2[e2].push(t3);
    }(e, t2, this._listeners), this;
  }
  off(e, t2) {
    return function(e2, t3, n2) {
      if (n2 && n2[e2]) {
        const s2 = n2[e2].indexOf(t3);
        -1 !== s2 && n2[e2].splice(s2, 1);
      }
    }(e, t2, this._listeners), this;
  }
  fire(e, t2) {
    if (e instanceof Ue)
      return console.error(e.error), this;
    const n2 = "string" == typeof e ? new Re(e, t2 || {}) : e;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e2)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e) {
    return this._listeners[e] && this._listeners[e].length > 0;
  }
}();
function De(e, t2) {
  Ne.on(e, t2);
}
function Me(e, t2 = {}) {
  Ne.fire(e, t2);
}
function qe(e, t2) {
  Ne.off(e, t2);
}
const Fe = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", $e = "anonymousConverted", Be = "refreshAccessToken";
var We;
!function(e) {
  e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
}(We || (We = {}));
const He = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
function Je(e, t2, n2) {
  const s2 = e[t2];
  e[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e2;
      if (e2 = o2, "[object FormData]" !== Object.prototype.toString.call(e2))
        t3.data = { ...o2, ...r2 };
      else
        for (const e3 in r2)
          o2.append(e3, r2[e3]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e, t3);
  };
}
function Ge() {
  const e = Math.random().toString(16).slice(2);
  return { data: { seqId: e }, headers: { ...ze, "x-seqid": e } };
}
class Ve {
  constructor(e = {}) {
    var t2;
    this.config = e, this._reqClass = new Ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Le(this.config.env), this._localCache = (t2 = this.config.env, Ee[t2]), Je(this._reqClass, "post", [Ge]), Je(this._reqClass, "upload", [Ge]), Je(this._reqClass, "download", [Ge]);
  }
  async post(e) {
    return await this._reqClass.post(e);
  }
  async upload(e) {
    return await this._reqClass.upload(e);
  }
  async download(e) {
    return await this._reqClass.download(e);
  }
  async refreshAccessToken() {
    let e, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e = await this._refreshAccessTokenPromise;
    } catch (e2) {
      t2 = e2;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new te({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e2 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e2 || "REFRESH_TOKEN_EXPIRED" === e2 || "INVALID_REFRESH_TOKEN" === e2) {
        if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e2) {
          const e3 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        Me(Ke), this._cache.removeStore(n2);
      }
      throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return Me(Be), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new te({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    if (-1 === He.indexOf(e)) {
      const { refreshTokenKey: e2 } = this._cache.keys;
      this._cache.getStore(e2) && (i2.access_token = (await this.getAccessToken()).accessToken);
    }
    let o2;
    if ("storage.uploadFile" === e) {
      o2 = new FormData();
      for (let e2 in o2)
        o2.hasOwnProperty(e2) && void 0 !== o2[e2] && o2.append(e2, i2[e2]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e2 in i2)
        void 0 !== i2[e2] && (o2[e2] = i2[e2]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e2, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e3 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e3}=${encodeURIComponent(n3[e3])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e2}${t3}`;
    }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new te({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e, t2 = {}) {
    const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
    if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === He.indexOf(e)) {
      await this.refreshAccessToken();
      const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new te({ code: n3.data.code, message: n3.data.message });
      return n3.data;
    }
    if (n2.data.code)
      throw new te({ code: n2.data.code, message: n2.data.message });
    return n2.data;
  }
  setRefreshToken(e) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
  }
}
const Ye = {};
function Qe(e) {
  return Ye[e];
}
class Xe {
  constructor(e) {
    this.config = e, this._cache = Le(e.env), this._request = Qe(e.env);
  }
  setRefreshToken(e) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
  }
  setAccessToken(e, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e), e;
  }
  setLocalUserInfo(e) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e);
  }
}
class Ze {
  constructor(e) {
    if (!e)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e, this._cache = Le(this._envId), this._request = Qe(this._envId), this.setUserInfo();
  }
  linkWithTicket(e) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e });
  }
  linkWithRedirect(e) {
    e.signInWithRedirect();
  }
  updatePassword(e, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
  }
  updateEmail(e) {
    return this._request.send("auth.updateEmail", { newEmail: e });
  }
  updateUsername(e) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e });
  }
  async getLinkedUidList() {
    const { data: e } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e;
    return n2.forEach((e2) => {
      e2.wxOpenId && e2.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e) {
    return this._request.send("auth.setPrimaryUid", { uid: e });
  }
  unlink(e) {
    return this._request.send("auth.unlink", { platform: e });
  }
  async update(e) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e), e;
  }
  setUserInfo() {
    const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
      this[e2] = t2[e2];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e), this.setUserInfo();
  }
}
class et {
  constructor(e) {
    if (!e)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Le(e);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e);
  }
  get isAnonymousAuth() {
    return this.loginType === We.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === We.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class tt extends Xe {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
      const e2 = new et(this.config.env);
      return await e2.user.refresh(), e2;
    }
    throw new te({ message: "匿名登录失败" });
  }
  async linkAndRetrieveDataWithTicket(e) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Me($e, { env: this.config.env }), Me(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new te({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, We.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class nt extends Xe {
  async signIn(e) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
    throw new te({ message: "自定义登录失败" });
  }
}
class st extends Xe {
  async signIn(e, t2) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
  }
  async activate(e) {
    return this._request.send("auth.activateEndUserMail", { token: e });
  }
  async resetPasswordWithToken(e, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
  }
}
class rt extends Xe {
  async signIn(e, t2) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
  }
}
class it {
  constructor(e) {
    this.config = e, this._cache = Le(e.env), this._request = Qe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e = this.hasLoginState();
    return e && e.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new tt(this.config);
  }
  customAuthProvider() {
    return new nt(this.config);
  }
  emailAuthProvider() {
    return new st(this.config);
  }
  usernameAuthProvider() {
    return new rt(this.config);
  }
  async signInAnonymously() {
    return new tt(this.config).signIn();
  }
  async signInWithEmailAndPassword(e, t2) {
    return new st(this.config).signIn(e, t2);
  }
  signInWithUsernameAndPassword(e, t2) {
    return new rt(this.config).signIn(e, t2);
  }
  async linkAndRetrieveDataWithTicket(e) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De($e, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
  }
  async signOut() {
    if (this.loginType === We.ANONYMOUS)
      throw new te({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), Me(Fe), Me(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
  }
  async sendPasswordResetEmail(e) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e });
  }
  onLoginStateChanged(e) {
    De(Fe, () => {
      const t3 = this.hasLoginState();
      e.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e.call(this, t2);
  }
  onLoginStateExpired(e) {
    De(Ke, e.bind(this));
  }
  onAccessTokenRefreshed(e) {
    De(Be, e.bind(this));
  }
  onAnonymousConverted(e) {
    De($e, e.bind(this));
  }
  onLoginTypeChanged(e) {
    De(je, () => {
      const t2 = this.hasLoginState();
      e.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e } = this._cache.keys;
    return this._cache.getStore(e) ? new et(this.config.env) : null;
  }
  async isUsernameRegistered(e) {
    if ("string" != typeof e)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e) {
    return new nt(this.config).signIn(e);
  }
  shouldRefreshAccessToken(e) {
    this._request._shouldRefreshAccessTokenHook = e.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : { ...e.data, requestId: e.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e) {
    const { env: t2 } = e.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e) {
    const { loginType: t2, persistence: n2, env: s2 } = e.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const ot = function(e, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e2, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e3) => {
      201 === e3.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
    }).catch((e3) => {
      t2(e3);
    });
  }).catch((e2) => {
    t2(e2);
  }), t2.promise;
}, at = function(e, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2 } = e;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
    t2(null, e2);
  }).catch((e2) => {
    t2(e2);
  }), t2.promise;
}, ct = function({ fileList: e }, t2) {
  if (t2 = t2 || ve(), !e || !Array.isArray(e))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e };
  return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
    e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
  }).catch((e2) => {
    t2(e2);
  }), t2.promise;
}, ut = function({ fileList: e }, t2) {
  t2 = t2 || ve(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
    e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
  }).catch((e2) => {
    t2(e2);
  }), t2.promise;
}, ht = async function({ fileID: e }, t2) {
  const n2 = (await ut.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e2) => {
      e2(n2);
    });
  const s2 = Qe(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, lt = function({ name: e, data: t2, query: n2, parse: s2, search: r2 }, i2) {
  const o2 = i2 || ve();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e2) {
    return Promise.reject(e2);
  }
  if (!e)
    return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e, request_data: a2 };
  return Qe(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
    if (e2.code)
      o2(null, e2);
    else {
      let t3 = e2.data.response_data;
      if (s2)
        o2(null, { result: t3, requestId: e2.requestId });
      else
        try {
          t3 = JSON.parse(e2.data.response_data), o2(null, { result: t3, requestId: e2.requestId });
        } catch (e3) {
          o2(new te({ message: "response data must be json" }));
        }
    }
    return o2.promise;
  }).catch((e2) => {
    o2(e2);
  }), o2.promise;
}, dt = { timeout: 15e3, persistence: "session" }, pt = {};
class ft {
  constructor(e) {
    this.config = e || this.config, this.authObj = void 0;
  }
  init(e) {
    switch (Ae.adapter || (this.requestClient = new Ae.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `请求在${(e.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new ft(this.config);
  }
  auth({ persistence: e } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e || Ae.adapter.primaryStorage || dt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
      const { env: t3 } = e2;
      Oe[t3] = new xe(e2), Ee[t3] = new xe({ ...e2, persistence: "local" });
    }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
  }
  on(e, t2) {
    return De.apply(this, [e, t2]);
  }
  off(e, t2) {
    return qe.apply(this, [e, t2]);
  }
  callFunction(e, t2) {
    return lt.apply(this, [e, t2]);
  }
  deleteFile(e, t2) {
    return ct.apply(this, [e, t2]);
  }
  getTempFileURL(e, t2) {
    return ut.apply(this, [e, t2]);
  }
  downloadFile(e, t2) {
    return ht.apply(this, [e, t2]);
  }
  uploadFile(e, t2) {
    return ot.apply(this, [e, t2]);
  }
  getUploadMetadata(e, t2) {
    return at.apply(this, [e, t2]);
  }
  registerExtension(e) {
    pt[e.name] = e;
  }
  async invokeExtension(e, t2) {
    const n2 = pt[e];
    if (!n2)
      throw new te({ message: `扩展${e} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e) {
    const { adapter: t2, runtime: n2 } = ke(e) || {};
    t2 && (Ae.adapter = t2), n2 && (Ae.runtime = n2);
  }
}
var gt = new ft();
function mt(e, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e + t2;
}
class yt {
  post(e) {
    const { url: t2, data: n2, headers: s2 } = e;
    return new Promise((e2, r2) => {
      ne.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e2(t3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  }
  upload(e) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e, c2 = ne.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e2) {
        const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
        200 === e2.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e2) {
        n2(new Error(e2.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const _t = { setItem(e, t2) {
  ne.setStorageSync(e, t2);
}, getItem: (e) => ne.getStorageSync(e), removeItem(e) {
  ne.removeStorageSync(e);
}, clear() {
  ne.clearStorageSync();
} };
var wt = { genAdapter: function() {
  return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
gt.useAdapters(wt);
const vt = gt, It = vt.init;
vt.init = function(e) {
  e.env = e.spaceId;
  const t2 = It.call(this, e);
  t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e2) {
    const t3 = n2.call(this, e2);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
      var n3;
      t3[e3] = (n3 = t3[e3], function(e4) {
        e4 = e4 || {};
        const { success: t4, fail: s2, complete: r2 } = ee(e4);
        if (!(t4 || s2 || r2))
          return n3.call(this, e4);
        n3.call(this, e4).then((e5) => {
          t4 && t4(e5), r2 && r2(e5);
        }, (e5) => {
          s2 && s2(e5), r2 && r2(e5);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var St = vt;
var bt = class extends de {
  getAccessToken() {
    return new Promise((e, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e(n2);
    });
  }
  setupRequest(e, t2) {
    const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret);
    const r2 = he();
    s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
    const { token: i2 } = re();
    return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, success(e2) {
        e2 && e2.statusCode < 400 ? o2(e2) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e2) {
        a2(new te({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
        i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: i2, formData: o2, name: a2, filePath: e, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
    return this.request(this.setupRequest(t2)).then((e2) => {
      if (e2.success)
        return e2.result;
      throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e, maxAge: t2 } = {}) {
    if (!Array.isArray(e) || 0 === e.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e, maxAge: t2 }) };
    return this.request(this.setupRequest(n2)).then((e2) => {
      if (e2.success)
        return { fileList: e2.result.fileList.map((e3) => ({ fileID: e3.fileID, tempFileURL: e3.tempFileURL })) };
      throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var kt = { init(e) {
  const t2 = new bt(e), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, At = n(function(e, t2) {
  e.exports = r.enc.Hex;
});
function Pt(e = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
    var t3 = 16 * Math.random() | 0;
    return ("x" === e2 ? t3 : 3 & t3 | 8).toString(16);
  }), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e.split("?") || [], f2 = function(e2) {
    const t3 = e2.signedHeaders.join(";"), n3 = e2.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e2.headers[t4]}
`).join(""), s3 = _e(e2.body).toString(At), r3 = `${e2.method.toUpperCase()}
${e2.path}
${e2.query}
${n3}
${t3}
${s3}
`, i3 = _e(r3).toString(At), o3 = `HMAC-SHA256
${e2.timestamp}
${i3}
`, a3 = we(o3, e2.secretKey).toString(At);
    return `HMAC-SHA256 Credential=${e2.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function Tt({ url: e, data: t2, method: n2 = "POST", headers: s2 = {} }) {
  return new Promise((r2, i2) => {
    ne.request({ url: e, method: n2, data: t2, header: s2, dataType: "json", complete: (e2 = {}) => {
      if (!e2.statusCode || e2.statusCode >= 400) {
        const { errMsg: t3 } = e2.data || {};
        return i2(new te({ code: "SYS_ERR", message: t3 || e2.errMsg || "request:fail", requestId: e2.requestID }));
      }
      r2({ status: e2.statusCode, data: e2.data, headers: e2.header, requestId: e2.requestID });
    } });
  });
}
function Ct(e, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e, { url: i2, headers: o2 } = Pt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e2) => {
    const t3 = e2.data || {};
    if (!t3.success)
      throw new te({ code: e2.code, message: e2.message, requestId: e2.trace_id });
    return t3.data || {};
  }).catch((e2) => {
    throw new te({ code: e2.errCode, message: e2.errMsg, requestId: e2.requestId });
  });
}
function xt(e = "") {
  const t2 = e.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e, " does not belong to env ").concat(this.config.spaceId)), r2;
}
var Ot = class {
  constructor(e) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e, t2))
        throw new Error(`${t2} required`);
    }), e.endpoint) {
      if ("string" != typeof e.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e.endpoint))
        throw new Error("endpoint must start with https://");
      e.endpoint = e.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e, { endpoint: e.endpoint || `https://${e.spaceId}.api-hz.cloudbasefunction.cn` });
  }
  callFunction(e) {
    return function(e2, t2) {
      const { name: n2, data: s2 } = e2, r2 = "POST", { url: i2, headers: o2 } = Pt("/functions/invokeFunction", { functionName: n2, data: s2, method: r2, headers: { "x-to-function-name": n2 }, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => ({ errCode: 0, success: true, requestId: e3.requestId, result: e3.data })).catch((e3) => {
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      });
    }(e, this.config);
  }
  uploadFileToOSS({ url: e, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = ne.uploadFile({ url: e, filePath: t2, fileType: n2, formData: s2, name: "file", success(e2) {
        e2 && e2.statusCode < 400 ? i2(e2) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e2) {
        o2(new te({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e2) => {
        r2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await Ct({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e2, t3) => (e2[t3.key] = t3.value, e2), {});
    return this.uploadFileToOSS({ url: o2, filePath: e, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e }) {
    return new Promise((t2, n2) => {
      (!e || e.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
      const s2 = [];
      for (const t3 of e) {
        "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
        const e2 = xt.call(this, t3);
        s2.push({ file_id: e2, expire: 600 });
      }
      Ct({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e2) => {
        const { file_list: n3 = [] } = e2;
        t2({ fileList: n3.map((e3) => ({ fileID: e3.file_id, tempFileURL: e3.download_url })) });
      }).catch((e2) => n2(e2));
    });
  }
};
var Et = { init: (e) => {
  e.provider = "alipay";
  const t2 = new Ot(e);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Lt({ data: e }) {
  let t2;
  t2 = he();
  const n2 = JSON.parse(JSON.stringify(e || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e2 } = re();
    e2 && (n2.uniIdToken = e2);
  }
  return n2;
}
const Ut = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Nt = /[\\^$.*+?()[\]{}|]/g, Dt = RegExp(Nt.source);
function Mt(e, t2, n2) {
  return e.replace(new RegExp((s2 = t2) && Dt.test(s2) ? s2.replace(Nt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Ft = "request", Kt = "response", jt = "both";
const kn = { code: 2e4, message: "System error" }, An = { code: 20101, message: "Invalid client" };
function Cn(e) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e || {};
  return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || kn.code, message: r2 || o2, cause: a2 });
}
let On;
function Nn({ secretType: e } = {}) {
  return e === Ft || e === Kt || e === jt;
}
function Dn({ name: e, data: t2 = {} } = {}) {
  return "DCloud-clientDB" === e && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
}
function Mn({ provider: e, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e2, spaceId: t3 } = {}) {
    const n3 = A;
    if (!n3)
      return {};
    e2 = function(e3) {
      return "tencent" === e3 ? "tcb" : e3;
    }(e2);
    const s3 = n3.find((n4) => n4.provider === e2 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e2, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e2.length; i3++) {
      const o3 = e2[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e3) => e3.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e2 = {}) => e2.appId === s2 && (e2.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), Cn(An);
}
function qn({ functionName: e, result: t2, logPvd: n2 }) {
}
function Fn(e) {
  const t2 = e.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Lt.call(e, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay" }[this.config.provider], i2 = Nn(n3), o2 = Dn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e2) => (e2.errCode = 0, !a2 && qn.call(this, { functionName: s2, result: e2, logPvd: r2 }), Promise.resolve(e2)), (e2) => (!a2 && qn.call(this, { functionName: s2, result: e2, logPvd: r2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e3.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e4 = 1; e4 < a3.length; e4++)
          c2 = Mt(c2, `{$${e4}}`, a3[e4]);
        for (const e4 in t3)
          c2 = Mt(c2, `{${e4}}`, t3[e4]);
        return "replace" === o3 ? c2 : e3 + c2;
      }
      return e3;
    }({ message: `[${n3.name}]: ${e2.message}`, formatter: Ut, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
  };
  e.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, o2 = n2, o2 = o2.bind(e), Dn(t3))
      a2 = n2.call(e, t3);
    else if (Nn(t3)) {
      a2 = new On({ secretType: t3.secretType, uniCloudIns: e }).wrapEncryptDataCallFunction(n2.bind(e))(t3);
    } else if (Mn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new On({ secretType: t3.secretType, uniCloudIns: e }).wrapVerifyClientCallFunction(n2.bind(e))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
  };
}
On = class {
  constructor() {
    throw Cn({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Kn = Symbol("CLIENT_DB_INTERNAL");
function jn(e, t2) {
  return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Kn, e.inspect = null, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e2[n2];
    if (n2 in e2 || "string" != typeof n2) {
      const t3 = e2[n2];
      return "function" == typeof t3 ? t3.bind(e2) : t3;
    }
    return t2.get(e2, n2, s2);
  } });
}
function $n(e) {
  return { on: (t2, n2) => {
    e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
  }, off: (t2, n2) => {
    e[t2] = e[t2] || [];
    const s2 = e[t2].indexOf(n2);
    -1 !== s2 && e[t2].splice(s2, 1);
  } };
}
const Bn = ["db.Geo", "db.command", "command.aggregate"];
function Wn(e, t2) {
  return Bn.indexOf(`${e}.${t2}`) > -1;
}
function Hn(e) {
  switch (f(e = se(e))) {
    case "array":
      return e.map((e2) => Hn(e2));
    case "object":
      return e._internalType === Kn || Object.keys(e).forEach((t2) => {
        e[t2] = Hn(e[t2]);
      }), e;
    case "regexp":
      return { $regexp: { source: e.source, flags: e.flags } };
    case "date":
      return { $date: e.toISOString() };
    default:
      return e;
  }
}
function zn(e) {
  return e && e.content && e.content.$method;
}
class Jn {
  constructor(e, t2, n2) {
    this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e = this;
    const t2 = [e.content];
    for (; e.prevStage; )
      e = e.prevStage, t2.push(e.content);
    return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: Hn(e2.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e = this.toJSON().$db.find((e2) => "action" === e2.$method);
    return e && e.$param && e.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e) => "action" !== e.$method) };
  }
  get isAggregate() {
    let e = this;
    for (; e; ) {
      const t2 = zn(e), n2 = zn(e.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e = e.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e = this;
    for (; e; ) {
      if ("command" === zn(e))
        return true;
      e = e.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e = this;
    for (; e; ) {
      const t2 = zn(e), n2 = zn(e.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e = e.prevStage;
    }
    return false;
  }
  getNextStageFn(e) {
    const t2 = this;
    return function() {
      return Gn({ $method: e, $param: Hn(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e, $param: Hn(t2) }), S)
      ;
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function Gn(e, t2, n2) {
  return jn(new Jn(e, t2, n2), { get(e2, t3) {
    let s2 = "db";
    return e2 && e2.content && (s2 = e2.content.$method), Wn(s2, t3) ? Gn({ $method: t3 }, e2, n2) : function() {
      return Gn({ $method: t3, $param: Hn(Array.from(arguments)) }, e2, n2);
    };
  } });
}
function Vn({ path: e, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
function Yn(e, t2 = {}) {
  return jn(new e(t2), { get: (e2, t3) => Wn("db", t3) ? Gn({ $method: t3 }, null, e2) : function() {
    return Gn({ $method: t3, $param: Hn(Array.from(arguments)) }, null, e2);
  } });
}
class Qn extends class {
  constructor({ uniClient: e = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = $n(this._authCallBacks)), this._isJQL = t2, Object.assign(this, $n(this._dbCallBacks)), this.env = jn({}, { get: (e2, t3) => ({ $env: t3 }) }), this.Geo = jn({}, { get: (e2, t3) => Vn({ path: ["Geo"], method: t3 }) }), this.serverDate = Vn({ path: [], method: "serverDate" }), this.RegExp = Vn({ path: [], method: "RegExp" });
  }
  getCloudEnv(e) {
    if ("string" != typeof e || !e.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e.replace("$cloudEnv_", "") };
  }
  _callback(e, t2) {
    const n2 = this._dbCallBacks;
    n2[e] && n2[e].forEach((e2) => {
      e2(...t2);
    });
  }
  _callbackAuth(e, t2) {
    const n2 = this._authCallBacks;
    n2[e] && n2[e].forEach((e2) => {
      e2(...t2);
    });
  }
  multiSend() {
    const e = Array.from(arguments), t2 = e.map((e2) => {
      const t3 = e2.getAction(), n2 = e2.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e });
  }
} {
  _parseResult(e) {
    return this._isJQL ? e.result : e;
  }
  _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e2, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e2.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e2) {
      return i2._callback("error", [e2]), M(q(o2, "fail"), e2).then(() => M(q(o2, "complete"), e2)).then(() => (r2(null, e2), Y(j, { type: W, content: e2 }), Promise.reject(e2)));
    }
    const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e2.result;
      if (u3)
        for (let e3 = 0; e3 < u3.length; e3++) {
          const { level: t4, message: n4, detail: s4 } = u3[e3], r3 = console["warn" === t4 ? "error" : t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new te({ code: t3, message: n3, requestId: e2.requestId }));
      }
      e2.result.errCode = e2.result.errCode || e2.result.code, e2.result.errMsg = e2.result.errMsg || e2.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e2.result) {
          const t5 = e2.result[n4];
          Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e3) {
        return M(q(o2, "success"), e3).then(() => M(q(o2, "complete"), e3)).then(() => {
          r2(e3, null);
          const t4 = i2._parseResult(e3);
          return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
        });
      }(e2);
    }, (e2) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new te({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
    });
  }
}
const Xn = "token无效，跳转登录页面", Zn = "token过期，跳转登录页面", es = { TOKEN_INVALID_TOKEN_EXPIRED: Zn, TOKEN_INVALID_INVALID_CLIENTID: Xn, TOKEN_INVALID: Xn, TOKEN_INVALID_WRONG_TOKEN: Xn, TOKEN_INVALID_ANONYMOUS_USER: Xn }, ts = { "uni-id-token-expired": Zn, "uni-id-check-token-failed": Xn, "uni-id-token-not-exist": Xn, "uni-id-check-device-feature-failed": Xn };
function ns(e, t2) {
  let n2 = "";
  return n2 = e ? `${e}/${t2}` : t2, n2.replace(/^\//, "");
}
function ss(e = [], t2 = "") {
  const n2 = [], s2 = [];
  return e.forEach((e2) => {
    true === e2.needLogin ? n2.push(ns(t2, e2.path)) : false === e2.needLogin && s2.push(ns(t2, e2.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function rs(e) {
  return e.split("?")[0].replace(/^\//, "");
}
function is() {
  return function(e) {
    let t2 = e && e.$page && e.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e = getCurrentPages();
    return e[e.length - 1];
  }());
}
function os() {
  return rs(is());
}
function as(e = "", t2 = {}) {
  if (!e)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = rs(e);
  return n2.some((e2) => e2.pagePath === s2);
}
const cs = !!pagesJson.uniIdRouter;
const { loginPage: us, routerNeedLogin: hs, resToLogin: ls, needLoginPage: ds, notNeedLoginPage: ps, loginPageInTabBar: fs } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = pagesJson) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ss(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e = []) {
    const t3 = [], n3 = [];
    return e.forEach((e2) => {
      const { root: s3, pages: r3 = [] } = e2, { needLoginPage: i3, notNeedLoginPage: o3 } = ss(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: as(i2, r2) };
}();
if (ds.indexOf(us) > -1)
  throw new Error(`Login page [${us}] should not be "needLogin", please check your pages.json`);
function gs(e) {
  const t2 = os();
  if ("/" === e.charAt(0))
    return e;
  const [n2, s2] = e.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e2 = 0; e2 < r2.length; e2++) {
    const t3 = r2[e2];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function ms(e) {
  const t2 = rs(gs(e));
  return !(ps.indexOf(t2) > -1) && (ds.indexOf(t2) > -1 || hs.some((t3) => function(e2, t4) {
    return new RegExp(t4).test(e2);
  }(e, t3)));
}
function ys({ redirect: e }) {
  const t2 = rs(e), n2 = rs(us);
  return os() !== n2 && t2 !== n2;
}
function _s({ api: e, redirect: t2 } = {}) {
  if (!t2 || !ys({ redirect: t2 }))
    return;
  const n2 = function(e2, t3) {
    return "/" !== e2.charAt(0) && (e2 = "/" + e2), t3 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2;
  }(us, t2);
  fs ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
  const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
  setTimeout(() => {
    s2[e]({ url: n2 });
  });
}
function ws({ url: e } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e2, tokenExpired: t3 } = re();
    let n3;
    if (e2) {
      if (t3 < Date.now()) {
        const e3 = "uni-id-token-expired";
        n3 = { errCode: e3, errMsg: ts[e3] };
      }
    } else {
      const e3 = "uni-id-check-token-failed";
      n3 = { errCode: e3, errMsg: ts[e3] };
    }
    return n3;
  }();
  if (ms(e) && n2) {
    n2.uniIdRedirectUrl = e;
    if (J($).length > 0)
      return setTimeout(() => {
        Y($, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function vs() {
  !function() {
    const e2 = is(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = ws({ url: e2 });
    t2 || n2 && _s({ api: "redirectTo", redirect: e2 });
  }();
  const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e.length; t2++) {
    const n2 = e[t2];
    uni.addInterceptor(n2, { invoke(e2) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = ws({ url: e2.url });
      return t3 ? e2 : s2 ? (_s({ api: n2, redirect: gs(e2.url) }), false) : e2;
    } });
  }
}
function Is() {
  this.onResponse((e) => {
    const { type: t2, content: n2 } = e;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e2) {
          if ("object" != typeof e2)
            return false;
          const { errCode: t3 } = e2 || {};
          return t3 in ts;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e2) {
          if ("object" != typeof e2)
            return false;
          const { errCode: t3 } = e2 || {};
          return t3 in es;
        }(n2);
    }
    s2 && function(e2 = {}) {
      const t3 = J($);
      Z().then(() => {
        const n3 = is();
        if (n3 && ys({ redirect: n3 }))
          return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e2)) : void (us && _s({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Ss(e) {
  !function(e2) {
    e2.onResponse = function(e3) {
      G(j, e3);
    }, e2.offResponse = function(e3) {
      V(j, e3);
    };
  }(e), function(e2) {
    e2.onNeedLogin = function(e3) {
      G($, e3);
    }, e2.offNeedLogin = function(e3) {
      V($, e3);
    }, cs && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
      vs.call(e2);
    }), ls && Is.call(e2)));
  }(e), function(e2) {
    e2.onRefreshToken = function(e3) {
      G(B, e3);
    }, e2.offRefreshToken = function(e3) {
      V(B, e3);
    };
  }(e);
}
let bs;
const ks = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", As = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ps() {
  const e = re().token || "", t2 = e.split(".");
  if (!e || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(bs(s2).split("").map(function(e2) {
      return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e2) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e2.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
bs = "function" != typeof atob ? function(e) {
  if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !As.test(e))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e += "==".slice(2 - (3 & e.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e.length; )
    t2 = ks.indexOf(e.charAt(i2++)) << 18 | ks.indexOf(e.charAt(i2++)) << 12 | (n2 = ks.indexOf(e.charAt(i2++))) << 6 | (s2 = ks.indexOf(e.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var Ts = n(function(e, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e2, t3) {
    return e2.tempFiles.forEach((e3, n3) => {
      e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
    }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
  }
  function i2(e2, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e3) => {
      if (s3) {
        const t4 = s3(e3);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e3 : t5);
      }
      return e3;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
          const u2 = i3[s5];
          e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e4) {
            e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, r4 && r4(e4);
          } }).then((e4) => {
            u2.url = e4.fileID, s5 < o2 && c2();
          }).catch((e4) => {
            u2.errMsg = e4.errMsg || e4.message, s5 < o2 && c2();
          });
        }
      });
    }(e2, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e2) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e2, function(e3) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e3;
        return new Promise((e4, a2) => {
          uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e4(r2(t5, "image"));
          }, fail(e5) {
            a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e2, function(e3) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e3;
        return new Promise((e4, c2) => {
          uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e4(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e5) {
            c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e2, function(e3) {
        const { count: t4, extension: n3 } = e3;
        return new Promise((e4, i3) => {
          let o2 = uni.chooseFile;
          if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e4(r2(t5));
          }, fail(e5) {
            i3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), Cs = t(Ts);
const xs = "manual";
function Os(e) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e2 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e2.push(this[t2]);
      }), e2;
    }, (e2, t2) => {
      if (this.loadtime === xs)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e2.length; r2++)
        e2[r2] !== t2[r2] && (s2.push(e2[r2]), n2 = true);
      e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e2, t2) {
  }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e2 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e3) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2 = e.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Es(e) {
  return function(t2, n2 = {}) {
    n2 = function(e2, t3 = {}) {
      return e2.customUI = t3.customUI || e2.customUI, e2.parseSystemError = t3.parseSystemError || e2.parseSystemError, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e2.secretMethods = t3.secretMethods), e2;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get: (s3, c2) => function({ fn: e2, interceptorName: t3, getCallbackArgs: n3 } = {}) {
      return async function(...s4) {
        const r3 = n3 ? n3({ params: s4 }) : {};
        let i3, o3;
        try {
          return await M(q(t3, "invoke"), { ...r3 }), i3 = await e2(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
        } catch (e3) {
          throw o3 = e3, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
        } finally {
          await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
        }
      };
    }({ fn: async function s4(...h2) {
      let l2;
      a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
      const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
      "object" == typeof n2.secretMethods && function(e2, t3) {
        const n3 = t3.data.method, s5 = e2.secretMethods || {}, r3 = s5[n3] || s5["*"];
        r3 && (t3.secretType = r3);
      }(n2, d2);
      let p2 = false;
      try {
        l2 = await e.callFunction(d2);
      } catch (e2) {
        p2 = true, l2 = { result: new te(e2) };
      }
      const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
      if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
        let e2 = m2;
        if (p2 && o2) {
          e2 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
        }
        if (a2)
          if ("toast" === i2.type)
            uni.showToast({ title: e2, icon: "none" });
          else {
            if ("modal" !== i2.type)
              throw new Error(`Invalid errorOptions.type: ${i2.type}`);
            {
              const { confirm: t3 } = await async function({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                return new Promise((i3, o3) => {
                  uni.showModal({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e4) {
                    i3(e4);
                  }, fail() {
                    i3({ confirm: false, cancel: true });
                  } });
                });
              }({ title: "提示", content: e2, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
              if (i2.retry && t3)
                return s4(...h2);
            }
          }
        const n3 = new te({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
        throw n3.detail = l2.result, Y(j, { type: z, content: n3 }), n3;
      }
      return Y(j, { type: z, content: l2.result }), l2.result;
    }, interceptorName: "callObject", getCallbackArgs: function({ params: e2 } = {}) {
      return { objectName: t2, methodName: c2, params: e2 };
    } }) });
  };
}
function Ls(e) {
  return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
}
async function Rs({ openid: e, callLoginByWeixin: t2 = false } = {}) {
  Ls(this);
  throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
}
async function Us(e) {
  const t2 = Ls(this);
  return t2.initPromise || (t2.initPromise = Rs.call(this, e)), t2.initPromise;
}
function Ns(e) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return Us.call(e, { openid: t2, callLoginByWeixin: n2 });
  };
}
function Ds(e) {
  const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e]({ ...n2, success(e2) {
        s2(e2);
      }, fail(e2) {
        r2(e2);
      } });
    });
  };
}
class Ms extends class {
  constructor() {
    this._callback = {};
  }
  addListener(e, t2) {
    this._callback[e] || (this._callback[e] = []), this._callback[e].push(t2);
  }
  on(e, t2) {
    return this.addListener(e, t2);
  }
  removeListener(e, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e];
    if (!n2)
      return;
    const s2 = function(e2, t3) {
      for (let n3 = e2.length - 1; n3 >= 0; n3--)
        if (e2[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e, t2) {
    return this.removeListener(e, t2);
  }
  removeAllListener(e) {
    delete this._callback[e];
  }
  emit(e, ...t2) {
    const n2 = this._callback[e];
    if (n2)
      for (let e2 = 0; e2 < n2.length; e2++)
        n2[e2](...t2);
  }
} {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Ds("getSystemInfo")(), Ds("getPushClientId")()]).then(([{ appId: e } = {}, { cid: t2 } = {}] = []) => {
      if (!e)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e) => {
      throw this.emit("error", e), this.close(), e;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e) {
    if ("receive" !== e.type)
      return false;
    const t2 = e && e.data && e.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e) {
    if (!this._isUniCloudSSE(e))
      return;
    const t2 = e && e.data && e.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e = this._payloadQueue.find((e2) => e2.messageId === this._currentMessageId + 1);
      if (!e)
        break;
      this._currentMessageId++, this._parseMessagePayload(e);
    }
  }
  _parseMessagePayload(e) {
    const { action: t2, messageId: n2, message: s2 } = e;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    uni.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    uni.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
function Ks(e) {
  e._initPromiseHub || (e._initPromiseHub = new v({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e2) => {
      setTimeout(() => {
        e2();
      }, n2);
    });
    const s2 = e.auth();
    return t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const js = { tcb: St, tencent: St, aliyun: pe, private: kt, alipay: Et };
let $s = new class {
  init(e) {
    let t2 = {};
    const n2 = js[e.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e), Ks(t2), Fn(t2), function(e2) {
      const t3 = e2.uploadFile;
      e2.uploadFile = function(e3) {
        return t3.call(this, e3);
      };
    }(t2), function(e2) {
      e2.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e2.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = Yn(Qn, { uniClient: e2 });
        return this._database = n3, n3;
      }, e2.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e2.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = Yn(Qn, { uniClient: e2, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e2) {
      e2.getCurrentUserInfo = Ps, e2.chooseAndUploadFile = Cs.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
        return Os(e2);
      } }), e2.SSEChannel = Ms, e2.initSecureNetworkByWeixin = Ns(e2), e2.importObject = Es(e2);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
      if (!t2[e2])
        return;
      const n3 = t2[e2];
      t2[e2] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e2] = function(e3, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e4 = n4 && n4.type || c;
            s2 = e4 !== c;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: u2 } = ee(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e3.call(this, n4)).then((e4) => s2 ? Promise.resolve(e4) : M(q(t3, "success"), e4).then(() => M(q(t3, "complete"), e4)).then(() => (r2 && Y(j, { type: H, content: e4 }), Promise.resolve(e4))), (e4) => s2 ? Promise.reject(e4) : M(q(t3, "fail"), e4).then(() => M(q(t3, "complete"), e4)).then(() => (Y(j, { type: H, content: e4 }), Promise.reject(e4))));
          if (!(o2 || a2 || u2))
            return h2;
          h2.then((e4) => {
            o2 && o2(e4), u2 && u2(e4), r2 && Y(j, { type: H, content: e4 });
          }, (e4) => {
            a2 && a2(e4), u2 && u2(e4), r2 && Y(j, { type: H, content: e4 });
          });
        };
      }(t2[e2], e2).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e = C;
  let t2 = {};
  if (e && 1 === e.length)
    t2 = e[0], $s = $s.init(t2), $s._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e2) => {
      $s[e2] = function() {
        return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  Object.assign($s, { get mixinDatacom() {
    return Os($s);
  } }), Ss($s), $s.addInterceptor = N, $s.removeInterceptor = D, $s.interceptObject = F;
})();
var Bs = $s;
function md5(sMessage) {
  function RotateLeft(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  }
  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 2147483648;
    lY8 = lY & 2147483648;
    lX4 = lX & 1073741824;
    lY4 = lY & 1073741824;
    lResult = (lX & 1073741823) + (lY & 1073741823);
    if (lX4 & lY4)
      return lResult ^ 2147483648 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 1073741824)
        return lResult ^ 3221225472 ^ lX8 ^ lY8;
      else
        return lResult ^ 1073741824 ^ lX8 ^ lY8;
    } else
      return lResult ^ lX8 ^ lY8;
  }
  function F2(x2, y2, z2) {
    return x2 & y2 | ~x2 & z2;
  }
  function G2(x2, y2, z2) {
    return x2 & z2 | y2 & ~z2;
  }
  function H2(x2, y2, z2) {
    return x2 ^ y2 ^ z2;
  }
  function I2(x2, y2, z2) {
    return y2 ^ (x2 | ~z2);
  }
  function FF(a3, b3, c3, d3, x2, s2, ac) {
    a3 = AddUnsigned(a3, AddUnsigned(AddUnsigned(F2(b3, c3, d3), x2), ac));
    return AddUnsigned(RotateLeft(a3, s2), b3);
  }
  function GG(a3, b3, c3, d3, x2, s2, ac) {
    a3 = AddUnsigned(a3, AddUnsigned(AddUnsigned(G2(b3, c3, d3), x2), ac));
    return AddUnsigned(RotateLeft(a3, s2), b3);
  }
  function HH(a3, b3, c3, d3, x2, s2, ac) {
    a3 = AddUnsigned(a3, AddUnsigned(AddUnsigned(H2(b3, c3, d3), x2), ac));
    return AddUnsigned(RotateLeft(a3, s2), b3);
  }
  function II(a3, b3, c3, d3, x2, s2, ac) {
    a3 = AddUnsigned(a3, AddUnsigned(AddUnsigned(I2(b3, c3, d3), x2), ac));
    return AddUnsigned(RotateLeft(a3, s2), b3);
  }
  function ConvertToWordArray(sMessage2) {
    var lWordCount;
    var lMessageLength = sMessage2.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | sMessage2.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a2, b2, c2, d2;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  x = ConvertToWordArray(sMessage);
  a2 = 1732584193;
  b2 = 4023233417;
  c2 = 2562383102;
  d2 = 271733878;
  for (k = 0; k < x.length; k += 16) {
    AA = a2;
    BB = b2;
    CC = c2;
    DD = d2;
    a2 = FF(a2, b2, c2, d2, x[k + 0], S11, 3614090360);
    d2 = FF(d2, a2, b2, c2, x[k + 1], S12, 3905402710);
    c2 = FF(c2, d2, a2, b2, x[k + 2], S13, 606105819);
    b2 = FF(b2, c2, d2, a2, x[k + 3], S14, 3250441966);
    a2 = FF(a2, b2, c2, d2, x[k + 4], S11, 4118548399);
    d2 = FF(d2, a2, b2, c2, x[k + 5], S12, 1200080426);
    c2 = FF(c2, d2, a2, b2, x[k + 6], S13, 2821735955);
    b2 = FF(b2, c2, d2, a2, x[k + 7], S14, 4249261313);
    a2 = FF(a2, b2, c2, d2, x[k + 8], S11, 1770035416);
    d2 = FF(d2, a2, b2, c2, x[k + 9], S12, 2336552879);
    c2 = FF(c2, d2, a2, b2, x[k + 10], S13, 4294925233);
    b2 = FF(b2, c2, d2, a2, x[k + 11], S14, 2304563134);
    a2 = FF(a2, b2, c2, d2, x[k + 12], S11, 1804603682);
    d2 = FF(d2, a2, b2, c2, x[k + 13], S12, 4254626195);
    c2 = FF(c2, d2, a2, b2, x[k + 14], S13, 2792965006);
    b2 = FF(b2, c2, d2, a2, x[k + 15], S14, 1236535329);
    a2 = GG(a2, b2, c2, d2, x[k + 1], S21, 4129170786);
    d2 = GG(d2, a2, b2, c2, x[k + 6], S22, 3225465664);
    c2 = GG(c2, d2, a2, b2, x[k + 11], S23, 643717713);
    b2 = GG(b2, c2, d2, a2, x[k + 0], S24, 3921069994);
    a2 = GG(a2, b2, c2, d2, x[k + 5], S21, 3593408605);
    d2 = GG(d2, a2, b2, c2, x[k + 10], S22, 38016083);
    c2 = GG(c2, d2, a2, b2, x[k + 15], S23, 3634488961);
    b2 = GG(b2, c2, d2, a2, x[k + 4], S24, 3889429448);
    a2 = GG(a2, b2, c2, d2, x[k + 9], S21, 568446438);
    d2 = GG(d2, a2, b2, c2, x[k + 14], S22, 3275163606);
    c2 = GG(c2, d2, a2, b2, x[k + 3], S23, 4107603335);
    b2 = GG(b2, c2, d2, a2, x[k + 8], S24, 1163531501);
    a2 = GG(a2, b2, c2, d2, x[k + 13], S21, 2850285829);
    d2 = GG(d2, a2, b2, c2, x[k + 2], S22, 4243563512);
    c2 = GG(c2, d2, a2, b2, x[k + 7], S23, 1735328473);
    b2 = GG(b2, c2, d2, a2, x[k + 12], S24, 2368359562);
    a2 = HH(a2, b2, c2, d2, x[k + 5], S31, 4294588738);
    d2 = HH(d2, a2, b2, c2, x[k + 8], S32, 2272392833);
    c2 = HH(c2, d2, a2, b2, x[k + 11], S33, 1839030562);
    b2 = HH(b2, c2, d2, a2, x[k + 14], S34, 4259657740);
    a2 = HH(a2, b2, c2, d2, x[k + 1], S31, 2763975236);
    d2 = HH(d2, a2, b2, c2, x[k + 4], S32, 1272893353);
    c2 = HH(c2, d2, a2, b2, x[k + 7], S33, 4139469664);
    b2 = HH(b2, c2, d2, a2, x[k + 10], S34, 3200236656);
    a2 = HH(a2, b2, c2, d2, x[k + 13], S31, 681279174);
    d2 = HH(d2, a2, b2, c2, x[k + 0], S32, 3936430074);
    c2 = HH(c2, d2, a2, b2, x[k + 3], S33, 3572445317);
    b2 = HH(b2, c2, d2, a2, x[k + 6], S34, 76029189);
    a2 = HH(a2, b2, c2, d2, x[k + 9], S31, 3654602809);
    d2 = HH(d2, a2, b2, c2, x[k + 12], S32, 3873151461);
    c2 = HH(c2, d2, a2, b2, x[k + 15], S33, 530742520);
    b2 = HH(b2, c2, d2, a2, x[k + 2], S34, 3299628645);
    a2 = II(a2, b2, c2, d2, x[k + 0], S41, 4096336452);
    d2 = II(d2, a2, b2, c2, x[k + 7], S42, 1126891415);
    c2 = II(c2, d2, a2, b2, x[k + 14], S43, 2878612391);
    b2 = II(b2, c2, d2, a2, x[k + 5], S44, 4237533241);
    a2 = II(a2, b2, c2, d2, x[k + 12], S41, 1700485571);
    d2 = II(d2, a2, b2, c2, x[k + 3], S42, 2399980690);
    c2 = II(c2, d2, a2, b2, x[k + 10], S43, 4293915773);
    b2 = II(b2, c2, d2, a2, x[k + 1], S44, 2240044497);
    a2 = II(a2, b2, c2, d2, x[k + 8], S41, 1873313359);
    d2 = II(d2, a2, b2, c2, x[k + 15], S42, 4264355552);
    c2 = II(c2, d2, a2, b2, x[k + 6], S43, 2734768916);
    b2 = II(b2, c2, d2, a2, x[k + 13], S44, 1309151649);
    a2 = II(a2, b2, c2, d2, x[k + 4], S41, 4149444226);
    d2 = II(d2, a2, b2, c2, x[k + 11], S42, 3174756917);
    c2 = II(c2, d2, a2, b2, x[k + 2], S43, 718787259);
    b2 = II(b2, c2, d2, a2, x[k + 9], S44, 3951481745);
    a2 = AddUnsigned(a2, AA);
    b2 = AddUnsigned(b2, BB);
    c2 = AddUnsigned(c2, CC);
    d2 = AddUnsigned(d2, DD);
  }
  var temp = WordToHex(a2) + WordToHex(b2) + WordToHex(c2) + WordToHex(d2);
  return temp.toLowerCase();
}
function toFriendlyTime(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const date = new Date(timestamp);
  const secondsAgo = Math.floor((now - date) / 1e3);
  if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    if (secondsAgo < 60) {
      return "刚刚";
    }
    if (secondsAgo < 60 * 60) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes}分钟前`;
    }
    if (secondsAgo < 60 * 60 * 2) {
      const hours = Math.floor(secondsAgo / (60 * 60));
      const minutes = Math.floor((secondsAgo - hours * 60 * 60) / 60);
      return `${hours}小时 ${minutes}分钟前`;
    }
    const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
    const hour2 = date.getHours() % 12 || 12;
    const minute2 = date.getMinutes().toString().padStart(2, "0");
    return `${ampm2} ${hour2}:${minute2}`;
  }
  const oneDayMs = 24 * 60 * 60 * 1e3;
  if (now - date < oneDayMs * 2) {
    if (date.getDate() === now.getDate() - 1 && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
      const hour2 = date.getHours() % 12 || 12;
      const minute2 = date.getMinutes().toString().padStart(2, "0");
      return `昨天 ${ampm2} ${hour2}:${minute2}`;
    } else {
      const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
      const hour2 = date.getHours() % 12 || 12;
      const minute2 = date.getMinutes().toString().padStart(2, "0");
      return `前天 ${ampm2} ${hour2}:${minute2}`;
    }
  }
  const oneWeekMs = oneDayMs * 7;
  const diffMs = now - date;
  if (diffMs < oneWeekMs) {
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
    const hour2 = date.getHours() % 12 || 12;
    const minute2 = date.getMinutes().toString().padStart(2, "0");
    return `${days[date.getDay()]} ${ampm2} ${hour2}:${minute2}`;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "下午" : "上午";
  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${ampm} ${hour}:${minute}`;
}
let onAppShowCallback = [], onAppHideCallback = [];
const appEvent = {
  appShowIndex: 0,
  appHideIndex: 0,
  onAppShow(callback) {
    this.appShowIndex++;
    if (typeof callback == "function") {
      onAppShowCallback.push(callback);
    }
    onAppShowCallback.forEach((fun) => fun());
  },
  onAppHide(callback) {
    this.appHideIndex++;
    if (typeof callback == "function") {
      onAppHideCallback.push(callback);
    }
    onAppHideCallback.forEach((fun) => fun());
  }
};
setTimeout(() => {
  onShow(function() {
    appEvent.onAppShow();
  }, getApp().$vm.$);
  onHide(function() {
    appEvent.onAppHide();
  }, getApp().$vm.$);
}, 0);
const uniIdCo$1 = Bs.importObject("uni-id-co");
const db$3 = Bs.database();
const usersTable = db$3.collection("uni-id-users");
let hostUserInfo = uni.getStorageSync("uni-id-pages-userInfo") || {};
const data = {
  userInfo: hostUserInfo,
  hasLogin: Object.keys(hostUserInfo).length != 0
};
const mutations = {
  // data不为空，表示传递要更新的值(注意不是覆盖是合并),什么也不传时，直接查库获取更新
  async updateUserInfo(data2 = false) {
    if (data2) {
      usersTable.where("_id==$env.uid").update(data2).then((e) => {
        if (e.result.updated) {
          uni.showToast({
            title: "更新成功",
            icon: "none",
            duration: 3e3
          });
          this.setUserInfo(data2);
        } else {
          uni.showToast({
            title: "没有改变",
            icon: "none",
            duration: 3e3
          });
        }
      });
    } else {
      const uniIdCo2 = Bs.importObject("uni-id-co", {
        customUI: true
      });
      try {
        let res = await usersTable.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();
        const realNameRes = await uniIdCo2.getRealNameInfo();
        this.setUserInfo({
          ...res.result.data[0],
          realNameAuth: realNameRes
        });
      } catch (e) {
        this.setUserInfo({}, { cover: true });
        formatAppLog("error", "at uni_modules/uni-id-pages/common/store.js:57", e.message, e.errCode);
      }
    }
  },
  async setUserInfo(data2, { cover } = { cover: false }) {
    let userInfo = cover ? data2 : Object.assign(store.userInfo, data2);
    store.userInfo = Object.assign({}, userInfo);
    store.hasLogin = Object.keys(store.userInfo).length != 0;
    uni.setStorageSync("uni-id-pages-userInfo", store.userInfo);
    return data2;
  },
  async logout() {
    if (Bs.getCurrentUserInfo().tokenExpired > Date.now()) {
      try {
        await uniIdCo$1.logout();
      } catch (e) {
        formatAppLog("error", "at uni_modules/uni-id-pages/common/store.js:76", e);
      }
    }
    uni.removeStorageSync("uni_id_token");
    uni.setStorageSync("uni_id_token_expired", 0);
    uni.redirectTo({
      url: `/${pagesJson.uniIdRouter && pagesJson.uniIdRouter.loginPage ? pagesJson.uniIdRouter.loginPage : "uni_modules/uni-id-pages/pages/login/login-withoutpwd"}`
    });
    uni.$emit("uni-id-pages-logout");
    this.setUserInfo({}, { cover: true });
  },
  loginBack(e = {}) {
    const { uniIdRedirectUrl = "" } = e;
    let delta = 0;
    let pages2 = getCurrentPages();
    pages2.forEach((page, index) => {
      if (pages2[pages2.length - index - 1].route.split("/")[3] == "login") {
        delta++;
      }
    });
    if (uniIdRedirectUrl) {
      return uni.redirectTo({
        url: uniIdRedirectUrl,
        fail: (err1) => {
          uni.switchTab({
            url: uniIdRedirectUrl,
            fail: (err2) => {
              formatAppLog("log", "at uni_modules/uni-id-pages/common/store.js:106", err1, err2);
            }
          });
        }
      });
    }
    if (delta) {
      const page = pagesJson.pages[0];
      return uni.reLaunch({
        url: `/${page.path}`
      });
    }
    uni.navigateBack({
      delta
    });
  },
  loginSuccess(e = {}) {
    const {
      showToast = true,
      toastText = "登录成功",
      autoBack = true,
      uniIdRedirectUrl = "",
      passwordConfirmed
    } = e;
    if (showToast) {
      uni.showToast({
        title: toastText,
        icon: "none",
        duration: 3e3
      });
    }
    this.updateUserInfo();
    uni.$emit("uni-id-pages-login-success");
    if (autoBack) {
      this.loginBack({ uniIdRedirectUrl });
    }
  }
};
const store = reactive(data);
const db$2 = Bs.database();
const dbCmd = db$2.command;
class Message {
  constructor(currentConversation) {
    this.indexDB = false;
    this.isInit = false;
    this.msgList = [];
    this.getMore = async () => {
      if (this.cloudMsg.hasAfterStorage) {
        let minTime = await this.localMsgMaxTime(), maxTime = this.msgListMinTime();
        let data2 = await this.cloudMsg.get({ minTime, maxTime });
        if (data2.length) {
          return data2;
        } else {
          this.cloudMsg.hasAfterStorage = false;
          return this.getMore();
        }
      } else if (this.localMsg.hasBeforeList) {
        let maxTime = this.msgListMinTime();
        let data2 = await this.localMsg.get({
          maxTime
        });
        if (data2.length) {
          return data2;
        } else {
          this.localMsg.hasBeforeList = false;
          return this.getMore();
        }
      }
      if (this.cloudMsg.hasBeforeStorage) {
        let maxTime = this.msgList[0] ? this.msgList[0].create_time : false;
        let data2 = await this.cloudMsg.get({
          maxTime
        });
        if (data2.length) {
          return data2;
        } else {
          this.cloudMsg.hasBeforeStorage = false;
          return [];
        }
      }
    };
    this.cloudMsg = {
      hasAfterStorage: true,
      hasBeforeStorage: true,
      get: async ({
        minTime = 0,
        maxTime = false,
        limit = 30
      } = {}) => {
        let where = {
          "conversation_id": this.conversation_id
        };
        if (minTime && maxTime) {
          where.create_time = dbCmd.and([
            dbCmd.gt(minTime),
            dbCmd.lt(maxTime)
          ]);
        } else {
          if (minTime) {
            where.create_time = dbCmd.gt(minTime);
          }
          if (maxTime) {
            where.create_time = dbCmd.lt(maxTime);
          }
        }
        const msgTable = db$2.collection("uni-im-msg");
        let data2;
        try {
          let res = await msgTable.where(where).limit(limit).orderBy("create_time", "desc").get();
          data2 = res.result.data.reverse();
        } catch (e) {
          data2 = [];
        }
        if (data2.length) {
          this.localMsg.add(data2, minTime === 0 ? "unshift" : "push");
        }
        return data2;
      }
    };
    this.localMsg = {
      maxTime: false,
      hasBeforeList: true,
      get: async ({
        minTime = 0,
        maxTime = false,
        limit = 30,
        orderBy = { "create_time": "asc" }
        //asc 升序，desc 降序
      } = {}) => {
        let sql = `select * from msg WHERE conversation_id = "${this.conversation_id}" `;
        if (maxTime || minTime) {
          if (maxTime) {
            sql += `AND create_time < ${maxTime} `;
          }
          if (minTime) {
            sql += `AND create_time > ${minTime} `;
          }
        }
        sql += `ORDER BY "create_time" DESC `;
        if (limit) {
          sql += `LIMIT ${limit} `;
        }
        let datas = [];
        try {
          datas = await this.sqlite.selectSql(sql);
        } catch (e) {
          formatAppLog("error", "at uni_modules/uni-im/lib/MsgManager.js:208", e);
        }
        return datas.map((data2) => {
          try {
            let mapData = {
              "&quot;": '"',
              "&#39;": "'",
              "&lt;": "<",
              "&gt;": ">",
              "&amp;": "&"
            };
            Object.keys(mapData).forEach((key) => {
              data2.body = data2.body.replace(new RegExp(key, "g"), mapData[key]);
            });
            data2.body = JSON.parse(data2.body);
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-im/lib/MsgManager.js:228", e);
          }
          return data2;
        }).sort((a2, b2) => {
          if (orderBy.create_time == "asc") {
            return a2.create_time - b2.create_time;
          } else {
            return b2.create_time - a2.create_time;
          }
        });
      },
      add: async (datas, action = "push") => {
        if (!Array.isArray(datas)) {
          datas = [datas];
        }
        datas.forEach(async (data2) => {
          data2.unique_id = md5(JSON.stringify(data2) + Math.random());
        });
        let sql = [];
        datas.forEach(async (data2) => {
          let keys = Object.keys(data2);
          let str = keys.reduce((sum, key) => {
            if (key == "body") {
              let body = JSON.stringify(data2.body);
              try {
                body = escapeHtml(body);
              } catch (e) {
                formatAppLog("error", "at uni_modules/uni-im/lib/MsgManager.js:342", e);
              }
              sum += `"${body}",`;
            } else if (typeof data2[key] == "string") {
              sum += `"${data2[key]}",`;
            } else if (typeof data2[key] == "undefined") {
              sum += `${null},`;
            } else {
              sum += `${data2[key]},`;
            }
            return sum;
          }, "").slice(0, -1);
          sql.push(`insert into msg("${keys.join('","')}") values (${str})`);
        });
        if (sql.length) {
          try {
            await this.sqlite.executeSql(sql);
          } catch (e) {
            formatAppLog("log", "at uni_modules/uni-im/lib/MsgManager.js:360", e);
          }
        }
        let maxTime = datas.map((i2) => i2.create_time).sort((a2, b2) => b2 - a2)[0];
        let localMsgMaxTime = await this.localMsgMaxTime();
        if (maxTime > await localMsgMaxTime) {
          this.localMsg.maxTime = maxTime;
        }
      },
      update: async (unique_id, data2) => {
        data2 = Object.assign({}, data2);
        let dataStr = "";
        for (let key in data2) {
          dataStr += `"${key}" = `;
          if (key == "body") {
            let body = JSON.stringify(data2.body);
            try {
              body = escapeHtml(body);
            } catch (e) {
              formatAppLog("error", "at uni_modules/uni-im/lib/MsgManager.js:429", e);
            }
            dataStr += `"${body}",`;
          } else if (typeof data2[key] == "string") {
            dataStr += `"${data2[key]}",`;
          } else if (typeof data2[key] == "undefined") {
            dataStr += `${null},`;
          } else {
            dataStr += `${data2[key]},`;
          }
        }
        let sql = `UPDATE msg SET ${dataStr.slice(0, -1)} WHERE unique_id = "${unique_id}"`;
        try {
          await this.sqlite.executeSql(sql);
        } catch (e) {
          formatAppLog("log", "at uni_modules/uni-im/lib/MsgManager.js:444", e);
        }
      }
    };
    this.sqlite = getApp().globalData.sqlite;
    this.conversation_id = currentConversation.id;
    Object.defineProperty(this, "msgList", {
      get() {
        if (currentConversation.isInit) {
          return currentConversation.msgList;
        } else {
          return [];
        }
      },
      set(data2) {
        currentConversation.msgList = data2;
      }
    });
  }
  async sleep(t2) {
    return await new Promise((resolve, rejece) => {
      setTimeout(resolve, t2);
    });
  }
  async localMsgMaxTime() {
    if (this.localMsg.maxTime === false) {
      let lastLocalDatas = await this.localMsg.get({ limit: 1, orderBy: { "create_time": "desc" } });
      let [lastLocalData] = lastLocalDatas;
      if (lastLocalData) {
        this.localMsg.maxTime = lastLocalData.create_time;
      } else {
        this.localMsg.maxTime = 0;
      }
    }
    return this.localMsg.maxTime;
  }
  msgListMinTime() {
    let item = this.msgList[0];
    if (item) {
      return item.create_time;
    } else {
      return 0;
    }
  }
}
var matchHtmlRegExp = /["'&<>]/;
function escapeHtml(string) {
  var str = "" + string;
  var match = matchHtmlRegExp.exec(str);
  if (!match) {
    return str;
  }
  var escape2;
  var html = "";
  var index = 0;
  var lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape2 = "&quot;";
        break;
      case 38:
        escape2 = "&amp;";
        break;
      case 39:
        escape2 = "&#39;";
        break;
      case 60:
        escape2 = "&lt;";
        break;
      case 62:
        escape2 = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escape2;
  }
  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
function createObservable(data2, name = "imObservableData") {
  if (typeof uni[name] == "undefined") {
    data2 = reactive(data2);
    uni[name] = data2;
  }
  return uni[name];
}
const db$1 = Bs.database();
const uniImCo = Bs.importObject("uni-im-co", {
  customUI: true
});
function current_uid() {
  return Bs.getCurrentUserInfo().uid;
}
const state = createObservable({
  // 会话数据
  conversation: {
    dataList: [],
    hasMore: true,
    loading: false
    // 加锁防止意外重复请求时出错
  },
  // 正在对话的会话id
  currentConversationId: false,
  // 全局响应式心跳，用于更新消息距离当前时长 等
  heartbeat: "",
  // 好友列表
  friend: {
    dataList: [],
    hasMore: true
  },
  // 群列表
  group: {
    dataList: [],
    hasMore: true
  },
  // 系统通知消息
  notification: {
    dataList: [],
    hasMore: true
  },
  //存储所有出现过的用户信息，包括群好友信息
  usersInfo: {},
  //是否为pc宽屏
  isWidescreen: false,
  //系统信息
  systemInfo: {},
  indexDB: false,
  audioContext: false,
  // sqlite数据库是否已经打开
  dataBaseIsOpen: false,
  // 记录socket连接次数（用于处理，断开重连）
  socketOpenIndex: 0
});
const methods = {
  /**
   * 会话对象
   * data:会话对象数据模型（conversationDatas是原始数据，data为经过转化的数据）
   * loadMore：加载更多数据方法
   */
  conversation: {
    // 撤回消息，参数： 消息id 会话id ，操作者id
    async revokeMsg({
      msg_id,
      _id,
      conversation_id,
      user_id = false,
      create_time
    }) {
      if (_id) {
        msg_id = _id;
      }
      if (!user_id) {
        try {
          let res = await uniImCo.revokeMsg(msg_id);
        } catch (err) {
          formatAppLog("log", "at uni_modules/uni-im/lib/main.js:88", "err", err);
          return uni.showToast({
            title: err.message,
            icon: "none"
          });
        }
      }
      let conversation = await this.get(conversation_id);
      let msgList = conversation.msgList;
      let index = msgList.findIndex((item) => item._id == msg_id);
      if (index != -1) {
        let msg = msgList[index];
        msg.is_revoke = true;
        msg.body = "[此消息已被撤回]";
        conversation.msgList.splice(index, 1, Object.assign({}, msg));
      }
      let localMsgs = await conversation.msgManager.localMsg.get({
        "minTime": create_time - 1,
        "maxTime": create_time + 1
      });
      let localMsg = localMsgs.find((item) => item._id == msg_id);
      if (localMsg) {
        localMsg.is_revoke = true;
        localMsg.body = "[此消息已被撤回]";
        conversation.msgManager.localMsg.update(localMsg.unique_id, localMsg);
      }
    },
    async get(param) {
      let conversationId = false;
      if (param) {
        if (typeof param == "object") {
          let {
            friend_uid,
            user_id,
            group_id,
            conversation_id
          } = param;
          conversationId = conversation_id;
          if (user_id) {
            friend_uid = user_id;
            param.friend_uid = user_id;
          }
          if (!conversationId) {
            if (!group_id && !friend_uid) {
              formatAppLog("log", "at uni_modules/uni-im/lib/main.js:146", "param---------", param);
              throw new Error("会话对象不详，请检查参数", param);
            }
            conversationId = uniImUtils.getConversationId(friend_uid || group_id, friend_uid ? "single" : "group");
          }
        } else if (typeof param == "string") {
          conversationId = param;
        } else {
          throw new Error("会话对象不详，请检查参数", param);
        }
      }
      let conversationDatas = state.conversation.dataList;
      if (conversationId) {
        conversationDatas = conversationDatas.filter((i2) => i2.id == conversationId);
        if (conversationDatas.length == 0) {
          let conversationData = await this.loadMore(conversationId);
          if (conversationData) {
            conversationDatas = [conversationData];
          } else {
            if (param.group_id) {
              throw new Error("未找到此群会话");
            }
            if (typeof param != "object") {
              formatAppLog("log", "at uni_modules/uni-im/lib/main.js:170", "param", param);
              throw new Error("参数错误");
            }
            if (!param.user_info) {
              let res = await Bs.database().collection("uni-id-users").doc(param.friend_uid).field("_id,nickname,avatar_file").get();
              formatAppLog("log", "at uni_modules/uni-im/lib/main.js:180", "user_info", res);
              param.user_info = res.result.data[0];
              if (!param.user_info) {
                throw new Error("用户查找失败");
              }
            }
            let conversationData2 = {
              group_id: param.group_id,
              friend_uid: param.friend_uid,
              unread_count: 0
            };
            try {
              const db2 = Bs.database();
              let res = await db2.collection("uni-im-conversation").add(conversationData2);
            } catch (e) {
              throw new Error(e);
            }
            conversationData2 = Object.assign(conversationData2, {
              user_id: current_uid(),
              id: conversationId,
              user_info: param.user_info,
              type: param.friend_uid ? 1 : 2,
              msgList: [],
              update_time: Date.now()
            });
            this.add(conversationData2);
            conversationDatas.push(conversationData2);
          }
        }
      }
      if (conversationId) {
        let conversationData = conversationDatas[0];
        if (conversationData.group_id && Object.keys(conversationData.group_member).length == 0) {
          let res = await db$1.collection(
            db$1.collection("uni-im-group-member").where({
              group_id: conversationData.group_id
            }).getTemp(),
            db$1.collection("uni-id-users").field("_id,nickname,avatar_file").getTemp()
          ).limit(1e3).get();
          let group_member = {};
          res.result.data.forEach((item) => {
            let usersInfo = item.user_id[0];
            group_member[usersInfo._id] = usersInfo;
          });
          methods.mergeUsersInfo(group_member);
          conversationData.group_member = group_member;
        }
        if (!conversationData.isInit) {
          conversationData.msgManager = new Message(conversationData);
        }
        return conversationData;
      } else {
        return conversationDatas;
      }
    },
    async loadMore(conversation_id) {
      if (!conversation_id) {
        if (state.conversation.loading) {
          return [];
        } else {
          state.conversation.loading = true;
        }
      }
      let conversationDatas = await this.get();
      let lastConversation = conversationDatas[conversationDatas.length - 1];
      let maxUpdateTime = lastConversation ? lastConversation.update_time : "";
      if (conversation_id) {
        maxUpdateTime = "";
      }
      let res = {
        data: []
      };
      try {
        res = await uniImCo.getConversationList({
          maxUpdateTime,
          limit: 30,
          conversation_id
        });
      } catch (e) {
        formatAppLog("log", "at uni_modules/uni-im/lib/main.js:286", e);
        if (!conversation_id) {
          state.conversation.loading = false;
        }
      }
      if (res.data.length) {
        this.add(res.data);
      }
      if (!conversation_id) {
        state.conversation.loading = false;
        state.conversation.hasMore = res.data.length == 30;
        let whereString = "user_id == $cloudEnv_uid";
        let group_ids = res.data.filter((item) => item.group_id).map((i2) => i2.group_id) || [];
        if (group_ids.length) {
          whereString = `(user_id == $cloudEnv_uid || "group_id" in ${JSON.stringify(group_ids)})`;
        }
        let lastTaskTime = uni.getStorageSync("uni-im-lastTaskTime");
        if (lastTaskTime) {
          whereString += `&& "create_time" > ${lastTaskTime}`;
        }
        db$1.collection("uni-im-task").where(whereString).orderBy("create_time desc").get().then((e) => {
          if (e.result.data.length) {
            e.result.data.forEach((item) => {
              if (item.type == "revoke_msg") {
                this.revokeMsg(item.payload);
              }
            });
            uni.setStorageSync("uni-im-lastTaskTime", e.result.data[0].create_time);
          }
        }).catch((e) => {
          formatAppLog("error", "at uni_modules/uni-im/lib/main.js:333", e);
        });
        return res.data;
      } else {
        return res.data[0];
      }
    },
    add(data2) {
      if (!Array.isArray(data2)) {
        data2 = [data2];
      }
      data2.forEach((item) => {
        if (Array.isArray(item.user_info)) {
          item.user_info = item.user_info[0];
        }
        if (Array.isArray(item.group_info)) {
          item.group_info = item.group_info[0];
          if (item.group_id) {
            if (!item.group_member) {
              item.group_member = {};
            }
            if (item.group_info.introduction === void 0) {
              item.group_info.introduction = "";
            }
            if (item.group_info.avatar_file === void 0) {
              item.group_info.avatar_file = {
                url: ""
              };
            }
          }
        }
        item = Object.assign(item, {
          isInit: false,
          title: "",
          chatText: "",
          avatar_file: {},
          call_list: []
        });
        if (item.user_info) {
          Object.defineProperties(item, {
            title: {
              get() {
                return item.user_info.nickname;
              }
            },
            avatar_file: {
              get() {
                return item.user_info.avatar_file;
              }
            },
            group_info: {
              value: false
            }
          });
        } else if (item.group_info) {
          Object.defineProperties(item, {
            title: {
              get() {
                return item.group_info.name;
              }
            },
            avatar_file: {
              get() {
                return item.group_info.avatar_file;
              }
            },
            user_info: {
              value: false
            }
          });
        } else {
          formatAppLog("error", "at uni_modules/uni-im/lib/main.js:412", "会话列表失效，疑似关联用户/群被删除(请改为软删除避免系统异常）：", JSON.stringify(item));
        }
        let update_time = item.update_time;
        Object.defineProperties(item, {
          last_msg_note: {
            get() {
              let last_msg_note = "暂无记录";
              let last_msg = item.msgList[item.msgList.length - 1];
              if (item.chatText && state.currentConversationId != item.id) {
                last_msg = {
                  body: "[uni-im-draft]" + item.chatText,
                  type: "text",
                  create_time: Date.now()
                };
              }
              if (last_msg) {
                last_msg_note = "[多媒体]";
                if (last_msg.type == "text") {
                  last_msg_note = last_msg.body.toString();
                  last_msg_note = last_msg_note.replace(/[\r\n]/g, "");
                  last_msg_note = last_msg_note.slice(0, 30);
                }
                if (last_msg.is_revoke) {
                  last_msg_note = "消息已被撤回";
                }
                if (last_msg.is_delete) {
                  last_msg_note = "消息已被删除";
                }
              }
              return last_msg_note;
            }
          },
          update_time: {
            get() {
              let last_msg = item.msgList[item.msgList.length - 1];
              if (last_msg) {
                return last_msg.create_time;
              } else {
                return update_time;
              }
            }
          }
        });
        let {
          user_info,
          group_member
        } = item;
        let usersInfo = {};
        if (user_info) {
          usersInfo[user_info._id] = user_info;
        }
        methods.mergeUsersInfo(usersInfo);
        item.msgManager = new Message(item);
        let initMsg = (msgList) => {
          for (let i2 = 0; i2 < msgList.length; i2++) {
            let msg = msgList[i2];
            if (msg && typeof msg == "object") {
              if (!("is_delete" in msg)) {
                msg.is_delete = false;
              }
            }
          }
          let methodsList = ["push", "unshift"];
          methodsList.forEach((methods2) => {
            msgList[methods2] = function() {
              initMsg(arguments);
              Array.prototype[methods2].apply(this, arguments);
            };
          });
          return msgList;
        };
        initMsg(item.msgList);
        item.msgList.clear = function() {
          this.length = 0;
        };
        Object.defineProperty(item, "msgList", {
          writable: false
        });
        if (!state.conversation.dataList.find((conversation) => conversation.id == item.id)) {
          state.conversation.dataList.push(item);
        }
      });
      uni.setStorage({
        key: "uni-im-conversation_uid:" + current_uid(),
        data: state.conversation
      });
      return data2;
    },
    // 统计所有消息的未读数
    unreadCount() {
      let conversationDatas = state.conversation.dataList;
      return conversationDatas.reduce((sum, item, index, array) => sum + item.unread_count, 0);
    },
    remove(id) {
      let index = state.conversation.dataList.findIndex((i2) => i2.id == id);
      state.conversation.dataList.splice(index, 1);
    }
  },
  /**
   * 系统消息
   */
  notification: {
    get: ({
      type,
      excludeType
    } = {}) => {
      const notificationDatas = state.notification.dataList;
      if (notificationDatas) {
        return notificationDatas.reduce((sum, item) => {
          if (type) {
            typeof type == "string" ? type = [type] : "";
            if (type.includes(item.payload.subType)) {
              sum.push(item);
            }
          } else if (excludeType) {
            typeof excludeType == "string" ? excludeType = [excludeType] : "";
            if (!excludeType.includes(item.payload.subType)) {
              sum.push(item);
            }
          } else {
            sum.push(item);
          }
          return sum;
        }, []);
      } else {
        return false;
      }
    },
    async loadMore() {
      let res = await db$1.collection("uni-im-notification").aggregate().match('"payload.type" == "uni-im-notification" && "user_id" == $cloudEnv_uid').sort({
        create_time: -1
      }).limit(1e3).end();
      this.add(res.result.data);
      this.hasMore == (res.result.data.length != 0);
    },
    add(datas) {
      if (!Array.isArray(datas)) {
        datas = [datas];
      }
      let notificationDatas = datas.concat(state.notification.dataList);
      notificationDatas.sort((a2, b2) => a2.create_time - b2.create_time);
      let obj = {};
      for (var i2 = 0; i2 < notificationDatas.length; i2++) {
        let item = notificationDatas[i2];
        let {
          subType,
          unique
        } = item.payload;
        obj[unique ? subType + "_" + unique : Date.now() + "_" + i2] = item;
      }
      let dataList = [];
      for (let key in obj) {
        let item = obj[key];
        dataList.push(item);
      }
      dataList.sort((a2, b2) => b2.create_time - a2.create_time);
      state.notification.dataList = dataList;
    },
    unreadCount(param = {}) {
      let notificationDatas = this.get(param);
      let unreadCount = notificationDatas.reduce((sum, item, index, array) => {
        if (!item.is_read) {
          sum++;
        }
        return sum;
      }, 0);
      if (unreadCount === 0) {
        uni.removeTabBarBadge({
          index: 2,
          complete: (e) => {
          }
        });
      } else {
        uni.setTabBarBadge({
          index: 2,
          text: unreadCount + "",
          complete: (e) => {
          }
        });
      }
      if (unreadCount) {
        return unreadCount + "";
      } else {
        return "";
      }
    }
  },
  friend: {
    get() {
      return state.friend.dataList;
    },
    async loadMore({
      friend_uid
    } = {}) {
      let whereString = '"user_id" == $cloudEnv_uid';
      if (friend_uid) {
        whereString += `&& "friend_uid" == "${friend_uid}"`;
      }
      let res = await db$1.collection(
        db$1.collection("uni-im-friend").where(whereString).field("friend_uid,mark,class_name").getTemp(),
        db$1.collection("uni-id-users").field("_id,nickname,avatar_file").getTemp()
      ).limit(500).get();
      let data2 = res.result.data;
      data2.forEach((item, index) => {
        data2[index] = item.friend_uid[0];
        let uid = data2[index]._id;
        if (!state.usersInfo[uid]) {
          state.usersInfo[uid] = item.friend_uid[0];
        }
      });
      state.friend.hasMore = data2.length == 500;
      state.friend.dataList.push(...data2);
    },
    remove(friend_uid) {
      let friendList = state.friend.dataList;
      let index = friendList.findIndex((i2) => i2._id == friend_uid);
      friendList.splice(index, 1);
    }
  },
  group: {
    get() {
      return state.group.dataList;
    },
    async loadMore({
      group_id
    } = {}) {
      let whereString = '"user_id" == $cloudEnv_uid ';
      if (group_id) {
        whereString += `&& "group_id" == "${group_id}"`;
      }
      let res = await db$1.collection(
        db$1.collection("uni-im-group-member").where(whereString).getTemp(),
        db$1.collection("uni-im-group").getTemp()
      ).limit(500).get();
      res.result.data.map((item) => {
        item.group_info = item.group_id[0];
        delete item.group_id;
        return item;
      });
      res.result.data = res.result.data.filter((item) => item.group_info);
      state.group.hasMore = res.result.data.length == 500;
      if (group_id) {
        state.group.dataList.push(...res.result.data);
      } else {
        state.group.dataList = res.result.data;
      }
    },
    remove({
      group_id
    }) {
      let groupList = state.group.dataList;
      let index = groupList.findIndex((i2) => i2.group_info._id == group_id);
      if (index != -1) {
        groupList.splice(index, 1);
      }
    }
  },
  mergeUsersInfo(usersInfo) {
    state.usersInfo = Object.assign({}, state.usersInfo, usersInfo);
  },
  async clearUnreadCount(conversation_id) {
    let conversation = await this.conversation.get(conversation_id);
    setTimeout(function() {
      conversation.unread_count = 0;
    }, 10);
    Bs.database().collection("uni-im-conversation").where({
      user_id: current_uid(),
      id: conversation_id
    }).update({
      "unread_count": 0
    }).then((e) => {
      formatAppLog("log", "at uni_modules/uni-im/lib/main.js:760", "设置为已读", e.result.updated);
    });
  }
};
const mapState = function(keys = []) {
  let obj = {};
  keys.forEach((key) => {
    let keyName = key, keyCName = false;
    if (key.includes(" as ")) {
      let _key = key.trim().split(" as ");
      keyName = _key[0];
      keyCName = _key[1];
    }
    obj[keyCName || keyName] = function() {
      return state[keyName];
    };
  });
  return obj;
};
const uniIm = deepAssign(state, methods, {
  mapState
});
function deepAssign() {
  let len = arguments.length, target = arguments[0];
  if (!isPlainObject(target)) {
    target = {};
  }
  for (let i2 = 1; i2 < len; i2++) {
    let source = arguments[i2];
    if (isPlainObject(source)) {
      for (let s2 in source) {
        if (s2 === "__proto__" || target === source[s2]) {
          continue;
        }
        if (isPlainObject(source[s2])) {
          target[s2] = deepAssign(target[s2], source[s2]);
        } else {
          target[s2] = source[s2];
        }
      }
    }
  }
  return target;
}
function isPlainObject(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Object]";
}
let options = {
  name: "uni-im",
  path: "_doc/uni-im.db"
};
const sqlite = {
  async init(callback = () => {
  }) {
    callback();
  },
  async checkDataBaseIsOpen() {
    if (uniIm.dataBaseIsOpen) {
      return true;
    }
    let dataBaseIsOpen = plus.sqlite.isOpenDatabase(options);
    uniIm.dataBaseIsOpen = dataBaseIsOpen;
    if (!dataBaseIsOpen) {
      let res = await new Promise((resolve, reject) => {
        plus.sqlite.openDatabase({
          ...options,
          success: function(e) {
            resolve(e);
          },
          fail: function(e) {
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:26", e, "openDatabase failed: " + JSON.stringify(e));
            reject(e);
          }
        });
      });
      let sql = `create table if not exists msg(
					"_id" CHAR(32),
					"body" TEXT,
					"type" CHAR(32),
					"from_uid" CHAR(32),
					"to_uid" CHAR(32),
					"is_read" BOOLEAN,
					"friendly_time" DATETIME,
					"create_time" DATETIME,
					"conversation_id" CHAR(32),
					"group_id" CHAR(32),
					"client_create_time" DATETIME,
					"unique_id" CHAR(32),
					"appid" CHAR(32),
					"state" INT,
					"is_revoke" BOOLEAN,
					"is_delete" BOOLEAN,
					"action" TEXT
			)`;
      this.executeSql(sql);
      return res;
    }
  },
  async clearMsgTable() {
    let dd = await this.executeSql("drop table msg");
    formatAppLog("log", "at uni_modules/uni-im/common/sqlite.js:58", "clearMsgTable", dd);
  },
  async executeSql(sql) {
    await this.checkDataBaseIsOpen();
    return await new Promise((resolve, reject) => {
      try {
        plus.sqlite.executeSql({
          name: options.name,
          sql,
          success: function(e) {
            resolve(e);
          },
          fail: function(e) {
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:77", e);
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:78", { sql });
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:79", "executeSql failed: " + JSON.stringify(e));
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:80", "executeSql failed: " + JSON.stringify(sql));
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  async selectSql(sql) {
    await this.checkDataBaseIsOpen();
    return await new Promise(async (resolve, reject) => {
      try {
        plus.sqlite.selectSql({
          name: options.name,
          sql,
          success: function(e) {
            resolve(e);
          },
          fail: function(e) {
            formatAppLog("error", "at uni_modules/uni-im/common/sqlite.js:106", "sql:" + sql, "selectSql failed: " + JSON.stringify(e));
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};
sqlite.init();
const uniIdCo = Bs.importObject("uni-id-co", {
  customUI: true
});
const db = Bs.database();
let appIsShow = true;
let getCloudMsgIng = false;
let socketIsClose = true;
const uniImUtils = {
  init() {
    getApp().globalData.sqlite = sqlite;
    uniIm.socketOpenIndex = 0;
    uni.onSocketClose(function(res) {
      socketIsClose = true;
      formatAppLog("log", "at uni_modules/uni-im/common/utils.js:43", "WebSocket 已关闭！");
    });
    uni.onSocketOpen(function(res) {
      formatAppLog("log", "at uni_modules/uni-im/common/utils.js:46", "WebSocket连接已打开！");
      socketIsClose = false;
      uniIm.socketOpenIndex++;
      if (uniIm.socketOpenIndex > 1) {
        getCloudMsg();
      }
    });
    appEvent.onAppShow(async () => {
      getCloudMsg();
    });
    function getCloudMsg() {
      if (getCloudMsgIng) {
        return;
      }
      getCloudMsgIng = true;
      setTimeout(async () => {
        let maxConversation = (await uniIm.conversation.get())[0];
        if (!maxConversation) {
          getCloudMsgIng = false;
          return;
        }
        let res = await db.collection("uni-im-msg").where({
          to_uid: Bs.getCurrentUserInfo().uid,
          create_time: db.command.gt(maxConversation.update_time)
        }).get();
        formatAppLog("log", "at uni_modules/uni-im/common/utils.js:82", "getCloudMsg res", maxConversation.update_time, res.result.data);
        let clodMsgData = {};
        res.result.data.forEach((item) => {
          if (clodMsgData[item.conversation_id]) {
            clodMsgData[item.conversation_id].push(item);
          } else {
            clodMsgData[item.conversation_id] = [item];
          }
        });
        for (let conversation_id in clodMsgData) {
          let conversation = await uniIm.conversation.get(conversation_id);
          let msg = clodMsgData[conversation_id];
          if (msg.length) {
            conversation.msgList.push(...msg);
            conversation.msgManager.localMsg.add(msg);
            conversation.unread_count += msg.length;
          }
        }
        getCloudMsgIng = false;
      }, 0);
    }
    this.listenImMsg();
    setInterval(() => {
      uniIm.heartbeat = Date.now();
    }, 1e3);
    const audioContext = uni.createInnerAudioContext();
    let _audioContext = {};
    Object.defineProperty(_audioContext, "src", {
      set(url) {
        audioContext.src = url;
      },
      get() {
        return audioContext.src;
      }
    });
    uniIm.audioContext = new Proxy(_audioContext, {
      get(target, propKey, receiver) {
        return audioContext[propKey];
      }
    });
    uniIm.systemInfo = uni.getSystemInfoSync();
    function initData() {
      uniIm.conversation.dataList = [];
      uniIm.notification.dataList = [];
      uniIm.notification.loadMore();
      uniIm.friend.dataList = [];
      uniIm.friend.loadMore();
      uniIm.group.dataList = [];
      uniIm.group.loadMore();
      let userInfo = {};
      userInfo[store.userInfo._id] = store.userInfo;
      uniIm.mergeUsersInfo(userInfo);
    }
    if (Bs.getCurrentUserInfo().tokenExpired > Date.now()) {
      setTimeout(initData, 0);
    }
    uni.$on("uni-id-pages-login-success", async () => {
      initData();
    });
    uni.onPushMessage(async (res) => {
      if (res.data.payload.type == "uni-im-notification") {
        formatAppLog("log", "at uni_modules/uni-im/common/utils.js:198", "uni-im-notification-res.data", res.data);
        res.data.create_time = Date.now();
        if (typeof res.data.is_read == "undefined") {
          res.data.is_read = false;
        }
        formatAppLog("log", "at uni_modules/uni-im/common/utils.js:203", "res.data notification.add", res.data);
        res.data._id = res.data.payload.notificationId;
        res.data;
        delete res.data.payload.notificationId;
        delete res.data.unipush_version;
        uniIm.notification.add(res.data);
      }
    });
    ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"].forEach((item) => {
      uni.addInterceptor(item, {
        success: (event) => {
          updateTabBarBadge();
        }
      });
    });
    function updateTabBarBadge() {
      setTimeout(() => {
        let unread_count = uniIm.notification.unreadCount();
        set(2, unread_count);
        unread_count = uniIm.conversation.unreadCount();
        set(0, unread_count);
        function set(index, number) {
          if (number == 0) {
            uni.removeTabBarBadge({
              index,
              complete: (e) => {
              }
            });
          } else {
            uni.setTabBarBadge({
              index,
              text: number + "",
              complete: (e) => {
              }
            });
          }
        }
      }, 300);
    }
    uni.$on("uni-id-pages-logout", () => {
      uniIm.conversation.dataList = [];
      uniIm.conversation.hasMore = true;
      uniIm.notification.dataList = [];
      uniIm.notification.hasMore = true;
      uniIm.friend.dataList = [];
      uniIm.friend.hasMore = true;
      uniIm.group.dataList = [];
      uniIm.group.hasMore = true;
      uniIm.currentConversationId = false;
    });
    appEvent.onAppHide(async () => {
      appIsShow = false;
    });
    appEvent.onAppShow(async () => {
      appIsShow = true;
      this.clearPushNotify();
    });
  },
  getConversationId(id, type = "single") {
    if (type == "single") {
      let current_uid2 = Bs.getCurrentUserInfo().uid;
      if (!current_uid2) {
        formatAppLog("error", "at uni_modules/uni-im/common/utils.js:332", "错误current_uid不能为空", current_uid2);
      }
      let param = [id, current_uid2];
      return "single_" + md5(param.sort().toString());
    } else {
      return "group_" + id;
    }
  },
  listenImMsg() {
    uni.onPushMessage(async (res) => {
      var _a;
      formatAppLog("log", "at uni_modules/uni-im/common/utils.js:342", "收到消息", res);
      const {
        payload
      } = res.data;
      if (payload.type == "uni-im") {
        const msg = payload.data;
        if (msg.LongMsg) {
          const db2 = Bs.database();
          let res2 = await db2.collection("uni-im-msg").where({
            "_id": msg._id,
            "conversation_id": msg.conversation_id
            // conversation_id 必传否则会被触发器拦截
          }).get();
          if (res2.result.code == 0) {
            payload.data.body = res2.result.data[0].body;
          } else {
            formatAppLog("error", "at uni_modules/uni-im/common/utils.js:363", "超长文本类型消息查库失败", msg._id);
          }
        }
        if (payload.device_id == uni.getSystemInfoSync().deviceId) {
          return formatAppLog("log", "at uni_modules/uni-im/common/utils.js:368", "当前设备发的消息，不用接收；忽略");
        }
        if (res.type == "receive") {
          const {
            conversation_id,
            group_id
          } = msg;
          let currentPages = getCurrentPages();
          let topViewRoute = currentPages[currentPages.length - 1].route;
          let pathList = [
            "uni_modules/uni-im/pages/chat/chat",
            "uni_modules/uni-im/pages/index/index",
            "uni_modules/uni-im/pages/userList/userList",
            "uni_modules/uni-im/pages/contacts/contacts"
          ];
          if (!appIsShow || !pathList.includes(topViewRoute)) {
            let {
              content,
              data: data2,
              title,
              avatar_file
            } = payload;
            avatar_file ? avatar_file.url : "";
            let icon = "_www/uni_modules/uni-im/static/avatarUrl.png";
            if (uni.getSystemInfoSync().platform == "android") {
              if (avatar_file) {
                let downloadFileRes = await uni.downloadFile({
                  url: avatar_file.url
                });
                icon = (_a = downloadFileRes[1]) == null ? void 0 : _a.tempFilePath;
              }
            }
            plus.push.createMessage(content, payload, {
              title,
              icon
            });
          } else if (conversation_id != uniIm.currentConversationId)
            ;
          let conversation = await uniIm.conversation.get(conversation_id);
          let msgList = conversation.msgList;
          let lastMsg = [...msgList].pop();
          if (lastMsg && lastMsg._id != msg._id) {
            msgList.push(msg);
            conversation.unread_count++;
          }
          if (!socketIsClose) {
            conversation.msgManager.localMsg.add(msg);
          }
          if (msg.group_id && msg.about_msg_id) {
            let current_uid2 = Bs.getCurrentUserInfo().uid;
            let aboutMsg = msgList.find((i2) => i2._id == msg.about_msg_id);
            if (aboutMsg && aboutMsg.from_uid == current_uid2) {
              conversation.call_list.push(msg._id);
              formatAppLog("log", "at uni_modules/uni-im/common/utils.js:439", "conversation.call_list", conversation.call_list);
            }
          }
          if (msg.action == "join-group-notice") {
            formatAppLog("log", "at uni_modules/uni-im/common/utils.js:450", '"join-group-notice"', msg);
            let conversation2 = await uniIm.conversation.get(msg.conversation_id);
            formatAppLog("log", "at uni_modules/uni-im/common/utils.js:452", '"join-group-notice"conversation', conversation2);
            if (conversation2) {
              let userList = msg.body.user_list;
              if (userList && Object.keys(conversation2.group_member)) {
                for (let i2 = 0; i2 < userList.length; i2++) {
                  conversation2.group_member[userList[i2]._id] = userList[i2];
                }
                formatAppLog("log", "at uni_modules/uni-im/common/utils.js:465", "add user to group_member", conversation2.group_member);
              }
              uniIm.mergeUsersInfo(conversation2.group_member);
              let hasIsGroup = uniIm.group.dataList.find((i2) => i2.group_info._id == group_id);
              if (!hasIsGroup) {
                await uniIm.group.loadMore({
                  group_id
                });
              }
            }
          }
        } else {
          let currentPages = getCurrentPages();
          let topViewRoute = currentPages[currentPages.length - 1].route;
          if (topViewRoute == "uni_modules/uni-im/pages/chat/chat") {
            uni.redirectTo({
              url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + msg.conversation_id,
              complete(e) {
                formatAppLog("log", "at uni_modules/uni-im/common/utils.js:490", e);
              }
            });
          } else {
            uni.navigateTo({
              url: "/uni_modules/uni-im/pages/chat/chat?conversation_id=" + msg.conversation_id,
              complete(e) {
                formatAppLog("log", "at uni_modules/uni-im/common/utils.js:497", e);
              }
            });
          }
        }
      } else if (payload.type == "uni-im-group-exit" || payload.type == "uni-im-group-expel" || payload.subType == "uni-im-group-expel") {
        let {
          timestamp,
          group_id
        } = payload.data;
        let conversation_id = "group_" + group_id;
        let noticeBody = res.data.content;
        let conversation = await uniIm.conversation.get(conversation_id);
        let msg = {
          conversation_id,
          group_id,
          client_create_time: Date.now(),
          create_time: Date.now(),
          type: "system",
          body: noticeBody
        };
        conversation.msgList.push(msg);
        if (!socketIsClose) {
          conversation.msgManager.localMsg.add(msg);
        }
        if (payload.data.user_id == Bs.getCurrentUserInfo().uid) {
          let currentConversationId = uniIm.currentConversationId;
          let topPageInfo = getTopPageInfo();
          let {
            route,
            options: options2
          } = topPageInfo.$page;
          if (route == "uni_modules/uni-im/pages/group/info") {
            currentConversationId = options2.conversation_id;
          }
          if (currentConversationId == "group_" + payload.data.group_id) {
            uni.navigateBack({
              delta: 2
            });
          }
          setTimeout(() => {
            uniIm.conversation.remove(conversation_id);
            uniIm.group.remove({
              group_id: payload.data.group_id
            });
          }, 1e3);
        } else {
          let data2 = await uniIm.conversation.get(conversation_id);
          delete data2.group_member[payload.data.user_id];
        }
      } else if (payload.type == "uni-im-group-join-request") {
        formatAppLog("log", "at uni_modules/uni-im/common/utils.js:573", "有用户申请加入群聊");
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-group-cancellation") {
        let {
          group_id
        } = payload.data;
        let conversationId = "group_" + group_id;
        let currentConversationId = uniIm.currentConversationId;
        let topPageInfo = getTopPageInfo();
        let {
          route,
          options: options2
        } = topPageInfo.$page;
        if (route == "uni_modules/uni-im/pages/group/info") {
          currentConversationId = options2.conversation_id;
        }
        if (currentConversationId == conversationId) {
          uni.navigateBack({
            delta: 2
          });
        }
        setTimeout(() => {
          uniIm.conversation.remove(conversationId);
          uniIm.group.remove({
            group_id
          });
        }, 1e3);
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-friend-add") {
        let {
          from_uid,
          to_uid
        } = payload.data;
        let friend_uid = from_uid == Bs.getCurrentUserInfo().uid ? to_uid : from_uid;
        await uniIm.conversation.get({
          friend_uid
        });
        uniIm.friend.loadMore({
          friend_uid
        });
      } else if (payload.type == "uni-im-notification" && payload.subType == "uni-im-friend-delete") {
        let {
          from_uid,
          to_uid
        } = payload.data;
        let friend_uid = from_uid == Bs.getCurrentUserInfo().uid ? to_uid : from_uid;
        uniIm.conversation.remove(payload.data.conversationId);
        uniIm.friend.remove(friend_uid);
      } else if (payload.type == "uni-im-revoke-msg") {
        await uniIm.conversation.revokeMsg(payload.data);
        uni.setStorageSync("uni-im-lastTaskTime", payload.data.taskCreateTime);
      }
    });
  },
  toFriendlyTime(timestamp) {
    if (timestamp - Date.now() < 3600 * 1e3 * 2) {
      timestamp += uniIm.heartbeat * 0;
    }
    if (!timestamp) {
      return "";
    }
    return toFriendlyTime(timestamp);
  },
  clearPushNotify() {
    plus.push.clear();
    plus.runtime.setBadgeNumber(0);
  },
  async login({
    token,
    tokenExpired
  }) {
    uni.setStorage({
      key: "uni_id_token_expired",
      data: tokenExpired
    });
    uni.setStorage({
      key: "uni_id_token",
      data: token
    });
    uni.getPushClientId({
      success: async function(e) {
        let pushClientId = e.cid;
        await uniIdCo.setPushCid({
          pushClientId
        });
      },
      fail(e) {
        formatAppLog("log", "at uni_modules/uni-im/common/utils.js:688", e);
      }
    });
    await mutations.updateUserInfo();
    uni.$emit("uni-id-pages-login-success");
  }
};
function getTopPageInfo() {
  let pages2 = getCurrentPages();
  return pages2[pages2.length - 1];
}
export {
  Bs as B,
  uniIm as a,
  store as s,
  uniImUtils as u
};
