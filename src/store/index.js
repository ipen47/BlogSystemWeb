import Vue from "vue";
import Vuex from "vuex";
import menu from "@/store/modules/menu";
import user from "@/store/modules/user";
import { removeAdminInfo } from "@/utils/storage";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: { menu, user },
  getters: {
    token(state) {
      return state.user.token;
    },
    userId(state) {
      return state.user.userInfo.userId;
    },
    roleId(state) {
      return state.user.userInfo.roleId;
    },
  },
  actions: {
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeAdminInfo();
        commit("user/SET_USER_INFO", "");
        commit("user/SET_ROLE_ID", "");
        commit("menu/SET_MENU", []);
        resolve("ok");
      });
    },
  },
});
