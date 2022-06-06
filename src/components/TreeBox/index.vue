<template>
  <div class="dir-tree">
    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="{
        children: 'children',
        label: labelFn,
      }"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      :check-on-click-node="true"
      default-expand-all
      node-key="id"
      ref="tree"
      :highlight-current="true"
      :show-checkbox="showcCheckbox"
    >
      <span class="custom-tree-node" slot-scope="scope">
        <span class="treeItemIcon"
          ><svg-icon icon-class="dashboard" v-if="showIcon"></svg-icon
        ></span>
        <el-link>{{ scope.node.label }}</el-link>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "TreeBox",
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showIcon: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    filterText: {
      type: String,
      default: () => {
        return "";
      },
    },
    treeLabel: {
      type: String,
      default: () => {
        return "title";
      },
    },
    showcCheckbox: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    labelFn(data) {
      return data[this.treeLabel];
    },
    handleNodeClick(data) {
      this.$emit("selectNode", data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.treeLabel].indexOf(value) !== -1;
    },
    defaultSelect(value) {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(value);
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.dir-tree {
  height: 260px;
  ::v-deep .el-link.el-link--default {
    color: #334681;
  }
}
.el-tree {
  min-height: 100%;
  margin-right: 100px;
  display: inline-block !important;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-y: hidden;
}

.filter-tree {
  max-height: 200px;
  overflow: auto;
  width: 373px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding-right: 8px;
  .treeItemIcon {
    margin-right: 5px;
  }
}

::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  color: #409eff;
  a {
    color: #409eff;
    text-decoration: underline #409eff;
  }
}
</style>
