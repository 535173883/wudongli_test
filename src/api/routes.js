import request from "@/utils/request";

export function getRoutes(params) {
  return request({
    // url: "/system/menu/menus",
    url: "/userMenus",
    method: "GET",
    params,
  });
}

export function MockgetRoutes(params) {
  return request({
    url: "/routes",
    method: "GET",
    params,
  });
}
