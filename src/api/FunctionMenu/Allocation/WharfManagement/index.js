import request from "@/utils/request";
export function getWharfManagementList(params) {
  return request({
    url: "/wdl/wharfconfig/list",
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

export function addData(formData) {
  return request({
    url: "/wdl/wharfconfig/add",
    method: "post",
    data: formData,
  });
}

export function editData(formData) {
  return request({
    url: "/wdl/wharfconfig/edit",
    method: "post",
    data: formData,
  });
}

export function deleteData(id, type) {
  return request({
    url: "/wdl/wharfconfig/removeById",
    method: "delete",
    params: {
      id,
      type,
    },
  });
}
