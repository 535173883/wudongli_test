<template>
  <div>
    <el-form
      :rules="rules"
      :model="formData"
      ref="formData"
      label-position="right"
      label-width="120px"
      style="width: 400px; margin-left: 80px; margin-top: 10px"
    >
      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input v-model="formData.remarks" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="resetForm('formData', 1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addArea, editData } from "@/api/FunctionMenu/AllocationManagement/PatrolArea/index";
export default {
  props: {
    EchoData: {
      type: Object,
      default() {
        return {};
      },
    },
    fromStatus: {
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
        remarks: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  watch: {
    EchoData(newValue) {
      this.formData = JSON.parse(JSON.stringify(newValue));
    },
  },
  methods: {
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.formData));
          if (this.fromStatus === "edit") {
            // 修改
            editData(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.resetForm("formData", 2);
              }
            });
          } else {
            // 新增
            if (data.id) delete data.id;
            addArea(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.resetForm("formData", 2);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formData, type) {
      this.$refs[formData].resetFields();
      this.$emit("navTableBack", type);
    },
  },
};
</script>
<style scoped lang="scss"></style>
