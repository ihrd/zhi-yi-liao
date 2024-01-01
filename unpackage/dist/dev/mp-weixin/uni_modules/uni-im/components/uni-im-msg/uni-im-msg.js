"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../../uni-id-pages/common/store.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
const uni_modules_uniIm_common_utils = require("../../common/utils.js");
const uni_modules_uniIm_lib_htmlParser = require("../../lib/html-parser.js");
const common_assets = require("../../../../common/assets.js");
require("../../../uni-id-pages/config.js");
require("../../lib/MsgManager.js");
require("../../common/md5.js");
require("../../lib/createObservable.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
let audioContext = uni_modules_uniIm_lib_main.uniIm.audioContext;
const _sfc_main = {
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
        let src = uni_modules_uniIm_lib_main.uniIm.audioContext.src;
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
      return uni_modules_uniIm_common_utils.utils.toFriendlyTime(this.msg.create_time || this.msg.client_create_time);
    },
    showDatetime() {
      return this.mouseIn || !this.equalPrevTime;
    },
    userInfo() {
      return uni_modules_uniIm_lib_main.uniIm.usersInfo[this.msg.from_uid] || {};
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
      return common_vendor.Bs.getCurrentUserInfo().uid;
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
        return (_a = uni_modules_uniIdPages_common_store.store.userInfo.avatar_file) == null ? void 0 : _a.url;
      } else {
        return (_b = this.userInfo.avatar_file) == null ? void 0 : _b.url;
      }
    },
    soundBoxWidth() {
      return common_vendor.index.upx2px(750 / 60 * this.msg.body.time) + 50 + "px";
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
        let nodes = uni_modules_uniIm_lib_htmlParser.parseHtml(this.htmlString);
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
      } catch (e) {
        console.error("htmlString error：", e);
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
      let userInfo = uni_modules_uniIm_lib_main.uniIm.usersInfo[uid];
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
      common_vendor.index.setClipboardData({
        data: href,
        complete: (e) => {
        }
      });
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
      console.log(213);
      common_vendor.index.showLoading();
      let url = await this.getTempFileURL();
      common_vendor.index.previewImage({
        urls: [url],
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    },
    async playVideo() {
      let url = await this.getTempFileURL();
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-im/pages/common/video/video?url=" + url,
        animationDuration: 300,
        animationType: "fade-in"
      });
    },
    async showControl(e) {
      let msgContentDomInfo;
      const query = common_vendor.index.createSelectorQuery().in(this);
      await new Promise((callback) => {
        query.selectAll(".msg-content").boundingClientRect((data) => {
          msgContentDomInfo = data[0];
          callback(msgContentDomInfo);
        }).exec();
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
      common_vendor.index.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res2) => {
                common_vendor.index.openDocument({
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
      let res = await common_vendor.Bs.getTempFileURL({
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
if (!Array) {
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_im_icons2 = common_vendor.resolveComponent("uni-im-icons");
  const _easycom_uni_im_code_view2 = common_vendor.resolveComponent("uni-im-code-view");
  (_easycom_cloud_image2 + _easycom_uni_icons2 + _easycom_uni_im_icons2 + _easycom_uni_im_code_view2)();
}
const _easycom_cloud_image = () => "../../../uni-id-pages/components/cloud-image/cloud-image.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_im_icons = () => "../uni-im-icons/uni-im-icons.js";
const _easycom_uni_im_code_view = () => "../uni-im-code-view/uni-im-code-view.js";
if (!Math) {
  (_easycom_cloud_image + _easycom_uni_icons + _easycom_uni_im_icons + _easycom_uni_im_code_view)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.msg.is_delete
  }, !$props.msg.is_delete ? common_vendor.e({
    b: $options.showDatetime
  }, $options.showDatetime ? {
    c: common_vendor.t($options.friendlyTime)
  } : {}, {
    d: $props.msg.is_revoke
  }, $props.msg.is_revoke ? {} : common_vendor.e({
    e: common_vendor.p({
      width: "80rpx",
      height: "80rpx",
      borderRadius: "5px",
      src: $options.avatarUrl || "/uni_modules/uni-im/static/avatarUrl.png",
      mode: "widthFix"
    }),
    f: !$props.self
  }, !$props.self ? {
    g: common_vendor.t($options.userInfo.nickname)
  } : {}, {
    h: $props.msg.about_msg_id
  }, $props.msg.about_msg_id ? common_vendor.e({
    i: $props.aboutMsg.is_revoke
  }, $props.aboutMsg.is_revoke ? {} : {
    j: common_vendor.t($options.getNicknameByUid($props.aboutMsg.from_uid)),
    k: common_vendor.t($props.aboutMsg.body),
    l: common_vendor.o((...args) => $options.showMsgById && $options.showMsgById(...args))
  }) : {}, {
    m: $props.self && $props.msg.state != 100 && $options.msgStateIcon
  }, $props.self && $props.msg.state != 100 && $options.msgStateIcon ? {
    n: common_vendor.o($options.retriesSendMsg),
    o: common_vendor.p({
      color: $props.msg.state === 0 ? "#999" : "#d22",
      type: $options.msgStateIcon
    })
  } : {}, {
    p: $props.msg.type == "image"
  }, $props.msg.type == "image" ? {
    q: common_vendor.o($options.previewImage),
    r: common_vendor.p({
      width: "200rpx",
      height: "200rpx",
      src: $props.msg.body.url,
      mode: "aspectFill"
    })
  } : {}, {
    s: $props.msg.type == "sound"
  }, $props.msg.type == "sound" ? common_vendor.e({
    t: common_vendor.t($props.msg.body.time),
    v: $data.soundPlayState
  }, $data.soundPlayState ? {
    w: common_assets._imports_0
  } : {
    x: $data.soundPlayState ? 1 : "",
    y: common_vendor.p({
      code: "e6f5",
      size: "18px",
      color: "#000000"
    })
  }, {
    z: !$props.self ? 1 : "",
    A: common_vendor.o((...args) => $options.playSound && $options.playSound(...args)),
    B: !$props.self ? 1 : "",
    C: $options.soundBoxWidth
  }) : {}, {
    D: $props.msg.type == "text"
  }, $props.msg.type == "text" ? common_vendor.e({
    E: $props.msg.body == $options.htmlString
  }, $props.msg.body == $options.htmlString ? {
    F: common_vendor.t($props.msg.body)
  } : {
    G: common_vendor.f($options.nodes, (item, index, i0) => {
      return common_vendor.e({
        a: item.type == "text"
      }, item.type == "text" ? {
        b: common_vendor.t(item.text),
        c: index
      } : {}, {
        d: item.name == "a"
      }, item.name == "a" ? {
        e: common_vendor.t(item.attrs.href),
        f: index,
        g: common_vendor.o(($event) => $options.clickLink(item.attrs.href), index)
      } : {});
    })
  }, {
    H: common_vendor.n($options.msgClass)
  }) : {}, {
    I: $props.msg.type == "code"
  }, $props.msg.type == "code" ? {
    J: common_vendor.p({
      code: $props.msg.body
    })
  } : {}, {
    K: $props.msg.type == "video"
  }, $props.msg.type == "video" ? {
    L: $data.videoUrl + "?x-oss-process=video/snapshot,t_1000,f_jpg,w_200,m_fast,ar_auto",
    M: common_vendor.p({
      code: "e650",
      size: "35",
      color: "#FFF"
    }),
    N: common_vendor.o((...args) => $options.playVideo && $options.playVideo(...args))
  } : {}, {
    O: $props.msg.type == "file"
  }, $props.msg.type == "file" ? {
    P: common_vendor.t($options.fileName),
    Q: common_vendor.t($options.fileSize),
    R: common_vendor.p({
      code: "e858",
      size: "50",
      color: "#EEEEEE"
    }),
    S: common_vendor.o((...args) => $options.downLoadFile && $options.downLoadFile(...args))
  } : {}, {
    T: common_vendor.o((...args) => $options.showControl && $options.showControl(...args)),
    U: $props.self ? 1 : ""
  }), {
    V: $props.self ? 1 : "",
    W: common_vendor.o(($event) => $data.mouseIn = true),
    X: common_vendor.o(($event) => $data.mouseIn = false)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-msg/uni-im-msg.vue"]]);
wx.createComponent(Component);
