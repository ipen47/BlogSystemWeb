import request from "@/utils/request";
//查询登录日志分页数据
export function getLoginLog(data) {
  return request({
    url: "log/loginLog/list",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

//查询操作日志分页数据
export function getOperLog(data) {
  return request({
    url: "log/operLog/list",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
