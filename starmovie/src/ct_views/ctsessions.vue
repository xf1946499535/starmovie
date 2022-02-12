<template>
  <div class="ctsessions">
    <div class="w">
      <div class="addmovie">
        <div class="addone">
          <span>电影名:</span><input type="text" v-model="newsession.mName" />
        </div>
        <div class="addone">
          <span>日期:</span
          ><input
            type="date"
            v-model="newsession.day"
            @blur="sqlrestvh(newsession.day)"
          />
        </div>
        <div class="addone">
          <span>开始时间:</span
          ><input type="time" v-model="newsession.startTime" />
        </div>
        <div class="addone">
          <span>结束时间:</span
          ><input type="time" v-model="newsession.endTime" />
        </div>

        <div class="addone">
          <span>影厅号:</span
          ><input type="text" v-model="newsession.vh" list="couldVh" />
          <datalist id="couldVh">
            <option
              v-for="(item, index) in restvhs"
              :key="'restvh' + index"
              :value="item"
            ></option>
          </datalist>
        </div>
        <div class="addone">
          <span>影院地址:</span
          ><input type="text" v-model="newsession.location" list="locations" />
          <datalist id="locations">
            <option>成都电影院</option>
            <option>万达电影院</option>
            <option>博纳电影院</option>
            <option>北京电影院</option>
          </datalist>
        </div>
        <div class="submit" @click="submitsession">提交场次</div>
      </div>

      <div class="c_session">
        <div
          class="c_btn"
          :class="{ ic_btn: sqlstate == 'now' }"
          @click="sqlsession('now')"
        >
          当前场次
        </div>
        <div
          class="c_btn"
          :class="{ ic_btn: sqlstate == 'before' }"
          @click="sqlsession('before')"
        >
          历史场次
        </div>
        <div
          class="c_btn"
          :class="{ ic_btn: sqlstate == 'wait' }"
          @click="sqlsession('wait')"
        >
          未映场次
        </div>
      </div>

      <div class="aboutsessions">
        <div class="sessions">
          <div
            class="onesession"
            v-for="(item, index) in sessions"
            :key="'n' + index"
          >
            <div class="sessionmsgs">
              <span class="sessionid">场次号:{{ item.sessionId }}</span>
              <span class="mName">电影名:{{ item.mname }}</span>
              <span class="day">日期:{{ item.day }}</span>
              <span class="vh">影厅号:{{ item.sessvhionId }}</span>
              <span class="location">影院:{{ item.location }}</span>
            </div>
            <div class="ctbtns"></div>
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
      ct_log.admincheck(vm, next);
    });
  },

  mounted() {
    this.sqlsession("now");
  },
  data() {
    return {
      newsession: {
        location: null,
        startTime: null,
        endTime: null,
        day: null,
        mName: null,
        vh: null,
      },
      restvhs: [], //当天为安排场次的影厅,根据day来确定
      sessions: [], //保存当前显示的场次

      sqlstate: "now", //当前希望查询的场次类型，默认为now
    };
  },

  methods: {
    //提交电影
    submitsession() {
      let check = true;
      for (const key in this.newsession) {
        if (this.newsession[key] == null || this.newsession[key] == "") {
          console.log(key);
          alert("请完善场次基础数据");
          check = false;
          break;
        }
      }
      if (check == true) {
        let apiurl = this.$store.getters.GETapihttp + "session/add";

        let res = axios.get(apiurl, {
          method: "GET",
          params: this.newsession,
        });
        console.log("上传成功");
      }
    },
    //根据日期，查询当前还未安排场次的影厅
    async sqlrestvh(day) {
      let apiurl = this.$store.getters.GETapihttp + "session/ByDay";
      console.log(day);
      let res = await axios.get(apiurl, {
        method: "GET",
        params: { day: day },
      });
      this.restvhs = res.data;
      console.log(this.restvhs);
    },

    //根据state，查找场次信息
    async sqlsession(sqlstate) {
      let apiurl1 = this.$store.getters.GETapihttp + "session/ByState";
      this.sqlstate = sqlstate;
      let res1 = await axios.get(apiurl1, {
        method: "GET",
        params: {
          state: sqlstate,
        },
      });
      this.sessions = res1.data;
    },
  },
};
</script>

<style lang="less" scoped>
.w {
  margin-top: 2rem;
}
.addmovie {
  width: 100%;
  position: relative;
  display: flex;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(227, 227, 227);
  justify-content: space-between;
  flex-wrap: wrap;
  .addone {
    width: 20%;
    height: 3rem;
    margin-right: 10%;
    margin-top: 2rem;
    display: flex;
    span {
      width: 30%;
      height: 3rem;
      line-height: 3rem;
    }
    input {
      width: 70%;
    }
  }
}
.submit {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  margin-left: -5rem;
  width: 10rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  background-color: rgb(15, 189, 229);
  cursor: pointer;
}
.submit:hover {
  background-color: rgb(80, 206, 235);
}
.c_session {
  width: 100%;
  height: 4rem;
  display: flex;
  .c_btn {
    margin-left: 1rem;
    width: 10rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    background-color: rgb(155, 213, 226);
  }
  .ic_btn {
    background-color: rgb(15, 189, 229);
  }
}

.aboutsessions {
  width: 100%;
  display: flex;
  .sessions {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .onesession {
      width: 21%;
      height: 10rem;
      margin-left: 2rem;
      border: 2px solid rgb(15, 189, 229);
      margin-top: 3rem;
      .sessionmsgs {
        width: 60%;
        height: 10rem;
        span {
          display: block;
        }
      }
      .ctbtns {
        width: 40%;
        height: 10rem;
      }
    }
  }
}
</style>