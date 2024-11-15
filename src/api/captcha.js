import request from "@/utils/request";
//生成验证码
export function getCodeImg() {
  return request({
    url: "captcha",
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
