<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <el-form :inline="true" class="searchForm" style="width: 800px">
          <el-form-item label="任务名称">
            <el-input placeholder="请输入任务名称" v-model="oldSearchData.name" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="公司:" style="margin-left: 20px">
            <el-select placeholder="请选择公司：" v-model="oldSearchData.id" clearable filterable>
              <el-option v-for="item in companyNameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          <!-- 数据列 -->
          <el-table-column prop="companyName" label="公司" align="center"> </el-table-column>
          <el-table-column prop="name" label="任务名称" align="center"> </el-table-column>
          <el-table-column prop="endtime" label="巡检时间" align="center"> </el-table-column>
          <!-- <el-table-column prop="remindtime" label="提醒时间" align="center"> </el-table-column>-->
          <!-- <el-table-column prop="reminderName" label="提醒人" align="center"> </el-table-column> -->
          <el-table-column prop="configtime" label="配置时间" align="center"> </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.state === "1" ? "暂停" : "正常" }}
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" align="center"> </el-table-column>
          <el-table-column label="操作" align="center" width="260">
            <template slot-scope="scope">
              <el-button class="button" size="mini" @click="tableItemEdit(scope.row)">修改</el-button>
              <el-button class="button" size="mini" type="danger" @click="tableItemDelete(scope.row)">删除</el-button>
              <el-button class="button" size="mini" type="primary" @click="tableItemAdd(scope.row, 0)" v-if="scope.row.state === '0'">暂停</el-button>
              <el-button class="button" size="mini" type="primary" @click="tableItemAdd(scope.row, 1)" v-if="scope.row.state === '1'">启动</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          style="padding: 0"
          @pagination="pagination"
          v-show="total > 1"
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
        ></Pagination>
      </div>
      <div slot="second">
        <PatrolForm
          ref="Form"
          :fromStatus="fromStatus"
          :allSelect="allSelect"
          :companyNameList="companyNameList"
          :reminderNameList="reminderNameList"
          @navBack="navBack"
        ></PatrolForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import PatrolForm from "./PatrolForm.vue";
import { getTableList, getAllSelectData, deleteTast, changeStatus } from "@/api/FunctionMenu/Allocation/PatrolMangement/index";
export default {
  name: "PatrolManagement", //巡检任务管理
  components: { NavTable, TableList, PatrolForm, Pagination },
  mixins: [table],
  data() {
    return {
      activeName: "first",
      oldSearchData: { name: "", id: "" },
      searchData: {
        name: "",
        id: "",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      companyNameList: [],
      shipList: [],
      reminderNameList: [],
      allSelect: [],
      tabList: [
        { label: "企业任务配置列表", name: "first" },
        { label: "企业任务配置添加", name: "second" },
      ],
      tabSecond: {
        add: "企业任务配置添加",
        edit: "企业任务配置修改",
      },
      TableActionItem: {
        label: "操作",
        add: "暂停",
        edit: "修改",
        delete: "删除",
      },

      fromStatus: "add",
      loading: true,
    };
  },
  methods: {
    getTableList(params) {
      getTableList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.loading = false;
          this.total = res.data.total;
        }
      });
    },
    pagination(value) {
      const params = {
        pageSize: value.limit,
        pageNo: value.page,
      };
      this.getTableList(params);
    },
    getAllSelectData() {
      getAllSelectData().then((res) => {
        if (res.code == 200) {
          this.allSelect = res.data;
          this.shipList = res.data.map((item) => item.shipS).flat(Infinity);
          this.reminderNameList = res.data
            .map((item) => {
              this.companyNameList.push({
                name: item.name,
                id: item.id,
              });
              if (item.userS.length > 0) {
                return item.userS;
              }
            })
            .filter((item) => item)
            .flat(Infinity);
        }
      });
    },
    changeTabItem(value) {
      this.fromStatus = "add";
      if (value === "first") {
        this.tabList[1].label = "企业任务配置添加";
        this.getTableList({ pageNo: 1, pageSize: 10 });
      }
      this.$refs.Form.$refs.ruleForm.resetFields();

      this.$refs.Form.ruleForm = {
        companyid: "",
        endtime: "",
        remindtime: "",
        reminder: [],
        id: "",
      };
    },
    tableItemEdit(value) {
      const year = Number(value.endtime.split(" ")[0].split("-")[0]);
      const month = Number(value.endtime.split(" ")[0].split("-")[1]);
      const day = Number(value.endtime.split(" ")[0].split("-")[2]);
      const hour = Number(value.endtime.split(" ")[1].split(":")[0]);
      const minute = Number(value.endtime.split(" ")[1].split(":")[1]);
      const second = Number(value.endtime.split(" ")[1].split(":")[2]);

      const newValue = {
        id: value.id,
        companyid: value.companyid,
        endtime: new Date(year, month, day, hour, minute, second),
        // remindtime: new Date(value.remindtime.replace(/-/g, "/")),
        // reminder: value.reminder.split(",").filter((item) => item),
      };

      this.fromStatus = "edit";
      this.tabList[1].label = this.tabSecond.edit;
      this.$refs["Form"].ruleForm = newValue;
      this.$refs["NavTable"].activeValue = "second";
    },
    tableItemDelete(value) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTast(value.id).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.getTableList({ pageNo: this.currentPage, pageSize: this.pageSize });
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
    tableItemAdd(value, type) {
      this.$confirm("确定暂停吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          changeStatus(value.id, type).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getTableList({ pageNo: this.currentPage, pageSize: this.pageSize });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    navBack() {
      this.fromStatus = "add";
      this.tabList[1].label = "企业任务配置添加";
      this.$refs["NavTable"].activeValue = "first";
      this.getTableList({ pageNo: 1, pageSize: 10 });
      this.$refs.Form.$refs.ruleForm.resetFields();
    },
  },
  mounted() {
    this.getAllSelectData();
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
