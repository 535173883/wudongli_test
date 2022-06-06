import router from "./router";
const _import = require("./router/_import_" + process.env.NODE_ENV); //获取组件的方法
import Layout from "@/Layout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
import { getRoutes } from "@/api/routes";
import { getToken } from "@/utils/auth"; // 获取token
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

var getRouter; //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  const tokenStartTime = sessionStorage.getItem("tokenStartTime");
  const nowTime = new Date().getTime();
  if (nowTime - tokenStartTime > 60 * 2 * 60 * 1000) {
    sessionStorage.clear();
    delete window.antRouter;
  }
  if (hasToken) {
    if (to.path === "/LoginPage") {
      next({ path: "/" });
      NProgress.done();
    }

    if (!getRouter) {
      //不加这个判断，路由会陷入死循环
      if (!getObjArr("router")) {
        getRoutes().then((res) => {
          // getRouter = fakeRouter.router; //假装模拟后台请求得到的路由数据
          getRouter = res.data[0].children;
          saveObjArr("router", getRouter); //存储路由到localStorage
          routerGo(to, next); //执行路由跳转方法
          NProgress.done();
        });
      } else {
        //从localStorage拿到了路由
        getRouter = getObjArr("router"); //拿到路由
        routerGo(to, next);
        NProgress.done();
      }
    } else {
      sessionStorage.setItem("tokenStartTime", new Date().getTime());
      next();
      NProgress.done();
    }
  } else {
    /* has no token*/
    if (to.path === "/LoginPage") {
      getRouter = null;
      next();
    } else {
      next("/LoginPage");
      getRouter = null;
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); //过滤路由
  router.addRoutes(getRouter); //动态添加路由
  global.antRouter = getRouter; //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true });
}

function saveObjArr(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}

function getObjArr(name) {
  return JSON.parse(window.sessionStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        //Layout组件特殊处理
        route.component = Layout;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });

  return accessedRouters;
}
