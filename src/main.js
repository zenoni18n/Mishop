import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import axios from 'axios'
// 可以全局挂载，用this.axios
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
// import env from './../env'

Vue.use(VueAxios, axios)
Vue.use(Router)
Vue.use(VueCookie)
// 全局注册element 不需要
// Vue.use(Message)
Vue.use(VueLazyLoad, {
  // 加载时用svg图标显示
  loading: '/imgs/loading-svg/loading-bars.svg'
})
// 全局注册element
Vue.prototype.$message = Message
Vue.config.productionTip = false
// mock开关 mockjs
const mock = false
if (mock) {
  require('./mock/api')
}
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// 二。easy-mock
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL
// 接口错误拦截
axios.interceptors.response.use(function (response) {
  const res = response.data
  const path = location.hash
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '/#/login'
    }
    // 加入购物车的时候没登陆依旧可以访问购物车界面的解决方式
    return Promise.reject(res)
  } else {
    // alert(res.msg)
    this.$message.warning(res.msg)
    return Promise.reject(res)
  }
}, (error) => {
  // const res = error.response
  this.$message.error('请输入用户名和密码')
  return Promise.reject(error)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
