import request from "@/utils/request";
export function getRoleList(params) {
  return request({
    url: "/wdl/qy-rolepeizhi/list",
    params,
  });
}
export function addRole(formData) {
  return request({
    url: "/wdl/qy-rolepeizhi/add",
    method: "post",
    data: formData,
  });
}

export function editRole(formData) {
  return request({
    url: "/wdl/qy-rolepeizhi/edit",
    method: "post",
    data: formData,
  });
}

export function deleteRole(id) {
  return request({
    url: "/wdl/qy-rolepeizhi/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}
