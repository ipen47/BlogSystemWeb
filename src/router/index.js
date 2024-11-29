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
  // 默认跳转到首页
  {
    path: "/",
    redirect: "/index",
    name: "root",
    component: () => import("@/views/LayoutView.vue"),
    meta: {
      title: "首页",
    },
    children: [], // 动态路由将挂载到这里
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
