import { getInfo } from "@/api/getUserData";
const user = {
  namespaced: true,
  state: {
    token: "",
    userInfo: "",
    roleId: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLE_ID: (state, roleId) => {
      state.roleId = roleId;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },

  actions: {
    async GetInfo({ commit }, userId) {
      await getInfo({ id: userId })
        .then((res) => {
          commit("SET_ROLE_ID", res.data.roleId);
          commit("SET_USER_INFO", res.data);
        })
        .catch((error) => {});
    },
  },
};
export default user;
