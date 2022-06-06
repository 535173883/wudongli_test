<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <!-- 搜索 -->
        <div class="search">
          <el-form :inline="true" class="demo-form-inline" style="line-height: 40px">
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
        <OptionalForm ref="AreaForm" :fromStatus="fromStatus" @navTableBack="navTableBack"></OptionalForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import OptionalForm from "../PatrolOptional/OptionalForm.vue";
import cloneDeep from "lodash/cloneDeep";
import { getList, deleteList } from "@/api/FunctionMenu/AllocationManagement/PatrolOptional";
export default {
  name: "PatrolOptional", //巡检选项配置
  components: { NavTable, TableList, OptionalForm },
  data() {
    return {
      activeName: "first",
      tableData: [],
      tabList: [
        { label: "巡检选项配置列表", name: "first" },
        { label: "巡检选项配置添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
      },
      tableItemData: [
        { prop: "name", label: "名称" },
        { prop: "type", label: "类型" },
        { prop: "remarks", label: "备注" },
      ],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "", //搜索
      fromStatus: "add",
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
      console.log(res.data.records);
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    // 搜索
    // 修改
    tableItemEdit(value) {
      console.log(value);
      this.fromStatus = "edit";
      this.tabList[1].label = "巡检选项配置修改";
      this.$refs["AreaForm"].formData = cloneDeep(value);
      this.$refs["NavTable"].activeValue = "second";
    },
    // 删除
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除, 是否继续?");
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
      console.log(value);
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
        this.getList({ pageNo: 1, pageSize: 10 });
      }
      this.$refs["NavTable"].activeValue = "first";
      this.tabList[1].label = "巡检选项配置添加";
    },
    changeTabItem(value) {
      if (value === "first") {
        this.activeName = value;
        this.tabList[1].label = "巡检选项配置添加";
      }
      this.fromStatus = "add";
      this.$refs.AreaForm.$refs.formData.resetFields();
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
  text-align: left;
  padding-left: 10px;
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
