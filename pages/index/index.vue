<template>
  <view class="container">
    <view class="header">
      <text class="title">智医聊+</text>
    </view>

    <uni-list class="list">
      <uni-list-item
        title="会话列表"
        @click="toPath('/uni_modules/uni-im/pages/index/index')"
        :link="true"
        :show-badge="unreadMsgCount > 0"
        :badge-text="unreadMsgCount + ''"
        :badge-style="{'background':'#f41500'}"
      ></uni-list-item>

<!--      <uni-list-item
        title="用户列表"
        @click="toPath('/uni_modules/uni-im/pages/userList/userList')"
        :link="true"
      ></uni-list-item> -->

      <uni-list-item
        title="通讯录"
        @click="toPath('/uni_modules/uni-im/pages/contacts/contacts')"
        :link="true"
        :show-badge="notificationUnreadCount > 0"
        :badge-text="notificationUnreadCount + ''"
        :badge-style="{'background':'#f41500'}"
      ></uni-list-item>

      <uni-list-item
        title="个人中心"
        @click="toPath('/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true')"
        :link="true"
      ></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
  import uniIm from '@/uni_modules/uni-im/lib/main.js';
  import sqlite from '@/uni_modules/uni-im/common/sqlite.js';

  export default {
    computed: {
      unreadMsgCount() {
        return uniIm.conversation.unreadCount();
      },
      notificationUnreadCount() {
        return uniIm.notification.unreadCount();
      }
    },
    data() {
      return {};
    },
    async onReady() {
      if (!uniIm.isWidescreen) {
        uni.showLoading({ mask: true });
        try {
          await uniIm.conversation.loadMore();
        } catch (e) {
          console.log(e);
        }
        uni.hideLoading();
      }
    },
    methods: {
      toPath(path) {
        uni.navigateTo({
          url: path,
          fail: () => {
            uni.switchTab({
              url: path,
              fail: (e) => {
                console.error(e);
              }
            });
          }
        });
      },
      async clear() {
        // #ifdef APP
        sqlite.init();
        // #endif
      }
    }
  }
</script>

<style>
  .container {
    padding: 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
