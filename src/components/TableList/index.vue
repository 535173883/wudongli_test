<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @select="select"
      @select-all="select"
      :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
      :row-style="{ color: '#334681' }"
      ref="table"
      v-loading="loading"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <el-table-column type="selection" width="55" v-if="isCheck">
      </el-table-column>
      <!-- 数据列 -->
      <el-table-column
        v-for="item in tableItemData"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :align="item.align ? 'center' : 'left'"
        :width="item.width"
      >
      </el-table-column>
      <!-- filter列 -->
      <!-- 特殊列 -->
      <el-table-column label="排序" v-if="showEditNumber" align="center">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.sort"
            @change="
              (e) => {
                inputValue(e, scope.row);
              }
            "
          ></el-input>
        </template>
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
            v-if="actionItem.delete"
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
    loading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
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
    getRowKeys(row) {
      return row.id;
    },
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
    // handleSelectionChange(val) {
    //   let stockSelectlist = [];
    //   val.forEach((el) => {
    //     stockSelectlist.push(el.id);
    //   });
    //   this.multipleSelection = stockSelectlist;
    // },
    select(val) {
      this.$emit("selectChange", val);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
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
}
</style>
