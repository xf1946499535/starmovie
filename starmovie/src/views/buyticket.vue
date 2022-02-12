<template>
  <div class="buyticket">
    <div class="w">
      <div class="head">
        <div class="head_up">
          <div class="up_mname">{{ movie.mname }}</div>
          <div class="up_scores">{{ movie.scores }}分</div>
        </div>
        <div class="head_down">
          <div class="timelong">
            时长:<span>{{ movie.totalTime * 60 }}分钟</span>
          </div>
          <div class="type">
            类型:<span>{{ movie.type }}</span>
          </div>
          <div class="mainhuman">主演:<span>小阳</span></div>
        </div>
      </div>

      <div class="sessionlist">
        <div class="session_nav">
          <span>放映时间</span>
          <span>放映版本</span>
          <span>放映厅</span>
          <span>售价</span>
          <span>选座购票</span>
        </div>
        <div
          class="session_item"
          v-for="(item, index) in sessionlist"
          :key="'session' + index"
        >
          <div class="time">
            <span class="time_start">{{ item.day }}</span>
            <span class="time_start">{{ item.startTime }}:30</span>
            <span class="time_end">{{ item.endTime }}:30散场</span>
          </div>
          <span>{{ movie.category }}</span>
          <span>{{ item.vh }}-RealID金属银幕厅</span>
          <span class="item_price">¥{{ movie.price }}</span>
          <div class="chooseseat">
            <div
              class="choose_btn"
              @click="chooseseat(item.sessionId, item.mname)"
            >
              选座购票
            </div>
          </div>
        </div>
      </div>
      <div class="nothing" v-if="nothing">
        该电影暂无场次，推荐观看李尔王，李焕英
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
  props: ["mname"],
  mounted() {
    this.getsessions();
    this.getmovie();
  },
  data() {
    return {
      sessionlist: [], //当前场次列表
      movie: {}, //当前电影
      nothing: false,
    };
  },
  methods: {
    //获取当前电影的场次
    async getsessions() {
      let apiurl = this.$store.getters.GETapihttp + "session/ByName";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          mName: this.mname,
        },
      });
      // console.log(res.data);
      this.sessionlist = res.data;
      if (this.sessionlist.length == 0) {
        this.nothing = true;
      }
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
      // console.log(res.data);
      this.movie = res.data[0];
    },

    //前往选择座位界面
    chooseseat(sessionid, mname) {
      this.$router.push({
        path: "chooseseat",
        query: {
          sessionid: sessionid,
          mname: mname,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.buyticket {
  position: relative;
  width: 100%;
}
.head {
  position: relative;
  width: 100%;
  height: 10rem;
  border-bottom: rgba(158, 155, 155, 0.3) 1px solid;
}
.head_up {
  width: 100%;
  height: 5rem;
  display: flex;
  .up_mname {
    font-size: 2rem;
    height: 5rem;
    line-height: 5rem;
  }
  .up_scores {
    font-size: 1.7rem;
    margin-left: 3rem;
    height: 5rem;
    line-height: 5rem;
    color: sandybrown;
  }
}
.head_down {
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  display: flex;
  justify-content: left;
}
.timelong,
.type,
.mainhuman {
  margin-right: 2rem;
  font-size: 1.2rem;
  height: 5rem;
  line-height: 5rem;
  color: rgb(158, 155, 155);
  span {
    color: #000;
  }
}
.sessionlist {
  width: 100%;
}
.session_nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 4rem;
  background-color: rgb(247, 247, 247);
  span {
    display: block;
    height: 4rem;
    line-height: 4rem;
    width: 20%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 900;
  }
}
.session_item {
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  span {
    width: 20%;
    height: 8rem;
    font-size: 1.2rem;
    line-height: 8rem;
  }
  .item_price {
    color: rgb(239, 66, 56);
    font-weight: 900;
  }
  .time {
    width: 20%;
    height: 4rem;
    display: flex;
    flex-direction: column;
    span {
      width: 100%;
      height: 2rem;
      font-size: 1.2rem;
      line-height: 2rem;
    }
    .time_start {
      font-size: 1.5rem;
    }
    .time_end {
      font-size: 1rem;
      color: rgb(158, 155, 155);
    }
  }
  .chooseseat {
    width: 20%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .choose_btn {
      height: 3rem;
      width: 6rem;
      background-color: rgb(239, 66, 56);
      line-height: 3rem;
      font-size: 1.2rem;
      border-radius: 1rem;
      color: #fff;
      box-shadow: 0px 0px 0.5rem 1px rgb(239, 66, 56);
      cursor: pointer;
    }
    .choose_btn:hover {
      background-color: rgb(255, 0, 0);
    }
  }
}
.session_item:nth-child(odd) {
  background-color: rgb(247, 247, 247);
}
.nothing {
  color: red;
  font-size: 1.2rem;
}
</style>