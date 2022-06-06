<template>
  <div class="echarts-container">
    <div class="echartsbox">
      <div class="echarts-item">
        <EchartsItem
          title="区域无动力船舶分布数"
          :option="AllChartData"
          @getItemData="getItemData"
        ></EchartsItem>
      </div>
      <div class="echarts-item">
        <EchartsItem :title="childTitle" :option="ChartDataItem"></EchartsItem>
      </div>
    </div>
    <div class="echartsbox">
      <div class="echarts-item">
        <EchartsItem
          title="区域无动力船舶分布数"
          :option="AllChartData"
          @getItemData="getItemData"
        ></EchartsItem>
      </div>
      <div class="echarts-item">
        <EchartsItem :title="childTitle" :option="ChartDataItem"></EchartsItem>
      </div>
    </div>
  </div>
</template>

<script>
import { GetShipEchartsData } from "@/api/FunctionMenu/CountInfoShow/CountInfoShow";
import EchartsItem from "./EchartsItem.vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "EchartsPage",
  data() {
    return {
      echartsDataTemplate: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          orient: "horizontal",
          left: "0%",
          bottom: "0%",
          itemWidth: 10,
          itemHeight: 10,
          itemStyle: {
            borderCap: "round",
          },
          textStyle: {
            color: "#334681",
            fontSize: 12,
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["20%", "40%"],
            top: "0%",
            data: [
              {
                value: 700,
                name: "长涂镇",
                children: [{ name: "11", value: 222 }],
              },
              { value: 553, name: "秀山乡" },
              { value: 553, name: "衡山镇" },
              { value: 221, name: "黛西镇" },
              { value: 390, name: "高亭镇" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            center: ["50%", "50%"],
            label: {
              formatter: "{b}: {c}",
            },
          },
        ],
      },
      childTitle: "", // xx + 船舶分布数
      AllChartData: {},
      ChartDataItem: {},
    };
  },
  methods: {
    transForm(list) {
      const chartDataItem = list.map((item) => {
        return {
          name: item.companyName,
          value: item.shipCounts,
        };
      });
      const cloneDataItem = cloneDeep(this.echartsDataTemplate);
      cloneDataItem.series[0].data = chartDataItem;
      this.ChartDataItem = cloneDataItem;
    },
    getItemData(value) {
      const params = value.data.children;
      this.transForm(params);
      this.childTitle = `${value.data.name}船舶分布数`;
    },
    async getErchartsData() {
      const res = await GetShipEchartsData();
      const chartData = res.data.map((item) => {
        return {
          name: item.areaName,
          value: item.shipCounts,
          children: item.children,
        };
      });
      const params = res.data[0].children;
      this.transForm(params);
      this.childTitle = `${res.data[0].areaName}船舶分布数`;
      const cloneDataAll = cloneDeep(this.echartsDataTemplate);
      cloneDataAll.series[0].data = chartData;
      this.AllChartData = cloneDataAll;
    },
  },
  mounted() {
    this.getErchartsData();
  },
  components: { EchartsItem },
};
</script>

<style lang="scss" scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  .echartsbox {
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .echarts-item {
      width: 100%;
      height: 50%;
    }
  }
}
</style>
