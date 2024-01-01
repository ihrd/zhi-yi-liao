"use strict";
const common_vendor = require("../../../common/vendor.js");
function createObservable(data, name = "imObservableData") {
  if (typeof common_vendor.index[name] == "undefined") {
    data = common_vendor.reactive(data);
    common_vendor.index[name] = data;
  }
  return common_vendor.index[name];
}
exports.createObservable = createObservable;
