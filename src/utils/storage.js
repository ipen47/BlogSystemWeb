/**
 * 持久化数据存储
 */

const ADMIN_INFO_KEY = "Admin-Info"; //用户登录信息key
const ARTICLE_ID_KEY = "articleId"; //文章Idkey
//获取用户登录信息
export function getAdminInfo() {
  let result = window.localStorage.getItem(ADMIN_INFO_KEY);

  return result ? JSON.parse(result) : "";
}
//设置用户登录信息
export function setAdminInfo(adminObj) {
  return localStorage.setItem(ADMIN_INFO_KEY, JSON.stringify(adminObj));
}
// 移除用户登录信息
export function removeAdminInfo() {
  return localStorage.removeItem(ADMIN_INFO_KEY);
}
//获取token
export function getToken() {
  let result = getAdminInfo();

  return result ? result.token : "";
}
//获取文章Id
export function getArticleId() {
  let result = window.localStorage.getItem(ARTICLE_ID_KEY);

  return result ? JSON.parse(result) : "";
}
//设置文章Id
export function setArticleId(articleId) {
  return localStorage.setItem(ARTICLE_ID_KEY, JSON.stringify(articleId));
}
// 移除文章Id
export function removeArticleId() {
  return localStorage.removeItem(ARTICLE_ID_KEY);
}
