<template>
  <div>
    <el-form
      ref="temp"
      :rules="rules"
      :model="temp"
      label-position="right"
      label-width="120px"
      style="width: 450px; margin-left: 40px"
    >
      <el-form-item label="上级机构:" style="width: 380px" prop="parentName">
        <el-input
          v-model="temp.parentName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择上级机构"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('institution')"
        ></el-button>
      </el-form-item>
      <el-form-item label="归属区域:" style="width: 380px" prop="areaName">
        <el-input
          v-model="temp.areaName"
          :readonly="true"
          style="width: 200px"
          placeholder="请选择归属区域"
        /><el-button
          class="search-button"
          type="primary"
          icon="el-icon-search"
          @click="showDialog('area')"
        ></el-button>
      </el-form-item>
      <el-form-item label="机构名称:" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="机构编码:" prop="code">
        <el-input v-model="temp.code" />
      </el-form-item>
      <el-form-item label="机构类型:" prop="type" style="width: 300px">
        <el-select v-model="temp.type">
          <el-option
            v-for="item in InstitutionTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构级别:" prop="grade" style="width: 300px">
        <el-select v-model="temp.grade">
          <el-option
            v-for="item in InstitutionLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用:" prop="isAvailable" style="width: 300px">
        <el-radio v-model="temp.isAvailable" label="1">是</el-radio>
        <el-radio v-model="temp.isAvailable" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="排序:" prop="sort" style="width: 200px">
        <el-input v-model="temp.sort" />
      </el-form-item>
      <el-form-item label="主负责人:" prop="primaryPerson">
        <el-input v-model="temp.primaryPerson" />
      </el-form-item>
      <el-form-item label="副负责人:" prop="deputyPerson">
        <el-input v-model="temp.deputyPerson" />
      </el-form-item>
      <el-form-item label="联系地址:" prop="address">
        <el-input v-model="temp.address" />
      </el-form-item>
      <el-form-item label="邮政编码:" prop="zipCode">
        <el-input v-model="temp.zipCode" />
      </el-form-item>
      <el-form-item label="负责人:" prop="master">
        <el-input v-model="temp.master" />
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input v-model="temp.phone" />
      </el-form-item>
      <el-form-item label="传真:" prop="fax">
        <el-input v-model="temp.fax" />
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="temp.email" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input
          v-model="temp.remarks"
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('temp')" size="mini"
          >提交</el-button
        >
        <el-button @click="goback" size="mini">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addTableDataItem,
  editTableDataItem,
} from "@/api/systemSettings/organizationUser/institution";
export default {
  name: "FormPage",
  props: {
    fromStatus: {
      type: String,
      default: () => {
        return "add";
      },
    },
  },
  data() {
    return {
      temp: {
        parentId: "", //上级机构id
        parentName: "", //上级机构name
        areaId: "", //归属区域ID
        areaName: "", //归属区域name
        name: "", //机构名称
        code: "", //机构编码
        type: "", //机构类型
        grade: "", //机构级别
        isAvailable: "1", //是否可用
        sort: "", //排序
        primaryPerson: "", //主负责人
        deputyPerson: "", //副负责人
        address: "", //联系地址
        zipCode: "", //邮政编码
        master: "", //负责人
        phone: "", //电话
        fax: "", //传真
        email: "", //邮箱
        remarks: "", //备注
      },
      InstitutionTypes: [
        {
          value: "0",
          label: "地市",
        },
        {
          value: "1",
          label: "区县",
        },
        {
          value: "2",
          label: "区县部门",
        },
        {
          value: "3",
          label: "乡镇",
        },
        {
          value: "4",
          label: "企业",
        },
        {
          value: "5",
          label: "企业部门",
        },
      ],
      InstitutionLevel: [
        {
          value: "0",
          label: "地市",
        },
        {
          value: "1",
          label: "区县",
        },
        {
          value: "2",
          label: "乡镇",
        },
        {
          value: "3",
          label: "企业",
        },
      ],
      rules: {
        areaName: [
          { required: true, message: "请选择归属区域", trigger: "blur" },
        ],
        name: [{ required: true, message: "请填写机构名称", trigger: "blur" }],
        sort: [{ required: true, message: "请填写排序", trigger: "blur" }],
        code: [{ required: true, message: "请填写机构编码", trigger: "blur" }],
        type: [{ required: true, message: "请选择机构类型", trigger: "blur" }],
        grade: [{ required: true, message: "请选择机构级别", trigger: "blur" }],
      },
    };
  },
  methods: {
    goback() {
      this.$emit("changeTabItem", "first", "parentId", "areaId", "id");
    },
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
    add(params) {
      params.parentId = params.parentId ? params.parentId : 0;
      addTableDataItem(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    edit(params) {
      params.parentId = params.parentId ? params.parentId : 0;
      editTableDataItem(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.resetForm("temp", 1);
        } else {
          this.$message.error(res.data);
        }
      });
    },
    showDialog(type) {
      switch (type) {
        case "institution":
          this.$emit("showDialog", type, {
            id: this.temp.parentId,
            name: this.temp.parentName,
          });
          break;
        case "area":
          this.$emit("showDialog", type, {
            id: this.temp.areaId,
            name: this.temp.areaName,
          });
          break;
      }
    },
    resetForm(formName, type) {
      this.temp.parentId = " ";
      this.temp.areaId = " ";
      this.temp.id = " ";
      this.$refs[formName].resetFields();
      this.$emit("navTableBack", type);
    },
  },
};
</script>

<style lang="scss" scoped>
$color: #334681;
@import url("@/styles/common/form.scss");
::v-deep .el-form-item__label {
  color: $color;
}
</style>
