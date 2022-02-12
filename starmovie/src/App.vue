<template>
  <div id="app">
    <div class="main" v-show="!isloginpage">
      <div class="nav">
        <div class="nav_c">
          <div class="logo" @click="gohome">
            <img src="./img/mylogo.png" alt="" />
          </div>
          <div class="address">
            <div class="city">成都</div>
            <div class="sanjiao">
              <svg
                t="1617111423494"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1567"
                width="20"
                height="12"
              >
                <path
                  d="M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z"
                  p-id="1568"
                  fill="#000000"
                ></path>
              </svg>
            </div>
          </div>
          <div class="router">
            <router-link class="router_item" to="/">首页</router-link>
            <router-link class="router_item" to="/moviepage">电影</router-link>
            <router-link class="router_item" to="/cinema">影院</router-link>
            <router-link class="router_item" to="/show">演出</router-link>
            <router-link class="router_item" to="/billboard">榜单</router-link>
            <router-link class="router_item" to="/hotnews">热点</router-link>
            <router-link class="router_item" to="/shoppingmall"
              >商城</router-link
            >
          </div>
          <div class="download">
            <div class="phoneicon">
              <svg
                t="1617115332734"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2065"
                width="20"
                height="16"
              >
                <path
                  d="M759 64H267c-40.869 0-74 33.131-74 74v748c0 40.869 33.131 74 74 74h492c40.869 0 74-33.131 74-74V138c0-40.869-33.131-74-74-74zM544 896h-64c-17.673 0-32-14.327-32-32s14.327-32 32-32h64c17.673 0 32 14.327 32 32s-14.327 32-32 32z m224-146c0 9.941-8.059 18-18 18H274c-9.941 0-18-8.059-18-18V146c0-9.941 8.059-18 18-18h476c9.941 0 18 8.059 18 18v604z"
                  p-id="2066"
                ></path>
              </svg>
            </div>
            app下载
            <div class="sanjiao">
              <svg
                t="1617111423494"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1567"
                width="20"
                height="12"
              >
                <path
                  d="M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z"
                  p-id="1568"
                  fill="#000000"
                ></path>
              </svg>
            </div>
            <div class="d_bottom">
              <img
                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=528676435,1806536374&fm=11&gp=0.jpg"
                alt=""
              />
              <span> 下载有更多优惠 </span>
            </div>
          </div>
          <div class="search">
            <div class="search_input">
              <input
                type="text"
                id=""
                v-model="searchmname"
                placeholder="输入电影名"
              />
              <img
                src="./img/magnifier.png"
                @click="goonemovie(searchmname)"
                alt=""
              />
            </div>
          </div>
          <div class="log" v-if="this.$store.getters.GETme == null">
            <img src="./img/log.png" alt="" />
            <svg
              t="1617111423494"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1567"
              width="20"
              height="12"
            >
              <path
                d="M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z"
                p-id="1568"
                fill="#000000"
              ></path>
            </svg>
            <span @click="loginpage">登录</span>
          </div>
          <div class="me" v-if="this.$store.getters.GETme != null">
            <img :src="this.$store.getters.GETme.headImg" alt="" />
            <div class="hide">
              <span @click="goprofile">我的订单</span>
              <span @click="goprofile">基本信息</span>

              <span
                v-if="this.$store.getters.GETme.lv == 'administrator'"
                @click="goadmin"
                >控制台</span
              >
              <span @click="exitlog">退出</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import io from "socket.io-client";
import socket from "./socket";
import axios from "axios";

