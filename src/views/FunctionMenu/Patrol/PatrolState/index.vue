<template>
  <div>
    <NavTable :tabList="tabList" :active="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <TopSearch :list="formList" @submitForm="searchPage"></TopSearch>
        <TableList
          ref="TableList"
          :tableData="tableData"
          :actionItem="TableActionItem"
          :tableItemData="tableItemData"
          @tableItemEdit="tableItemEdit"
          @tableItemDelete="tableItemDelete"
          @tableItemAdd="tableItemAdd"
        ></TableList>
        <PaginationPage @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></PaginationPage>
      </div>
      <div slot="second">
        <Detail :detail="detail" @navBack="navBack" :isComplete="isComplete"></Detail>
      </div>
    </NavTable>
    <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="500px">
      <el-form :model="formData" ref="formData" label-position="right" label-width="110px" style="width: 350px; margin-left: 80px">
        <el-form-item label="巡检任务:" prop="tname"> <el-input v-model="formData.tname" readonly /></el-form-item>
        <el-form-item label="停泊位置:" prop="cname"> <el-input v-model="formData.cname" readonly /></el-form-item>
        <el-form-item label="船舶:" prop="shipName"> <el-input v-model="formData.shipName" readonly /></el-form-item>
        <el-form-item label="巡检开始时间:" prop="inspectionstarttime"> <el-input v-model="formData.inspectionstarttime" readonly /></el-form-item>
        <el-form-item label="巡检结束时间:" prop="inspectionendtime"> <el-input v-model="formData.inspectionendtime" readonly /></el-form-item>
        <el-form-item label="巡检状态:" prop="iname">
          <el-select v-model="formData.iname" placeholder="请选择巡检状态" :disabled="dialogTitle === '巡检状态详情'">
            <el-option label="未巡检" value="1"></el-option>
            <el-option label="巡检中" value="2"></el-option>
            <el-option label="巡检完成" value="3"></el-option>
            <el-option label="审核通过" value="4"></el-option>
            <el-option label="整改中" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remarks">
          <el-input v-model="formData.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :readonly="dialogTitle === '巡检状态详情'" type="textarea"
        /></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
          <el-button @click="resetForm('formData')">关 闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import TableList from "@/components/TableList/index.vue";
