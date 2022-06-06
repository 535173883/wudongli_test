<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="110px" style="width: 350px; margin-left: 80px">
      <el-form-item label="停泊位置:" prop="name"> <el-input v-model="formData.name" placeholder="请输入停泊位置" /> </el-form-item>
      <el-form-item label="公司名称:" prop="companyName">
        <el-select placeholder="请选择公司" v-model="formData.companyName" clearable style="width: 100%">
          <el-option v-for="item in companyList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="remarks"> <el-input type="textarea" v-model="formData.remarks" placeholder="请输入备注" /> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
        <el-button @click="goback('formData')">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addData, editData } from "@/api/FunctionMenu/Allocation/WharfManagement/index";
export default {
  props: {
    companyList: {
      type: Array,
      default() {
        return [];
      },
    },
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
        name: "",
        companyName: "",
        remarks: "",
        id: "",
      },
      rules: {
        companyName: [{ required: true, message: "请选择公司", trigger: "change" }],
        name: [{ required: true, message: "请输入停泊位置", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append("name", this.formData.name);
          formData.append("companyid", this.formData.companyName);
          formData.append("remarks", this.formData.remarks);
          formData.append("type", 1);
          if (this.formStatus === "add") {
            addData(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback("formData");
              }
            });
          } else {
            formData.append("id", this.formData.id);
            editData(formData).then((res) => {
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
