import request from "@/utils/request";
// 查询用户列表
export function UserList(parms) {
  return request({
    url: "user/list/",
    method: "get",
    params: parms,
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
//删除用户信息
export function UserDelete(parm) {
  return request({
    url: "user/deleteUser/" + parm,
    method: "delete",
  });
}
//查询用户当前角色
export function getRole(data) {
  return request({
    url: "roleUser/getRoleByUserId/" + data,
    method: "get",
  });
}
//为用户设置角色;
export function setRole(data) {
  return request({
    url: "roleUser/setRole",
    method: "put",
    data: data,
  });
}
//根据用户id查询用户信息
export function getInfo(data) {
  return request({
    url: "user/userInfo",
    method: "get",
    params: data,
  });
}
