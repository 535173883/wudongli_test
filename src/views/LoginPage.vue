<template>
  <div class="login-container">
    <vue-particles
      class="particles"
      color="#7697E0"
      :particleOpacity="0.3"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="6"
      linesColor="#7697E0"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-content">
      <img src="../assets/11.png" alt="" class="img" />
      <div class="content-left">
        <h3>无动力防汛E管在线-巡检平台</h3>
      </div>
      <div class="content-right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">用户登录</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="登陆名称"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登陆</el-button
          >
        </el-form>
      </div>
    </div>

    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      otherQuery: {},
    };
  },

  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },

  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$message.success("登录成功");
              //设置登陆token定时
              const tokenStartTime = new Date().getTime();
              sessionStorage.setItem("tokenStartTime", tokenStartTime);
              this.$router.push({
                path: "/FunctionMenu",
              });
              this.loading = false;
            })
            .catch((e) => {
              this.$message.error(e);
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #1c89ff;
$cursor: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .particles {
    // background-image: url("../assets/NEWHEARD-min.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      color: #000000;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #ffffff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: #ffffff;
    border-radius: 5px;
    color: #000000;
  }
}
</style>

<style lang="scss" scoped>
$bg: #d9e2f0;
$dark_gray: #1c89ff;
$light_gray: #1c89ff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .footer {
    position: absolute;
    width: 70%;
    height: 50%;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: url("../assets/63.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 100%;
  }
  .login-content {
    position: absolute;
    width: 1086px;
    height: 450px;
    max-width: 100%;
    margin: 0 auto;
    left: calc(50% - 543px);
    top: calc(45% - 225px);
    overflow: hidden;
    border-radius: 22px;
    z-index: 99999;
    display: flex;
    justify-content: flex-start;
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    .content-left {
      height: 100%;
      width: 50%;
      background-image: linear-gradient(to bottom right, #7999e1, #003bab);
      h3 {
        margin-top: 50px;
        color: #ffffff;
        font-size: 30px;
        letter-spacing: 5px;
      }
    }
    .content-right {
      height: 100%;
      width: 50%;
      position: relative;
      background-color: #ffffff;
      .login-form {
        position: absolute;
        width: 450px;
        height: 100%;
        max-width: 100%;
        padding: 40px 35px 40px;
        left: 20px;
        margin: 0 auto;
        overflow: hidden;
        z-index: 3;
        // box-shadow: 14px -14px 8px #1f2834, -14px 14px 8px #314052;
      }
    }
  }
}
</style>
