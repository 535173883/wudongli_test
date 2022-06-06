<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-form ref="ShipForm" :rules="rules" :model="ShipForm" inline label-width="160px" class="ShipForm">
        <el-form-item label="公司名称:" prop="companyId">
          <el-select v-model="ShipForm.companyId" filterable clearable placeholder="请选择公司" style="width: 100%" @change="changeCompany">
            <el-option v-for="item in companyName" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="船舶名称:" prop="shipName">
          <el-input v-model="ShipForm.shipName" placeholder="请输入船名名称" />
        </el-form-item>
        <el-form-item label="英文船名:" prop="englishShipName">
          <el-input v-model="ShipForm.englishShipName" placeholder="请输入英文船名" />
        </el-form-item>
        <el-form-item label="船号:" prop="shipNumber">
          <el-input v-model="ShipForm.shipNumber" placeholder="请输入船号" />
        </el-form-item>
        <el-form-item label="国籍:" prop="nationality">
          <el-input v-model="ShipForm.nationality" placeholder="请输入国籍" />
        </el-form-item>
        <el-form-item label="IMO:" prop="imo">
          <el-input v-model="ShipForm.imo" placeholder="请输入IMO" />
        </el-form-item>
        <el-form-item label="船型:" prop="shipType">
          <el-select v-model="ShipForm.shipType" filterable placeholder="请选择船型" style="width: 100%">
            <el-option v-for="item in shipType" :key="item.id" :label="item.value" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="吨位(t):" prop="tonnage">
          <el-input v-model="ShipForm.tonnage" placeholder="请输入吨位" />
        </el-form-item>

        <el-form-item label="载重吨位(t):" prop="loadTon">
          <el-input v-model="ShipForm.loadTon" placeholder="请输入载重吨位" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详细信息</span>
      </div>
      <el-form inline label-width="160px" class="ShipForm">
        <el-form-item label="代理名称:">
          <el-input v-model="ShipForm.proxyName" placeholder="请输入代理名称" />
        </el-form-item>
        <el-form-item label="代理电话:">
          <el-input v-model="ShipForm.proxyPhone" placeholder="请输入代理电话" />
        </el-form-item>
        <el-form-item label="停泊时间:">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.berthTime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="当前停泊位置:">
          <el-select v-model="ShipForm.berthWharf" filterable placeholder="请选择停泊位置" style="width: 100%">
            <el-option v-for="item in berthWharf" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进厂时间:">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.inFactoryTime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="出厂时间:">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.outFactoryTime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="台风时停泊位置:" prop="tfBerthWharf">
          <el-select v-model="ShipForm.tfBerthWharf" filterable placeholder="请选择停泊位置" style="width: 100%">
            <el-option v-for="item in tfBerthWharf" :label="item.name" :key="item.id" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="恢复动力时间:">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.recoveryPowerTime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="防台措施:" prop="antiTyphoonMethods">
          <el-input v-model="ShipForm.antiTyphoonMethods" />
        </el-form-item>
        <el-form-item label="计划船期:" prop="scheduledShippingDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.scheduledShippingDate" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="船上值班人数:" prop="numberofattendantsonboard">
          <el-input v-model="ShipForm.numberofattendantsonboard" />
        </el-form-item>
        <el-form-item label="船方联系人:" prop="shipContact">
          <el-input v-model="ShipForm.shipContact" />
        </el-form-item>
        <el-form-item label="船方联系人电话:" prop="shipContactPhone">
          <el-input v-model="ShipForm.shipContactPhone" />
        </el-form-item>
        <el-form-item label="公司联系人:" prop="companyContact">
          <el-input v-model="ShipForm.companyContact" />
        </el-form-item>
        <el-form-item label="公司联系人电话:" prop="companyContactPhone">
          <el-input v-model="ShipForm.companyContactPhone" />
        </el-form-item>
        <el-form-item label="最近PSC检查时间:">
          <el-date-picker type="date" placeholder="选择日期" v-model="ShipForm.latelyPSCtime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="最近PSC检查地点:" prop="latelyPSCLocation">
          <el-input v-model="ShipForm.latelyPSCLocation" />
        </el-form-item>

        <el-form-item label="是否为建成待交付船舶:">
          <el-select v-model="ShipForm.completedForDeliverYorNot" placeholder="请选择" style="width: 100%">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国内船员数量:" prop="numberOfDomesticCrew">
          <el-input v-model="ShipForm.numberOfDomesticCrew" />
        </el-form-item>
        <el-form-item label="外籍船员数量:" prop="numberOfForeignCrew">
          <el-input v-model="ShipForm.numberOfForeignCrew" />
        </el-form-item>
        <el-form-item label="定位仪器:" prop="positioningInstrument">
          <el-input v-model="ShipForm.positioningInstrument" />
        </el-form-item>
        <el-form-item label="卡号:" prop="cardNumber">
          <el-input v-model="ShipForm.cardNumber" />
        </el-form-item>
        <el-form-item label="产品号:" prop="productId">
          <el-input v-model="ShipForm.productId" />
        </el-form-item>
        <el-form-item label="备注:" prop="remarks">
          <el-input v-model="ShipForm.remarks" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm">保存</el-button>
          <el-button @click="resetForm" size="mini">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-button type="primary" size="mini" @click="submitForm">保存</el-button>
    <el-button size="mini" @click="resetForm">返回</el-button> -->
  </div>
