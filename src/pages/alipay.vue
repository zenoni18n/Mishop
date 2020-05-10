<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form"
         v-html="content"></div>
  </div>
</template>
<script>
import Loading from './../components/Loading'
export default {
  name: 'alipay',
  components: {
    Loading
  },
  data () {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  mounted () {
    this.paySubmit()
  },
  methods: {
    // 微信支付：content内容是支付链接，转换为二维码即可扫码支付
    // 支付宝支付：content是html源码，渲染到页面上后自动跳转到支付页面
    paySubmit () {
      // 把信息提交给支付宝接口
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue高仿小米商城',
        amount: 0.01, // 单位元
        payType: 1 // 1支付宝，2微信
      }).then((res) => {
        // content接口自动给,支付宝支付页面，安全性
        this.content = res.content
        setTimeout(() => {
          // 提交content里面的script,渲染出的content的script不会自动执行
          document.forms[0].submit()
        }, 100)
      })
    }
  }
}
</script>
