<template>
  <div class="custom-servive_container">
    <div class="custom-header">
      <div class="custom-header_item">新客服工单</div>
    </div>

    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
      class="custom-tab_container"
    >
      <div class="custom-form">
        <el-form :inline="true">
          <el-form-item label="工单类型：">
            <el-select
              v-model="form.type"
              @change="handleWorkTypeChange"
              placeholder="请选择"
              class="short-input"
            >
              <el-option
                v-for="item in workOrderDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="问题分类：">
            <el-select
              v-model="form.trouble_type"
              placeholder="请选择"
              class="short-input"
            >
              <el-option
                v-for="item in workQuestionData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务编号：">
            <el-input v-model="form.order_no" class="short-input"></el-input>
          </el-form-item>

          <el-form-item label="订单编号：">
            <el-input
              v-model="form.order_number"
              class="short-input"
            ></el-input>
          </el-form-item>

          <el-form-item label="工单状态：">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              class="short-input"
            >
              <el-option
                v-for="item in statusType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="订单时间：">
            <el-date-picker
              v-model="form.create_time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" round @click="searchAction"
              >查询</el-button
            >
          </el-form-item>
        </el-form>

        <div>
          <el-table :data="customServicePublishData" border>
            <el-table-column
              prop="order_no"
              label="任务编号"
              width="200px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="order_number"
              label="订单编号"
              width="200px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="工单状态"
              prop="pubishNumber"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                {{ handleStatus(scope.row.status) }}
              </template>
            </el-table-column>

            <el-table-column label="工单类型" align="center" width="300px">
              <template slot-scope="scope">
                <div>{{ handleType(scope.row.type) }}</div>
              </template>
            </el-table-column>

            <el-table-column label="问题分类" align="center">
              <template slot-scope="scope">
                <div>
                  {{ hanleQuesType(scope.row.type, scope.row.trouble_type) }}
                </div>
              </template>
            </el-table-column>

            <!-- <el-table-column 
              label="工单类型"
              align="center"
              width="300px">
              <template slot-scope="scope">
                <div>{{  handleType(scope.row.type) }}</div>
              </template>
            </el-table-column> -->

            <!-- <el-table-column
              label="处罚金额"
              prop="pubishNumber"
              align="center"
              width="300px"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.fee || 0 }}</div>
              </template>
            </el-table-column> -->

            <el-table-column
              label="创建时间"
              prop="created_at"
              align="center"
              width="200px"
            ></el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom:10px">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                    @click="toWorkOrderDetail(scope.row.id)"
                    >查看</el-button
                  >
                </div>
                <div>
                  <el-button type="primary" round size="mini" @click="deleteWorkOrder(scope.row.id)"
                    >撤销工单</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <v-table
        :total="total"
        :hide-on-single-page="true"
        :pageSizeChange="pageSizeChange"
      ></v-table>

      <!-- <el-tab-pane label="任务处罚列表" name="first">
        
      </el-tab-pane> -->
      <!-- <el-tab-pane label="多退少补列表" name="second">
        <div class="custom-form">
          <el-form :inline="true">
            <el-form-item label="任务编号：">
              <el-input v-model="formOne.missionId" class="short-input"></el-input>
            </el-form-item>

            <el-form-item label="订单编号：">
              <el-input v-model="formOne.orderId" class="short-input"></el-input>
            </el-form-item>
            <br/>

            <el-form-item label="列表类型：">
              <el-select v-model="formOne.statusType" placeholder="请选择" class="short-input">
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            

            <el-form-item label="订单时间：">
              <el-date-picker
                v-model="formOne.create_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <el-table :data="moreFixData">
            <el-table-column label="任务编号" prop="missionId" align="center" width="200px"></el-table-column>
            <el-table-column label="订单编号" prop="orderId" align="center" width="200px"></el-table-column>
            <el-table-column label="担保金额" prop="orderType" align="center" width="200px"></el-table-column>
            <el-table-column label="支付金额" prop="questionType" align="center" width="180px"></el-table-column>
            <el-table-column label="工单状态" prop="status" align="center" width="180px"></el-table-column>
            <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发货提醒列表" name="third">
        <div class="custom-form">
          <el-form :inline="true">
            <el-form-item label="任务编号：">
              <el-input v-model="formTwo.missionId" class="short-input"></el-input>
            </el-form-item>

            <el-form-item label="订单编号：">
              <el-input v-model="formTwo.orderId" class="short-input"></el-input>
            </el-form-item>
            <br/>
            
            <el-form-item label="列表类型：">
              <el-select v-model="formTwo.statusType" placeholder="请选择" class="short-input">
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            

            <el-form-item label="订单时间：">
              <el-date-picker
                v-model="formTwo.create_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </el-form>

          <div>
            <el-table :data="sendWranData">
              <el-table-column label="任务编号" prop="missionId" align="center" width="200px"></el-table-column>
              <el-table-column label="订单编号" prop="orderId" align="center" width="200px"></el-table-column>
              <el-table-column label="任务状态" prop="orderstatus" align="center" width="180px"></el-table-column>
              <el-table-column label="工单状态" prop="status" align="center" width="180px"></el-table-column>
              <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src
