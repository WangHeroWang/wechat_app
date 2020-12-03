<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face">
					<image :src="userInfo.memberIcon"></image>
				</view>
				<view class="info">
					<view class="username">{{userInfo.memberName}}</view>
					<view class="integral">性别:{{userInfo.memberSex==2?'女':'男'}}</view>
					<!-- 1男,2女 -->
					<!-- <view class="integral" style="display: block;">地址:{{userInfo.province}}{{userInfo.city}}</view> -->
				</view>
			</view>
			<!-- <view class="setting">
				<image src="../../../static/HM-PersonalCenter/setting.png"></image>
			</view> -->
		</view>
		<view class="orders">
			<view class="box">
				<view class="ordersyuebox orderborder">
					<view>1000</view>
					<text>加油余额（元）</text>
				</view>
				
				<!-- <navigator class="ordersyuebox" url="../../coupons/coupons"> -->
					<view class="ordersyuebox">
						<view>0</view>
						<text>优惠券</text>
					</view>
				<!-- </navigator> -->
				
			</view>
		</view>
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
			 hover-class="hover" :key="li.name">
				<view class="icon">
					<image :src="'../../../static/HM-PersonalCenter/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<!-- <image class="to" src="../../../static/HM-PersonalCenter/to.png"></image> -->
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				//#ifdef APP-PLUS
				isH5Plus: true,
				//#endif
				userInfo: {},
				severList: [
					[
						{
							name: '优惠券',
							icon: 'quan.png'
						}
					],
					[
						{
							name: '在线客服',
							icon: 'kefu.png'
						}
					]
				],
			};
		},
		computed: mapState(['hasLogin','serverUrl']),
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				uni.request({
					url: this.serverUrl + '/api/wx/filling/member/info/get', //服务器端地址
					header: {
						'Cookie': uni.getStorageSync('setcookie'),
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("userinfo",res)
						this.userInfo = res.data.data
					}
				
				});
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.showToast({
					title: this.orderTypeLise[index].name
				});
			},
			//用户点击列表项
			toPage(list_i, li_i) {
				uni.showToast({
					title: this.severList[list_i][li_i].name
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
		overflow: hidden;
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#007AFF;
		width:92%;
		height:30vw;
		margin: 0 auto;
		box-sizing: border-box;
		padding:0 6%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #007AFF;
		width: 92%;
		height: 11vw;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			display: flex;
			width: 98%;
			box-sizing: border-box;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.ordersyuebox{
					width: 50%;
					text-align: center;
					view{
						font-size: 30upx;
						color: #333333;
					}
					text{
						font-size: 24upx;
						color: #808080;
					}
				}
		}
	}

	.list {
		width: 100%;
		box-sizing: border-box;
		border-bottom: solid 26upx #f1f1f1;
		font-size: 28upx;
		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
	.orderborder{
		border-right: 1px solid #808080;
	}
</style>
