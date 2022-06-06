<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
      :row-style="{ color: '#334681' }"
      ref="table"
    >
      <el-table-column type="selection" width="55" v-if="isCheck">
      </el-table-column>
      <!-- 数据列 -->
      <el-table-column
        v-for="item in tableItemData"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :align="item.align ? 'center' : 'left'"
      >
      </el-table-column>
      <el-table-column label="区域类型" key="id" align="center">
        <template slot-scope="scope">
          {{ scope.row.type | transfrom }}
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <!--操作列 -->
      <el-table-column
        align="center"
        :label="actionItem.label"
        v-if="showItemAction"
        width="260"
      >
        <template slot-scope="scope">
          <el-button
            class="button"
            size="mini"
            @click="tableItemEdit(scope.$index, scope.row)"
            v-if="actionItem.edit"
            >{{ actionItem.edit }}</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="danger"
            @click="tableItemDelete(scope.$index, scope.row)"
            >{{ actionItem.delete }}</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="primary"
            v-if="actionItem.add"
            @click="tableItemAdd(scope.$index, scope.row)"
            >{{ actionItem.add }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: {
    isCheck: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //是否含有排序列
    showEditNumber: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //操作列
    actionItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //是否含有操作列
    showItemAction: {
      type: Boolean,
      default: () => {
        return true;
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
      multipleSelection: [], //选中项
    };
  },
  methods: {
    inputValue(value, row) {
      this.$emit("changeItemSort", value, row);
    },
    // 修改
    tableItemEdit(value, row) {
      this.$emit("tableItemEdit", row);
    },
    // 删除
    tableItemDelete(value, row) {
      this.$emit("tableItemDelete", row);
    },
    // 添加
    tableItemAdd(value, row) {
      this.$emit("tableItemAdd", row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(ids) {
      if (ids) {
        let rows = [];
        ids.forEach((element) => {
          const id = this.tableData.filter((item) => item.id === element);
          rows.push(...id);
        });
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
  },
  filters: {
    transfrom: function (value) {
      let data = "";
      switch (value) {
        case "1":
          data = "国家";
          break;
        case "2":
          data = "省份、直辖市";
          break;
        case "3":
          data = "地市";
          break;
        case "4":
          data = "区县、乡镇";
          break;
        default:
          data = "未知";
          break;
      }
      return data;
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
}
</style>
