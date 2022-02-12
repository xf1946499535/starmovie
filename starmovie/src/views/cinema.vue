<template>
  <div class="cinema">
    <div v-if="iswatch" class="allzhezhao thevideo">
      <myvideo :nowvh="nowvh" :ctiswatch="ctiswatch"></myvideo>
    </div>
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
          <div class="govh" @click="getin(item)">进入影厅</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myvideo from "../components/myvideo";
import ct_log from "../tools/ct_log";
import socket from "../socket";
import axios from "axios";

export default {
  components: { myvideo },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },
  mounted() {
    socket.on("joinvh", (vhsocket, userName) => {
      console.log("通知通知" + userName + "进入了房间");
    });

    this.getvh();
  },
  data() {
    return {
      vhlist: [],
      vhitem: {
        vhId: "",
        vhname: "",
        vhsocket: "",
        sessionid: "",
        mname: "",
        location: "",
        day: "",
        startTime: "",
        picPath: "",
        playPath: "",
      }, //单条订单信息临时存放

      nowvh: null, //表示现在选择观看的电影
      iswatch: false, //表示没有观看电影
    };
  },
  methods: {
    //获取该用户可以进入的影厅列表与对应电影和场次
    async getvh() {
      let apiurl = this.$store.getters.GETapihttp2 + "vh/vhlist";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          userId: this.$store.getters.GETme.userId,
        },
      });

      this.vhlist = res.data;
    },

    getin(item) {
      this.nowvh = item;
      this.iswatch = true;
      console.log("我进入了" + item.vhname + "影厅,观看" + item.mname);
      socket.emit("joinvh", item.vhsocket, this.$store.getters.GETme);
    },
    ctiswatch(order) {
      this.iswatch = order;
    },
  },
};
</script>

<style lang="less" scoped>
.cinema {
  width: 100%;
  height: 60rem;
  background-image: url("https://t1.hxzdhn.com/uploads/tu/201602/197/iwi3ly1mbvk.jpg");
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
.thevideo {
  display: flex;
  justify-content: center;
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
  .govh {
    margin-top: 14rem;
    height: 4rem;
    width: 70%;
    text-align: center;
    margin-left: 15%;
    line-height: 4rem;
    cursor: pointer;
    font-size: 1.5rem;
    color: #fff;
    background-color: rgb(239, 66, 56);
  }
  .govh:hover {
    background-color: rgb(241, 102, 94);
  }
}
</style>