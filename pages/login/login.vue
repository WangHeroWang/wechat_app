<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isShow">
			<view>
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions

	} from 'vuex';
	export default {
		data() {
			return {
				isShow:false,
			};
		},
		computed: mapState(['serverUrl']),
		onLoad() { //默认加载
		console.log("dologin")
			this.doLogin();
		},
		methods: {
			...mapMutations(['login']),
			...mapActions(['updateUserInfo']),
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes.userInfo)
						_this.login(infoRes.userInfo)
						uni.reLaunch({
							url:'/pages/tabs/index/index'
						})
						try {
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			doLogin() {
				var _this =this;
				uni.showLoading({
					title: '加载中...'
				});
				uni.request({
					url: _this.serverUrl +'/wx/check/code', //仅为示例，并非真实接口地址。
					// methods:"POST",
					data: {
						code: uni.getStorageSync('token')
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (sres) => {
						console.log("获取用户信息", sres);

						if (sres.data.code == 403) {
							// 1.wx获取登录用户code
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									let code = loginRes.code;
									console.log("返回code", code)
									uni.request({
										url: _this.serverUrl + '/wx/login',
										data: {
											code: code,
										},
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded',
										},
										success: (res) => {
											var cookie = res.header['Set-Cookie']
											
											uni.setStorage({ //缓存用户登陆状态
												key: 'token',
												data: res.data.data.token
											})
											uni.setStorage({ //缓存用户登陆状态
												key: 'setcookie',
												data: cookie
											})
											console.log("loginres",res)
											if(res.data.data.userStatus== 0){
												_this.isShow = true;
											}else {
												uni.reLaunch({
													url:'/pages/tabs/index/index'
												})
											}
											uni.hideLoading();
										}
									});
								},
							});
							return;
						}else{
							uni.reLaunch({
								url:'../tabs/index/index'
							})
						}
					}
				});
			},





			//向后台更新信息
			// updateUserInfo() {
			// 	let _this = this;
			// 	uni.request({
			// 		url: 'url', //服务器端地址
			// 		data: {
			// 			customerId: _this.customerId,
			// 			nickName: _this.nickName,
			// 			headUrl: _this.avatarUrl
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success: (res) => {
			// 			if (res.data.state == "success") {
			// 				uni.reLaunch({ //信息更新成功后跳转到小程序首页
			// 					url: '/pages/index/index'
			// 				});
			// 			}
			// 		}

			// 	});
			// }
		},

	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
