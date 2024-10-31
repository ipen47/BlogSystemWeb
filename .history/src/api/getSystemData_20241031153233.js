import request from "@/utils/request";
// 查询权限列表
export function AuthList(data) {
  return request({
    url: "authority/pageList/",
    method: "get",
    params: data,
  });
}
//添加权限
export function AuthAdd(data) {
  return request({
    url: "authority/addAuth",
    method: "post",
    data: data,
  });
}
//修改权限信息
export function AuthEdit(data) {
  return request({
    url: "authority/addAuth",
    method: "put",
    data: data,
  });
}
