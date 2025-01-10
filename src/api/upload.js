import request from "@/utils/request";
//上传文章封面
export function uploadArticleImg(data) {
  return request({
    url: "blog/upload/articleImg",
    method: "post",
    data: data,
  });
}
