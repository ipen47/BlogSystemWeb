import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登录",
    component: () =>
      import(/*webpackChunkName:"course"*/ "../views/login/Login.vue"),
  },
  {
    path: "/error",
    name: "token校验失败",
    component: () =>
      import(/*webpackChunkName:"course"*/ "../views/Error/Error.vue"),
  },
  {
    path: "*",
    name: "页面找不到",
    component: () => import(/*webpackChunkName:"course"*/ "../views/404.vue"),
  },
  {
    path: "/regist",
    name: "注册",
    component: () =>
      import(/*webpackChunkName:"course"*/ "../views/login/Regist.vue"),
  },
  {
    path: "/",
    redirect: "/index",
    component: () =>
      import(/*webpackChunkName:"course"*/ "../views/LayoutView.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/index",
        name: "首页",

        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/Index.vue"),
      },
      //用户管理
      {
        path: "/user",
        name: "用户管理",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/user/User.vue"),
        meta: {
          title: "用户管理",
        },
      },
      //系统管理
      {
        path: "/system",
        name: "系统管理",
        meta: {
          title: "系统管理",
        },
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/System/Index.vue"),
        children: [
          {
            path: "role",
            name: "角色管理",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/System/Character.vue"
              ),
            meta: {
              title: "角色管理",
            },
          },
          {
            path: "auth",
            name: "权限管理",
            component: () =>
              import(/*webpackChunkName:"course"*/ "../views/System/Auth.vue"),
            meta: {
              title: "权限管理",
            },
          },
          {
            path: "menu",
            name: "菜单管理",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/System/MenuList.vue"
              ),
            meta: {
              title: "菜单管理",
            },
          },
        ],
      },
      //商品模块
      {
        path: "/shop",
        name: "商品列表",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/Shop/Index.vue"),
        meta: {
          title: "商品管理",
        },
        children: [
          {
            path: "list",
            name: "商品列表",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/Shop/shopList.vue"
              ),
            meta: {
              title: "商品列表",
            },
          },
          {
            path: "add",
            name: "添加商品",
            component: () =>
              import(/*webpackChunkName:"course"*/ "../views/Shop/shopAdd.vue"),
            meta: {
              title: "添加商品",
            },
          },
        ],
      },

      //订单管理
      {
        path: "/order",
        name: "订单列表",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/order/Index.vue"),
        meta: {
          title: "订单管理",
        },
        children: [
          {
            path: "list",
            name: "订单列表",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/order/OrderList.vue"
              ),
            meta: {
              title: "订单列表",
            },
          },
        ],
      },

      //统计
      {
        path: "/statistic",
        name: "统计",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/statistic/Index.vue"),
        meta: {
          title: "统计",
        },
        children: [
          {
            path: "line",
            name: "折线图",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/statistic/Line.vue"
              ),
            meta: {
              title: "折线图",
            },
          },
          {
            path: "bar",
            name: "柱形图",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/statistic/Bar.vue"
              ),
            meta: {
              title: "柱形图",
            },
          },
          {
            path: "pie",
            name: "饼图",
            component: () =>
              import(
                /*webpackChunkName:"course"*/ "../views/statistic/Pie.vue"
              ),
            meta: {
              title: "饼图",
            },
          },
        ],
      },

      //大屏
      {
        path: "/screen",
        name: "大屏",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/大屏/Screen.vue"),
        meta: {
          title: "数据大屏",
        },
      },
      //地图
      {
        path: "/map",
        name: "地图管理",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/Map/Index.vue"),
        meta: {
          title: "地图管理",
        },
        children: [
          {
            path: "baidu",
            name: "百度地图",
            component: () =>
              import(/*webpackChunkName:"course"*/ "../views/Map/baiduMap.vue"),
            meta: {
              title: "百度地图",
            },
          },
          {
            path: "gaode",
            name: "高德地图",
            component: () =>
              import(/*webpackChunkName:"course"*/ "../views/Map/gaodeMap.vue"),
            meta: {
              title: "高德地图",
            },
          },
        ],
      },
      //文章笔记
      {
        path: "/text",
        name: "我的笔记",
        component: () =>
          import(/*webpackChunkName:"course"*/ "../views/article/MyText.vue"),
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
// 导航守卫
router.beforeEach((to, from, next) => {
  let admin = JSON.parse(window.localStorage.getItem("access-admin"));
  if (admin != null) {
    next();
  } else if (to.path === "/login" || to.path === "/regist") {
    next();
  } else {
    next("/login");
  }
});
export default router;
