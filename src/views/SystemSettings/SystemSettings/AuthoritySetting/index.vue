<template>
  <div class="contain">
    <div class="topbar">
      <el-button
        type="primary"
        icon="el-icon-zoom-in"
        @click="showDialog"
        size="small"
      >
        添加
      </el-button>
    </div>
    <div class="content">
      <TableList
        :tableData="tableData"
        :actionItem="TableActionItem"
        :tableItemData="tableItemData"
        @tableItemEdit="tableItemEdit"
        @tableItemDelete="tableItemDelete"
        @tableItemAdd="tableItemAdd"
      ></TableList>
      <el-dialog
        :visible.sync="visible"
        width="350px"
        :show-close="false"
        :title="visibleTitle"
        :modal="false"
      >
        <el-form
          ref="temp"
          :rules="rules"
          :model="temp"
          label-position="right"
          label-width="85px"
        >
          <el-form-item label="名称:" prop="authorityName">
            <el-input v-model="temp.authorityName" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="上级菜单:" v-if="addChildrenItem">
            <el-input v-model="temp.parentName" />
          </el-form-item>
          <el-form-item label="权限标识:" prop="authority">
            <el-input v-model="temp.authority" placeholder="请输入权限标识" />
          </el-form-item>
          <el-form-item label="排序:" prop="sort" style="width: 200px">
            <el-input v-model="temp.sort" placeholder="请输入排序号" />
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="visibleCancel('temp')" type="danger" size="small"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="visibleConfirm('temp')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TableList from "@/components/TableList";
import {
  getTableList,
  TableListItemAdd,
  TableListItemEdit,
  TableListItemDelete,
} from "@/api/systemSettings/systemSettings/AuthoritySetting";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "AuthoritySetting",
  components: {
    TableList,
  },
  data() {
    return {
      tableData: [],
      TableActionItem: {
        label: "操作",
        edit: "修改",
        delete: "删除",
        add: "添加下级权限",
      },
      tableItemData: [
        { prop: "authorityName", label: "名称" },
        { prop: "authority", label: "权限标识" },
        { prop: "sort", label: "排序" },
      ],
      visible: false,
      addChildrenItem: false,
      visibleTitle: "",
      rules: {
        authorityName: [
          { required: true, message: "请填写菜单名称", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        authority: [
          { required: true, message: "请填写权限标识", trigger: "blur" },
        ],
      },
      temp: {
        authorityName: "",
        authority: "",
        sort: "",
      },
    };
  },
  methods: {
    showDialog() {
      this.visible = true;
      this.addChildrenItem = false;
      this.visibleTitle = "权限添加";
    },
    async getTableList() {
      const res = await getTableList();
      this.tableData = res.data;
    },
    visibleCancel(formName) {
      this.temp = {};
      this.resetForm(formName);
    },
    visibleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.temp.parentId = this.temp.parentId || 0;
          const params = this.temp;
          delete params.children;
          if (this.visibleTitle === "权限添加") {
            TableListItemAdd(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.temp = {};
                this.resetForm("temp");
                this.getTableList();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
          if (this.visibleTitle === "权限修改") {
            delete params["children"];
            TableListItemEdit(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.temp = {};
                this.resetForm("temp");
                this.getTableList();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.visible = false;
      this.$refs[formName].resetFields();
    },
    tableItemEdit(value) {
      console.log(value);
      this.visibleTitle = "权限修改";
      this.addChildrenItem = false;
      this.temp = cloneDeep(value);
      this.visible = true;
    },
    //删除
    tableItemDelete(value) {
      const len = value.children.length;
      if (len) {
        this.$message.warning("无法删除已有子级项");
        return false;
      } else {
        this.itemDelete(value, "此操作将永久删除该权限, 是否继续?");
      }
    },
    itemDelete(value, title) {
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
    tableItemAdd(value) {
      this.addChildrenItem = true;
      this.visible = true;
      this.visibleTitle = "权限添加";
      this.temp.id = "";
      this.temp.parentName = value.authorityName;
      this.temp.parentId = value.id;
    },
  },
  mounted() {
    this.getTableList();
  },
};
</script>

<style lang="scss" scoped>
@import url("@/styles/common/form.scss");
$color: #334681;
.contain {
  .topbar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  ::v-deep .el-form-item__label {
    color: $color;
  }
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #ccc;

    background: #f9fbff;
  }
  ::v-deep .el-dialog__footer {
    border-top: 1px solid #ccc;
    background-color: #edf0f2;
    text-align: center;
  }
}
</style>
