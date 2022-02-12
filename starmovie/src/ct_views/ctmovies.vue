<template>
  <div class="ctmovies">
    <div class="w">
      <div class="addmovie">
        <div class="addone">
          <span>电影名:</span><input type="text" v-model="newmovie.mName" />
        </div>
        <div class="addone">
          <span>海报url:</span><input type="text" v-model="newmovie.picPath" />
        </div>
        <div class="addone">
          <span>播放路径:</span
          ><input type="text" v-model="newmovie.playPath" />
        </div>
        <div class="addone">
          <span>总时长:</span><input type="text" v-model="newmovie.totalTime" />
        </div>
        <div class="addone">
          <span>电影简介:</span
          ><input type="text" v-model="newmovie.describe" />
        </div>
        <div class="addone">
          <span>类型:</span><input type="text" v-model="newmovie.type" />
        </div>
        <div class="addone">
          <span>上映时间:</span><input type="date" v-model="newmovie.data" />
        </div>
        <div class="addone">
          <span>价格:</span><input type="text" v-model="newmovie.price" />
        </div>
        <div class="addone">
          <span>上映地点:</span
          ><input type="text" v-model="newmovie.shLocation" list="shLocation" />
          <datalist id="shLocation">
            <option>中国大陆</option>
            <option>中国香港</option>
            <option>中国台湾</option>
            <option>中国澳门</option>
          </datalist>
        </div>
        <div class="addone">
          <span>放映类型:</span>
          <input type="text" v-model="newmovie.category" list="category" />
          <datalist id="category">
            <option>中文2D</option>
            <option>中文3D</option>
            <option>英文2D</option>
            <option>英文3D</option>
          </datalist>
        </div>
        <div class="submit" @click="submitmovie">提交电影</div>
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
  data() {
    return {
      newmovie: {
        mName: null,
        picPath: null,
        playPath: null,
        totalTime: null,
        describe: null,
        type: null,
        data: null,
        price: null,
        shLocation: null,
        category: null,
      },
    };
  },

  methods: {
    //提交电影
    submitmovie() {
      let check = true;
      for (const key in this.newmovie) {
        if (this.newmovie[key] == null || this.newmovie[key] == "") {
          alert("请完善电影基础数据");
          check = false;
          break;
        }
      }
      console.log(this.newmovie.data);
      if (check == true) {
        let apiurl = this.$store.getters.GETapihttp + "movie/add";

        let res = axios.get(apiurl, {
          method: "GET",
          params: this.newmovie,
        });
        console.log("上传成功");
      }
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
</style>