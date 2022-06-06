// 无动力船舶管理
import request from "@/utils/request";
//分页查询list
export function getList(params) {
  return request({
    url: "/wdl/ship/list",
    method: "GET",
    params,
  });
}
//获取停泊位置
export function getBerth(id) {
  return request({
    url: `/wdl/ship/berth/${id}`,
    method: "GET",
  });
}
// 获取公司数据
export function getCompany() {
  return request({
    url: "/wdl/company/getALll",
    method: "GET",
  });
}
//获取船舶
export function getAllShip(shipName) {
  return request({
    url: "/wdl/ship/shipName",
    method: "GET",
    params: {
      shipName,
    },
  });
}
//添加船舶管理
export function addList(params) {
  return request({
    url: "/wdl/ship/add",
    method: "get",
    params,
  });
}
// 修改船舶
export function editShip(params) {
  return request({
    url: "/wdl/ship/edit",
    method: "put",
    params,
  });
}
// 删除船舶
export function deleteShip(id) {
  return request({
    url: `/wdl/ship/del/${id}`,
    method: "delete",
  });
}

// 设置基点
export function setPoint(shipId) {
  return request({
    url: "/wdl/socketais/point",
    params: {
      shipId,
    },
  });
}

// 导出
// export function exportData(json) {
//   let formData = new FormData();
//   formData.append("json", json);
//   return request({
//     url: "/wdl/ship/exportExcel",
//     method: "post",
//     responseType: "blob",
//     data: formData,
//   });
// }
