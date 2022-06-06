<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="120px" style="width: 350px; margin-left: 80px">
      <el-form-item label="操作权限名称:" prop="powername"> <el-input v-model="formData.powername" placeholder="请输入角色名称" /> </el-form-item>
      <el-form-item label="备注:" prop="remarks"> <el-input type="textarea" v-model="formData.remarks" placeholder="请输入备注" /> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
        <el-button @click="goback('formData')">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOperationAuthority } from "@/api/FunctionMenu/Allocation/OperationAuthority/index";
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
        powername: "",
        remarks: "",
        id: "",
      },
      rules: {
        powername: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append("powername", this.formData.powername);
          formData.append("remarks", this.formData.remarks);
          if (this.formStatus === "add") {
            addOperationAuthority(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback("formData");
              }
            });
          }
          // } else {
          //   formData.append("id", this.formData.id);
          //   editOperationAuthority(formData).then((res) => {
          //     if (res.code == 200) {
          //       this.$message.success(res.data);
          //       this.goback("formData");
          //     }
          //   });
          // }
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
