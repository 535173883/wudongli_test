//公司机构管理
import request from "@/utils/request";

//公司组织架构分页查询
export function GetCompanyOfficeData(params) {
  return request({
    url: "/wdl/organization/list",
    method: "GET",
    params,
  });
}

//新增数据
export function CompanyOfficeDataAdd(params) {
  return request({
    url: "/wdl/organization/add",
    method: "put",
    params,
  });
}

//修改数据
export function CompanyOfficeDataEdit(params) {
  return request({
    url: "/wdl/organization/edit",
    method: "put",
    params,
  });
}

//删除数据
export function CompanyOfficeDataDelete(params) {
  return request({
    url: "/wdl/organization/removeById",
    method: "DELETE",
    params,
  });
}

//根据公司id获取公司机构信息
export function queryOrganizationByCompanyId(params) {
  return request({
    url: "/wdl/organization/getOrganizationByCompanyId",
    method: "GET",
    params,
  });
}
