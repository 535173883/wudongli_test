<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
      :row-style="{ color: '#334681' }"
      v-loading="loading"
    >
      <!-- 数据列 -->
      <el-table-column
        v-for="item in tableItemData"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        align="center"
      >
      </el-table-column>
      <!-- filter列 -->
      <!--操作列 -->
      <el-table-column
        label="操作"
        v-if="showItemAction"
        width="420"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="tableItemEdit(scope.$index, scope.row)"
            class="button"
            >修改</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="danger"
            @click="tableItemDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="primary"
            @click="tableItemRole(scope.$index, scope.row)"
            >用户分配</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="primary"
            @click="tableItemMenu(scope.$index, scope.row)"
            >菜单分配</el-button
          >
          <el-button
            class="button"
            size="mini"
            type="primary"
            @click="tableItemJur(scope.$index, scope.row)"
            >权限分配</el-button
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
    return {};
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
    // 角色分配
    tableItemRole(value, row) {
      this.$emit("tableItemRole", row);
    },
    // 菜单分配
    tableItemMenu(value, row) {
      this.$emit("tableItemMenu", row);
    },
    // 权限分配
    tableItemJur(value, row) {
      this.$emit("tableItemJur", row);
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
