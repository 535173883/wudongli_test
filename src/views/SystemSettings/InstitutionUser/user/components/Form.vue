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
          v-model="temp.officeName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择归属机构"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('office')"
        ></el-button>
      </el-form-item>
      <el-form-item label="归属公司:" style="width: 380px" prop="companyName">
        <el-input
          v-model="temp.companyName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择归属公司"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('company')"
        ></el-button>
      </el-form-item>

      <el-form-item label="工号:" prop="no">
        <el-input v-model="temp.no" />
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="temp.name" style="width: 200px" />
        <span class="item-remarks">工作流用户组标识</span>
      </el-form-item>
      <el-form-item label="登陆名:" prop="loginName">
        <el-input v-model="temp.loginName" />
      </el-form-item>
      <el-form-item
        label="用户编码:"
        prop="userCode"
        v-if="fromStatus === 'edit'"
      >
        <el-input v-model="temp.userCode" />
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="temp.email" />
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input v-model="temp.phone" />
      </el-form-item>
      <el-form-item label="手机:" prop="mobile">
        <el-input v-model.number="temp.mobile" />
      </el-form-item>

      <el-form-item label="是否允许登陆:" prop="loginFlag" style="width: 300px">
        <el-radio v-model="temp.loginFlag" label="1">是</el-radio>
        <el-radio v-model="temp.loginFlag" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="用户类型:" prop="userType" style="width: 300px">
        <el-select v-model="temp.userType">
          <el-option
            v-for="item in userTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
        <el-button @click="goback" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  editUserItem,
  addUserItem,
} from "@/api/systemSettings/organizationUser/user";
export default {
  name: "FormPage",
  props: {
    fromStatus: {
      type: String,
      default: () => {
        return "add";
      },
    },
  },
  data() {
    return {
      temp: {
        companyId: "", //归属公司id
        companyName: "", //归属公司名称
        officeId: "", //归属机构id
        officeName: "", //归属机构名称
        no: "", //工号
        name: "", //姓名
        loginName: "", //登录名
        password: "", //密码
        passwordConfirm: "", //密码确认
        email: "", //邮箱
        phone: "", //电话
        mobile: "", //手机
        loginFlag: "1", //是否可登陆
        userType: "1", //用户类型
        remarks: "", //备注
        userCode: "", //用户编码
      },
      userTypes: [
        {
          value: "0",
          label: "超级管理员",
        },
        {
          value: "1",
          label: "系统管理员",
        },
        {
          value: "2",
          label: "县区用户",
        },
        {
          value: "3",
          label: "乡镇用户",
        },
        {
          value: "4",
          label: "企业用户",
        },
      ],
      rules: {
        companyName: [
          { required: false, message: "请选择归属公司", trigger: "blur" },
        ],
        officeName: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        no: [{ required: false, message: "请填写工号", trigger: "blur" }],
        loginName: [{ required: true, message: "请填登录名", trigger: "blur" }],
        userType: [{ required: true, message: "请填登录名", trigger: "blur" }],
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "companyId", "officeId", "id");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.temp;
          if (this.fromStatus === "add") {
            this.add(params);
          }
          if (this.fromStatus === "edit") {
            this.edit(params);
          }
        } else {
          return false;
        }
      });
    },
    add(params) {
      delete params.userCode;
      addUserItem(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    edit(params) {
      editUserItem(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    showDialog(type) {
      if (type === "company") {
        this.$emit("showDialog", type, {
          id: this.temp.companyId,
          name: this.temp.companyName,
        });
      } else if (type === "office") {
        this.$emit("showDialog", type, {
          id: this.temp.officeId,
          name: this.temp.officeName,
        });
      }
    },
    resetForm(formName, type) {
      //重置表单之前包含的id
      this["temp"].companyId = "";
      this["temp"].officeId = "";
      this["temp"].id = "";
      this.$refs[formName].resetFields();
      this.$emit("navTableBack", type);
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
