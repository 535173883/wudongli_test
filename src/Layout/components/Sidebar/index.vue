<template>
  <div class="Sidebar-container">
    <div class="icon-box">
      <Hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      ></Hamburger>
    </div>
    <el-menu
      class="el-menu-vertical-demo sidebar"
      :collapse="isCollapse"
      background-color="#ffffff"
      text-color="#334681"
      active-text-color="#387DFF"
      :default-active="$route.path"
    >
      <SidebarItem :routes="$attrs.routes"></SidebarItem>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./sidebarItem.vue";
import Hamburger from "../../Hamburger.vue";
export default {
  name: "SideBar",
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  components: { SidebarItem, Hamburger },
};
</script>

<style lang="scss" scoped>
.Sidebar-container {
  .icon-box {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-item {
      cursor: pointer;
    }
    svg {
      margin: 0 auto;
      height: 30px;
      width: 30px;
    }
  }
}
.hamburger-container {
  line-height: 50px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.sidebar {
  width: 160px;
  height: calc(100% - 45px);
  margin-right: 0px;
  overflow: auto;
  ::v-deep .el-menu-item {
    min-width: 0px;
  }
  ::v-deep .el-submenu {
    .el-submenu__title {
      padding: 0 10px !important;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .el-menu-item {
      text-align: start;
      padding: 0 0 0 40px !important;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 80px;
}
</style>
