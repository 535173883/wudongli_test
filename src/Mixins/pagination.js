//分页组件mixin
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    pagination(value) {
      //判断有无搜索条件
      console.log(this.searchData);
      const params = this.searchData
        ? Object.assign(
            { pageNo: value.page, pageSize: value.limit },
            this.searchData
          )
        : { pageNo: value.page, pageSize: value.limit };

      this.getTableList(params);
    },
  },
};
