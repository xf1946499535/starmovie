<template>
  <div class="mengban" v-if="isbuy">
    <div class="check_box">
      <span class="isbuy">是否选择购买以下商品：</span>
      <div class="text">
        <span class="text1"
          >商品名称:
          <span>{{ product.goodName }}</span>
        </span>
        <span class="text2"
          >商品数量:
          <span>{{ goodnum }}</span>
        </span>
        <span class="text3"
          >总计:
          <span>￥{{ goodnum * product.price }}</span>
        </span>
      </div>
      <div class="choose">
        <div class="sure" @click="buysure">
          <span>确定</span>
        </div>
        <div class="cancel" @click="buycancel">
          <span>取消</span>
        </div>
      </div>
    </div>
  </div>
  <div class="oneproduct">
    <div class="w">
      <nav>
        <span class="span1">首页 </span>
        <span class="span2">>商城>{{ product.goodName }}</span>
      </nav>
      <div class="general">
        <div class="detail-titleImages">
          <div class="big">
            <img :src="lb" alt="" />
          </div>
          <div class="small">
            <img
              v-for="(item, index) in lbPic"
              :key="'abc' + index"
              :src="item"
              @mouseover="changeImg(item, index)"
              :class="{ imgborder: imgindex == index }"
              alt=""
            />
          </div>
        </div>
        <div class="detail-purchase">
          <div class="goodname">{{ product.goodName }}</div>
          <div class="price">
            <div class="priceNow">￥{{ product.price }}</div>
            <div class="priceBefore">￥{{ product.priceBefore }}</div>
          </div>
          <div class="serveinfo">
            <div class="serve">服务：</div>
            <div class="serve1">正版授权</div>
            <div class="serve2">《售后服务》</div>
          </div>
          <div class="explaininfo">
            <div class="explain">说明：</div>
            <div class="ex-content">该商品由第三方卖家提供</div>
          </div>

          <div class="num">
            <div class="numText"><span>数量:</span></div>
            <div class="count">
              <div class="sign" @click="minus()">
                <svg
                  t="1618847403984"
                  class="icon"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1604"
                  width="16"
                  height="12"
                >
                  <path
                    d="M973.154 563.218 51.222 563.218c-28.275 0-51.222-22.946-51.222-51.214 0-28.276 22.946-51.222 51.222-51.222L973.154 460.782c28.33 0 51.222 22.946 51.222 51.222C1024.375 540.272 1001.484 563.218 973.154 563.218L973.154 563.218z"
                    p-id="1605"
                  ></path>
                </svg>
              </div>
              <div>
                <input
                  v-model="goodnum"
                  type="text"
                  @blur="resetnum()"
                  class="number"
                />
              </div>
              <div class="sign" @click="plus()">
                <svg
                  t="1618847369558"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1410"
                  width="16"
                  height="12"
                >
                  <path
                    d="M970.745 459.367 566.614 459.367 566.614 55.251C566.614 25.842 542.771 2 513.361 2c-29.411 0-53.253 23.841-53.253 53.251l0 404.116L55.975 459.367c-29.411 0-53.253 23.841-53.253 53.25 0 29.41 23.842 53.253 53.253 53.253l404.133 0 0 404.115c0 29.407 23.842 53.249 53.253 53.249 29.41 0 53.253-23.842 53.253-53.249L566.614 565.87l404.131 0c29.413 0 53.255-23.843 53.255-53.253C1024 483.208 1000.158 459.367 970.745 459.367z"
                    p-id="1411"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="numinfo"><span>(存货充足)</span></div>
          </div>
          <div class="purchase">
            <div class="purchase-btn" @click="buynow">立即抢购</div>
            <div class="gwc-btn" @click="entergwc">加入购物车</div>
            <div id="gwcimg">
              <img src="../img/entergwc.png" alt="" />
            </div>
            <div id="gwcsuccess">成功加入！</div>
            <div id="gotogwc" @click="goto_gwc(3)">去购物车</div>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <div class="tablist">
          <div class="tab">图文详情</div>
        </div>
        <div class="tabpanel">
          <div class="info-text">
            <div class="goodinfo1">
              <div class="goodinfo2">
                商品名称 :&emsp;
                <span> {{ product.goodName }} </span>
              </div>
            </div>

            <div class="goodinfo1">
              <div class="goodinfo2">
                数量&emsp;&emsp; :&emsp;
                <span>1件</span>
              </div>
            </div>

            <div class="goodinfo1">
              <div class="goodinfo2">
                价格&emsp;&emsp; :&emsp;
                <span> {{ product.priceBefore }} </span>
              </div>
            </div>

            <div class="goodinfo1">
              <div class="goodinfo2">
                品牌&emsp;&emsp; :&emsp;
                <span>{{ product.brand }} </span>
              </div>
            </div>

            <div class="goodinfo1">
              <div class="goodinfo2">
                产地&emsp;&emsp; :&emsp;
                <span> {{ product.placeOrigin }} </span>
              </div>
            </div>
          </div>
          <div class="info-image">
            <img :src="product.detailPic" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ct_log from "../tools/ct_log";

