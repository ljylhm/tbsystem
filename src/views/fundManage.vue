<template>
  <div class="fund-manage-container">
    <div class="person-left">
      <VPaySlide :current-index="'/fundManage'" />
    </div>
    <div class="person-right">
      <div class="fund-header">
        <div class="fund-header_item">收支流水明细</div>
      </div>

      <div class="zy-font fund-header_text">
        此表格用于记录会员的所有收支流水明细，财务如需对账可以直接导出此表格。
      </div>

      <div class="fund-form">
        <el-form :inline="true">
          <el-form-item :label="'任务编号：'">
            <el-input v-model="searchForm.task_id"></el-input>
          </el-form-item>

          <el-form-item :label="'类型：'">
            <el-select v-model="searchForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item :label="'店铺名称：'">
            <el-input v-model="searchForm.shop_name"></el-input>
          </el-form-item> -->
          <!-- <br /> -->
          <el-form-item :label="'统计时间：'">
            <el-date-picker
              v-model="searchForm.time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeChange"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchbtn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="fund-manage_table">
        <el-table :data="fundManageData">
          <el-table-column prop="charge_no" label="消费ID" />
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              <!-- {{ scope.row.type ? getAmountType(scope.row.type) : "--" }} -->
              {{ scope.row.description }}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="变动金额（元）">
            <template slot-scope="scope">
              <span class="zy-font" v-if="showAmount(scope.row.flow,scope.row.amount) == '+'">+{{scope.row.amount}}</span>
              <span style="color:green" v-if="showAmount(scope.row.flow,scope.row.amount) == '-'">-{{scope.row.amount}}</span>
            </template>
          </el-table-column> 
          <el-table-column prop="pre_amount" label="原金额（元）" />
          <el-table-column prop="next_amount" label="剩余金额（元）" />
          <el-table-column prop="description" label="备注" />
          <el-table-column prop="order_no" label="任务编号">
            <template slot-scope="scope">
              {{ scope.row.task_id ? scope.row.task_id : "--" }}
            </template>
          </el-table-column>
          task_id
          <el-table-column prop="updated_at" label="消费时间" />
        </el-table>
      </div>

      <v-table
        :total="total"
        :hide-on-single-page="true"
        :pageSizeChange="pageSizeChange"
        :currentPage="searchForm.page"
      ></v-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPaySlide from "@/components/VPaySlide.vue"; // @ is an alias to /src
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";
import { getFundChareList } from "@/service/money";
import { IFundParam, IFundRes } from "@/constance/money";
import VTable from "@/components/VTable.vue";

@Component({
  components: {
    VPaySlide,
    VTable,
  },
})
export default class FundManage extends Vue {
  searchForm: IFundParam = {
    dtstart: "",
    dtend: "",
    type: "",
    task_id: "",
    page: 1,
    limit: 10,
    time: ["", ""],
  };

  currentPage = 1;

  typeData = [
    {
      label:"全部",
      value:"",
    },
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
      value: "15",
    },
    {
      label: "取消评价",
      value: "9",
    },
    {
      label: "订购智能助手",
      value: "10",
    },{
      label:"提现",
      value:"11"
    },{
      label:"任务佣金",
      value:"12"
    },{
      label:"评价佣金",
      value:"13"
    },{
      label:"超时系统自动取消任务",
      value:"14"
    },{
      label:"购买追评",
      value:"16"
    },{
      label:"邀请人奖励金额",
      value:"17"
    },{
      label:"删除店铺取消任务费用",
      value:"18"
    }
  ];

  fundManageData: IFundRes[] = [];
  total: number = 0;

  created() {
    this.search();
  }

  search() {
    const { searchForm } = this;
    if (searchForm.time) {
      searchForm.dtstart = searchForm.time[0];
      searchForm.dtend = searchForm.time[1];
    }

    getFundChareList(searchForm).then((data) => {
      if (data && data.data && data.data.list) {
        this.fundManageData = data.data.list;
        this.total = data.data.total;
      }
    });
  }

  showAmount(flow:any,amount:any){
    if(amount){
      if(flow === 0){
        return `+`
      }else if(flow === 1){
        return `-`
      }
    }
    return ""
  }

  searchbtn() {
    this.currentPage = 1;
    const { searchForm } = this;
    if (searchForm.time) {
      searchForm.dtstart = searchForm.time[0];
      searchForm.dtend = searchForm.time[1];
    }

    searchForm.page = 1;

    getFundChareList(searchForm).then((data) => {
      if (data && data.data && data.data.list) {
        this.fundManageData = data.data.list;
        this.total = data.data.total;
      }
    });
  }

  timeChange(value: string[] | null) {
    if (value) {
      this.searchForm.dtstart = value[0];
      this.searchForm.dtend = value[1];
    } else {
      this.searchForm.dtstart = "";
      this.searchForm.dtend = "";
    }
  }

  getAmountType(type: number) {
    const data = this.typeData.filter((item) => item.value == type.toString());
    if(data && data[0]){
      return data[0].label
    }
    return ""
  }

  pageSizeChange(currentPage: number) {
    this.searchForm.page = currentPage;
    // this.currentPage = currentPage
    this.search();
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
  height: auto;
  text-align: left;
  margin: 20px auto 0px;
  @include flex(flex-start);
  flex-wrap: nowrap;
  padding-bottom: 80px;

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
        background: #4782ef;
        color: #fff;
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
