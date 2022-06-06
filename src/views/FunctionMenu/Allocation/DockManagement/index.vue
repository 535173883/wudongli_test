<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="DockManagementLists">
        <el-form :inline="true" class="searchForm" style="text-align: left; padding-left: 20px">
          <el-form-item label="名称:">
            <el-input placeholder="请输入名称" v-model="searchName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="公司:" style="margin-left: 20px">
            <el-select placeholder="请选择公司" v-model="searchCompany" clearable filterable>
              <el-option v-for="item in companyList" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
          :row-style="{ color: '#334681' }"
          ref="table"
          v-loading="loading"
        >
          <el-table-column prop="name" label="船坞" align="center"> </el-table-column>
          <el-table-column prop="companyName" label="公司名称" align="center"> </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.type == "1" ? "码头" : "船坞" }}
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" align="center"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button class="button" size="mini" @click="tableItemEdit(scope.row)">修改</el-button>
              <el-button class="button" size="mini" type="danger" @click="tableItemDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></Pagination>
      </div>
      <div slot="DockManagementAdd">
        <FormDetail :companyList="companyList" :formStatus="formStatus" ref="FormDetail" @navBack="navBack"></FormDetail>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { getWharfManagementList, getCompany, deleteData } from "@/api/FunctionMenu/Allocation/WharfManagement/index";
import FormDetail from "./FormDetail.vue";
export default {
  name: "DockManagement", //码头管理
  components: { NavTable, FormDetail, Pagination },
  data() {
    return {
      activeName: "DockManagementLists",
      searchName: "",
      searchCompany: "",
      companyList: [],
      tabList: [
        { label: "企业船坞列表", name: "DockManagementLists" },
        { label: "企业船坞添加", name: "DockManagementAdd" },
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      formStatus: "add",
      loading: true,
    };
  },
  methods: {
    getTableList(pageNo = 1, pageSize = 10, obj) {
      let params = {
        pageSize,
        pageNo,
        type: 2,
      };
      if (obj) {
        params = Object.assign(obj, params);
      }
      getWharfManagementList(params).then((res) => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.loading = false;
          this.tableData = res.data.records;
        }
      });
    },
    getCompany() {
      getCompany().then((res) => {
        if (res.code == 200) {
          this.companyList = res.data;
        }
      });
    },
    tableItemEdit(value) {
      this.$refs["NavTable"].activeValue = "DockManagementAdd";
      this.tabList[1].label = "企业船坞修改";
      this.formStatus = "edit";
      this.$refs.FormDetail.formData = {
        name: value.name,
        companyName: value.companyid,
        remarks: value.remarks,
        id: value.id,
      };
      this.$refs.NavTable;
    },
    tableItemDelete(value) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteData(value.id, 2).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getTableList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    pagination(value) {
      const obj = {
        name: this.searchName,
        companyid: this.searchCompany,
      };
      this.getTableList(value.page, value.limit, obj);
    },
    changeTabItem(value) {
      this.formStatus = "add";
      this.$refs.FormDetail.$refs.formData.resetFields();
      this.tabList[1].label = "企业船坞添加";
    },
    navBack() {
      this.formStatus = "add";
      this.$refs["NavTable"].activeValue = "DockManagementLists";
      this.getTableList();
      this.tabList[1].label = "企业船坞添加";
    },
    search() {
      const obj = {
        name: this.searchName,
        companyid: this.searchCompany,
      };
      this.getTableList(1, 10, obj);
    },
  },
  mounted() {
    this.getTableList();
    this.getCompany();
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
.el-form-item {
  ::v-deep .el-form-item__content {
    height: 30px;
    .el-select,
    .el-input {
      input {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
