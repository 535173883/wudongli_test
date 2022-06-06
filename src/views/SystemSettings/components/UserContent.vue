<template>
  <div>
    <div class="topbar">
      <div class="search-item">
        <small class="search-title">公司名称:</small>
        <el-select
          clearable
          class="search-input"
          style="width: 180px"
          v-model="oldSearchData.companyId"
        >
          <el-option
            v-for="item in companyNameList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <small class="search-title">登录名:</small>
        <el-input
          clearable
          v-model="oldSearchData.loginName"
          class="search-input"
          placeholder="请输入"
          style="width: 180px"
        ></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="search-button"
        size="mini"
        @click="search"
        >搜索</el-button
      >
    </div>
    <TableList
      :loading="loading"
      :tableData="tableData"
      :actionItem="TableActionItem"
      :tableItemData="tableItemData"
      @tableItemDelete="tableItemDelete"
      @tableItemAdd="tableItemAdd"
      :showItemAction="!isCheck"
      @selectChange="selectChange"
      v-on="$listeners"
      :isCheck="isCheck"
      ref="TableList"
    ></TableList>
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
import pagination from "@/Mixins/pagination";
import table from "@/Mixins/table";
import { CompanyDataList } from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";
import {
  GetUserList as getTableList,
  deleteUserItem,
  PasswordReset,
} from "@/api/systemSettings/organizationUser/user";
import TableList from "@/components/TableList/index.vue";

export default {
  name: "UserContent",
  components: {
    TableList,
    // TopBar,
  },
  mixins: [table, pagination],
  props: {
    isCheck: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      loading: false,
      companyNameList: [],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "重置密码",
      },
      tableData: [],
      tableItemData: [
        { prop: "name", label: "姓名" },
        { prop: "companyName", label: "归属公司" },
        { prop: "officeName", label: "归属机构" },
        { prop: "loginName", label: "登录名" },
        { prop: "phone", label: "电话" },
        { prop: "mobile", label: "手机" },
      ],
      searchData: {
        companyId: "",
        loginName: "",
      },
      oldSearchData: {
        companyId: "",
        loginName: "",
      },
      selectionListIds: [],
    };
  },
  methods: {
    selectChange(val) {
      const tableIds = this.tableData.map((item) => {
        return item.id;
      });
      tableIds.forEach((item) => {
        const index = this.selectionListIds.findIndex((id) => {
          return id == item;
        });
        if (index !== -1) {
          this.selectionListIds.splice(index, 1);
        }
      });
      this.selectionListIds = this.selectionListIds.concat(
        val.map((item) => item.id)
      );
    },
    pagination(value) {
      //判断有无搜索条件
      const params = this.searchData
        ? Object.assign(
            { pageNo: value.page, pageSize: value.limit },
            this.searchData
          )
        : { pageNo: value.page, pageSize: value.limit };
      this.getTableList(params);
    },
    async CompanyDataList() {
      const res = await CompanyDataList();
      this.companyNameList = res.data;
    },
    getTableList(params) {
      this.loading = true;
      getTableList(params).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        this.loading = false;
        this.$nextTick(() => {
          const ids = this.selectionListIds;
          let rows = [];
          ids.forEach((element) => {
            const id = this.tableData.filter((item) => item.id === element);
            rows.push(...id);
          });
          this.$refs["TableList"].toggleSelection(rows);
        });
      });
    },
    //删除操作
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该公司, 是否继续?");
    },
    tableItemAdd(value) {
      this.itemReset(value, "此操作将重置该用户密码, 是否继续?");
    },
    itemReset(value, title) {
      console.log(value);
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.resetConfirm(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    resetConfirm(value) {
      const params = {
        id: value.id,
      };
      PasswordReset(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "重置成功!",
          });
          this.getTableList();
        } else {
          this.$message({
            type: "warning",
            message: res.data,
          });
        }
      });
    },
    deleteConfirm(value) {
      const params = {
        id: value.id,
      };
      deleteUserItem(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTableList();
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
