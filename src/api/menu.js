import request from "@/utils/request";
//生成菜单
export function createMenu(data) {
  return request({
    url: "menu/getMenu",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//分页查询菜单数据
export function getMenuList(data) {
  return request({
    url: "menu/pageList",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
