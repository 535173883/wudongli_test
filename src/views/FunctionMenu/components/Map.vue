<template>
  <div class="map-container">
    <div id="map">
      <div class="noTyphoonTitle">
        <div class="wrap">
          <div class="father">
            <Scroll :options="options"></Scroll>
          </div>
        </div>
      </div>
      <div class="shipSearch">
        <el-autocomplete
          class="inline-input"
          v-model="searchShip"
          :fetch-suggestions="querySearch"
          placeholder="搜索"
          suffix-icon="el-icon-search"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <div
        class="tip-box"
        :class="!isOpenTipbox ? 'tip-box-open' : 'tip-box-close'"
      >
        <div class="tip-box-left">
          <svg-icon
            @click="changeTipboxOpenStatus"
            icon-class="sort"
            class="tip-box-svg"
            :class="{ 'is-open-tipbox': isOpenTipbox }"
          ></svg-icon>
        </div>
        <transition name="tipbox">
          <div class="tip-box-right" v-show="!isOpenTipbox">
            <el-row>
              <el-col v-for="item in typeList" :key="item.name" :span="4">
                <div class="tipitem">
                  <div class="tipitembox">
                    <div class="item-color" :style="item.style"></div>
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </transition>
      </div>
      <div class="menudot" @click="fullScreen" v-show="!isscreenfull">
        <svg-icon icon-class="fullScreen"></svg-icon>
      </div>
      <TyphoonInfo
        v-show="hasTyphoonInfo"
        ref="TyphoonInfo"
        :typhoonData="TphoonMes"
        id="TyphoonInfo"
      ></TyphoonInfo>
      <ShipMessage
        v-show="isShowShipMessage"
        :ShipData="shipMessage"
        ref="shipMessage"
        id="shipMessage"
      ></ShipMessage>
    </div>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { fromLonLat } from "ol/proj"; // 坐标系转换
