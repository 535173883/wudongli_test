import request from "@/utils/request";

export function login(params) {
  return request({
    url: "/login",
    method: "get",
    params,
  });
}
export function logout(params) {
  return request({
    url: "/outLogin",
    method: "POST",
    params,
  });
}
