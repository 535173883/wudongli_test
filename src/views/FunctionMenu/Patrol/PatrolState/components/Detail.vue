<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>机舱</span>
      </div>
      <el-form ref="form" :model="jc" label-width="120px">
        <div class="radios">
          <el-form-item label="主机:">
            <el-radio-group v-model="jc.zjdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主机是否有故障:">
            <el-radio-group v-model="jc.zjsfgzdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="辅机:">
            <el-radio-group v-model="jc.fjdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="辅机是否有故障:">
            <el-radio-group v-model="jc.fjsfgzdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in jc.zjzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :lazy="true"
            @load="imageLoad"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jc.zjbz" style="width: 500px"> </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>甲板</span>
      </div>
      <el-form ref="form" :model="jb" label-width="130px">
        <div class="radios" style="width: 50%">
          <el-form-item label="前缆机:">
            <el-radio-group v-model="jb.qljdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="前锚机:">
            <el-radio-group v-model="jb.qmjdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="后缆机:">
            <el-radio-group v-model="jb.hljdxk">
              <el-radio label="1">有</el-radio>
              <el-radio label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in jb.qljzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jb.qljbz" style="width: 60%"> </el-input>
        </el-form-item>
        <el-form-item label="是否加锚链:">
          <el-radio-group v-model="jb.sfjmldxk">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数量和系法:">
          <el-input type="text" v-model="jb.sfjml" style="width: 60%" />
        </el-form-item>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in jb.sfjmlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jb.sfjmlbz" style="width: 60%"> </el-input>
        </el-form-item>
        <el-form-item label="是否加高强度缆绳:">
          <el-radio-group v-model="jb.sfjgqdlsdxk">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数量和系法:">
          <el-input type="text" v-model="jb.sfjgqdls" style="width: 60%" />
        </el-form-item>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in jb.sfjgqdlszp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jb.sfjgqdlsbz" style="width: 60%"> </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>缆绳</span>
      </div>
      <el-form ref="form" :model="ls" label-width="130px">
        <div class="radios" style="width: 60%">
          <el-form-item label="前缆:">
            <el-select v-model="ls.qlxlk" placeholder="请选择缆绳系法">
              <el-option label="直接缆绳套缆桩" value="1"></el-option>
              <el-option label="8字形围绕缆桩" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前缆数量:">
            <el-input type="number" v-model="ls.ql" />
          </el-form-item>
        </div>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in ls.qlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="前缆备注:">
          <el-input type="textarea" v-model="ls.qlbz" style="width: 60%" />
        </el-form-item>

        <div class="radios" style="width: 60%">
          <el-form-item label="中缆:">
            <el-select v-model="ls.zlxlk" placeholder="请选择缆绳系法">
              <el-option label="直接缆绳套缆桩" value="1"></el-option>
              <el-option label="8字形围绕缆桩" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中缆数量:">
            <el-input type="number" v-model="ls.zl" />
          </el-form-item>
        </div>

        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in ls.zlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="中缆备注:">
          <el-input type="textarea" v-model="ls.zlbz" style="width: 60%" />
        </el-form-item>

        <div class="radios" style="width: 60%">
          <el-form-item label="后缆:">
            <el-select v-model="ls.hlxlk" placeholder="请选择缆绳系法">
              <el-option label="直接缆绳套缆桩" value="1"></el-option>
              <el-option label="8字形围绕缆桩" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="后缆数量:">
            <el-input type="number" v-model="ls.hl" />
          </el-form-item>
        </div>

        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in ls.hlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="后缆备注:">
          <el-input type="textarea" v-model="ls.hlbz" style="width: 60%" />
        </el-form-item>
        <div class="radios" style="width: 60%">
          <el-form-item label="前倒缆:">
            <el-select v-model="ls.qdlxlk" placeholder="请选择缆绳系法">
              <el-option label="直接缆绳套缆桩" value="1"></el-option>
              <el-option label="8字形围绕缆桩" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前倒缆数量:">
            <el-input type="number" v-model="ls.qdl" />
          </el-form-item>
        </div>

        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in ls.qdlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="前倒缆备注:">
          <el-input type="textarea" v-model="ls.qdlbz" style="width: 60%" />
        </el-form-item>
        <div class="radios" style="width: 60%">
          <el-form-item label="后倒缆:">
            <el-select v-model="ls.hdlxlk" placeholder="请选择缆绳系法">
              <el-option label="直接缆绳套缆桩" value="1"></el-option>
              <el-option label="8字形围绕缆桩" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="后倒缆数量:">
            <el-input type="number" v-model="ls.hdl" />
          </el-form-item>
        </div>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in ls.hdlzp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="前倒缆备注:">
          <el-input type="textarea" v-model="ls.hdlbz" style="width: 60%" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>其他</span>
      </div>
      <el-form ref="form" :model="qt" label-width="120px">
        <el-form-item label="船上总人数:">
          <el-input type="number" v-model="qt.cszrs" style="width: 60%" />
        </el-form-item>
        <el-form-item label="外籍人员数量:">
          <el-input type="number" v-model="qt.wjrysl" style="width: 60%" />
        </el-form-item>
        <el-form-item label="是否进船坞:">
          <el-input type="text" v-model="qt.sfjcwxlk" style="width: 60%" v-if="qt.sfjcwxlk" />
          <span v-else>否</span>
        </el-form-item>
        <el-form-item label="照片:">
          <el-image
            v-for="(item, index) in qt.cszrszp.split(',').filter((v) => v)"
            :src="item"
            :key="index"
            :preview-src-list="[item]"
            style="width: 100px; height: 100px; margin: 0 5px"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="qt.cszrsbz" style="width: 60%"> </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>审核</span>
      </div>
      <el-form ref="form" :model="postData" label-width="120px">
        <el-form-item label="审核是否通过:">
          <el-select v-model="postData.isPass" :disabled="isComplete">
            <el-option label="通过" :value="true"></el-option>
            <el-option label="不通过" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整改意见:">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="postData.textarea" :readonly="isComplete"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :disabled="isComplete">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { submitRectificationOpinions } from "@/api/FunctionMenu/Patrol/PatrolState/index";
export default {
  name: "detail",
  props: {
    detail: {
      type: Object,
      default() {
        return {
          jc: {},
          jb: {},
          ls: {},
          qt: {},
        };
      },
    },

    isComplete: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      postData: {
        isPass: true,
        textarea: "",
      },
    };
  },
  computed: {
    jc() {
      console.log(this.detail);
      return this.detail.jc;
    },
    jb() {
      return this.detail.jb;
    },
    ls() {
      return this.detail.ls;
    },
    qt() {
      return this.detail.qt;
    },
  },
  filters: {},
  methods: {
    imageLoad(Event) {
      console.log(Event);
    },
    submitForm() {
      let params = {
        id: this.detail.id,
        state: this.postData.isPass,
        zhenggaiopinion: this.postData.textarea,
      };
      submitRectificationOpinions(params).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.data);
          this.$emit("navBack");
        } else {
          this.$message.error(res.data);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.box-card {
  width: 95%;
  margin: 20px auto;
}
.title {
  text-align: left;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
}

::v-deep .el-form-item__content {
  text-align: left;
}
.radios {
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
}
::v-deep .el-input__inner {
  border-top: none;
  border-left: none;
  border-right: none;
  line-height: 0;
  border-radius: 0;
}
::v-deep .el-card__header {
  font-size: 18px;
  font-weight: 800;
  color: rgb(58, 139, 212);
  background: rgb(241, 241, 241);
}
</style>
