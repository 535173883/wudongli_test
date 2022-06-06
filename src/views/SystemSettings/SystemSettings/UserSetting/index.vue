<template>
  <div class="container">
    <NavTable
      :tabList="tabList"
      :active="activeName"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'officeId', 'id');
        }
      "
      ref="NavTable"
    >
      <div slot="first">
        <div class="topbar">
          <div class="search-item">
            <small class="search-title">角色名称:</small>
            <el-input
              clearable
              v-model="oldSearchData.name"
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
          :loading="loading"
          :tableData="tableData"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          @tableItemRole="tableItemRole"
          @tableItemMenu="tableItemMenu"
          @tableItemJur="tableItemJur"
        >
        </TableList>
        <PaginationPage
          @pagination="pagination"
          v-show="total > 1"
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
        ></PaginationPage>
        <DistributionDialog
          ref="DistributionDialog"
          :dialogVisible.sync="DistributionDialogVisible"
          :title="DistributionDialogTitle"
          :treeData="DistributiontreeData"
          @distributionConfirm="distributionConfirm"
          :treeLabel.sync="distributionTreeLabel"
          :mainMenuid="mainMenuid"
        ></DistributionDialog>
        <el-dialog
          :visible.sync="RoleDialogVisible"
          title="用户分配"
          :show-close="false"
          class="dialog"
        >
          <UserContent ref="UserContent" :isCheck="true"></UserContent>
          <span slot="footer">
            <el-button @click="roleCancel('UserContent')" size="mini"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="RoleConfirm('UserContent')"
              size="mini"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <div slot="second">
        <Form
          @changeTabItem="changeTabItem"
          @showDialog="showDialog"
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
          ref="Form"
        ></Form>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          title="选择菜单"
          :treeData="InstitutionData"
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
import navTable from "@/Mixins/navTable";
import pagination from "@/Mixins/pagination";
import UserContent from "../../components/UserContent.vue";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "./components/TableList.vue";
import Form from "./components/Form.vue";
import DistributionDialog from "./components/DistributionDialog.vue";
import {
  getTableList,
  deleteUser,
  editUserMenu,
  editUserRole,
  editUserSetting,
  queryRole,
} from "@/api/systemSettings/systemSettings/UserSetting";
import { getTableList as getInstitutionList } from "@/api/systemSettings/systemSettings/AuthoritySetting";
import { getRoutes } from "@/api/systemSettings/systemSettings/menuSettings";
import { GetInstitutionData } from "@/api/systemSettings/organizationUser/institution";
import SelectDialog from "@/components/SelectDialog/index.vue";
export default {
  name: "UserSetting",
  mixins: [table, pagination, navTable],
  components: {
    NavTable,
    TableList,
    Form,
    SelectDialog,
    DistributionDialog,
    UserContent,
  },
  data() {
    return {
      loading: false,
      searchData: {
        name: "",
      },
      oldSearchData: {
        name: "",
      },
      itemValue: {}, //当前tableitem
      InstitutionData: [], //机构表
      activeName: "first",
      tabList: [
        { label: "角色列表", name: "first" },
        { label: "角色添加", name: "second" },
      ],
      tabSecond: {
        add: "角色添加",
        edit: "角色修改",
      },
      tableData: [],
      fromStatus: "add",
      tableItemData: [
        { prop: "name", label: "角色名称" },
        { prop: "enname", label: "英文名称" },
        { prop: "remarks", label: "备注" },
      ],
      dialogVisible: false,
      DistributionDialogVisible: false,
      DistributionDialogTitle: "",
      DistributiontreeData: [], //分配弹窗树数据
      distributionTreeLabel: "title", //分配弹窗tree组件显示label
      RoleDialogVisible: false,
      mainMenuid: "",
    };
  },
  methods: {
    roleCancel(formName) {
      this.RoleDialogVisible = false;
      this.$refs[formName].selectionListIds = [];
      this.$refs[formName].$refs["TableList"].toggleSelection();
    },
    RoleConfirm(formName) {
      const selectList = this.$refs[formName].selectionListIds;
      const roleID = selectList.join(",");
      console.log(roleID);
      const params = {
        roleId: this.itemValue.id,
        userId: roleID.length === 0 ? `${roleID}` : `${roleID},`,
      };
      editUserSetting(params).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.data);
          this.getTableList({
            pageNo: this.currentPage,
            pageSize: this.pageSize,
          });
          this.$refs[formName].$refs["TableList"].toggleSelection();
          this.RoleDialogVisible = false;
          this.$refs[formName].selectionListIds = [];
        } else {
          this.$message.error(res.data);
          this.$refs[formName].selectionListIds = [];
        }
      });
    },
    async getInstitutionData(params) {
      const res = await GetInstitutionData(params);
      this.InstitutionData = res.data;
    },
    async getTableList(params) {
      this.loading = true;
      const res = await getTableList(params);
      this.loading = false;
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    //角色分配
    tableItemRole(value) {
      const params = {
        roleId: value.id,
        type: "user",
      };
      this.itemValue = value;
      this.RoleDialogVisible = true;
      queryRole(params).then((res) => {
        this.$refs["UserContent"].selectionListIds = res.data;
        this.$refs["UserContent"].getTableList();
      });
    },
    //菜单分配
    tableItemMenu(value) {
      this.itemValue = value;
      getRoutes().then((res) => {
        const list = res.data[0].children;
        this.mainMenuid = res.data[0].id;
        this.DistributiontreeData = list;
        this.distributionTreeLabel = "title";
        this.DistributionDialogVisible = true;
        this.DistributionDialogTitle = "菜单分配";
        const params = {
          roleId: value.id,
          type: "menu",
        };
        this.DistributionSelect(params);
      });
    },
    DistributionSelect(params) {
      queryRole(params).then((res) => {
        this.$refs["DistributionDialog"].checkStrictl = true;
        this.$nextTick(() => {
          this.$refs["DistributionDialog"].$refs["tree"].setCheckedKeys(
            res.data
          );
          this.$refs["DistributionDialog"].checkStrictl = false;
        });
      });
    },
    //权限分配
    tableItemJur(value) {
      this.itemValue = value;
      getInstitutionList().then((res) => {
        const list = res.data[0].children;
        this.DistributiontreeData = list;
        this.distributionTreeLabel = "authorityName";
        this.DistributionDialogVisible = true;
        this.DistributionDialogTitle = "权限分配";
        const params = {
          roleId: value.id,
          type: "authority",
        };
        this.DistributionSelect(params);
      });
    },
    //删除操作
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该角色, 是否继续?");
    },
    deleteConfirm(value) {
      const params = {
        id: value.id,
      };
      deleteUser(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTableList();
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
    showDialog(officeId, officeName) {
      this.dialogVisible = true;
      if (officeId) {
        setTimeout(() => {
          this.$refs["dialog"].$refs["tree"].defaultSelect(officeId);
          this.$refs["dialog"].selectData = { id: officeId, name: officeName };
        }, 10);
      }
    },
    getFatherMes(value) {
      this.$refs["Form"].temp.officeId = value.id;
      this.$refs["Form"].temp.officeName = value.name;
    },
    distributionConfirm(value) {
      const params = { roleId: this.itemValue.id };
      if (this.DistributionDialogTitle === "菜单分配") {
        params.menuId = value;
        editUserMenu(params).then((res) => {
          if (res.code === 200) {
            this.distributionConfirmSuccess(res.data);
          } else {
            this.$message.error(res.data);
          }
        });
      } else if (this.DistributionDialogTitle === "权限分配") {
        params.authorityId = value;
        editUserRole(params).then((res) => {
          if (res.code === 200) {
            this.distributionConfirmSuccess(res.data);
          } else {
            this.$message.error(res.data);
          }
        });
      }
    },
    distributionConfirmSuccess(data) {
      this.$message.success(data);
      this.DistributionDialogVisible = false;
      this.$refs["DistributionDialog"].$refs["tree"].checkStrictl = true;
      this.getTableList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
    },
  },
  mounted() {
    this.getInstitutionData();
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
</style>
