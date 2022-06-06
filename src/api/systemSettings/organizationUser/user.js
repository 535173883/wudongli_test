// 用户管理

import request from "@/utils/request";

//user表格
export function GetUserList(params) {
  return request({
    url: "/system/user/list",
    method: "GET",
    params,
  });
}
//user修改
export function editUserItem(params) {
  return request({
    url: "/system/user/edit",
    method: "put",
    params,
  });
}

//user新增
export function addUserItem(params) {
  return request({
    url: "/system/user/add",
    method: "PUT",
    params,
  });
}

//删除
export function deleteUserItem(params) {
  return request({
    url: "/system/user/removeById",
    method: "delete",
    params,
  });
}

//公司树信息获取
export function GetCompanyData(params) {
  return request({
    url: "/wdl/company/getCompanyData",
    method: "GET",
    params,
  });
}

//用户密码重置
export function PasswordReset(params) {
  return request({
    url: "/system/user/resetPassword",
    method: "GET",
    params,
  });
}
