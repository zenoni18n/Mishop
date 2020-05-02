<template>
  <div>
    <order-header></order-header>
    cart
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
export default {
  name: 'Cart',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>
<style lang="stylus" scoped></style>
