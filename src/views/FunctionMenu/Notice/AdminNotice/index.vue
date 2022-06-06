<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active.sync="activeName"
      ref="NavTable"
      @changeTabItem="changeTabItem"
    >
      <div slot="first">
        <div class="search">
          <span>时间：</span>
          <el-date-picker
            v-model="dateSlot"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
        <!-- <TableList
          :tableData="tableData"
          :tableItemData="tableItemData"
          :showItemAction="true"
          :actionItem="actionItem"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          @tableItemAdd="tableItemAdd"
        ></TableList> -->
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
          :row-style="{ color: '#334681' }"
          ref="table"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="时间"
            prop="createDate"
            align="center"
          ></el-table-column>
          <el-table-column
            label="内容"
            prop="editContent"
            align="center"
          ></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.whetherIssued === "1" ? "已发布" : "未发布" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                class="button"
                size="mini"
                @click="tableItemEdit(scope.row)"
                :disabled="scope.row.whetherIssued === '1'"
                >修改</el-button
              >
              <el-button
                class="button"
                size="mini"
                type="danger"
                @click="tableItemDelete(scope.row)"
                >删除</el-button
              >
              <el-button
                class="button"
                size="mini"
                type="primary"
                @click="tableItemAdd(scope.row)"
                :disabled="scope.row.whetherIssued === '1'"
                >发布</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          v-if="total > 0"
          :total="total"
          :limit="pageSize"
          :page="pageNo"
          @pagination="pagination"
        ></Pagination>
      </div>
      <div slot="second">
        <ListForm :EchData="EchData" @navTableBack="navTableBack"></ListForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue";
import Pagination from "@/components/Pagination/index.vue";
import ListForm from "./ListForm.vue";
import {
  getAdminNoticeList,
  deleteNotice,
  releaseNotice,
} from "@/api/FunctionMenu/Notice/index";
import { formatDate } from "@/utils/validate";
export default {
  name: "adminNotice",
  components: {
    NavTable,
    ListForm,
    Pagination,
  },
  data() {
    return {
      activeName: "first",
      dateSlot: [],
      tabList: [
        { label: "经信局通知列表", name: "first" },
        { label: "经信局通知添加", name: "second" },
      ],
      tableData: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      EchData: {},
    };
  },
  methods: {
    getAdminNoticeList(
      pageNo = 1,
      pageSize = 10,
      startTime = "",
      endTime = ""
    ) {
      getAdminNoticeList(pageNo, pageSize, startTime, endTime).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.tableData.map((item) => {
            item.whetherIssued === "1"
              ? (item.status = "已发布")
              : (item.status = "未发布");
          });
          this.total = res.data.total;
        }
      });
    },
    search() {
      if (this.dateSlot && this.dateSlot.length > 0) {
        const time = [
          formatDate(this.dateSlot[0].getTime(), "yyyy-MM-dd"),
          formatDate(this.dateSlot[1].getTime(), "yyyy-MM-dd"),
        ];
        this.getAdminNoticeList(1, 10, time[0], time[1]);
      } else {
        this.getAdminNoticeList(1, 10);
      }
    },
    pagination(value) {
      if (this.dateSlot && this.dateSlot.length > 0) {
        const time = [
          formatDate(this.dateSlot[0].getTime(), "yyyy-MM-dd"),
          formatDate(this.dateSlot[1].getTime(), "yyyy-MM-dd"),
        ];
        this.getAdminNoticeList(value.page, value.limit, time[0], time[1]);
      } else {
        this.getAdminNoticeList(value.page, value.limit);
      }
    },
    tableItemEdit(value) {
      this.EchData = value;
      this.$refs.NavTable.activeValue = "second";
      this.tabList[1].label = "经信局通知修改";
    },
    tableItemDelete(value) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteNotice(value.id).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getAdminNoticeList();
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
    // 发布
    tableItemAdd(value) {
      this.$confirm("确定发布吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          releaseNotice(value.id).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getAdminNoticeList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    navTableBack() {
      this.getAdminNoticeList();
      this.$refs.NavTable.activeValue = "first";
      this.tabList[1].label = "经信局通知添加";
      this.EchData = {};
    },
    changeTabItem(value) {
      if (value === "first") {
        this.activeName = value;
        this.tabList[1].label = "经信局通知添加";
        this.EchData = {};
      }
    },
  },
  mounted() {
    this.getAdminNoticeList();
  },
};
</script>
<style scoped lang="scss">
.search {
  text-align: left;
  margin-bottom: 20px;
  .el-button {
    margin-left: 15px;
  }
}
::v-deep .el-date-editor .el-range-separator {
  padding: 0;
}

@import url("@/styles/common/table.scss");
::v-deep .el-table {
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: inherit;
  }
}
</style>
