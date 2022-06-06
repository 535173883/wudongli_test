import request from "@/utils/request";
export function getTableList(params) {
  return request({
    url: "/wdl/statistical/list",
    params,
  });
}

export function getCompanyList() {
  return request({
    url: "/wdl/ship/company",
  });
}
