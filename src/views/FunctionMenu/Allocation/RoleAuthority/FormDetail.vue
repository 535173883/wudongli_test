<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="110px" style="width: 350px; margin-left: 80px">
      <el-form-item label="角色:" prop="organizationName">
        <el-select v-model="formData.organizationName" filterable clearable style="width: 100%">
          <el-option v-for="(item, index) in RoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作权限:" prop="qyPowerpeizhiName">
        <el-select v-model="formData.qyPowerpeizhiName" filterable clearable style="width: 100%">
          <el-option v-for="(item, index) in OperationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
import { addRoleAuthority, editRoleAuthority } from "@/api/FunctionMenu/Allocation/RoleAuthority/index";
export default {
  props: {
    formStatus: {
      type: String,
      default() {
        return "add";
      },
    },
    RoleList: {
      type: Array,
      default() {
        return [];
      },
    },
    OperationList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      formData: {
        organizationName: "",
        qyPowerpeizhiName: "",
        remarks: "",
        id: "",
      },
      rules: {
        organizationName: [{ required: true, message: "请选择角色", trigger: "change" }],
        qyPowerpeizhiName: [{ required: true, message: "请选择操作权限", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append("organizationid", this.formData.organizationName);
          formData.append("powerPeizhiid", this.formData.qyPowerpeizhiName);
          formData.append("remarks", this.formData.remarks);
          if (this.formStatus === "add") {
            addRoleAuthority(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback("formData");
              }
            });
          } else {
            formData.append("id", this.formData.id);
            editRoleAuthority(formData).then((res) => {
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