import { Overlay } from "ol";
import MapApi from "@/utils/map/methods";
import screenfull from "screenfull";
import { SetPosition } from "@/utils/map/methods/acustomfunction/methods";
import {
  GetTyphoonData,
  GetShipMes,
  QueryShip,
} from "@/api/FunctionMenu/CountInfoShow/CountInfoShow";
import TyphoonInfo from "./TyphoonInfo.vue";
import Scroll from "./Scroll.vue";
import typhoonData from "./testData/typhoon.json";
import addTyphoon from "@/utils/map/methods/addTyphoon";
import ShipMessage from "./ShipMessage.vue";
export default {
  name: "MapPage",
  components: {
    Scroll,
    TyphoonInfo,
    ShipMessage,
  },
  data() {
    return {
      MapApi, //地图方法
      layers: MapApi.Layers, //api中的内置图层
      map: null, //地图对象
      hasTyphoonInfo: false,
      lastShowSolar: null,
      intervalLogo: null,
      timer: null,
      typeList: [
        { name: "热带风暴", color: "red", style: "background-color:red" },
        { name: "热带低压", color: "blue", style: "background-color:blue" },
        { name: "强热带风暴", color: "green", style: "background-color:green" },
        { name: "台风", color: "orange", style: "background-color:orange" },
        { name: "强台风", color: "yellow", style: "background-color:yellow" },
        { name: "超强台风", color: "salmon", style: "background-color:salmon" },
      ],
      //台风信息框
      TphoonMes: {},
      isscreenfull: false,
      options: {
        text: "当前无台风", // 通知内容
        // icon: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=236296424,1105446647&fm=26&gp=0.jpg", // 左侧图标(不需要icon不传)
        iconSize: "16px", // icon大小（正方形默认16px）
        size: "14px", // 通知内容文字大小（默认16px）
        color: "#757E95", // 通知内容文字颜色(默认#f60)
        backround: "#E3E4EB", //背景颜色(默认#fff7cc)
        delay: "1000", // 动画延迟时间(默认一秒后开始滚动，单位毫秒)
        speed: "50", // 滚动速率默认50 (px/s)
      },
      isOpenTipbox: false,
      shipTypes: [
        { color: "#00FF00", shipstate: "1" },
        { color: "#FFAF00", shipstate: "2" },
        { color: "#FF0000", shipstate: "3" },
      ],
      shipMessage: {
        belong: "岱山县", //所属
        berthwharf: "e578a3228dda4532ad50ae97ec2d5998", //当前停泊位置
        cardnumber: "", //卡号
        companycontact: "和泰公司1", //公司联系人
        companycontactphone: "22211111", //  公司联系人电话
        companyid: "47dd12dc4f4b561460b0d6804cb4aedf", // 公司id
        companyname: "常石集团", // 公司名称
        course: "000", //航向
        ispoint: "0", //  是否有基点
        lastxjtime: "", //
        lat: "30.165000555555554", //纬度
        lon: "122.13972444444445", //经度
        nationality: "", //国籍
        positioninginstrument: "", //定位仪器
        productno: "085", //产品号
        shipcontact: "和泰船方1", //船方联系人
        shipcontactphone: "32111111", //船方联系人电话
        shipid: "47dd12dc4f4b561460b0d6804cb4aedf", //
        shipname: "和泰001", //船名
        shipnumber: "ht01", //船号
        shipstate: "3", //船舶状态    1正常   2失去信号   3船舶移位
        shiptype: "油轮", //船型
        tfberthwharf: "1dcf569980654ff4a4dc15165e8b4603", //台风时停泊位置
        time: "2021-07-27 07:53:07", //上报时间
        tonnage: "", //吨位
        type: "否", //类型
      },
      shipList: [],
      isShowShipMessage: false,
      searchShip: "",
      getShipTiming: null,
    };
  },
  methods: {
    handleSelect(item) {
      const { lon, lat, shipid } = item;
      const LonLat = this.lineDataTrans(`${lon} ${lat}`);
      this.map.getView().setCenter([LonLat[0], LonLat[1]]);
      this.shipMessage = item;
      console.log(this.MapApi);
      this.MapApi.SelectKuang(
        this.map,
        [this.MapApi.GetLayersById(this.map, "ShipGroupLayer")],
        shipid,
        "groupship",
        true
      );
    },
    querySearch(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      QueryShip({ name: queryString }).then((res) => {
        const shipList = cloneDeep(res.data).map((item) => {
          item.value = item.shipname;
          return item;
        });
        cb(shipList);
      });
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    changeTipboxOpenStatus() {
      this.isOpenTipbox = !this.isOpenTipbox;
    },
    //全屏准备
    screenPrepare() {
      screenfull.on("change", () => {
        this.isscreenfull = !this.isscreenfull;
      });
      //禁用f11全屏
      window.onkeydown = function (event) {
        if (event.keyCode === 122) {
          event.preventDefault();
          event.returnValue = false;
        }
      };
    },
    //全屏按钮
    fullScreen() {
      const element = document.getElementById("map");
      if (screenfull.isEnabled) {
        screenfull.request(element);
      } else {
        console.log("object");
        // Ignore or do something else
      }
    },
    //创建新地图
    CreateNewMap() {
      const map = {
        //初始化定义的图层可以放入多个属性
        layers: this.layers,
        maxTilesLoading: 4,
      };
      this.map = this.MapApi.CreateMap(map);
    },
    async GetTyphoonData() {
      return { data: typhoonData };
    },
    async getTyphoonData() {
      const res = await GetTyphoonData();
      // const res = await this.GetTyphoonData()
      if (Array.isArray(res.data)) {
        return;
      } else {
        const points = res.data.points;
        const name = res.data.name;
        this.hasTyphoonInfo = true;
        const typhoonInfo = points[points.length - 1];
        const { lat, lng, movespeed, power, pressure, speed, strong, time } =
          typhoonInfo;
        this.options.text = `当前台风：${name}       时间：${time}           位置：${lat},${lng}          移动速度：${movespeed}km/h        中心气压：${pressure}Pa          中心风速：${speed}m/s           台风等级：${power}            台风类型：${strong}`;
        addTyphoon(this.map, res.data, this);
      }
    },
    //获取船舶list数据
    GetShipMes() {
      GetShipMes().then((res) => {
        if (res.code === 200) {
          this.shipList = res.data;
          this.shipList = this.shipList.filter((item) => {
            if (item.shipid) {
              return item;
            }
          });
          if (this.shipList.length) {
            this.isShowShipMessage = true;
            this.DrawGroupShip(this.shipList);
          }
        }
      });
    },
    DrawGroupShip(value, addType = false) {
      const datalist = value;
      const layer = this.MapApi.GetLayersById(this.map, "ShipGroupLayer");
      this.MapApi.DrawShip(
        this.map,
        layer,
        datalist,
        (e) => this.groupFeature(e, { type: "groupship" }),
        addType,
        "shipid"
      );
      //添加鼠标移入事件
      this.shipAddpPointermove(this.map);
    },
    groupFeature(data, self) {
      const LonLat = this.lineDataTrans(`${data.lon} ${data.lat}`);
      const _color = this.shipTypes.find(
        (item) => item.shipstate === data.shipstate
      );
      const color = _color ? _color.color : "#00FF00";
      const feature = {
        shipType: data.shiptype, // 船舶类型 shipType：75为渔货船
        shipid: data.shipid,
        lon: LonLat[0],
        lat: LonLat[1],
        name: data.shipname,
        time: data.time,
        show: true,
        co: 0,
        color: color,
      };
      return Object.assign(feature, self);
    },
    lineDataTrans(d) {
      const data = [];
      const d1 = d.split(",");
      for (const i1 in d1) {
        const d2 = d1[i1].split(" ");
        data.push({
          lon: Number(d2[0]),
          lat: Number(d2[1]),
        });
      }
      data.map(function (item, index, arr) {
        if (index > 0) {
          3;
          if (item.lon - arr[index - 1].lon < -180) item.lon += 60;
          else if (item.lon - arr[index - 1].lon > 180) {
            let i = index - 1;
            while (i >= 0) {
              arr[i--].lon += 360;
            }
          }
        }
      });
      const ar = [];
      data.forEach(function (item) {
        ar.push(fromLonLat([Number(item.lon), Number(item.lat)]));
      });

      return ar[0];
    },
    shipAddpPointermove(map) {
      let showShipMes = new Overlay({
        element: document.getElementById("shipMessage"),
      });
      let _this = this;
      map.on("pointermove", function (evt) {
        let pixel = map.getEventPixel(evt.originalEvent);
        let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
        if (feature) {
          const type = feature.getProperties()["type"];
          if (type === "groupship") {
            let [lon, lat] = [feature.get("lon"), feature.get("lat")];
            const shipid = feature.get("shipid");
            _this.shipMessage = _this.shipList.find(
              (item) => item.shipid === shipid
            );
            showShipMes.setPosition([lon, lat]);
            map.addOverlay(showShipMes);
          }
        } else {
          map.removeOverlay(showShipMes);
        }
      });
    },
  },
  mounted() {
    this.CreateNewMap(); //创建地图
    this.MapApi.GetLayersById(this.map, "GridsLayer").setVisible(true); //显示经纬度
    SetPosition(this.map, { lat: 17963128, lon: 73203084 }); //地图定位
    this.map.getView().setZoom(8);
    this.getTyphoonData(); //台风渲染
    this.screenPrepare(); //全屏控件添加
    this.GetShipMes();
    this.getShipTiming = setInterval(() => {
      this.GetShipMes(); //添加船舶
    }, 10000 * 60);
  },
  destroyed() {
    this.map.getLayers().clear();
    clearTimeout(this.timer);
    clearTimeout(this.intervalLogo);
    clearInterval(this.getShipTiming);
  },
};
</script>

<style lang="scss" scoped>
.shipSearch {
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 10px;
}
.map-container {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  ::v-deep .wind-circle {
    position: absolute;
    z-index: 1;
    top: -15px;
    right: -10px;
    img {
      height: 30px;
      width: 30px;
      animation: fadenum 2s infinite linear;
    }
  }
  @keyframes fadenum {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  .menudot {
    position: absolute;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 13px;
    right: 3px;
    top: calc(50% - 20px);
    z-index: 1;
    background-color: hsla(0, 0%, 47.1%, 0.2);
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    font-size: 30px;
    color: #fff;
    svg {
      color: #ffffff;
    }
  }
}
.noTyphoonTitle {
  height: 40px;
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: start;
  .wrap {
    .father {
      height: 40px;
      width: 100%;
      img {
        height: 100%;
        width: 20px;
      }
    }
  }
}
.tip-box-open {
  width: 750px;
  border-radius: 20px;
}
.tip-box-close {
  width: 60px;
  border-radius: 10px;
}
.tip-box {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  bottom: 25px;
  right: 5px;
  font-size: 12px;
  color: #000000;
  background: #ffffff;
  padding: 10px;
  z-index: 1;
  transition: 1s;
  .tip-box-right {
    width: 95%;
  }
  .tip-box-left {
    width: 41px;
    .is-open-tipbox {
      transform: rotate(180deg);
    }
    .tip-box-svg {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  .tipitem {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    .tipitembox {
      width: 92px;
      height: 20px;
      background: #f7f9fa;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // background-color: #000000;
      border-radius: 10px;
      padding: 0 5px 0 2px;
      box-shadow: 4px 4px 7px #cfd1d2, -4px -4px 7px #ffffff;
      min-width: 92px;
    }
    .item-color {
      display: inline-block;
      height: 14px;
      width: 14px;
      border-radius: 7px;
      margin-right: 10px;
    }
  }
}
#wind-circle {
  position: absolute;
  z-index: 1;
  top: -15px;
  right: -10px;
  img {
    height: 30px;
    width: 30px;
    animation: fadenum 1s infinite linear;
  }
}
@keyframes fadenum {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.showTphoonMessage {
  position: absolute;
  border-radius: 10px;
  top: 20px;
  left: 10px;
  white-space: nowrap;
}
.tipbox-enter-active {
  transition: opacity 3s;
}
.tipbox-leave-active {
  transition: opacity 0.5s;
}
.tipbox-enter, .tipbox-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
