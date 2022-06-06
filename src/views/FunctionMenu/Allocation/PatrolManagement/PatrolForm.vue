<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" style="width: 400px; margin-left: 30px" class="demo-ruleForm">
      <el-form-item label="公司:" prop="companyid">
        <el-select placeholder="请选择公司" v-model="ruleForm.companyid" clearable filterable style="width: 100%" @change="changeCompany">
          <el-option v-for="item in companyNameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡检时间:" prop="endtime">
        <el-time-picker v-model="ruleForm.endtime" placeholder="选择时间点" style="width: 100%"> </el-time-picker>
        <!-- <el-date-picker type="datetime" placeholder="选择日期" v-model="" ></el-date-picker> -->
      </el-form-item>
      <!-- <el-form-item label="提醒时间:" prop="remindtime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.remindtime" style="width: 100%"></el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="提醒人:">
        <el-select placeholder="请选择提醒人" v-model="ruleForm.reminder" multiple clearable filterable style="width: 100%">
          <el-option v-for="item in reminderNameList_" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
        <el-button @click="goback" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addTask, editTask } from "@/api/FunctionMenu/Allocation/PatrolMangement/index";

export default {
  name: "PatrolForm",
  props: {
    fromStatus: {
      type: String,
      default() {
        return "add";
      },
    },
    companyNameList: {
      type: Array,
      default() {
        return [];
      },
    },
    reminderNameList: {
      type: Array,
      default() {
        return [];
      },
    },
    allSelect: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      ruleForm: {
        companyid: "",
        endtime: "",
        remindtime: "",
        reminder: [],
        id: "",
      },
      rules: {
        companyid: [{ required: true, message: "请选择公司名称", trigger: "change" }],
        endtime: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
        remindtime: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
        reminder: [{ required: true, message: "请选择提醒人", trigger: "change" }],
      },
      reminderNameList_: this.reminderNameList,
    };
  },
  watch: {
    reminderNameList(newValue) {
      this.reminderNameList_ = newValue;
    },
  },
  methods: {
    changeCompany(value) {
      this.allSelect.forEach((item) => {
        if (item.id === value) {
          this.reminderNameList_ = item.userS;
        }
      });
      this.ruleForm.reminder = [];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append("companyid", this.ruleForm.companyid);
          // formData.append("endtime", formatDate(this.ruleForm.endtime.getTime(), "yyyy-MM-dd hh:mm:ss"));
          formData.append("endtime", this.ruleForm.endtime);
          // formData.append("remindtime", formatDate(this.ruleForm.remindtime.getTime(), "yyyy-MM-dd hh:mm:ss"));

          // formData.append("reminder", this.ruleForm.reminder.toString());
          if (this.fromStatus === "add") {
            addTask(formData).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback();
              } else {
                this.$message.error(res.data);
              }
            });
          }
          if (this.fromStatus === "edit") {
            formData.append("id", this.ruleForm.id);
            editTask(formData).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.data);
                this.goback();
              } else {
                this.$message.error(res.data);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    goback() {
      this.$emit("navBack");
    },
  },
  mounted() {},
};
</script>
