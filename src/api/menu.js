import request from "@/utils/request";
//生成菜单
export function createMenu() {
  return request({
    url: "menu/list",
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