import axios from "axios";
export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },
  props: ["goodId"],
  mounted() {
    this.getproduct();
  },
  data() {
    return {
      product: {},
      lbPic: [],
      lb: [],
      imgindex: 0,
      goodnum: 1,
      isbuy: false,
    };
  },
  methods: {
    //获取当前商品信息
    async getproduct() {
      let apiurl = this.$store.getters.GETapihttp + "goods/ById";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          goodId: this.goodId,
        },
      });

      this.product = res.data;

      this.lbPic = this.product.lbPic.split(",");
      this.lb = this.lbPic[0];
    },

    //指针悬浮改变小图片边框
    changeImg(data, index) {
      this.lb = data;
      this.imgindex = index;
    },

    // 选择商品数量减法
    minus() {
      if (this.goodnum < 2) {
        this.goodnum = 1;
      } else {
        this.goodnum = this.goodnum - 1;
      }
    },
    //选择商品数量加法
    plus() {
      this.goodnum = Number(this.goodnum) + 1; //将在input框输入的值强制转换为number类型，否则goodnum此时是字符串，+1会导致拼串
    },

    buynow() {
      this.isbuy = true;
    },

    buycancel() {
      this.isbuy = false;
    },

    //立即购买,将数据存入订单表
    buysure() {
      var mydate = new Date();
      var nowtime = mydate.toLocaleString();

      let apiurl = this.$store.getters.GETapihttp + "order/add";
      let res = axios.get(apiurl, {
        method: "GET",
        params: {
          goodCount: this.goodnum,
          goodName: this.product.goodName,
          goodPrice: this.product.price,
          userID: this.$store.getters.GETme.userId,
          time: nowtime,
          pic: this.product.picPath,
        },
      });

      this.isbuy = false;
      //调用goto_order()方法
      this.goto_order(4);
    },

    //选择商品数量自定义数量
    resetnum() {
      var reg = /^\d{1,}$/;
      var pattern = new RegExp(reg);
      if (!pattern.test(this.goodnum)) {
        this.goodnum = 1; //使用正则表达式来判断是否输入的是纯数字，不是的话将goodnum设为1
      } else {
        this.goodnum = this.goodnum;
      }
    },

    //加入购物车,对数据库插入商品信息
    entergwc() {
      let apiurl = this.$store.getters.GETapihttp + "gwc/add";
      let res = axios.get(apiurl, {
        method: "GET",
        params: {
          goodName: this.product.goodName,
          goodCount: this.goodnum,
          goodPrice: this.product.price,
          pic: this.product.picPath,
          userID: this.$store.getters.GETme.userId,
        },
      });

      //根据js找到相应元素
      var gwcimage = document.getElementById("gwcimg");
      gwcimage.style.display = "block";
      var gwcsuccess = document.getElementById("gwcsuccess");
      gwcsuccess.style.display = "block";
      var goto = document.getElementById("gotogwc");
      goto.style.display = "block";
    },

    //点击进入购物车函数
    goto_gwc(choosenum) {
      this.$router.push({
        name: "gotogwc",
        query: {
          choosenum: choosenum,
        },
      });
    },

    //购买成功后进入订单表
    goto_order(choosenum) {
      this.$router.push({
        name: "gotoorder",
        query: {
          choosenum: choosenum,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mengban {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);

  .check_box {
    width: 30rem;
    height: 20rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: relative;

    .isbuy {
      margin-top: 1rem;
      font-size: 2rem;
      text-align: center;
    }
    .text {
      height: 10rem;
      display: flex;
      margin-left: 2rem;
      flex-direction: column;
      font-size: 1.3rem;
      justify-content: space-around;

      span {
        font-size: 1.2rem;
        color: #666666;
      }

      .text1 {
        margin-left: 2rem;
        span {
          margin-left: 1rem;
          font-size: 1.3rem;
          color: black;
        }
      }
      .text2 {
        margin-left: 2rem;
        span {
          margin-left: 1rem;
          font-size: 1.3rem;
          color: black;
        }
      }
      .text3 {
        margin-left: 2rem;
        span {
          margin-left: 1rem;
          font-size: 1.3rem;
          color: red;
        }
      }
    }
    .choose {
      position: absolute;
      bottom: 0;
      height: 5rem;
      width: 100%;
      display: flex;

      .sure {
        width: 15rem;
        font-size: 2rem;
        line-height: 5rem;
        text-align: center;
        background: rgb(116, 224, 248);
      }
      .cancel {
        flex: 1;
        font-size: 2rem;
        line-height: 5rem;
        text-align: center;
        background: rgba(162, 243, 196, 0.993);
      }
    }
  }
}
nav {
  margin-left: 8rem;
  margin-top: 4rem;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid slategrey;
  span {
    font-size: 1.5rem;
  }
  .span1 {
    color: #000;
  }
  .span2 {
    color: gray;
  }
}
.general {
  display: flex;
  width: 100%;
  margin-left: 8rem;
}
.detail-titleImages {
  margin-top: 3rem;
  width: 41rem;
}
.big {
  img {
    height: 36.5rem;
    width: 36.5rem;
  }
}
.small {
  margin-top: 1.5rem;
  display: flex;
  justify-content: left;
  img {
    margin-right: 1.5rem;
    height: 6.3rem;
    width: 6.3rem;
    cursor: pointer; //指针变成手型
  }
  .imgborder {
    //指针悬浮增加红色边框
    border: 1px solid red;
    box-sizing: border-box; //防止被边框撑开
  }
}
.detail-purchase {
  margin-top: 3rem;
  .goodname {
    margin-top: 2rem;
    font-size: 2.5rem;
  }
  .price {
    margin-top: 2rem;
    width: 51.6rem;
    height: 8.3rem;
    background-color: whitesmoke;
    line-height: 8rem;
    padding-left: 3rem;
    display: flex;
    .priceNow {
      font-size: 3.5rem;
      color: red;
    }
    .priceBefore {
      margin-left: 2rem;
      font-size: 2rem;
      color: grey;
      text-decoration: line-through;
    }
  }
  .serveinfo {
    display: flex;
    margin-top: 3rem;
    height: 3rem;
    color: grey;
    .serve1 {
      margin-left: 1.7rem;
    }
    .serve2 {
      margin-left: 1.5rem;
    }
  }
  .explaininfo {
    margin-top: 1rem;
    display: flex;
    color: orange;

    .ex-content {
      margin-left: 1.5rem;
    }
  }

  .num {
    display: flex;
    width: 100%;
    height: 3.5rem;
    margin-top: 2rem;
    .numText {
      width: 5rem;
      line-height: 3.4rem;
      font-size: 1.2rem;
    }
    .count {
      display: flex;
      width: 9rem;

      .sign {
        width: 2rem;
        text-align: center;
        border: 1px solid #cacaca;
        line-height: 3.5rem;
        font-size: 1.3rem;
        cursor: pointer;
        .svg {
          height: 3.5rem;
        }
      }
      .number {
        width: 5rem;
        text-align: center;
        border: 1px solid #cacaca;
        line-height: 3.4rem;
        font-size: 1.2rem;
      }
    }
    .numinfo {
      margin-left: 1.2rem;
      width: 6rem;
      text-align: center;
      line-height: 3.5rem;
      font-size: 1.1rem;
    }
  }

  .purchase {
    display: flex;

    .purchase-btn {
      margin-top: 3rem;
      background-color: rgb(17, 111, 148);
      height: 5rem;
      width: 13rem;
      border-radius: 3rem;

      line-height: 5rem;
      text-align: center;
      font-size: 1.7rem;
      color: white;
      cursor: pointer; //指针变成手型
    }
    .gwc-btn {
      margin-top: 3rem;
      margin-left: 1rem;
      background-color: #00a989;
      height: 5rem;
      width: 13rem;
      border-radius: 3rem;

      line-height: 5rem;
      text-align: center;
      font-size: 1.7rem;
      color: white;
      cursor: pointer; //指针变成手型
    }
    #gwcimg {
      display: none;
      img {
        margin-left: -1rem;
        margin-top: 1rem;
      }
    }
    #gwcsuccess {
      display: none;
      margin-top: 3rem;
      margin-left: 1rem;
    }
    #gotogwc {
      display: none;
      text-decoration: underline;
      font-size: 1.2rem;
      margin-top: 5rem;
      margin-left: -5rem;
      color: #00a989;
    }
  }
}
.detail-info {
  margin-top: 7rem;
  margin-left: 8rem;
  width: 100%;

  flex-direction: column;

  display: flex;
  .tablist {
    height: 4.5rem;
    width: 100%;

    .tab {
      width: 9.3rem;
      text-align: center;
      font-size: 1.6rem;
      line-height: 4.5rem;
      color: red;
      border-bottom: 2px solid red;
    }
  }
  .tabpanel {
    height: 13.8rem;

    width: 92rem;
    margin-top: 2rem;
    .info-text {
      padding: 1rem;
      background: rgb(252, 241, 241);
      .goodinfo1 {
        line-height: 2.5rem;
        height: 2.4rem;
        color: #000;
      }
      .goodinfo2 {
        margin-left: 1rem;
        font-size: 1.3rem;
        color: #333;
        span {
          color: gray;
        }
      }
    }
    .info-image {
      margin-top: 2rem;
      text-align: center;
      img {
        height: 100%;
        width: 53.3rem;
      }
    }
  }
}
</style>