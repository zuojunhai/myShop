<template>
	<view class="index">
		<swiper class="swiper" indicator-dots autoplay interval="2000" duration="1000" circular='true'>
			<swiper-item v-for="item in swiper" :key='item.id'>
				<image :src="item.img" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="card">
			<view class="card_item" v-for='(item,index) in card' :key='index' @click='goCardItem(item.path)'>
				<view class="item_image">
					<uni-icons :type="item.type" size="30" color="#fff"></uni-icons>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="line">
		</view>
		<view class="tit">
			推荐商品
		</view>
		<goodslist :goods='goods' @goodsItemClick='goDetail'>
		</goodslist>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import goods_list from '../../components/goods_list/goods_list.vue'
	export default {
		data() {
			return {
				swiper:[],
				card:[
					{
						type:'shop',
						title:'我的超市',
						path:'/pages/shop/shop'
					},
					{
						type:'info',
						title:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						type:'image',
						title:'社区图片',
						path:'/pages/community/community'
					},
					{
						type:'videocam',
						title:'学习视频',
						path:'/pages/study/study'
					},
				],
				pageindex:1,
				goods:[]
			}
		},
		components:{
			uniIcons,
			goodslist:goods_list
		},
		onLoad() {
			this.getSwiper()
			this.getGoods()
		},
		methods: {
			//获取轮播图数据
			async getSwiper(){
				const res= await this.$myRequest({
					url:'/api/getlunbo'
				})
				this.swiper=res.data.message
			},
			//获取商品列表数据
			async getGoods(){
				const res= await this.$myRequest({
					url:`/api/getgoods?pageindex=${this.pageindex}`
				})
				this.goods=res.data.message
			},
			//跳转到商品详情页面
			goDetail(id){
				uni.navigateTo({
					url:`../goods_detail/goods_detail?id=${id}`
				})
			},
			//跳转到card中的每一项的页面
			goCardItem(url){
				uni.navigateTo({
					url
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.swiper{
		width: 750rpx;
		height: 380rpx;
		swiper-item{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.card{
		width: 750rpx;
		height: 190rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
		.card_item{
			width: 25%;
			height: 190rpx;
			text-align: center;
			.item_image{
				width: 120rpx;
				height: 120rpx;
				background-color: $myRed;
				border-radius: 50%;
				text-align: center;
				line-height: 120rpx;
				margin: 0 auto;
			}
			text{
				font-size: 30rpx;
				text-align: center;
			}
		}
	}
	.line{
		width: 750rpx;
		height: 10rpx;
		background-color: #eee;
		margin: 10rpx auto;
	}
	.tit{
		width: 750rpx;
		height: 50rpx;
		color: $myRed;
		font-size: 50rpx;
		text-align: center;
		letter-spacing: 12px;
		line-height: 50rpx;
	}
</style>
