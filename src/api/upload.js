import request from "@/utils/request";
//上传文章封面
export function uploadArticleImg(data) {
  return request({
    url: "blog/upload/articleImg",
    method: "post",
    data: data,
  });
}
//上传用户头像
export function uploadAvatarImg(data) {
  return request({
    url: "blog/upload/avatarImg",
    method: "post",
    data: data,
  });
}
