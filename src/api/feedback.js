import request from "@/utils/request";
// 查询反馈分页列表
export function feedbackList(parms) {
  return request({
    url: "blog/feedback/getFeedback",
    method: "get",
    params: parms,
  });
}

//提交反馈信息
export function submit(data) {
  return request({
    url: "blog/feedback/submit",
    method: "post",
    data: data,
  });
}
//回复反馈信息
export function reply(data) {
  return request({
    url: "blog/feedback/reply",
    method: "put",
    data: data,
  });
}
//删除反馈信息
export function Delete(id) {
  return request({
    url: `blog/feedback/delete/?feedbackId=${id}`,
    method: "delete",
  });
}
