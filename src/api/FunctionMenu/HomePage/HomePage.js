//公司机构管理
import request from "@/utils/request";

//企业微信用户列表
export function GetWXUserData(params) {
  return request({
    url: "/qy/user/list",
    method: "GET",
    params,
  });
}