</template>

<script>
import { getBerth, addList, editShip } from "@/api/FunctionMenu/ShipManagement/ShipManagement";
import { formatDate } from "@/utils/validate";
export default {
  name: "ShipForm",
  props: {
    propName: {
      type: Number,
      default: 1,
    },
    fromStatus: {
      type: String,
      default: () => {
        return "add";
      },
    },
    EchData: {
      type: Object,
      default() {
        return {};
      },
    },
    companyName: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    EchData(newValue) {
      console.log(newValue);
      if (newValue.companyId) {
        getBerth(newValue.companyId).then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.berthWharf = res.data;
            this.tfBerthWharf = res.data;
            this.ShipForm = JSON.parse(JSON.stringify(newValue));
          }
        });
      }
    },
  },
  data() {
    return {
      shipType: [
        { id: "0", value: "冷藏船" },
        { id: "1", value: "危化品船" },
        { id: "2", value: "友联商船" },
        { id: "3", value: "友联散货船" },
        { id: "4", value: "客艇" },
        { id: "5", value: "工程船" },
        { id: "6", value: "成品油船" },
        { id: "7", value: "拖网船" },
        { id: "8", value: "拖船" },
        { id: "9", value: "挖泥船" },
        { id: "10", value: "改装工程船" },
        { id: "11", value: "散货" },
        { id: "12", value: "散货船" },
        { id: "13", value: "油化品" },
        { id: "14", value: "油化船" },
        { id: "15", value: "油船" },
        { id: "16", value: "油轮" },
        { id: "17", value: "渔船" },
        { id: "18", value: "起重船" },
        { id: "19", value: "运输船" },
        { id: "20", value: "集装箱" },
        { id: "21", value: "集装箱船" },
        { id: "22", value: "驳船" },
      ],
      berthWharf: [],
      tfBerthWharf: [],
      ShipForm: {
        companyId: undefined, //公司名称
        //船舶类型
        berthWharf: undefined, //当前停泊位置
        tfBerthWharf: undefined, //台风时停泊位置
        shipType: undefined,
        shipName: undefined,
        englishShipName: undefined,
        shipNumber: undefined,
        nationality: undefined,
        imo: undefined,
        proxyName: undefined,
        proxyPhone: undefined,
        berthTime: undefined,
        loadTon: undefined,
        tonnage: undefined,
        inFactoryTime: undefined,
        outFactoryTime: undefined,
        recoveryPowerTime: undefined,
        antiTyphoonMethods: undefined,
        companyContactPhone: undefined,
        scheduledShippingDate: undefined,
        numberofattendantsonboard: undefined,
        shipContact: undefined,
        shipContactPhone: undefined,
        companyContact: undefined,
        latelyPSCtime: undefined,
        latelyPSCLocation: undefined,
        remarks: undefined,
        completedForDeliverYorNot: undefined, //是否为建成待交付船舶
        positioningInstrument: undefined,
        cardNumber: undefined,
        productId: undefined,
        numberOfDomesticCrew: undefined,
        numberOfForeignCrew: undefined,
      },
      rules: {
        shipName: [{ required: true, message: "请输入船舶名称", trigger: "blur" }],
        companyId: [{ required: true, message: "请选择公司名称", trigger: "blur" }],
        shipNumber: [{ required: true, message: "请输入船号", trigger: "blur" }],
        nationality: [{ required: true, message: "请输入国籍", trigger: "blur" }],
        imo: [{ required: true, message: "请输入imo号码", trigger: "blur" }],
        shipType: [{ required: true, message: "请选择船型", trigger: "change" }],
        tonnage: [{ required: true, message: "请输入吨位", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取公司名称
    changeCompany(value) {
      getBerth(value).then((res) => {
        if (res.code == 200) {
          this.berthWharf = res.data;
          this.tfBerthWharf = res.data;
        }
      });
    },
    submitForm() {
      let arr = ["berthTime", "inFactoryTime", "outFactoryTime", "recoveryPowerTime", "scheduledShippingDate", "latelyPSCtime"];
      this.$refs["ShipForm"].validate((valid) => {
        if (valid) {
          arr.forEach((item) => {
            if (this.ShipForm[item] && typeof this.ShipForm[item] === "object") {
              this.ShipForm[item] = formatDate(this.ShipForm[item].getTime(), "yyyy-MM-dd hh:mm:ss");
            }
          });
          if (this.fromStatus === "add") {
            if (this.ShipForm.id) delete this.ShipForm.id;
            addList(this.ShipForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.resetForm(1);
              }
            });
          } else {
            console.log(this.ShipForm);
            editShip(this.ShipForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.resetForm(1);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ShipForm.resetFields();
      this.$emit("navTableBack", 1);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.ShipForm {
  ::v-deep .el-form-item__label {
    color: rgb(58, 139, 212);
  }
  ::v-deep .el-form-item__content {
    width: 300px;
  }
}
::v-deep .el-card__header {
  font-size: 18px;
  font-weight: 800;
  color: rgb(58, 139, 212);
  background: rgb(241, 241, 241);
}
// .remarks {
//   width: 95%;
// }
// .el-form-item {
//   width: 377px;
// }
</style>
