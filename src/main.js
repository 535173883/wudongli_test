import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/icons";
import "@/utils/global"; //全局
import "./promission"; //这里进行路由后台获取的模拟
import "@/styles/index.scss"; // global css
import VueParticles from "vue-particles";
// 自定义分页组件
import PaginationPage from "@/components/Pagination";
// 全局组件挂载
if (process.env.VUE_APP_MOCK) {
  // 判断是否为mock模式
  require("../mock/mockServer");
}
Vue.component("PaginationPage", PaginationPage);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueParticles);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
