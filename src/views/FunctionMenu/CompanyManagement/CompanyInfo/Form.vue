<template>
  <div>
    <el-form
      ref="temp"
      :rules="rules"
      :model="temp"
      label-position="right"
      label-width="120px"
      style="width: 450px; margin-left: 40px"
    >
      <el-form-item label="公司名称:" prop="companyName">
        <el-input v-model="temp.companyName" />
      </el-form-item>
      <!-- <el-form-item label="所属区域:" style="width: 380px" prop="areaName">
        <el-input
          v-model="temp.areaName"
          :readonly="true"
          style="width: 200px"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('areaId', 'areaName', 'area')"
        ></el-button>
      </el-form-item> -->
      <el-form-item label="所属机构:" style="width: 380px" prop="officeName">
        <el-input
          v-model="temp.officeName"
          :readonly="true"
          style="width: 200px"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('officeId', 'officeName', 'office')"
        ></el-button>
      </el-form-item>
      <el-form-item
        label="机构编码:"
        prop="officeCode"
        v-if="fromStatus === 'edit'"
      >
        <el-input v-model="temp.officeCode" />
      </el-form-item>
      <el-form-item label="联系人:" prop="contacts">
        <el-input v-model="temp.contacts" />
      </el-form-item>
      <el-form-item label="联系人电话:" prop="telephone">
        <el-input v-model="temp.telephone" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input
          v-model="temp.remarks"
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('temp')" size="mini"
          >提交</el-button
        >
        <el-button @click="goback" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from "@/Mixins/form";
import {
  CompanyDataItemAdd,
  CompanyDataItemEdit,
} from "@/api/FunctionMenu/CompanyManagement/CompanyInfo";

export default {
  name: "FromPage",
  mixins: [form],
  data() {
    return {
      rules: {
        companyName: [
          { required: true, message: "请填写公司名称", trigger: "blur" },
        ],
        // areaName: [
        //   { required: true, message: "请选择所属区域", trigger: "blur" },
        // ],
        officeName: [
          { required: true, message: "请选择所属机构", trigger: "blur" },
        ],
      },
      temp: {
        companyName: "", //公司名称
        areaId: "", //区域ID
        areaName: "", //区域名称
        officeId: "", //机构ID
        officeCode: "",
        officeName: "", //机构名称
        contacts: "", //联系人
        telephone: "", //联系人电话
        remarks: "", //备注
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "areaId", "officeCode", "id");
    },
    add(params) {
      delete params.officeCode;
      console.log(params);
      CompanyDataItemAdd(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1, "areaId", "officeCode", "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
    edit(params) {
      CompanyDataItemEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1, "areaId", "officeCode", "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$color: #334681;
@import url("@/styles/common/form.scss");
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
