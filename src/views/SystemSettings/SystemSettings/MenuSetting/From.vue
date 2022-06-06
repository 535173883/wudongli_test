<template>
  <div>
    <el-form
      ref="temp"
      :rules="rules"
      :model="temp"
      label-position="right"
      label-width="100px"
      style="width: 450px; margin-left: 40px"
    >
      <el-form-item label="上级菜单:" style="width: 360px" prop="parentName">
        <el-input
          v-model="temp.parentName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择上级菜单"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog"
        ></el-button>
      </el-form-item>
      <el-form-item label="名称:" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="组件名称:" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="连接:" prop="path">
        <el-input v-model="temp.path" placeholder="点击菜单跳转的页面" />
      </el-form-item>
      <el-form-item label="路径:" prop="component">
        <el-input v-model="temp.component" />
      </el-form-item>
      <el-form-item label="重定向路径:" prop="redirect">
        <el-input v-model="temp.redirect" />
      </el-form-item>
      <el-form-item label="图标:" prop="icon" style="width: 180px">
        <el-input v-model="temp.icon" />
      </el-form-item>
      <el-form-item label="排序:" style="width: 180px" prop="sort">
        <el-input
          v-model="temp.sort"
          placeholder="排列顺序"
          @input="sortInput"
        />
      </el-form-item>
      <el-form-item label="可见:" prop="isShow">
        <el-radio v-model="temp.isShow" label="1">显示</el-radio>
        <el-radio v-model="temp.isShow" label="0">隐藏</el-radio>
        <span class="item-remarks">(该菜单是否显示到系统菜单中)</span>
      </el-form-item>
      <el-form-item label="权限标识:" prop="permission">
        <el-input v-model="temp.permission" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input
          v-model="temp.remarks"
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('temp')" size="mini"
          >提交</el-button
        >
        <el-button @click="goback" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addMenu,
  editMenu,
} from "@/api/systemSettings/systemSettings/menuSettings";
export default {
  name: "FromCom",
  props: {
    menuId: {
      type: String,
      default: () => {
        return "0";
      },
    },
    fromStatus: {
      type: String,
      default: () => {
        return "add";
      },
    },
  },
  data() {
    return {
      temp: {
        parentId: "", //父级菜单id
        parentName: "", //父级菜单名称
        title: "", //页面名称
        name: "", //组件名称
        path: "", //链接
        component: "", //组件路径
        redirect: "", //重定向路径
        icon: "", //图标
        sort: "", //排序
        isShow: "1", //是否可见
        permission: "", //权限标识
        remarks: "", //备注信息
      },

      rules: {
        title: [{ required: true, message: "请填写名称", trigger: "blur" }],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        path: [{ required: true, message: "请填写连接", trigger: "blur" }],
        component: [{ required: true, message: "请填写路径", trigger: "blur" }],
        sort: [{ required: true, message: "请填写排序", trigger: "blur" }],
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "parentId", "id");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.temp;
          delete params.children;
          if (this.fromStatus === "add") {
            this.addMenu(params);
          }
          if (this.fromStatus === "edit") {
            this.editMenu(params);
          }
        } else {
          return false;
        }
      });
    },
    addMenu(params) {
      params.parentId = params.parentId ? params.parentId : this.menuId;
      addMenu(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    editMenu(params) {
      params.parentId = params.parentId ? params.parentId : this.menuId;
      editMenu(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    resetForm(formName, type) {
      this.temp.parentId = "";
      this.temp.id = "";
      this.$refs[formName].resetFields();
      this.$emit("navTableBack", type);
    },
    showDialog() {
      const parentId = this.temp.parentId;
      const parentName = this.temp.parentName;
      this.$emit("showDialog", parentId, parentName);
    },
    sortInput() {
      this.temp.sort = this.temp.sort.replace(/[^\d.]/g, "");
    },
  },
};
</script>

<style lang="scss" scoped>
$color: #334681;
@import url("@/styles/common/form.scss");
::v-deep .el-form-item__label {
  color: $color;
}
::v-deep .el-radio {
  margin-right: 15px;
}
.item-remarks {
  color: #aaaaaa;
}
</style>
