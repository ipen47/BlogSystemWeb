import request from "@/utils/request";
// 查询权限列表（分页）
export function AuthList(data) {
  return request({
    url: "authority/pageList/",
    method: "get",
    params: data,
  });
}
// 查询权限列表(简单查询)
export function list() {
  return request({
    url: "authority/list",
    method: "get",
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
    url: "authority/updateAuth",
    method: "put",
    data: data,
  });
}
//删除权限
export function AuthDelete(data) {
  return request({
    url: "authority/deleteAuth/" + data,
    method: "delete",
  });
}
// 查询角色列表(分页)
export function CharacterList(data) {
  return request({
    url: "role/pageList/",
    method: "get",
    params: data,
  });
}
// 查询角色列表(简单查询)
export function roleList() {
  return request({
    url: "role/list",
    method: "get",
  });
}
//添加角色
export function CharacterAdd(data) {
  return request({
    url: "role/addRole",
    method: "post",
    data: data,
  });
}
//修改角色信息
export function CharacterEdit(data) {
  return request({
    url: "role/updateRole",
    method: "put",
    data: data,
  });
}
//删除角色
export function CharacterDelete(data) {
  return request({
    url: "role/deleteRole/" + data,
    method: "delete",
  });
}
//查询角色当前权限
export function getAuth(data) {
  return request({
    url: "roleAuthority/getAuthByRoleId/" + data,
    method: "get",
  });
}
//为角色设置权限
export function setAuth(data) {
  return request({
    url: "roleAuthority/setAuth",
    method: "put",
    data: data,
  });
}
