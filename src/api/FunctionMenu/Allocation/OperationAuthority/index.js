import request from "@/utils/request";
export function getOperationAuthorityList(params) {
  return request({
    url: "/wdl/qy-powerpeizhi/list",
    params,
  });
}
export function addOperationAuthority(formData) {
  return request({
    url: "/wdl/qy-powerpeizhi/add",
    method: "post",
    data: formData,
  });
}

export function editOperationAuthority(formData) {
  return request({
    url: "/wdl/qy-powerpeizhi/edit",
    method: "post",
    data: formData,
  });
}

export function deleteOperationAuthority(id) {
  return request({
    url: "/wdl/qy-powerpeizhi/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}
