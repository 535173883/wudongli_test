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
      <el-form-item label="归属机构:" style="width: 380px" prop="officeName">
        <el-input
          placeholder="请选择归属机构"
          v-model="temp.officeName"
          :readonly="true"
          style="width: 200px"
        /><el-button
          type="primary"
          icon="el-icon-search"
          @click="showDialog('officeId', 'officeName')"
          class="search-button"
        ></el-button>
      </el-form-item>
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="英文名称:" prop="enname">
        <el-input v-model="temp.enname" style="width: 200px" />
        <span class="item-remarks">工作流用户组标识</span>
      </el-form-item>
      <el-form-item label="角色类型:" prop="roleType">
        <el-select v-model="temp.roleType" style="width: 100%">
          <el-option
            v-for="item in roleTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否系统数据:" prop="isSys" style="width: 300px">
        <el-radio v-model="temp.isSys" label="1">是</el-radio>
        <el-radio v-model="temp.isSys" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否可用:" prop="useable" style="width: 300px">
        <el-radio v-model="temp.useable" label="1">是</el-radio>
        <el-radio v-model="temp.useable" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="数据范围:" prop="dataScope">
        <el-select v-model="temp.dataScope" style="width: 100%">
          <el-option
            v-for="item in dataScopes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
  addUser,
  editUser,
} from "@/api/systemSettings/systemSettings/UserSetting";
export default {
  name: "FromPage",
  mixins: [form],
  data() {
    return {
      rules: {
        enname: [
          { required: true, message: "请填写英文名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
      temp: {
        name: "",
        enname: "",
        officeId: "",
        useable: "1",
        roleType: "assignment",
        isSys: "1",
        dataScope: "8",
        officeName: "",
        remarks: "",
      },
      roleTypes: [
        { value: "assignment", label: "任务分配" },
        { value: "security-role", label: "管理角色" },
        { value: "user", label: "普通角色" },
      ],
      dataScopes: [
        { value: "1", label: "所有数据" },
        { value: "2", label: "所在公司及以下数据" },
        { value: "3", label: "所在公司数据" },
        { value: "4", label: "所在部门及以下数据" },
        { value: "5", label: "所在部门数据" },
        { value: "8", label: "仅本人数据" },
        { value: "7", label: "按明细设置" },
      ],
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "officeId", "id");
    },
    add(params) {
      console.log(params);
      addUser(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1, "officeId", "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
    edit(params) {
      editUser(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1, "officeId", "id");
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
</style>
