import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import menu from "@/store/modules/menu";
import user from "@/store/modules/user";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { menu, user },
  actions: {
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem("access-admin");
        commit("user/SET_TOKEN", "");
        commit("user/SET_USER_INFO", "");
        commit("user/SET_ROLE_ID", "");
        commit("menu/SET_MENU", []);
        resolve("ok");
      });
    },
  },
  // 方法：移除指定路由
});
