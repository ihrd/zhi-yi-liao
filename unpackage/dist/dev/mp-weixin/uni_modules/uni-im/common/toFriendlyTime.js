"use strict";
function toFriendlyTime(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const date = new Date(timestamp);
  const secondsAgo = Math.floor((now - date) / 1e3);
  if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    if (secondsAgo < 60) {
      return "刚刚";
    }
    if (secondsAgo < 60 * 60) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes}分钟前`;
    }
    if (secondsAgo < 60 * 60 * 2) {
      const hours = Math.floor(secondsAgo / (60 * 60));
      const minutes = Math.floor((secondsAgo - hours * 60 * 60) / 60);
      return `${hours}小时 ${minutes}分钟前`;
    }
    const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
    const hour2 = date.getHours() % 12 || 12;
    const minute2 = date.getMinutes().toString().padStart(2, "0");
    return `${ampm2} ${hour2}:${minute2}`;
  }
  const oneDayMs = 24 * 60 * 60 * 1e3;
  if (now - date < oneDayMs * 2) {
    if (date.getDate() === now.getDate() - 1 && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
      const hour2 = date.getHours() % 12 || 12;
      const minute2 = date.getMinutes().toString().padStart(2, "0");
      return `昨天 ${ampm2} ${hour2}:${minute2}`;
    } else {
      const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
      const hour2 = date.getHours() % 12 || 12;
      const minute2 = date.getMinutes().toString().padStart(2, "0");
      return `前天 ${ampm2} ${hour2}:${minute2}`;
    }
  }
  const oneWeekMs = oneDayMs * 7;
  const diffMs = now - date;
  if (diffMs < oneWeekMs) {
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const ampm2 = date.getHours() >= 12 ? "下午" : "上午";
    const hour2 = date.getHours() % 12 || 12;
    const minute2 = date.getMinutes().toString().padStart(2, "0");
    return `${days[date.getDay()]} ${ampm2} ${hour2}:${minute2}`;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "下午" : "上午";
  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${ampm} ${hour}:${minute}`;
}
exports.toFriendlyTime = toFriendlyTime;
