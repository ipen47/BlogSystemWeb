import request from "@/utils/request";
export function AuthList(data) {
  return request({
    url: "authority/pageList/",
    params: data,
  });
}
