import request from "@/utils/request";

export function getNoticeList() {
  return request({
    url: "/wdl/bulletin-board/list",
    params: {
      pageNo: 1,
      pageSize: 10,
    },
  });
}
