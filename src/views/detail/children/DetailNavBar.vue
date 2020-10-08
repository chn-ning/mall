<template>
  <div class="detail-nav">
    <nav-bar>
      <img slot="left" class="back" src="~assets/img/common/back.svg" alt=""
             @click="backClick">
      <div slot="center" class="title">
        <div class="title-item" :class="{active: index === currentIndex}"
             v-for="(title, index) in titles" :key="index"
             @click="titleClick(index)">{{title}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'], //标题
        currentIndex: 0,  //记录当前选中的标题下标
      }
    },
    methods: {
      // 监听返回按钮点击
      backClick() {
        this.$router.go(-1)
        // this.$router.back()
      },
      // 监听标题项的点击
      titleClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .back {
    padding-top: 10px;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>