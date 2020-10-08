import Vue from 'vue'
import VueRouter from 'vue-router'

//安装插件
Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Detail = () => import('views/detail/Detail')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopcart/ShopCart')
const Profile = () => import('views/profile/Profile')

//配置路由映射表
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail/:id', // 动态路由
    component: Detail
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

//导出并在vue实例挂载
export default router