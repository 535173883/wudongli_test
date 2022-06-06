//机构管理
import request from "@/utils/request";

//获取机构树数据
export function GetInstitutionData(params) {
  return request({
    url: "/system/office/getLists",
    method: "GET",
    params,
  });
}

//修改
export function editTableDataItem(params) {
  return request({
    url: "/system/office/edit",
    method: "PUT",
    params,
  });
}

//删除
export function deleteTableDataItem(params) {
  return request({
    url: "/system/office/removeById",
    method: "DELETE",
    params,
  });
}
//添加
export function addTableDataItem(params) {
  return request({
    url: "/system/office/add",
    method: "put",
    params,
  });
}
