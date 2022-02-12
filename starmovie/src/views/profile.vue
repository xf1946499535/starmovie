<template>
  <div class="profile">
    <div class="w">
      <div class="pro_left">
        <div class="left_nav">个人中心</div>
        <div
          class="left_order"
          @click="changepage(1)"
          :class="{ choosed: nowchoose == 1 }"
        >
          订单信息
        </div>
        <div
          class="left_me"
          @click="changepage(2)"
          :class="{ choosed: nowchoose == 2 }"
        >
          个人信息
        </div>
        <div
          class="left_gwc"
          @click="changepage(3)"
          :class="{ choosed: nowchoose == 3 }"
        >
          购物车
        </div>
        <div
          class="left_goodOrder"
          @click="changepage(4)"
          :class="{ choosed: nowchoose == 4 }"
        >
          商品订单
        </div>
      </div>
      <div v-if="nowchoose == 1" class="pro_right">
        <pro-order></pro-order>
      </div>
      <div v-if="nowchoose == 3" class="pro_right">
        <shopping-cart></shopping-cart>
      </div>
      <div v-if="nowchoose == 4" class="pro_right">
        <good-order></good-order>
      </div>
    </div>
  </div>
</template>

<script>
import ct_log from "../tools/ct_log";
import proOrder from "../components/proOrder";
import ShoppingCart from "../components/shoppingCart.vue";
import goodOrder from "../components/goodOrder";
export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },
  props: ["choosenum"],
  components: {
    proOrder,
    ShoppingCart,
    goodOrder,
  },
  data() {
    return {
      nowchoose: 1, //记录当前选择的页面，默认是1
    };
  },
  mounted() {
    this.check_nowchoose();
  },
  methods: {
    //接收商品页面跳转至购物车路由所传递的choosenum参数
    check_nowchoose() {
      if (this.choosenum) {
        this.nowchoose = this.choosenum;
      }

      //第二种方法
      /* if(this.$route.query.choosenum){
        this.nowchoose = this.$route.query.choosenum
      } */
    },

    changepage(e) {
      this.nowchoose = e;
    },
  },
};
</script>

<style lang="less" scoped>
.profile {
  width: 100%;
  .w {
    position: relative;
    margin-top: 2rem;
    display: flex;
    border: 1px solid rgba(100, 100, 100, 0.2);
  }
}
.pro_left {
  width: 15%;
  height: 100rem;
  background-color: rgb(244, 244, 244);
}
.left_nav {
  width: 100%;
  height: 10rem;
  text-align: center;
  line-height: 10rem;
  font-size: 2rem;
}
.left_order,
.left_me,
.left_gwc,
.left_goodOrder {
  width: 100%;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  cursor: pointer;
  font-size: 1.5rem;
  //   background-color: rgb(15, 189, 229);
}
.choosed {
  background-color: rgb(15, 189, 229);
  color: #fff;
}

.pro_right {
  position: relative;
  width: 85%;
}
</style>