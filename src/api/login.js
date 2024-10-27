import request from "@/utils/request";
//登录
export function login(data) {
  return request({
    url: "admin/login",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//注册
export function regist(data) {
  return request({
    url: "admin/register",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}