// 修改数据
import request from "@/utils/request";
//修改巡检状态
export function editPatrolState(params) {
  return request({
    url: "/wdl/inspection-state/editRemark",
    method: "PUT",
    params,
  });
}
//分页查询巡检状态
export function getList(params) {
  return request({
    url: "/wdl/inspection-state/list",
    params,
  });
}
// 根据id删除
export function deleteState(params) {
  return request({
    url: "/wdl/inspection-state/removeById",
    method: "DELETE",
    params,
  });
}
// 获取全部公司名称
export function getCompany(params) {
  return request({
    url: "/wdl/company/getALll",
    method: "GET",
    params,
  });
}
// 获取全部巡检任务名称
export function getTask(params) {
  return request({
    url: "/wdl/taskconfig/getAll",
    method: "GET",
    params,
  });
}
// 获取船舶位置
export function getShip(params) {
  return request({
    url: "/wdl/wharfconfig/getAll",
    method: "GET",
    params,
  });
}
// 获取获取船舶名稱
export function getShipName(params) {
  return request({
    url: "/wdl/wharfconfig/getAllShip",
    method: "GET",
    params,
  });
}
//获取巡检状态
export function getState(params) {
  return request({
    url: "/wdl/inspection-state/getByAll",
    method: "GET",
    params,
  });
}

// 详情
export function getDetail(id) {
  return request({
    url: "/wdl/inspection-state/getId",
    params: {
      id,
    },
  });
}

//提交整改意见
export function submitRectificationOpinions(params) {
  return request({
    url: "/wdl/inspection-state/editState",
    method: "put",
    params,
  });
}
