// 区域管理
import request from "@/utils/request";

//菜单list获取
export function getRoutes(params) {
  return request({
    url: "/system/menu/menus",
    method: "GET",
    params,
  });
}
//删除菜单
export function TableListItemDelete(params) {
  return request({
    url: "/system/menu/removeById",
    method: "delete",
    params,
  });
}

//新增菜单
export function addMenu(params) {
  return request({
    url: "/system/menu/add",
    method: "PUT",
    params,
  });
}

//修改菜单
export function editMenu(params) {
  return request({
    url: "/system/menu/edit",
    method: "PUT",
    params,
  });
}

//菜单排序
export function menuSort(data) {
  return request({
    url: "/system/menu/oneKeySort",
    method: "POST",
    data,
  });
}
