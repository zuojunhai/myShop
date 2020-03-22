<template>
	<view class="goods">
		<view class="goods_item" v-for='item in goods' :key='item.id' @click='navigator(item.id)'>
			<image class="goods_image" :src="item.img_url" mode=""></image>
			<view class="goods_price">
				<text class="now_price">￥{{item.sell_price}}</text>
				<text class="old_price">￥{{item.market_price}}</text>
			</view>
			<view class="goods_title">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navigator(id){
				this.$emit('goodsItemClick',id)
			}
		},
		props:[
			'goods'
		]
	}
</script>

<style lang="scss" scoped>
	.goods{
		background-color: #eee;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 10rpx;
		.goods_item{
			width: 355rpx;
			height: 427rpx;
			background-color: #FFFFFF;
			margin-top: 12rpx;
			.goods_image{
				width: 260rpx;
				height: 150rpx;
				display: block;
				margin: 0 auto;
			}
			.goods_price{
				width: 100%;
				height: 50rpx;
				box-sizing: border-box;
				padding: 10rpx;
				margin: 20rpx 0;
				.now_price{
					font-size: 40rpx;
					color: $myRed;
				}
				.old_price{
					margin-left: 20rpx;
					font-size: 30rpx;
					text-decoration: line-through;
					color: #ccc;
				}
			}
			.goods_title{
				width: 100%;
				font-size: 32rpx;
				line-height: 60rpx;
				padding: 10rpx;
			}
		}
	}
</style>
