<template>
  <div>
    <NavTable :tabList="tabList" :active="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <div class="search">
          <el-form :inline="true" class="searchForm">
            <el-form-item label="公司:" v-if="userType !== '0'">
              <el-select v-model="formData.company" clearable filterable>
                <el-option v-for="item in companyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="船舶名称:">
              <el-select v-model="formData.shipName" clearable filterable>
                <el-option v-for="item in shipNameList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select v-model="formData.state" clearable filterable>
                <el-option v-for="item in stateList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-button type="primary" size="mini" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <TableList
          ref="TableList"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemAdd="tableItemAdd"
        ></TableList> -->

        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          ref="TableList"
          v-loading="loading"
          :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
          :row-style="{ color: '#334681' }"
        >
          <el-table-column label="公司名称" prop="companyName" align="center"> </el-table-column>
          <el-table-column label="巡检任务" prop="tname" align="center" width="150"> </el-table-column>
          <el-table-column label="船舶名称" prop="shiname" align="center"> </el-table-column>
          <el-table-column label="国籍" prop="nationality" align="center"> </el-table-column>
          <el-table-column label="船型" prop="shiptype" align="center"> </el-table-column>
          <el-table-column label="停泊位置" prop="cname" align="center"> </el-table-column>
          <el-table-column label="类型" prop="type" align="center"> </el-table-column>
          <el-table-column label="船方联系人" prop="shipcontact" align="center" width="150"> </el-table-column>
          <el-table-column label="船方联系人电话" prop="shipcontactphone" align="center" width="200"> </el-table-column>
          <el-table-column label="公司联系人" prop="companycontact" align="center" width="150"> </el-table-column>
          <el-table-column label="公司联系人电话" prop="companycontactphone" align="center" width="200"> </el-table-column>
          <el-table-column label="无动力定位仪器" prop="positioninginstrument" align="center" width="180"> </el-table-column>
          <el-table-column label="状态" prop="iname" align="center"> </el-table-column>
          <el-table-column label="备注" prop="remarks" align="center"> </el-table-column>
          <el-table-column label="操作" align="center" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button class="button" size="mini" type="primary" @click="tableItemAdd(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <PaginationPage @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <PatrolStatusList :detail="detail"></PatrolStatusList>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
// import TableList from "@/components/TableList/index.vue";
import PatrolStatusList from "@/views/FunctionMenu/Patrol/PatrolHistory/components/PatrolStatusList.vue";
import { getList, getDetail } from "@/api/FunctionMenu/Patrol/PatrolHistory/index";
import { getCompany, getShipName, getState } from "@/api/FunctionMenu/Patrol/PatrolState/index";
import axios from "axios";
export default {
  name: "PatrolHistory", //巡检历史页面
  components: { NavTable, PatrolStatusList },
  data() {
    return {
      activeName: "first",
      tableData: [],
      tabList: [
        { label: "船舶巡检历史记录列表", name: "first" },
        { label: "船舶巡检历史记录详情", name: "second" },
      ],
      date: "",
      task: "",
      TableActionItem: {
        label: "操作",
        add: "详情",
      },
      tableItemData: [
        { prop: "companyName", label: "公司名称", align: "center" },
        { prop: "tname", label: "巡检任务", align: "center", width: 150 },
        { prop: "shiname", label: "船舶名称", align: "center" },
        { prop: "nationality", label: "国籍", align: "center" },
        { prop: "shiptype", label: "船型", align: "center" },
        { prop: "cname", label: "停泊位置", align: "center" },
        { prop: "type", label: "类型", align: "center" },
        { prop: "shipcontact", label: "船方联系人", align: "center", width: 150 },
        { prop: "shipcontactphone", label: "船方联系人电话", align: "center", width: 200 },
        { prop: "companycontact", label: "公司联系人", align: "center", width: 150 },
        { prop: "companycontactphone", label: "公司联系人电话", align: "center", width: 180 },
        { prop: "positioninginstrument", label: "无动力定位仪器", align: "center", width: 180 },
        { prop: "iname", label: "状态", align: "center" },
        { prop: "remarks", label: "备注", align: "center" },
      ],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      companyList: [],
      shipNameList: [],
      stateList: [],
      formData: {
        company: "",
        shipName: "",
        state: "",
      },
      detail: {
        jc: {
          zjzp: "",
        },
        jb: { qljzp: "", sfjmlzp: "", sfjgqdlszp: "" },
        ls: { hdlzp: "", qdlzp: "", hlzp: "", zlzp: "", qlzp: "" },
        qt: { cszrszp: "" },
      },
      loading: true,
      userType: window.sessionStorage.getItem("userType"),
    };
  },
  methods: {
    getAllSelect() {
      axios.all([getCompany(), getShipName(), getState()]).then(
        axios.spread((company, shipName, state) => {
          if (company.code == 200) {
            this.companyList = company.data;
          }
          if (shipName.code == 200) {
            this.shipNameList = shipName.data;
          }
          if (state.code == 200) {
            this.stateList = state.data;
          }
        })
      );
    },
    async getList(params) {
      const res = await getList(params);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
      this.loading = false;
    },
    // 分页
    pagination(value) {
      this.getList({
        pageNo: value.page,
        pageSize: value.limit,
        companyName: this.formData.company,
        shipName: this.formData.shipName,
        iname: this.formData.state,
      });
    },
    search() {
      this.getList({
        pageNo: 1,
        pageSize: 10,
        companyName: this.formData.company,
        shipName: this.formData.shipName,
        iname: this.formData.state,
      });
    },
    tableItemAdd(value) {
      getDetail(value.id).then((res) => {
        if (res.code == 200) {
          this.detail = res.data;
          this.detail = this.toolPicture(this.detail);
          this.detail.id = value.id;
          this.formStatus = "add";
          this.$refs.NavTable.activeValue = "second";
        }
      });
    },
    toolPicture(value) {
      !value.jc.zjzp && (value.jc.zjzp = "");
      !value.jb.qljzp && (value.jb.qljzp = "");
      !value.jb.sfjgqdlszp && (value.jb.sfjgqdlszp = "");
      !value.jb.sfjmlzp && (value.jb.sfjmlzp = "");
      !value.ls.hdlzp && (value.ls.hdlzp = "");
      !value.ls.qdlzp && (value.ls.qdlzp = "");
      !value.ls.hlzp && (value.ls.hlzp = "");
      !value.ls.zlzp && (value.ls.zlzp = "");
      !value.ls.qlzp && (value.ls.qlzp = "");
      !value.qt.cszrszp && (value.qt.cszrszp = "");
      return value;
    },
    changeTabItem() {
      this.detail = {
        jc: { zjzp: "" },
        jb: { qljzp: "", sfjmlzp: "", sfjgqdlszp: "" },
        ls: {
          hdlzp: "",
          qdlzp: "",
          hlzp: "",
          zlzp: "",
          qlzp: "",
        },
        qt: { cszrszp: "" },
      };
    },
  },
  mounted() {
    this.getAllSelect();
    this.getList({ pageNo: 1, pageSize: 10 });
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 1rem;
  text-align: left;
  .searchForm {
    line-height: 40px;
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
  }
}
@import url("@/styles/common/table.scss");
::v-deep .el-table {
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: hidden;
  }
  .cell.el-tooltip {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
