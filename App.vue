<script>
//1. 导入uni身份信息管理模块
import uniIdPagesInit from '@/uni_modules/uni-id-pages/init.js';
//2. 导入uniIm的Utils工具类
import uniImUtils from '@/uni_modules/uni-im/common/utils.js';
export default {
	onLaunch: async function() {
		// console.log('App Launch');
		//3. 初始化uni身份信息管理模块
		uniIdPagesInit();
		//4. 初始化uniIm
		uniImUtils.init();
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style lang="scss">
	/*每个页面公共css */
	
	/* #ifdef H5 */
	@media screen and (min-width:960px){
		/* pc宽屏 隐藏会话页面头部 && 全局底部导航 以下兼容了Vue2和3两种模式的样式*/
		uni-page[data-page="uni_modules/uni-im/pages/index/index"] uni-page-head,
		.uni_modules-uni-im-pages-index-index uni-page-head,
		uni-tabbar,
		.uni-app--showtabbar uni-page-wrapper::after
		{
			display: none !important;
		}
	}
	/* #endif */

	/* #ifndef APP-NVUE */
	@import "@/uni_modules/uni-im/static/iconfont.css";
	/* #endif */
</style>
