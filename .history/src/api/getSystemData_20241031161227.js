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
// 查询角色列表
export function CharacterList(data) {
  return request({
    url: "role/pageList/",
    method: "get",
    params: data,
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
//角色设置权限
