<template>
  <div class="chooseseat">
    <div
      v-show="buystate == 'con' || buystate == 'coned'"
      class="allzhezhao thevideo"
    >
      <div v-show="buystate == 'con'" class="confirm">
        <div class="co_content">{{ almsg }}</div>
        <div class="co_co">
          <div class="co_yes" @click="confirmbuyTwo">确定</div>
          <div class="co_no" @click="ctbuystate('no')">取消</div>
        </div>
      </div>
      <div v-show="buystate == 'coned'" class="alert">
        <div class="al_content">{{ almsg }}</div>
        <div class="al_al">
          <div class="al_yes" @click="gohome">确定</div>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="chooseseat_left">
        <div class="left_nav">
          <div class="nav_kexuan">
            <svg
              t="1617868188933"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2821"
              width="32"
              height="32"
            >
              <path
                d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z"
                p-id="2822"
                fill="#e6e6e6"
              ></path></svg
            >可选座位
          </div>
          <div class="nav_yishou">
            <svg
              t="1617868212552"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3154"
              width="32"
              height="32"
            >
              <path
                d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z"
                p-id="3155"
                fill="#d81e06"
              ></path></svg
            >已售座位
          </div>
          <div class="nav_choosed">
            <svg
              t="1617868212552"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3154"
              width="32"
              height="32"
            >
              <path
                d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z"
                p-id="3155"
                fill="#1afa29"
              ></path></svg
            >已选座位
          </div>
        </div>
        <div class="center">
          <div class="c_1"></div>
          <div class="c_2"></div>
          <div class="c_3"></div>
          <span>电影屏幕</span>
        </div>
        <div class="main">
          <div
            class="oneseat"
            v-for="(item, index) in seatlist"
            :key="'oneseat' + index"
          >
            <svg
              @click="chooseseat(item.ischoosed, index)"
              :class="{
                yishou: item.isbuyed,
                choosed: item.ischoosed && index == mychooseseat,
              }"
              t="1617868188933"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2821"
              width="20"
              height="20"
            >
              <path
                d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z"
                p-id="2822"
                fill="#e6e6e6"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="chooseseat_right">
        <div class="moviemsg">
          <div class="moviemsg_img">
            <img :src="movie.picPath" alt="" />
          </div>
          <div class="moviemsg_msg">
            <div class="msg_mname">{{ movie.mname }}</div>
            <div class="msg_type">
              类型: <span>{{ movie.type }}</span>
            </div>
            <div class="msg_totaltime">
              电影时长: <span> {{ movie.totalTime * 60 }}分钟</span>
            </div>
          </div>
        </div>
        <div class="sessionmsg">
          <span
            >影院:<span class="s_msg">{{ session.location }}</span></span
          >
          <span
            >影厅:<span class="s_msg"
              >{{ session.vh }}-RealID金属银幕厅</span
            ></span
          >
          <span
            >版本:<span class="s_msg">{{ movie.category }}</span></span
          >
          <span
            >场次:<span class="s_msg redfont">{{
              session.day + "-" + session.startTime + "点场"
            }}</span></span
          >
          <span
            >票价:<span class="s_msg">¥{{ movie.price }}/张</span></span
          >
        </div>
        <div class="final_buy" @click="confirmbuyOne">确认订票</div>
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
    this.getmovie();
    this.getsession();
    this.getseatnum();
  },
  props: ["sessionid", "mname"],
  data() {
    return {
      movie: {}, //表示当前正在接受订票的电影
      session: {}, //表示当前场次
      seatnumlist: [], //表示座位表位号数组
      seatlist: [], //表示座位表对象数组
      mychooseseat: null, //表示当前我选择的座位号
      ischoose: false, //表示当前未处于选择状态
      almsg: null, //提示消息

      buystate: "no", //no还未确认购票  con正在确认购票  coned完成确认购票
    };
  },
  methods: {
    //改变购票状态
    ctbuystate(state) {
      this.buystate = state;
    },

    //获取当前电影信息
    async getmovie() {
      let apiurl = this.$store.getters.GETapihttp + "movie/ByName";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          mName: this.mname,
        },
      });
      //   console.log(res.data);
      this.movie = res.data[0];
    },

    //获取获取当前场次信息
    async getsession() {
      let apiurl = this.$store.getters.GETapihttp + "session/ById";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          sessionId: this.sessionid,
        },
      });
      //   console.log(res.data);
      this.session = res.data[0];
    },

    //查询已经定了的座位表的位置
    async getseatnum() {
      let apiurl = this.$store.getters.GETapihttp + "book/seat";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          sessionId: this.sessionid,
        },
      });
      // console.log(res.data);
      this.seatnumlist = res.data;
      this.seatnumlist.forEach((item, index) => {
        // console.log(index);
        var seat = {
          num: "",
          isbuyed: "",
          ischoosed: "",
        };
        // console.log(item);
        if (item == -1) {
          seat.num = index;
          seat.isbuyed = false;
          seat.ischoosed = false;
        } else {
          seat.num = index;
          seat.isbuyed = true;
          seat.ischoosed = false;
        }
        this.seatlist.push(seat);
      });
      // console.log(this.seatlist);
    },

    //选座位函数，改变作为被选状态
    chooseseat(ischoosed, index) {
      if (this.seatlist[index].isbuyed == false) {
        this.seatlist[index].ischoosed = !ischoosed;
      }

      if (this.seatlist[index].ischoosed == true) {
        this.mychooseseat = this.seatlist[index].num;
      } else {
        this.mychooseseat = null;
      }
    },

    //确认购票,第一步
    confirmbuyOne() {
      if (this.mychooseseat != null) {
        this.buystate = "con";
        this.almsg =
          "请您确认是否观看" +
          this.movie.mname +
          "?您的观影日期为:" +
          this.session.day +
          "日" +
          this.session.startTime +
          "。影视厅为" +
          this.session.vh +
          "-RealID金属银幕厅";
      } else {
        alert("请先选择座位号");
      }
    },
    //确认购票第二步
    confirmbuyTwo() {
      let apiurl = this.$store.getters.GETapihttp + "book/add";
      let res = axios.get(apiurl, {
        method: "GET",
        params: {
          userId: this.$store.getters.GETme.userId,
          sessionId: this.session.sessionId,
          mName: this.movie.mname,
          bookseat: this.mychooseseat,
        },
      });
      this.ctbuystate("coned");
      this.almsg =
        "您已完成" +
        this.session.mname +
        "的购票   您的观影日期为:" +
        this.session.day +
        "日" +
        this.session.startTime +
        "时  影视厅为" +
        this.session.vh +
        "-RealID金属银幕厅";
    },
    gohome() {
      this.ctbuystate("no");
      // this.$router.push("/");
    },
    //确认购票，对数据库插入购票数据
    // confirmbuy() {
    //   if (this.mychooseseat != null) {
    //     let apiurl = this.$store.getters.GETapihttp + "book/add";

    //     var c = confirm("您确定要选这场吗?");

    //     if (c) {
    //       let res = axios.get(apiurl, {
    //         method: "GET",
    //         params: {
    //           userId: this.$store.getters.GETme.userId,
    //           sessionId: this.session.sessionId,
    //           mName: this.movie.mname,
    //           bookseat: this.mychooseseat,
    //         },
    //       });
    //       var aler =
    //         "谢谢购买！您的观影日期为:" +
    //         this.session.day +
    //         "日" +
    //         this.session.startTime +
    //         "。影视厅为" +
    //         this.session.vh +
    //         "-RealID金属银幕厅";
    //       alert(aler);
    //     } else {
    //     }
    //   } else {
    //     alert("请先选择座位号");
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.redfont {
  color: rgb(239, 66, 56);
}
.chooseseat {
  width: 100%;
  .w {
    border: 1px solid rgba(160, 160, 160, 0.3);
    margin-top: 3rem;
    display: flex;
  }
}
.thevideo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chooseseat_left {
  width: 70%;
  height: 40rem;
  .left_nav {
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: space-around;
  }
}

