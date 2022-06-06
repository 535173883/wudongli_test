<template>
  <div>
    <TableList
      ref="TableList"
      :tableData="tableData"
      :tableItemData="tableItemData"
      :actionItem="TableActionItem"
      @tableItemEdit="tableItemEdit"
      @tableItemDelete="tableItemDelete"
      @tableItemAdd="tableItemAdd"
    >
    </TableList>
  </div>
</template>

<script>
import TableList from "@/components/TableList/index.vue";
export default {
  name: "MaterialDetails", //物资编辑
  components: { TableList },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
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
      TableActionItem: {
        label: "操作",
        add: "添加",
        edit: "编辑",
        delete: "删除",
      },
      tableItemData: [
        { prop: "xuHao", label: "序号" },
        { prop: "name", label: "物资名称" },
        { prop: "coed", label: "物资参数" },
        { prop: "time", label: "创建时间" },
        { prop: "person", label: "创建人" },
      ],
    };
  },
  methods: {
    // 添加
    tableItemAdd(value) {
      console.log(value);
    },
    // 编辑
    tableItemEdit(value) {
      console.log(value);
    },
    // 删除
    tableItemDelete() {},
  },
};
</script>

<style lang="scss" scoped></style>
