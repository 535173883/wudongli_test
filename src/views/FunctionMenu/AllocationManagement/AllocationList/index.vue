<template>
  <div>
    <NavTable :tabList="tabList" :active="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <div class="search">
          <div class="search-Box"></div>
          <el-form :inline="true" class="demo-form-inline" style="width: 450px; line-height: 40px">
            <el-form-item label="配置名称:">
              <el-input placeholder="请输入配置名称" v-model="search"></el-input>
            </el-form-item>
          </el-form>
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
        <ListForm @navTableBack="navTableBack" :fromStatus="fromStatus" ref="ListForm"></ListForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import ListForm from "../AllocationList/ListForm.vue";
import cloneDeep from "lodash/cloneDeep";
import { getList, deleteList } from "@/api/FunctionMenu/AllocationManagement/AllocationList";
export default {
  name: "AllocationList",
  components: { NavTable, TableList, ListForm },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogVisible: false,
      fromStatus: "add",
      activeName: "first",
      tabList: [
        { label: "无动力配置列表", name: "first" },
        { label: "无动力配置添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
      },
      tableItemData: [
        { prop: "configName", label: "配置名称" },
        { prop: "configValue", label: "配置值" },
        { prop: "configDesc", label: "配置说明" },
        { prop: "remarks", label: "备注" },
      ],
      search: "", //搜索
      timeout: null,
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
    // 获取个人信息
    async getList(params) {
      const res = await getList(params);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    // 搜索
    // 修改
    tableItemEdit(value) {
      this.fromStatus = "edit";
      this.tabList[1].label = "无动力配置修改";
      this.$refs["ListForm"].formData = cloneDeep(value);
      this.$refs["NavTable"].activeValue = "second";
    },
    //添加

    // 删除
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该文件, 是否继续?");
    },
    itemDelete(value, title) {
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteConfirm(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteConfirm(value) {
      const params = {
        id: value.id,
      };
      deleteList(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
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
    // 分页
    pagination(value) {
      this.getList({ pageNo: value.page, pageSize: value.limit });
    },
    // 返回
    navTableBack(type) {
      if (type) {
        this.getList();
      }
      this.$refs["NavTable"].activeValue = "first";
      this.tabList[1].label = "无动力配置添加";
    },
    changeTabItem(value) {
      this.fromStatus = "add";
      if (value === "first") {
        this.$refs.ListForm.$refs.formData.resetFields();
        this.activeName = value;
        this.tabList[1].label = "无动力配置添加";
      }
    },
  },
  mounted() {
    // 获取数据
    this.getList({ pageNo: 1, pageSize: 10 });
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 1rem;
  text-align: left;
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
