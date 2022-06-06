import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "../router";
import { getToken } from "@/utils/auth";
const baseURL = process.env.VUE_APP_BASE_URL; //方明旺
//const baseURL = process.env.VUE_APP_BASE_URL1; //郭壮
//const baseURL = process.env.VUE_APP_BASE_URL2; //胡鹏
// const baseURL = process.env.VUE_APP_BASE_URL3; //正式地址·
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      //token时间过期重新校验
      const tokenStartTime = new Date().getTime();
      sessionStorage.setItem("tokenStartTime", tokenStartTime);
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error, "request"); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code !== 200) {
      const code = data.code;
      if (code === 301) {
        Message({
          message: "认证失败",
          type: "error",
          duration: 2 * 1000,
        });
        logout();
        return Promise.reject("认证失败");
      }
      if (code === 302) {
        Message({
          message: "认证过期",
          type: "error",
          duration: 2 * 1000,
        });
        logout();
        return Promise.reject("认证过期");
      }
      if (code === 303) {
        Message({
          message: "无权访问",
          type: "error",
          duration: 2 * 1000,
        });
        return Promise.reject("无权访问");
      }
      if (code === 304) {
        Message({
          message: "token不合法",
          type: "error",
          duration: 2 * 1000,
        });
        logout();
        return Promise.reject("token不合法");
      }
      if (code === 305) {
        Message({
          message: "token无权限",
          type: "error",
          duration: 2 * 1000,
        });
        return Promise.reject("token无权限");
      }
      if (code === 306) {
        Message({
          message: "用户多地登陆",
          type: "error",
          duration: 2 * 1000,
        });
        logout();
        return Promise.reject("用户多地登陆");
      }
      if (code === 500) {
        return data;
      }
    } else {
      return data;
    }
  },
  (error) => {
    console.log(error, "response"); // for debug
    Message({
      message: "网络连接出错",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
export { baseURL };

function logout() {
  delete window.antRouter;
  sessionStorage.clear();
  router.push("/LoginPage");
}