export default {
  beforeDestroy() {
    socket.emit("disconnect");
  },
  beforeMount() {
    //检测是否本地保存有登录的用户
    this.setlocalUser();
  },
  mounted() {
    //与服务器建立socketio连接,socket从socketio.js文件引入了
    socket.on("connect", function () {
      console.log("与服务器建立起socket连接");
    });

    // this.getmovies();
    this.getallmovies();
  },
  components: {},
  data() {
    return {
      isloginpage: false, //登录页面是否打开
      name: this.$store.getters.GETname,
      islogin: false, //表示当前登录状态
      userlist: [], //所有用户
      searchmname: "", //想要搜索的电影名
      movielist: [], //所有电影
      mnamelist: [], //所有电影的名字
    };
  },
  methods: {
    //获取所有用户
    async getusers() {
      let apiurl = this.$store.getters.GETapihttp + "user/list";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.userlist = res.data;
      // console.log(this.userlist);
    },
    //设置本地登录用户
    setlocalUser() {
      if (typeof sessionStorage.getItem("me") == "string") {
        // 调用JSON.parse()方法将字符串转换成json格式
        var loguser = JSON.parse(sessionStorage.getItem("me") || "[]");
      }
      if (loguser) {
        this.islogin = true;
        this.me = loguser;
        // console.log(this.me);
        this.$store.commit("setme", loguser);
      }
    },
    //获取所有的电影,以及电影名字列表
    async getallmovies() {
      let apiurl = this.$store.getters.GETapihttp + "movie/list";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.movielist = res.data;
      this.movielist.forEach((item, index) => {
        this.mnamelist[index] = item.mname;
      });
      // console.log(this.mnamelist);
    },
    //回到首页
    gohome() {
      this.$router.push("/");
    },
    //前往登录页面
    loginpage() {
      this.$router.push("/loginpage");
    },
    //退出登录
    exitlog() {
      this.$store.commit("setme", null);
      sessionStorage.setItem("me", null);
      socket.emit("disconnect");
      this.gohome();
    },

    //根据用户名查询用户
    async userByusername(username) {
      let apiurl = this.$store.getters.GETapihttp + "user/queryByName";
      let res = await axios.get(apiurl, {
        header: {},
        method: "GET",
        params: {
          userName: username,
        },
      });
      // console.log(res.data);
      return res.data;
    },

    //前往电影详情页面,不过是搜索框调用，并且要判断是否有这部电影
    goonemovie(mname) {
      var key = 0;
      this.mnamelist.forEach((item) => {
        if (item.indexOf(mname) != -1) {
          mname = item;
          key = 1;
        }
      });

      if (key == 0) {
        alert("没有找到这部电影");
      } else {
        // console.log(mname);
        this.$router.push({
          path: "onemovie",
          query: {
            mname: mname,
          },
        });
        this.searchmname = "";
      }
    },

    //前往个人详情页面，包括订单信息与个人信息
    goprofile() {
      this.$router.push({
        path: "profile",
        query: {
          userid: this.$store.getters.GETme.userId,
        },
      });
    },
    //前往管理员控制台界面，只有管理员能进
    goadmin() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style lang="less">
// @themecol: rgb(239, 66, 56);
@themecol: rgb(15, 189, 229);
html {
  cursor: url("./img/cur.png"), default;
  font-size: 12px;
}
@media screen and (max-width: 1200px) {
  html {
    font-size: 12px;
  }
}
@media screen and (max-width: 800px) {
  html {
    font-size: 7px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.w {
  width: 100rem;
  margin: 0 auto;
}
#app {
  margin: 0 auto;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration-line: none;
}
.confirm {
  background-color: #fff;
  width: 30rem;
  padding: 2rem;
  padding: 2rem;
  .co_content {
    line-height: 2rem;
    font-size: 1.5rem;
    width: 100%;
    min-height: 8rem;
  }
  .co_co {
    height: 5rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .co_yes,
    .co_no {
      border-radius: 5px;
      width: 8rem;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.5rem;
      color: #fff;
      text-align: center;
      background-color: rgb(15, 189, 229);
    }
    .co_yes:hover,
    .co_no:hover {
      background-color: rgb(92, 203, 228);
    }
  }
}
.alert {
  background-color: #fff;
  width: 30rem;
  padding: 2rem;
  .al_content {
    line-height: 2rem;
    font-size: 1.5rem;
    width: 100%;
    min-height: 8rem;
  }
  .al_al {
    height: 5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .al_yes {
      border-radius: 5px;
      width: 8rem;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.5rem;
      color: #fff;
      text-align: center;
      background-color: rgb(15, 189, 229);
    }
    .al_yes:hover {
      background-color: rgb(81, 206, 235);
    }
  }
}
// 全屏遮罩
.allzhezhao {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.nav {
  width: 100%;
  min-width: 100rem;
  height: 7rem;
  border-bottom: solid 1px rgb(227, 227, 227);
  text-align: center;
  line-height: 7rem;
}
.nav_c {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100rem;
  height: 7rem;
}
.logo,
.address,
.router,
.download,
.search,
.log {
  position: relative;
  height: 7rem;
}
.logo {
  cursor: pointer;
  width: 10%;

  img {
    position: relative;
    top: 1.3rem;
    height: 50%;
    width: 100%;
  }
}
.address {
  width: 8%;
  cursor: pointer;
  display: flex;

  .city {
    line-height: 7rem;
    position: relative;
    width: 50%;
    left: 10%;
    font-weight: 100;
    font-size: 1.4rem;
  }
  .sanjiao {
    position: relative;
    height: 7rem;
    line-height: 7rem;
    width: 30%;
  }
}
.address .sanjiao svg {
  transition: 0.3s;
}
.address:hover .sanjiao svg {
  transform: rotate(-180deg);
}
.router {
  width: 47%;
  height: 7rem;
  display: flex;
  justify-content: space-around;
}
.router_item {
  color: black;
  height: 7rem;
  line-height: 7rem;
  font-size: 1.5rem;
  align-content: center;
  width: 14%;
}
.router_item:hover {
  color: @themecol;
}
.router_item.router-link-exact-active {
  background-color: @themecol;
  color: #fff;
}

.download {
  width: 10%;
  line-height: 7rem;
  font-size: 1.5rem;
  display: flex;
  text-align: center;
  overflow: hidden;
  .sanjiao,
  .phoneicon {
    position: relative;
    height: 7rem;
    line-height: 7rem;
    width: 20%;
  }
}
.download .sanjiao svg {
  transition: 0.3s;
}
.download:hover {
  z-index: 1;
  height: 20rem;
  background-color: #fff;
  border: 1px solid rgb(227, 227, 227);
}
.download:hover .sanjiao svg {
  transform: rotate(-180deg);
}
.d_bottom {
  position: absolute;
  width: 100%;
  top: 7rem;
  height: 15rem;
}
.d_bottom img {
  position: relative;
  top: 2rem;
  width: 80%;
}
.d_bottom span {
  display: block;
  height: 2rem;
  width: 100%;
  line-height: 2rem;
  font-size: 1rem;
  color: rgb(163, 163, 163);
}
.search {
  width: 16%;
}
.search_input {
  position: relative;
  top: 1.5rem;
  height: 4rem;
  width: 100%;
  border: 1px solid rgb(163, 163, 163);
  background-color: rgb(250, 248, 250);
  border-radius: 2rem;
  input {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 70%;
    font-size: 1.5rem;
    outline: none;
    border: none;
  }
  img {
    position: absolute;
    right: 0;
    top: 0;
    height: 4rem;
    width: 4rem;
    border-radius: 2rem;
    background-color: rgb(15, 189, 229);
  }
}

.log {
  width: 9%;
  overflow: hidden;
  img {
    position: relative;
    height: 4rem;
    top: 1.5rem;
  }
}
.log:hover {
  height: 10rem;
  background-color: #fff;
  border: 1px solid rgb(227, 227, 227);
  z-index: 1;
}
.log:hover .sanjiao svg {
  transform: rotate(-180deg);
}
.log span {
  display: block;
  position: absolute;
  top: 5rem;
  left: 30%;
  font-size: 1.4rem;
  cursor: pointer;
}
.me {
  position: relative;
  width: 9%;
  overflow: hidden;
  img {
    position: relative;
    height: 4rem;
    width: 4rem;
    top: 1.5rem;
    border-radius: 2rem;
    overflow: hidden;
  }
}
.me:hover {
  height: 20rem;
  background-color: #fff;
  border: 1px solid rgb(227, 227, 227);
  z-index: 1;
}
.me .hide {
  position: absolute;
  display: flex;
  top: 7rem;
  width: 100%;
  font-size: 1.4rem;
  flex-direction: column;
  span {
    width: 100%;
    display: block;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    cursor: pointer;
    font-size: 1.2rem;
  }
}
</style>
