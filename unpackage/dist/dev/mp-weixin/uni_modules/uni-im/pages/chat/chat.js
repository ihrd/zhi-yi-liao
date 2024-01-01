"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
const uni_modules_uniIdPages_common_store = require("../../../uni-id-pages/common/store.js");
require("../../common/utils.js");
const uni_modules_uniIm_common_emojiCodes = require("../../common/emojiCodes.js");
require("../../lib/MsgManager.js");
require("../../common/md5.js");
require("../../lib/createObservable.js");
require("../../../uni-id-pages/config.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
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
      emojiCodes: uni_modules_uniIm_common_emojiCodes.emojiCodes,
      isFocus: false,
      answerMsgIndex: false
    };
  },
  computed: {
    ...uni_modules_uniIm_lib_main.uniIm.mapState(["currentConversationId", "conversationDatas", "isWidescreen", "systemInfo"]),
    unread_count() {
      const unreadCount = uni_modules_uniIm_lib_main.uniIm.conversation.unreadCount();
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
      return uni_modules_uniIdPages_common_store.store.userInfo._id;
    },
    phoneBH() {
      return this.systemInfo.screenHeight - this.systemInfo.safeArea.bottom;
    },
    chatTootPaddingBottom() {
      return this.phoneBH + "px";
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
      return this.isFocus;
    },
    // 临时方案 修复（兼容）微信小程序框架的bug：iOS端textarea组件 在 iOS 真机下 无法动态切换绑定 input 事件
    // 大家可以一起顶帖 链接地址：https://developers.weixin.qq.com/community/develop/doc/0002a02800cd90b9632efeab55b000
    showInputBox() {
      return this.conversation.id;
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
        uni_modules_uniIm_lib_main.uniIm.clearUnreadCount(this.currentConversationId);
        this.hasNewMsg = true;
        setTimeout(() => {
          this.showLast();
        }, 0);
      }
    };
    common_vendor.index.onPushMessage(this.onPushMessage);
    this.onKeyboardHeightChange = ({ height }) => {
      this.keyboardHeight = height;
      if (height) {
        this.keyboardMaxHeight = height;
      }
      this.$nextTick(() => {
        this.showLast();
      });
    };
    common_vendor.index.onKeyboardHeightChange(this.onKeyboardHeightChange);
  },
  mounted() {
  },
  onShow() {
    if (this.conversation.id) {
      uni_modules_uniIm_lib_main.uniIm.currentConversationId = this.conversation.id;
      uni_modules_uniIm_lib_main.uniIm.clearUnreadCount(this.currentConversationId);
    }
  },
  onUnload() {
    common_vendor.index.offPushMessage(this.onPushMessage);
    common_vendor.index.offKeyboardHeightChange(this.onKeyboardHeightChange);
    uni_modules_uniIm_lib_main.uniIm.currentConversationId = false;
    uni_modules_uniIm_lib_main.uniIm.audioContext.stop();
  },
  beforeDestroy() {
    uni_modules_uniIm_lib_main.uniIm.currentConversationId = false;
    uni_modules_uniIm_lib_main.uniIm.audioContext.stop();
  },
  onHide() {
    uni_modules_uniIm_lib_main.uniIm.currentConversationId = false;
    uni_modules_uniIm_lib_main.uniIm.audioContext.stop();
  },
  async onLoad(param) {
    await this.load(param);
  },
  methods: {
    async load(param) {
      this.answerMsgIndex = false;
      this.conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(param);
      uni_modules_uniIm_lib_main.uniIm.currentConversationId = this.conversation.id;
      this.$nextTick(() => {
        this.$refs["msg-list"].init();
      });
      if (this.conversation.unread_count) {
        uni_modules_uniIm_lib_main.uniIm.clearUnreadCount(this.conversation.id);
      }
    },
    /*onKeydown(keyname){
    	console.log('onKeydown keyname',keyname);
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
    	console.log('onKeyup keyname',keyname);
    	if(keyname == 'shift'){
    		//按下了shift键
    		shiftKeyPressed = false;
    	}
    },*/
    getNicknameByUid(uid) {
      let userInfo = uni_modules_uniIm_lib_main.uniIm.usersInfo[uid];
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
        common_vendor.index.hideKeyboard();
      } else {
        this.textareaHeight = this.oldTextareaHeight;
        this.isFocus = true;
      }
      common_vendor.index.$emit("changeSoundIsShow");
      this.$nextTick(() => {
        this.menuIsShow = false;
        this.emojiIsShow = false;
      });
    },
    changeMenuIsShow(e) {
      if (this.keyboardHeight) {
        this.menuIsShow = true;
        common_vendor.index.hideKeyboard();
      } else {
        this.menuIsShow = !this.menuIsShow;
      }
      this.emojiIsShow = false;
      this.showLast(0);
      e.stopPropagation();
    },
    changeEmojiIsShow(e) {
      this.soundIsShow = false;
      if (this.keyboardHeight) {
        this.emojiIsShow = true;
        common_vendor.index.hideKeyboard();
      } else {
        this.emojiIsShow = !this.emojiIsShow;
      }
      this.menuIsShow = false;
      this.showLast(0);
      e.stopPropagation();
    },
    async chooseAndUploadFile(type) {
      common_vendor.Bs.chooseAndUploadFile({
        type,
        count: 9,
        sizeType: ["compressed"],
        success: (e) => {
          e.tempFiles.forEach((event) => {
            let {
              url,
              name,
              size
            } = event;
            console.log("event", event);
            type = event.fileType;
            if (!["image", "video"].includes(type)) {
              type = "file";
            }
            let data = {};
            data[type] = { url, size, name };
            this.beforeSendMsg(data);
          });
        },
        fail(e) {
          console.error(e);
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    },
    hideKeyboard() {
      common_vendor.index.hideKeyboard();
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
          common_vendor.index.showToast({
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
    sendSound(e) {
      this.beforeSendMsg({ sound: e });
    },
    async answer(msgIndex) {
      this.answerMsgIndex = msgIndex;
      console.log("answer", msgIndex);
      this.isFocus = true;
    },
    async beforeSendMsg(param = {}) {
      let data = {
        type: "text",
        to_uid: this.conversation.friend_uid,
        conversation_id: this.conversation.id,
        group_id: this.conversation.group_id,
        client_create_time: Date.now(),
        from_uid: common_vendor.Bs.getCurrentUserInfo().uid,
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
          return common_vendor.index.showToast({
            title: "不能发送空消息",
            icon: "none"
          });
        }
        this.$nextTick((e) => {
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
      });
      data.state = 0;
      await this.conversation.msgManager.localMsg.add(data);
      this.sendMsg(data);
    },
    sendMsg(data, callback) {
      const uniImCo = common_vendor.Bs.importObject("uni-im-co", {
        customUI: true
      });
      data.appId = this.systemInfo.appId;
      let index = this.conversation.msgList.findIndex((i) => i.unique_id == data.unique_id);
      data = Object.assign({}, data);
      uniImCo.sendMsg(data).then((e) => {
        data.state = e.errCode === 0 ? 100 : -100;
        data.create_time = e.data.create_time;
        data._id = e.data._id;
        this.conversation.msgList.splice(index, 1, data);
        this.conversation.msgManager.localMsg.update(data.unique_id, data);
      }).catch((e) => {
        common_vendor.index.showModal({
          content: e.message,
          showCancel: false,
          confirmText: "关闭"
        });
        console.log("uniImCo.sendMsg error:", e.errCode, e.message);
        data.create_time = Date.now();
        data.state = -200;
        this.conversation.msgList.splice(index, 1, data);
        this.conversation.msgManager.localMsg.update(data.unique_id, data);
      }).finally((e) => {
        if (callback) {
          callback(e);
        }
      });
    },
    retriesSendMsg(data) {
      common_vendor.index.showLoading({
        mask: true
      });
      data.isRetries = true;
      this.sendMsg(data, (e) => {
        common_vendor.index.hideLoading();
      });
    },
    showLast(duration = 300) {
      let msgListRef = this.$refs["msg-list"];
      if (msgListRef) {
        msgListRef.showLast(duration);
        this.hasNewMsg = false;
      }
    },
    linechange(e) {
      let {
        height,
        lineCount
      } = e.detail;
      if (lineCount === 1) {
        this.textareaHeight = 26;
      } else if (height <= 100) {
        this.textareaHeight = height - 2;
      }
    },
    touchmove(e) {
    },
    async showControl({
      index,
      msgContentDomInfo,
      coordinate
    }) {
      let isSelf = this.msgList[index].from_uid == common_vendor.Bs.getCurrentUserInfo().uid;
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
    clickMenu(index, e) {
      if (index < 2) {
        this.chooseAndUploadFile(index === 0 ? "image" : "video");
      }
      if (index === 2) {
        this.chooseAndUploadFile("all");
      }
      e.stopPropagation();
    },
    clickEmojiItem(emojiUniCode, e) {
      this.chatText += emojiUniCode;
      e.stopPropagation();
    },
    tapUnreadCount() {
      if (this.isWidescreen)
        ;
      else {
        common_vendor.index.navigateBack();
      }
    },
    getkey(id, index) {
      return index;
    }
  },
  onNavigationBarButtonTap(e) {
    if (e.index === 0) {
      if (this.conversation.group_id) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-im/pages/group/info?conversation_id=" + this.conversation.id
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-im/pages/chat/info?user_id=" + this.conversation.friend_uid
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_im_msg_list2 = common_vendor.resolveComponent("uni-im-msg-list");
  const _easycom_uni_im_icons2 = common_vendor.resolveComponent("uni-im-icons");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_im_sound2 = common_vendor.resolveComponent("uni-im-sound");
  const _easycom_uni_im_control2 = common_vendor.resolveComponent("uni-im-control");
  (_easycom_uni_im_msg_list2 + _easycom_uni_im_icons2 + _easycom_uni_icons2 + _easycom_uni_im_sound2 + _easycom_uni_im_control2)();
}
const _easycom_uni_im_msg_list = () => "../../components/uni-im-msg-list/uni-im-msg-list.js";
const _easycom_uni_im_icons = () => "../../components/uni-im-icons/uni-im-icons.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_im_sound = () => "../../components/uni-im-sound/uni-im-sound.js";
const _easycom_uni_im_control = () => "../../components/uni-im-control/uni-im-control.js";
if (!Math) {
  (_easycom_uni_im_msg_list + _easycom_uni_im_icons + _easycom_uni_icons + _easycom_uni_im_sound + _easycom_uni_im_control)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.navTitle,
    b: $data.conversation.id
  }, $data.conversation.id ? {
    c: common_vendor.sr("msg-list", "150f2cb5-0"),
    d: common_vendor.o($options.showControl),
    e: common_vendor.o($options.retriesSendMsg),
    f: common_vendor.o($options.hideKeyboard),
    g: common_vendor.p({
      conversationId: $data.conversation.id,
      paddingBottom: $options.imPlaceholderheight + "px"
    })
  } : {}, {
    h: !_ctx.isWidescreen
  }, !_ctx.isWidescreen ? common_vendor.e({
    i: $options.showInputBox
  }, $options.showInputBox ? common_vendor.e({
    j: common_vendor.o($options.changeSoundIsShow),
    k: common_vendor.p({
      code: $data.soundIsShow ? "e69f" : "e684",
      size: "30"
    }),
    l: common_vendor.o([($event) => $options.chatText = $event.detail.value, (...args) => $options.input && $options.input(...args)]),
    m: common_vendor.o(($event) => $options.beforeSendMsg()),
    n: common_vendor.o((...args) => $options.linechange && $options.linechange(...args)),
    o: $data.textareaHeight + "px",
    p: $options.mpIsFocus,
    q: common_vendor.o(($event) => $options.onChatInputFocus()),
    r: common_vendor.o(($event) => $data.isFocus = false),
    s: common_vendor.o(($event) => $options.beforeSendMsg()),
    t: $options.chatText,
    v: $data.answerMsgIndex !== false
  }, $data.answerMsgIndex !== false ? {
    w: common_vendor.t($options.getNicknameByUid($options.msgList[$data.answerMsgIndex].from_uid)),
    x: common_vendor.t($options.msgList[$data.answerMsgIndex].body),
    y: common_vendor.o(($event) => $data.answerMsgIndex = false),
    z: common_vendor.p({
      type: "clear",
      color: "#aaa",
      size: "16"
    })
  } : {}, {
    A: $data.soundIsShow
  }, $data.soundIsShow ? {
    B: common_vendor.o($options.sendSound)
  } : {}, {
    C: common_vendor.o($options.changeEmojiIsShow),
    D: common_vendor.p({
      code: $data.emojiIsShow ? "e69f" : "e646",
      size: "30"
    }),
    E: !$data.soundIsShow && $options.chatText
  }, !$data.soundIsShow && $options.chatText ? {
    F: common_vendor.o(($event) => $options.beforeSendMsg())
  } : {
    G: common_vendor.o($options.changeMenuIsShow),
    H: common_vendor.p({
      code: "e75a",
      size: "30"
    })
  }) : {}, {
    I: $data.menuIsShow || $data.emojiIsShow
  }, $data.menuIsShow || $data.emojiIsShow ? common_vendor.e({
    J: $data.menuIsShow
  }, $data.menuIsShow ? {
    K: common_vendor.f($data.menuList, (item, index, i0) => {
      return {
        a: "150f2cb5-6-" + i0,
        b: common_vendor.p({
          code: item.iconCode,
          size: "26"
        }),
        c: common_vendor.t(item.title),
        d: index,
        e: common_vendor.o(($event) => $options.clickMenu(index, $event), index)
      };
    }),
    L: $data.keyboardMaxHeight + "px"
  } : {}, {
    M: $data.emojiIsShow
  }, $data.emojiIsShow ? {
    N: common_vendor.f($data.emojiCodes, (uniCodeEmoji, index, i0) => {
      return {
        a: common_vendor.t(uniCodeEmoji),
        b: index,
        c: common_vendor.o(($event) => $options.clickEmojiItem(uniCodeEmoji, $event), index)
      };
    }),
    O: $data.keyboardMaxHeight + "px"
  } : {}, {
    P: $data.keyboardMaxHeight + "px"
  }) : {
    Q: $data.keyboardHeight - $options.phoneBH + "px"
  }) : {}, {
    R: $options.chatTootPaddingBottom,
    S: common_vendor.sr("uni-im-control", "150f2cb5-7"),
    T: common_vendor.o($options.answer)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-150f2cb5"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/chat/chat.nvue"]]);
wx.createPage(MiniProgramPage);
