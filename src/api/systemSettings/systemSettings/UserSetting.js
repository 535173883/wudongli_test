// 角色管理
import request from "@/utils/request";

//list获取
export function getTableList(params) {
  return request({
    url: "/system/role/list",
    method: "GET",
    params,
  });
}

//角色新增
export function addUser(params) {
  return request({
    url: "/system/role/add",
    method: "PUT",
    params,
  });
}

//角色修改
export function editUser(params) {
  return request({
    url: "/system/role/edit",
    method: "PUT",
    params,
  });
}

//角色删除
export function deleteUser(params) {
  return request({
    url: "/system/role/removeById",
    method: "DELETE",
    params,
  });
}

//角色权限分配
export function editUserRole(params) {
  return request({
    url: "/system/role/authorityMaintenance",
    method: "POST",
    params,
  });
}

//	角色菜单分配
export function editUserMenu(params) {
  return request({
    url: "/system/role/menuMaintenance",
    method: "POST",
    params,
  });
}

//角色用户分配
export function editUserSetting(params) {
  return request({
    url: "/system/role/userMaintenance",
    method: "POST",
    params,
  });
}

//查询角色已经拥有权限
export function queryRole(params) {
  return request({
    url: "/system/role/menuHave",
    method: "GET",
    params,
  });
}
