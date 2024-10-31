import request from "@/utils/request";
// 查询用户列表
export function UserList(query) {
  return request({
    url: "user/list/?page=1&size=" + query,
    method: "get",
  });
}
