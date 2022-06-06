<template>
  <div id="TopSearch">
    <el-form ref="ruleForm" :rules="rules" :inline="inline" :model="ruleForm" class="ruleForm" label-width="80px">
      <template v-for="(item, index) in list">
        <template v-if="item.type === 'select' && item.show">
          <el-form-item :key="index" :label="item.label" :prop="item.model">
            <el-select
              v-model.trim="ruleForm[item.model]"
              :clearable="item.clearable === undefined || item.clearable"
              filterable
              :placeholder="item.placeholder || ''"
              style="width: 150px"
            >
              <OptionPlus v-for="(i, key) in item.options" :key="i.id || key" :label="i.name || i.label" :value="i.id || i.value" />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <el-button class="el-icon-search" type="primary" @click="submitForm" size="mini">查询</el-button>
    </el-form>
  </div>
</template>

<script>
import OptionPlus from "@/components/BaseSearch/OptionPlus.vue";
export default {
  name: "TopSearch",
  components: { OptionPlus },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: true,
    },

    rules: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ruleForm: {},
    };
  },
  computed: {},
  watch: {
    list: {
      handler(list) {
        console.log(list);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 所填写数据
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const exportData = { ...this.ruleForm };

          this.$emit("submitForm", exportData);
        } else {
          return false;
        }
      });
    },
    // 默认清空所填写数据
    // resetForm() {
    //   this.$refs.ruleForm.resetFields();
    //   this.handleList(this.list);
    //   this.$emit("resetForm");
    // },
    // handleList(list) {
    //   for (let i = 0; i < list.length; i++) {
    //     const formitem = list[i];
    //     const { model } = formitem;
    //     this.$set(this.ruleForm, model, "");
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
#TopSearch {
  .ruleForm {
    width: 100%;
    text-align: left;
    line-height: 40px;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
.el-form-item {
  ::v-deep .el-form-item__content {
    height: 30px;
    .el-select,
    .el-input {
      input {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
