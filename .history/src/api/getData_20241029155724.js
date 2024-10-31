import request from "@/utils/request";
// 查询用户列表
export function UserList(query) {
  return request({
    url: "user/list/?page=1&size=" + query,
    method: "get",
  });
}
//条件搜索查询用户
export function UserSearch(query) {
  return request({
    url: "user/search",
    method: "get",
    params: query,
  });
}
