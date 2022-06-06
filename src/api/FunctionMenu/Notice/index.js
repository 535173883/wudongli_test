import request from "@/utils/request";

// 经信局发布通知
export function getAdminNoticeList(pageNo, pageSize, startTime, endTime) {
  return request({
    url: "/wdl/bulletin-board/list",
    params: {
      pageNo,
      pageSize,
      startTime,
      endTime,
    },
  });
}

export function addNotice(params) {
  return request({
    url: "/wdl/bulletin-board/add",
    params,
  });
}
export function editNotice(params) {
  return request({
    url: "/wdl/bulletin-board/edit",
    method: "put",
    params,
  });
}

export function deleteNotice(id) {
  return request({
    url: "/wdl/bulletin-board/removeById",
    method: "delete",
    params: {
      id,
    },
  });
}
export function releaseNotice(id) {
  return request({
    url: "/wdl/bulletin-board/announce",
    params: {
      id,
    },
  });
}
// 普通机构 通知页面
export function getNoticeList(pageNo, pageSize, startTime, endTime) {
  return request({
    url: "/wdl/bulletin-board/list",
    params: {
      pageNo,
      pageSize,
      startTime,
      endTime,
    },
  });
}

//获取未读消息数量
export function getUnreadMessage(params) {
  return request({
    url: "/wdl/bulletin-board/alert",
    params,
  });
}

//机构公告栏分页查询
export function getMechanismNoticeList(params) {
  return request({
    url: "/wdl/bulletin-board/selectList",
    method: "GET",
    params,
  });
}
//机构公告栏分页查询
export function changeItemStatus(params) {
  return request({
    url: "/wdl/bulletin-board/updateState",
    method: "GET",
    params,
  });
}
