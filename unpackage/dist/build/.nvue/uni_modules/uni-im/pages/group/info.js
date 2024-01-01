import { _ as _export_sfc, f as formatAppLog, a as resolveEasycom } from "../../../../_plugin-vue_export-helper.js";
import { B as Bs, a as uniIm } from "../../../../utils.js";
import { _ as __easycom_0 } from "../../../../uni-icons.js";
import { resolveDynamicComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, Fragment, renderList, toDisplayString, createBlock, createCommentVNode, withCtx, createTextVNode } from "vue";
import { _ as __easycom_3 } from "../../../../uni-list-item.js";
import { _ as __easycom_1 } from "../../../../uni-list.js";
import { _ as __easycom_5, a as __easycom_6 } from "../../../../uni-popup.js";
import "../../../../uni-i18n.es.js";
const _style_0 = { "pages": { "": { "width": "750rpx", "flex": 1, "backgroundColor": "#f5f5f5" } }, "usersInfo": { "": { "flexDirection": "row", "marginBottom": 8, "backgroundColor": "#FFFFFF", "flexWrap": "wrap" } }, "item": { "": { "width": "150rpx", "marginTop": 5, "marginRight": 0, "marginBottom": 5, "marginLeft": 0, "alignItems": "center", "justifyContent": "center", "position": "relative" } }, "minus-filled": { "": { "position": "absolute", "top": 0, "right": 5 } }, "avatar": { "": { "width": "100rpx", "height": "100rpx", "borderRadius": 10 } }, "nickname": { "": { "width": "150rpx", "textAlign": "center", "fontSize": 14, "color": "#666666", "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx", "overflow": "hidden", "textOverflow": "ellipsis", "lines": 1 } }, "logo": { "": { "width": 50, "height": 50 } }, "invite-box": { "": { "alignItems": "center" } }, "invite": { "": { "width": "100rpx", "height": "100rpx", "marginTop": 5, "marginRight": 0, "marginBottom": 5, "marginLeft": 0, "justifyContent": "center", "borderRadius": 10, "backgroundColor": "#f5f5f5" } }, "exitGroup": { "": { "marginTop": 10, "marginRight": 0, "marginBottom": 10, "marginLeft": 0, "backgroundColor": "#FFFFFF", "paddingTop": 6, "paddingRight": 0, "paddingBottom": 6, "paddingLeft": 0, "color": "#e64141", "borderRadius": 0 } }, "introduction": { "": { "color": "#666666", "fontSize": 14, "width": "560rpx", "textAlign": "right" } }, "join_option": { "": { "color": "#666666", "fontSize": 14 } }, "slot-code": { "": { "alignItems": "center", "flexDirection": "row" } }, "group-code": { "": { "width": "50rpx", "height": "50rpx", "marginLeft": "10rpx" } } };
const db = Bs.database();
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
    ...uniIm.mapState(["isWidescreen"]),
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
      this.isAdmin = adminUserId == Bs.getCurrentUserInfo().uid;
      if (!this.isAdmin) {
        if (!this.isWidescreen) {
          var webview = this.$scope.$getAppWebview();
          webview.setStyle({
            titleNView: {
              buttons: []
            }
          });
        }
      } else {
        if (this.isWidescreen) {
          this.manage = true;
        }
      }
    },
    "conversation.group_member": {
      handler(group_member, oldValue) {
        formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:130", "group_member", group_member);
        this.member_list = [];
        for (let key in group_member) {
          this.member_list.push(group_member[key]);
        }
        let title = "群信息（" + this.member_list.length + "人）";
        uni.setNavigationBarTitle({
          title
        });
      },
      deep: true,
      immediate: true
    }
    // （后续）通过监听实现实时切换管理员实时刷新权限
    // __f__('log','at uni_modules/uni-im/pages/group/info.nvue:144','isAdmin',isAdmin);
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
      var webview = this.$scope.$getAppWebview();
      webview.setTitleNViewButtonStyle(0, {
        text: this.manage ? "退出" : "管理"
      });
    }
  },
  methods: {
    async load(conversation_id) {
      this.conversation = await uniIm.conversation.get(conversation_id);
    },
    async expel(item) {
      uni.showModal({
        title: "确定要将该用户移出本群吗？",
        content: "不能撤销，请谨慎操作",
        cancelText: "取消",
        confirmText: "确认",
        complete: async (e) => {
          if (e.confirm) {
            uni.showLoading({
              mask: true
            });
            try {
              let res = await db.collection("uni-im-group-member").where({
                user_id: item._id,
                group_id: this.conversation.group_info._id
              }).remove();
              if (res.result.deleted) {
                uni.showToast({
                  title: "成功移除",
                  icon: "none",
                  complete: () => {
                  }
                });
              }
            } catch (error) {
              uni.showToast({
                title: error.message,
                icon: "error",
                complete: () => {
                }
              });
            }
            uni.hideLoading();
          }
        }
      });
    },
    invite() {
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:229", "group_info._id", this.conversation.group_info._id);
      uni.navigateTo({
        url: "/uni_modules/uni-im/pages/contacts/createGroup/createGroup?group_id=" + this.conversation.group_info._id
      });
    },
    async exitGroup() {
      const group_id = this.conversation.group_info._id;
      if (this.isAdmin) {
        uni.showModal({
          title: "确认要解散群聊吗？",
          content: "不能撤销，请谨慎操作",
          cancelText: "取消",
          confirmText: "确认",
          complete: async (e) => {
            formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:244", e);
            if (e.confirm) {
              uni.showLoading({
                mask: true
              });
              let res = await db.collection("uni-im-group").where({
                _id: group_id
              }).remove().finally((res2) => {
                uni.hideLoading();
              });
              formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:260", "exitGroup", res);
            }
          }
        });
      } else {
        uni.showModal({
          title: "确认要退出群聊吗？",
          content: "不能撤销，请谨慎操作",
          cancelText: "取消",
          confirmText: "确认",
          complete: async (e) => {
            formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:271", e);
            if (e.confirm) {
              uni.showLoading({
                mask: true
              });
              let res = await db.collection("uni-im-group-member").where({
                user_id: Bs.getCurrentUserInfo().uid,
                group_id
              }).remove();
              if (res.result.deleted) {
                uni.showToast({
                  title: "成功退出",
                  icon: "none"
                });
              }
              uni.hideLoading();
              formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:291", "exitGroup", res);
            }
          }
        });
      }
    },
    openPopupInfo(type) {
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:298", type);
      if (!this.isAdmin)
        return;
      this.editorType = type;
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:304", this.conversation.group_info.name, 11);
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:305", this.conversation.group_info.introduction, 22);
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
        uni.showToast({
          title: "内容不能为空！",
          icon: "none"
        });
        return;
      }
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:326", "----", value);
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
      uni.showActionSheet({
        itemList: ["自由加入", "需要验证权限", "禁止加入"],
        success: (e) => {
          let join_option = ["freeAccess", "needPermission", "disableApply"][e.tapIndex];
          this.editGroupInfo({
            join_option
          });
        },
        fail: (err) => {
          formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:350", "err: ", err);
        }
      });
    },
    async editGroupInfo(group_info) {
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:355", "group_info---------", group_info);
      this.conversation.group_info = Object.assign(this.conversation.group_info, group_info);
      let res = await db.collection("uni-im-group").doc(this.conversation.group_id).update(group_info);
      formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:360", "change group info", res.result.updated, this.conversation);
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
      uni.chooseImage({
        count: 1,
        crop,
        success: async (res) => {
          formatAppLog("log", "at uni_modules/uni-im/pages/group/info.nvue:374", 899889, res);
          let tempFile = res.tempFiles[0], avatar_file = {
            extname: tempFile.path.split(".")[tempFile.path.split(".").length - 1]
          }, filePath = res.tempFilePaths[0];
          let cloudPath = Bs.getCurrentUserInfo().uid + "" + Date.now();
          avatar_file.name = cloudPath;
          uni.showLoading({
            title: "更新中",
            mask: true
          });
          let {
            fileID
          } = await Bs.uploadFile({
            filePath,
            cloudPath,
            fileType: "image"
          });
          avatar_file.url = fileID;
          uni.hideLoading();
          this.editGroupInfo({
            avatar_file
          });
        }
      });
    },
    toQRCode() {
      let url = this.logoUrl ? this.logoUrl : "";
      uni.navigateTo({
        url: "/uni_modules/uni-im/pages/group/groupQRCode?id=" + this.conversation.group_info._id + "&name=" + this.conversation.group_info.name + "&avatar_file=" + url,
        complete: (e) => {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  const _component_uni_list_item = resolveEasycom(resolveDynamicComponent("uni-list-item"), __easycom_3);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_1);
  const _component_button = resolveComponent("button");
  const _component_uni_popup_dialog = resolveEasycom(resolveDynamicComponent("uni-popup-dialog"), __easycom_5);
  const _component_uni_popup = resolveEasycom(resolveDynamicComponent("uni-popup"), __easycom_6);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "pages" }, [
      createElementVNode("view", { class: "usersInfo" }, [
        createElementVNode("scroll-view", {
          class: "usersInfo",
          scrollY: "true",
          enableFlex: true
        }, [
          createElementVNode("view", { style: { "height": "150px", "width": "750rpx", "flex-direction": "row", "flex-wrap": "wrap" } }, [
            createElementVNode("view", { class: "invite-box" }, [
              createElementVNode("view", { class: "invite" }, [
                createVNode(_component_uni_icons, {
                  onClick: $options.invite,
                  color: "#989898",
                  size: "20px",
                  class: "plusempty",
                  type: "plusempty"
                }, null, 8, ["onClick"])
              ]),
              createElementVNode("u-text", { class: "nickname" }, "邀请")
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.member_list, (item, index) => {
              return openBlock(), createElementBlock("view", {
                class: "item",
                key: index
              }, [
                createElementVNode("u-image", {
                  class: "avatar",
                  src: item.avatar_file ? item.avatar_file.url : "/uni_modules/uni-im/static/avatarUrl.png",
                  mode: "widthFix"
                }, null, 8, ["src"]),
                createElementVNode("u-text", { class: "nickname" }, toDisplayString(item.nickname || "匿名用户"), 1),
                $data.manage ? (openBlock(), createBlock(_component_uni_icons, {
                  key: 0,
                  onClick: ($event) => $options.expel(item),
                  color: "#e64348",
                  size: "20px",
                  class: "minus-filled",
                  type: "minus-filled"
                }, null, 8, ["onClick"])) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ])
      ]),
      createVNode(_component_uni_list, null, {
        default: withCtx(() => [
          $data.conversation.group_id ? (openBlock(), createBlock(_component_uni_list_item, {
            key: 0,
            onClick: $options.toQRCode,
            clickable: true,
            title: "群号和二维码",
            link: ""
          }, {
            footer: withCtx(() => [
              createElementVNode("view", { class: "slot-code" }, [
                createElementVNode("u-image", {
                  class: "group-code",
                  src: "/uni_modules/uni-im/static/qrCode.png",
                  mode: "widthFix"
                })
              ])
            ]),
            _: 1
          }, 8, ["onClick"])) : createCommentVNode("", true),
          createVNode(_component_uni_list_item, {
            onClick: _cache[0] || (_cache[0] = ($event) => $options.openPopupInfo("editorName")),
            title: "群聊名称",
            showArrow: $data.isAdmin,
            clickable: true
          }, {
            footer: withCtx(() => [
              createElementVNode("u-text", { class: "introduction" }, toDisplayString($data.conversation.group_info.name), 1)
            ]),
            _: 1
          }, 8, ["showArrow"]),
          createVNode(_component_uni_list_item, {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.openPopupInfo("editorInfo")),
            title: "简介",
            showArrow: $data.isAdmin,
            clickable: true
          }, {
            footer: withCtx(() => [
              createElementVNode("u-text", { class: "introduction" }, toDisplayString($data.conversation.group_info.introduction || "未设置"), 1)
            ]),
            _: 1
          }, 8, ["showArrow"]),
          createVNode(_component_uni_list_item, {
            onClick: $options.setAvatar,
            title: "群头像",
            clickable: true
          }, {
            footer: withCtx(() => [
              createElementVNode("u-image", {
                class: "logo",
                src: $options.logoUrl || "/uni_modules/uni-im/static/avatarUrl.png",
                mode: ""
              }, null, 8, ["src"])
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_uni_list_item, {
            onClick: $options.setAddGroupType,
            title: "加群方式",
            note: "申请加入本群的验证规则",
            clickable: true
          }, {
            footer: withCtx(() => [
              createElementVNode("u-text", { class: "join_option" }, toDisplayString($options.join_option), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        _: 1
      }),
      createVNode(_component_button, {
        class: "exitGroup",
        onClick: $options.exitGroup
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($data.isAdmin ? "解散群聊" : "退出群聊"), 1)
        ]),
        _: 1
      }, 8, ["onClick"]),
      createVNode(_component_uni_popup, {
        ref: "popupInfo",
        type: "dialog"
      }, {
        default: withCtx(() => [
          createVNode(_component_uni_popup_dialog, {
            mode: "input",
            title: $data.editorType == "editorName" ? "编辑群聊名称" : "编辑群聊简介",
            placeholder: $data.editorType == "editorName" ? "请输入群聊名称" : "请输入群聊简介",
            duration: 2e3,
            "before-close": true,
            value: $data.value,
            onClose: $options.closePopupInfo,
            onConfirm: $options.confirmPopupInfo
          }, null, 8, ["title", "placeholder", "value", "onClose", "onConfirm"])
        ]),
        _: 1
      }, 512)
    ])
  ]);
}
const info = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  info as default
};
