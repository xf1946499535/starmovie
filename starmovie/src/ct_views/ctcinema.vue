<template>
  <div class="ctcinema">
    <div v-if="iswatch" class="zhezhao"></div>
    <div class="w">
      <div
        class="getin"
        v-for="(item, index) in vhlist"
        :key="'vhlist' + index"
      >
        <img :src="item.picPath" alt="" />
        <div class="vh_msg">
          <span class="vh_mname">{{ item.mName }}</span>
          <span class="vh_time">{{ item.day + "-" + item.startTime }}</span>
          <span class="vh_location">{{ item.location }}</span>
          <span class="vh_vhname">{{ item.vhname }}</span>
          <span class="vh_playstate"
            ><span v-if="item.playstate">正在播放</span>
            <span v-if="!item.playstate">尚未播放</span>
          </span>
          <div class="ct_start" @click="ctstart(item)">放映电影</div>
          <div class="ct_end" @click="ctend(item)">关闭电影</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ct_log from "../tools/ct_log";
import socket from "../socket";
import axios from "axios";
export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },

  mounted() {
    //监听别人进入影厅
    socket.on("joinvh", (vhsocket, userName) => {
      console.log("通知通知" + userName + "进入了房间");
    });
    this.getvh();
  },
  data() {
    return {
      vhlist: [],
      iswatch: false, //表示没有观看电影
    };
  },
  methods: {
    //获取该用户可以进入的影厅列表与对应电影和场次
    async getvh() {
      let apiurl = this.$store.getters.GETapihttp2 + "vh/ct_vhlist";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.vhlist = res.data;

      this.vhlist.forEach((item) => {
        item.playstate = false;
      });
    }, //管理员控制电影打开
    ctstart(item) {
      item.playstate = true;
      socket.emit("ctstart", item.vhsocket);
    },
    //管理员控制电影关闭
    ctend(item) {
      item.playstate = false;
      socket.emit("ctend", item.vhsocket);
    },
  },
};
</script>

<style lang="less" scoped>
.ctcinema {
  width: 100%;
  height: 60rem;
  background-size: 100% 100%;
}
.w {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 2rem;
}
.myvideo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.getin {
  width: 40%;
  height: 30rem;
  background-color: rgba(151, 155, 158, 0.2);
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  img {
    width: 50%;
    height: 100%;
  }
}
.vh_msg {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .vh_mname {
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    color: rgb(239, 66, 56);
  }
  .vh_time {
    font-size: 1.5rem;
    color: rgb(0, 0, 0);
  }
  .vh_playstate {
    color: rgb(239, 66, 56);
  }
  .ct_start,
  .ct_end {
    margin-top: 3rem;
    height: 4rem;
    width: 70%;
    text-align: center;
    margin-left: 15%;
    line-height: 4rem;
    cursor: pointer;
    font-size: 1.5rem;
    color: #fff;
    background-color: rgb(15, 189, 229);
  }
  .ct_start:hover,
  .ct_end:hover {
    background-color: rgb(15, 189, 229);
  }
}
</style>