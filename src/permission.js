import router from "@/router/index";
import store from "@/store";
import { getAdminInfo } from "@/utils/storage";
let whitelist = ["/login", "/regist", "/error", "/", "/index"];
import { Message } from "element-ui";
// 导航守卫
router.beforeEach(async (to, from, next) => {
  let admin = getAdminInfo();

  if (admin) {
    //已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (!store.getters.roleId) {
        //如果无用户信息则获取用户信息
        await store.dispatch("user/GetInfo", admin.userId);
        //动态生成菜单路由
        await store.dispatch("menu/loadMenu", store.getters.roleId);
        next(to.path);
        // }
      } else {
        next(); // 动态路由已加载，直接继续导航
      }
    }
  } else {
    // 未登录用户
    if (whitelist.indexOf(to.path) !== -1) {
      // 允许访问首页、登录和注册页面
      next();
    } else {
      Message.info("请先登录！");
    }
  }
});
