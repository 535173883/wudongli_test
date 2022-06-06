// 区域管理
import request from "@/utils/request";
//获取区域列表
export function getAreaList(params) {
  return request({
    url: "/system/area/lists",
    method: "GET",
    params,
  });
}

// 编辑
export function editArea(params) {
  return request({
    url: "system/area/edit",
    method: "PUT",
    params,
  });
}
// 添加
export function addArea(params) {
  return request({
    url: "system/area/add",
    method: "PUT",
    params,
  });
}

// 删除
export function removeArea(params) {
  return request({
    url: "/system/area/removeById",
    method: "DELETE",
    params,
  });
}
