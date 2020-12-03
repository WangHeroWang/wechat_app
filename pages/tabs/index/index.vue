<template>
	<view class="">
		<view class="container">
			<view class="index-back">
				<swiper class="swiper" circular="true" autoplay="true" interval="3000" duration="1000" :current="swiperCurrent" @change="changeSwiper">
					<swiper-item v-for="item in swiperImg" :key="item.rotationPictureId">
						<image class="swiper-item" :src="item.rotationPictureImg" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="index-content">
				<view class="index-content-h3">
					<text>便捷加油</text>
					<view class="index-content-button">
						<ms-dropdown-item v-model="tIndex" :list="typeList" @input="getTypeList"></ms-dropdown-item>
					</view>
					<!-- 汽油 -->
					<view class="index-content-button" v-if="tIndex == 0">
						<ms-dropdown-item v-model="gasIndex" :list="gasList" @input="getGas"></ms-dropdown-item>
					</view>
					<!-- 柴油 -->
					<view class="index-content-button" v-else>
						<ms-dropdown-item v-model="oIndex" :list="oilList" @input="getOil"></ms-dropdown-item>
					</view>

				</view>
				<view class="" v-if="stationList.length !=  0">

					<view class="index-content-box">
						<view class="index-content-box-l">
							<view class="index-content-box-button">
								<text>离您最近</text>{{stationList[0].staticName ||'暂无数据'}}
							</view>
							<view class="index-content-box-text">{{stationList[0].staticAddress||'暂无'}}</view>
						</view>
						<view class="index-content-box-r">
							
								<view @click.stop="toMap(stationList[0])">
									<image src="../../../static/dibiao.png"></image>
								</view>
								<text>{{distance}}km</text>
							
						</view>
					</view>
					<view class="index-content-price">
						<text class="index-content-pricetext">¥</text>
						<view class="index-content-priceview">{{stationList[0].machinePrice ||'暂无'}}</view>
						<view class="index-content-price-box" v-if="stationList[0].cutPrice!=0"><text>▾</text> <text>下降</text> {{stationList[0].cutPrice || 0}}</view>
						<view class="index-content-price-gbiaojia">国标价¥{{stationList[0].internationalPrice ||'暂无'}}</view>
					</view>
					<button class="index-content-pricebutton" @click="toggle(stationList[0].staticId)">立即加油</button>
					<image src="../../../static/vip.jpg" mode="widthFix" class="index-vipbox"></image>
				</view>
			</view>
			<view class="index-contentone">
				<view class="index-contentone-dl">
					<image src="../../../static/wodac.jpg"></image>
					<text>我的爱车</text>
				</view>
				<view class="index-contentone-dl">
					<image src="../../../static/wodad.jpg"></image>
					<text>保养美容</text>
				</view>
				<view class="index-contentone-dl">
					<image src="../../../static/wodae.jpg"></image>
					<text>我的爱车</text>
				</view>
				<view class="index-contentone-dl">
					<image src="../../../static/wodaf.jpg"></image>
					<text>我的爱车</text>
				</view>
			</view>
			<view class="index-List">
				<view>为你推荐</view>

				<text @click="toType">更多›› </text>
			</view>
			<view v-if="stationList.length >0" class="index-List-box" v-for="(item,index) in stationList" :key="index" @click="toggle(item.staticId)">
				<image src="../../../static/158330.jpg"></image>
				<view class="index-List-boxcon">
					<view class="index-List-boxtext">{{item.staticName}}</view>
					<view class="index-content-price">
						<!-- <text class="index-content-pricetext">¥</text> -->
						<view class="index-content-priceview">¥{{item.machinePrice}}</view>
						<view class="index-content-price-box" v-if="item.cutPrice != 0"><text>▾</text><text>下降</text>{{item.cutPrice}}</view>
						<view class="index-content-price-gbiaojia">国标价¥{{item.internationalPrice}}</view>
					</view>
					<view class="index-content-box-text">
						<text>{{item.staticAddress}}</text>
						<view @click.stop="toMap(item)" class="mapImg">
							<image src="../../../static/dibiao.png" style="width: 20rpx;height: 20rpx;"></image>
						</view>
						<view>{{item.range.toFixed(2)}}km</view>
					</view>
						
				</view>
			</view>
			<view class="index-List-box" v-else>
				<text style="font-size: 26rpx; text-align: center;padding: 20rpx;">暂无该油号加油站推荐</text>
			</view>

			<!-- 立即加油 -->
			<view class="index-posbox" v-if="play">
				<view class="" style="width: 100%;height: 35vh;" @click="toggle(-1)">
					
				</view>
					<view class="index-posboxxz">
						<view class="index-guanbi" @click="toggle(-1)"></view>
						<view class="index-posone">
							<image src="../../../static/158330.jpg"></image>
							<view style="margin-left: 10upx;">
								<view class="index-List-boxtext">{{stationInfo.staticName}}</view>
								<view class="index-content-box-text">
									<text>{{stationInfo.staticAddress}}</text>
								</view>
								<view class="index-content-price" v-if="machineNozzleOilsType==null">
									<text class="index-content-pricetext">¥</text>
									<view class="index-content-priceview">{{stationInfo.machinePrice}}</view>
									<view class="index-content-price-box" v-if="stationInfo.cutPrice!=0"><text>▾ </text>{{stationInfo.cutPrice}}</view>
									<view class="index-content-price-gbiaojia">国标价¥{{stationInfo.internationalPrice}}</view>
								</view>
								<!--  -->
								<view class="index-content-price" v-else>
									<text class="index-content-pricetext">¥</text>
									<view class="index-content-priceview">{{shopItemInfo.oilsPrice||0}}</view>
									<view class="index-content-price-box"><text>▾ </text>{{shopItemInfo.total||0}}</view>
									<view class="index-content-price-gbiaojia">国标价¥{{shopItemInfo.internationalPrice||0}}</view>
								</view>
							</view>
							<view class="index-content-box-r">
								<view @click.stop="toMap(stationInfo)" >
									<image src="../../../static/dibiao.png"></image>
								</view>
								<text>{{range}} km</text>
							</view>
						</view>
						<movable-area style="width: 100%; height: 100%;">
							<movable-view style="width: 100%; height: 100rpx;" :x="x" :y="y" direction="all" @touchstart="startMove" @touchend="endMove"></movable-view>
						<view class="content">
							<view class="productConten">
								<view class="product-delcom">
									<view class="product-name">全部油品</view>
									<view class="product-footerlist clearfix">
										<view v-for="(oItem,oIndex) in dataObj" :key="oIndex" @click="chooseItem1(oItem,$event,oIndex)" v-bind:class="[oItem.isShow?'productActive':'']">{{oItem.nozzleOils}}</view>
									</view>
									<view class="product-name">全部油号</view>
									<view class="product-footerlist clearfix" v-show="machineNozzleOilsType == 0">
										<view v-for="(oItem,index) in gasInfo" @click="chooseItem2(oItem,$event,index)" :key="index" v-bind:class="[oItem.isShow?'productActive':'']">{{oItem.nozzleOils}}</view>
									</view>
									<view class="product-footerlist clearfix" v-show="isHave1&&machineNozzleOilsType==0">
										<view class="" style="font-size: 26rpx;text-align: center;">
											暂无汽油信息
										</view>
									</view>
									<view class="product-footerlist clearfix" v-show="machineNozzleOilsType == 1">
										<view v-for="(oItem,index) in oilInfo" @click="chooseItem2(oItem,$event,index)" :key="index" v-bind:class="[oItem.isShow?'productActive':'']">{{oItem.nozzleOils}}</view>
									</view>
									<view class="product-footerlist clearfix" v-show="isHave2&&machineNozzleOilsType==1">
										<view class="" style="font-size: 26rpx;text-align: center;">
											暂无柴油信息
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="index-form" style="display: flex;">
							<label>加油金额</label><input type="number" placeholder="请输入消费金额" v-model="total" />
						</view>
						
						<button class="index-formbutton" @tap="openinfo">立即支付</button>
						</movable-area>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem,
		},
		computed: mapState(['hasLogin', 'serverUrl']),
		data() {
			return {
				x: 0,
				y: 0,
				typeList: [{
					text: '汽油',
					value: 0
				}, {
					text: '柴油',
					value: 1
				}],
				tIndex: 0,
				oilList: [{
						text: '0#',
						value: 0
					},
					{
						text: '-10#',
						value: 1
					},
					{
						text: '-20#',
						value: 2
					},
					{
						text: '-30#',
						value: 3
					},
					{
						text: '-50#',
						value: 4
					}
				],
				oIndex: 0,
				gasList: [{
						text: '92#',
						value: 0
					},
					{
						text: '93#',
						value: 1
					},
					{
						text: '95#',
						value: 2
					},
					{
						text: '97#',
						value: 3
					},
					{
						text: '98#',
						value: 4
					}
				],
				gasIndex: 0,
				getnum: "92#", //选择油号
				type: "汽油",//优品
				orderId: "",
				total: '',
				stationInfo: {}, //加油站详情
				range: 0, //距离详情
				lng: "118.34787",
				lat: "35.05151",
				stationList: [],
				oilInfo: [], //柴油详情列表
				gasInfo: [], //汽油详情列表
				machineNozzleOilsType: null, //详情油品
				nozzleOils: "", //详情油号
				swiperImg: [],
				current: 0,
				swiperCurrent: 0,
				value2: 1,
				value3: 'init',
				play: false,
				dataObj: [{
						nozzleOils: "汽油"
					},
					{
						nozzleOils: "柴油"
					}
				], //模拟后台返回的数据 多规格
				shopItemInfo: {}, //存放选中的油号详情,
				distance: 0,//距离
				isHave1:false,//有无油号
				isHave2:false,//有无油号

			}
		},
		onLoad() {
			this.getBanner();
			this.getAuthorizeInfo();
		},
		onShow() {
			// this.getAuthorizeInfo();
		},
		methods: {
			//轮播
			getBanner(){
				uni.request({
					url: this.serverUrl + '/v2/filling/picture/sel', //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res);
						if(res.data.code == 0){
							this.swiperImg = res.data.data;
						}
					}
				})
			},
			//加油站地图
			toMap(item){
				console.log(item);
					uni.showLoading({
						title:'加载中',
						mask:true
					})
				 let lat = parseFloat(item.staticLat);
				 let lng = parseFloat(item.staticLng);
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success: function (res) {
						console.log(res);
				        // const latitude = res.latitude;
				        // const longitude = res.longitude;
				        uni.openLocation({
				            latitude: lat,
				            longitude: lng,
							name:item.staticName,
							address:item.staticAddress,
				            success: function () {
				                console.log('success');
								setTimeout(()=>{
									uni.hideLoading();
								},800)
				            }
				        });
				    }
				});
				console.log(lat,lng);
			},
			//下滑
			startMove: function(e) {
				console.log('111',e);
				this.x = e.changedTouches[0].clientX
				this.y = e.changedTouches[0].clientY;
			},
			endMove: function(e) {
				console.log('2222',e);
				let x = e.changedTouches[0].clientX
				let y = e.changedTouches[0].clientY;
				if(y-this.y>0){
					
					this.play = !this.play
					console.log(this.play)
					this.x = 0;
					this.y = 0;
				}
			},
			//更多
			toType() {
				uni.switchTab({
					url: '../type/type'
				})
			},
			...mapActions(['isLogin']),
			//选择油品
			getTypeList(e) {
				this.stationList = [];
				this.tIndex = e; //保存下标
				this.type = this.typeList[e].text;
				console.log(e);
				if (e == 1) {
					//柴油默认第一个0 
					this.getnum = this.oilList[0].text;
					this.getStationList();
					console.log("列表11", this.stationList)
				} else {
					this.getnum = this.gasList[0].text;
					this.getStationList();
				}
			},
			getGas(e) {
				this.getnum = this.gasList[e].text;
				console.log(this.getnum);
				this.getStationList();
			},
			getOil(e) {
				this.getnum = this.oilList[e].text;
				console.log(this.getnum);
				this.getStationList();
			},
			//创建订单
			createOrder() {
				if (this.total > 0 && this.nozzleOils != null) {
					let formdata = {
						staticId: this.stationInfo.staticId,//.
						machineCode: this.shopItemInfo.machineCode, //油机
						machineNozzleCode: this.shopItemInfo.nozzleCode, //油枪
						machineNozzleOilsType: this.machineNozzleOilsType, //油品.
						machineNozzleOils: this.nozzleOils, //油号
						oilsPrice: this.shopItemInfo.oilsPrice, //单价
						litre: this.total / this.shopItemInfo.oilsPrice, //升
						total: this.total,//总金额.
					}
					console.log(formdata);
					uni.navigateTo({
						url: `/pages/payfor/payfor?orderInfo=${JSON.stringify(formdata)}&stationInfo=${this.stationInfo.staticName}`
					})
					this.total = '';
					this.play = false;
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入金额和油号',
						duration: 1000
					});
					setTimeout(() => {
						uni.hideToast();
					}, 1000)
				}

			},
			//加油站详情
			getGasInfo(id) {
				uni.request({
					url: this.serverUrl + `/api/wx/filling/static/get/${id}`, //仅为示例，并非真实接口地址。
					header: {
						// 'content-type': 'application/x-www-form-urlencoded',
						'Cookie': uni.getStorageSync('setcookie'),
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						this.isLogin(res.data.code);
						var data = res.data.data
						this.oilInfo = data.fillingOilVo.dieselOil;
						this.gasInfo = data.fillingOilVo.gasoline;
						//列表是否有值:暂无信息
						if(this.gasInfo.length==0){
							this.isHave1= true;
						}
						if(this.oilInfo.length==0){
							this.isHave2 = true;
						}
						//初始化默认值
						console.log("详情", this.dataObj);
						if(this.machineNozzleOilsType == 0){
							//添加默认选中样式
							this.gasInfo.forEach((item) => {
								this.$set(item, 'isShow', false);
								if(this.getnum == item.nozzleOils){
									this.$set(item, 'isShow', true);
									this.nozzleOils = this.getnum;
									this.shopItemInfo = item;
									console.log("默认汽油item",item)
									return;
								}
								
							})
						}else{
							this.oilInfo.forEach((item) => {
								this.$set(item, 'isShow', false);
								if(this.getnum == item.nozzleOils){
									this.$set(item, 'isShow', true);
									this.nozzleOils = this.getnum;
									this.shopItemInfo = item;
									return;
								}
								
							})
						}

					}
				});
			},
			//获取加油站列表
			getStationList() {
				uni.request({
					url: this.serverUrl + '/api/wx/filling/static/recommend/list', //仅为示例，并非真实接口地址。
					data: {
						lng: this.lng,
						lat: this.lat,
						oil: this.getnum
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'token': uni.getStorageSync('token'),
						'Cookie': uni.getStorageSync('setcookie')
					},
					success: (res) => {
						this.isLogin(res.data.code);
						this.stationList = res.data.data;
						console.log("列表", this.stationList)
						if (this.stationList.length > 0) {
							this.distance = this.stationList[0].range.toFixed(2); //离你最近
						}
						if (this.stationList.length == 0) {
							let _this = this;
							uni.showModal({
								title: '提示',
								content: '附近暂无该油号加油站,请选择其他',
								success: function(res) {
									if (res.confirm) {
										//         _this.getTypeList(0);
										//   _this.getnum="92#";
										// _this.getStationList();
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					}
				});
			},
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
					},
					fail() { // 拒绝授权
						console.log("你拒绝了授权，无法获得周边信息")
						that.openConfirm();
						that.getStationList();
					}
				})
			},
			getLocationInfo() {
				//获取当前经纬度
				let _this = this
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						_this.lng = res.longitude;
						_this.lat = res.latitude
						console.log('当前位置的经度：', _this.lng);
						console.log('当前位置的纬度：', _this.lat);
						_this.getStationList();
					}
				});
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},
			changeSwiper(e) {
				if(e.detail.source =='autopaly'){
					this.swiperCurrent = e.detail.current;
				}
				if(e.detail.source =='touch'){
					this.swiperCurrent = e.detail.current;
				}
			},
			choose() {
				let obj = {
					value: 'test'
				}
				this.$refs.dropdownItem.choose(obj)
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			},
			openinfo() {
				this.createOrder();
				console.log('点击立即支付')
			},
			toggle: function(id) {
				this.play = !this.play //取反
				this.isHave1 = false;
				this.isHave2 = false;
				//重置下滑
				this.x = 0;
				this.y = 0;
				console.log()
				if (id !== -1) {
					var tempIndex = this.stationList.findIndex(item => item.staticId == id)
					this.stationInfo = this.stationList[tempIndex];
					//该数组只保存了点击的元素
					console.log('点击', this.stationInfo)
					this.range = this.stationInfo.range.toFixed(2)
					//默认选中优品油号
					this.dataObj.forEach((item,index)=>{
						this.$set(item, 'isShow', false);
						if(this.type == item.nozzleOils ){
							this.$set(item, 'isShow', true);
							this.machineNozzleOilsType =index;
						}
					});
					//加油站详情
					this.getGasInfo(id);
				} else {
					return
				}
			},
			//选择油品
			chooseItem1(item, event, index) {
				// console.log(this.oilInfo,this.isHave2);
				this.dataObj.forEach(item => {
					this.$set(item, 'isShow', false);
				})
				this.$set(this.dataObj[index], 'isShow', true);
				this.machineNozzleOilsType = index;
				console.log("油品index", this.machineNozzleOilsType);
				this.gasInfo.forEach(item => {
					this.$set(item, 'isShow', false);
				})
				this.oilInfo.forEach(item => {
					this.$set(item, 'isShow', false);
				})
				this.nozzleOils = null;
			},
			//选择油号
			chooseItem2(item, event, index) {
				// console.log(item, event, index);
				if (this.machineNozzleOilsType == 0) {
					this.gasInfo.forEach(item => {
						this.$set(item, 'isShow', false);
					})
					this.$set(this.gasInfo[index], 'isShow', true);

				} else {
					this.oilInfo.forEach(item => {
						this.$set(item, 'isShow', false);
					})
					this.$set(this.oilInfo[index], 'isShow', true);

				}
				this.nozzleOils = item.nozzleOils;
				console.log("油号", this.nozzleOils);
				this.shopItemInfo = item;
			},
		},

	}
