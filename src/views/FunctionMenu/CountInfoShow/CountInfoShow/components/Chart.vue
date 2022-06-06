<template>
  <div ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  name: "SectorEcharts",
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.myEcharts();
    addListener(this.$refs.chartDom, this.resize);
    this.chart.on("click", (value) => {
      this.$emit("getItemData", value);
    });
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    myEcharts() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style lang="scss" scoped></style>
