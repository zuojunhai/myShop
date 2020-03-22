<template>
	<view>
		<view class="img">
			<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode=""></image>
		</view>
		<view class="phone" @click="call">
			联系电话：15965013212 ( 点击拨打 )
		</view>
		<view class="address">
			地址：山东省滨州市邹平市好生街道办事处小高家村
		</view>
		<map :latitude="36.8196165600" :longitude="117.7979017800" class="myMap" scale='13' :markers='markers'></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers:[
					{
						longitude: 117.7979017800,
						latitude: 36.8196165600,
						iconPath: '../../static/hmlogo.png',
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			//拨打电话
			call(){
				uni.makePhoneCall({
					phoneNumber:'15965013212'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.img{
		width: 750rpx;
		height: 320rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.phone{
		width: 750rpx;
		height: 100rpx;
		font-size: 36rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #eee;
		padding-left: 10rpx;
	}
	.address{
		width: 750rpx;
		height: 160rpx;
		font-size: 36rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #eee;
		padding: 10rpx;
	}
	.myMap{
		width: 750rpx;
		height: 750rpx;
	}
</style>
