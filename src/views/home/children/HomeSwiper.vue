<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        imgLoadState: false //记录轮播图图片是否加载
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      swiperImgLoad() {
        if (!this.imgLoadState) {
          this.$emit('swiperImgLoad')
          this.imgLoadState = true
        }
      }
    }
  }
</script>

<style scoped>

</style>