"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
const uni_modules_uniIm_common_utils = require("./uni_modules/uni-im/common/utils.js");
require("./uni_modules/uni-id-pages/config.js");
require("./uni_modules/uni-im/common/md5.js");
require("./uni_modules/uni-im/common/toFriendlyTime.js");
require("./uni_modules/uni-im/common/appEvent.js");
require("./uni_modules/uni-id-pages/common/store.js");
require("./uni_modules/uni-im/lib/main.js");
require("./uni_modules/uni-im/lib/MsgManager.js");
require("./uni_modules/uni-im/lib/createObservable.js");
if (!Math) {
  "./pages/index/index.js";
  "./uni_modules/uni-im/pages/index/index.js";
  "./uni_modules/uni-im/pages/common/uni-im-code-pages/uni-im-code-pages.js";
  "./uni_modules/uni-im/pages/userList/userList.js";
  "./uni_modules/uni-im/pages/chat/chat.js";
  "./uni_modules/uni-im/pages/common/video/video.js";
  "./uni_modules/uni-im/pages/group/info.js";
  "./uni_modules/uni-im/pages/contacts/notification/notification.js";
  "./uni_modules/uni-im/pages/contacts/contacts.js";
  "./uni_modules/uni-im/pages/contacts/addPeopleGroups/addPeopleGroups.js";
  "./uni_modules/uni-im/pages/contacts/createGroup/createGroup.js";
  "./uni_modules/uni-im/pages/group/groupQRCode.js";
  "./uni_modules/uni-im/pages/contacts/groupList/groupList.js";
  "./uni_modules/uni-im/pages/chat/info.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/login/login-smscode.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.js";
  "./uni_modules/uni-id-pages/pages/register/register-by-email.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.js";
  "./uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js";
}
const _sfc_main = {
  onLaunch: async function() {
    uni_modules_uniIdPages_init.uniIdPagesInit();
    uni_modules_uniIm_common_utils.utils.init();
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Development/WeChat/chatKYXF/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
