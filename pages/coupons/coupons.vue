<template>
	<view>
		<view class="title">
			<view @tap="tap(index)" v-for="(item,index) in list" :key="index" :class="[current==index?'active':'']">{{item.title}}</view>
		</view>
		
		<swiper :current="current" class="tap-label">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="coupons-box">
					<view class="coupons-one">
						<view class="coupons-oneleft">
							<view class="coupons-onelefth3"><text>￥</text>{{index}}</view>
							<view class="coupons-onelefth4">满300元可使用</view>
						</view>
						<view class="coupons-oner">
							<view class="coupons-h3">25元新司机加油券</view>
							<view class="coupons-h5">适用于中民油部分合作加油站</view>
							<view class="coupons-h6">2020.03.20 17：00-2020.04.20 17：00</view>
						</view>
					</view>
				</view>
				<view class="coupons-box">
					<view class="coupons-one">
						<view class="coupons-oneleft">
							<view class="coupons-onelefth3"><text>￥</text>123</view>
							<view class="coupons-onelefth4">满300元可使用</view>
						</view>
						<view class="coupons-oner">
							<view class="coupons-h3">25元新司机加油券</view>
							<view class="coupons-h5">适用于中民油部分合作加油站</view>
							<view class="coupons-h6">2020.03.20 17：00-2020.04.20 17：00</view>
						</view>
					</view>
				</view>
				<view class="coupons-boxwu">
					没有数据了...
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				current: 0,
				list: [{
						title: "未使用",
					},
					{
						title: "已使用",
					},
					{
						title: "已过期",
					}
				]
			}
		},
		methods: {
			tap(index) {
				this.current = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F1F1F1
	}
	swiper-item{
		overflow: visible;
		min-height: 30vh;
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

	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;
		font-size: 28upx;
		.li {
			width: 100%;
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
	.title {
		background-color: #FFFFFF;
		display: flex;
		// width: 80%;
		margin: 0 auto;
		box-sizing: border-box;
		height: 80upx;
		font-size:28upx;
		line-height: 80upx;
		text-align: center;
	
		view {
			height: 80upx;
			line-height: 80upx;
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
		// background:#007AFF;
		color: #333;
		font-weight: bold;
		border-radius: 10upx;
	}
	
	.content {
		background: #F8F8F8;
	}
	
	swiper {
		display: flex;
		flex: 1 1 auto;
		
	}
	
	swiper :first-child {
		overflow: visible;
	}
	.kongindex{
			background-color: #007AFF;
			margin: 0 auto;
			.kongindeximg{
				width: 500upx;
				text-align:center;
				background-color: #007AFF;
				image{
					width: 300upx;
					height: 300upx;
				}
			}
	}
	.coupons-box{
		width: 90%;
		margin: 10upx auto;
		padding:20upx;
		background: url(../../static/youhuiq.png) center no-repeat;
		background-size: 100%;
		.coupons-one{
			display: flex;
			.coupons-oneleft{
				width: 28%;
				padding-top:30upx;
				text-align: center;
				.coupons-onelefth3{
			
					font-size: 38upx;
					color: #f00;
					line-height: 50upx;
				}
				.coupons-onelefth4{
			
					font-size: 22upx;
					color: #999999;
					line-height: 50upx;
				}
			}
			.coupons-oner{
				width:69%;
				padding-left: 2%;
				text-align: left;
				.coupons-onelefth3{
					font-size: 33upx;
					color: #f00;
				}
				.coupons-h3{
					font-size: 28upx;
					line-height: 80upx;
				}
				.coupons-h5{
					font-size: 22upx;
					color: #999999;
				}
				.coupons-h6{
					font-size: 22upx;
					color: #999999;
					line-height: 50upx;
				}
			}
		}
	}
	.coupons-boxwu{
		text-align: center;
		font-size: 25upx;
		color: #999999;
	}
</style>
