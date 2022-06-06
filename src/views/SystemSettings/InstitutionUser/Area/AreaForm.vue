<template>
  <div>
    <el-form
      ref="temp"
      :rules="rules"
      :model="temp"
      label-position="right"
      label-width="120px"
      style="width: 400px; margin-left: 80px"
    >
      <el-form-item label="上级区域:" prop="parentName">
        <el-input
          v-model="temp.parentName"
          :readonly="true"
          style="width: 220px"
          placeholder="请选择上级区域"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('id', 'name')"
        ></el-button>
      </el-form-item>
      <el-form-item label="区域名称:" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="区域编码:" prop="code">
        <el-input v-model="temp.code" />
      </el-form-item>
      <el-form-item label="排序:" prop="sort" style="width: 200px">
        <el-input v-model="temp.sort" @input="sortInput" />
      </el-form-item>
      <el-form-item label="区域类型:" prop="type" style="width: 300px">
        <el-select v-model="temp.type" placeholder="省份、直辖市">
          <el-option label="国家" value="1"></el-option>
          <el-option label="省份、直辖市" value="2"></el-option>
          <el-option label="地市" value="3"></el-option>
          <el-option label="区县、乡镇" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input
          v-model="temp.remarks"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('temp')" size="mini"
          >提交</el-button
        >
        <el-button @click="goback('temp')" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from "@/Mixins/form";
import { addArea, editArea } from "@/api/systemSettings/organizationUser/area";
export default {
  name: "AreaFrom",
  mixins: [form],
  props: {
    propName: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      temp: {
        id: "",
        parentId: "", //上级区域id
        parentName: "", //上级区域名称
        name: "", //区域名称
        code: "", //区域编码
        type: [], //区域类型
        remarks: "", //备注
        sort: "",
      },
      rules: {
        name: [{ required: true, message: "请填写区域名称", trigger: "blur" }],
        code: [{ required: true, message: "请填写区域编码", trigger: "blur" }],
        sort: [{ required: true, message: "请填排序", trigger: "blur" }],
        type: [{ required: true, message: "请选择区域类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "parentId", "id");
    },
    add(params) {
      params.parentId = params.parentId ? params.parentId : 0;
      addArea(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.temp.id = "";
          this.temp.parentId = "";
          this.resetForm("temp", 1, "parentId", "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
    edit(params) {
      params.parentId = params.parentId ? params.parentId : 0;
      editArea(params).then((res) => {
        if (res.code === 200) {
          this.temp.id = "";
          this.temp.parentId = "";
          this.$message.success("修改成功");
          this.resetForm("temp", 1, "parentId", "id");
        } else {
          this.errorWaring(res);
        }
      });
    },
    sortInput() {
      this.temp.sort = this.temp.sort.replace(/[^\d.]/g, "");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/styles/common/form.scss");
$color: #334681;
::v-deep .el-form-item__label {
  color: $color;
}
</style>
