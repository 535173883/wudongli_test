<template>
  <div class="container">
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      class="shiptable"
      ref="table"
      :header-row-style="fn"
      :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
      :row-style="{ color: '#334681' }"
    >
      <el-table-column
        prop="companyName"
        label="公司名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="proxyName" label="船舶名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="nationality" label="国籍" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="imo" label="IMO" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="shipType" label="船型" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="当前停泊位置"
        show-overflow-tooltip
        width="110"
      >
      </el-table-column>
      <el-table-column
        prop="names"
        label="台风时停泊位置"
        show-overflow-tooltip
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="antiTyphoonMethods"
        label="防台措施"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="shipContact"
        label="船方联系人"
        show-overflow-tooltip
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="shipContactPhone"
        label="船方联系人电话"
        show-overflow-tooltip
        width="120"
      >
      </el-table-column>
      <el-table-column prop="cardNumber" label="卡号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remarks" label="当前位置" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <div class="item-aciont">
            <div class="itemCamareAction">
              <div
                class="itemCamareAction-box"
                v-for="item in testlist"
                :key="item.name"
              >
                <div class="itemCamareAction-box-left">
                  <div>
                    <svg-icon icon-class="play" class="iconitem"></svg-icon>
                  </div>
                  <div>{{ item.name }}</div>
                </div>
                <div class="itemCamareAction-box-right">
                  <span
                    ><i
                      class="el-icon-remove-outline iconitem"
                      style="color: red"
                    ></i
                  ></span>
                </div>

                <el-divider direction="vertical"></el-divider>
              </div>
            </div>

            <span
              @click="tableItemAdd(scope.row)"
              style="color: #387dff; cursor: pointer"
              >添加</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <PaginationPage
      @pagination="pagination"
      v-show="total > 1"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      class="pagination"
    ></PaginationPage>
  </div>
</template>

<script>
import pagination from "@/Mixins/pagination";
import { GetShipDataList } from "@/api/FunctionMenu/CountInfoShow/CountInfoShow";
export default {
  name: "ShipTablePage",
  mixins: [pagination],
  data() {
    return {
      tableData: [],
      tableItemData: [
        { prop: "companyName", label: "公司名称" },
        { prop: "proxyName", label: "船舶名称" },
        { prop: "nationality", label: "国籍" },
        { prop: "imo", label: "IMO" },
        { prop: "shipType", label: "船型" },
        { prop: "name", label: "当前停泊位置" },
        { prop: "remarks", label: "台风时停泊位置" },
        { prop: "antiTyphoonMethods", label: "防台措施" },
        { prop: "shipContact", label: "船方联系人" },
        { prop: "shipContactPhone", label: "船方联系人电话" },
        { prop: "cardNumber", label: "卡号" },
        { prop: "remarks", label: "当前位置" },
      ],
      testlist: [{ name: "摄像头1" }, { name: "摄像头2" }],
    };
  },
  methods: {
    fn() {
      return "background-color:red";
    },
    async getTableList(params) {
      const res = await GetShipDataList(params);
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    tableItemAdd(value) {
      console.log(value);
    },
  },
  mounted() {
    // 获取数据
    this.getTableList({ pageNo: 1, pageSize: 10 });
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.shiptable {
  height: calc(100% - 47px);
  overflow: auto;
  color: #334681;
}
.pagination {
  padding: 0;
  margin-top: 10px;
}
.item-aciont {
  height: 50px;
  display: flex;
  align-items: center;
  .itemCamareAction {
    display: flex;
    .itemCamareAction-box {
      display: flex;
      position: relative;
      align-items: center;
      .itemCamareAction-box-left {
        display: inline-block;
        font-size: 12px;
        margin-right: 5px;
      }
      .itemCamareAction-box-right {
        display: flex;
        align-items: center;
      }
      .iconitem {
        color: #387dff;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  overflow: initial;
}
.shiptable {
  ::v-deep .el-table__header-wrapper {
    overflow: initial;
  }
}
::v-deep .el-table {
  .el-table__cell {
    padding: 3px 0;
  }
}
</style>
