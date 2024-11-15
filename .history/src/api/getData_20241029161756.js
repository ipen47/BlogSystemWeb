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
//添加用户
export function UserAdd(data) {
  return request({
    url: "user/addUser",
    method: "post",
    data: data,
  });
}
//修改用户信息
export function UserEdit(data) {
  return request({
    url: "user/updateUser",
    method: "put",
    data: data,
  });
}
//修改用户信息
export function Userdelete(data) {
  return request({
    url: "user/updateUser",
    method: "delete",
    data: data,
  });
}