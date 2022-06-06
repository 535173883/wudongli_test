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
      <el-form-item label="公司:" prop="companyId">
        <el-select
          v-model="temp.companyId"
          placeholder="请选择公司"
          style="width: 320px"
          @change="queryOrganization"
        >
          <el-option
            v-for="item in companyNameList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="归属区域:" style="width: 380px" prop="areaName">
        <el-input
          v-model="temp.areaName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择归属区域"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('area')"
        ></el-button>
      </el-form-item> -->
      <el-form-item label="公司职务:" prop="organizationId">
        <el-select
          v-model="temp.organizationId"
          placeholder="请选择公司职务"
          style="width: 320px"
        >
          <el-option
            v-for="item in OrganizationList"
            :key="item.organizationId"
            :label="item.organizationName"
            :value="item.organizationId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="temp.userName" />
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="temp.phone" />
      </el-form-item>
      <el-form-item label="昵称:" prop="nickName">
        <el-input v-model="temp.nickName" />
      </el-form-item>
      <el-form-item label="性别:" prop="sex" style="width: 300px">
        <el-radio v-model="temp.sex" label="1">男</el-radio>
        <el-radio v-model="temp.sex" label="0">女</el-radio>
      </el-form-item>
      <!-- <el-form-item label="用户编号:" prop="id">
        <el-input v-model="temp.id" />
      </el-form-item> -->
      <el-form-item label="用户编码:" prop="userCode">
        <el-input v-model="temp.userCode" />
      </el-form-item>
      <el-form-item label="是否可用:" prop="isAble" style="width: 300px">
        <el-radio v-model="temp.isAble" label="1">是</el-radio>
        <el-radio v-model="temp.isAble" label="0">否</el-radio>
      </el-form-item>
      <!-- <el-form-item label="是否绑定:" prop="status">
        <el-input v-model="temp.status" />
      </el-form-item> -->
      <el-form-item label="类型:" prop="type">
        <el-input v-model="temp.type" />
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
        <el-button @click="goback('temp')" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from "@/Mixins/form";
import {
  UserDataAdd,
  UserDataEdit,
} from "@/api/FunctionMenu/UserManagement/UserManagement";
import { queryOrganizationByCompanyId } from "@/api/FunctionMenu/CompanyManagement/CompanyMech";
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
      OrganizationList: [],
      rules: {
        companyId: [{ required: true, message: "请选择公司", trigger: "blur" }],
        userCode: [
          { required: true, message: "请填写用户编码", trigger: "blur" },
        ],
        organizationId: [
          { required: true, message: "请选择请选择公司职务", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
      },
      temp: {
        areaName: "", //区域名称
        areaId: "", //区域id
        companyId: "", //公司id
        userName: "", //姓名
        phone: "", //联系电话
        nickName: "", //昵称
        sex: "1", //性别
        id: "", //用户编号
        userCode: "",
        isExamine: "", //是否审核
        status: "", //是否绑定
        type: "", //类型
        remarks: "", //备注
        isAble: "1",
        organizationId: "",
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "areaId", "id");
    },
    add(params) {
      console.log(params);
      UserDataAdd(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1, "areaId", "id");
        } else {
          this.$message.error(res.data);
        }
      });
    },
    edit(params) {
      UserDataEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          // 清除id
          this.resetForm("temp", 1, "areaId", "id");
        } else {
          this.$message.error(res.data);
        }
      });
    },
    queryOrganization(value) {
      const params = { companyId: value };
      queryOrganizationByCompanyId(params).then((res) => {
        this.OrganizationList = res.data;
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