import VTable from "@/components/VTable.vue";
import { getWorkList } from "@/service/order";
import { upDateWorkOrderStatus } from "@/service/workOrder";
import { routerHelper } from "../router";
import { confirmMessageOne, openSuccessMsg, openWarnMsg } from "@/lib/notice";

@Component({
  components: {
    HelloWorld,
    Header,
    VTable,
  },
})
export default class Publish extends Vue {
  activeName = "first";

  form = {
    page: 1,
    limit: 10,
    type: "",
    trouble_type: "",
    order_no: "", // 任务编号
    order_number: "", // 订单编号
    user_type: 1
  };

  formOne = {
    missionId: "",
    orderId: "",
    statusType: "",
    create_time: "",
  };

  formTwo = {
    missionId: "",
    orderId: "",
    statusType: "",
    create_time: "",
  };

  orderTypes = [
    {
      value: "1",
      label: "订单信息错误",
    },
    {
      value: "2",
      label: "好评问题",
    },
    {
      value: "3",
      label: "其他导致卖家损失的行为",
    },
    {
      value: "4",
      label: "任务过程出错",
    },
    {
      value: "5",
      label: "提醒卖家发货",
    },
    {
      value: "6",
      label: "抖音任务",
    },
  ];

  questionTypes = [
    {
      value: "1",
      label: "问题一",
    },
    {
      value: "2",
      label: "问题二",
    },
  ];

  statusType = [
    {
      value: "0",
      label: "待处理",
    },
    {
      value: "1",
      label: "跟进中",
    },
    {
      value: "2",
      label: "处理完成",
    },
    {
      value: "3",
      label: "已撤销",
    },
    {
      value: "4",
      label: "拒绝处理",
    },
  ];

  customServicePublishData = [
    {
      missionId: "123321",
      orderId: "13213",
      orderType: "-",
      questionType: "-",
      pubishNumber: 60,
      status: "-",
      create_time: "-",
    },
  ];

  moreFixData = [
    {
      missionId: "123321",
      orderId: "13213",
      warrantNumber: "123",
      payNumber: "123321",
      status: "",
      create_time: "",
    },
  ];

  sendWranData = [
    {
      missionId: "123321",
      orderId: "13213",
      status: "",
      orderstatus: "",
      create_time: "",
    },
  ];

  workOrderDataList: any = [
    {
      label: "订单信息错误",
      value: "1",
    },
    {
      label: "好评问题",
      value: "2",
    },
    {
      label: "其他导致卖家损失的行为",
      value: "3",
    },
    {
      label: "任务过程出错",
      value: "4",
    },
    {
      label: "提醒卖家发货",
      value: "5",
    },
  ];

  workOrderDataListOne: any = [
    {
      label: "订单号正确，买号错误",
      value: "1",
    },
    {
      label: "订单未付款",
      value: "2",
    },
    {
      label: "买号正确，订单号错误",
      value: "3",
    },
    {
      label: "收货地址错误",
      value: "4",
    },
    {
      label: "填错订单号",
      value: "5",
    },
    {
      label: "无对应订单或买号信息",
      value: "6",
    },
    {
      label: "用错买号",
      value: "7",
    },
    {
      label: "用错收货地址",
      value: "8",
    },
  ];

  workOrderDataListTwo: any = [
    {
      label: "没有按照要求进行好评",
      value: "1",
    },
    {
      label: "提醒买手确认收货",
      value: "2",
    },
    {
      label: "未写文字好评",
      value: "3",
    },
    {
      label: "未做晒图好评",
      value: "4",
    },
    {
      label: "在评价时给出负面的评价",
      value: "5",
    },
    {
      label: "在评价时给中差评",
      value: "6",
    },
  ];

  workOrderDataListThree: any = [
    {
      label: "分期付款产生手续费损失",
      value: "1",
    },
    {
      label: "花呗支付产生手续费损失",
      value: "2",
    },
    {
      label: "买手从淘宝客进入",
      value: "3",
    },
    {
      label: "农村淘宝支付产生佣金损失",
      value: "4",
    },
    {
      label: "使用花呗支付",
      value: "5",
    },
    {
      label: "使用信用卡支付",
      value: "6",
    },
    {
      label: "使用余额宝分期支付",
      value: "7",
    },
    {
      label: "淘宝客支付产生佣金损失",
      value: "8",
    },
    {
      label: "信用卡支付产生手续费损失",
      value: "9",
    },
    {
      label: "重复转账",
      value: "10",
    },
  ];

