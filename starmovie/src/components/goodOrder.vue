<template>
  <div class="goodorder">
    <div class="good_nav">
      <span>商品订单</span>
    </div>
    <div class="goods">
      <div class="good_list">
        <div class="buytop">
          <div class="time">时间</div>
          <div class="goodsdetail">商品详情</div>
          <div class="price">单价(元)</div>
          <div class="num">数量</div>
          <div class="subtotal">小计</div>
          <div class="operation">操作</div>
        </div>
        <div
          class="good_item"
          v-for="(item, index) in goods"
          :key="'good' + index"
        >
          <div class="good_item_one" v-if="!item.isdelete">
            <div class="goodtime">{{ item.time }}</div>
            <div class="goodinfo">
              <div class="goodimg">
                <img :src="item.pic" alt="" />
              </div>
              <div class="goodname">{{ item.goodName }}</div>
            </div>
            <div class="goodprice">￥ {{ item.goodPrice }}</div>
            <div class="goodnum">
              <div class="count">
                <div class="number">{{ item.goodCount }}</div>
              </div>
            </div>
            <div class="good_subtotal">
              ￥{{ item.goodCount * item.goodPrice }}
            </div>
            <div class="good_operation">
              <span class="good_operation1" @click="deleteone(index)"
                >删除订单</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goods: [],
      isdelete: false,
    };
  },

  mounted() {
    this.getproduct();
  },

  methods: {
    //获取订单表数据
    async getproduct() {
      let apiurl = this.$store.getters.GETapihttp + "order/Ulist";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          userId: this.$store.getters.GETme.userId,
        },
      });
      this.goods = res.data;
      /* console.log(this.goods); */
    },

    //删除记录功能
    deleteone(index) {
      let order = [];
      order[0] = this.goods[index].id;
      let apiurl = this.$store.getters.GETapihttp + "order/delete";
      let res = axios.get(apiurl, {
        method: "GET",
        params: {
          Id: order[0],
        },
      });
      this.goods[index].isdelete = true;
    },
  },
};
</script>

<style lang="less" scope>
.goodorder {
  width: 100%;
  position: relative;
  .good_nav {
    display: flex;
    width: 81rem;
    height: 6rem;
    margin-left: 4rem;
    line-height: 6rem;
    font-size: 1.7rem;
    color: rgb(15, 189, 229);
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  }

  .good_list {
    margin-top: 2rem;
    .buytop {
      display: flex;
      width: 90%;
      height: 3rem;
      margin-left: 4rem;
      background-color: #efefef;

      .time {
        width: 10rem;
        height: 100%;
        margin-left: 3rem;
        line-height: 3rem;
        font-size: 1.3rem;
      }
      .goodsdetail {
        width: 6rem;
        height: 100%;
        margin-left: 5rem;
        text-align: center;
        line-height: 3rem;
        font-size: 1.3rem;
      }
      .price {
        width: 5rem;
        height: 100%;
        margin-left: 2rem;
        margin-left: 20rem;
        font-size: 1.3rem;
        line-height: 3rem;
        text-align: center;
      }
      .num {
        width: 8rem;
        height: 100%;
        margin-left: 2rem;
        font-size: 1.3rem;
        line-height: 3rem;
        text-align: center;
      }
      .subtotal {
        width: 5rem;
        height: 100%;
        margin-left: 2rem;
        font-size: 1.3rem;
        line-height: 3rem;
        text-align: center;
      }
      .operation {
        width: 5rem;
        height: 100%;
        margin-left: 3rem;
        font-size: 1.3rem;
        line-height: 3rem;
        text-align: center;
      }
    }

    .good_item_one {
      margin-left: 4rem;
      width: 90%;
      height: 8rem;
      border-bottom: 1px solid #ccc;
      display: flex;

      .goodtime {
        width: 15rem;
        line-height: 8rem;
        text-align: center;
      }
      .goodinfo {
        width: 25rem;
        height: 100%;
        font-size: 1.3rem;
        display: flex;
        margin-left: 3rem;
        align-items: center;

        .goodimg {
          width: 7rem;
          height: 7rem;
          margin-left: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goodname {
          margin-left: 0.5rem;
        }
      }
      .goodprice {
        width: 7rem;
        height: 100%;
        font-size: 1.3rem;
        line-height: 8rem;
        text-align: center;
      }
      .goodnum {
        width: 10rem;
        height: 100%;
        text-align: center;

        .count {
          padding-top: 3rem;
          padding-left: 3rem;

          .number {
            width: 4rem;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            font-size: 1.2rem;
          }
        }
      }
      .good_subtotal {
        width: 7rem;
        height: 100%;
        font-size: 1.2rem;
        color: #666666;
        line-height: 8rem;
        text-align: center;
      }
      .good_operation {
        height: 100%;
        margin-left: 3rem;
        font-size: 1rem;
        font-weight: 500;
        line-height: 8rem;
        text-align: center;
        color: #666666;
        .good_operation1:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>