"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
require("../../common/utils.js");
require("../../common/md5.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
require("../../../uni-id-pages/common/store.js");
require("../../../uni-id-pages/config.js");
require("../../lib/MsgManager.js");
require("../../lib/createObservable.js");
const recorderManager = common_vendor.index.getRecorderManager();
const systemInfo = uni_modules_uniIm_lib_main.uniIm.systemInfo;
let soundInterval, startTime;
const _sfc_main = {
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
      markBottom += systemInfo.screenHeight - systemInfo.safeArea.bottom;
      return markBottom + "px";
    }
  },
  created() {
    recorderManager.onStop((res) => {
      if (!this.cancel) {
        if (this.time < 2) {
          return common_vendor.index.showToast({
            title: "语音时间过短",
            icon: "none"
          });
        }
        common_vendor.index.showLoading({
          title: "上传中",
          mask: false
        });
        common_vendor.Bs.uploadFile({
          filePath: res.tempFilePath,
          cloudPath: "uni-im/" + common_vendor.Bs.getCurrentUserInfo().uid + "/sound/" + Date.now() + ".mp3",
          // fileType:"audio",
          success: (e) => {
            console.log("uniCloud.uploadFile-success", e, "success", { "url": e.fileID, time: this.time });
            try {
              this.$emit("success", { "url": e.fileID, time: this.time });
            } catch (e2) {
              console.log(e2);
            }
            common_vendor.index.hideLoading();
          },
          fail: (e) => {
            console.log(e);
            common_vendor.index.showModal({
              content: JSON.stringify(e),
              showCancel: false,
              confirmText: "知道了"
            });
          },
          complete: (e) => {
            console.log("complete", e);
            common_vendor.index.hideLoading();
          }
        });
      } else {
        console.log("用户取消了录音功能", "this.time:" + this.time);
      }
    });
    recorderManager.onStart((e) => {
    });
    recorderManager.onPause((e) => {
    });
    recorderManager.onError((e) => {
      console.error(e);
    });
  },
  methods: {
    touchmove(e) {
      let y = e.touches[0].clientY + systemInfo.safeArea.top + (systemInfo.screenHeight - systemInfo.safeArea.bottom);
      if (systemInfo.safeArea.bottom - y > 58) {
        this.cancel = true;
      } else {
        this.cancel = false;
      }
    },
    soundStart(e) {
      uni_modules_uniIm_lib_main.uniIm.audioContext.stop();
      this.time = 0;
      recorderManager.start({
        sampleRate: 16e3,
        numberOfChannels: 2,
        format: "mp3"
      });
      startTime = Date.now();
      console.log("soundStart");
      this.soundState = 1;
      soundInterval = setInterval(() => {
        this.soundProgress = parseInt(this.soundProgress) + common_vendor.index.upx2px(450 / 60) + "px";
        this.time = parseInt((Date.now() - startTime) / 1e3);
      }, 1e3);
    },
    soundEnd() {
      recorderManager.stop();
      console.log("soundEnd");
      clearInterval(soundInterval);
      setTimeout(() => {
        this.soundState = 0;
        this.soundProgress = 0;
        this.cancel = false;
      }, 300);
    }
  }
};
if (!Array) {
  const _easycom_uni_im_icons2 = common_vendor.resolveComponent("uni-im-icons");
  _easycom_uni_im_icons2();
}
const _easycom_uni_im_icons = () => "../uni-im-icons/uni-im-icons.js";
if (!Math) {
  _easycom_uni_im_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.soundState ? "" : 0,
    b: $options.markBottom,
    c: $data.soundProgress
  }, $data.soundProgress ? {
    d: $data.soundProgress
  } : {}, {
    e: common_vendor.t($data.soundState ? "录音中（" + $data.time + "s）" : "按住 说话"),
    f: $data.soundState
  }, $data.soundState ? {
    g: common_vendor.t($data.cancel ? "松手取消" : "松手发送，上划取消"),
    h: $data.cancel ? "#f70000" : "#FFFFFF",
    i: common_vendor.p({
      code: "e61a",
      size: "10px",
      color: "#FFFFFF"
    }),
    j: $data.cancel ? "#f70000" : "#EEEEEE"
  } : {}, {
    k: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args)),
    l: common_vendor.o((...args) => $options.soundStart && $options.soundStart(...args)),
    m: common_vendor.o((...args) => $options.soundEnd && $options.soundEnd(...args)),
    n: common_vendor.o((...args) => $options.soundEnd && $options.soundEnd(...args)),
    o: $data.soundState ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-sound/uni-im-sound.vue"]]);
wx.createComponent(Component);
