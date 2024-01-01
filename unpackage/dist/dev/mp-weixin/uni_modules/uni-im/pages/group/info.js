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
const db = common_vendor.Bs.database();
const _sfc_main = {
  data() {
    return {
      conversation: {
        group_info: {
          user_id: ""
        },
        group_member: {}
      },
      member_list: [],
      manage: false,
      editorType: "",
      value: "",
      groupType: "",
      isAdmin: false
    };
  },
  computed: {
    ...uni_modules_uniIm_lib_main.uniIm.mapState(["isWidescreen"]),
    logoUrl() {
      return this.conversation.group_info.avatar_file ? this.conversation.group_info.avatar_file.url : false;
    },
    join_option() {
      let val = this.conversation.group_info.join_option;
      return {
        needPermission: "需要验证权限",
        freeAccess: "自由加入",
        disableApply: "禁止加入"
      }[val];
    }
  },
  watch: {
    "conversation.group_info.user_id"(adminUserId) {
      this.isAdmin = adminUserId == common_vendor.Bs.getCurrentUserInfo().uid;
      if (!this.isAdmin) {
        if (!this.isWidescreen)
          ;
      } else {
        if (this.isWidescreen) {
          this.manage = true;
        }
      }
    },
    "conversation.group_member": {
      handler(group_member, oldValue) {
        console.log("group_member", group_member);
        this.member_list = [];
        for (let key in group_member) {
          this.member_list.push(group_member[key]);
        }
        let title = "群信息（" + this.member_list.length + "人）";
        common_vendor.index.setNavigationBarTitle({
          title
        });
      },
      deep: true,
      immediate: true
    }
    // （后续）通过监听实现实时切换管理员实时刷新权限
    // console.log('isAdmin',isAdmin);
  },
  props: {
    conversation_id: {
      default() {
        return false;
      }
    }
  },
  async onLoad(e) {
    if (!e.conversation_id) {
      throw new Error("会话id不能为空");
    }
    this.load(e.conversation_id);
  },
  mounted() {
    if (this.conversation_id) {
      this.load(this.conversation_id);
    }
  },
  onShow() {
  },
  onNavigationBarButtonTap(e) {
    if (e.index === 0) {
      this.manage = !this.manage;
    }
  },
  methods: {
    async load(conversation_id) {
      this.conversation = await uni_modules_uniIm_lib_main.uniIm.conversation.get(conversation_id);
    },
    async expel(item) {
      common_vendor.index.showModal({
        title: "确定要将该用户移出本群吗？",
        content: "不能撤销，请谨慎操作",
        cancelText: "取消",
        confirmText: "确认",
        complete: async (e) => {
          if (e.confirm) {
            common_vendor.index.showLoading({
              mask: true
            });
            try {
              let res = await db.collection("uni-im-group-member").where({
                user_id: item._id,
                group_id: this.conversation.group_info._id
              }).remove();
              if (res.result.deleted) {
                common_vendor.index.showToast({
                  title: "成功移除",
                  icon: "none",
                  complete: () => {
                  }
                });
              }
            } catch (error) {
              common_vendor.index.showToast({
                title: error.message,
                icon: "error",
                complete: () => {
                }
              });
            }
            common_vendor.index.hideLoading();
          }
        }
      });
    },
    invite() {
      console.log("group_info._id", this.conversation.group_info._id);
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-im/pages/contacts/createGroup/createGroup?group_id=" + this.conversation.group_info._id
      });
    },
    async exitGroup() {
      const group_id = this.conversation.group_info._id;
      if (this.isAdmin) {
        common_vendor.index.showModal({
          title: "确认要解散群聊吗？",
          content: "不能撤销，请谨慎操作",
          cancelText: "取消",
          confirmText: "确认",
          complete: async (e) => {
            console.log(e);
            if (e.confirm) {
              common_vendor.index.showLoading({
                mask: true
              });
              let res = await db.collection("uni-im-group").where({
                _id: group_id
              }).remove().finally((res2) => {
                common_vendor.index.hideLoading();
              });
              console.log("exitGroup", res);
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          title: "确认要退出群聊吗？",
          content: "不能撤销，请谨慎操作",
          cancelText: "取消",
          confirmText: "确认",
          complete: async (e) => {
            console.log(e);
            if (e.confirm) {
              common_vendor.index.showLoading({
                mask: true
              });
              let res = await db.collection("uni-im-group-member").where({
                user_id: common_vendor.Bs.getCurrentUserInfo().uid,
                group_id
              }).remove();
              if (res.result.deleted) {
                common_vendor.index.showToast({
                  title: "成功退出",
                  icon: "none"
                });
              }
              common_vendor.index.hideLoading();
              console.log("exitGroup", res);
            }
          }
        });
      }
    },
    openPopupInfo(type) {
      console.log(type);
      if (!this.isAdmin)
        return;
      this.editorType = type;
      console.log(this.conversation.group_info.name, 11);
      console.log(this.conversation.group_info.introduction, 22);
      if (type == "editorName" && this.conversation.group_info.name) {
        this.value = this.conversation.group_info.name;
      } else if (type == "editorInfo" && this.conversation.group_info.introduction) {
        this.value = this.conversation.group_info.introduction;
      } else {
        this.value = "";
      }
      this.$refs.popupInfo.open();
    },
    closePopupInfo() {
      this.$refs.popupInfo.close();
    },
    confirmPopupInfo(value) {
      if (!value) {
        common_vendor.index.showToast({
          title: "内容不能为空！",
          icon: "none"
        });
        return;
      }
      console.log("----", value);
      if (this.editorType == "editorName") {
        this.editGroupInfo({
          name: value
        });
      } else {
        this.editGroupInfo({
          introduction: value
        });
      }
      this.$refs.popupInfo.close();
    },
    setAddGroupType() {
      if (!this.isAdmin)
        return;
      common_vendor.index.showActionSheet({
        itemList: ["自由加入", "需要验证权限", "禁止加入"],
        success: (e) => {
          let join_option = ["freeAccess", "needPermission", "disableApply"][e.tapIndex];
          this.editGroupInfo({
            join_option
          });
        },
        fail: (err) => {
          console.log("err: ", err);
        }
      });
    },
    async editGroupInfo(group_info) {
      console.log("group_info---------", group_info);
      this.conversation.group_info = Object.assign(this.conversation.group_info, group_info);
      let res = await db.collection("uni-im-group").doc(this.conversation.group_id).update(group_info);
      console.log("change group info", res.result.updated, this.conversation);
    },
    async setAvatar() {
      if (!this.isAdmin)
        return;
      const crop = {
        quality: 100,
        width: 600,
        height: 600,
        resize: true
      };
      common_vendor.index.chooseImage({
        count: 1,
        crop,
        success: async (res) => {
          console.log(899889, res);
          let tempFile = res.tempFiles[0], avatar_file = {
            extname: tempFile.path.split(".")[tempFile.path.split(".").length - 1]
          }, filePath = res.tempFilePaths[0];
          {
            filePath = await new Promise((callback) => {
              common_vendor.index.navigateTo({
                url: "/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage?path=" + filePath + `&options=${JSON.stringify(crop)}`,
                animationType: "fade-in",
                events: {
                  success: (url) => {
                    callback(url);
                  }
                },
                complete(e) {
                }
              });
            });
          }
          let cloudPath = common_vendor.Bs.getCurrentUserInfo().uid + "" + Date.now();
          avatar_file.name = cloudPath;
          common_vendor.index.showLoading({
            title: "更新中",
            mask: true
          });
          let {
            fileID
          } = await common_vendor.Bs.uploadFile({
            filePath,
            cloudPath,
            fileType: "image"
          });
          avatar_file.url = fileID;
          common_vendor.index.hideLoading();
          this.editGroupInfo({
            avatar_file
          });
        }
      });
    },
    toQRCode() {
      let url = this.logoUrl ? this.logoUrl : "";
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-im/pages/group/groupQRCode?id=" + this.conversation.group_info._id + "&name=" + this.conversation.group_info.name + "&avatar_file=" + url,
        complete: (e) => {
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.invite),
    b: common_vendor.p({
      color: "#989898",
      size: "20px",
      type: "plusempty"
    }),
    c: common_vendor.f($data.member_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar_file ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
        b: common_vendor.t(item.nickname || "匿名用户")
      }, $data.manage ? {
        c: common_vendor.o(($event) => $options.expel(item), index),
        d: "0dfdeea3-1-" + i0,
        e: common_vendor.p({
          color: "#e64348",
          size: "20px",
          type: "minus-filled"
        })
      } : {}, {
        f: index
      });
    }),
    d: $data.manage,
    e: $data.conversation.group_id
  }, $data.conversation.group_id ? {
    f: common_vendor.o($options.toQRCode),
    g: common_vendor.p({
      clickable: true,
      title: "群号和二维码",
      link: true
    })
  } : {}, {
    h: common_vendor.t($data.conversation.group_info.name),
    i: common_vendor.o(($event) => $options.openPopupInfo("editorName")),
    j: common_vendor.p({
      title: "群聊名称",
      showArrow: $data.isAdmin,
      clickable: true
    }),
    k: common_vendor.t($data.conversation.group_info.introduction || "未设置"),
    l: common_vendor.o(($event) => $options.openPopupInfo("editorInfo")),
    m: common_vendor.p({
      title: "简介",
      showArrow: $data.isAdmin,
      clickable: true
    }),
    n: $options.logoUrl || "/uni_modules/uni-im/static/avatarUrl.png",
    o: common_vendor.o($options.setAvatar),
    p: common_vendor.p({
      title: "群头像",
      clickable: true
    }),
    q: common_vendor.t($options.join_option),
    r: common_vendor.o($options.setAddGroupType),
    s: common_vendor.p({
      title: "加群方式",
      note: "申请加入本群的验证规则",
      clickable: true
    }),
    t: common_vendor.t($data.isAdmin ? "解散群聊" : "退出群聊"),
    v: common_vendor.o((...args) => $options.exitGroup && $options.exitGroup(...args)),
    w: common_vendor.o($options.closePopupInfo),
    x: common_vendor.o($options.confirmPopupInfo),
    y: common_vendor.p({
      mode: "input",
      title: $data.editorType == "editorName" ? "编辑群聊名称" : "编辑群聊简介",
      placeholder: $data.editorType == "editorName" ? "请输入群聊名称" : "请输入群聊简介",
      duration: 2e3,
      ["before-close"]: true,
      value: $data.value
    }),
    z: common_vendor.sr("popupInfo", "0dfdeea3-8"),
    A: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0dfdeea3"], ["__file", "D:/Development/WeChat/chatKYXF/uni_modules/uni-im/pages/group/info.nvue"]]);
wx.createPage(MiniProgramPage);
