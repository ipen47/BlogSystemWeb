//1.引入axios
import axios from "axios";
//单独引入ui组件
import { Message, Notification } from "element-ui";
import globalConfig from "@/utils/gloabl.config";
import router from "@/router";
//2.创建axios对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: "http://localhost:8888/",
  timeout: 6000,
});
//定义elementui通知组组件对象
let notificationInstance;
//3.请求拦截器==>前端给后端发送请求，还没有到后端,统一将token封装在请求头headers中
service.interceptors.request.use(
  (config) => {
    //设置token
    let whitelist = globalConfig.WhiteListApi; //白名单：不需要设置token的请求
    let url = config.url;
    let adminInfo = JSON.parse(window.localStorage.getItem("access-admin"));
    //如果请求不在白名单中且携带token,则在请求头设置token
    if (whitelist.indexOf(url) === -1 && adminInfo) {
      config.headers["token"] = adminInfo.token;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);
//4.响应拦截器==>后端给前端返回数据
service.interceptors.response.use(
  (response) => {
    let code = response.data.code || 200;
    let msg = response.data.msg || "未知错误";
    if (code === 401) {
      //token过期，无权限访问
      router.push("/error");
      Message.info("token已过期,请重新登录");

      return Promise.reject(new Error(msg));
    }
    if (code === -1 || code === -2 || code === 1) {
      // 使用 Notification 显示错误提示，并保存实例
      notificationInstance = Notification.error({
        title: "错误",
        message: msg,
        // duration: 0, // 设置为 0，表示不自动关闭
      });
      setTimeout(() => {
        notificationInstance.close();
      }, 2000); // 2秒后关闭通知
    }
    if (code === 200) {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(new Error(error.response.data));
  }
);
export default service;
