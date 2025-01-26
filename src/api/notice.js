import request from "@/utils/request";
//获取系统通知和公告数据列表
export function getNoticeList() {
  return request({
    url: "notice/getList",
    method: "get",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//查询系统通知公告分页数据
export function getNotice(data) {
  return request({
    url: "notice/pageList",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//获取最新公告
export function getNewNotice(data) {
  return request({
    url: "notice/newNotice",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

//添加
export function addNotice(data) {
  return request({
    url: "notice/add",
    method: "post",
    data: data,
  });
}
//修改
export function updateNotice(data) {
  return request({
    url: "notice/update",
    method: "put",
    data: data,
  });
}
