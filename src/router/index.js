import Vue from "vue";
import VueRouter from "vue-router";
import errorPage from "@/views/error-page/401";

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/LoginPage",
    name: "LoginPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/404",
    component: errorPage,
    hidden: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
