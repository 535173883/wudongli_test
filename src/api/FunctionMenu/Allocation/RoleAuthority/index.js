import request from "@/utils/request";
export function getRoleAuthorityTableList(params) {
  return request({
    url: "/wdl/qy-rolepoewrrelation/list",
    params,
  });
}

export function addRoleAuthority(formData) {
  return request({
    url: "/wdl/qy-rolepoewrrelation/add",
    method: "post",
    data: formData,
  });
}

export function editRoleAuthority(formData) {
  return request({
    url: "/wdl/qy-rolepoewrrelation/edit",
    method: "post",
    data: formData,
  });
}

export function deleteRoleAuthority(id) {
  return request({
    url: "/wdl/qy-rolepoewrrelation/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}
//获取所有角色
export function getRoleList() {
  return request({
    url: "/wdl/qy-rolepoewrrelation/role",
  });
}
// 获取所有权限 /wdl/qy-powerpeizhi/select
export function getOperationList() {
  return request({
    url: "/wdl/qy-powerpeizhi/select",
  });
}
