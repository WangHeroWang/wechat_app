<template>
	<view class="content">
		<text class="success-icon yticon"></text>
		<text class="tit">订单支付成功</text>
		<text class="tit titone">￥{{price}}</text>
		<text class="tit tittwo">稍后为您加油哦~</text>
		<view class="btn-group">
			<!-- <navigator url="/pages/tabs/cart/cart" open-type="redirect" class="mix-btn hollow">查看订单</navigator> -->
			<navigator url="/pages/tabs/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:0,
			}
		},
		onLoad(option) {
			this.price=option.price;
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}

	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 70upx;
		/* font-size: $font-lg; */
		color: #fff;
		/* background-color: $base-color; */
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
	.yticon{
		width: 200upx;
		height: 200upx;
		/* background:url(../../static/huiji/wanchneg.png) center no-repeat; */
		background-size: 100%;
	}
	.titone{
		font-size: 47upx;
		line-height: 100upx;
	}
	.tittwo{
		font-size: 30upx;
		line-height: 50upx;
		color: #666666;
	}
</style>
