<template>
	<view class="content">
		<view class="quotabox">
			<view class="quotaone"><text>￥</text>{{money}}</view>
			<view class="quotaview">累计加油（升）</view>
		</view>
		<view class="quotaxf" v-for="(item,index) in orderList" :key="index">
			<view class="quotah3">
				<view>{{item.staticName ||'加油站名称'}}</view>
				<text>{{item.createTime}}</text>
			</view>
			<view class="quotah2">
				-{{item.total}}
			</view>
		</view>
		<view class="kongindex">
			<!-- <image src="../../static/kong.png"></image> -->
			<view>暂无累计消费记录</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
	export default {
		data() {
			return {
				money:0,
				orderList:[],
			}
		},
		computed: mapState(['serverUrl']),
		onLoad() {
			this.getOrderList();
		},
		methods: {
			...mapActions(['isLogin']),
			//订单列表
			getOrderList() {
				this.money = 0;
				uni.request({
					url: this.serverUrl + '/api/wx/filling/order/list', //仅为示例，并非真实接口地址。
					header: {
						'token': uni.getStorageSync('token'),
							'Cookie':uni.getStorageSync('setcookie')
					},
					success: (res) => {
						console.log("列表", res)
						this.isLogin(res.data.code);
						var list = res.data.data;
						this.orderList = list.filter(item=>{
							if(item.paymentStatus == 2){
								//已支付
								this.money += item.litre;
								return item
							}
						});
						console.log("已支付",this.orderList)
						
					}
				});
			},
		}
	}
</script>

<style lang='scss'>
	.quotabox{
		width: 750upx;
		padding-top: 40upx;
		padding-bottom: 20upx;
		text-align: center;
		.quotaone{
			font-size: 44upx;
			font-weight: bold;
			line-height: 55upx;
			text{
				font-size: 24upx;
			}
		}
		.quotaview{
			font-size: 28upx;
			color: #666;
		}
	}
	.kongindex{
		width: 750upx;
		margin-top: 20%;
			image{
				width: 300upx;
				height: 300upx;
				display: block;
				margin: 0 auto;
			}
			
		view{
			text-align: center;
			font-size: 22upx;
			color: #999999;
		}
	}
	.quotaxf{
		width: 90%;
		margin: 0 auto;
		display: flex;
		margin-top: 20upx;
		border-bottom: 1px solid #F1F1F1;
		.quotah3{
			width: 80%;
			font-size: 30upx;
			color: #333;
			line-height: 50upx;
			text{
				font-size: 24upx;
				color: #999999;
			}
		}
		.quotah2{
			width: 20%;
			line-height: 100upx;
			text-align: right;
			font-size: 40upx;
			color: #f00;
		}
	}
</style>
