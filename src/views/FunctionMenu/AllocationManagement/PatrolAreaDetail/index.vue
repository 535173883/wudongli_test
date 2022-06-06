<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="PatrolAreaDetailLists">
        <div class="search">
          <span style="font-size: 14px; font-weight: 700; color: #606266">搜索关键字：</span>
          <el-input placeholder="请输入关键字" v-model="search" style="width: 200px"></el-input>
        </div>
        <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border stripe :data="tables" ref="table">
          <el-table-column prop="name" label="名称" align="center"> </el-table-column>
          <el-table-column prop="choosetypeconfigids" label="选项类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.choosetypeconfigids | filterChoosetypeConfig(ChoosetypeConfig) }}
            </template>
          </el-table-column>
          <el-table-column prop="xjareaconfig" label="巡检区域" align="center"> </el-table-column>
          <el-table-column prop="remarks" label="备注" align="center"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" @click="delete_(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <PaginationPage @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="PatrolAreaDetailAdd">
        <ListForm
          :formStatus="formStatus"
          :ChoosetypeConfig="ChoosetypeConfig"
          :EchoData="EchoData"
          @navTableBack="navTableBack"
          ref="ListForm"
        ></ListForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
// import TableList from "@/components/TableList/index.vue";
import ListForm from "./ListForm.vue";
import { getList, deleteArea, getChoosetypeConfig } from "@/api/FunctionMenu/AllocationManagement/PatrolAreaDetail/index";

export default {
  name: "PatrolAreaDetail", //巡检区域内容配置
  components: { NavTable, ListForm },
  data() {
    return {
      search: "",
      activeName: "PatrolAreaDetailLists",
      tabList: [
        { label: "巡检区域内容配置列表", name: "PatrolAreaDetailLists" },
        { label: "巡检区域内容配置添加", name: "PatrolAreaDetailAdd" },
      ],
      tableData: [],
      formStatus: "add",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      ChoosetypeConfig: [],
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
  filters: {
    filterChoosetypeConfig(value, list) {
      let value_ = value.split(",");

      let final = [];
      value_.forEach((item) => {
        list.filter((v) => {
          if (v.id === item) {
            final.push(v.name);
          }
        });
      });
      return final.toString();
    },
  },
  methods: {
    async getList(data) {
      const result = await getList(data);
      if (result.code == 200) {
        this.tableData = result.data.records;
        this.total = result.data.total;
      }
    },
    getChoosetypeConfig() {
      getChoosetypeConfig().then((res) => {
        if (res.code == 200) {
          this.ChoosetypeConfig = res.data;
        }
      });
    },
    pagination(value) {
      this.getList({ pageNo: value.page, pageSize: value.limit });
    },
    edit(row) {
      this.formStatus = "edit";
      let data = JSON.parse(JSON.stringify(row));
      this.EchoData = data;
      this.EchoData.choosetypeconfigids = this.EchoData.choosetypeconfigids.split(",");
      this.$refs["NavTable"].activeValue = "PatrolAreaDetailAdd";
      this.tabList[1].label = "巡检区域内容配置修改";
    },
    delete_(id) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArea(id).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getList({ pageNo: 1, pageSize: 10 });
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
    changeTabItem(value) {
      if (value === "PatrolAreaDetailLists") {
        this.activeName = value;
        this.tabList[1].label = "巡检区域内容配置添加";
      }
      this.formStatus = "add";
      this.$refs.ListForm.$refs.formData.resetFields();
    },
    navTableBack(type) {
      if (type == 2) {
        this.getList({ pageNo: 1, pageSize: 10 });
      }
      this.$refs["NavTable"].activeValue = "PatrolAreaDetailLists";
      this.tabList[1].label = "巡检区域内容配置添加";
      this.$refs.ListForm.$refs.formData.resetFields();
    },
  },
  mounted() {
    this.getChoosetypeConfig();
    this.getList({ pageNo: 1, pageSize: 10 });
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
