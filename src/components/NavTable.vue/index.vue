<template>
  <div class="tabscontainer">
    <el-tabs v-model="activeValue" @tab-click="tabClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
        <!-- 这里使用具名插槽处理 -->

        <slot :name="item.name"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "NavTable",
  props: {
    active: {
      type: String,
      default: "first",
    },
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeValue: this.active,
    };
  },

  methods: {
    tabClick() {
      this.$emit("changeTabItem", this.activeValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabscontainer {
  background: #ffffff;
  padding: 20px;
  border-radius: 20px;
  ::v-deep .el-tabs__nav {
    height: 60px;
    margin-left: 20px;
    .el-tabs__item {
      height: 60px;
      line-height: 70px;
      font-size: 16px;
      font-weight: 600;
      color: #334681;
    }
    .el-tabs__item.is-active {
      color: #409eff;
    }
  }
  ::v-deep .el-tabs__active-bar {
    height: 5px;
    bottom: 1px;
    // width: 50px !important;
  }
}
</style>
