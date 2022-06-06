<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      ref="NavTable"
      @changeTabItem="
        (value) => {
          changeTabItem(value, 'parentId', 'id');
        }
      "
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
        ></TableList>
      </div>
      <div slot="second">
        <AreaForm
          @changeTabItem="changeTabItem"
          @showDialog="showDialog"
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
          ref="Form"
        ></AreaForm>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          title="选择区域"
          :treeData="tableData"
          @getFatherMes="getFatherMes"
          :treeLabel="treeLabel"
          ref="dialog"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import table from "@/Mixins/table";
import navTable from "@/Mixins/navTable";
import {
  getAreaList,
  removeArea,
} from "@/api/systemSettings/organizationUser/area";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "./components/TableList";
import AreaForm from "./AreaForm.vue";
import SelectDialog from "@/components/SelectDialog/index.vue";

export default {
  name: "AreaTableList",
  components: { NavTable, TableList, SelectDialog, AreaForm },
  mixins: [table, navTable],
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      tableData: [],
      tabList: [
        { label: "区域列表", name: "first" },
        { label: "区域添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "添加下级区域",
      },
      tabSecond: {
        add: "区域添加",
        edit: "区域修改",
      },
      tableItemData: [
        { prop: "name", label: "区域名称" },
        { prop: "code", label: "区域编码" },
        // { prop: "type", label: "区域类型" },
        // { prop: "remarks", label: "备注" },
      ],
      treeLabel: "name",
      fromStatus: "add", //添加或者修改状态   添加：add    修改：edit
    };
  },
  methods: {
    // 获取列表数据
    async getTableList() {
      const res = await getAreaList();
      this.tableData = res.data;
      console.log(this.tableData);
    },
    // 选择上级区域
    showDialog(parentId, parentName) {
      this.dialogVisible = true;
      if (parentId && parentId != "90ac1253c8cbed0cdae09a28267ab93f") {
        setTimeout(() => {
          this.$refs["dialog"].$refs["tree"].defaultSelect(parentId);
          this.$refs["dialog"].selectData = { id: parentId, title: parentName };
        }, 10);
      }
    },
    //删除
    tableItemDelete(value) {
      const len = value.children.length;
      if (len) {
        this.$message.warning("无法删除已有子级项");
        return false;
      } else {
        this.itemDelete(value, "此操作将永久删除该地区, 是否继续?");
      }
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      removeArea(params)
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
    //添加下级
    tableItemAdd(value) {
      console.log(value);
      this.fromStatus = "add";
      this.$refs["NavTable"].activeValue = "second";
      this.$refs["Form"].temp.id = "";
      this.$refs["Form"].temp.parentId = value.id;
      this.$refs["Form"].temp.parentName = value.name;
    },
    // 获取父级菜单
    getFatherMes(value) {
      console.log(value);
      this.$refs["Form"].temp.parentId = value.id;
      this.$refs["Form"].temp.parentName = value.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.menuList-foot {
  display: flex;
  justify-content: flex-start;
}
</style>
