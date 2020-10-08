import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/',
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return error
  })
  
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    return error
  })

  //axios实例的返回值是Promise类型
  return instance(config)
}


