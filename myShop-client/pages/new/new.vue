<template>
	<view>
		<news_item :list='list' @itemClick='goDetail'></news_item>
	</view>
</template>

<script>
	import news_item from '../../components/news_item/news_item.vue'
	export default {
		data() {
			return {
				list:[]
			}
		},
		components:{
			news_item,
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData(){
				const res= await this.$myRequest({
					url:'/api/getnewslist'
				})
				this.list=res.data.message
			},
			goDetail(id){
				uni.navigateTo({
					url:`../news_detail/news_detail?id=${id}`
				})
			}
		}
	}
</script>

<style>

</style>
