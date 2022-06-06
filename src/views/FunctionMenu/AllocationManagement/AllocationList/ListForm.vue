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
      <el-form-item label="配置名称:" prop="configName">
        <el-input v-model="formData.configName" placeholder="请输入配置名称" />
      </el-form-item>
      <el-form-item label="配置值:" prop="configValue">
        <el-input v-model="formData.configValue" placeholder="请输入配置值" />
      </el-form-item>
      <el-form-item label="配置说明:" prop="configDesc">
        <el-input v-model="formData.configDesc" placeholder="请输入配置说明" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input v-model="formData.remarks" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="resetForm('formData')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addList, editList } from "@/api/FunctionMenu/AllocationManagement/AllocationList";
export default {
  name: "ListForm",
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
        configName: "",
        configValue: "",
        configDesc: "",
        remarks: "",
      },
      rules: {
        configName: [{ required: true, message: "请输入配置名称", trigger: "blur" }],
        configValue: [{ required: true, message: "请输入配置值", trigger: "blur" }],
        configDesc: [{ required: true, message: "请输入配置说明", trigger: "blur" }],
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
            console.log(params);
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
