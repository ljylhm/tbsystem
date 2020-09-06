<template>
  <div class="transfer-account-container">
    <el-dialog :visible.sync="showTransFerModal" :title="'修改默认转账银行卡'">
      <div class="transfer-bank-modal">
        <div class="transfer-bank_header">
          <el-tooltip effect="light" placement="top" content>
            <div slot="content">每位用户只有10次设置银行卡的机会，请谨慎使用。</div>
            <i class="el-icon-question add-goods_icon_question"></i>
          </el-tooltip>绑定银行卡次数：
          <span class="zy-font">8</span>次
        </div>

        <div class="transfer-bank_form">
          <div class="pay-account_item">
            <div class="pay-account_item_label">原转账银行卡：</div>
            <div class="pay-account_item_content"></div>兴业银行 尾号2410
          </div>

          <div class="pay-account_item">
            <div class="pay-account_item_label">开户人：</div>
            <div class="pay-account_item_content"></div>张三
          </div>
        </div>


        <div class="transfer-bank_form">
            <div>请在下方输入新的转账银行卡信息：</div>
            <el-form :inline="true">
                <el-form-item :label="'转账银行：'">
                    <el-select>
                        
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="warning">确认提交</el-button>
        <el-button @click="showTransFerModal = false">返回</el-button>
      </span>
    </el-dialog>

    <div class="person-left">
      <VPaySlide :current-index="'/transFerAccountManage'" />
    </div>
    <div class="person-right">
      <el-tabs v-model="activeName" class="custom-tab_container">
        <el-tab-pane label="等待转账" name="first">
          <div class="wait-transfer-container">
            <div class="wait-transfer-left">
              <p class="zy-font">关于转账的平台规定：</p>
              <p>1、必须在每天下午16：00前完成前一天的所有转账，否则无法发布任务；</p>
              <p>2、严禁使用支付宝转账，一经发现将终止合作；</p>
              <p>3、对于超时未转账的订单，买家有权申请退款；</p>
              <p>4、对于多次超时的卖家，平台有权终止合作。</p>
              <p>
                转账操作流程：导出转账信息—进行转账操作—返回平台
                <span class="zy-font weight-font">标记转账失败订单</span>—再
                <span class="zy-font weight-font">标记转账成功订单</span>。
              </p>
              <p>
                批量转账流程：只支持招商银行，请点击查看教程。
                <span class="link-font">如何使用招商银行批量转账？</span>
              </p>
            </div>
            <div class="wait-transfer-right">
              <div class="wait-transfer-right_item">招商银行批量转账问题汇总</div>
              <div class="wait-transfer-right_item">卖家转账常见问题</div>
              <div class="wait-transfer-right_item">支付宝免费快速提现秘籍</div>
              <div class="wait-transfer-right_item dz-gif-2">操作按钮使用指南</div>
              <div class="wait-transfer-right_item dz-gif-2 no-border">转账状态说明</div>
            </div>
          </div>

          <div class="wait-transfer-form">
            <div class="wait-transfer-form_header">
              默认转账银行卡：兴业银行 尾号
              <span class="zy-font">2410</span>开户人：杨荣慧
              <el-button
                type="primary"
                size="mini"
                :style="{marginLeft:'10px'}"
                @click="editTarnsferModal"
              >修改</el-button>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item :label="'转账状态：'">
                  <el-select
                    class="short-input"
                    v-model="searchForm.transferStatus"
                    placeholder="请选择"
                    @change="handleTransFerChange"
                  >
                    <el-option
                      v-for="item in transFerData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="'订单编号：'">
                  <el-input v-model="searchForm.ordreId" class="short-input"></el-input>
                </el-form-item>

                <el-form-item :label="'转账申请时间：'">
                  <el-date-picker
                    v-model="searchForm.create_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item :label="'转账申请时间：'">
                  <el-button type="primary" size="small" round>查询</el-button>
                </el-form-item>
              </el-form>

              <div>
                <span class="zy-font">温馨提示：默认展示所有需要待转账记录，导出规则同理，</span>如果需要查询和导出指定日期，请在上方筛选日期。
                <span
                  class="zy-font"
                >温馨提示：转账前请商家仔细核对，如果您不清楚应该如何操作转账，请咨询客服处理。因商家自身原因导致的重复转账造成的损失，平台只负责协助商家进行追回</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
export default class AddGoods extends Vue {
  activeName = "first";
  showTransFerModal = true;

  transFerData = [
    {
      label: "等待转账",
      value: "1",
    },
    {
      label: "已导出",
      value: "2",
    },
  ];

  searchForm = {
    transferStatus: "",
    ordreId: "",
    create_time: "",
  };

  editTarnsferModal() {}

  handleTransFerChange() {}
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

.weight-font {
  font-weight: 600;
}

// input的宽度
.short-input {
  width: 150px;
}

.link-font {
  color: #409eff;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: #ff9900;
  }
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

.no-border {
  border: none !important;
}

.dz-gif-2 {
  background: url(http://img.baishou123.cn/public/shop/css/img/dianzan1.gif)
    no-repeat 0px center !important;
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

.space-margin-right-20 {
  margin-right: 20px;
}

.el-table td,
.el-table th {
  text-align: center;
}

.transfer-bank-modal {
  .transfer-bank_header {
    text-align: right;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .transfer-bank_form{
      padding: 20px 0px 0px;
      border-bottom: 1px dashed #ddd;
  }
}

.transfer-account-container {
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

    .wait-transfer-container {
      @include flex(space-between);
      padding: 20px 0px 30px;
      border-bottom: 1px dashed #ddd;
      .wait-transfer-left {
        flex: 1;
        & > p {
          margin-bottom: 10px;
          font-size: 14px;
        }
      }
      .wait-transfer-right {
        width: 350px;
        height: 205px;
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid #ddd;
        background: #f0f0f0;
        font-size: 14px;
        .wait-transfer-right_item {
          background: url(http://img.baishou123.cn/public/shop/css/img/dianzan.gif)
            no-repeat 0px center;
          padding-left: 30px;
          line-height: 38px;
          border-bottom: 1px solid #ddd;
          &:hover {
            cursor: pointer;
            color: #ff9900;
          }
        }
      }
    }

    .wait-transfer-form {
      font-size: 14px;
      padding: 20px 0px;
      .wait-transfer-form_header {
        margin-bottom: 10px;
      }
    }
  }

  .shop-operation_btn {
    margin-bottom: 10px;
  }

  .pay-account_item {
    @include flex(flex-start);
    color: #000;
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
