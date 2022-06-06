<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="110px" style="width: 350px; margin-left: 80px">
      <el-form-item label="角色名称:" prop="rolename"> <el-input v-model="formData.rolename" placeholder="请输入角色名称" /> </el-form-item>
      <el-form-item label="备注:" prop="remarks"> <el-input type="textarea" v-model="formData.remarks" placeholder="请输入备注" /> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
        <el-button @click="goback('formData')">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRole, editRole } from "@/api/FunctionMenu/Allocation/RoleAllocation/index";
export default {
  props: {
    formStatus: {
      type: String,
      default() {
        return "add";
      },
    },
  },
  data() {
    return {
      formData: {
        rolename: "",
        remarks: "",
        id: "",
      },
      rules: {
        rolename: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append("rolename", this.formData.rolename);
          formData.append("remarks", this.formData.remarks);
          if (this.formStatus === "add") {
            addRole(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback("formData");
              }
            });
          } else {
            formData.append("id", this.formData.id);
            editRole(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback("formData");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goback(formName) {
      this.$refs[formName].resetFields();
      this.$emit("navBack");
    },
  },
};
</script>
<style scoped lang="scss"></style>
