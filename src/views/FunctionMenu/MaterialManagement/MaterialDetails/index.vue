<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable">
      <div slot="MaterialSummary">
        <TableList
          ref="TableList"
          :tableData="tableData"
          :tableItemData="tableItemData"
          :showItemAction="showItemAction"
        >
        </TableList>
      </div>
      <div slot="MaterialDetails">
        <BaseSearch
          :formItemList="formItemList"
          :emitSearch="emitSearch"
          @search="search"
        ></BaseSearch>
        <TableList
          ref="TableList"
          :tableData="tableData"
          :tableItemData="tableItemData2"
          :showItemAction="showItemAction"
        >
        </TableList>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import BaseSearch from "@/components/BaseSearch/index.vue";
export default {
  name: "MaterialDetails", //物资详情
  components: { NavTable, TableList, BaseSearch },
  data() {
    return {
      activeName: "MaterialSummary",
      dialogVisible: false,
      showItemAction: false,
      tableData: [],
      emitSearch: false,
      formItemList: [
        {
          label: "乡镇",
          type: "select",
          selectOptions: [{ name: 111, value: 111 }],
          param: "company",
        },
        {
          label: "船厂",
          type: "select",
          selectOptions: [{ name: 111, value: 111 }],
          param: "parm222",
        },
      ],
      tabList: [
        { label: "物资汇总", name: "MaterialSummary" },
        { label: "物资详情", name: "MaterialDetails" },
      ],
      tableItemData: [
        { prop: "name", label: "物资名称" },
        { prop: "code", label: "物资参数" },
        { prop: "number", label: "物资数量" },
      ],
      tableItemData2: [
        { prop: "country", label: "乡镇名称" },
        { prop: "ship", label: "船厂名称" },
        { prop: "name", label: "物资名称" },
        { prop: "code", label: "物资参数" },
        { prop: "number", label: "物资数量" },
      ],
    };
  },
  mounted() {
    // 此时请求下拉框的数据接口
    // axios。。。。
    //  this.formItemList[3].selectOptions = res.data
    // 其他下拉框的选项赋值
    //  这里判断 是否立即执行搜索
    // 全部下拉框的数据都塞进去后执行搜索
    // this.emitSearch=true
  },
  methods: {
    handleOpen(typeVal) {
      this.dialogVisible = true;
      this.formItemList[3].defaultSelect = typeVal || ""; // 打开弹窗时下拉框赋默认选中的值
      this.emitSearch = true;
    },
    handleClose(done) {
      console.log(done);
      this.dialogVisible = false;
    },
    search(params) {
      // 搜索条件改变时
      this.searchTableList(params);
    },
  },
};
</script>

<style lang="scss" scoped></style>
