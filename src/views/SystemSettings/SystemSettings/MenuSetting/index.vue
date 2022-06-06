<template>
  <div>
    <NavTable
      :tabList="tabList"
      :active="activeName"
      @changeTabItem="changeTabItem"
      ref="NavTable"
    >
      <div slot="first">
        <TableList
          :loading="loading"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @changeItemSort="changeItemSort"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          @tableItemAdd="tableItemAdd"
          :showEditNumber="true"
        >
        </TableList>
        <div class="menuList-foot">
          <el-button type="primary" size="small" @click="SaveSort"
            >保存排序</el-button
          >
        </div>
      </div>
      <div slot="second">
        <FromCom
          :menuId="menuId"
          @changeTabItem="changeTabItem"
          @showDialog="showDialog"
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
          ref="Form"
        ></FromCom>
        <SelectDialog
          :dialogVisible.sync="dialogVisible"
          title="选择菜单"
          :treeData="tableData"
          @getFatherMes="getFatherMes"
          ref="dialog"
        ></SelectDialog>
      </div>
    </NavTable>
  </div>
</template>

<script>
import navTable from "@/Mixins/navTable";
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import FromCom from "./From.vue";
import SelectDialog from "@/components/SelectDialog/index.vue";
import {
  getRoutes,
  menuSort,
} from "@/api/systemSettings/systemSettings/menuSettings";
import { TableListItemDelete } from "@/api/systemSettings/systemSettings/menuSettings";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "MenuSetting",
  components: { NavTable, TableList, FromCom, SelectDialog },
  mixins: [navTable],
  data() {
    return {
      loading: false,
      menuId: "",
      tableData: [],
      activeName: "first",
      tabList: [
        { label: "菜单列表", name: "first" },
        { label: "菜单添加", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "添加下级菜单",
      },
      tableItemData: [
        { prop: "title", label: "名称", align: false },
        { prop: "path", label: "连接" },
        { prop: "component", label: "路径" },
      ],
      sortChangeArray: [],
      dialogVisible: false,
      fromStatus: "add", //添加或者修改状态   添加：add    修改：edit
    };
  },
  methods: {
    async getTableList() {
      this.loading = true;
      const res = await getRoutes();
      this.loading = false;
      this.menuId = res.data[0].id;
      this.tableData = res.data[0].children;
      console.log(this.menuId);
      return res.data[0].children;
    },
    //保存改变了的表格item排序
    changeItemSort(value, row) {
      const Id = row.id;
      const alreadyChange = this.sortChangeArray.find((item) => item.id === Id);
      if (alreadyChange) {
        alreadyChange.value = value;
      } else {
        this.sortChangeArray.push({ sort: value, id: Id });
      }
    },
    //保存排序
    SaveSort() {
      const len = this.sortChangeArray.length;
      if (len) {
        const data = new FormData();
        data.append("lists", JSON.stringify(this.sortChangeArray));
        menuSort(data).then((res) => {
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.sortChangeArray = [];
            this.getTableList();
          }
        });
      } else {
        this.$message.warning("还未改变排序");
      }
    },
    //修改
    tableItemEdit(value) {
      console.log(value);
      this.fromStatus = "edit";
      this.tabList[1].label = "菜单修改";
      this.$refs["Form"].temp = cloneDeep(value);
      this.$refs["NavTable"].activeValue = "second";
    },
    //添加下级
    tableItemAdd(value) {
      console.log(value);
      this.fromStatus = "add";
      this.$refs["NavTable"].activeValue = "second";
      this.$refs["Form"].temp.id = "";
      this.$refs["Form"].temp.parentId = value.id;
      this.$refs["Form"].temp.parentName = value.title;
    },
    //删除
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该文件, 是否继续?");
    },
    itemDelete(value, title) {
      console.log(value);
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteConfirm(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      TableListItemDelete(params)
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
    //表单保存
    onSubmit() {
      console.log(1);
    },
    // 选择上级菜单
    showDialog(parentId, parentName) {
      this.dialogVisible = true;
      if (parentId && parentId != "f4f06ce125a4b2eba350b93fbeb5dc23") {
        setTimeout(() => {
          this.$refs["dialog"].$refs["tree"].defaultSelect(parentId);
          this.$refs["dialog"].selectData = { id: parentId, title: parentName };
        }, 10);
      }
    },
    //
    navTableBack(type) {
      if (type) {
        this.getTableList().then((res) => {
          sessionStorage.setItem("router", JSON.stringify(res));
        });
      }
      this.fromStatus = "add";
      this.$refs["NavTable"].activeValue = "first";
      this.tabList[1].label = "菜单添加";
    },
    getFatherMes(value) {
      this.$refs["Form"].temp.parentId = value.id;
      this.$refs["Form"].temp.parentName = value.title;
    },
    //修复撤回操作菜单修改变回菜单添加
    changeTabItem(value) {
      this.activeName = value;
      if (value === "first") {
        this.$refs["Form"]["temp"].parentId = "";
        this.$refs["Form"]["temp"].id = "";
        this.fromStatus = "add";
        delete this.$refs["Form"]["temp"].children;
        this.$refs["Form"].resetForm("temp");
        this.tabList[1].label = "菜单添加";
      }
    },
  },
  mounted() {
    this.getTableList();
  },
};
</script>

<style lang="scss" scoped>
.menuList-foot {
  display: flex;
  justify-content: flex-start;
}
</style>
