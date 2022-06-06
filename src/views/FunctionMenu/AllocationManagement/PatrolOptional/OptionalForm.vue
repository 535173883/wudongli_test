<template>
  <div>
    <el-form
      :rules="rules"
      :model="formData"
      ref="formData"
      label-position="right"
      label-width="120px"
      style="width: 400px; margin-left: 80px; margin-top: 50px"
    >
      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="类型:" prop="type">
        <el-input v-model="formData.type" placeholder="请输入类型" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input v-model="formData.remarks" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="resetForm('formData', 1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addList, editList } from "@/api/FunctionMenu/AllocationManagement/PatrolOptional";
export default {
  name: "AreaForm",
  props: {
    propName: {
      type: Number,
      default: 1,
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
      formData: {
        name: "",
        type: "",
        remarks: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const params = this.formData;
          if (this.fromStatus === "add") {
            if (params.id) delete params.id;
            addList(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.resetForm("formData", 1);
              }
            });
          }
          if (this.fromStatus === "edit") {
            editList(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.resetForm("formData", 1);
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
<style lang="scss" scoped>
.item-remarks {
  color: #aaaaaa;
}
</style>
