<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 60px;
    right: 4px;
    width: 54px;
    height: 54px;
    z-index: 9;
  }
  .back-top img {
    width: 100%;
  }
</style>