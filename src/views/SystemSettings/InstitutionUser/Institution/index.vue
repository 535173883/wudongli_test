<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'parentId', 'areaId', 'id');
        }
      "
      ref="NavTable"
    >
      <div slot="first">
        <TableList
          ref="TableList"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          @tableItemAdd="tableItemAdd"
          :loading="loading"
        ></TableList>
      </div>
      <div slot="second">
        <Form
          @changeTabItem="changeTabItem"
          @showDialog="showDialog"
          ref="Form"
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
        ></Form>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          :title="dialogVisibleTitle"
          :treeData="treeData"
          @getFatherMes="getFatherMes"
          treeLabel="name"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import navTable from "@/Mixins/navTable";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import SelectDialog from "@/components/SelectDialog/index.vue";
import Form from "./Form.vue";
import {
  GetInstitutionData,
  deleteTableDataItem,
} from "@/api/systemSettings/organizationUser/institution";
import { getAreaList } from "@/api/systemSettings/organizationUser/area";
export default {
  name: "InstitutionPage",
  components: { NavTable, TableList, Form, SelectDialog },
  mixins: [table, navTable],
  data() {
    return {
      loading: false,
      activeName: "first",
      tabList: [
        { label: "机构列表", name: "first" },
        { label: "机构添加", name: "second" },
      ],
      tableData: [],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "添加下级机构",
      },
      tabSecond: {
        add: "机构添加",
        edit: "机构修改",
      },
      tableItemData: [
        { prop: "name", label: "机构名称" },
        { prop: "areaName", label: "归属区域" },
        { prop: "code", label: "机构编码" },
        { prop: "remarks", label: "备注" },
      ],
      fromStatus: "add",
      dialogVisible: false,
      dialogVisibleTitle: "",
      treeData: [],
    };
  },
  methods: {
    async getTableList() {
      this.loading = true;
      const res = await GetInstitutionData();
      this.loading = false;
      this.tableData = res.data;
    },
    tableItemDelete(value) {
      const len = value.children.length;
      if (len) {
        this.$message.warning("无法删除已有子级项");
        return false;
      } else {
        this.itemDelete(value, "此操作将永久删除该机构, 是否继续?");
      }
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      deleteTableDataItem(params)
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
    tableItemAdd(value) {
      this.fromStatus = "add";
      this.$refs["NavTable"].activeValue = "second";
      this.$refs["Form"].temp.id = "";
      this.$refs["Form"].temp.parentId = value.id;
      this.$refs["Form"].temp.parentName = value.name;
      this.$refs["Form"].temp.areaId = value.areaId;
      this.$refs["Form"].temp.areaName = value.areaName;
    },
    showDialog(type) {
      if (type === "institution") {
        //查询机构表
        this.dialogVisible = true;
        this.treeData = this.tableData;
        this.dialogVisibleTitle = "选择机构";
      } else if (type === "area") {
        //查询区域表
        getAreaList().then((res) => {
          this.treeData = res.data[0].children;
          this.dialogVisibleTitle = "选择区域";
          this.dialogVisible = true;
        });
      }
    },
    getFatherMes(value) {
      if (this.dialogVisibleTitle === "选择机构") {
        this.$refs["Form"].temp.parentId = value.id;
        this.$refs["Form"].temp.parentName = value.name;
      } else if (this.dialogVisibleTitle === "选择区域") {
        this.$refs["Form"].temp.areaId = value.id;
        this.$refs["Form"].temp.areaName = value.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
