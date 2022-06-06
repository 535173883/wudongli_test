// 无动力配置
import request from "@/utils/request";
//新增
export function addList(params) {
  return request({
    url: "/wdl/config/add",
    method: "PUT",
    params,
  });
}
//修改
export function editList(params) {
  return request({
    url: "/wdl/config/edit",
    method: "PUT",
    params,
  });
}
// 无动力配置表分页查询
export function getList(params) {
  return request({
    url: "/wdl/config/list",
    method: "GET",
    params,
  });
}

// 根据id删除
export function deleteList(params) {
  return request({
    url: "/wdl/config/removeById",
    method: "DELETE",
    params,
  });
}
