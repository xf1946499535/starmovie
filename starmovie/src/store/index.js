import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    apihttp: "http://121.40.251.226:8001/", //springboot后端api
    apihttp2: "http://139.155.247.54:3000/", //nodejs后端api
    me: null //表示现在登录的用户
  },
  getters: {
    //获取springboot服务端api
    GETapihttp(state) {
      return state.apihttp
    },
    //获取nodejs服务端api
    GETapihttp2(state) {
      return state.apihttp2
    },
    //获取当前登录用户
    GETme(state) {
      return state.me
    },
  },
  mutations: {
    //设置当前登录用户
    setme(state, me) {
      state.me = me
    }
  },
  actions: {},
  modules: {}
})