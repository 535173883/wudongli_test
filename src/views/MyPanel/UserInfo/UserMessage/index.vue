<template>
  <div class="form">
    <div slot="userMessage">
      <el-form
        :rules="rules"
        :model="formData"
        ref="formData"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left: 80px; margin-top: 50px"
      >
        <el-form-item label="归属公司:" style="width: 380px" prop="companyName">
          <el-input v-model="formData.companyName" :readonly="true" />
        </el-form-item>
        <el-form-item label="归属部门:" style="width: 380px" prop="officeName">
          <el-input v-model="formData.officeName" :readonly="true" />
        </el-form-item>
        <el-form-item label="姓名:" style="width: 380px">
          <el-input v-model="formData.name" :readonly="true" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email" style="width: 380px">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话:" prop="mobile" style="width: 380px">
          <el-input v-model="formData.mobile" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone" style="width: 380px">
          <el-input v-model="formData.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="备注:" prop="remarks" style="width: 380px">
          <el-input
            v-model="formData.remarks"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
        <!-- <el-form-item label="用户类型:" style="width: 380px">
          <el-input
            v-model="formData.userType"
            style="width: 200px"
            :readonly="true"
          />
        </el-form-item> -->
        <el-form-item label="用户类型:" prop="userType" style="width: 300px">
          <el-select v-model="formData.userType">
            <el-option
              v-for="item in userTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上次登录:">{{ formData.loginDate }}</el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formData')"
          class="search-button"
          >保存</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { getInfo, EditInfo } from "@/api/MyPanel/myPanel";
export default {
  name: "UserMessage",
  data() {
    // 手机号码验证
    var checkMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不可为空"));
      } else {
        if (value !== "") {
          var reg = /^1[3-9]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的手机号码"));
          }
        }
        callback();
      }
    };
    // 邮箱验证
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    return {
      formData: {
        companyName: "", //归属公司
        officeName: "", //归属部门
        name: "", //姓名
        email: "", //邮箱
        loginDate: "", //登录日期
        mobile: "", //电话
        phone: "", //手机号码
        remarks: "", //备注
        userType: "", //用户类型
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
          label: "乡镇用户",
        },
      ],
      rules: {
        mobile: [
          { message: "电话不能为空" },
          // { type: "number", message: "电话必须为数字值" },
        ],
        phone: [
          { message: "请输入电话", trigger: "blur" },
          {
            validator: checkMobile,
            min: 11,
            max: 11,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        email: [
          { message: "请输入你的邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            min: 9,
            max: 18,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取个人信息
    async getInfo() {
      const res = await getInfo();
      console.log(res);
      this.formData = res.data;
      console.log(this.formData);
    },
    // 提交表单
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const params = this.formData;
          console.log(this.formData);
          console.log(params);
          EditInfo(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("保存成功");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
@import url("@/styles/common/form.scss");
$color: #334681;
::v-deep .el-form-item__label {
  color: $color;
}
.form {
  background: #ffffff;
  padding: 20px;
  border-radius: 20px;
}
</style>
