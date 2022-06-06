<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 1, 'officeId', 'areaId', 'id');
        }
      "
      ref="NavTable"
    >
      <div slot="first">
        <div class="topbar">
          <div class="search-item">
            <small class="search-title">公司名称:</small>
            <el-select class="search-input" style="width: 180px" v-model="oldSearchData.id" clearable filterable>
              <el-option v-for="item in companyNameList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div class="search-item">
            <small class="search-title">联系人:</small>
            <el-input clearable v-model="oldSearchData.contacts" class="search-input" placeholder="请输入" style="width: 180px"></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" class="search-button" size="mini" @click="search">搜索</el-button>
        </div>
        <TableList
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          :isCheck="loading"
        ></TableList>
        <PaginationPage @pagination="pagination" v-show="total > 1" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <Form @changeTabItem="changeTabItem" @showDialog="showDialog" ref="Form" @navTableBack="navTableBack" :fromStatus="fromStatus"></Form>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          :title="dialogVisibleTitle"
          :treeData="treeData"
          @getFatherMes="getFatherMes"
          treeLabel="name"
          ref="dialog"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import pagination from "@/Mixins/pagination";
import navTable from "@/Mixins/navTable";
import SelectDialog from "@/components/SelectDialog/index.vue";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import Form from "./Form.vue";
import { CompanyDataList } from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";
import { GetInstitutionData } from "@/api/systemSettings/organizationUser/institution";
import { getAreaList } from "@/api/systemSettings/organizationUser/area";
import { GetCompanyData, CompanyDataItemDelete } from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";
export default {
  name: "CompanyInfo",
  mixins: [table, pagination, navTable],
  components: {
    NavTable,
    TableList,
    Form,
    SelectDialog,
  },
  data() {
    return {
      loading: false,
      companyNameList: [],
      tableData: [],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
      },
      tableItemData: [
        { prop: "areaName", label: "区域" },
        { prop: "companyName", label: "公司名称" },
        { prop: "contacts", label: "联系人" },
        { prop: "telephone", label: "联系电话" },
      ],
      activeName: "first",
      tabSecond: {
        add: "公司添加",
        edit: "公司修改",
      },
      tabList: [
        { label: "公司列表", name: "first" },
        { label: "公司添加", name: "second" },
      ],
      fromStatus: "add",
      dialogVisible: false,
      dialogVisibleTitle: "选择区域",
      treeData: [],
      oldSearchData: { id: "", contacts: "" },
      searchData: {
        id: "",
        contacts: "",
      },
    };
  },
  methods: {
    async CompanyDataList() {
      const res = await CompanyDataList();
      this.companyNameList = res.data;
    },
    async getTableList(params) {
      this.loading = true;
      const res = await GetCompanyData(params);
      this.loading = false;
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该公司, 是否继续?");
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      CompanyDataItemDelete(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTableList({ pageNo: 1, pageSize: 10 });
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
    //选择区域
    showDialog(Id, Name, type) {
      if (type === "area") {
        getAreaList().then((res) => {
          this.dialogVisible = true;
          this.dialogVisibleTitle = "选择区域";
          this.treeData = res.data[0].children;
          setTimeout(() => {
            this.$refs["dialog"].$refs["tree"].defaultSelect(Id);
            this.$refs["dialog"].selectData = { id: Id, title: Name };
          }, 50);
        });
      } else if (type === "office") {
        GetInstitutionData().then((res) => {
          this.dialogVisible = true;
          this.dialogVisibleTitle = "选择机构";
          this.treeData = res.data;
          setTimeout(() => {
            this.$refs["dialog"].$refs["tree"].defaultSelect(Id);
            this.$refs["dialog"].selectData = { id: Id, title: Name };
          }, 50);
        });
      }
    },
    // 获取父级菜单
    getFatherMes(value) {
      if (this.dialogVisibleTitle === "选择区域") {
        this.$refs["Form"].temp.areaId = value.id;
        this.$refs["Form"].temp.areaName = value.name;
      } else if (this.dialogVisibleTitle === "选择机构") {
        this.$refs["Form"].temp.officeId = value.id;
        this.$refs["Form"].temp.officeName = value.name;
      }
    },
  },
  mounted() {
    this.CompanyDataList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/topbar.scss";
</style>
