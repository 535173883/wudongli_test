//tab组件mixin
export default {
  methods: {
    //修复撤回操作菜单修改变回菜单添加
    /**
     * @func
     * @desc
     * @param {title,options}  // title：要显示的第二个title   options：需要手动重置的表单数据 一般都为Id
     * @return {}
     */
    changeTabItem(value, ...options) {
      console.log(value);
      this.activeName = value;
      console.log(this.$refs["Form"]["temp"]);
      if (value === "first") {
        options.forEach((item) => {
          this.$refs["Form"]["temp"][item] = "";
        });
        this.$refs["Form"].resetForm("temp");
        delete this.$refs["Form"]["temp"].children;
        this.fromStatus = "add";
        this.tabList[1].label = this.tabSecond.add;
      }
    },
    //tab回到第一栏
    /**
     * @func
     * @desc
     * @param {type}  是否刷新表单  1刷新
     * @return {}
     */
    navTableBack(type) {
      if (type) {
        if (this.oldSearchData) {
          const params = Object.assign(
            { pageNo: 1, pageSize: 10 },
            this.oldSearchData
          );
          this.getTableList(params);
        } else {
          this.getTableList({ pageNo: 1, pageSize: 10 });
        }
      }
      this.fromStatus = "add";
      this.$refs["NavTable"].activeValue = "first";
      this.tabList[1].label = this.tabSecond.add;
    },
  },
};
