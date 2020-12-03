<template>
	<view class="container">
		<view class="payfor-box">
			<view class="payfor-boxh3">
				<view>订单详情</view>
			</view>
			<view class="payfor-boxul">
				<view>创建时间</view><text class="payfor-boxulli">{{orderInfo.createTime}}</text>
			</view>
			<view class="payfor-boxul" v-if="orderInfo.paymentStatus!=1">
				<view>支付时间</view><text class="payfor-boxulli">{{orderInfo.paymentTime}}</text>
			</view>
			<view class="payfor-boxul">
				<view>商户订单号</view><text class="payfor-boxulli">{{orderInfo.orderCode}}</text>
			</view>
			<view class="payfor-boxul" v-if="orderInfo.paymentStatus!=1">
				<view>微信订单号</view><text class="payfor-boxulli">{{orderInfo.transNo}}</text>
			</view>
			<view class="payfor-boxul">
				<view>加油车牌号</view><text class="payfor-boxulli">{{orderInfo.carNum||'暂未填写'}}</text>
			</view>
			<view class="payfor-boxul">
				<view>加油站名称</view><text class="payfor-boxulli">{{orderInfo.staticName}}</text>
			</view>
			<view class="payfor-boxul">
				<view>油品</view><text class="payfor-boxulli">{{orderInfo.machineNozzleOilsType==0?'汽油':'柴油'}}</text>
			</view>
			<view class="payfor-boxul">
				<view>油号</view><text class="payfor-boxulli">{{orderInfo.machineNozzleOils}}</text>
			</view>
			
			<view class="payfor-boxul" style="border: 0;">
				<view>金额</view><view class="payfor-boxulli payfor-boxullione">约
				<text>{{orderInfo.litre}}</text>
				L<text>¥{{orderInfo.total}}</text></view>
			</view>
			
		</view>
		<view class="payfor-box">
			<view class="payfor-boxh3">
				<view>订单状态</view>
			</view>
			<view class="payfor-boxul">
				<view>是否支付</view><text class="payfor-boxulli">{{orderInfo.paymentStatus==1?'未支付':'已支付'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import mrpzx from '@/components/mrpzx-checker-box/mrpzx-checker-box.vue';
	export default {
		components: {
			mrpzx
		},
		data() {
			return {
				orderInfo:{},
				id: "",
				type: 'radio',
				isCheck: !1,
				question: {
					value: 0,
					answer: [{
						id: 1,
						title: '微信'
					}, {
						id: 2,
						title: '支付宝'
					}]
				}
			};
		},
		computed: {
			iconType() {
				return this.type == 'radio' ? 'circle' : 'box'
			},
			...mapState(['hasLogin', 'serverUrl'])
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.getGasInfo(this.id)
		},
		methods: {
			...mapActions(['isLogin']),
			//详情
			getGasInfo(id) {
				console.log("id")
				uni.request({
				    url: this.serverUrl+`/api/wx/filling/order/get/${id}`,//仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':uni.getStorageSync('setcookie'),
						'token': uni.getStorageSync('token'),
					},
				    success: (res)=> {
						console.log("订单详情",res)
						this.orderInfo = res.data.data
					}
				});
			},
			onChange(value, isCheck) {
				console.log('changed: ' + JSON.stringify([value, isCheck]))
			},
			onOptionChange(value, isCheck) {
				if (value !== this.type) {
					this.$refs.questionChecker.clearCheck()
				}
				this.type = value
			}
		},
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background-color: #f4f4f4;
		// height: 98vh;
		padding-top: 20upx;
		overflow: hidden;
	}

	.payfor-box {
		width: 680upx;
		background-color: #FFFFFF;
		padding: 15upx;
		margin: 0 auto;
		margin-bottom: 30upx;
		border-radius: 10upx;
		font-size: 30upx;

		.payfor-boxh3 {
			width: 95%;
			margin: 0 auto;

			view {
				border-left: 3px solid #007AFF;
				padding-left: 20upx;
			}

			padding: 20upx 0;
			font-weight: bold;
			border-bottom: 1px solid #f5f5f5;
		}

		.payfor-boxul {
			width: 95%;
			margin: 0 auto;
			line-height: 120upx;
			display: flex;
			border-bottom: 1px solid #f5f5f5;
			font-size: 26upx;

			view {
				width: 30%;
				color: #3A3E43;
			}

			.payfor-boxulli {
				width: 70%;
				text-align: right;

				text {
					font-size: 26upx;
					color: #333333;
					padding-left: 20upx;
				}
			}

			.payfor-boxullione {
				color: #007AFF;
			}

		}
	}

	.checker-box .title {
		padding: 42rpx 0 40rpx;
		font-size: 40rpx;
		font-weight: 700;
		color: #33353f;
		margin: 0 38rpx;
		max-height: 190rpx;
		line-height: 54rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}

	.checker-item {
		border-bottom: 1px solid #f5f5f5;
	}

	.checker-box .checker-item .answer {
		display: inline-block;
		padding: 40upx 0;
		font-size: 26upx;
		line-height: 44upx;
		width: 92%
	}

	.checker-box .item-selected .checker-item-tag .answer {
		color: #2e5bff;
		font-weight: 700
	}

	.payfor-pos {
		width: 680upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: fixed;
		bottom: 20upx;
		left: 35upx;
		display: flex;
		font-size: 26upx;
		overflow: hidden;

		.payfor-posje {
			width: 60%;
			display: flex;

			view {
				line-height: 80upx;
				padding-left: 30upx;
			}

			text {
				font-size: 38upx;
				line-height: 80upx;
				padding-left: 10upx;
				color: #E01414;

				label {
					font-size: 22upx;
				}
			}
		}

		.payfor-posqrzf {
			width: 40%;
			display: flex;

			text {
				color: #808080;
				line-height: 80upx;
				padding-left: 10upx;
			}
		}
	}

	.payfor-posqrzfbutton {
		background-color: #E01414;
		border-radius: 0;
		font-size: 28upx;
		color: #FFFFFF;
		margin-right: 0;
		line-height: 80upx;
	}
</style>
