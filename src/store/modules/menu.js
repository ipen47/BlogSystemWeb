import router from "@/router/index";
import { createMenu } from "@/api/menu";
const menu = {
  namespaced: true,
  state: {
    menuTree: [],
  },
  getters: {},
  mutations: {
    SET_MENU(state, data) {
      state.menuTree = data;
    },
  },
  actions: {
    async loadMenu({ commit }, RoleId) {
      let res = await createMenu({ roleId: RoleId });
      if (res) {
        commit("SET_MENU", res.data);
        addDynamicRoutes(res.data);
      }
    },
  },
};
// 动态路由生成
function generateAsyncRoutes(menuTree) {
  //设置路由数据
  return menuTree.map((menu) => {
    let route = {
      path: menu.path,
      name: menu.menuName,
      component: () => import(`@/views/${menu.component}.vue`),
      meta: { title: menu.menuName },
      children: [],
    };
    if (menu.children && menu.children.length > 0) {
      route.children = generateAsyncRoutes(menu.children);
    }
    return route;
  });
}
//添加动态路由
function addDynamicRoutes(menuData) {
  console.log("Routes", router.getRoutes());
  const asyncRoutes = generateAsyncRoutes(menuData);
  console.log("asyncRoutes", asyncRoutes);
  asyncRoutes.forEach((route) => router.addRoute("root", route));
  console.log("success");
}
export default menu;
