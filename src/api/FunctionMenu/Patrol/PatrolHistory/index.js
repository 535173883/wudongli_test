import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/qy-wdl/historyxjshiprecordstate/qylishijilustate",
    params,
  });
}

// /qy-wdl/historyxjshiprecordstate/getId

export function getDetail(id) {
  return request({
    url: "/qy-wdl/historyxjshiprecordstate/getId",
    params: {
      id,
    },
  });
}
