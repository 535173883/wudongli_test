// 巡检选项配置
import request from "@/utils/request";
//新增
export function addList(data) {
  let formData = new FormData();
  for (let key in data) {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  }
  return request({
    url: "/wdl/choosetypeconfig/add",
    method: "post",
    data: formData,
  });
}
//修改
export function editList(data) {
  let formData = new FormData();
  for (let key in data) {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  }
  return request({
    url: "/wdl/choosetypeconfig/edit",
    method: "post",
    data: formData,
  });
}

// 巡检区域配置分页查询
export function getList(params) {
  return request({
    url: "/wdl/choosetypeconfig/list",
    params,
  });
}
// 根据id删除
export function deleteList(params) {
  return request({
    url: "/wdl/choosetypeconfig/removeById",
    method: "DELETE",
    params,
  });
}
