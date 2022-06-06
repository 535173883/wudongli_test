//统计信息展示
import request from "@/utils/request";

//船舶分页查询
export function GetShipDataList(params) {
  return request({
    url: "/wdl/ship/list",
    method: "GET",
    params,
  });
}

//	获取船舶扇形图数据
export function GetShipEchartsData(params) {
  return request({
    url: "/wdl/company/shipSectorDiagram",
    method: "GET",
    params,
  });
}

//	获取当前台风数据  【】无台风   {...} 有台风
export function GetTyphoonData(params) {
  return request({
    url: "/jxj/ZsMapTyphoonOne",
    method: "POST",
    params,
  });
}

// 获取所有船舶信息
export function GetShipMes(params) {
  return request({
    url: "/jxj/getShipAis",
    method: "GET",
    params,
  });
}
// 获取所有船舶信息
export function QueryShip(params) {
  return request({
    url: "/jxj/getQueryShipAis",
    method: "GET",
    params,
  });
}
