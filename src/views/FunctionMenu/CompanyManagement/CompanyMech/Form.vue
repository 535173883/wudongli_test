<template>
  <div>
    <el-form ref="temp" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width: 450px; margin-left: 40px">
      <el-form-item label="公司:" prop="companyId">
        <el-select v-model="temp.companyId" placeholder="请选择公司" style="width: 320px" clearable filterable>
          <el-option v-for="item in companyNameList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理职位:" prop="management">
        <el-input v-model="temp.management" />
      </el-form-item>
      <el-form-item label="组织编码:" prop="code">
        <el-input v-model="temp.code" :readonly="fromStatus === 'edit'" />
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input v-model="temp.phone" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input v-model="temp.remarks" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('temp')" size="mini">提交</el-button>
        <el-button @click="goback()" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from "@/Mixins/form";
import { CompanyOfficeDataAdd, CompanyOfficeDataEdit } from "@/api/FunctionMenu/CompanyManagement/CompanyMech";

export default {
  name: "FromPage",
  mixins: [form],
  props: {
    companyNameList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      rules: {
        companyId: [{ required: true, message: "请选择公司", trigger: "blur" }],
        code: [{ required: true, message: "请填写组织编码", trigger: "blur" }],
      },
      temp: {
        companyId: "", //公司id
        code: "", //组织编码
        management: "", //管理职位
        name: "", //姓名
        phone: "", //电话
        remarks: "", //备注
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "id");
    },
    add(params) {
      CompanyOfficeDataAdd(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1, "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
    edit(params) {
      CompanyOfficeDataEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1, "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/styles/common/form.scss");
$color: #334681;
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
