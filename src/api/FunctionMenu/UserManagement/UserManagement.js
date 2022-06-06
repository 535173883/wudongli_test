//公司机构管理
import request from "@/utils/request";

//企业微信用户列表
export function GetWXUserData(params) {
  return request({
    url: "/qy/user/list",
    method: "GET",
    params,
  });
}

//用户添加
export function UserDataAdd(params) {
  return request({
    url: "/qy/user/add",
    method: "PUT",
    params,
  });
}

//用户修改
export function UserDataEdit(params) {
  return request({
    url: "/qy/user/edit",
    method: "PUT",
    params,
  });
}

//用户删除
export function UserDataDelete(params) {
  return request({
    url: "/qy/user/removeById",
    method: "DELETE",
    params,
  });
}
export function editRoleSetting(params) {
  return request({
    url: "/qy/user/roleAssignment",
    method: "GET",
    params,
  });
}

export function queryRoleSetting(params) {
  return request({
    url: "/qy/user/alreadyRole",
    method: "GET",
    params,
  });
}
