<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="right"
      label-width="120px"
      style="width: 400px; margin-left: 80px; margin-top: 80px"
    >
      <el-form-item label="旧密码:" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input
          type="password"
          v-model="ruleForm.newPassword"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="determinePassword">
        <el-input
          type="password"
          v-model="ruleForm.determinePassword"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          class="search-button"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EditPass } from "@/api/MyPanel/myPanel";
export default {
  name: "ChangePassword",
  data() {
    let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/;
    var validatePass2 = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback();
      } else if (this.ruleForm.password === value) {
        callback(new Error("新密码与旧密码不可一致！"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.$refs.ruleForm.validateField("newPassword");
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        newPassword: "",
        determinePassword: "",
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        newPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        determinePassword: [
          { required: true, validator: validatePass3, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 提交
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const params = this.ruleForm;
          // console.log(this.ruleForm);
          // console.log(params);
          EditPass(params).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.data);
            } else if (res.code === 500) {
              this.$message.error(res.data);
            }
          });
        } else {
          return false;
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
.form {
  background: #ffffff;
  padding: 20px;
  border-radius: 20px;
}
</style>
