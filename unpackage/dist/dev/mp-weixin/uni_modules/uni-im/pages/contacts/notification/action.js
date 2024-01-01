"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const db = common_vendor.Bs.database();
async function action({
  subType,
  confirm,
  cancel,
  item
}, callback) {
  console.log({
    subType,
    confirm,
    cancel,
    item
  });
  switch (subType) {
    case "uni-im-friend-invite":
      common_vendor.index.showLoading({
        mask: false
      });
      return db.collection("uni-im-friend-invite").doc(item.payload.data._id).update({
        state: confirm ? 100 : -100
      }).then((res) => {
        common_vendor.index.hideLoading();
        callback();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    case "uni-im-group-join-request":
      common_vendor.index.showLoading({
        mask: false
      });
      await db.collection("uni-im-group-join").where({
        _id: item.payload.data.doc_id
      }).update({
        state: confirm ? 100 : -100
      }).then((res) => {
        common_vendor.index.hideLoading();
        callback();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
      break;
    default:
      console.log({ subType });
      break;
  }
}
exports.action = action;
