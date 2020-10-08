<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        bscroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      this.bscroll.on('scroll', (p) => {
        this.$emit('scrollPosition', p)
      })

      // 监听滚动到底部
      this.bscroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      //回到顶部
      scrollTo(x, y, time=500) {
        this.bscroll && this.bscroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        // 完成上拉
        this.bscroll && this.bscroll.finishPullUp()
      },
      refresh() {
        // 刷新以获取准确高度
        this.bscroll && this.bscroll.refresh()
      },
      //获取滚动的垂直距离
      getOffsetY() {
        return this.bscroll ? this.bscroll.y : 0
      }
    } 
  }
</script>

<style scoped>

</style>