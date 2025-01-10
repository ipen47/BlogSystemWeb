import request from "@/utils/request";
//获取文章标签数据
export function getTagPages(data) {
  return request({
    url: "blog/tags/getTagPages",
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
//添加文章标签
export function addTag(data) {
  return request({
    url: "blog/tags/addTag",
    method: "post",
    data: data,
  });
}
//修改文章标签
export function updateTag(data) {
  return request({
    url: "blog/tags/updateTag",
    method: "put",
    data: data,
  });
}

//删除标签分类
export function deleteTag(data) {
  return request({
    url: `blog/tags/deleteTag?tagId=${data}`,
    method: "delete",
  });
}
