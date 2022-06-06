<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
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
