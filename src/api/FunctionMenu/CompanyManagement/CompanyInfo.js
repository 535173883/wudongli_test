//公司基本信息
import request from "@/utils/request";

//公司list
export function GetCompanyData(params) {
  return request({
    url: "/wdl/company/list",
    method: "GET",
    params,
  });
}

//公司新增
export function CompanyDataItemAdd(params) {
  return request({
    url: "/wdl/company/add",
    method: "PUT",
    params,
  });
}

//公司修改
export function CompanyDataItemEdit(params) {
  return request({
    url: "/wdl/company/edit",
    method: "PUT",
    params,
  });
}

//公司删除
export function CompanyDataItemDelete(params) {
  return request({
    url: "/wdl/company/removeById",
    method: "DELETE",
    params,
  });
}

//获取全部公司名称
export function CompanyDataList(params) {
  return request({
    url: "/wdl/company/getALll",
    method: "GET",
    params,
  });
}
