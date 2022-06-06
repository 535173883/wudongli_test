<template>
  <div>
    <div class="topbar">
      <div class="search-item">
        <small class="search-title">角色名称:</small>
        <el-input
          clearable
          v-model="oldSearchData.name"
          class="search-input"
          placeholder="请输入"
          style="width: 180px"
        ></el-input>
      </div>
      <el-button
        @click="search"
        type="primary"
        icon="el-icon-search"
        class="search-button"
        size="mini"
        >搜索</el-button
      >
    </div>
    <RadioTable
      :tableData="tableData"
      :tableItemData="tableItemData"
      ref="TableList"
    ></RadioTable>
    <PaginationPage
      @pagination="pagination"
      v-show="total > 1"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
    ></PaginationPage>
  </div>
</template>

<script>
import RadioTable from "./RadioTable.vue";
import pagination from "@/Mixins/pagination";
import { getTableList } from "@/api/systemSettings/systemSettings/UserSetting";
export default {
  name: "RoleContent",
  mixins: [pagination],
  components: {
    RadioTable,
  },
  data() {
    return {
      searchData: {
        name: "",
      },
      oldSearchData: {
        name: "",
      },
      tableData: [],
      tableItemData: [
        { prop: "name", label: "角色名称" },
        { prop: "remarks", label: "备注" },
      ],
      clickId: "",
    };
  },
  methods: {
    search() {
      this.searchData = JSON.parse(JSON.stringify(this.oldSearchData));
      const params = Object.assign(
        { pageNo: 1, pageSize: 10 },
        this.searchData
      );
      this.getTableList(params);
    },

    getTableList(params) {
      getTableList(params).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        const obj = this.tableData.find((item) => item.id === this.clickId);
        if (obj) {
          this.$nextTick(() => {
            this.$refs["TableList"].$refs["table"].toggleRowSelection(obj);
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/topbar.scss";
</style>
