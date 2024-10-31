//1.引入axios
import axios from "axios";
import globalConfig from "@/utils/gloabl.config";
//2.创建axios对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: "http://localhost:8888/",
  timeout: 6000,
});
//3.请求拦截器==>前端给后端发送请求，还没有到后端,统一将token封装在请求头headers中
service.interceptors.request.use(
  (config) => {
    //设置token
    let whitelist = globalConfig.WhiteListApi; //白名单：不需要设置token的请求
    let url = config.url;
    let adminInfo = JSON.parse(window.localStorage.getItem("access-admin"));

    console.log(adminInfo);
    let token = adminInfo.token;
    //如果请求不在白名单中且携带token,则在请求头设置token
    if (whitelist.indexOf(url) === -1 && token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//4.响应拦截器==>后端给前端返回数据
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(new Error(error.response.data));
  }
);
export default service;
