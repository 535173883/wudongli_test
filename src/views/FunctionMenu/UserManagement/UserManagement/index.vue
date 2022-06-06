<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      ref="NavTable"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'areaId', 'id');
        }
      "
    >
      <div slot="first">
        <div class="topbar">
          <div class="search-item">
            <small class="search-title">公司名称:</small>
            <el-select
              class="search-input"
              style="width: 180px"
              v-model="oldSearchData.companyId"
              clearable
            >
              <el-option
                v-for="item in companyNameList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search-item">
            <small class="search-title">姓名:</small>
            <el-input
              clearable
              v-model="oldSearchData.userName"
              class="search-input"
              placeholder="请输入"
              style="width: 180px"
            ></el-input>
          </div>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search-button"
            size="mini"
            @click="search"
            >搜索</el-button
          >
        </div>
        <TableList
          ref="TableList"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemDelete="tableItemDelete"
          @tableItemAdd="tableItemAdd"
          @tableItemEdit="tableItemEdit"
        ></TableList>
        <PaginationPage
          @pagination="pagination"
          v-show="total > 0"
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
        ></PaginationPage>
        <el-dialog
          :visible.sync="RoleDialogVisible"
          title="角色分配"
          :show-close="false"
          class="dialog"
          width="630px"
        >
          <RoleContent ref="RoleContent"></RoleContent>
          <span slot="footer">
            <el-button @click="roleCancel('RoleContent')" size="mini"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="RoleConfirm('RoleContent')"
              size="mini"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <div slot="second">
        <Form
          @showDialog="showDialog"
          @navTableBack="navTableBack"
          :companyNameList="companyNameList"
          :fromStatus="fromStatus"
          @changeTabItem="changeTabItem"
          ref="Form"
        ></Form>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          title="选择区域"
          :treeData="treeData"
          @getFatherMes="getFatherMes"
          treeLabel="name"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import pagination from "@/Mixins/pagination";
import table from "@/Mixins/table";
import navTable from "@/Mixins/navTable";
import { getAreaList } from "@/api/systemSettings/organizationUser/area";
import { CompanyDataList } from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";
import {
  UserDataDelete,
  GetWXUserData,
  editRoleSetting,
  queryRoleSetting,
} from "@/api/FunctionMenu/UserManagement/UserManagement";
import RoleContent from "./components/RoleContent.vue";
import SelectDialog from "@/components/SelectDialog/index.vue";
import Form from "./components/Form.vue";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "./components/TableList.vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "UserManagement",
  mixins: [table, pagination, navTable],
  components: {
    Form,
    NavTable,
    TableList,
    SelectDialog,
    RoleContent,
  },
  data() {
    return {
      searchData: {
        companyId: "",
        userName: "",
      },
      oldSearchData: {
        companyId: "",
        userName: "",
      },
      dialogVisible: false,
      RoleDialogVisible: false,
      itemValue: {},
      treeData: [],
      tabList: [
        { label: "用户列表", name: "first" },
        { label: "用户添加", name: "second" },
      ],
      activeName: "first",
      tableData: [],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "角色管理",
      },
      tabSecond: {
        add: "用户添加",
        edit: "用户修改",
      },
      tableItemData: [
        { prop: "companyName", label: "公司" },
        { prop: "userName", label: "姓名" },
        { prop: "phone", label: "联系电话" },
        { prop: "nickName", label: "昵称" },
        { prop: "roleName", label: "角色" },
      ],
      fromStatus: "add", //添加或者修改状态   添加：add    修改：edit
      companyNameList: [],
    };
  },
  methods: {
    roleCancel(formName) {
      this.$refs[formName].$refs["TableList"]["$refs"][
        "table"
      ].clearSelection();
      this.$refs[formName].$refs["TableList"].checkedData = {};
      this.RoleDialogVisible = false;
    },
    async RoleConfirm(formName) {
      const roleID = this.$refs[formName].$refs["TableList"].checkedData.id;
      if (roleID) {
        const params = {
          userId: this.itemValue.id,
          roleId: roleID,
        };
        const res = await editRoleSetting(params);
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.RoleDialogVisible = false;
          this.$refs[formName].$refs["TableList"]["$refs"][
            "table"
          ].clearSelection();
          this.$refs[formName].$refs["TableList"].checkedData = {};
          this.getTableList({
            pageNo: this.currentPage,
            pageSize: this.pageSize,
          });
        } else {
          this.$message.error(res.data);
        }
      } else {
        this.roleCancel("RoleContent");
      }
    },
    async CompanyDataList() {
      const res = await CompanyDataList();
      this.companyNameList = res.data;
    },
    async getTableList(params) {
      const res = await GetWXUserData(params);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      UserDataDelete(params)
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
    showDialog() {
      //查询区域表
      getAreaList().then((res) => {
        this.treeData = res.data[0].children;
        this.dialogVisible = true;
      });
    },
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该用户, 是否继续?");
    },
    getFatherMes(value) {
      this.$refs["Form"].temp.areaId = value.id;
      this.$refs["Form"].temp.areaName = value.name;
    },
    tableItemAdd(value) {
      this.RoleDialogVisible = true;
      this.itemValue = value;
      queryRoleSetting({ userId: value.id }).then((res) => {
        const id = res.data[0];
        this.$refs["RoleContent"].clickId = id;
        this.$refs["RoleContent"].getTableList();
      });
    },
    tableItemEdit(value) {
      console.log(value);
      this.fromStatus = "edit";
      this.tabList[1].label = this.tabSecond.edit;
      const params = value.companyId;
      this.$refs["Form"].queryOrganization(params);
      this.$refs["Form"].temp = cloneDeep(value);
      this.$refs["NavTable"].activeValue = "second";
      this.$forceUpdate();
    },
  },
  mounted() {
    this.CompanyDataList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/topbar.scss";
::v-deep .el-dialog__header {
  border-bottom: 1px solid #ccc;
  background: #f9fbff;
  font-weight: bolder;
  padding: 20px 20px 20px;
  .el-dialog__title {
    font-size: 22px;
  }
}

::v-deep .el-dialog__body {
  height: 560px;
}
</style>
