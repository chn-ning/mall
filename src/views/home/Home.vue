<template>
  <div id="home">
    <!-- 回到顶部 -->
    <back-top @click.native="backTopClick"
              v-show="isShowBackTop"/>
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 拷贝的tab-control -->
    <tab-control class="copy-control"
                :titles="['流行', '新款', '精选']"
                @controlClick='controlClick' 
                ref="copyControl"
                v-show="isShowCopyControl"
                />
    <!-- better-scroll -->
    <scroll class="scroll" ref="scroll"
            :probe-type='3'
            :pull-up-load='true'
            @scrollPosition='scrollPosition'
            @pullingUp='scrollBottom'>
      <!-- 轮播图 -->
      <home-swiper :banners='banners' @swiperImgLoad='swiperImgLoad'/>
      <!-- 推荐信息 -->
      <home-recommends :recommends='recommends'/>
      <!-- 本周流行 -->
      <home-popular/>
      <!-- 选项卡 -->
      <tab-control :titles="['流行', '新款', '精选']" @controlClick='controlClick' ref="tabControl"/>
      <!-- 商品列表 -->
      <goods-list :goods='goods[controlType].list'/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backTop/BackTop'

  import TabControl from 'components/content/tabcontrol/TabControl'
  import { GoodsList, GoodsListItem } from 'components/content/goods'

  import HomeSwiper from './children/HomeSwiper'
  import HomeRecommends from './children/HomeRecommends'
  import HomePopular from './children/HomePopular'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      BackTop,
      TabControl,
      GoodsList,
      GoodsListItem,
      HomeSwiper,
      HomeRecommends,
      HomePopular
    },
    data() {
      return {
        isShowBackTop: true,
        banners: [], //保存轮播图数据
        recommends: [], //保存推荐数据
        goods: {  //保存商品列表数据
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        controlType: 'pop', //记录选项卡控件当前选中的类型
        isShowBackTop: false, //记录回到顶部组件是否显示
        interval: null, //记录防抖的变量
        tabOffsetTop: 0, //记录tabControl的垂直偏移量
        isShowCopyControl: false, //记录是否显示copy的选项卡
        saveY: 0 //保存bscroll滚动的垂直距离
      }
    },
    created() {
      //调用获取轮播图数据的方法
      this.getMultidata()
      //调用获取商品列表数据的方法
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    mounted() {
      //通过事件总线监听GoodsItem中图片加载完成(防抖处理)
      this.$bus.$on('GoodsImgLoad', () => {
        if (this.interval) {
          clearTimeout(this.interval)
        }
        this.interval = setTimeout(() => {
          // 刷新以获取准确高度
          this.$refs.scroll && this.$refs.scroll.refresh()
        }, 50)
      })
    },
    methods: {
      /**
       * 网络请求相关方法
       */
      //获取轮播图、推荐数据
      async getMultidata() {
        const res = await getHomeMultidata()
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      },
      //获取商品列表数据
      async getGoods(type) {
        const page = this.goods[type].page + 1
        const goods = await getHomeGoods(type, page)
        this.goods[type].list.push(...goods.data.list)
        this.goods[type].page++
      },


      /**
       * 事件监听相关方法
       */
      //监听选项卡的点击切换
      controlClick(index) {
        switch(index) {
          case 0:
            this.controlType = 'pop'
            break
          case 1:
            this.controlType = 'new'
            break
          case 2:
            this.controlType = 'sell'
        }
        //同步两个选项卡的下标值
        this.$refs.tabControl.currentIndex = index
        this.$refs.copyControl.currentIndex = index

      },
      //监听回到顶部组件的点击
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      //监听滚动的位置
      scrollPosition({y}) {
        //动态决定回到顶部组件是否显示
        this.isShowBackTop = (-y) > 1000
        
        //动态决定copy的选项卡是否显示
        this.isShowCopyControl = (-y) >= this.tabOffsetTop
      },
      //监听滚动到底
      scrollBottom() {
        this.getGoods(this.controlType)
        //完成上拉
        this.$refs.scroll.finishPullUp()
      },
      //监听轮播图图片加载完成
      swiperImgLoad() {
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }
    },
    //活跃状态
    activated() {
      //刷新重新计算高度
      this.$refs.scroll.refresh()
      //瞬间回到离开时滚动的位置
      this.saveY && this.$refs.scroll.scrollTo(0, this.saveY, 0)

    },
    //不活跃状态
    deactivated() {
      //获取bscroll滚动的垂直距离并保存到saveY变量
      this.saveY = this.$refs.scroll.getOffsetY()
    }
  }
</script>

<style scoped>
  #home {
    position: relative; 
    height: 100vh;
  }
  .home-nav {
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
    background-color: var(--color-tint);
    /* background-color:#b0e0e6; */
    color:#fff;
  }
  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .copy-control {
    position: relative;
    top: -1px;
    z-index: 9;
  }
</style>