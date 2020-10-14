<template>
  <div class="fund-manage-container">
    <div class="person-left">
      <VPaySlide :current-index="'/orderManage'" />
    </div>
    <div class="person-right">
      <div class="fund-header">
        <div class="fund-header_item fund-header_item_active">销量任务订单详情信息</div>
        <div class="fund-header_item">流量任务详情信息</div>
      </div>

      <div class="zy-font fund-header_text">此表格用于记录所有销量任务已支付的订单信息。</div>

      <div class="fund-form">
        <el-form :inline="true">
          <el-form-item :label="'统计时间：'">
            <el-date-picker
              v-model="searchForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
               <el-button type="primary">查询</el-button>
               <el-button type="warning">导出</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="fund-manage_table">
        <el-table :data="fundManageData">
          <el-table-column prop="consumeId" label="消费ID" />
          <el-table-column prop="type" label="转账金额" />
          <el-table-column prop="consumeMoney" label="消费存款" />
          <el-table-column prop="originalMoney" label="原存款" />
          <el-table-column prop="surplusMoney" label="剩余存款" />
          <el-table-column prop="remarks" label="备注" />
          <el-table-column prop="missionId" label="任务编号" />
          <el-table-column prop="missionId" label="消费时间" /> 
        </el-table>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPaySlide from "@/components/VPaySlide.vue"; // @ is an alias to /src
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";

@Component({
  components: {
    VPaySlide,
  },
})
export default class FundManage extends Vue {
  searchForm = {
    time: "",
    type: "",
    orderId: "",
    shop_name: "",
  };

  typeData = [
    {
      label: "发布任务",
      value: "1",
    },
    {
      label: "取消任务",
      value: "2",
    },
    {
      label: "发布流量任务",
      value: "3",
    },
    {
      label: "取消流量任务",
      value: "4",
    },
    {
      label: "充值",
      value: "5",
    },
    {
      label: "平台返款",
      value: "6",
    },
    {
      label: "平台扣款",
      value: "7",
    },
    {
      label: "购买评价",
      value: "8",
    },
    {
      label: "取消评价",
      value: "9",
    },
    {
      label: "订购智能助手",
      value: "10",
    },
  ];

  fundManageData=[{
      consumeId:"123",
      type:"",
      consumeMoney:"312",
      originalMoney:"312",
      surplusMoney:"3213",
      remarks:"12   ",
      missionId:"",
      consumeTime:""
  }]
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

.xs-font {
  color: #4882f0;
}

.zy-weight {
  font-weight: 600;
}

.font-18 {
  font-size: 18px;
}

.font-14 {
  font-size: 14px;
}

.space-margin-right-20 {
  margin-right: 20px;
}

.el-table td,
.el-table th {
  text-align: center;
}

.fund-manage-container {
  width: 1400px;
  height: 400px;
  text-align: left;
  margin: 20px auto 0px;
  @include flex(flex-start);
  flex-wrap: nowrap;

  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;

    .fund-header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      background: #eee;
      text-align: left;
      .fund-header_item {
        display: inline-block;
        text-align: center;
        padding: 0px 20px;
        color: #000;
        cursor: pointer;
      }
      .fund-header_item_active{
          color: #fff;
          background: #4782ef;
      }
    }

    .fund-header_text {
      margin: 10px 0px;
      font-size: 14px;
    }

    .fund-form {
      margin-top: 20px;
    }
  }

  .shop-operation_btn {
    margin-bottom: 10px;
  }

  .pay-account_item {
    @include flex(flex-start);
    .pay-account_item_label {
      width: 120px;
      text-align: right;
      font-weight: 600;
    }
    .pay-account_item_content {
      padding-left: 4px;
    }
    align-items: center;
    margin-bottom: 22px;
    .pay-account_input {
      width: 350px;
    }
  }

  .collect-container {
  }
}
</style>
