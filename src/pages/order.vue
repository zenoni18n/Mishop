<template>
  <div>
    <!-- <order-header :title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header> -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>

  </div>
</template>
<script>
// import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
export default {
  name: 'Order',
  data () {
    return {
      title: '',
      tip: ''
    }
  },
  components: {
    // OrderHeader,
    NavFooter,
    ServiceBar
  }
  // 行不通，得先经过order界面才能渲染出来，支付完成跳转的时候不会经过，页面缺失
  // mounted () {
  //   const path = this.$route.path
  //   if (path === '/order/confirm') {

  //     this.title = '订单确认',
  //       this.tip = '请认真填写收货地址'
  //   } else {

  //   }
  // }
}
</script>
<style lang="stylus" scoped></style>
