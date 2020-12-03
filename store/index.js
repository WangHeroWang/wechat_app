import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isCanUse: uni.getStorageSync('isCanUse') || true,
		hasLogin: false,
		userInfo: {},
		user_id: '',
		serverUrl:'https://zmy.yiduoxilanhua.cn',
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			// state.user_id = userInfo.id;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: userInfo
			})
			// console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.user_id = '';

		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {

		//登录
		// async doLogin({
		// 	dispatch,
		// 	commit,
		// 	state
		// }) {
		// 	uni.showLoading({
		// 		title: '登录中...'
		// 	});
		// 	uni.request({
		// 		url: 'http://192.168.0.251:8087/wx/check/code', //仅为示例，并非真实接口地址。
		// 		data: {
		// 			code: uni.getStorageSync('token')
		// 		},
		// 		header: {
		// 			'content-type': 'application/x-www-form-urlencoded',
		// 		},
		// 		success: (sres) => {
		// 			console.log("获取用户信息", sres);

		// 			if (sres.data.code == 403) {
		// 				// 1.wx获取登录用户code
		// 				uni.login({
		// 					provider: 'weixin',
		// 					success: function(loginRes) {
		// 						let code = loginRes.code;
		// 						console.log("返回code", code)
		// 						if (!state.isCanUse) {
		// 							// 非第一次授权获取用户信息
		// 							uni.getUserInfo({
		// 								provider: 'weixin',
		// 								success: function(infoRes) {
		// 									uni.setStorageSync("userInfo", infoRes);
		// 									//获取用户信息后向调用信息更新方法
		// 									let nickName = infoRes.userInfo.nickName; //昵称
		// 									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
		// 									// dispatch.updateUserInfo(); //调用更新信息方法
		// 								}
		// 							});
		// 						}
		// 						uni.request({
		// 							url: state.serverUrl + '/wx/login',
		// 							data: {
		// 								code: code,
		// 							},
		// 							method: 'POST',
		// 							header: {
		// 								'content-type': 'application/x-www-form-urlencoded',
		// 							},
		// 							success: (res) => {
		// 								console.log("请求头", res.header['Set-Cookie'])
		// 								var cookie = res.header['Set-Cookie']

		// 								uni.setStorage({ //缓存用户登陆状态
		// 									key: 'token',
		// 									data: res.data.data
		// 								})
		// 								uni.setStorage({ //缓存用户登陆状态
		// 									key: 'setcookie',
		// 									data: cookie
		// 								})
		// 								uni.hideLoading();

		// 							}
		// 						});

		// 					},


		// 				});
		// 				return;
		// 			}
		// 		}
		// 	});
		// },
		//更新用户信息
		updateUserInfo({
			dispatch,
			commit,
			state
		}) {
			uni.request({
				url: state.serverUrl + '/api/wx/filling/member/update', //服务器端地址
				data: {
					memberType: 1,
					memberName: state.userInfo.nickName,
					memberSex: state.userInfo.gender,
					memberIcon: state.userInfo.avatarUrl
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie': uni.getStorageSync('setcookie'),
					'token': uni.getStorageSync('token')
				},
				success: (res) => {
					dispatch('isLogin', res.data.code);
				}

			});
		},
		//判断失效
		async isLogin({dispatch,state}, code) {
			if (code == 403) {
				uni.showToast({
					icon:'none',
					title:'登录失效,请重新登录',
					duration:1000,
					mask:true
				});
				setTimeout(()=>{
					uni.hideToast();
				},1000)
				uni.reLaunch({
					url:'/pages/login/login'
				})
				// await dispatch('doLogin');
				return;
			}
		}

	}

})

export default store
