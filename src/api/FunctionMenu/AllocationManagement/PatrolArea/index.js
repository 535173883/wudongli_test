import request from "@/utils/request";
export function getTableList(params) {
  return request({
    url: "/wdl/xjareaconfig/list",
    params,
  });
}
export function addArea(data) {
  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return request({
    url: "/wdl/xjareaconfig/add",
    method: "post",
    data: formData,
  });
}

export function editData(data) {
  let formData = new FormData();
  let final = {
    id: data.id,
    name: data.name,
    remarks: data.remarks,
  };
  for (let key in final) {
    formData.append(key, final[key]);
  }
  return request({
    url: "/wdl/xjareaconfig/edit",
    method: "post",
    data: formData,
  });
}

export function deleteData(params) {
  return request({
    url: "/wdl/xjareaconfig/removeById",
    method: "DELETE",
    params,
  });
}
