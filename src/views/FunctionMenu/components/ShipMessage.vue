<template>
  <div class="typhoon-box" id="TyphoonInfo">
    <div class="title">
      <span>船舶信息</span>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12"
          ><div class="left">
            <span class="leftSpan">名称:</span>
            <span class="rightSpan">{{ ShipData.shipname }}</span>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="right">
            <span class="leftSpan">国籍:</span>
            <span class="rightSpan">{{ ShipData.nationality }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12">
          <div class="left">
            <span class="leftSpan">吨位:</span>
            <span class="rightSpan">{{ ShipData.tonnage }}</span>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="right">
            <span class="leftSpan">船型:</span>
            <span class="rightSpan">{{ ShipData.shiptype }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12"
          ><div class="left">
            <span class="leftSpan">船舶状态:</span>
            <span class="rightSpan">{{
              ShipData.shipstate | shipStateTransform
            }}</span>
          </div></el-col
        >
        <el-col :span="12">
          <div class="right">
            <span class="leftSpan">航向:</span>
            <span class="rightSpan">{{ ShipData.course }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="24"
          ><div class="left">
            <span class="leftSpan">上报时间:</span>
            <span class="rightSpan">{{ ShipData.time }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="24">
          <div class="left">
            <span class="leftSpan">位置:</span>
            <span class="rightSpan"
              >{{ ShipData.lon | lngTransform }}
              {{ ShipData.lat | latTransform }}</span
            >
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShipMessage",
  data() {
    return {};
  },
  props: {
    ShipData: {
      type: Object,
      default: () => {
        return {
          belong: "", //所属
          berthwharf: "", //当前停泊位置
          cardnumber: "", //卡号
          companycontact: "", //公司联系人
          companycontactphone: "", //  公司联系人电话
          companyid: "", // 公司id
          companyname: "", // 公司名称
          course: "", //航向
          ispoint: "", //  是否有基点
          lastxjtime: "", //
          lat: "", //纬度
          lon: "", //经度
          nationality: "", //国籍
          positioninginstrument: "", //定位仪器
          productno: "", //产品号
          shipcontact: "", //船方联系人
          shipcontactphone: "", //船方联系人电话
          shipid: "", //
          shipname: "", //船名
          shipnumber: "", //船号
          shipstate: "", //船舶状态
          shiptype: "", //船型
          tfberthwharf: "", //台风时停泊位置
          time: "", //上报时间
          tonnage: "", //吨位
          type: "", //类型
        };
      },
    },
  },
  methods: {},
  filters: {
    shipStateTransform: function (value) {
      let res = "";
      switch (value) {
        case "1":
          res = "船位正常";
          break;
        case "2":
          res = "无报位";
          break;
        default:
          res = "船位偏移";
          break;
      }
      return res;
    },
    lngTransform: function (value) {
      const res =
        value >= 0 ? `${Math.abs(value).toFixed(2)}E°` : `${Math.abs(value)}W°`;
      return res;
    },
    latTransform: function (value) {
      const res =
        value >= 0 ? `${Math.abs(value).toFixed(2)}N°` : `${Math.abs(value)}S°`;
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
$background: #ffffff;
$common-font-color: #000000;
.typhoon-box {
  width: 250px;
  height: 155px;
  border-radius: 10px;
  box-shadow: 0 0 5px #ffffff;
  bottom: 10px;
  left: -110px;
  z-index: 1;
  color: $common-font-color;
  position: absolute;
  font-size: 13px;
  background: $background;
  .title {
    display: flex;
    border-radius: 12px 12px 0 0;
    background: #e7e5e5;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    color: $common-font-color;
    border-bottom: #cccccc 1px solid;
    span {
      text-align: center;
      width: 100%;
    }
  }
  .box-item {
    text-align: start;
    margin-bottom: 8px;
    padding-left: 5px;
  }
}
</style>
