<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order"
               v-for="(order,index) in list"
               :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list"
                     v-for="(item,i) in order.orderItemVoList"
                     :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage"
                         alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <!-- 订单状态:0-已取消 -10-未付款，20-已付款，40-已发货，50-交易成功，60-交易 -->
              <div class="good-state fr"
                   v-if="order.status == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr"
                   v-else>
                <a href="javascript:;"
                   @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination v-if="true"
                         class="pagination"
                         background
                         layout="prev, pager, next"
                         :pageSize="pageSize"
                         :total="total"
                         @current-change="handleChange">
            <!-- 按钮加载更多 -->
          </el-pagination>
          <div class="load-more"
               v-if="false">
            <el-button type="primary"
                       :loading="loading"
                       @click="loadMore">加载更多</el-button>
          </div>

          <!-- 滚动加载更多 -->
          <!-- disabled： true时候停止滚动，false时候释放 -->
          <!-- distance：离底部多大距离开始滚动加载 -->
          <div class="scroll-more"
               v-infinite-scroll="scrollMore"
               infinite-scroll-disabled="true"
               infinite-scroll-distance="410"
               v-if="false">
            <!-- 加载时的动画 -->
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg"
                 alt=""
                 v-show="loading">
          </div>

          <!-- 加载完了和订单列表长度为0,没数据 -->
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
// 加载组件
import Loading from './../components/Loading'
// 没数据时显示的组件
import NoData from './../components/NoData'
import { Pagination, Button } from 'element-ui'
// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'OrderList',
  components: {
    OrderHeader,
    Loading,
    NoData,
    // 动态组件 不是el-pagination，但能加载出来
    [Pagination.name]: Pagination,
    // <el-button></el-button>
    [Button.name]: Button
  },
  // 滚动加载局部指定 文档格式
  directives: {
    infiniteScroll
  },
  data () {
    return {
      loading: false,
      list: [],
      // 一页显示10条记录
      pageSize: 10,
      pageNum: 1,
      // 总页数
      total: 0,
      showNextPage: true, // 加载更多：是否显示按钮
      busy: false // 滚动加载，是否触发
    }
  },
  mounted () {
    this.getOrderList()
  },
  // 订单状态:0-已取消 -10-未付款，20-已付款，40-已发货，50-交易成功，60-交易
  methods: {
    getOrderList () {
      // 打开加载组件
      this.loading = true
      // 停止滚动，防止刚进页面自动加载第二页面
      this.busy = true
      this.axios.get('/orders', {
        params: {
          // 一页N条记录
          pageSize: 10,
          // 页码发给接口
          pageNum: this.pageNum
        }
      }).then((res) => {
        // 关闭加载组件
        this.loading = false
        this.list = this.list.concat(res.list)
        // 总页数
        this.total = res.total
        this.showNextPage = res.hasNextPage
        this.busy = false
      }).catch(() => {
        this.loading = false
      })
    },
    goPay (orderNo) {
      // 三种路由跳转方式
      // this.$router.push('/order/pay')
      /* this.$router.push({
        name:'order-pay',
        query:{
          orderNo
        }
      }) */
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    // 第一种方法：分页器
    handleChange (pageNum) {
      // 拉取页面赋值
      this.pageNum = pageNum
      this.getOrderList()
    },
    // 第二种方法：加载更多按钮
    loadMore () {
      this.pageNum++
      this.getOrderList()
    },
    // 第三种方法：滚动加载，通过npm插件实现
    scrollMore () {
      this.busy = true
      setTimeout(() => {
        this.pageNum++
        this.getList()
      }, 500)
    },
    // 专门给scrollMore使用
    getList () {
      this.loading = true
      this.axios.get('/orders', {
        params: {
          pageSize: 10,
          pageNum: this.pageNum
        }
      }).then((res) => {
        // 列表累加，不让换页的方法
        this.list = this.list.concat(res.list)
        this.loading = false
        // 是否有下一页
        if (res.hasNextPage) {
          // 有就释放掉
          this.busy = false
        } else {
          this.busy = true
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      // 分页器往右边
      .pagination {
        text-align: right;
      }
      // 分页器颜色覆盖
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      // 按钮居中
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
