<template>
  <el-dialog
    :visible.sync="visible"
    width="400px"
    :show-close="false"
    class="dialog"
    :custom-class="'dialog-box'"
    :title="title"
    :modal="false"
    v-dragDialog
  >
    <div style="margin-bottom: 20px">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
    </div>

    <TreeBox
      ref="tree"
      v-bind="$attrs"
      :treeData="treeData"
      :filterText="filterText"
      @selectNode="selectNode"
    ></TreeBox>
    <span slot="footer">
      <el-button @click="visible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="confirm()" size="small"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import TreeBox from "../TreeBox/index.vue";
import dragDialog from "@/directive/v-drag";
export default {
  name: "SelectDialog",
  directives: { dragDialog },
  components: { TreeBox },
  props: {
    title: {
      type: String,
      default: "asdasd",
    },
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      filterText: "",
      selectData: "",
    };
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val); // visible 改变的时候通知父组件
      },
    },
  },
  methods: {
    confirm() {
      this.$emit("getFatherMes", this.selectData);
      this.$emit("update:dialogVisible", false);
      this.selectData = "";
    },
    selectNode(value) {
      this.selectData = value;
    },
    closeView() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #ccc;
  background: #f9fbff;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #ccc;
  background-color: #edf0f2;
  text-align: center;
}
.dialog {
  ::v-deep .el-dialog {
    margin-left: 50vw;
  }
}
</style>
