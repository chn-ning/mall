<template>
  <div @click="itemClick" class="tab-bar-item">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-acitve"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    data() {
      return {
     }
    },
    props: {
      link: {
        type: String,
        default: '/',
        required: true
      },
      activeColor: {
        type: String,
        default: '#f42145'
      }
    },
    methods: {
      itemClick() {
        // 判断当前路径是否为要push的路径，不是才push
        this.$router.currentRoute.path != this.link ? this.$router.push(this.link) : null
      }
    },
    computed: {
      // 如果当前的路由组件是处于活跃的，则返回true，否则返回false
     isActive() {
       return this.$route.path === this.link
     },
     activeStyle() {
       return this.isActive ? {color: this.activeColor} : {}
     }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 26px;
    height: 26px;
    margin: 2px 0;
    vertical-align: middle;
  }
</style>