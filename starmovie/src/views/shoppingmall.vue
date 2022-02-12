<template>
  <div class="shoppingmall">
    <div class="w">
      <div class="main">
        <div class="merchant">
          <div class="merchant-btn">商家入驻</div>
        </div>
        <div class="product">
          <div
            class="product-item"
            @click="chooseproduct(item.goodId)"
            v-for="(item, index) in products"
            :key="'product' + index"
          >
            <div class="product-img">
              <img :src="item.picPath" alt="" />
            </div>
            <div class="product-info">
              <p>{{ item.goodName }}</p>
              <p class="p1">
                <strong>￥{{ item.price }}</strong>
                <span>￥{{ item.priceBefore }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ct_log from "../tools/ct_log";

export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },
  mounted() {
    this.getallproducts();
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    //获取所有商品信息
    async getallproducts() {
      let apiurl = this.$store.getters.GETapihttp + "goods/list";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.products = res.data;
    },
    chooseproduct: function (goodId) {
      this.$router.push({
        path: "oneproduct",
        query: {
          goodId: goodId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.shoppingmall {
  margin: 2rem auto;
  width: 100%;
  height: 105rem;
  //border: 1px solid #000;
}

.merchant {
  margin: 1rem auto;
  width: 100%;
  height: 6rem;
  color: rgb(15, 189, 229);
  //border: 1px solid rgb(15, 189, 229);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  cursor: pointer;
}
.merchant-btn {
  position: relative;
  // margin: 2rem auto;
  margin-right: 3rem;
  height: 4rem;
  width: 8rem;
  border: 1px solid rgb(15, 189, 229);
  border-radius: 3rem;
  font-size: 1.5rem;
  text-align: center;
  line-height: 3.7rem;
}
.product {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.product-item {
  width: 25rem;
  height: 30rem;
  //border:1px solid red;
  cursor: pointer;
  margin: 0rem 4rem 2rem 4rem;
}
.product-img {
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
.product-info {
  width: 100%;
  p {
    text-align: center;
    font-size: 1.5rem;
  }

  strong {
    color: red;
  }

  span {
    color: slategrey;
    text-decoration: line-through;
  }
  //border:1px solid black;
}
</style>