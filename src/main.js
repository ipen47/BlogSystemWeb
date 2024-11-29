import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import BaiduMap from "vue-baidu-map";
import "./assets/icon"; // icon
import "./permission";
// 使用地图，填写ak
Vue.use(BaiduMap, { ak: "fIdl7zLwYZ2Nsb37peHZvmzy2bjPs8o1k" });
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
