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
      await getInfo({ id: userId })
        .then((res) => {
          commit("SET_USER_INFO", res.data);
        })
        .catch((error) => {});
    },
  },
};
export default user;
