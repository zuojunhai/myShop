<template>
	<view class="shop">
		<goodslist :goods='goods' @goodsItemClick='goDetail'></goodslist>
		<view class="bottom" v-if='flag'>
			我是有底线的...
		</view>
	</view>
</template>

<script>
	import goods_list from '../../components/goods_list/goods_list.vue'
	export default {
		data() {
			return {
				goods:[],
				pageindex:1,
				flag:false
			}
		},
		components:{
			goodslist:goods_list
		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			//获取商品数据
			async getGoods(callBack){
				const res=await this.$myRequest({
					url:`/api/getgoods?pageindex=${this.pageindex}`
				})
				this.goods=[...this.goods,...res.data.message]
				callBack && callBack()
			},
			//上拉触底
			onReachBottom(){
				if(this.goods.length<this.pageindex*10){
					this.flag=true
					return
				}
				this.pageindex++
				this.getGoods()
			},
			//下拉刷新
			onPullDownRefresh(){
				this.pageindex=1
				this.goods=[]
				this.flag=false
				setTimeout(()=>{
				  this.getGoods(()=>{
						uni.stopPullDownRefresh()
					})	
				},1000)
			},
			//点击前往商品详情页面
			goDetail(id){
				uni.navigateTo({
					url:`../goods_detail/goods_detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop{
		background-color: #eee;
	}
	.bottom{
		width: 750rpx;
		height: 60rpx;
		background-color: #eee;
		text-align: center;
		margin-top: 20rpx;
	}
</style>
