<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
      :row-style="{ color: '#334681' }"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="90" align="center" type="selection">
      </el-table-column>
      <!-- 数据列 -->
      <el-table-column
        v-for="item in tableItemData"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        align="center"
        width="250"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //表头数据
    tableItemData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      checkedData: [], //选中项
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.checkedData = selection[0];
      if (selection.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(selection.pop());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/styles/common/table.scss");
::v-deep .el-table {
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: inherit;
  }
  .el-table__header .el-checkbox {
    display: none;
  }
}
</style>
