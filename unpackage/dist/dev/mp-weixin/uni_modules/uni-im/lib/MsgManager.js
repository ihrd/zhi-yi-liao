"use strict";
const common_vendor = require("../../../common/vendor.js");
require("./main.js");
const uni_modules_uniIm_common_md5 = require("../common/md5.js");
const db = common_vendor.Bs.database();
const dbCmd = db.command;
class Message {
  constructor(currentConversation) {
    this.indexDB = false;
    this.isInit = false;
    this.msgList = [];
    this.getMore = async () => {
      if (this.cloudMsg.hasAfterStorage) {
        let minTime = await this.localMsgMaxTime(), maxTime = this.msgListMinTime();
        let data = await this.cloudMsg.get({ minTime, maxTime });
        if (data.length) {
          return data;
        } else {
          this.cloudMsg.hasAfterStorage = false;
          return this.getMore();
        }
      } else if (this.localMsg.hasBeforeList) {
        let maxTime = this.msgListMinTime();
        let data = await this.localMsg.get({
          maxTime
        });
        if (data.length) {
          return data;
        } else {
          this.localMsg.hasBeforeList = false;
          return this.getMore();
        }
      }
      if (this.cloudMsg.hasBeforeStorage) {
        let maxTime = this.msgList[0] ? this.msgList[0].create_time : false;
        let data = await this.cloudMsg.get({
          maxTime
        });
        if (data.length) {
          return data;
        } else {
          this.cloudMsg.hasBeforeStorage = false;
          return [];
        }
      }
    };
    this.cloudMsg = {
      hasAfterStorage: true,
      hasBeforeStorage: true,
      get: async ({
        minTime = 0,
        maxTime = false,
        limit = 30
      } = {}) => {
        let where = {
          "conversation_id": this.conversation_id
        };
        if (minTime && maxTime) {
          where.create_time = dbCmd.and([
            dbCmd.gt(minTime),
            dbCmd.lt(maxTime)
          ]);
        } else {
          if (minTime) {
            where.create_time = dbCmd.gt(minTime);
          }
          if (maxTime) {
            where.create_time = dbCmd.lt(maxTime);
          }
        }
        const msgTable = db.collection("uni-im-msg");
        let data;
        try {
          let res = await msgTable.where(where).limit(limit).orderBy("create_time", "desc").get();
          data = res.result.data.reverse();
        } catch (e) {
          data = [];
        }
        if (data.length) {
          this.localMsg.add(data, minTime === 0 ? "unshift" : "push");
        }
        return data;
      }
    };
    this.localMsg = {
      maxTime: false,
      hasBeforeList: true,
      get: async ({
        minTime = 0,
        maxTime = false,
        limit = 30,
        orderBy = { "create_time": "asc" }
        //asc 升序，desc 降序
      } = {}) => {
        let data = common_vendor.index.getStorageSync(this.localMsg.key) || [];
        data = data.filter((item) => {
          if (minTime && (item.create_time < minTime || item.create_time == minTime)) {
            return false;
          }
          if (maxTime && (item.create_time > maxTime || item.create_time == maxTime)) {
            return false;
          }
          return true;
        });
        data = data.sort((a, b) => {
          if (orderBy.create_time == "asc") {
            return a.create_time - b.create_time;
          } else {
            return b.create_time - a.create_time;
          }
        });
        if (limit) {
          data = data.slice(0, limit);
        }
        return data;
      },
      add: async (datas, action = "push") => {
        if (!Array.isArray(datas)) {
          datas = [datas];
        }
        datas.forEach(async (data) => {
          data.unique_id = uni_modules_uniIm_common_md5.md5(JSON.stringify(data) + Math.random());
        });
        let _datas = await this.localMsg.get();
        if (_datas.length > 20) {
          let tipText = "提示：当前会话的离线（存到storage）的聊天记录已经超过20条，";
          if (action == "push") {
            console.log(tipText + "将“自动删除”旧数据后再添加新数据。如果你有其他策略可以自己修改此逻辑");
            _datas = _datas.slice(-1 * datas.length);
          } else {
            return console.log(tipText + "不再存储更多");
          }
        }
        _datas[action](...datas);
        common_vendor.index.setStorageSync(this.localMsg.key, _datas);
        let maxTime = datas.map((i) => i.create_time).sort((a, b) => b - a)[0];
        let localMsgMaxTime = await this.localMsgMaxTime();
        if (maxTime > await localMsgMaxTime) {
          this.localMsg.maxTime = maxTime;
        }
      },
      update: async (unique_id, data) => {
        data = Object.assign({}, data);
        let _datas = await this.localMsg.get();
        let index = _datas.findIndex((i) => i.unique_id == unique_id);
        _datas[index] = data;
        common_vendor.index.setStorageSync(this.localMsg.key, _datas);
      }
    };
    this.conversation_id = currentConversation.id;
    Object.defineProperty(this, "msgList", {
      get() {
        if (currentConversation.isInit) {
          return currentConversation.msgList;
        } else {
          return [];
        }
      },
      set(data) {
        currentConversation.msgList = data;
      }
    });
    this.localMsg.key = "uni-im-msg-" + this.conversation_id;
  }
  async sleep(t) {
    return await new Promise((resolve, rejece) => {
      setTimeout(resolve, t);
    });
  }
  async localMsgMaxTime() {
    if (this.localMsg.maxTime === false) {
      let lastLocalDatas = await this.localMsg.get({ limit: 1, orderBy: { "create_time": "desc" } });
      let [lastLocalData] = lastLocalDatas;
      if (lastLocalData) {
        this.localMsg.maxTime = lastLocalData.create_time;
      } else {
        this.localMsg.maxTime = 0;
      }
    }
    return this.localMsg.maxTime;
  }
  msgListMinTime() {
    let item = this.msgList[0];
    if (item) {
      return item.create_time;
    } else {
      return 0;
    }
  }
}
exports.Message = Message;
