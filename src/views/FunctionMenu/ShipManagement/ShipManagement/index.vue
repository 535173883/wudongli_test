<template>
  <div>
    <NavTable :tabList="tabList" :active="activeName" ref="NavTable" @changeTabItem="changeTabItem">
      <div slot="first">
        <div class="search">
          <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline" width="100%">
            <el-form-item label="公司:" prop="companyName">
              <el-select
                v-model="ruleForm.companyName"
                filterable
                clearable
                placeholder="请选择公司"
                @change="changeCompanyName"
                style="height: 100%"
              >
                <el-option v-for="item in companyName" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现停泊位置:" prop="berthWharf">
              <el-select v-model="ruleForm.berthWharf" filterable clearable placeholder="根据公司获取停泊位置">
                <el-option v-for="item in berthWharf" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="船舶名称:" prop="shipName">
              <el-input type="text" v-model="ruleForm.shipName" placeholder="请输入船舶名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item prop="type">
              <el-select v-model="ruleForm.exportType" filterable clearable placeholder="请选择导出类型" @change="changeExportType">
                <el-option v-for="item in ruleForm.type" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="onExport">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          ref="table"
          v-loading="loading"
          :header-cell-style="{ background: '#eef1f6', color: '#334681' }"
          :row-style="{ color: '#334681' }"
        >
          <el-table-column label="公司名称" prop="companyName" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="companyName" v-model="checkList.companyName">公司名称</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="船舶名称" prop="shipName" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="shipName" v-model="checkList.shipName">船舶名称</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="英文船名" prop="englishShipName" align="center" width="200">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="englishShipName" v-model="checkList.englishShipName">英文船名</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="船号" prop="shipNumber" align="center" width="160">
            <template slot="header" slot-scope="scope"> <el-checkbox label="shipNumber" v-model="checkList.shipNumber">船号</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="国籍" prop="nationality" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="nationality" v-model="checkList.nationality">国籍</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="IMO" prop="imo" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="imo" v-model="checkList.imo">IMO</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="船型" prop="shipType" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="shipType" v-model="checkList.shipType">船型</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="代理名称" prop="proxyName" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="proxyName" v-model="checkList.proxyName">代理名称</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="代理电话" prop="proxyPhone" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="proxyPhone" v-model="checkList.proxyPhone">代理电话</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="停泊时间" prop="berthTime" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="berthTime" v-model="checkList.berthTime">停泊时间</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="当前停泊位置" prop="name" width="200" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="name" v-model="checkList.name">当前停泊位置</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="载重吨位" prop="loadTon" align="center" width="150">
            <template slot="header" slot-scope="scope"> <el-checkbox label="loadTon" v-model="checkList.loadTon">载重吨位</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="吨位" prop="tonnage" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="tonnage" v-model="checkList.tonnage">吨位</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="进厂时间" prop="inFactoryTime" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="inFactoryTime" v-model="checkList.inFactoryTime">进厂时间</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="出厂时间" prop="outFactoryTime" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="outFactoryTime" v-model="checkList.outFactoryTime">出厂时间</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="有无动力" prop="powerOrNot" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="powerOrNot" v-model="checkList.powerOrNot">有无动力</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="台风时停泊位置" prop="names" width="200" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="names" v-model="checkList.names">台风时停泊位置</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="预计恢复动力时间" prop="recoveryPowerTime" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="recoveryPowerTime" v-model="checkList.recoveryPowerTime">预计恢复动力时间</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="防台措施" prop="antiTyphoonMethods" width="300" show-overflow-tooltip align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="antiTyphoonMethods" v-model="checkList.antiTyphoonMethods">防台措施</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="计划船期" prop="scheduledShippingDate" align="center" width="200">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="scheduledShippingDate" v-model="checkList.scheduledShippingDate">计划船期</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="船上值班人数" prop="numberofattendantsonboard" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="numberofattendantsonboard" v-model="checkList.numberofattendantsonboard">船上值班人数</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="船方联系人" prop="shipContact" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="shipContact" v-model="checkList.shipContact">船方联系人</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="船方联系人电话" prop="shipContactPhone" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="shipContactPhone" v-model="checkList.shipContactPhone">船方联系人电话</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="公司联系人" prop="companyContact" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="companyContact" v-model="checkList.companyContact">公司联系人</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="公司联系人电话" prop="companyContactPhone" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="companyContactPhone" v-model="checkList.companyContactPhone">公司联系人电话</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="最近PSC检查时间" prop="latelyPSCtime" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="latelyPSCtime" v-model="checkList.latelyPSCtime">最近PSC检查时间</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="最近PSC检查地点" prop="latelyPSCLocation" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="latelyPSCLocation" v-model="checkList.latelyPSCLocation">最近PSC检查地点</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remarks" align="center" width="200">
            <template slot="header" slot-scope="scope"> <el-checkbox label="remarks" v-model="checkList.remarks">备注</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="是否为建成待交付船舶" prop="completedForDeliverYorNot" width="200" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="completedForDeliverYorNot" v-model="checkList.completedForDeliverYorNot">是否为建成待交付船舶</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="所属地" prop="belong" align="center" width="200">
            <template slot="header" slot-scope="scope"> <el-checkbox label="belong" v-model="checkList.belong">所属地</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="定位仪器" prop="positioningInstrument" align="center" width="200">
            <template slot="header" slot-scope="scope">
              <el-checkbox label="positioningInstrument" v-model="checkList.positioningInstrument">定位仪器</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="卡号" prop="cardNumber" align="center">
            <template slot="header" slot-scope="scope"> <el-checkbox label="cardNumber" v-model="checkList.cardNumber">卡号</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="产品号" prop="productId" align="center" width="200">
            <template slot="header" slot-scope="scope"> <el-checkbox label="productId" v-model="checkList.productId">产品号</el-checkbox> </template>
          </el-table-column>
          <el-table-column label="基点" prop="position" align="center" width="250">
            <template slot="header" slot-scope="scope"> <el-checkbox label="position" v-model="checkList.position">基点</el-checkbox> </template>
            <template slot-scope="scope">
              <span v-if="scope.row.position">
                {{ scope.row.position | ToDegrees }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="350" fixed="right">
            <template slot-scope="scope">
              <el-button class="button" size="mini" @click="editShip(scope.row)">修改</el-button>
              <el-button class="button" size="mini" type="danger" @click="deleteShip(scope.row.id)">删除</el-button>
              <el-button class="button" size="mini" type="primary" :disabled="!scope.row.productId" @click="setPoint(scope.row)"
                >添加当前基点</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <PaginationPage
          style="margin: 10px 0; padding: 0"
          @pagination="pagination"
          v-show="total > 0"
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
        ></PaginationPage>
      </div>
      <div slot="second">
        <ShipForm
          @navTableBack="navTableBack"
          :fromStatus="fromStatus"
          :companyName="companyName"
          :EchData="EchData"
          ref="ShipForm"
          class="scrollbar"
        ></ShipForm>
      </div>
    </NavTable>
  </div>
</template>

<script>
import NavTable from "@/components/NavTable.vue/index.vue";
import ShipForm from "../ShipManagement/ShipForm.vue";
import { getCompany, getList, getAllShip, getBerth, deleteShip, setPoint } from "@/api/FunctionMenu/ShipManagement/ShipManagement";
import { baseURL } from "@/utils/request";
export default {
  name: "ShipManagement",
  components: { NavTable, ShipForm },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      shipName: [],
      berthWharf: [],
      companyName: [],
      dialogVisible: false,
      fromStatus: "add",
      activeName: "first",
      tabList: [
        { label: "企业无动力船舶管理列表", name: "first" },
        { label: "企业无动力船舶管理添加", name: "second" },
      ],
      checkList: {
        companyName: false,
        shipName: false,
        englishShipName: false,
        shipNumber: false,
        nationality: false,
        imo: false,
        shipType: false,
        proxyName: false,
        proxyPhone: false,
        berthTime: false,
        name: false,
        loadTon: false,
        tonnage: false,
        inFactoryTime: false,
        outFactoryTime: false,
        powerOrNot: false,
        names: false,
        recoveryPowerTime: false,
        antiTyphoonMethods: false,
        scheduledShippingDate: false,
        numberofattendantsonboard: false,
        shipContact: false,
        shipContactPhone: false,
        companyContact: false,
        companyContactPhone: false,
        latelyPSCtime: false,
        latelyPSCLocation: false,
        remarks: false,
        completedForDeliverYorNot: false,
        belong: false,
        positioningInstrument: false,
        cardNumber: false,
        productId: false,
        position: false,
      },
      exportsList: [
        {
          content: "公司名称",
          keyword: "companyName",
        },
        {
          content: "船舶名称",
          keyword: "shipName",
        },
        {
          content: "英文船名",
          keyword: "englishShipName",
        },
        {
          content: "船号",
          keyword: "shipNumber",
        },
        {
          content: "国籍",
          keyword: "nationality",
        },
        {
          content: "IMO",
          keyword: "imo",
        },
        {
          content: "船型",
          keyword: "shipType",
        },

        {
          content: "代理名称",
          keyword: "proxyName",
        },
        {
          content: "代理电话",
          keyword: "proxyPhone",
        },
        {
          content: "停泊时间",
          keyword: "berthTime",
        },

        {
          content: "当前停泊位置",
          keyword: "name",
        },
        {
          content: "载重吨位",
          keyword: "loadTon",
        },
        {
          content: "吨位",
          keyword: "tonnage",
        },

        {
          content: "进厂时间",
          keyword: "inFactoryTime",
        },
        {
          content: "出厂时间",
          keyword: "outFactoryTime",
        },

        {
          content: "有无动力",
          keyword: "powerOrNot",
        },
        {
          content: "台风时停泊位置",
          keyword: "names",
        },

        {
          content: "预计恢复动力时间",
          keyword: "recoveryPowerTime",
        },
        {
          content: "防台措施",
          keyword: "antiTyphoonMethods",
        },

        {
          content: "计划船期",
          keyword: "scheduledShippingDate",
        },
        {
          content: "船上值班人数",
          keyword: "numberofattendantsonboard",
        },

        {
          content: "船方联系人",
          keyword: "shipContact",
        },
        {
          content: "船方联系人电话",
          keyword: "shipContactPhone",
        },
        {
          content: "公司联系人",
          keyword: "companyContact",
        },
        {
          content: "公司联系人电话",
          keyword: "companyContactPhone",
        },
        {
          content: "最近PSC检查时间",
          keyword: "latelyPSCtime",
        },
        {
          content: "最近PSC检查地点",
          keyword: "latelyPSCLocation",
        },
        {
          content: "备注",
          keyword: "remarks",
        },
        {
          content: "是否为建成待交付船舶",
          keyword: "completedForDeliverYorNot",
        },
        {
          content: "所属地",
          keyword: "belong",
        },
        {
          content: "定位仪器",
          keyword: "positioningInstrument",
        },
        {
          content: "卡号",
          keyword: "cardNumber",
        },
        {
          content: "产品号",
          keyword: "productId",
        },

        {
          content: "基点",
          keyword: "position",
        },
      ],
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
      ruleForm: {
        companyName: "", //公司名称
        berthWharf: "", //现停泊位置
        shipName: "",
        type: [
          {
            label: "全选",
            value: "1",
          },
          {
            label: "海事局报表",
            value: "2",
          },
          {
            label: "经信局日报",
            value: "3",
          },
          {
            label: "经信局半月报",
            value: "4",
          },
          {
            label: "清除全部",
            value: "5",
          },
        ],
        exportType: "",
      },
      EchData: {},
      loading: true,
    };
  },
  filters: {
    ToDegrees(value) {
      if (typeof value == "undefined" || value == "") {
        return "";
      }

      value = value.split(",");
      function tool(val, str) {
        var i = val.indexOf(".");
        var strDu = i < 0 ? val : val.substring(0, i); //获取度
        var strFen = 0;
        var strMiao = 0;
        if (i > 0) {
          var strFen = "0" + val.substring(i);
          strFen = strFen * 60 + "";
          i = strFen.indexOf(".");
          if (i > 0) {
            strMiao = "0" + strFen.substring(i);
            strFen = strFen.substring(0, i); //获取分
            strMiao = strMiao * 60 + "";
            i = strMiao.indexOf(".");
            strMiao = strMiao.substring(0, i + 4); //取到小数点后面三位
            strMiao = parseFloat(strMiao).toFixed(2); //精确小数点后面两位
          }
        }
        return strDu + "°" + strFen + "′" + strMiao + "″" + str;
      }

      let a = "";
      if (Number(value[0]) > 0 && Number(value[0]) < 90) {
        a = "N";
      } else {
        a = "S";
      }

      let b = "";
      if (Number(value[1]) > 0 && Number(value[1]) < 180) {
        b = "E";
      } else {
        b = "W";
      }
      return tool(value[0], a) + " , " + tool(value[1], b);
    },
  },
  methods: {
    changeExportType(value) {
      if (value === "1") {
        for (let key in this.checkList) {
          this.checkList[key] = true;
        }
      } else if (value === "5" || !value) {
        for (let key in this.checkList) {
          this.checkList[key] = false;
        }
      } else if (value === "2") {
        let arr = [
          "shipNumber",
          "berthTime",
          "companyContact",
          "companyContactPhone",
          "belong",
          "positioningInstrument",
          "cardNumber",
          "productId",
          "position",
        ];
        for (let key in this.checkList) {
          if (arr.includes(key)) {
            this.checkList[key] = false;
          } else {
            this.checkList[key] = true;
          }
        }
      } else if (value === "3") {
        let arr = [
          "companyName",
          "shipNumber",
          "nationality",
          "shipType",
          "name",
          "tonnage",
          "names",
          "antiTyphoonMethods",
          "remarks",
          "belong",
          "positioningInstrument",
        ];
        for (let key in this.checkList) {
          if (arr.includes(key)) {
            this.checkList[key] = true;
          } else {
            this.checkList[key] = false;
          }
        }
      } else {
        let arr = [
          "companyName",
          "shipNumber",
          "nationality",
          "shipType",
          "name",
          "tonnage",
          "names",
          "antiTyphoonMethods",
          "recoveryPowerTime",
          "remarks",
          "belong",
        ];
        for (let key in this.checkList) {
          if (arr.includes(key)) {
            this.checkList[key] = true;
          } else {
            this.checkList[key] = false;
          }
        }
      }
    },
    //获取数据
    async getList(params) {
      const res = await getList(params);
      this.tableData = res.data.records;
      this.loading = false;
      this.total = res.data.total;
      this.currentPage = res.data.current;
      this.pageSize = res.data.size;
    },
    //页数
    pagination(value) {
      const params = {
        berthWharf: this.ruleForm.berthWharf,
        companyId: this.ruleForm.companyName,
        shipName: this.ruleForm.shipName,
        pageSize: value.limit,
        pageNo: value.page,
      };
      this.getList(params);
    },
    //获取公司名称
    async getCompany() {
      const res = await getCompany();

      this.companyName = res.data;
    },
    changeCompanyName(value) {
      if (value) {
        getBerth(value).then((res) => {
          if (res.code == 200) {
            this.berthWharf = res.data;
          }
        });
      }
    },
    //获取船舶
    async getAllShip() {
      const result = await getAllShip();
      if (result.code == 200) {
        this.shipName = result.data;
      }
    },

    // 查询
    onSubmit() {
      const params = {
        berthWharf: this.ruleForm.berthWharf,
        companyId: this.ruleForm.companyName,
        shipName: this.ruleForm.shipName,
        pageSize: 10,
        pageNo: 1,
      };
      this.getList(params);
    },
    reset() {
      this.ruleForm.berthWharf = "";
      this.ruleForm.companyName = "";
      this.ruleForm.shipName = "";
      this.getList({ pageNo: 1, pageSize: 10 });
    },
    editShip(row) {
      this.fromStatus = "edit";
      const ShipForm = {
        id: row.id,
        companyId: row.companyId, //公司名称
        //船舶类型
        berthWharf: row.berthWharf, //当前停泊位置
        tfBerthWharf: row.tfBerthWharf, //台风时停泊位置
        shipType: row.shipType,
        shipName: row.shipName,
        englishShipName: row.englishShipName,
        shipNumber: row.shipNumber,
        nationality: row.nationality,
        imo: row.imo,
        proxyName: row.proxyName,
        proxyPhone: row.proxyPhone,
        berthTime: row.berthTime,
        loadTon: row.loadTon,
        tonnage: row.tonnage,
        companyContactPhone: row.companyContactPhone,
        inFactoryTime: row.inFactoryTime,
        outFactoryTime: row.outFactoryTime,
        recoveryPowerTime: row.recoveryPowerTime,
        antiTyphoonMethods: row.antiTyphoonMethods,
        scheduledShippingDate: row.scheduledShippingDate,
        numberOfAttendantSonBoard: row.numberOfAttendantSonBoard,
        shipContact: row.shipContact,
        shipContactPhone: row.shipContactPhone,
        companyContact: row.companyContact,
        latelyPSCtime: row.latelyPSCtime,
        latelyPSCLocation: row.latelyPSCLocation,
        remarks: row.remarks,
        completedForDeliverYorNot: row.completedForDeliverYorNot, //是否为建成待交付船舶
        positioningInstrument: row.positioningInstrument,
        cardNumber: row.cardNumber,
        productId: row.productId,
        numberOfDomesticCrew: row.numberOfDomesticCrew,
        numberOfForeignCrew: row.numberOfForeignCrew,
      };
      this.EchData = ShipForm;
      console.log(this.EchData);
      this.$refs["NavTable"].activeValue = "second";
      this.tabList[1].label = "企业无动力船舶管理修改";
    },
    deleteShip(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteShip(id).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList({ pageNo: 1, pageSize: 10 });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    setPoint(row) {
      //console.log(row);
      this.$confirm("确定设置该船为基点吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setPoint(row.id).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.data);
              this.getList({ pageNo: 1, pageSize: 10 });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 导出
    onExport() {
      let checked = [];
      for (let key in this.checkList) {
        if (this.checkList[key]) {
          checked.push(key);
        }
      }
      if (!this.ruleForm.exportType && checked.length == 0) {
        this.$message.error("请选择要导出的数据");
        return;
      }
      this.$confirm("确定导出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {};
          this.exportsList.forEach((item) => {
            checked.forEach((v) => {
              if (item.keyword === v) {
                obj[item.content] = v;
              }
            });
          });

          let formData = new FormData();
          formData.append("json", JSON.stringify(obj));
          fetch(baseURL + "wdl/ship/exportExcel", {
            method: "post",
            body: formData,
            responseType: "blob",
            headers: {
              "X-token": window.sessionStorage.getItem("token"),
            },
          })
            .then((res) => {
              console.log(res);
              return res.blob();
            })
            .then((blob) => {
              console.log(blob);
              this.download(blob, "无动力船舶表.xlsx");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    download(data, fileName) {
      console.log(data);
      fileName = decodeURIComponent(fileName);

      if (!data) {
        this.$message.warning("文件下载失败");
        return;
      }
      let url = window.URL.createObjectURL(data);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    // 返回
    navTableBack(type) {
      console.log(type);
      if (type) {
        this.getList({ pageNo: 1, pageSize: 10 });
      }
      this.$refs["NavTable"].activeValue = "first";
      this.fromStatus = "add";
      this.tabList[1].label = "企业无动力船舶管理添加";
    },
    changeTabItem() {
      this.tabList[1].label = "企业无动力船舶管理添加";
      this.EchData = {};
      this.fromStatus = "add";
      //console.log(this.companyName);
      if (window.sessionStorage.getItem("userType") === "0") {
        //企业用户
        this.EchData.companyId = this.companyName[0].id;
      }
      this.$refs.ShipForm.ShipForm["berthTime"] = "";
      this.$refs.ShipForm.ShipForm["inFactoryTime"] = "";
      this.$refs.ShipForm.ShipForm["outFactoryTime"] = "";
      this.$refs.ShipForm.ShipForm["recoveryPowerTime"] = "";
      this.$refs.ShipForm.ShipForm["scheduledShippingDate"] = "";
      this.$refs.ShipForm.ShipForm["latelyPSCtime"] = "";
      this.$refs.ShipForm.$refs.ShipForm.resetFields();
    },
  },
  mounted() {
    //获取数据
    this.getList({ pageNo: 1, pageSize: 10 });
    this.getCompany();
    this.getAllShip();
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 1rem;
  text-align: left;
}
.el-form-item {
  margin-bottom: 12px;
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
// .el-checkbox {
//   color: rgb(51, 70, 129) !important;
// }
::v-deep .el-table .el-table__cell .cell .el-checkbox {
  color: rgb(51, 70, 129);
  font-weight: 800;
}
@import url("@/styles/common/table.scss");
::v-deep .el-table {
  .el-table__cell {
    padding: 6px 0;
  }
  .cell {
    overflow: hidden;
  }
  .cell.el-tooltip {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
