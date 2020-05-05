<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import storage from './storage/index'
// 组件的name可以作为递归，可以做忽略缓存，可以在vue工具中显示组件
// import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      res: {}
    }
  },
  mounted () {
    // storage.setItem('a', 1)
    // storage.setItem('user', { a: 1 })
    // storage.setItem('abc', { a: 1 }, 'user')
    // storage.clear('a')
    // storage.clear('a', 'user')
    // 一。本地加载json静态文件
    // this.axios.get('/mock/user/login.json').then((res) => { this.res = res })
    // 二。通过easy-mock平台实现虚拟mock
    // 三。本地集成mockjs实现
    this.axios.get('/user/login').then((res) => { this.res = res })
  }
}

</script>
<style>
@import "./assets/scss/reset.scss";
</style>
