import request from "@/utils/request";
//获取文章分类列表数据
export function getArticleList(data) {
  return request({
    url: "blog/articles/articleList",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//根据id查询文章详情
export function getArticleDetails(data) {
  return request({
    url: "blog/articles/getArticleDetails",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//根据排序规则查询文章数据
export function getArticleBySort(data) {
  return request({
    url: "blog/articles/getArticleBySort",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//发布或保存文章
export function saveBlog(data) {
  return request({
    url: "blog/articles/addArticle",
    method: "post",
    data: data,
  });
}
