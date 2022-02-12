<template>
  <div class="pro_order">
    <div class="order_nav">我的订单</div>
    <div
      class="order_item"
      v-for="(item, index) in orders"
      :key="'orders' + index"
    >
      <div class="order_item_one" v-if="!item.isdel">
        <div class="item_nav">电影订单号:{{ item.bookId }}</div>
        <div class="item_body">
          <img :src="item.picPath" alt="" />
          <div class="movie_msg">
            <span class="msg_mname">{{ item.mname }}</span>
            <span>{{ item.location }}</span>
            <span>{{ item.vh }}厅{{ "   " + item.bookseat }}号座</span>
            <span>{{ item.day + "-" + item.startTime }}</span>
          </div>
          <div class="price">¥{{ item.price }}</div>
          <div class="isdone">
            <span v-if="!item.isDone">已完成</span
            ><span v-if="item.isDone">未完成</span>
          </div>
          <div class="del">
            <div class="del_btn" @click="del(item.bookId, item.isDone, index)">
              删除
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
  mounted() {
    this.getorders();
  },
  data() {
    return {
      orders: [], //所有订单信息包括电影场次信息
    };
  },
  methods: {
    //根据用户id查询book信息
    async getorders() {
      let apiurl = this.$store.getters.GETapihttp2 + "book/UserId";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          userId: this.$store.getters.GETme.userId,
        },
      });
      this.orders = res.data;
      this.orders.forEach((item) => {
        item.isdel = false;
      });
      console.log(res.data);
    },

    //删除订单信息
    del(bookId, isDone, index) {
      if (isDone != false) {
        let apiurl = this.$store.getters.GETapihttp + "book/delete";
        let res = axios.get(apiurl, {
          method: "GET",
          params: {
            bookId: bookId,
          },
        });
        this.orders[index].isdel = true;
      } else {
        alert("电影订单尚未完成，无法删除");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pro_order {
  width: 100%;
  position: relative;
}
.order_nav {
  width: 81rem;
  height: 6rem;
  margin-left: 4rem;
  line-height: 6rem;
  font-size: 1.7rem;
  color: rgb(15, 189, 229);
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.order_item_one {
  border: 1px solid rgba(150, 150, 150, 0.5);
  width: 90%;
  margin-left: 5%;
  margin-top: 2rem;
}
.item_nav {
  height: 5rem;
  line-height: 5rem;
  width: 100%;
  font-size: 1.2rem;
  color: rgba(100, 100, 100);
  background-color: rgb(247, 247, 247);
}
.item_body {
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    position: relative;
    width: 7%;
    margin-left: 3%;
    height: 8rem;
  }
}
.movie_msg {
  width: 50%;
  height: 12rem;
  display: flex;
  flex-direction: column;
  .msg_mname {
    margin-top: 2rem;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
.price {
  width: 10%;
  height: 12rem;
  line-height: 12rem;
}
.isDone {
  width: 10%;
  height: 12rem;
  line-height: 12rem;
}
.del {
  width: 10%;
  height: 12rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .del_btn {
    height: 3rem;
    line-height: 3rem;
    width: 5rem;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: rgb(15, 189, 229);
  }
  .del_btn:hover {
    background-color: rgb(78, 199, 226);
  }
}
</style>