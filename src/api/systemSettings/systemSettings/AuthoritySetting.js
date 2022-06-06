// 权限管理
import request from "@/utils/request";

//list获取
export function getTableList(params) {
  return request({
    url: "/system/authority/lists",
    method: "GET",
    params,
  });
}

//tableItem新增
export function TableListItemAdd(params) {
  return request({
    url: "/system/authority/add",
    method: "PUT",
    params,
  });
}

//tableItem删除
export function TableListItemDelete(params) {
  return request({
    url: "/system/authority/removeById",
    method: "DELETE",
    params,
  });
}
//tableItem修改
export function TableListItemEdit(params) {
  return request({
    url: "/system/authority/edit",
    method: "PUT",
    params,
  });
}
