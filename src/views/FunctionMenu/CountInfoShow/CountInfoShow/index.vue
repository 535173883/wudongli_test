<template>
  <div class="content">
    <div class="container-item">
      <div class="item-box">
        <Map></Map>
      </div>
    </div>
    <div class="container-item">
      <div class="item-box">
        <ShipTable></ShipTable>
      </div>
    </div>
    <div class="container-item">
      <div class="item-box">
        <Echarts></Echarts>
      </div>
    </div>
    <div class="container-item" style="background: #cccccc">
      <div class="item-box">
        <Camera></Camera>
      </div>
    </div>
  </div>
</template>

<script>
import Camera from "./components/Camera.vue";
import Echarts from "./components/Echarts.vue";
import ShipTable from "./components/ShipTable.vue";
import Map from "../../components/Map.vue";

export default {
  name: "CountInfoShow",
  components: { Camera, Echarts, ShipTable, Map },
  data() {
    return {
      key: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: grid;
  padding: 30px;
  grid-template-columns: calc(50% - 15px) calc(50% - 15px);
  grid-template-rows: calc(50% - 15px) calc(50% - 15px);
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  // background-image: url("../../../../assets/0-604909.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-item {
  display: block;
  border-radius: 30px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 9px 9px 10px #cfd1d2, -9px -9px 10px #ffffff;
  padding: 20px;
  border: #e6e1e1 2px solid;
  .item-box {
    height: calc(100% - 5px);
    width: calc(100% - 5px);
  }
}
</style>
