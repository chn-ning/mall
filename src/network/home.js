/*
 Home页面请求接口数据的函数文件
*/
import {request} from './request'

// 获取轮播图、推荐数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取商品列表数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

