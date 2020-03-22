<template>
	<view>
		<swiper :indicator-dots="true"  :duration="1000">
			<swiper-item v-for="item in detail1" :key='item.id'>
				<image :src="item.src" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="price">
			<text class="now_price">￥{{detail2.sell_price}}</text>
			<text class="old_price">￥{{detail2.market_price}}</text>
		</view>
		<view class="title">
			{{detail2.title}}
		</view>
		<view class="middle">
			<view class="type">
				货号：{{detail2.goods_no}}
			</view>
			<view class="number">
				库存：{{detail2.stock_quantity}}
			</view>
		</view>
		<view class="detail_title">
			详情介绍
		</view>
		<view class="detail">
			<rich-text :nodes="detail3.content"></rich-text>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" ></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				id:0,
				detail1:[],
				detail2:{},
				detail3:{},
				options: [{
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
				          text: '客服'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
				          text: '店铺'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
				          text: '购物车',
				          info: 2
				        }],
				        buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }
				        ]
			}
		},
		components:{
			uniGoodsNav
		},
		onLoad(options) {
			this.id=options.id
			this.getDetail()
		},
		methods: {
			//获取详情
			async getDetail(){
				//轮播图
				const res1= await this.$myRequest({
					url:`/api/getthumimages/${this.id}`
				})
				this.detail1=res1.data.message
				//中间部分
				const res2= await this.$myRequest({
					url:`/api/goods/getinfo/${this.id}`
				})
				this.detail2=res2.data.message[0]
				//详情介绍
				const res3= await this.$myRequest({
					url:`/api/goods/getdesc/${this.id}`
				})
				this.detail3=res3.data.message[0]
			},
			
			onClick(e){
				console.log('ok-l',e)
			},
			buttonClick(e){
				console.log('ok-r',e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper{
		width: 750rpx;
		height: 700rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.price{
		width: 750rpx;
		.now_price{
			font-size: 40rpx;
			color: $myRed;
		}
		.old_price{
			margin-left: 50rpx;
			font-size: 30rpx;
			color: #ccc;
			text-decoration: line-through;
		}
	}
	.title{
		width: 750rpx;
		font-size: 42rpx;
		margin: 20rpx 0;
	}
	.middle{
		width: 750rpx;
		border-top: 5px solid #eee;
		border-bottom: 5px solid #eee;
		.type{
			font-size: 38rpx;
			margin: 10rpx 0;
		}
		.number{
			font-size: 38rpx;
			margin: 10rpx 0;
		}
	}
	.detail_title{
		border-bottom: 1px solid #eee;
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.detail{
		padding-bottom: 50rpx;
	}
	.goods_nav{
		position: fixed;
		bottom:0;
		width: 100%;
	}
</style>
