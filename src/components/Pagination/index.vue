<template>
  <div class="pagination-container">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: "PaginationPage",
  props: {
    /**
     * 总页数
     */
    total: {
      required: true,
      type: Number,
    },
    /**
     * 默认当前页
     */
    page: {
      default: 1,
      type: Number,
    },
    /**
     * 默认分页大小
     */
    limit: {
      type: Number,
      default: 5,
    },
    /**
     * 分页大小
     */
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50];
      },
    },
    /**
     * 布局方式
     */
    layout: {
      type: String,
      default: "total,prev, pager, next,jumper",
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: #fff;
  padding: 32px 16px;
}
</style>
