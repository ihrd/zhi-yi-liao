"use strict";
const common_vendor = require("../../../common/vendor.js");
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
  common_vendor.index.onAppShow(function() {
    appEvent.onAppShow();
  });
  common_vendor.index.onAppHide(function() {
    appEvent.onAppHide();
  });
}, 0);
exports.appEvent = appEvent;
