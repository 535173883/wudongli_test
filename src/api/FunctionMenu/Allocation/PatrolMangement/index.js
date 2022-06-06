import request from "@/utils/request";
export function getTableList(params) {
  return request({
    url: "/wdl/taskconfig/list",
    params,
  });
}

// 获取提醒人
export function getAllSelectData() {
  return request({
    url: "/wdl/taskconfig/getShipId",
  });
}
// 添加任务
export function addTask(formData) {
  return request({
    url: "/wdl/taskconfig/add",
    method: "post",
    data: formData,
  });
}
// 修改任务
export function editTask(formData) {
  return request({
    url: "/wdl/taskconfig/edit",
    method: "post",
    data: formData,
  });
}
// 删除任务
export function deleteTast(id) {
  return request({
    url: "/wdl/taskconfig/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}

export function changeStatus(id, name) {
  return request({
    url: "/wdl/taskconfig/state",
    method: "put",
    params: {
      id,
      name,
    },
  });
}
