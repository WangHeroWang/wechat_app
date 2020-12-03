<template>
	<view class="main">
		<view class="header">
		</view>
		<view class="orders">
			<view class="box">
				<view class="ordersyuebox orderborder">
					<navigator url="../../total/total">
						<view>{{money}}</view>
						<text>累计消费（元）</text>
					</navigator>
				</view>

				<view class="ordersyuebox">
					<!-- <navigator url="../../total/totaljy"> -->
						<view>{{sheng}}</view>
						<text>累计加油升数（L）</text>
					<!-- </navigator> -->

				</view>
			</view>
		</view>
		<view class="title">
			<view @tap="tap(sindex)" v-for="(sitem,sindex) in list" :key="sindex" :class="[current==sindex?'active':'']">{{sitem.title}}</view>
		</view>

		<!-- <swiper :current="current" @change="stap">
			<swiper-item v-for="(titem,tindex) in list" :key="tindex"> -->
				<view class="index-List-box" v-for="(item,index) in orderList" :key="index" @tap="toOrderInfo(item.orderId)">
					<image src="../../../static/158330.jpg"></image>
					<view class="index-List-boxcon">
						<view class="index-List-boxtext">{{item.staticName || '加油站名称'}}</view>
						<view class="index-content-box-text">
							<text>单号编号：{{item.orderCode || '暂无数据'}}</text>
						</view>
						<view class="index-content-box-text">
							<text>油品：{{item.machineNozzleOilsType==1?'柴油':'汽油'}}</text> <text>油号：{{item.machineNozzleOils || '暂无数据'}}</text>
						</view>
						<view class="index-content-box-text">
							<text>加油机编号：{{item.machineCode || '暂无数据' }}</text>
						</view>
						<view class="index-content-box-text">
							<text>订单时间：{{item.createTime || '暂无数据'}}</text>
						</view>
						<view class="index-content-box-text">
							<view>消费金额：<text>{{item.total || '暂无数据'}}</text></view>
							<view v-bind:class="[item.paymentStatus==1?'will':'done']">{{item.paymentStatus==1?'未支付':'已支付'}}</view>
						</view>
					</view>
				</view>
			<!-- </swiper-item>
		</swiper> -->
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				orderList: [],
				money: 0, //消费金额
				sheng: 0, //升
				current: 0,
				list: [{
						title: "全部",
					},
					{
						title: "未支付",
					},
					{
						title: "已支付",
					}
				]
			}
		},
		computed: mapState(['serverUrl']),
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			this.current = 0;
			this.getOrderList();
			setTimeout(() => {
				uni.hideLoading()
			}, 1000)
		},
		onShow() {
			this.current=0;
			this.getOrderList();
		},
		methods: {
			// 订单详情
			toOrderInfo(id) {
				uni.navigateTo({
					url: `/pages/tabs/cart/orderInfo?id=${id}`
				})
			},

			tap(index) {
				this.current = index;
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(() => {
					uni.hideLoading()
				}, 1000)
				if(index != 0){
				console.log(index)
				this.getList(this.current);
				}else if(index == 0){
					this.getOrderList();
				}
			},
			stap(e) {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(() => {
					uni.hideLoading()
				}, 1000)
					this.current = e.detail.current;
				if(e.detail.current != 0 ){
					console.log(e.detail.current)
					this.getList(this.current);
				}else if(e.detail.current == 0){
					this.getOrderList();
				}
				
			},
			//订单列表
			getOrderList() {
				this.money = 0;
				this.sheng = 0;
				uni.request({
					url: this.serverUrl + '/api/wx/filling/order/list', //仅为示例，并非真实接口地址。
					header: {
						'token': uni.getStorageSync('token'),
						'Cookie': uni.getStorageSync('setcookie')
					},
					success: (res) => {
						console.log("全部订单列表", res)
						this.orderList = res.data.data.orders;
						this.sheng = res.data.data.litre;
						this.money = res.data.data.total;
					}
				});
			},
			// 
			getList(status) {
				uni.request({
					url: this.serverUrl + `/api/wx/filling/order/paystatus/get/${status}`, //仅为示例，并非真实接口地址。
					header: {
						'token': uni.getStorageSync('token'),
						'Cookie': uni.getStorageSync('setcookie')
					},
					success: (res) => {
						console.log("支付列表", res)
						this.orderList = res.data.data;
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	swiper-item {
		overflow: visible;
		min-height: 30vh;
	}

	.main {
		display: flex;
		flex-direction: column;
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#007AFF;
		width:92%;
		height:10vw;
		padding:0 4%;
		display:flex;
		align-items:center;


	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #007AFF;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			display: flex;
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.ordersyuebox {
				width: 50%;
				text-align: center;

				view {
					font-size: 30upx;
					color: #333333;
				}

				text {
					font-size: 24upx;
					color: #808080;
				}
			}
		}
	}

	.list {
		width: 100%;
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

	.orderborder {
		border-right: 1px solid #808080;
	}

	.title {
		background-color: #f9f9f9;
		display: flex;
		width: 80%;
		margin: 0 auto;
		box-sizing: border-box;
		height: 60upx;
		font-size: 28upx;
		line-height: 60upx;
		text-align: center;

		view {
			height: 60upx;
			line-height: 60upx;
			padding: 0;
			display: block;
			width: 50%;
			border: none;

			&:after {
				border: none;
				border-radius: 0;
			}
		}
	}

	.active {
		background: #007AFF;
		color: #FFFFFF;
		border-radius: 10upx;
	}

	.content {
		background: #F8F8F8;
	}

	// swiper{
	// 	display: block;
	// 	flex: 1;
	// }

	// swiper :first-child {
	// 	overflow: visible;

	// }
	// swiper:last-child{
	// 	overflow: visible;

	// }
	swiper {
		display: flex;
		flex: 1 1 auto;

	}

	swiper :first-child {
		overflow: visible;
	}

	.kongindex {
		background-color: #007AFF;
		margin: 0 auto;

		.kongindeximg {
			width: 500upx;
			text-align: center;
			background-color: #007AFF;

			image {
				width: 300upx;
				height: 300upx;
			}
		}
	}

	.index-List-box {

		display: flex;
		width: 700upx;
		margin: 20upx auto;
		padding-bottom: 10upx;

		image {
			width: 200upx;
			height: 200upx;
			border-radius: 5upx;
		}

		.index-List-boxtext {
			font-size: 32upx;
			line-height: 45upx;
			margin-left: 15upx;
		}

		.index-content-price {
			margin-top: 10upx;
			margin-bottom: 5upx;
			width: 430upx;
			margin-left: 15upx;
		}

		.index-content-box-text {
			font-size: 22upx;
			text-indent: .8em;
			width: 430upx;
			display: flex;

			view {
				line-height: 40upx;
				font-size: 24upx;
				text-align: left;
				border: 1px solid #eee;
				margin: 0 auto;
				border-radius: 10upx;
				// color: #999999;
			}

			text {
				width: 400upx;
				color: #888888;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				label {
					font-size: 30upx;
					color: #007AFF;
				}
			}

			view {
				text-align: center;
				width: 330upx;
			}
		}

	}
	.will{
		color: #DD524D;
	}
	.done{
		color: #007AFF;
	}
</style>

