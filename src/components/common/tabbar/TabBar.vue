<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    text-align: center;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-color:aliceblue; */
    background-color:#f6f6f6;
    box-shadow: 0 -1px 5px rgba(1, 1, 1, .1);
  }
</style>