  workOrderDataListFour: any = [
    {
      label: "关键字错误",
      value: "1",
    },
    {
      label: "截图错误",
      value: "2",
    },
    {
      label: "买错商品",
      value: "3",
    },
    {
      label: "没有按照指定来路进入",
      value: "4",
    },
    {
      label: "其他出错的行为",
      value: "5",
    },
    {
      label: "提前确认收货",
      value: "6",
    },
    {
      label: "旺聊错误",
      value: "7",
    },
    {
      label: "违背备注",
      value: "8",
    },
    {
      label: "用错设备",
      value: "9",
    },
  ];

  workOrderDataListFive: any = [
    {
      label: "平台和淘宝上都没有发货",
      value: "1",
    },
    {
      label: "平台上发货了，淘宝上没有发",
      value: "2",
    },
    {
      label: "商家未上传好评图片",
      value: "3",
    },
    {
      label: "淘宝上发货了，平台上没有发",
      value: "4",
    },
  ];

  total = 0;

  handleTabClick(tab: string) {
    console.log(tab, event);
  }

  handleStatus(status: any) {
    if (this.statusType[status] && this.statusType[status]["label"]) {
      return this.statusType[status]["label"];
    }
  }

  searchForm: any = {
    page: 1,
    limit: 20,
    status: "",
    order_no: "",
  };

  handleType(task_no: number) {
    if (
      this.workOrderDataList[task_no - 1] &&
      this.workOrderDataList[task_no - 1].label
    ) {
      return this.workOrderDataList[task_no - 1].label;
    }
    return "";
  }

  hanleQuesType(e: number, order_no: number) {
    if (e == 1) {
      this.workQuestionData = this.workOrderDataListOne;
    }
    if (e == 2) {
      this.workQuestionData = this.workOrderDataListTwo;
    }
    if (e == 3) {
      this.workQuestionData = this.workOrderDataListThree;
    }
    if (e == 4) {
      this.workQuestionData = this.workOrderDataListFour;
    }
    if (e == 5) {
      this.workQuestionData = this.workOrderDataListFive;
    }

    if (
      this.workQuestionData[order_no - 1] &&
      this.workQuestionData[order_no - 1].label
    ) {
      return this.workQuestionData[order_no - 1].label;
    }

    return "";
  }

  workQuestionData: any = [];

  // 工单类型选择改变
  handleWorkTypeChange(e: any) {
    if (e == 1) {
      this.workQuestionData = this.workOrderDataListOne;
    }
    if (e == 2) {
      this.workQuestionData = this.workOrderDataListTwo;
    }
    if (e == 3) {
      this.workQuestionData = this.workOrderDataListThree;
    }
    if (e == 4) {
      this.workQuestionData = this.workOrderDataListFour;
    }
    if (e == 5) {
      this.workQuestionData = this.workOrderDataListFive;
    }
  }

  searchWorkList() {
    getWorkList(this.searchForm).then((data) => {
      if (data && data.data) {
        console.log("xxxx", data);
      }
    });
  }

  search() {
    getWorkList(this.form).then((data: any) => {
      if (data && data.data) {
        this.customServicePublishData = data.data.list;
        this.total = data.data.total;
      }
    });
  }

  searchAction() {
    this.form.page = 1;
    this.search();
  }

  created() {
    this.search();
  }

  pageSizeChange(currentPage: number) {
    this.form.page = currentPage;
    this.search();
  }

  // 去到工单页的详情
  toWorkOrderDetail = (id: any) => {
    routerHelper.to("/workOrderDatail", {
      id,
    });
  };

  // 撤销工单
  deleteWorkOrder(id: any) {
    confirmMessageOne("提示", "确定要撤销工单吗？").then((data) => {
      upDateWorkOrderStatus(id, 3).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("撤销成功");
          this.form.page = 1;
          this.search();
        }
      });
    });
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

.custom-servive_container {
  width: 1400px;
  margin: 0 auto;
  padding-top: 40px;
  .custom-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #eee;
    text-align: left;
    .custom-header_item {
      display: inline-block;
      text-align: center;
      padding: 0px 20px;
      background: #4782ef;
      color: #fff;
    }
  }

  .custom-tab_container {
    margin: 10px 0px;
  }

  .custom-form {
    margin: 10px 0px;
    text-align: left;
    .short-input {
      width: 150px;
      margin-right: 10px;
    }
  }
}
</style>
