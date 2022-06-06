<template>
  <div id="container">
    <el-container>
      <el-header class="header">
        <div class="headNavbar">
          <div class="headNavbar-title">
            <span>无动力防汛E管在线-巡检平台</span>
          </div>
          <!-- <TopBar
            class="topMenubar"
            :router="router"
            @changeRouter="changeTopRouter"
          ></TopBar> -->
          <el-dropdown trigger="click" class="username-box">
            <span class="userName">{{ $store.state.user.userName }}</span>
            <i class="el-icon-arrow-down" style="color: #387dff"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="gotoNotice">
                <el-badge :value="UnreadMessage" class="item">
                  <span style="display: block">未读消息</span>
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="logout"
                style="text-align: center"
              >
                <span style="display: block">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <div class="mainContent">
          <SideBar :routes="router" class="sideBar"></SideBar>
          <div
            id="content"
            :style="
              open
                ? ' width: calc(100% - 165px);'
                : ' width: calc(100% - 80px);'
            "
          >
            <transition name="fade" mode="out-in">
              <router-view style="height: 100%; width: 100%"></router-view>
            </transition>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/Sidebar";
export default {
  name: "BasicLayout",
  components: { TopBar, SideBar },
  data() {
    return {};
  },
  computed: {
    router() {
      return global.antRouter;
    },
    open() {
      return this.$store.state.app.sidebar.opened;
    },
    UnreadMessage() {
      return this.$store.state.user.UnreadMessage;
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          delete window.antRouter;
          sessionStorage.clear();
          global.antRouter = null;
          this.$router.push("/LoginPage");
          this.$message.success("退出成功");
        })
        .catch(() => {
          delete window.antRouter;
          sessionStorage.clear();
          this.$router.push("/LoginPage");
          this.$message.success("退出成功");
        });
    },
    changeTopRouter(value) {
      this.$router.push(value);
      const childrenRoutes = this.router.find((item) => {
        if (value === item.path) return item;
      });
      this.childrenRoutes = childrenRoutes.children;
      this.fatherPath = value;
    },
    QueryUnreadMessages() {
      this.$store.dispatch("user/changeUnreadMessage").then((data) => {
        if (data > 0) {
          this.$confirm(`您当前有${data}条消息未读，是否前往查看`, "提示", {
            distinguishCancelAndClose: true,
            confirmButtonText: "前往查看",
            cancelButtonText: "忽略",
            type: "warning",
            roundButton: true,
            center: true,
            customClass: "message-box",
          })
            .then(() => {
              this.gotoNotice();
            })
            .catch(() => {
              return;
            });
        } else {
          return;
        }
      });
    },
    gotoNotice() {
      this.$router.push("/FunctionMenu/Notice/Notice");
    },
  },
  mounted() {
    console.log(this.router, "router");
    this.QueryUnreadMessages();
  },
};
</script>

<style lang="scss" scoped>
.headNavbar {
  display: flex;
  justify-content: space-around;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px 1px rgba(51, 70, 129, 0.1),
    inset 0px -1px 0px 1px #e8ecef;
  .topMenubar {
    width: calc(100% - 600px);
    min-width: 300px;
  }
  .headNavbar-title {
    font-size: 26px;
    margin-top: 12px;
    font-weight: bold;
    color: #387dff;
  }
}
.username-box {
  line-height: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  .userName {
    margin-right: 10px;
  }
}
#container {
  height: 100%;
  width: 100%;
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-header {
  padding: 0;
}
.mainContent {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  .sideBar {
    height: 100%;
  }
  #content {
    display: inline-block;
    overflow: auto;
    height: 100%;
    background: #f7f9fa;
    padding: 40px;
  }
}

.el-main {
  padding: 5px;
}

.text-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #6666664f;
  padding-bottom: 10px;
  margin-bottom: 10px;
  .content {
    font-size: 16px;
    color: #333;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time {
    color: #666;
    font-size: 14px;
    margin-top: 2px;
  }
}
::v-deep .message-box {
  .el-message-box__wrapper .el-message-box__btns {
    margin-top: 20px;
    text-align: right;
  }
}

// ::v-deep .el-dialog__header {
//   background: rgb(56, 125, 255);

//   .el-dialog__title {
//     color: #fff;
//   }
//   .el-dialog__headerbtn .el-dialog__close {
//     color: #fff;
//   }
// }
</style>
<style lang="scss">
.message-box {
  .el-message-box__header {
    background-color: #f7f9fa;
    box-shadow: 0px 2px 4px 1px rgb(51 70 129 / 10%),
      inset 0px -1px 0px 1px #e8ecef;
    padding-top: 15px;
  }
  .el-message-box__content {
    padding: 20px 15px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
  }
  .el-message-box__btns {
    text-align: right;
  }

  padding-bottom: 20px;
}
</style>
