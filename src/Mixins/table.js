//表格组件mixin
import cloneDeep from "lodash/cloneDeep";
export default {
  methods: {
    //删除警告
    /**
     * @func
     * @desc
     * @param {value,title} //value:向下传的参数  title：提示信息
     * @return {}
     */
    itemDelete(value, title) {
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteConfirm(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改
    /**
     * @func
     * @desc
     * @param {value}  //value：表单选中那一行的数据
     * @return {}
     */
    tableItemEdit(value) {
      // console.log(value);
      this.fromStatus = "edit";
      this.tabList[1].label = this.tabSecond.edit;
      this.$refs["Form"].temp = cloneDeep(value);
      this.$refs["NavTable"].activeValue = "second";
    },
    search() {
      this.searchData = JSON.parse(JSON.stringify(this.oldSearchData));
      const params = Object.assign(
        { pageNo: 1, pageSize: 10 },
        this.searchData
      );
      this.getTableList(params);
    },
  },
  mounted() {
    //获取数据
    this.getTableList({ pageNo: 1, pageSize: 10 });
  },
};
