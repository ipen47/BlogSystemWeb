import request from "@/utils/request";
//获取文章分类数据
export function getAllCategories() {
  return request({
    url: "blog/categories/getAllCategories",
    method: "get",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//获取文章分类分页数据
export function getCategoryPages(data) {
  return request({
    url: "blog/categories/getCategoryPages",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//添加文章分类
export function addCategory(data) {
  return request({
    url: "blog/categories/addCategory",
    method: "post",
    data: data,
  });
}
//修改文章分类
export function updateCategory(data) {
  return request({
    url: "blog/categories/updateCategory",
    method: "put",
    data: data,
  });
}
//删除文章分类
export function deleteCategory(data) {
  return request({
    url: `blog/categories/deleteCategory?categoryId=${data}`,
    method: "delete",
  });
}
