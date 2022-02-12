<template>
  <div class="moviepage">
    <div class="w">
      <div class="choose">
        <div class="bytype">
          <span class="type1">类型:</span>
          <div class="typebox">
            <div
              v-for="(item, index) in typelist"
              class="chooseitem"
              @click.prevent="choosetype(item)"
              :key="'typelist' + index"
              :class="{ nowchoose: ischoosed == item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="moviewall">
        <div class="movies">
          <div
            class="onemovie"
            @click="goonemovie(item.mname)"
            v-for="(item, index) in movies"
            :key="'movies' + index"
          >
            <div class="moviemsg">
              <img :src="item.picPath" alt="" />
              <div class="moviename">{{ item.mname }}</div>
            </div>
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
    });
  },
  mounted() {
    this.getallmovies();
  },
  data() {
    return {
      typelist: ["全部", "动作", "岛屿", "爱情", "科幻", "战争"], //可选择的电影类型
      ischoosed: "全部", //记录当前被选择的电影类型,默认是全部
      movies: [],
    };
  },
  methods: {
    //获取所有电影
    async getallmovies() {
      let apiurl = this.$store.getters.GETapihttp + "movie/list";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.movies = res.data;
    },
    //根据类型获取电影
    async choosetype(type) {
      this.ischoosed = type;
      if (type == "全部") {
        this.getallmovies();
      } else {
        let apiurl = this.$store.getters.GETapihttp + "movie/ByType";
        let res = await axios.get(apiurl, {
          method: "GET",
          params: {
            type: type,
          },
        });
        this.movies = res.data;
      }
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

<style lang="less" scoped>
.moviepage {
  margin: 2rem auto;
  width: 100%;
}
.choose {
  width: 100%;
  border: 1px solid rgba(158, 155, 155, 0.2);
}
.bytype {
  margin: 1rem;
  width: 100%;
  display: flex;
}
.type1 {
  width: 5%;
  text-align: center;
  font-size: 1rem;
  color: rgba(163, 162, 162, 0.8);
}
.typebox {
  width: 95%;
  display: flex;
}
.typebox .chooseitem {
  width: 5rem;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 1.5rem;
  border-radius: 1rem;
}
.chooseitem:hover {
  color: rgb(239, 66, 56);
}
.nowchoose {
  background-color: rgb(239, 66, 56);
  color: #fff;
}
.nowchoose:hover {
  color: #fff;
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
  flex-wrap: wrap;
}
.onemovie {
  width: 13rem;
  height: 21rem;
  margin: 2rem 1rem;
}

.moviemsg {
  position: relative;
  width: 100%;
  height: 18rem;
  img {
    width: 100%;
    height: 18rem;
    cursor: pointer;
  }
  img:hover {
    width: 100%;
    height: 18rem;
    cursor: pointer;
    transform: scale(1.2);
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
</style>