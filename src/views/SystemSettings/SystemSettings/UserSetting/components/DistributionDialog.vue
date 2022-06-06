<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="400px"
      :show-close="false"
      :custom-class="'dialog-box'"
      class="dialog"
      :title="title"
      :modal="false"
    >
      <div class="dir-tree">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          :props="{
            children: 'children',
            label: labelFn,
          }"
          node-key="id"
          class="filter-tree"
          @check-change="handleCheckChange"
          :highlight-current="true"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
          :check-strictly="checkStrictl"
        ></el-tree>
      </div>

      <span slot="footer">
        <el-button @click="Cancel()" size="mini">取 消</el-button>
        <el-button type="primary" @click="confirm()" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DistributionDialog",
  props: {
    title: {
      type: String,
      default: "",
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
    treeLabel: {
      type: String,
      default: () => {
        return "title";
      },
    },
    mainMenuid: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      selectList: [],
      defaultCheckedKeys: [],
      checkStrictl: true,
    };
  },
  watch: {},
  methods: {
    Cancel() {
      this.visible = false;
      this.defaultCheckedKeys = [];
    },
    labelFn(data) {
      return data[this.treeLabel];
    },
    confirm() {
      const ids = this.$refs["tree"].getHalfCheckedKeys(); //返回目前半选中的节点的 key 所组成的数组
      let childIds = this.$refs["tree"].getCheckedKeys(); //返回目前被选中的节点的 key 所组成的数组
      const id = Array.from(new Set(ids.concat(childIds)));
      if (this.title === "菜单分配") {
        id.push(this.mainMenuid);
      }
      const string = id.join(",");
      this.defaultCheckedKeys = [];
      if (string.length === 0) {
        this.$emit("distributionConfirm", `${string}`);
      } else {
        this.$emit("distributionConfirm", `${string},`);
      }
    },
    handleCheckChange(data, checked) {
      if (checked) {
        this.selectList.push(data);
      } else {
        this.selectList = this.selectList.filter((item) => {
          return item.id != data.id;
        });
      }
    },
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
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #ccc;
  background: #f9fbff;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #ccc;
  background-color: #eee;
  text-align: center;
}
.dialog {
  ::v-deep .el-dialog {
    margin-left: 50vw;
  }
}
.dir-tree {
  height: 300px;
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
</style>
