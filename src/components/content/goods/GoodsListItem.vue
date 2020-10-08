<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" 
          @load="GoodsImgLoad"
          @click="goodsItemClick">
    <p class="item-title">{{goodsItem.title}}</p>
    <span class="item-price">{{goodsItem.price}}</span>
    <span class="item-cfav">{{goodsItem.cfav}}</span>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
     GoodsImgLoad() {
       //向事件总线发射事件
       this.$bus.$emit('GoodsImgLoad')
     },
     //监听goodsItem的点击,跳转到详情页
     goodsItemClick() {
      //跳转并动态拼接iid
       this.$router.push('/detail/' + this.goodsItem.iid)
     }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    text-align: center;
  }
  .goods-item a {
    display: block;
  }
  .goods-item img {
    width: 100%;
    height: 270px;
    border-radius: 5%;
  }
  .item-title {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0;
  }
  .item-price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .item-cfav {
    position: relative;
  }
  .item-cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>