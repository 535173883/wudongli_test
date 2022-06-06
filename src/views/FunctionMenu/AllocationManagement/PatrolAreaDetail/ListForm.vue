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
      <el-form-item label="巡检区域:" prop="xjareaconfigid">
        <el-select v-model="formData.xjareaconfigid" style="width: 100%" clearable>
          <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="选项类型:" prop="choosetypeconfigids">
        <el-select v-model="formData.choosetypeconfigids" style="width: 100%" multiple clearable>
          <el-option v-for="(item, index) in ChoosetypeConfig" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
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
import { getSelectArea } from "@/api/FunctionMenu/AllocationManagement/PatrolAreaDetail/index";
import { addArea, editArea } from "@/api/FunctionMenu/AllocationManagement/PatrolAreaDetail/index";
export default {
  name: "ListForm",
  props: {
    ChoosetypeConfig: {
      type: Array,
      default() {
        return [];
      },
    },
    EchoData: {
      type: Object,
      default() {
        return {};
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
      selectData: [],
      asyncChoosetypeConfig: [],
      formData: {
        xjareaconfigid: "",
        name: "",
        choosetypeconfigids: [],
        remarks: "",
      },
      rules: {
        xjareaconfigid: [{ required: true, message: "请选择巡检区域", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        choosetypeconfigids: [{ required: true, message: "请选择选项类型", trigger: "change" }],
      },
    };
  },
  watch: {
    ChoosetypeConfig(newValue) {
      this.asyncChoosetypeConfig = newValue;
    },
    EchoData(newValue) {
      this.formData = JSON.parse(JSON.stringify(newValue));
    },
  },
  methods: {
    getSelectArea() {
      getSelectArea().then((res) => {
        if (res.code == 200) {
          this.selectData = res.data.records;
        }
      });
    },

    // 提交表单
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.formData));
          data.choosetypeconfigids = data.choosetypeconfigids.toString();
          if (this.formStatus === "edit") {
            // 修改
            editArea(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.resetForm("formData", 2);
              }
            });
          } else {
            // 新增

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
  mounted() {
    this.getSelectArea();
  },
};
</script>
<style scoped lang="scss"></style>
