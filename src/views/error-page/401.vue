<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2 style="margin-bottom: 30px">你没有权限去该页面</h2>
        <h2>如有不满请联系你领导</h2>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <el-button type="primary" @click="$router.go(-1)">
              返回上一层
            </el-button>
            <el-button type="primary" @click="back"> 重新登陆 </el-button>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "ErrorPage",
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
    };
  },
  methods: {
    back() {
      delete window.antRouter;
      sessionStorage.clear();
      this.$router.push({ path: "/LoginPage" });
    },
  },
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
    margin-bottom: 30px;
  }
  .link-type {
    color: #ffffff;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      font-size: 20px;
      margin-top: 30px;
      padding-bottom: 5px;
      list-style: none;
    }
    a {
      color: #ffffff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
