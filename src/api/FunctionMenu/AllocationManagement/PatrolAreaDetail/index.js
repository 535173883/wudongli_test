import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/wdl/xjareacontentconfig/list",
    params,
  });
}

export function getSelectArea(params) {
  return request({
    url: "/wdl/xjareaconfig/list",
    params,
  });
}

export function addArea(params) {
  let formData = new FormData();
  for (let key in params) {
    if (params[key]) {
      formData.append(key, params[key]);
    }
  }
  return request({
    url: "/wdl/xjareacontentconfig/add",
    method: "post",
    data: formData,
  });
}

export function getChoosetypeConfig() {
  return request({
    url: "/wdl/choosetypeconfig/getAll",
  });
}

export function deleteArea(id) {
  return request({
    url: "/wdl/xjareacontentconfig/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}

export function editArea(data) {
  let final = {
    id: data.id,
    choosetypeconfigids: data.choosetypeconfigids,
    name: data.name,
    xjareaconfigid: data.xjareaconfigid,
    remarks: data.remarks,
  };
  let formData = new FormData();
  for (let key in final) {
    formData.append(key, final[key]);
  }
  return request({
    url: "/wdl/xjareacontentconfig/edit",
    method: "post",
    data: formData,
  });
}
