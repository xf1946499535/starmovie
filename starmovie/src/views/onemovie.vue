<template>
  <div class="onemovie">
    <div class="head">
      <div class="w">
        <div class="head_img">
          <img :src="movie.picPath" alt="" />
        </div>
        <div class="head_msg">
          <div class="msg_up">
            <span class="msg_up_1">{{ movie.mname }}</span>
            <span class="msg_up_2">A Midsummer Night's Dream</span>
            <span class="msg_up_3">{{ movie.type }}</span>
            <span class="msg_up_4">中国大陆 /{{ movie.totalTime }}小时</span>
            <span class="msg_up_5">2021-04-02 18:00中国大陆上映</span>
          </div>
          <div class="msg_down">
            <div class="btnbox">
              <div class="btnbox_up">
                <div class="want">
                  <svg
                    t="1617802363381"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1144"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
                      p-id="1145"
                      fill="#ffffff"
                    ></path></svg
                  >想看
                </div>
                <div class="evaluate">
                  <svg
                    t="1617802589540"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2159"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M942.689255 411.229837c-4.743556-14.595558-17.39304-25.298967-32.596745-27.4883l-250.070555-36.367265-111.899275-226.596033c-6.81126-13.74415-20.79867-22.501485-36.124005-22.501485-15.325336 0-29.312745 8.757335-36.124005 22.501485l-111.899275 226.596033-250.070555 36.367265c-15.203706 2.189334-27.853189 12.771113-32.596745 27.4883-4.743556 14.595558-0.729778 30.650671 10.21689 41.35408l180.984915 176.362988L229.939522 878.044423c-2.554223 15.082076 3.648889 30.407412 16.055113 39.408006 12.406224 9.000594 28.826226 10.21689 42.448747 3.040741l223.676921-117.615869 223.676921 117.615869c5.838223 3.040741 12.284594 4.621927 18.730966 4.621927 8.392446 0 16.663262-2.554223 23.717781-7.662668 12.406224-9.000594 18.609336-24.325929 16.055113-39.408006l-42.692006-249.097518 180.984915-176.362988C943.419033 441.880508 947.432811 425.825395 942.689255 411.229837L942.689255 411.229837z"
                      p-id="2160"
                      fill="#ffffff"
                    ></path></svg
                  >评价
                </div>
              </div>
              <div class="btnbox_down" @click="goticket(movie.mname)">
                特惠购票
              </div>
            </div>
          </div>
        </div>
        <div class="head_scores">
          <span class="scores_text">大众口碑</span>
          <div class="scores">8.9</div>
          <span class="scores_text">累计票房</span>
          <div class="boxoffice">{{ movie.click }} <span>亿</span></div>
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
    this.getmovie();
  },
  props: ["mname"],
  data() {
    return {
      movie: {}, //当前选择的电影
    };
  },

  methods: {
    //获取当前电影信息
    async getmovie() {
      if (!this.mname) {
        this.$router.push("/");
      }
      let apiurl = this.$store.getters.GETapihttp + "movie/ByName";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          mName: this.mname,
        },
      });
      console.log(res.data);
      this.movie = res.data[0];
    },
    //前往选场界面
    goticket(mname) {
      //前往电影详情页面
      this.$router.push({
        path: "buyticket",
        query: {
          mname: mname,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.onemovie {
  position: relative;
  width: 100%;
}
.head {
  position: relative;
  width: 100%;
  height: 32rem;
  background-image: linear-gradient(
    to right,
    rgb(141, 74, 207),
    rgb(55, 12, 83)
  );
  .w {
    display: flex;
    justify-content: left;
    padding-top: 5.3rem;
  }
}
.head_img,
.head_msg,
.head_scores {
  position: relative;
  height: 32rem;
  width: 20rem;
  margin-left: 3rem;
}
.head_img {
  border: solid 2px #fff;
  img {
    width: 100%;
    height: 90%;
  }
}
.head_msg {
  display: flex;
  flex-direction: column;
  color: #fff;
}
.msg_up {
  height: 50%;
  width: 100%;
  span {
    display: block;
    font-size: 1.2rem;
  }
  .msg_up_1 {
    font-size: 2rem;
  }
  .msg_up_3 {
    margin-top: 2rem;
  }
}

.msg_down {
  height: 50%;
  width: 100%;
}
.btnbox {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.btnbox_up,
.btnbox_down {
  width: 100%;
  height: 3rem;
}

.btnbox_up {
  display: flex;
  justify-content: space-between;
  .want,
  .evaluate {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 48%;
    background-color: rgba(255, 255, 225, 0.5);
    cursor: pointer;
    font-size: 1.2rem;
    svg {
      height: 3rem;
    }
  }
}
.btnbox_down {
  background-color: rgb(239, 66, 56);
  line-height: 3rem;
  height: 3rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
}
.head_scores {
  top: 10rem;
  color: #fff;
  .scores_text {
    display: block;
    margin-top: 2rem;
  }
  .scores {
    font-size: 2rem;
    color: rgb(255, 198, 0);
  }
  .boxoffice {
    font-size: 2rem;
    span {
      font-size: 1rem;
    }
  }
}
</style>