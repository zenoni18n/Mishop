import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index'
// import Login from '../pages/login'
// import Product from '../pages/product'
// import Detail from '../pages/detail'
// import Cart from '../pages/cart'
// import Order from '../pages/order'
// import OrderList from '../pages/orderList'
// import OrderConfirm from '../pages/orderConfirm'
// import OrderPay from '../pages/orderPay'
// import AliPay from '../pages/alipay'
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
      // 路由按需加载 防止刚进网页需要加载全部页面而导致页面空白
      // component: resolve => require(['../pages/index.vue'], resolve)
      // component: Product
      component: () => import('../pages/product.vue')
    }, {
      path: '/detail/:id',
      name: 'detail',
      // component: resolve => require(['../pages/detail.vue'], resolve)
      // component: Detail
      component: () => import('../pages/detail.vue')
    }]
  }, {
    path: '/login',
    name: 'login',
    // component: Login
    component: () => import('../pages/login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    // component: Cart
    component: () => import('../pages/cart.vue')
  },
  {
    path: '/order',
    name: 'order',
    // component: Order,
    component: () => import('../pages/order.vue'),
    children: [{
      path: 'list',
      name: 'order-list',
      // component: OrderList
      component: () => import('../pages/orderList.vue')
    },
    {
      path: 'confirm',
      name: 'order-confirm',
      // component: OrderConfirm
      component: () => import('../pages/orderConfirm.vue')
    },
    {
      path: 'pay',
      name: 'order-pay',
      // component: OrderPay
      component: () => import('../pages/orderPay.vue')
    },
    {
      path: 'alipay',
      name: 'aliPay',
      // component: AliPay
      component: () => import('../pages/alipay.vue')

    }]
  }

]

const router = new VueRouter({
  routes
})

export default router
