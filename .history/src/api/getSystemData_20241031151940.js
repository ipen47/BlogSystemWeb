import request from "@/utils/request";
// 查询权限列表
export function AuthList(data) {
  return request({
    url: "authority/pageList/",
    method: "get",
    params: data,
  });
}
