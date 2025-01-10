import request from "@/utils/request";
//获取获取列表数据
export function getCommentList(articleId) {
  return request({
    url: "blog/comments/getCommentList",
    method: "get",
    params: { articleId },
  });
}
export function addComment(data) {
  return request({
    url: "blog/comments/addComment",
    method: "post",
    data: data,
  });
}
//删除评论
export function deleteComment(commentId) {
  return request({
    url: `blog/comments/deleteComment?commentId=${commentId}`,
    method: "delete",
  });
}
