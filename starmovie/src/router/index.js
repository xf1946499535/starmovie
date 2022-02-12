import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    //登录界面
    path: '/loginpage',
    name: 'loginpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/loginpage.vue')
  },
  {
    //注册
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    //榜单
    path: '/billboard',
    name: 'billboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/billboard.vue')
  },
  { //影院
    path: '/cinema',
    name: 'cinema',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/cinema.vue')
  },
  { //热点
    path: '/hotnews',
    name: 'hotnews',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/hotnews.vue')
  },
  { //电影
    path: '/moviepage',
    name: 'moviepage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/moviepage.vue')
  },
  { //商城
    path: '/shoppingmall',
    name: 'shoppingmall',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/shoppingmall.vue')
  },
  { //演出
    path: '/show',
    name: 'show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/show.vue')
  },
  { //单个电影信息页面
    path: '/onemovie',
    name: 'onemovie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/onemovie.vue'),
    props: function (route) {
      return {
        mname: route.query.mname
      }
    }
  },
  { //购票选场次界面
    path: '/buyticket',
    name: 'buyticket',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/buyticket.vue'),
    props: function (route) {
      return {
        mname: route.query.mname
      }
    }
  },
  { //选择座位界面
    path: '/chooseseat',
    name: 'chooseseat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/chooseseat.vue'),
    props: function (route) {
      return {
        sessionid: route.query.sessionid,
        mname: route.query.mname
      }
    }
  },
  { //个人详情页面
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/profile.vue'),
    props: function (route) {
      return {
        userid: route.query.userid
      }
    }
  },
  { //单个商品页面
    path: '/oneproduct',
    name: 'oneproduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/oneproduct.vue'),
    props: function (route) {
      return {
        goodId: route.query.goodId
      }
    }
  },
  { //管理员主页
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../ct_views/admin.vue'),
  },
  { //电影管理界面
    path: '/ctmovies',
    name: 'ctmovies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../ct_views/ctmovies.vue'),
  },
  { //场次管理界面
    path: '/ctsessions',
    name: 'ctsessions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../ct_views/ctsessions.vue'),
  },
  { //影厅管理界面
    path: '/ctcinema',
    name: 'ctcinema',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../ct_views/ctcinema.vue'),
  },
  { //点击链接去购物车界面
    path: '/profile',
    name: 'gotogwc',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/profile.vue'),
    props: function (route) {
      return {
        choosenum: route.query.choosenum
      }
    }
  },
  { //点击链接去购物车界面
    path: '/profile',
    name: 'gotoorder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/profile.vue'),
    props: function (route) {
      return {
        choosenum: route.query.choosenum
      }
    }
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router