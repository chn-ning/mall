<template>
  <div class="tab-control">
    <div class="control-item" v-for="(item, index) in titles" :key="index"
         :class="{active: currentIndex === index}"
          @click="controlClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data() {
      return {
        currentIndex: 0 //记录当前选项卡下标
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      //改变选项卡下标
      controlClick(index) {
        this.currentIndex = index
        //单击选项卡发射自定义事件通知父组件Home
        this.$emit('controlClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
  .control-item {
    flex: 1;
  }
  .control-item span {
    padding: 6px;
  }

  .active {
    color: var(--color-tint);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>