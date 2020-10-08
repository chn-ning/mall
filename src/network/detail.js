/*
 Detail页面请求接口数据的函数文件
*/
import {request} from './request'

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}