</script>

<style lang="scss">
	.container {
		background-color: #f4f4f4;
		min-height: 100vh;
		padding-bottom: 10upx;
	}

	.index-back {
		width: 750upx;
		height: 280upx;
		background-color: #F1F1F1;
	}

	.index-content {
		width: 700upx;
		position: relative;
		z-index: 99;
		padding-bottom: 10upx;
		border-radius: 16upx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: -45upx;
		padding-top: 10upx;

		.index-content-h3 {
			width: 90%;
			margin: 0 auto;
			padding: 0 10upx;
			border-bottom: 1px solid #f4f4f4;
			display: flex;

			text {
				font-size: 29upx;
				line-height: 80upx;
				display: block;
				width: 80%;
				text-align: left;
			}

			.index-content-button {
				width: 30%;
				height: 40upx;
				margin: 0 20rpx;
				padding-left: 10upx;
				font-size: 26upx;
				background-color: #EEEEEE;
				;
				color: #999999;
				text-align: center;
				border-radius: 30upx;
				margin-top: 20upx;
			}
		}

		.index-content-box {
			width: 90%;
			margin: 0 auto;
			padding: 0 10upx;
			display: flex;
		}

		.index-content-box-l {
			width: 80%;
		}

		.index-content-box-button {
			font-size: 30upx;
			line-height: 75upx;
			color: #333333;
			font-weight: bold;

			text {
				font-size: 24upx;
				border: 1px solid #FF9999;
				padding: 0 5upx;
				font-weight: 400;
				color: #666666;
				border-radius: 5upx;
				margin-right: 10upx;
			}
		}

		.index-content-box-text {
			position: relative;
			font-size: 24upx;
			color: #999999;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			
		}

		.index-content-box-r {
			width: 20%;
			margin-left: 30upx;
			padding-top: 35upx;

			view {
				width: 40upx;
				height: 30upx;
				margin: 0 auto;
				background-color: #005BBA;
				border-radius: 100px;
				padding-top: 10upx;
			}

			text {
				display: block;
				font-size: 22upx;
				line-height: 40upx;
				color: #333333;
				text-align: center;
			}

			image {
				width: 20upx;
				height: 20upx;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.index-content-price {
		width: 90%;
		margin: 10upx auto;
		display: flex;
		margin-top: 30upx;

		.index-content-pricetext {
			font-size: 22upx;
			line-height: 50upx;
			color: #E01414;
			padding: 0 6upx;
		}

		.index-content-priceview {
			font-size: 32upx;
			color: #E01414;
			;
		}
	}

	.index-content-price-box {
		border: 1px solid #FA2A2D;
		font-size: 22upx;
		height: 30upx;
		line-height: 30upx;
		overflow: hidden;
		padding: 0 10upx;
		margin-left: 10upx;
		border-radius: 5upx;
		color: #666666;
		margin-top: 5upx;

		text {
			background-color: #FA2A2D;
			color: #FFFFFF;
			padding: 10upx;
			font-size: 22upx;
			margin-left: -10upx;
		}

	}

	.index-content-price-gbiaojia {
		font-size: 22upx;
		color: #999999;
		line-height: 48upx;
		margin-left: 10upx;
	}

	.index-content-pricebutton {
		width: 88%;
		line-height: 70upx;
		font-size: 32upx;
		background-image: linear-gradient(180deg, #168BFF 100%, #1664FF 0%);
		color: #FFFFFF;
		border-radius: 100upx;
		border: 0;
		margin-top: 30upx;
		margin-bottom: 5upx;
	}

	.index-vipbox {
		width: 87%;
		max-height: 88upx;
		display: block;
		margin: 0 auto;
		margin-top: 23upx;
	}

	.index-contentone {
		width: 700upx;
		margin: 0 auto;
		display: flex;
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin-top: 15upx;
		padding: 20upx 0;

		.index-contentone-dl {
			width: 25%;

			image {
				width: 90upx;
				height: 90upx;
				display: block;
				margin: 8upx auto;
			}

			text {
				font-size: 24upx;
				display: block;
				color: #333333;
				text-align: center;
				line-height: 60upx;
			}
		}
	}

	.index-List {
		width: 700upx;
		margin: 20upx auto;
		display: flex;
		margin-top: 30upx;

		view {
			border-left: 3px solid #1677FF;
			font-size: 30upx;
			padding-left: 10upx;
			width: 50%;
			color: #333333;
			font-weight: bold;
		}

		text {
			width: 50%;
			text-align: right;
			font-size: 22upx;
			padding-right: 15upx;
			color: #999999;
		}
	}

	.index-List-box {
		position: relative;
		display: flex;
		width: 700upx;
		margin: 20upx auto;
		padding-bottom: 10upx;

		image {
			width: 150upx;
			height: 145upx;
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
			width: 530upx;
			margin-left: 15upx;
		}

		.index-content-box-text {
			position: relative;
			z-index: 99;
			font-size: 22upx;
			text-indent: .8em;
			width: 530upx;
			display: flex;
			.mapImg{
				position: absolute;
				bottom: 60rpx;
				right: 30rpx;
				z-index: 999;
				width: 40rpx;
				height: 40rpx;
				background-color: #005BBA;
				border-radius: 50%;
				display: flex;
				justify-content:center;
				align-items: center;
			}
			text {
				width: 590upx;
				color: #888888;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			view {
				text-align: center;
				width: 130upx;
			}
		}

	}

	.index-posbox {
		position: fixed;
		top: 0;
		z-index: 9999;
		width: 750upx;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);

		.index-posboxxz {
			position: fixed;
			bottom: 0upx;
			width: 750upx;
			// height: 85vh;
			height:auto;
			background-color: #FFFFFF;
			border-radius: 40upx 40upx 0 0;
		}
	}

	.index-posone {
		width: 90%;
		margin: 20upx auto;
		display: flex;
		padding-top: 20upx;

		image {
			width: 160upx;
			height: 150upx;
			border-radius: 10upx;
		}

		.index-List-boxtext {
			font-size: 30upx;
			color: #333333;
			line-height: 60upx;
			width: 400upx;

		}

		.index-content-box-text {
			width: 400upx;
			font-size: 24upx;
			color: #999999;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.index-content-price {
			margin-top: 10upx;
			margin-left: 0;
		}

		.index-content-box-r {
			width: 130upx;
			margin-left: 10upx;
			padding-top: 15upx;

			view {
				width: 40upx;
				height: 40upx;
				margin: 0 auto;
				background-color: #005BBA;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			text {
				display: block;
				font-size: 22upx;
				line-height: 50upx;
				color: #333333;
				text-align: center;
			}

			image {
				width: 22upx;
				height: 22upx;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.productBox {
		width: 100%;
		background-color: #fff;
		padding: 10upx 30upx;
		box-sizing: border-box;
	}

	.product-delcom {
		color: #323232;
		font-size: 26upx;
		border-bottom: 1px solid #EEEEEE;
	}

	.product-delcom .product-name {
		width: 100%;
		height: 100upx;
		line-height: 80upx;
	}

	.product-footerlist {
		margin-top: 1upx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.product-footerlist view {
		border: 1px solid #606060;
		border-radius: 8upx;
		color: #606060;
		text-align: center;
		padding: 8upx 20upx;
		margin-right: 20upx;
		min-width: 96upx;
		margin-bottom: 16upx;
	}

	.product-footerlist .productActive {
		background-color: #1A1A29;
		color: #fff;
		border: 1px solid #1A1A29;
	}

	.product-footerlist .noneActive {
		background-color: #ccc;
		opacity: 0.4;
		color: #000;
		pointer-events: none;
	}

	.index-form {
		display: flex;
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;

		label {
			display: block;
			width: 20%;
			font-size: 28upx;
			line-height: 80upx;
		}

		input {
			width: 80%;
			border: 1px solid #eeeeee;
			height: 80upx;
			padding-left: 15upx;
			line-height: 80upx;
		}
	}

	.index-formbutton {
		width: 93%;
		font-size: 30upx;
		line-height: 70upx;
		color: #FFFFFF;
		font-weight: 700;
		border: 0;
		border-radius: 60px;
		margin: 30upx auto;
		background-image: linear-gradient(180deg, #168BFF 100%, #1664FF 0%);
	}

	.index-guanbi {
		width: 100%;
		height: 30upx;
		background: url(../../../static/henggang.jpg) center no-repeat;
		background-size: 22%;
	}

	.index-posboxxz {
		box-sizing: border-box;
		padding: 0 20rpx;
		-webkit-animation: fadeInUp .5s .2s ease both;
		-moz-animation: fadeInUp .5s .2s ease both;
	}

	@-webkit-keyframes fadeInUp {
		0% {
			opacity: 0;
			-webkit-transform: translateY(20px)
		}

		100% {
			opacity: 1;
			-webkit-transform: translateY(0)
		}
	}

	@-moz-keyframes fadeInUp {
		0% {
			opacity: 0;
			-moz-transform: translateY(20px)
		}

		100% {
			opacity: 1;
			-moz-transform: translateY(0)
		}
	}

	.swiper {
		width: 750rpx;
		height: 280rpx;
		z-index: 1;
		overflow: hidden;
		position: relative;

		.swiper-item {
			width: 750rpx;
			height: 280rpx;

		}

	}
</style>
