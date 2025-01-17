import { getInfo } from "@/api/getUserData";
import { getToken } from "@/utils/storage";
const user = {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: "",
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },

  actions: {
    async GetInfo({ commit }, userId) {
      let res = await getInfo({ id: userId });
      commit("SET_USER_INFO", res.data);
    },
  },
};
export default user;
