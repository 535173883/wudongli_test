<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="RoleAllocationLists">
        <el-form :inline="true" class="searchForm" style="text-align: left; padding-left: 20px">
          <el-form-item label="名称:">
            <el-input placeholder="请输入名称" v-model="searchName" style="width: 200px"></el-input>
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
          <el-table-column prop="rolename" label="角色名称" align="center"> </el-table-column>
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
      <div slot="RoleAllocationAdd">
        <FormDetail :formStatus="formStatus" ref="FormDetail" @navBack="navBack"></FormDetail>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { getRoleList, deleteRole } from "@/api/FunctionMenu/Allocation/RoleAllocation/index";
import FormDetail from "./FormDetail.vue";
export default {
  name: "RoleAllocation", //角色配置
  components: { NavTable, FormDetail, Pagination },
  data() {
    return {
      activeName: "RoleAllocationLists",
      searchName: "",
      tabList: [
        { label: "角色配置列表", name: "RoleAllocationLists" },
        { label: "角色配置添加", name: "RoleAllocationAdd" },
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
      };
      if (obj) {
        params = Object.assign(obj, params);
      }
      getRoleList(params).then((res) => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.loading = false;
          this.tableData = res.data.records;
        }
      });
    },

    tableItemEdit(value) {
      this.$refs["NavTable"].activeValue = "RoleAllocationAdd";
      this.tabList[1].label = "角色配置修改";
      this.formStatus = "edit";
      this.$refs.FormDetail.formData = {
        rolename: value.rolename,
        remarks: value.remarks,
        id: value.id,
      };
    },
    tableItemDelete(value) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole(value.id, 1).then((res) => {
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
        requestVo: this.searchName,
      };
      this.getTableList(value.page, value.limit, obj);
    },
    changeTabItem(value) {
      this.formStatus = "add";
      this.$refs.FormDetail.$refs.formData.resetFields();
      this.tabList[1].label = "角色配置添加";
    },
    navBack() {
      this.formStatus = "add";
      this.$refs["NavTable"].activeValue = "RoleAllocationLists";
      this.getTableList();
      this.tabList[1].label = "角色配置添加";
    },
    search() {
      const obj = {
        requestVo: this.searchName,
      };
      this.getTableList(1, 10, obj);
    },
  },
  mounted() {
    this.getTableList();
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
