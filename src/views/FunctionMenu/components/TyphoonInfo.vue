<template>
  <div class="typhoon-box" id="TyphoonInfo">
    <div class="title">
      <span>台风信息</span>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12"
          ><div class="left">
            <span class="leftSpan">名称:</span>
            <span class="rightSpan">{{ typhoonData.name }}</span>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="right">
            <span class="leftSpan">强度:</span>
            <span class="rightSpan">{{ typhoonData.strong }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12">
          <div class="left">
            <span class="leftSpan">气压:</span>
            <span class="rightSpan">{{ typhoonData.pressure }}帕</span>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="right">
            <span class="leftSpan">风力:</span>
            <span class="rightSpan">{{ typhoonData.speed }}米/秒</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="12"
          ><div class="left">
            <span class="leftSpan">移动方向:</span>
            <span class="rightSpan">{{ typhoonData.movedirection }}</span>
          </div></el-col
        >
        <el-col :span="12">
          <div class="right">
            <span class="leftSpan">移动速度:</span>
            <span class="rightSpan">{{ typhoonData.movespeed }}km/h</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="24"
          ><div class="left">
            <span class="leftSpan">时间:</span>
            <span class="rightSpan">{{ typhoonData.time }}</span>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="box-item">
      <el-row>
        <el-col :span="24">
          <div class="left">
            <span class="leftSpan">位置:</span>
            <span class="rightSpan">{{ typhoonData.lng | lngTransform }} {{ typhoonData.lat | latTransform }}</span>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "TyphoonInfo",
  data() {
    return {};
  },
  props: {
    typhoonData: {
      type: Object,
      default: () => {
        return {
          name: "蔷琵", //名称
          lat: "15.90", //纬度
          lng: "140.80", //经度
          movespeed: "13", //移动速度
          power: "8", //等级
          strong: "热带风暴", //强度
          speed: "18", //风力
          movedirection: "北西", //移动方向
          pressure: "1003", //气压
          time: "2021/6/23 8:00:00", //时间
        };
      },
    },
  },
  methods: {},
  filters: {
    lngTransform: function (value) {
      const res = value >= 0 ? `${Math.abs(value)}E°` : `${Math.abs(value)}W°`;
      return res;
    },
    latTransform: function (value) {
      const res = value >= 0 ? `${Math.abs(value)}N°` : `${Math.abs(value)}S°`;
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
  z-index: 2;
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
