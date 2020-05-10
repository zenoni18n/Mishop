import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index'
import Login from '../pages/login'
import Product from '../pages/product'
import Detail from '../pages/detail'
import Cart from '../pages/cart'
import Order from '../pages/order'
import OrderList from '../pages/orderList'
import OrderConfirm from '../pages/orderConfirm'
import OrderPay from '../pages/orderPay'
import AliPay from '../pages/alipay'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [{
      path: 'list',
      name: 'order-list',
      component: OrderList
    },

    {
      path: 'confirm',
      name: 'order-confirm',
      component: OrderConfirm
    },
    {
      path: 'pay',
      name: 'order-pay',
      component: OrderPay
    },
    {
      path: 'alipay',
      name: 'aliPay',
      component: AliPay
    }]
  }

]

const router = new VueRouter({
  routes
})

export default router
