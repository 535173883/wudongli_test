// 个人面板
import request from "@/utils/request";
//获取个人信息
export function getInfo(params) {
  return request({
    url: "/system/user/getById", //获取数据
    method: "GET",
    params,
  });
}
//修改个人信息
export function EditInfo(params) {
  return request({
    url: "/system/user/edit",
    method: "PUT",
    params,
  });
}
//修改密码
export function EditPass(params) {
  return request({
    url: "/system/user/editPassword",
    method: "PUT",
    params,
  });
}
