<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <div class="topbar">
          <div class="search-item">
            <small class="search-title">日期：</small>
            <el-date-picker
              v-model="oldSearchData"
              type="daterange"
              class="search-input"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <el-button type="primary" @click="dateSearch" icon="el-icon-search" class="search-button" size="mini">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          row-key="id"
          ref="table"
          style="width: 100%; margin-bottom: 20px"
          :row-style="{ cursor: 'pointer' }"
          :row-class-name="tableRowClassName"
          @row-click="rowClick"
        >
          <el-table-column v-for="item in tableItemData" :key="item.label" :prop="item.prop" :label="item.label" align="center"> </el-table-column>
        </el-table>
        <PaginationPage @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <el-form ref="Form" label-position="right" label-width="120px" style="width: 600px; margin-left: 40px" :model="temp">
          <el-form-item label="通知:" prop="editContent">
            <el-input v-model="temp.editContent" :rows="15" type="textarea" />
          </el-form-item>
          <el-form-item class="footer">
            <el-button @click="goback()" size="mini">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import pagination from "@/Mixins/pagination";
import NavTable from "@/components/NavTable.vue";
import { getMechanismNoticeList, changeItemStatus } from "@/api/FunctionMenu/Notice/index";
import { formatDate } from "@/utils/validate";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "NoticePage",
  mixins: [table, pagination],
  components: {
    NavTable,
  },
  data() {
    return {
      temp: {
        editContent: "",
      },
      oldSearchData: [],
      searchData: {
        startTime: "",
        endTime: "",
      },
      activeName: "first",
      tabList: [
        { label: "通知列表", name: "first" },
        {
          label: "通知详情",
          name: "second",
        },
      ],
      tableData: [],
      tableItemData: [
        {
          prop: "header",
          label: "通知简介",
        },
        {
          prop: "releaseTime",
          label: "时间",
        },
      ],
    };
  },
  methods: {
    goback() {
      this.$refs["NavTable"].activeValue = "first";
      this.temp.editContent = "";
      this.dateSearch();
    },
    changeTabItem(value) {
      if (value === "first") {
        this.temp.editContent = "";
        this.dateSearch();
      }
    },
    rowClick(row) {
      const parmas = {
        id: row.wobId,
      };
      changeItemStatus(parmas).then(() => {
        this.temp.editContent = cloneDeep(row.editContent);
        this.$refs["NavTable"].activeValue = "second";
        return;
      });
    },
    tableRowClassName({ row }) {
      if (row.whetherRead === "1") {
        return "read-row";
      } else if (row.whetherRead === "0") {
        return "unread-row";
      }
      return "";
    },
    getTableList(params) {
      getMechanismNoticeList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.currentPage = res.data.current;
          this.pageSize = res.data.size;
        }
      });
    },
    dateSearch() {
      if (!this.oldSearchData || !this.oldSearchData.length) {
        this.getTableList({ pageNo: 1, pageSize: 10 });
        return;
      }
      this.searchData.startTime = formatDate(this.oldSearchData[0].getTime(), "yyyy-MM-dd hh:mm:ss");
      this.searchData.endTime = formatDate(this.oldSearchData[1].getTime(), "yyyy-MM-dd hh:mm:ss");
      const params = Object.assign({ pageNo: 1, pageSize: 10 }, this.searchData);
      this.getTableList(params);
    },
    pagination(value) {
      if (this.oldSearchData && this.oldSearchData.length > 0) {
        const params = Object.assign({ pageNo: value.page, pageSize: value.limit }, this.searchData);
        this.getTableList(params);
      } else {
        this.getTableList({ pageNo: value.page, pageSize: value.limit });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
$color: #334681;
@import url("@/styles/common/table.scss");
@import "@/styles/common/topbar.scss";
@import url("@/styles/common/form.scss");
::v-deep .el-table {
  .read-row {
    color: rgba(85, 86, 88, 0.9);
  }
  .unread-row {
    color: "#334681";
    font-weight: 600;
  }
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: inherit;
  }
}
.search {
  padding: 20px;
  display: flex;
  align-items: center;
  .search-item {
    margin-right: 25px;
  }
}
::v-deep .el-date-editor .el-range-separator {
  padding: 0;
}
::v-deep .el-form-item__label {
  color: $color;
}
.footer {
  text-align: end;
}
</style>
