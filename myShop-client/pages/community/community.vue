<template>
	<view class='community'>
		<scroll-view scroll-y="true" class="left">
			<view class="left_item" 
			v-for="(item,index) in imageType" 
			:key='item.id' 
			@click="getDetail(item.id,index)"
			:class="active==index?'active':''">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right">
			<view class="right_item" v-for="item in imageDetail" :key='item.id'>
				<image :src="item.img_url" @click="previewImg(item.img_url)"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="imageDetail.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageType: [],
				active:0,
				imageDetail:[]
			}
		},
		onLoad() {
			this.getImageType()
		},
		methods: {
			//获取图片分类
			async getImageType() {
				const res = await this.$myRequest({
					url: '/api/getimgcategory',
				})
				this.imageType = res.data.message
				//获取一下第一项的详情
				this.getDetail(this.imageType[0].id,0)
			},
			//获取每一项图片分类的详情
			async getDetail(id,index){
				this.active=index
				const res= await this.$myRequest({
					url:`/api/getimages/${id}`
				})
				this.imageDetail=res.data.message
			},
			//点击预览图片
			previewImg(current){
				const urls=this.imageDetail.map(item=>{
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.community {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 1200rpx;
			border-right: 1px solid #eee;

			.left_item {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: $myRed;
				color: #fff;
			}
		}

		.right {
			height: 1200rpx;
			width: 520rpx;
			margin: 10rpx auto;
			.right_item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
