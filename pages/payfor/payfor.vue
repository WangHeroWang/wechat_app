<template>
	<view class="container">
		<view class="payfor-box">
			<view class="payfor-boxh3">
				<view>加油订单</view>
			</view>
			<view class="payfor-boxul">
				<view>加油站名称</view><text class="payfor-boxulli">{{stationInfo}}</text>
			</view>
			<view class="payfor-boxul">
				<view>油品</view><text class="payfor-boxulli">{{orderInfo.machineNozzleOilsType==0?'汽油':'柴油'}}</text>
			</view>
			<view class="payfor-boxul">
				<view>油号</view><text class="payfor-boxulli">{{orderInfo.machineNozzleOils}}</text>
			</view>
			<view class="payfor-boxul">
				<view>升数</view>
				<view class="payfor-boxulli payfor-boxullione">
					约<text>{{sheng}}</text>L
				</view>
			</view>
			<view class="payfor-boxul">
				<view>金额</view>
				<view class="payfor-boxulli payfor-boxullione">
					¥{{orderInfo.total}}
					<text>
						单价{{orderInfo.oilsPrice}}/L
					</text>
				</view>
			</view>
			<view class="payfor-boxul" style="border: 0;">
			<!-- <view class="index-form" style="display: flex;"> -->
				<view>车牌号</view>
				<view class="payfor-boxulli payfor-boxullione">
					
				<input type="text" placeholder="选填" v-model="orderInfo.carNum" />
				</view>
			<!-- </view> -->
			</view>

		</view>
		<view class="payfor-box">
			<view class="payfor-boxh3">
				<view>支付方式</view>
			</view>
			<mrpzx-checker-box ref="questionChecker" @on-change="onChange" :type="type" v-model="question.value" :class="{'item-selected': isCheck}">
				<mrpzx-checker-item @checkItem="contentClick" :iconType="iconType" :checked="ishas" :value="vo.id" index="question"
				 disabled v-for="(vo, index) in question.answer" :key="index">
					<view class="answer">{{vo.title}}</view>
					<view class="line"></view>
				</mrpzx-checker-item>
			</mrpzx-checker-box>
		</view>

		<view class="payfor-pos">
			<view class="payfor-posje">
				<view>合计待支付</view>
				<text><label>¥</label>{{orderInfo.total}}</text>
			</view>
			<view class="payfor-posqrzf">
				<!-- <text>明细 ▾</text> -->
				<button class="payfor-posqrzfbutton" @tap="payfor">
					确认支付
				</button>
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
				ishas:false,
				orderInfo: {},
				stationInfo: {},
				sheng: 0,
				type: 'radio',
				isCheck: !1,
				question: {
					value: 0,
					answer: [{
						id: 1,
						title: '微信'
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
			this.orderInfo = JSON.parse(option.orderInfo);
			this.stationInfo = option.stationInfo;
			this.sheng = this.orderInfo.litre.toFixed(2);
		},
		methods: {
			...mapActions(['isLogin']),
			//详情
			getGasInfo(id) {
				console.log("id")
				uni.request({
					url: this.serverUrl + `/api/wx/filling/order/get/${id}`, //仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie': uni.getStorageSync('setcookie')
					},
					success: (res) => {
						this.isLogin(res.data.code);
						console.log("支付详情", res);
						this.orderInfo = res.data.data;
					}
				});
			},
			topay(data) {
				let that = this
				console.log("支付", data)
				wx.requestPayment({
					timeStamp: data.timeStamp, //时间
					nonceStr: data.nonceStr, //随机字符
					package: data.package, //
					signType: 'MD5',
					paySign: data.paySign, //签名
					success(res) {
						console.log("支付成功", res);
						uni.reLaunch({
							url: `/pages/money/money?price=${that.orderInfo.total}`
						})
					},
					fail(rej) {
						//取消支付
						console.log("支付失败")
						uni.reLaunch({
							url:'../tabs/cart/cart'
						})
					}
				});
			},
			payfor() {
				console.log("ishas",this.orderInfo.carNum);
				
				// if(this.orderInfo.carNum==undefined){
				// 	uni.showToast({
				// 		title: '请输入车牌号',
				// 		icon: 'none',
				// 		duration: 1000,
				// 		mask: true
				// 	});
				// 	setTimeout(() => {
				// 		uni.hideToast();
				// 	}, 1000);
				// 	return;
				// }
				if (this.ishas == false) {
					uni.showToast({
						title: '请选择支付方式',
						icon: 'none',
						duration: 1000,
						mask: true
					});
					setTimeout(() => {
						uni.hideToast();
					}, 1000);
					return;
				}
				//微信支付
				wx.request({
					url: this.serverUrl + `/api/wx/filling/order/doUnifiedOrder`, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: { ...this.orderInfo
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie': uni.getStorageSync('setcookie'),
						'token': uni.getStorageSync('token')
					},
					success: (data) => {
						//判断token失效
						console.log("打印data", data);

						this.isLogin(data.code);
						this.topay(data.data);

					}
				});

				console.log('点击确认支付')
			},
			contentClick(isCheck, index, value) {
				this.ishas = !this.ishas;
				this.isCheck = isCheck
				console.log('isCheck: ' + isCheck + "\n" + 'index: ' + index + "\n" + 'value:' + value)
				console.log((isCheck ? '选中了：' : '取消选中') + value)
				console.log('question.value: ' + JSON.stringify(this.question.value))
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
		background-color: #f4f4f4;
		height: 98vh;
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
			align-items: center;
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
				font-size: 26upx;
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
