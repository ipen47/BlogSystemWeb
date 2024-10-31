import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login.vue";
import Regiist from "../views/login/Regist.vue";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import User from "../views/user/User.vue";
import Character from "../views/Auth/Character.vue";
import Auth from "../views/Auth/Auth.vue";
import Menu from "../views/Menu.vue";
import OrderList from "../views/order/OrderList.vue";
import AddProduct from "../views/product/AddProduct.vue";
import Product from "../views/product/Product.vue";
import Line from "../views/statistic/Line.vue";
import Bar from "../views/statistic/Bar.vue";
import Pie from "../views/statistic/Pie.vue";
import Screen from "../components/大屏/Screen.vue";
import baiduMap from "../views/Map/baiduMap.vue";
import gaodeMap from "../views/Map/gaodeMap.vue";
import MyText from "../views/MyText.vue";
import Error from "../views/login/Error.vue";
import E404 from "../views/404.vue";
import axios from "axios";
import {checkToken} from "@/api/login"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "登录",
    component: Login,
  },
  {
    path: "/error",
    name: "token校验失败",
    component: Error,
  },
  {
    path: "/404",
    name: "token校验失败",
    component: E404,
  },
  {
    path: "/regist",
    name: "注册",
    component: Regiist,
  },
  {
    path: "/home",
    redirect: "/welcome",
    name: "登录成功",
    meta: {
      title: "首页",
    },
    component: Home,
    children: [
      {
        path: "/welcome",
        name: "欢迎页",
        component: Welcome,
      },
      //用户管理
      {
        path: "/user",
        name: "用户管理",
        component: User,
        meta: {
          title: "用户管理",
        },
      },
      //权限管理
      {
        path: "/character",
        name: "角色管理",
        component: Character,
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "/auth",
        name: "权限管理",
        component: Auth,
        meta: {
          title: "权限管理",
        },
      },
      {
        path: "/menu",
        name: "菜单管理",
        component: Menu,
        meta: {
          title: "菜单管理",
        },
      },
      //商品模块
      {
        path: "/product",
        name: "商品管理",
        component: Product,
        meta: {
          title: "商品管理",
        },
      },
      {
        path: "/addProduct",
        name: "添加商品",
        component: AddProduct,
        meta: {
          title: "添加商品",
        },
      },
      //订单管理
      {
        path: "/orderList",
        name: "订单列表",
        component: OrderList,
        meta: {
          title: "订单列表",
        },
      },
      //统计
      {
        path: "/line",
        name: "折线图",
        component: Line,
        meta: {
          title: "折线图",
        },
      },
      {
        path: "/bar",
        name: "柱形图",
        component: Bar,
        meta: {
          title: "柱形图",
        },
      },
      {
        path: "/pie",
        name: "饼图",
        component: Pie,
        meta: {
          title: "饼图",
        },
      },
      //大屏
      {
        path: "/screen",
        name: "大屏",
        component: Screen,
        meta: {
          title: "数据大屏",
        },
      },
      //地图
      {
        path: "/baidu",
        name: "百度地图",
        component: baiduMap,
        meta: {
          title: "百度地图",
        },
      },
      {
        path: "/gaode",
        name: "高德地图",
        component: gaodeMap,
        meta: {
          title: "高德地图",
        },
      },
      {
        path: "/text",
        name: "我的笔记",
        component: MyText,
        meta: {
          title: "我的笔记",
        },
      },
    ],
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
  routes,
});
// 导航守卫;
router.beforeEach((to, from, next) => {
  //如果进入的页面不是登录界面
  if (to.path !== "/login") {

      // 检验token合法性
     checkToken().then((resp) => {
        if (resp.code == "-1") {
          // 校验失败
          console.log("校验失败");
          next("/error");
        }
      });

    } else if (to.path === "/regist") {
      next();
    } else {
      //不含有登录信息，则前往登录页进行登录
      next("/login");
    }
  } else {
    // 如果进入的是登录页，则通过并且清楚本地存储
    localStorage.removeItem("access-admin");
    next();
  }
});
export default router;
