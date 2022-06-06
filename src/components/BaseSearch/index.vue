<!-- 
    *名称:搜索条件组件
    *功能:methods
      1.点击搜索的方法：@search
      2.搜索条件 props : formItemList
-->

<template>
  <div class="dialog-search">
    <el-form
      :inline="true"
      ref="ruleForm"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item
        v-for="(item, index) in formItemList"
        :key="index"
        :label="item.label"
      >
        <el-select
          v-if="item.type == 'select'"
          v-model="formInline[item.param]"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="(item2, index2) in item.selectOptions"
            :key="index2"
            :label="item2.name"
            :value="item2.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="item.type == 'input'"
          v-model="formInline[item.param]"
          size="mini"
          placeholder="请输入"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 10rem">
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        <el-button type="" size="mini" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>

      <!-- 可用于显示其他按钮 -->
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
  props: {
    emitSearch: {
      // 是否立即执行搜索
      type: Boolean,
      default: false,
    },
    formItemList: {
      type: Array,
      default() {
        return [
          {
            label: "下拉框",
            type: "select",
            selectOptions: [{ name: 111, value: 111 }],
            param: "company",
            defaultSelect: "222", // 下拉框默认选中项
          },
          {
            label: "输入框",
            type: "input",
            param: "name",
          },
        ];
      },
    },
  },
  data() {
    let formInline = {};
    for (const obj of this.formItemList) {
      formInline[obj.param] = obj.defaultSelect || "";
    }
    return {
      formInline,
    };
  },
  watch: {
    emitSearch(newVal, oldVal) {
      console.log(newVal, oldVal);
      // 是否立即触发搜索  用在弹窗中异步请求下拉框后  或者给下拉框赋值默认值后  需要用到这个方法
      if (newVal) {
        console.log("此时触发--立即执行搜索");
        this.$emit("search", this.formInline);
      }
    },
    formItemList: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        for (const obj of this.formItemList) {
          if (obj.defaultSelect) {
            // eslint-disable-next-line no-undef
            formInline[obj.param] = obj.defaultSelect;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      // console.log('submit!',this.formInline);
      this.$emit("search", this.formInline);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      let formInline = {};
      for (const obj of this.formItemList) {
        // formInline[obj.param] = obj.defaultSelect || "";  // 重置时下拉框的默认值如果要保留就选用这个
        formInline[obj.param] = ""; // 所有筛选条件清空
      }
      this.formInline = formInline;
      this.$emit("search", this.formInline);
    },
  },
};
</script>

<style scoped>
.dialog-search {
  margin: 0 1rem;
  text-align: left;
}
</style>
