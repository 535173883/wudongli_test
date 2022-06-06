<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'companyId', 'officeId', 'id');
        }
      "
      ref="NavTable"
    >
      <div slot="first">
        <UserContent
          @tableItemEdit="tableItemEdit"
          ref="UserContent"
        ></UserContent>
      </div>
      <div slot="second">
        <Form
          @changeTabItem="changeTabItem"
          @showDialog="showDialog"
          ref="Form"
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
        >
        </Form>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          :title="dialogVisibleTitle"
          :treeData="treeData"
          @getFatherMes="getFatherMes"
          :treeLabel="treeLabel"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import navTable from "@/Mixins/navTable";
import { GetCompanyData } from "@/api/systemSettings/organizationUser/user";
import { GetInstitutionData } from "@/api/systemSettings/organizationUser/institution";
import SelectDialog from "@/components/SelectDialog/index.vue";
import NavTable from "@/components/NavTable.vue/index.vue";
import UserContent from "../../components/UserContent.vue";
import Form from "./components/Form.vue";

export default {
  name: "UserPage",
  mixins: [navTable, table],
  components: {
    NavTable,
    UserContent,
    Form,
    SelectDialog,
  },
  data() {
    return {
      activeName: "first",
      tabList: [
        { label: "用户列表", name: "first" },
        { label: "用户添加", name: "second" },
      ],
      tabSecond: {
        add: "用户添加",
        edit: "用户修改",
      },
      dialogVisible: false,
      dialogVisibleTitle: "",
      treeData: [],
      treeLabel: "",
      fromStatus: "add",
    };
  },
  methods: {
    showDialog(type) {
      if (type === "company") {
        GetCompanyData().then((res) => {
          this.treeData = res.data;
          this.dialogVisible = true;
          this.dialogVisibleTitle = "选择公司";
          this.treeLabel = "companyName";
        });
      } else if (type === "office") {
        GetInstitutionData().then((res) => {
          this.treeData = res.data;
          this.dialogVisible = true;
          this.dialogVisibleTitle = "选择部门";
          this.treeLabel = "name";
        });
      }
    },
    getFatherMes(value) {
      if (this.dialogVisibleTitle === "选择公司") {
        this.$refs["Form"].temp.companyName = value.companyName;
        this.$refs["Form"].temp.companyId = value.id;
      } else if (this.dialogVisibleTitle === "选择部门") {
        this.$refs["Form"].temp.officeName = value.name;
        this.$refs["Form"].temp.officeId = value.id;
      }
    },
    getTableList() {
      this.$refs["UserContent"].getTableList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
