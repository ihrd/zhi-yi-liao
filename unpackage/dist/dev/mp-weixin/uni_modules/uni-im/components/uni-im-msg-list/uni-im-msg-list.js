"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIm_lib_main = require("../../lib/main.js");
const uni_modules_uniIm_common_utils = require("../../common/utils.js");
require("../../../uni-id-pages/common/store.js");
require("../../lib/MsgManager.js");
require("../../common/md5.js");
require("../../lib/createObservable.js");
require("../../common/toFriendlyTime.js");
require("../../common/appEvent.js");
require("../../../uni-id-pages/config.js");
const uniImList = () => "./components/uni-im-list/uni-im-list.js";
const uniImListItem = () => "./components/uni-im-list-item/uni-im-list-item.js";
let loadMoreIndex = 0;
let pageLimit = 10;
let currentScrollTop = 0;
const _sfc_main = {
  components: {
    uniImList,
    uniImListItem
  },
  computed: {
    ...uni_modules_uniIm_lib_main.uniIm.mapState(["systemInfo", "isWidescreen", "heartbeat"]),
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
      return "auto";
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
      return this.msgList.find((i) => i._id == about_msg_id);
    },
    equalPrevTime(index) {
      const getFriendlyTime = (msg) => {
        return uni_modules_uniIm_common_utils.utils.toFriendlyTime(msg.create_time || msg.client_create_time);
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
      console.log("msgId", msgId);
      this.showMsgById(msgId);
    },
    async showViewByIndex(index, duration = 300) {
      if (index == -1) {
        return;
      }
      const query = common_vendor.index.createSelectorQuery().in(this);
      let listHeight = this.systemInfo.windowHeight;
      query.select("#item-" + index).boundingClientRect((data) => {
        if (!data) {
          return;
        }
        let val = currentScrollTop - listHeight + data.top + data.height + parseInt(this.paddingBottom);
        if (val < 0) {
          val = 0;
        }
        this.scrollTop = currentScrollTop;
        this.$nextTick(() => {
          this.scrollTop = val;
        });
      }).exec();
    },
    async sliderChange(e) {
      let index = e.detail.value;
      console.log(index);
      this.val = index;
      this.showViewByIndex(index);
    },
    async init() {
      this.conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(this.conversationId);
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
        this.$nextTick(() => {
          this.showLast(300);
        });
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
          await uni_modules_uniIm_lib_main.uniIm.conversation.get(data[0].conversation_id);
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
        if (currentScrollTop < 1 && !this.isSafariPc) {
          this.scrollTop = currentScrollTop;
          return this.$nextTick(async () => {
            this.scrollTop = 1;
            currentScrollTop = 1;
            await this.doTasksList();
          });
        }
        await this.doTasksList();
      }
    },
    showMsgById(showMsgById) {
      let index = this.msgList.findIndex((i) => i._id == showMsgById);
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = "";
      }, 1500);
      this.showViewByIndex(index);
    },
    async doTasksList() {
      let length = this.tasksList.length;
      for (let i = 0; i < length; i++) {
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
    onScroll(e) {
      currentScrollTop = e.detail.scrollTop;
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
    showControl(e) {
      this.$emit("showControl", e);
    },
    retriesSendMsg(e) {
      this.$emit("retriesSendMsg", e);
    },
    //当前用户自己的uid
    current_uid() {
      return common_vendor.Bs.getCurrentUserInfo().uid;
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_im_msg_system2 = common_vendor.resolveComponent("uni-im-msg-system");
  const _easycom_uni_im_msg2 = common_vendor.resolveComponent("uni-im-msg");
  const _component_uni_im_list_item = common_vendor.resolveComponent("uni-im-list-item");
  const _component_uni_im_list = common_vendor.resolveComponent("uni-im-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_im_msg_system2 + _easycom_uni_im_msg2 + _component_uni_im_list_item + _component_uni_im_list + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_im_msg_system = () => "../uni-im-msg-system/uni-im-msg-system.js";
const _easycom_uni_im_msg = () => "../uni-im-msg/uni-im-msg.js";
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_im_msg_system + _easycom_uni_im_msg + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.msgList.length
  }, $options.msgList.length ? {
    b: common_vendor.f($options.msgList, (msg, index, i0) => {
      return common_vendor.e({
        a: index === 0
      }, index === 0 ? common_vendor.e({
        b: $options.isSafariPc
      }, $options.isSafariPc ? common_vendor.e({
        c: $data.hasMore
      }, $data.hasMore ? {
        d: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args), msg._id)
      } : {}) : common_vendor.e({
        e: $data.hasMore
      }, $data.hasMore ? {
        f: "30bdb53c-2-" + i0 + "," + ("30bdb53c-1-" + i0),
        g: common_vendor.p({
          size: "25px",
          color: "#ccc",
          type: "spinner-cycle"
        })
      } : {}, {
        h: common_vendor.t($data.hasMore ? "正在加载历史消息" : "没有更多历史消息")
      }), {
        i: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args), msg._id)
      }) : {}, {
        j: msg.type == "system"
      }, msg.type == "system" ? {
        k: "30bdb53c-3-" + i0 + "," + ("30bdb53c-1-" + i0),
        l: common_vendor.p({
          msg
        })
      } : {
        m: common_vendor.sr("uni-im-msg", "30bdb53c-4-" + i0 + "," + ("30bdb53c-1-" + i0), {
          "f": 1
        }),
        n: common_vendor.o($options.showMsgById, msg._id),
        o: common_vendor.o($options.showControl, msg._id),
        p: common_vendor.o($options.retriesSendMsg, msg._id),
        q: "30bdb53c-4-" + i0 + "," + ("30bdb53c-1-" + i0),
        r: common_vendor.p({
          msg,
          self: $options.current_uid() == msg.from_uid,
          index,
          equalPrevTime: $options.equalPrevTime(index),
          avatar_file: $data.conversation.avatar_file,
          aboutMsg: $options.getAboutMsg(msg.about_msg_id)
        }),
        s: index === $data.activeIndex ? 1 : ""
      }, {
        t: "item-" + index,
        v: common_vendor.o((...args) => $options.clickItem && $options.clickItem(...args), msg._id),
        w: common_vendor.sr("item-" + index, "30bdb53c-1-" + i0 + ",30bdb53c-0", {
          "f": 1
        }),
        x: msg._id,
        y: "item-" + index,
        z: "30bdb53c-1-" + i0 + ",30bdb53c-0"
      });
    }),
    c: common_vendor.sr("uni-im-list", "30bdb53c-0"),
    d: common_vendor.o($options.onScroll),
    e: $options.listHeight,
    f: common_vendor.p({
      scrollTop: $data.scrollTop,
      ["scroll-into-view"]: $data.scrollIntoView,
      paddingBottom: $props.paddingBottom
    })
  } : {}, {
    g: $options.msgList.length == 0
  }, $options.msgList.length == 0 ? {
    h: common_vendor.p({
      status: $data.hasMore ? "loading" : "noMore",
      contentText: {
        "contentrefresh": "加载中",
        "contentnomore": "- 没有聊天记录 -"
      }
    })
  } : {}, {
    i: $data.call_list.length
  }, $data.call_list.length ? {
    j: common_vendor.t($data.call_list.length),
    k: common_vendor.o((...args) => $options.showCallMe && $options.showCallMe(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30bdb53c"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/components/uni-im-msg-list/uni-im-msg-list.vue"]]);
wx.createComponent(Component);
