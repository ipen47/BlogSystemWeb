import router from "@/router/index";
import store from "@/store";
let whitelist = ["/login", "/regist", "/error", "/", "/index"];
import { Message } from "element-ui";
// 导航守卫
router.beforeEach(async (to, from, next) => {
  console.log("来自哪里：", from.path);
  console.log("去往何方：", to.path);
  let admin = JSON.parse(window.localStorage.getItem("access-admin"));
  console.log("admin:", admin);
  if (admin) {
    //已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (!store.state.user.roleId) {
        //获取用户信息
        console.log("没有用户信息");
        await store.dispatch("user/GetInfo", admin.id);
        console.log(store.state.user.roleId);
        //动态生成菜单路由
        await store.dispatch("menu/loadMenu", store.state.user.roleId);
        console.log(" router.getRoutes();", router.getRoutes());
        next(to.path);
        // }
      } else {
        console.log("else");
        next(); // 动态路由已加载，直接继续导航
      }
    }
  } else {
    // 未登录用户
    if (whitelist.indexOf(to.path) !== -1) {
      // 允许访问首页、登录和注册页面
      next();
    } else {
      Message("请先登录！");
      next("/login");
    }
  }
});