import Detail from "./components/Detail.vue";
import TopSearch from "@/views/FunctionMenu/Patrol/PatrolState/components/TopSearch.vue";
import { editPatrolState } from "@/api/FunctionMenu/Patrol/PatrolState";
import { getList, deleteState, getCompany, getTask, getShip, getShipName, getState, getDetail } from "@/api/FunctionMenu/Patrol/PatrolState";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
export default {
  name: "PatrolState", //巡检状态页面
  components: { NavTable, TableList, TopSearch, Detail },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,

      activeName: "first",
      dialogVisible: false,
      tableData: [],
      tabList: [
        { label: "企业巡检状态列表", name: "first" },
        { label: "企业巡检状态详情", name: "second" },
      ],
      TableActionItem: {
        label: "操作",
        add: "详情",
        edit: "修改",
        delete: "删除",
      },
      tableItemData: [
        { prop: "companyName", label: "公司名称" },
        { prop: "tname", label: "巡检任务" },
        { prop: "cname", label: "停泊位置" },
        { prop: "shipName", label: "船舶" },
        { prop: "inspectionstarttime", label: "巡检开始时间" },
        // { prop: "inspectionendtime", label: "巡检结束时间" },
        { prop: "userid", label: "巡检人" },
        { prop: "iname", label: "状态" },
        { prop: "remarks", label: "备注" },
      ],

      formList: [
        {
          type: "select",
          label: "公司:",
          model: "companyName",
          placeholder: "请选择公司",
          options: [],
          show: window.sessionStorage.getItem("userType") !== "0",
        },
        {
          type: "select",
          label: "巡检任务:",
          model: "tname",
          placeholder: "请选择巡检任务",
          options: [],
          show: true,
        },
        {
          type: "select",
          label: "停泊位置:",
          model: "cname",
          placeholder: "请选择停泊位置",
          options: [],
          show: true,
        },
        {
          type: "select",
          label: "船舶:",
          model: "shipName",
          placeholder: "请选择船舶名称",
          options: [],
          show: true,
        },
        {
          type: "select",
          label: "巡检状态:",
          model: "iname",
          placeholder: "请选择巡检状态",
          options: [],
          show: true,
        },
      ],
      dialogTableVisible: false,
      formData: {
        tname: "", //巡检任务
        cname: "", //停泊位置
        shipName: "", //船舶
        inspectionstarttime: "", //巡检开始时间
        inspectionendtime: "", //巡检结束时间
        iname: "", //状态
        remarks: "", //备注
      },
      dialogTitle: "修改巡检状态",
      detail: {
        jc: {
          zjzp: "",
        },
        jb: { qljzp: "", sfjmlzp: "", sfjgqdlszp: "" },
        ls: { hdlzp: "", qdlzp: "", hlzp: "", zlzp: "", qlzp: "" },
        qt: { cszrszp: "" },
      },
      isComplete: false, // 是否巡检完成
    };
  },
  methods: {
    getAllSelect() {
      axios.all([getCompany(), getTask(), getShip(), getShipName(), getState()]).then(
        axios.spread((company, task, point, shipName, state) => {
          if (company.code == 200) {
            this.formList[0].options = company.data;
          }
          if (task.code == 200) {
            this.formList[1].options = task.data;
          }
          if (point.code == 200) {
            this.formList[2].options = point.data;
          }
          if (shipName.code == 200) {
            this.formList[3].options = shipName.data;
          }
          if (state.code == 200) {
            this.formList[4].options = state.data;
          }
        })
      );
    },
    // 获取个人信息
    async getList(params) {
      const res = await getList(params);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    // 修改
    tableItemEdit(value) {
      this.dialogTableVisible = true;
      this.formData = cloneDeep(value);
    },
    // 详情
    tableItemAdd(value) {
      if (value.iname !== "巡检完成") {
        this.isComplete = true;
      } else {
        this.isComplete = false;
      }
      console.log(this.isComplete);
      getDetail(value.id).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.detail = res.data;
          this.detail = this.toolPicture(this.detail);
          this.detail.id = value.id;

          this.$refs.NavTable.activeValue = "second";
        } else {
          this.$message.error(res.data);
        }
      });
    },
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          // let arr = this.formData;
          const params = this.formData;
          editPatrolState(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.dialogTableVisible = false;
              this.$refs[formData].resetFields();
              this.getList({ pageNo: 1, pageSize: 10, data: {} });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formData, type) {
      this.dialogTableVisible = false;
      this.$refs[formData].resetFields();
      this.getList({ pageNo: 1, pageSize: 10, data: {} });
    },

    // 可以取到子组件传递过来的数据
    searchPage(ruleForm) {
      this.getList({
        pageNo: 1,
        pageSize: 10,
        companyName: ruleForm.companyName,
        shipName: ruleForm.shipName,
        tname: ruleForm.tname,
        cname: ruleForm.cname,
        iname: ruleForm.iname,
      });
    },
    // 删除
    tableItemDelete(value) {
      this.itemDelete(value, "此操作将永久删除该文件, 是否继续?");
    },
    changeTabItem() {
      this.isComplete = true;
      this.detail = {
        jc: { zjzp: "" },
        jb: { qljzp: "", sfjmlzp: "", sfjgqdlszp: "" },
        ls: {
          hdlzp: "",
          qdlzp: "",
          hlzp: "",
          zlzp: "",
          qlzp: "",
        },
        qt: { cszrszp: "" },
      };
    },
    navBack() {
      this.$refs.NavTable.activeValue = "first";
      this.getList({ pageNo: 1, pageSize: 10 });
    },
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
    deleteConfirm(value) {
      console.log(value);
      const params = {
        id: value.id,
      };
      deleteState(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
    toolPicture(value) {
      !value.jc.zjzp && (value.jc.zjzp = "");
      !value.jb.qljzp && (value.jb.qljzp = "");
      !value.jb.sfjgqdlszp && (value.jb.sfjgqdlszp = "");
      !value.jb.sfjmlzp && (value.jb.sfjmlzp = "");
      !value.ls.hdlzp && (value.ls.hdlzp = "");
      !value.ls.qdlzp && (value.ls.qdlzp = "");
      !value.ls.hlzp && (value.ls.hlzp = "");
      !value.ls.zlzp && (value.ls.zlzp = "");
      !value.ls.qlzp && (value.ls.qlzp = "");
      !value.qt.cszrszp && (value.qt.cszrszp = "");
      return value;
    },
    // 分页
    pagination(value) {
      this.getList({
        pageNo: value.page,
        pageSize: value.limit,
        companyName: this.formData.companyName,
        shipName: this.formData.shipName,
        tname: this.formData.tname,
        cname: this.formData.cname,
        iname: this.formData.iname,
      });
    },
  },
  mounted() {
    // 获取数据
    this.getList({ pageNo: 1, pageSize: 10 });
    this.getAllSelect();
  },
};
</script>

<style lang="scss" scoped>
.menuList-foot {
  display: flex;
  justify-content: flex-start;
}
</style>
