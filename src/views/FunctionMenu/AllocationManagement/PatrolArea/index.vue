<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <div class="search">
          <span style="font-size: 14px; font-weight: 700; color: #606266">搜索关键字：</span>
          <el-input placeholder="请输入关键字" v-model="search" style="width: 200px"></el-input>
        </div>
        <TableList
          :tableData="tables"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
        ></TableList>
        <PaginationPage @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <ListForm :EchoData="EchoData" @navTableBack="navTableBack" ref="ListForm" :fromStatus="fromStatus"></ListForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import PaginationPage from "@/components/Pagination/index.vue";
import ListForm from "./ListForm.vue";
import { getTableList, deleteData } from "@/api/FunctionMenu/AllocationManagement/PatrolArea/index";
export default {
  name: "PatrolArea", //巡检区域配置
  components: { NavTable, TableList, PaginationPage, ListForm },
  data() {
    return {
      search: "",
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogVisible: false,
      fromStatus: "add",
      tabList: [
        { label: "巡检区域配置列表", name: "first" },
        { label: "巡检区域配置添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
      },
      tableItemData: [
        { prop: "name", label: "名称" },
        { prop: "remarks", label: "备注" },
      ],

      EchoData: {},
    };
  },
  computed: {
    tables: function () {
      var search = this.search;
      if (search) {
        return this.tableData.filter(function (dataNews) {
          return Object.keys(dataNews).some(function (key) {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
  methods: {
    pagination(value) {
      this.getTableList(value.page, value.limit);
    },
    getTableList(pageNo = 1, pageSize = 10) {
      getTableList({ pageNo, pageSize }).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    tableItemEdit(value) {
      this.fromStatus = "edit";
      let data = JSON.parse(JSON.stringify(value));
      this.EchoData = data;
      this.$refs["NavTable"].activeValue = "second";
      this.tabList[1].label = "无动力巡检区域配置修改";
    },
    tableItemDelete(value) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteData({ id: value.id }).then((res) => {
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
    navTableBack(type) {
      if (type == 2) {
        this.getTableList();
      }
      this.$refs["NavTable"].activeValue = "first";
      this.tabList[1].label = "无动力巡检区域配置添加";
      this.$refs.ListForm.$refs.formData.resetFields();
    },
    changeTabItem(value) {
      if (value === "first") {
        this.activeName = value;
        this.tabList[1].label = "无动力巡检区域配置添加";
      }
      this.fromStatus = "add";
      this.$refs.ListForm.$refs.formData.resetFields();
    },
  },
  mounted() {
    this.getTableList();
  },
};
</script>

<style lang="scss" scoped>
.search {
  text-align: left;
  padding: 0 15px 15px;
}
::v-deep .el-input {
  input {
    height: 30px;
    line-height: 30px;
  }
}
</style>
