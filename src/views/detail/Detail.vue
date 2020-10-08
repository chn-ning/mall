<template>
  <div class="detail">
    <!-- 导航栏 -->
  <detail-nav-bar/>
  <!-- 轮播图 -->
  <detail-swiper :banners='banners'/>
  </div>
</template>

<script>

  import DetailNavBar from './children/DetailNavBar'
  import DetailSwiper from './children/DetailSwiper'

  import {getDetailData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null, //保存iid
        banners: [], //保存轮播图数据
      }
    },
    created() {
      //保存路由跳转传递过来的iid
      this.iid = this.$route.params.id

      //调用获取数据的方法
      this.getData()

    },
    methods: {
      /**
       * 网络请求相关方法
       */
      //获取数据
      async getData() {
        const res = await getDetailData(this.iid)
        this.banners = res.result.itemInfo.topImages
        
        console.log(res)
      }
    },
  }
</script>

<style scoped>

</style>