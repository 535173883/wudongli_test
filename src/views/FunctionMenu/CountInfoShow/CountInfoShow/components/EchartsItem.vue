<template>
  <div class="itemcontent">
    <div class="echarts-item-title">
      {{ title }}
    </div>
    <div class="echarts-item-content">
      <Chart v-bind="$attrs" style="height: 100%" v-on="$listeners"></Chart>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart.vue";
export default {
  name: "EchartsItem",
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  components: { Chart },
};
</script>

<style lang="scss" scoped>
.itemcontent {
  width: 100%;
  height: 100%;
}
.echarts-item-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #334681;
  font-size: 1rem;
  font-weight: 900;
}
.echarts-item-content {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
