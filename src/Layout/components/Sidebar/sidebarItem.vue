<template>
  <div class="menu-wrapper">
    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link
        v-if="
          item.children.length && !item.children[0].children && !item.alwaysShow
        "
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item
          :index="item.path + '/' + item.children[0].path"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <span v-if="item.children[0].meta && item.children[0].meta.title"
            >{{ item.children[0].meta.title }} 11111</span
          >
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <div class="title-item">
            <span
              :class="[
                'icon-item',
                $store.state.app.sidebar.opened ? '' : 'icon-item-radius',
              ]"
            >
              <svg-icon :icon-class="item.meta.icon"></svg-icon
            ></span>

            <span
              v-if="
                item.meta && item.meta.title && $store.state.app.sidebar.opened
              "
              slot="title"
              :style="'margin-left: 15px;'"
              >{{ item.meta.title }}2222</span
            >
          </div>
        </template>

        <!--  eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>
          <router-link
            v-else
            :to="tem.path + '/' + child.path"
            :key="child.name"
          >
            <el-menu-item :index="item.path + '/' + child.path">
              <span v-if="child.meta && child.meta.title"
                >{{ child.meta.title }}3333</span
              >
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array,
    },
    fatherPath: {
      type: String,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.title-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon-item {
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  position: relative;
  svg {
    color: #387dff;
    // color: #a9b1c6;
    height: 20px;
    width: 20px;
    position: absolute;
    left: 5px;
    top: 5px;
  }
}
.icon-item-radius {
  background: #eef0f1;

  box-shadow: 3px 3px 5px #aeafb0, -3px -3px 28px #ffffff;
}
</style>
