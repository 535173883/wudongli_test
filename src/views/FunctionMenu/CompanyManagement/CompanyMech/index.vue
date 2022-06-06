<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      ref="NavTable"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'id');
        }
      "
    >
      <div slot="first">
        <div class="topbar">
          <div class="search-item">
            <small class="search-title">公司名称:</small>
            <el-select clearable filterable class="search-input" style="width: 180px" v-model="oldSearchData.companyId">
              <el-option v-for="item in companyNameList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div class="search-item">
            <small class="search-title">姓名:</small>
            <el-input clearable v-model="oldSearchData.name" class="search-input" placeholder="请输入" style="width: 180px"></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" class="search-button" size="mini" @click="search">搜索</el-button>
        </div>
        <TableList
          ref="TableList"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          :loading="loading"
        ></TableList>
        <PaginationPage @pagination="pagination" v-show="total > 1" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <Form
          @changeTabItem="changeTabItem"
          @navTableBack="navTableBack"
          :companyNameList="companyNameList"
          :fromStatus="fromStatus"
          ref="Form"
        ></Form>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import pagination from "@/Mixins/pagination";
import navTable from "@/Mixins/navTable";
import { GetCompanyOfficeData, CompanyOfficeDataDelete } from "@/api/FunctionMenu/CompanyManagement/CompanyMech";
import { CompanyDataList } from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";
import Form from "./Form.vue";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
export default {
  name: "CompanyMech",
  mixins: [table, pagination, navTable],
  components: {
    NavTable,
    TableList,
    Form,
  },
  data() {
    return {
      loading: false,
      companyNameList: [],
      activeName: "first",
      tableData: [],
      tabList: [
        { label: "公司架构职位列表", name: "first" },
        { label: "组织架构职位添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
      },
      tabSecond: {
        add: "组织架构职位添加",
        edit: "组织架构职位修改",
      },
      tableItemData: [
        { prop: "companyName", label: "公司" },
        { prop: "management", label: "管理职位" },
        { prop: "name", label: "姓名" },
        { prop: "phone", label: "电话" },
        { prop: "remarks", label: "备注" },
      ],
      fromStatus: "add", //添加或者修改状态   添加：add    修改：edit
      oldSearchData: { companyId: "", name: "" },
      searchData: {
        companyId: "",
        name: "",
      },
    };
  },
  methods: {
    async CompanyDataList() {
      const res = await CompanyDataList();
      this.companyNameList = res.data;
    },
    async getTableList(params) {
      this.loading = true;
      const res = await GetCompanyOfficeData(params);
      this.loading = false;
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },

    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该公司, 是否继续?");
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      CompanyOfficeDataDelete(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTableList({ pageNo: 1, pageSize: 10 });
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
  },
  mounted() {
    this.CompanyDataList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/topbar.scss";
</style>