.nav_kexuan,
.nav_yishou,
.nav_choosed {
  width: 20rem;
  height: 5rem;
  line-height: 5rem;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 2rem;
  .svg {
    height: 5rem;
  }
}
.center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .c_1 {
    height: 2rem;
    width: 50rem;
    background-color: rgba(160, 160, 160, 0.3);
  }
  .c_2 {
    height: 1rem;
    width: 10rem;
    background-color: #fff;
  }
  .c_3 {
    height: 1rem;
    width: 40rem;
    background-color: rgba(160, 160, 160, 0.3);
  }
  span {
    display: block;
  }
}
.main {
  width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4rem;
  margin-left: 20%;
}
.oneseat {
  width: 10%;
  margin-right: 2%;
  height: 2rem;
  svg {
    cursor: pointer;
  }
}
.yishou {
  path {
    fill: #d81e06;
    cursor: not-allowed;
  }
}
.choosed {
  path {
    fill: #1afa29;
  }
}
.chooseseat_right {
  width: 30%;
  height: 40rem;
  background-color: rgb(249, 249, 249);
}
.moviemsg {
  width: 100%;
  height: 14rem;
  display: flex;
  margin-left: 2rem;
  margin-top: 2rem;
}
.moviemsg_img {
  height: 14rem;
  width: 10rem;
  border: 2px solid #fff;
  img {
    height: 100%;
    width: 100%;
  }
}
.moviemsg_msg {
  margin-left: 2rem;
  height: 14rem;
  width: 10rem;
  .msg_mname {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  .msg_type,
  .msg_totaltime {
    color: rgba(160, 160, 160);
    span {
      color: #000;
    }
  }
}
.sessionmsg {
  width: 100%;
  height: 14rem;
  margin-left: 2rem;

  span {
    font-size: 1.2rem;
    display: block;
    height: 3rem;
    line-height: 3rem;
    color: rgba(160, 160, 160);
    .s_msg {
      position: relative;
      display: inline-block;
      color: #000;
      margin-left: 1rem;
    }
    .redfont {
      color: rgb(239, 66, 56);
    }
  }
}
.final_buy {
  margin-top: 5rem;
  width: 50%;
  margin-left: 25%;
  height: 3rem;
  line-height: 3rem;
  background-color: rgb(239, 66, 56);
  color: #fff;
  text-align: center;
  border-radius: 1.5rem;
  cursor: pointer;
}
.final_buy:hover {
  background-color: rgb(245, 132, 126);
}
</style>