<template>
  <div class="admin">
    <div class="w">
      <div class="ct">
        <div class="ct_item ct_movies" @click="gotoct('/ctmovies')">
          电影管理
        </div>
        <div class="ct_item ct_sessions" @click="gotoct('/ctsessions')">
          场次后台
        </div>
        <div class="ct_item ct_cinema" @click="gotoct('/ctcinema')">
          影院放映厅
        </div>
        <div class="ct_item ct_users">用户系统</div>
        <div class="ct_item ct_shoppingmall">商城系统</div>
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
      ct_log.admincheck(vm, next);
    });
  },
  methods: {
    //前往电影管理界面
    gotoct(cturl) {
      this.$router.push(cturl);
    },
  },
};
</script>
<style lang="less" scoped>
.w {
  margin-top: 2rem;
}
.ct {
  position: relative;
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .ct_item {
    text-align: center;
    height: 20rem;
    line-height: 20rem;
    width: 15rem;
    font-size: 1.5rem;
    color: #fff;
    background-color: rgb(15, 189, 229);
    transition: 0.5s;
    cursor: pointer;
  }
  .ct_item:hover {
    transform: scale(1.2);
    background-color: rgb(56, 199, 231);
  }
}
</style>