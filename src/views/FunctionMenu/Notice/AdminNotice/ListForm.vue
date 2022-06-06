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
      <el-form-item label="内容:" prop="editContent">
        <el-input
          v-model="formData.editContent"
          :autosize="{ minRows: 4, maxRows: 5 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm('formData', 1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addNotice, editNotice } from "@/api/FunctionMenu/Notice/index";
export default {
  props: {
    EchData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    EchData(newValue) {
      this.formData.editContent = newValue.editContent;
      this.formData.id = newValue.id;
    },
  },
  data() {
    return {
      formData: {
        editContent: "",
        id: "",
      },
      rules: {
        editContent: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            // 修改
            editNotice(this.formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.resetForm();
              }
            });
          } else {
            //新增
            addNotice({ editContent: this.formData.editContent }).then(
              (res) => {
                if (res.code == 200) {
                  this.$message.success(res.data);
                  this.resetForm();
                }
              }
            );
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formData.resetFields();
      this.$emit("navTableBack");
    },
  },
};
</script>
<style scoped lang="scss"></style>
