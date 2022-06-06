//表单组件mixin
export default {
  props: {
    //状态
    fromStatus: {
      type: String,
      default: () => {
        return "add";
      },
    },
  },
  methods: {
    //显示弹窗
    showDialog(_Id, _Name, type) {
      const Id = this.temp[_Id];
      const Name = this.temp[_Name];
      this.$emit("showDialog", Id, Name, type);
    },
    //表单提交
    /**
     * @func
     * @desc
     * @param {formName}   //formName  表单的ref名称
     * @return {}
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.temp;
          delete params.children;
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
    //警告
    errorWaring(res) {
      this.$message.error(res.data);
    },
    //重置表单
    resetForm(formName, type, ...options) {
      this.$refs[formName].resetFields();
      options.forEach((item) => {
        this.$refs[formName][item] = "";
      });
      this.$emit("navTableBack", type);
    },
  },
};
