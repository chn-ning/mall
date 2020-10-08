<template>
  <div class="home-recommends">
    <div class="recommends-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommends',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommends {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 14px;
    margin-top: 12px;
    padding-bottom: 30px;
    border-bottom: 8px solid rgba(204, 204, 204, 0.2);
  }
  /* .recommends-item {
    flex: 1;
  } */
  .recommends-item a {
    display: block;
  }
  .recommends-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 8px;
  }
</style>