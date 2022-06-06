<template>
  <div>
    <NavTable :tabList="tabList" :active.sync="activeName" ref="NavTable">
      <div slot="first">
        <el-form :inline="true" class="searchForm" style="text-align: left">
          <el-form-item label="公司:">
            <el-select v-model="searchCompany" filterable clearable>
              <el-option v-for="item in CompanyList" :key="item.companyId" :value="item.companyId" :label="item.name"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
          :row-style="{ color: '#334681' }"
          ref="table"
        >
          <el-table-column prop="areaName" label="区域" align="center"> </el-table-column>
          <el-table-column prop="companyName" label="公司名称" align="center"> </el-table-column>
          <el-table-column prop="shipName" label="船舶名称" align="center"> </el-table-column>
          <el-table-column prop="inspectionNumber" label="巡检次数" align="center"> </el-table-column>
          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button class="button" size="mini" @click="tableItemEdit(scope.row)">修改</el-button>
              <el-button class="button" size="mini" type="danger" @click="tableItemDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <Pagination @pagination="pagination" v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize"></Pagination>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from '@/components/NavTable.vue/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { getTableList, getCompanyList } from '@/api/FunctionMenu/CountManagement/CountInfo/index'
export default {
  name: 'CountInfo',
  components: {
    NavTable,
    Pagination
  },
  data() {
    return {
      activeName: 'first',
      tabList: [{ label: '统计信息列表', name: 'first' }],
      CompanyList: [],
      searchCompany: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    getTableList(pageNo = 1, pageSize = 10, companyId) {
      let params = {
        pageNo,
        pageSize,
        companyId
      }
      getTableList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    getCompanyList() {
      getCompanyList().then((res) => {
        if (res.code == 200) {
          this.CompanyList = res.data
          console.log(this.CompanyList)
        }
      })
    },
    search() {
      this.getTableList(1, 10, this.searchCompany)
    },
    pagination(value) {
      this.getTableList(value.page, value.limit, this.searchCompany)
    }
  },
  mounted() {
    this.getTableList()
    this.getCompanyList()
  }
}
</script>

<style lang="scss" scoped>
@import url('@/styles/common/table.scss');
::v-deep .el-table {
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: inherit;
  }
}
::v-deep .el-date-editor .el-range-separator {
  padding: 0;
}
.el-form-item {
  ::v-deep .el-form-item__content {
    height: 30px;
    .el-select,
    .el-input {
      input {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
