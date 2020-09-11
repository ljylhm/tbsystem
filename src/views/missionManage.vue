<template>
  <div class="mission-container">
    <v-header
      :list="[
        '任务管理',
        '待接手任务（0）',
        '进行中任务（0）',
        '待审核订单任务（0）',
        '待审核买手任务（0）',
      ]"
      :currentIndex="currentIndex"
      :handleSwitchTab="handleSwitchTab"
    />

    <div class="zy-font tx-tip">
      现在需要商家打款本金+部分佣金到买手卡里，其余佣金平台来做打款，（详情看收费标准）
    </div>

    <div class="mission-form">
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="searchForm.platType" placeholder="任务分类">
            <el-option
              v-for="item in platTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchForm.missionType" placeholder="全部任务">
            <el-option
              v-for="item in missTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchForm.idType">
            <el-option
              v-for="item in idTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input :v-model="searchForm.idValue"></el-input>
        </el-form-item>

        <el-form-item label="发布时间">
          <el-date-picker
            v-model="searchForm.create_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="发布时间">
          <el-button type="primary" round>查询</el-button>
          <el-button type="success" round>批量取消</el-button>
          <el-button type="warning" round>导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mission-table">
      <el-table :data="missionData">
        <el-table-column prop="account" label="任务分类" width="100px">
          <template slot-scope="scope">
            <div>淘宝</div>
            <div class="zy-font">销量任务</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品图片" width="200px">
          <template slot-scope="scope">
            <div class="mission-pic">
              <img src="http://img.alicdn.com/imgextra/i2/4259894285/O1CN01VutPqD1hWZcnTXcEF_!!4259894285.jpg_400x400.jpg"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务/订单编号" width="300px">
          <template slot-scope="scope">
            <div class="zy-font">普通销量任务</div>
            <div>任务编号:V61241620966920200902174612 <span class="zy-font">(APP自然搜索)</span></div>
            <div>订单编号:1224865189656197237</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务/订单编号" width="300px">
          <template slot-scope="scope">
            <div class="zy-font">普通销量任务</div>
            <div>任务编号:V61241620966920200902174612 <span class="zy-font">(APP自然搜索)</span></div>
            <div>订单编号:1224865189656197237</div>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VHeader from "@/components/VHeader.vue"; // @ is an alias to /src

type ISelect = {
  label: string;
  value: string;
};

@Component({
  components: {
    VHeader,
  },
})
export default class Publish extends Vue {
  currentIndex: number = 0;

  searchForm = {
    platType: "",
    missionType: "",
    idType: "1",
    idValue: "",
    create_time: "",
  };

  platTypes = [
    {
      label: "淘宝",
      value: "1",
    },
    {
      label: "京东",
      value: "2",
    },
    {
      label: "拼多多",
      value: "3",
    },
  ];

  missTypesArray = [
    "隐藏任务",
    "待接手",
    "进行中",
    "待发货",
    "待评价",
    "已完成",
    "待完成",
    "已取消",
    "多商品任务",
  ];
  missTypes: ISelect[] = [];

  idTypesArray = [
    "任务编号",
    "订单编号",
    "运单号",
    "店铺名称",
    "买号",
    "商品Id",
    "商品名称",
  ];
  idTypes: ISelect[] = [];

  missionData = [{
    platType:"",
    missionType:"",
    missionId: "",
    orderId:"",

    buyerName:"",
    isMirror: false,
    isVailteSelf: false,
    keyWord:"",
    shopName:"",

  }]

  mounted() {

    this.missTypes = this.missTypesArray.map((item, index) => {
      return {
        label: item,
        value: index.toString(),
      };
    });

    this.idTypes = this.idTypesArray.map((item, index) => {
      return {
        label: item,
        value: index.toString(),
      };
    });
  }

  handleSwitchTab(index: number) {
    this.currentIndex = index;
  }
}
</script>

<style lang="scss">
@mixin flex($direction) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: $direction;
}

@mixin setHeight($height) {
  height: $height;
  line-height: $height;
}

.zy-font {
  color: red;
}

.under-line {
  text-decoration: underline;
  cursor: pointer;
}

.space-margin-top-15 {
  margin-top: 20px;
}
.space-margin-left-15 {
  margin-left: 15px;
}

.pubilsh-choose-header {
  @include flex(flex-start);
  align-items: center;
  .pubilsh-choose_input {
    margin: 0px 10px;
  }
}
.pubilsh-choose-content {
  margin-top: 15px;
}

.mission-container {
  width: 1200px;
  height: auto;
  border: 1px solid #ddd;
  margin: 20px auto 60px;
  padding: 20px;
  border: 1px solid #000;

  .mission-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #eee;
    text-align: left;
    .mission-header_item {
      display: inline-block;
      text-align: center;
      padding: 0px 20px;
      background: #4782ef;
      color: #fff;
    }
  }

  .mission-form {
    text-align: left;
  }

  .mission-table{
    .mission-pic{
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      & > img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .tx-tip {
    text-align: left;
    margin: 10px 0px;
  }
}
</style>
