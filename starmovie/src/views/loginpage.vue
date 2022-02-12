<template>
  <div class="loginpage">
    <div class="left">
      <img class="img1" src="../img/mylogo.png" alt="" />
      <img
        class="img2"
        src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/maoyan.png"
        alt=""
      />
    </div>
    <div class="right" @keydown.enter="login(username, passwd)">
      <span>账号登录</span>
      <input
        id="i_username"
        class="i_username"
        type="text"
        v-model="username"
        placeholder="请输入您的用户名"
      />
      <input
        id="i_pwd"
        class="i_pwd"
        type="password"
        v-model="passwd"
        placeholder="请输入您的密码"
      />
      <span class="right_f">忘记密码?</span>
      <div class="loginbtn" @click="login(username, passwd)">登录</div>
      <div class="r_buttom">
        <div class="goregister" @click="goregister">注册账户</div>
        <div class="close" @click="gohome">放弃登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import axios from "axios";
export default {
  data() {
    return {
      username: "", //表示当前输入框输入的用户名
      passwd: "", //表示当前输入框输入的密码
    };
  },
  methods: {
    //登录,loginpage组件调用
    async login(username, passwd) {
      var storage = window.localStorage;
      let reluser = await this.userByusername(username);
      // console.log(reluser);
      if (username == reluser.userName && passwd == reluser.passwd) {
        this.$store.commit("setme", reluser);
        console.log("登陆成功");
        socket.emit("login", reluser);
        reluser = JSON.stringify(reluser);
        sessionStorage.setItem("me", reluser);
        this.$router.push("/");
      } else {
        alert("登陆失败");
      }         
      // console.log(this.$store.getters.GETme);
    },
    //根据用户名查询用户
    async userByusername(username) {
      let apiurl = this.$store.getters.GETapihttp + "user/queryByName";
      let res = await axios.get(apiurl, {
        method: "GET",
        params: {
          userName: username,
        },
      });
      // console.log(res.data);
      return res.data;
    },

    //前往注册页面
    goregister() {
      this.$router.push("/register");
    },

    //放弃登录，前往首页
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.loginpage {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 100rem;
  min-height: 50rem;
  height: 100vh;
  border-bottom: solid 1px rgb(0, 0, 0);

  justify-content: center;
}
.left {
  position: relative;
  top: 8rem;
  height: 30rem;
  width: 25%;

  right: 3rem;
  .img1 {
    position: absolute;
    top: -4rem;
    left: 0;
    width: 50%;
  }
  .img2 {
    width: 100%;
  }
}
.right {
  position: relative;
  top: 8rem;
  height: 30rem;
  width: 25%;
  left: 3rem;
  span {
    width: 100%;
    display: block;
    height: 2rem;
    margin-bottom: 1.5rem;
    line-height: 2rem;
    font-size: 1.2rem;
  }
  .i_username,
  .i_pwd {
    position: relative;
    display: block;
    height: 2rem;
    width: 65%;
    margin-bottom: 1.5rem;
  }
  .right_f {
    cursor: pointer;
    color: rgb(239, 66, 56);
    margin-bottom: 1.5rem;
  }
  .loginbtn {
    width: 65%;
    height: 2.2rem;
    background-color: rgb(15, 189, 229);
    text-align: center;
    line-height: 2.2rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #fff;
    cursor: pointer;
  }
  .loginbtn:hover {
    background-color: rgb(88, 208, 235);
  }
}
.r_buttom {
  width: 65%;
  height: 2.5rem;
  position: relative;
  display: flex;
  color: rgb(239, 66, 56);
  justify-content: space-between;
  // line-height: 2.5rem;
}
.goregister {
  width: 5rem;
  height: 2.5rem;
  cursor: pointer;
}
.close {
  cursor: pointer;
  width: 5rem;
  height: 2.5rem;
}
</style>
