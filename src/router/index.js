import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//静态基础路由
const constantRoutes = [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/error",
    name: "token校验失败",
    component: () => import("@/views/Error/Error.vue"),
  },
  {
    path: "*",
    name: "页面找不到",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/regist",
    name: "注册",
    component: () => import("@/views/login/Regist.vue"),
  },
  // 默认跳转到前台首页
  {
    path: "/",
    redirect: "/index",
    name: "前台",
    component: () => import("@/views/FrontView/FrontLayout"),
    children: [
      {
        path: "/index",
        name: "首页",
        component: () => import("@/views/FrontView/IndexView/Index"),
      },
      {
        path: "/articleCategory",
        name: "文章分类",
        component: () => import("@/views/FrontView/ArticleCategory"),
      },
      {
        path: "/questionSub",
        name: "意见反馈",
        component: () => import("@/views/FrontView/FeedbackSub"),
      },
      {
        path: "SysNotice",
        name: "系统公告",
        component: () => import("@/views/FrontView/SysNotice"),
      },
      {
        path: "/myFeedback",
        name: "我的反馈",
        component: () => import("@/views/FrontView/MyFeedback.vue"),
      },
      {
        path: "/news",
        name: "新闻资讯",
        component: () => import("@/views/FrontView/News"),
      },
      {
        path: "/peopleCenter",
        name: "个人中心",
        component: () => import("@/views/FrontView/UserCenter"),
      },
    ],
  },
  {
    name: "发布文章",
    path: "/edit",
    component: () => import("@/views/FrontView/IndexView/EditArticle"),
  },
  {
    name: "文章详情",
    path: "/detail",
    component: () => import("@/views/FrontView/IndexView/ArticleDetail"),
  },

  {
    path: "/home",
    redirect: "/vip/index",
    name: "root",
    component: () => import("@/views/LayoutView.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/userCenter",
        name: "个人中心",
        component: () => import("@/views/UserCenter.vue"),
        meta: {
          title: "个人中心",
        },
      },
    ], // 动态路由将挂载到这里
  },
];
//解决重复触发了同一个路由。
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes,
});
export default router;
