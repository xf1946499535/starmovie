<template>
  <div class="home">
    <div class="w">
      <div class="left">
        <div class="moviewall">
          <div class="wall_head">
            <span class="wall_text">正在热映(20部)</span>
            <div class="gomoviepage">全部></div>
          </div>
          <div class="movies">
            <div
              class="onemovie"
              v-for="(item, index) in hotmovies"
              :key="'hotmovies' + index"
            >
              <div class="moviemsg" @click="goonemovie(item.mname)">
                <img :src="item.picPath" alt="" />
                <div class="moviename">{{ item.mname }}</div>
              </div>
              <div class="ticketbtn" @click="goonemovie(item.mname)">购票</div>
            </div>
          </div>
        </div>
        <div class="moviewall">
          <div class="wall_head">
            <span class="wall_text">即将上映(20部)</span>
            <div class="gomoviepage">全部></div>
          </div>
          <div class="movies">
            <div
              class="onemovie"
              v-for="(item, index) in soonmovies"
              :key="'soonmovies' + index"
            >
              <div class="moviemsg" @click="goonemovie(item.mname)">
                <img :src="item.picPath" alt="" />
                <div class="moviename">{{ item.mname }}</div>
              </div>
              <div class="ticketbtn" @click="goonemovie(item.mname)">购票</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="movielist">
          <div class="listhead">今日票房</div>
          <div
            class="list_item"
            @click="goonemovie(item.mname)"
            :class="{ list_item_1: index == 0 }"
            v-for="(item, index) in top5movies"
            :key="'top5' + index"
          >
            <img v-if="index == 0" :src="item.picPath" alt="" />
            <div v-if="index != 0" class="item_index">{{ index + 1 }}</div>
            <div class="item_moviename">{{ item.mname }}</div>
            <div class="item_clickcount">{{ item.click }}万</div>
          </div>
        </div>
        <div class="movielist">
          <div class="listhead">最受期待</div>
          <div
            class="list_item"
            @click="goonemovie(item.mname)"
            :class="{ list_item_1: index == 0 }"
            v-for="(item, index) in top10movies"
            :key="'top5' + index"
          >
            <img v-if="index == 0" :src="item.picPath" alt="" />
            <div v-if="index != 0" class="item_index">{{ index + 1 }}</div>
            <div class="item_moviename">{{ item.mname }}</div>
            <div class="item_clickcount">{{ item.click }}万人想看</div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-image">
      <div class="block" v-for="fit in fits" :key="fit">
        <span class="demonstration">{{ fit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  mounted() {
    this.gethotmovies();
    this.getsoonmovies();
    this.gettop5movies();
    this.gettop10movies();
  },
  //登录检测
  beforeRouteLeave(to, from, next) {
    if (this.$store.getters.GETme || to.path == "/loginpage") {
      // console.log(this.$store.getters.GETme);
      next();
    } else {
      this.$router.push("/loginpage");
    }
  },

  data() {
    return {
      name: this.$store.getters.GETname,
      hotmovies: [],
      soonmovies: [],
      top5movies: [],
      top10movies: [],
    };
  },
  methods: {
    //获取id前8电影
    async gethotmovies() {
      let apiurl = this.$store.getters.GETapihttp + "movie/idTop8";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.hotmovies = res.data;
    },
    async getsoonmovies() {
      //获取id后8电影
      let apiurl = this.$store.getters.GETapihttp + "movie/idBottom8";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.soonmovies = res.data;
    },
    async gettop5movies() {
      //获取click前5电影
      let apiurl = this.$store.getters.GETapihttp + "movie/Top5";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.top5movies = res.data;
    },
    async gettop10movies() {
      //获取click前10电影
      let apiurl = this.$store.getters.GETapihttp + "movie/Top10";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.top10movies = res.data;
    },

    goonemovie(mname) {
      //前往电影详情页面
      this.$router.push({
        path: "onemovie",
        query: {
          mname: mname,
        },
      });
    },
  },
};
</script>

<style lang="less" scope>
.home {
  width: 100%;
}
.home .w {
  display: flex;
  justify-content: space-between;
}
.left {
  position: relative;
  width: 60%;
}
.moviewall {
  position: relative;
  width: 100%;
  height: 50rem;
  margin-top: 2rem;
}
.wall_head {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  .wall_text {
    height: 2rem;
    font-size: 2rem;
    line-height: 2rem;
    color: rgb(15, 189, 229);
  }
  .gomoviepage {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.2rem;
    color: rgb(15, 189, 229);
    cursor: pointer;
  }
}
.movies {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.onemovie {
  width: 22%;
  height: 21rem;
  margin-top: 2rem;
}
.moviemsg {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 18rem;
  img {
    width: 100%;
    height: 18rem;
  }
  .moviename {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    z-index: 1;
    left: 1rem;
  }
}
.ticketbtn {
  width: 100%;
  height: 3rem;
  background-color: #fff;
  line-height: 3rem;
  color: rgb(15, 189, 229);
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(139, 138, 138, 0.2);
}
.ticketbtn:hover {
  background-color: rgb(15, 189, 229);
  color: #fff;
}

.right {
  position: relative;
  width: 30%;
}
.movielist {
  margin-top: 2rem;
  width: 100%;
  position: relative;
}
.listhead {
  margin-bottom: 2rem;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 2rem;
  color: rgb(15, 189, 229);
}
.list_item {
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  display: flex;
  .item_index {
    color: rgb(15, 189, 229);
    font-size: 1.5rem;
    font-style: italic;
    margin-right: 2rem;
  }
  .item_moviename {
    font-size: 1.5rem;
    font-weight: 100;
  }
  .item_clickcount {
    position: absolute;
    right: 0;
    font-size: 1.2rem;
    color: rgb(239, 66, 56);
  }
}
.list_item:hover {
  border-radius: 5px;
  background: rgba(148, 217, 219, 0.3);
}
.list_item_1 {
  position: relative;
  display: flex;
  height: 6rem;
  img {
    width: 8rem;
    height: 6rem;
  }
  .item_moviename {
    position: absolute;
    left: 9rem;
    height: 3rem;
  }
  .item_clickcount {
    position: absolute;
    left: 9rem;
    top: 3rem;
    height: 3rem;
  }
}
</style>
