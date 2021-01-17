<template>
  <div class="mission-container">
    <el-dialog
      :visible.sync="showRemarksModal"
      class="remarks-modal"
      :title="'修改任务备注'"
    >
      <el-form>
        <el-form-item :label="'任务编号：'"
          >V61241620966920200902174612</el-form-item
        >
        <el-form-item :label="'任务备注：'">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="remarks"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clsoeRemarkModal" round type="warning"
          >确认提交</el-button
        >
        <el-button type="primary" @click="clsoeRemarkModal" round
          >返回修改</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showDetailModal"
      class="detail-modal"
      :title="'查看任务详情'"
    >
      <div class="detail-info">
        <div class="detail-info-header">任务基本信息</div>
        <div class="detail-info-item">
          <div>任务分类： 销量任务</div>
          <div>任务编号： {{ detailInfo.task_no }}</div>
        </div>
        <div class="detail-info-item">
          <div>订单编号： {{ detailInfo.order_no }}</div>
        </div>
        <div class="detail-info-item">
          <div>任务平台： {{ getPlatFormByType(detailInfo.type) }}</div>
          <div>任务类型： 无线</div>
        </div>
        <div class="detail-info-item">
          <div>产品价格：{{ detailInfo.price }}</div>
        </div>
        <div class="detail-info-item">
          <div>拍下件数： {{ detailInfo.num }}</div>
          <div>型号：{{ detailInfo.mode }}</div>
        </div>
      </div>

      <div class="detail-info">
        <div class="detail-info-header">搜索关键字</div>
        <div class="detail-info-item">
          <div>
            搜索关键字：<span class="zy-font" style="font-weight: 600">{{
              detailInfo.option.keyword
            }}</span>
          </div>
          <div>搜索来路： {{ getFlowTypes(detailInfo.option.flow_type) }}</div>
        </div>
        <div class="detail-info-item">
          <!-- <div>发货城市：</div> -->
          <div>
            价格区间：
            {{
              detailInfo.option.price_region.to
                ? `${detailInfo.option.price_region.from} - ${detailInfo.option.price_region.to}`
                : "无"
            }}
          </div>
        </div>
        <div class="detail-info-item">
          <div>排序方式： 无</div>
          <div>其他搜索：{{ detailInfo.option.remark }}</div>
        </div>
      </div>

      <div class="detail-info">
        <div class="detail-info-header">任务要求</div>
        <div class="detail-info-item">
          <div class="detail-info-item_text">
            <span>任务备注：</span>
            <span v-if="!detailInfo.description">暂无备注</span>
            <el-input
              v-else
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              placeholder="请输入内容"
              v-model="detailInfo.description"
              disabled
            ></el-input>
          </div>
        </div>
      </div>

      <div class="detail-info">
        <div class="detail-info-header">快递信息</div>
        <div class="detail-info-item">
          <div>运单编号：1233213</div>
          <div>物流公司： 自发快递</div>
        </div>
        <div class="detail-info-item">
          <div>运单号类型： 自发快递</div>
          <div>收货地址：四川省绵阳市</div>
        </div>
      </div>

      <div class="detail-info">
        <div class="detail-info-header">商品信息</div>
        <div class="detail-info-item">
          <div>
            商品全称：
            {{ detailInfo.goods_name || "--" }}
          </div>
        </div>
        <div class="detail-info-item_text">
          <span>商品链接：</span>
          <span class="zy-font">{{ detailInfo.goods_url || "--" }}</span>
          <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="detailInfo.goods_url"
            disabled
          ></el-input> -->
        </div>
        <div class="detail-info-item">
          <div class="detail-info-item_text">
            <span>商品展现：</span>
            <img :src="detailInfo.main_url" />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetailModal = false" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showDetailModal"
      class="detail-modal"
      :title="'查看任务详情'"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetailModal = false" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showConfirmModal"
      class="detail-modal"
      :title="'确认任务信息'"
    >
      <div class="confirm-modal-container">
        <table border="1">
          <thead>
            <td width="200px">商品主图</td>
            <td>任务数量</td>
            <td>任务佣金</td>
            <td>成交金额</td>
            <td>任务快递费用（指淘宝中）</td>
            <td>置顶费用</td>
            <td width="100px">合计</td>
            <td width="140px">查看详情</td>
          </thead>
          <tr v-for="(item, key) in tempGoodsList" :key="key">
            <td width="200px" style="text-align: center">
              <img
                :src="item.main_url"
                alt=""
                style="width: 80px; height: 80px; margin: 0 auto"
              />
            </td>
            <td>{{ calcCount(item.good_info) }}</td>
            <td>{{ item.total_amount || 0 }}</td>
            <td>{{ calcMoney(item.good_info) }}</td>
            <td>0</td>
            <td>{{ item.top_fee || 0 }}</td>
            <td width="100px">
              {{ Number(item.total_amount) + calcMoney(item.good_info) }}
            </td>
            <td>
              <el-link type="primary" @click="toUpDateTemplate(item.id)"
                >查看详情</el-link
              >
            </td>
          </tr>
        </table>

        <table border="1" style="margin-top: 10px">
          <thead>
            <td width="200px">成交金额</td>
            <td>置顶费用</td>
            <td>任务佣金</td>
            <td>任务快递费用（指淘宝中）</td>
            <td width="100px">合计</td>
          </thead>
          <tr>
            <td width="200px">{{ calcAllMoney() }}</td>
            <td>{{ calcAllTopFee() }}</td>
            <td>{{ calcAllUserFee() }}</td>
            <td>0</td>
            <td width="100px">{{ calcHjMoney() }}</td>
          </tr>
        </table>

        <table border="1" style="margin-top: 10px">
          <thead>
            <td width="100px">任务数量</td>
            <td width="70px">{{ calcAllCount() }}</td>
          </thead>
        </table>

        <div style="display: flex; justify-content: flex-end">
          <div>
            <div style="margin-bottom: 6px">
              置顶费用： <span class="zy-font">{{ calcAllTopFee() }}</span
              >元
            </div>
            <div style="margin-bottom: 6px">
              佣金： <span class="zy-font">{{ calcAllUserFee() }}</span
              >元
            </div>
            <div style="margin-bottom: 6px">
              快递： <span class="zy-font">0 </span>元
            </div>
            <!-- <div style="margin-bottom: 6px">
              合计：<span class="zy-font"> {{ calcHjMoney() }}</span
              >元
            </div> -->

            <el-row>
              <el-col :span="8"
                ><div class="confirm-mission_item">支付密码：</div></el-col
              >
              <el-col :span="10">
                <el-input v-model="password" type="password"></el-input>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="publish" round type="primary">确认</el-button>
        <el-button @click="closeConfirmModal" round type="primary"
          >取消</el-button
        >
      </span>
    </el-dialog>

    <v-header
      :list="['模板管理', '任务管理', '评价管理', '发布任务']"
      :currentIndex="currentIndex"
      :handleSwitchTab="handleSwitchTab"
    />

    <div class="mission-form" style="margin-top: 10px">
      <el-form :inline="true">
        <!-- <el-form-item>
          <el-select v-model="searchMainForm.type" placeholder="任务分类">
            <el-option
              v-for="item in platTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchMainForm.status" placeholder="全部任务">
            <el-option
              v-for="item in missTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchKey">
            <el-option
              v-for="item in idTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="searchValue"></el-input>
        </el-form-item>

        <el-form-item label="发布时间">
          <el-date-picker
            v-model="searchForm.create_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item> -->

        <el-form-item label="">
          <!-- <el-button type="primary" round @click="search">查询</el-button> -->
          <el-button type="success" round @click="groupCancel"
            >批量取消</el-button
          >
          <el-button type="primary" round @click="openGroupConfirmModal"
            >批量发布</el-button
          >
          <!-- <el-button type="warning" round>导出</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <div class="mission-table" style="margin-top: 15px">
      <el-table
        :data="missionData"
        @selection-change="handleSelectionChange"
        border
      >
        <!-- <el-table-column
          prop="account"
          label="任务分类"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="zy-font">
              {{ scope.row.type == 0 ? "销量任务" : "流量任务" }}
            </div>
          </template>
        </el-table-column> -->

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column
          prop="account"
          label="商品图片"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-pic">
              <img :src="scope.row.main_url" />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="商品信息"
          width="260px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-buyer">
              <!-- <div>型号：{{ scope.row.mode || "--" }}</div>
              <div>件数：{{ scope.row.num || "--" }}</div> -->
              <div>店铺名称：{{ scope.row.shop_name || "--" }}</div>
              <div>所属：{{ getPlatFormByType(scope.row.platform_type) }}</div>
              <div>
                类型：{{ scope.row.type == 0 ? "销量任务" : "流量任务" }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="模板信息"
          width="260px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div>
                <span>{{ scope.row.task_no }}</span>
              </div>
              <div>
                任务数：<span class="zy-font" style="font-weight: 600">
                  {{ getTaskNum(scope.row.good_info) }}</span
                >
              </div>
              <div>
                消费金额：<span class="zy-font" style="font-weight: 600">
                  {{ scope.row.total_amount }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="任务信息"
          width="180px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div>
                <span>{{
                  scope.row.good_info.length > 1 ? "多商品模板" : "单商品模板"
                }}</span>
              </div>
              <div>
                置顶费用：<span>{{ scope.row.top_fee }}元/单</span>
              </div>
              <div>收货方式：<span>不强制</span></div>
            </div>
          </template>
        </el-table-column>

        <!-- <div>
                搜索来路：
                <span class="zy-font">{{
                  getFlowTypes(scope.row.option[0].flow_type)
                }}</span>
              </div>
              <div>
                关键字：<span class="zy-font" style="font-weight: 600">{{
                  scope.row.option[0].keyword || "--"
                }}</span>
              </div>
              <div>
                任务数：<span class="zy-font" style="font-weight: 600">
                  {{ getTaskNum(scope.row.good_info) }}</span
                >
              </div> -->

        <el-table-column
          prop="account"
          label="保存时间"
          width="260px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div>{{ scope.row.updated_at || "--" }}</div>
              <!-- <div>发货人：{{ scope.row.sender || "--" }}</div>
              <div>发货手机：{{ scope.row.sender_phone || "--" }}</div>
              <div>发货地址：{{ scope.row.address || "--" }}</div> -->
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="account"
          label="商品价格/任务佣金"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div>商品价格：{{ getTaskPrice(scope.row.good_info) }}元</div>
            <div>任务佣金：{{ scope.row.total_amount }} 元</div>
            <div>
              转账方式：
              <span class="zy-font">自行转账</span>
            </div>
            <div>
              强制收货：
              <span class="zy-font">否</span>
            </div>
            <div class="zy-font">
              您将返还{{ scope.row.user_fee }}元+商品本金给买手
            </div>
          </template>
        </el-table-column> -->

        <!-- <el-table-column
          prop="account"
          label="任务时间"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div>发布时间：{{ scope.row.created_at }}</div>
          </template>
        </el-table-column> -->

        <el-table-column prop="account" label="操作按钮" align="center">
          <template slot-scope="scope">
            <div class="btn-operation">
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="openOneConfirmModal(scope.row)"
                  >立即发布</el-button
                >
              </div>
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="toUpDateTemplate(scope.row.id)"
                  >修改模板信息</el-button
                >
              </div>
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="delItemTemplate(scope.row.id)"
                  >删除模板信息</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <v-table
      :total="total"
      :hide-on-single-page="true"
      :pageSizeChange="pageSizeChange"
      :pageSize="10"
    ></v-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VHeader from "@/components/VHeader.vue"; // @ is an alias to /src
import VTable from "@/components/VTable.vue"; // @ is an alias to /src
import {
  delTemplateList,
  getDailyNote,
  getMissionMangerList,
  getTemplateList,
} from "@/service/order";
import { getFlowTypes, getPlatFormByType } from "@/lib/helper";
import {
  confirmMessageOne,
  openAlertError,
  openAlertWarn,
  openSuccessMsg,
  openWarnMsg,
} from "@/lib/notice";
import { getShopPrice, publishNormalTask } from "@/service/task";
import { routerHelper } from "@/router";
import { dateFormate } from "@/lib/time";

type ISelect = {
  label: string;
  value: string;
};

const ONE_DAT_TIME = 60 * 60 * 24 * 1000;

@Component({
  components: {
    VHeader,
    VTable,
  },
})
export default class Publish extends Vue {
  currentIndex: number = 0;
  showRemarksModal: boolean = false;
  showDetailModal: boolean = false;
  showDailyModal: boolean = false;
  showConfirmModal: boolean = false;

  remarks: string = "";
  detail_remarks =
    "卡天猫 天猫（商品主图一致 不一致的不要下单）郑重提示做过的不要在做 禁止复购  不要河北 北京的 》先货比3家每家2分钟，必须咨询完5句一问一答来回，没咨询5句的审核不通过，客服不在的不要连续发问，截图关键词进店，和浏览的足迹，足记一定至少包含有5张相关的商品图片，足记不够的审核不通过，后台监控店里深度浏览时间不够的，审核不通过，直接客服介入，申请退款！！！咨询问题参考问题1可以定做膜结构景观棚吗？2质保多久3骨架是什么材质的4按什么方式计价5需要预埋吗 6 100到200平";

  total: number = 0;

  searchForm: any = {};

  searchMainForm: any = {
    type: "",
    status: "",
    page: 1,
    limit: 10,
  };

  searchFormOther = {
    task_no: "",
    order_no: "",
    shop_name: "",
    buyer_name: "",
    goods_name: "",
    dtstart: "",
    dtend: "",
  };

  searchKey: string = "";
  searchValue: string = "";

  detailInfo = {
    option: {
      price_region: {
        to: null,
        from: null,
      },
    },
  };

  dailyNoteInfo: any = {};

  platTypes = [
    {
      label: "全部",
      value: "",
    },
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
    "待接手",
    "进行中",
    "待发货",
    "待评价",
    "已完成",
    "待完成",
    "已取消",
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

  missionData: any = [];

  page: number = 1;

  tempGoodsList: any[] = [];

  password: string = "";

  created() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    this.getTemplateListAction();
  }

  getTemplateListAction() {
    let page = this.page;
    getTemplateList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.good_info = JSON.parse(item.good_info);
          return item;
        });
        this.missionData = t;
      }
    });
  }

  getTaskNum(good_info: any = []) {
    if (!good_info) good_info = [];
    let num: number = 0;
    good_info.forEach((item: any, index: any) => {
      num = num + Number(item.task_num);
    });
    return num;
  }

  getTaskPrice(good_info: any = []) {
    if (!good_info) good_info = [];
    let price: number = 0;
    good_info.forEach((item: any, index: any) => {
      price = price + Number(item.price) * Number(item.num);
    });
    return price;
  }

  groupPub() {
    let count = 0;
    const allCount = this.multipleSelection.length;
    if (this.multipleSelection.length > 0) {
      confirmMessageOne("提示", "确定要发布选中的模板吗？").then((data) => {
        this.$prompt("请输入支付密码", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputType: "password",
        }).then((data: any) => {
          const value = data.value;
          if (!value) openWarnMsg("请输入支付密码");
          else {

            // 先校验一遍
            let flag = false
            for(let i = 0;i< this.multipleSelection.length;i++){
                flag = this.checkTime(this.multipleSelection[i])
                if(flag) break
            }

            if(flag) return
    
            let fn = (form: any) => {
              form.pay_password = value;
              let template_form = Object.assign({}, form);

              // template_form.good_info = JSON.parse(template_form.good_info);
              template_form.publish_option.forEach(
                (item: any, index: number) => {
                  const nowDate = new Date(
                    this.transFormDateNew(index)
                  ).getDate();
                  const afterDate = new Date(item.dayDate).getDate();
                  const diff = nowDate - afterDate;

                  item.dayDate = this.transFormDateNew(index);
                  console.log("item.dayDate", item.dayDate);

                  item.end_time = item.end_time
                    ? new Date(item.end_time * 1000 + diff).getTime()
                    : "";
                  item.start_time = item.start_time
                    ? new Date(item.start_time * 1000 + diff).getTime()
                    : "";
                  item.over_cancel_time = item.over_cancel_time
                    ? new Date(item.over_cancel_time * 1000 + diff).getTime()
                    : "";
                }
              );

              publishNormalTask(template_form).then((data) => {
                ++count;
                if (data && data.origin_data && data.origin_data.code == 1001) {
                  if (count == this.multipleSelection.length) {
                    openSuccessMsg("发布成功");
                    const timer = setTimeout(() => {
                      window.location.reload();
                      clearTimeout(timer);
                    }, 2000);
                  } else fn(this.multipleSelection[count]);
                }
              });
            };

            fn(this.multipleSelection[0]);

            // this.multipleSelection.forEach((form: any) => {

            // });
          }
        });
      });
    } else {
      openWarnMsg("请先选中数据");
    }
  }

  groupCancel() {
    let count = 0;
    const allCount = this.multipleSelection.length;
    if (this.multipleSelection.length > 0) {
      confirmMessageOne("提示", "确定要删除选中的模板吗？").then((data) => {
        if (this.multipleSelection.length > 0) {
          for (let i of this.multipleSelection) {
            delTemplateList(i.id).then((res) => {
              if (res && res.origin_data && res.origin_data.code == 1001) {
                ++count;
                if (count == allCount) {
                  this.search();
                  openSuccessMsg(
                    "删除成功",
                    () => {
                      location.reload();
                    },
                    500
                  );
                }
              }
            });
          }
        }
      });
    } else {
      openWarnMsg("请先选中数据");
    }
  }

  mounted() {
    this.missTypes = [
      {
        label: "全部任务",
        value: "",
      },
    ].concat(
      this.missTypesArray.map((item, index) => {
        return {
          label: item,
          value: index.toString(),
        };
      })
    );

    this.idTypes = [
      {
        label: "任务编号",
        value: "task_no",
      },
      {
        label: "订单编号",
        value: "order_no",
      },
      {
        label: "店铺名称",
        value: "shop_name",
      },
      {
        label: "买号",
        value: "buyer_name",
      },
      {
        label: "商品名称",
        value: "goods_name",
      },
    ];
  }

  openRemarkModal() {
    this.showRemarksModal = true;
  }

  clsoeRemarkModal() {
    this.showRemarksModal = false;
  }

  handleSwitchTab(index: number) {
    this.currentIndex = index;
    if (index == 1) {
      routerHelper.to("/missionManage");
    }
    if (index == 2) {
      routerHelper.to("/commentList");
    }
    if (index == 3) {
      routerHelper.to("/publish");
    }
  }

  timeChange(value: string[] | null) {
    if (value) {
      this.searchFormOther.dtstart = value[0];
      this.searchFormOther.dtend = value[1];
    } else {
      this.searchFormOther.dtstart = "";
      this.searchFormOther.dtend = "";
    }
  }

  calcAllCount() {
    let count = 0;
    this.tempGoodsList.forEach((element: any) => {
      count = count + this.calcCount(element.good_info);
    });
    return count;
  }

  calcAllMoney() {
    let money = 0;
    this.tempGoodsList.forEach((element: any) => {
      money = money + this.calcMoney(element.good_info);
    });
    return money;
  }

  calcAllTopFee() {
    let money = 0;
    this.tempGoodsList.forEach((element: any) => {
      money = money + Number(element.top_fee);
    });
    return money;
  }

  calcHjMoney() {
    let money = 0;
    this.tempGoodsList.forEach((element: any) => {
      money =
        money +
        Number(element.total_amount) +
        this.calcMoney(element.good_info);
    });
    return money;
  }

  calcAllUserFee() {
    let money = 0;
    this.tempGoodsList.forEach((element: any) => {
      money = money + Number(element.total_amount);
    });
    return money;
  }

  calcCount(goods: any) {
    let count = 0;
    goods.forEach((element: any) => {
      count = count + Number(element.task_num);
    });
    return count;
  }

  calcTaskNum(goods: any) {
    let count = 0;
    goods.forEach((element: any) => {
      count = count + Number(element.task_num);
    });
    return count;
  }

  calcMoney(goods: any) {
    let money = 0;
    goods.forEach((element: any) => {
      money =
        money +
        Number(element.num) * Number(element.price) * Number(element.task_num);
    });
    return money;
  }

  // 查询的行为
  search() {
    // this.searchForm = {
    //   ...this.searchMainForm,
    //   ...this.searchFormOther,
    // };
    // this.searchForm.page = 1;
    // if (this.searchKey) {
    //   this.searchForm[this.searchKey] = this.searchValue;
    // }
    getTemplateList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        // const t = data.data.list.map((item: any) => {
        //   item.option = JSON.parse(item.option);
        //   item.publish_option = JSON.parse(item.publish_option);
        //   return item;
        // });
        if (data && data.data && data.data.list) {
          this.total = data.data.total;
          const t = data.data.list.map((item: any) => {
            item.option = JSON.parse(item.option);
            item.publish_option = JSON.parse(item.publish_option);
            item.good_info = JSON.parse(item.good_info);
            return item;
          });
          this.missionData = t;
        }
        this.missionData = data.data.list;
      }
    });
  }

  getPlatFormByType(type: any) {
    return getPlatFormByType(type);
  }

  getFlowTypes(id: any) {
    return getFlowTypes(id);
  }

  pageSizeChange(currentPage: number) {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    this.searchForm.page = currentPage;
    this.search();
  }

  openDetailInfo(data: any) {
    this.showDetailModal = true;
    this.detailInfo = data;
  }

  getDailyNote(order_id: any) {}

  openDailyModal(order_id: any) {
    getDailyNote(order_id).then((data) => {
      if (data && data.data) {
        console.log("日志内容", data.data);
        this.dailyNoteInfo = data.data;
        this.showDailyModal = true;
      }
    });
  }

  closeDailyModal() {
    this.showDailyModal = false;
  }

  delItemTemplate(id: number) {
    confirmMessageOne("提示", "确定要删除这条模板吗？").then((data) => {
      delTemplateList(id).then((res) => {
        if (res && res.origin_data && res.origin_data.code == 1001) {
          openSuccessMsg("删除成功");
          this.search();
        }
      });
    });
  }

  // 修改模板
  toUpDateTemplate(id: any) {
    routerHelper.to("/templatePub", {
      id,
    });
  }

  transFormDateNew(index: number) {
    return dateFormate(Date.now() + index * ONE_DAT_TIME, "yyyy-MM-dd");
  }

  multipleSelection: any[] = [];

  handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  checkTime(template_form:any){
      let flag = true;
      let mission_num = 0;
      let msg = "时间设置不正确，请重新设置";

      // template_form.good_info = JSON.parse(template_form.good_info);
      template_form.publish_option.forEach((item: any, index: number) => {
        if(!item.start_time && template_form.type != 0){
          return 
        }
        const nowDate = new Date(this.transFormDateNew(index)).getTime()
        const afterDate = new Date(dateFormate(item.start_time * 1000,"yyyy-MM-dd")).getTime();
        const diff = nowDate - afterDate;

        item.dayDate = this.transFormDateNew(index);

        if(!item.num || item.num <= 0) return

        item.end_time = item.end_time
          ? Math.ceil(new Date(item.end_time * 1000 + diff).getTime() / 1000)
          : "";
        item.start_time = item.start_time
          ? Math.ceil(new Date(item.start_time * 1000 + diff).getTime() / 1000)
          : "";
        item.over_cancel_time = item.over_cancel_time
          ? Math.ceil(
              new Date(item.over_cancel_time * 1000 + diff).getTime() / 1000
            )
          : "";

        if (!item.end_time || !item.start_time) {
          flag = false;
          msg = `${item.dayDate}开始时间和结束时间不能为空`;
        }

        if (item.start_time) {
          if (item.start_time < Date.now() / 1000) {
            flag = false;
            msg = `${item.dayDate}开始时间必须大于当前时间`;
          }
        }

        if (item.end_time) {
          if (!item.start_time) {
            flag = false;
            msg = `${item.dayDate}请填写开始时间`;
          }
          if (item.end_time < item.start_time) {
            flag = false;
            msg = `${item.dayDate}结束时间必须大于开始时间`;
          }
        }

        if (item.over_cancel_time && item.over_cancel_time < item.end_time) {
          flag = false;
          msg = `${item.dayDate}超时取消必须大于任务结束时间`;
        }
      });

      if (template_form.publish_type != 0 && !flag) {
        openAlertWarn(`id为${template_form.task_no}的模板`+msg+"，请重新设置模板");
      }
      return template_form.publish_type != 0 && !flag
  }

  // 立即发布
  publish() {
    // this.$prompt("请输入支付密码", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   inputType: "password",
    // })
    //   .then((data: any) => {
    //     const value = data.value;
    //     if (!value) openWarnMsg("请输入支付密码");
    //     else {
    //       console.log("xxxxxxxxxxxxx", "请输入支付密码");

    //     }
    //   })
    //   .catch(() => {});
    if (!this.password) {
      openWarnMsg("请输入支付密码");
      return;
    }

    let count = 0;

    // 先校验一遍
    let flag = false
    for(let i = 0;i< this.tempGoodsList.length;i++){
        flag = this.checkTime(this.tempGoodsList[i])
        if(flag) break
    }

    if(flag) return

    let fn = (form: any) => {
      form.pay_password = this.password;
      let template_form = Object.assign({}, form);

      let flag = true;
      let mission_num = 0;
      let msg = "时间设置不正确，请重新设置";

      // template_form.good_info = JSON.parse(template_form.good_info);
      template_form.publish_option.forEach((item: any, index: number) => {
        if(!item.start_time){
          return 
        }
        const nowDate = new Date(this.transFormDateNew(index)).getTime()
        const afterDate = new Date(dateFormate(item.start_time * 1000,"yyyy-MM-dd")).getTime();
        const diff = nowDate - afterDate;

        item.dayDate = this.transFormDateNew(index);

        item.end_time = item.end_time
          ? Math.ceil(new Date(item.end_time * 1000 + diff).getTime() / 1000)
          : "";
        item.start_time = item.start_time
          ? Math.ceil(new Date(item.start_time * 1000 + diff).getTime() / 1000)
          : "";
        item.over_cancel_time = item.over_cancel_time
          ? Math.ceil(
              new Date(item.over_cancel_time * 1000 + diff).getTime() / 1000
            )
          : "";

        if (!item.end_time || !item.start_time) {
          flag = false;
          msg = `${item.dayDate}开始时间和结束时间不能为空`;
        }

        if (item.start_time) {
          if (item.start_time < Date.now() / 1000) {
            flag = false;
            msg = `${item.dayDate}开始时间必须大于当前时间`;
          }
        }

        if (item.end_time) {
          if (!item.start_time) {
            flag = false;
            msg = `${item.dayDate}请填写开始时间`;
          }
          if (item.end_time < item.start_time) {
            flag = false;
            msg = `${item.dayDate}结束时间必须大于开始时间`;
          }
        }

        if (item.over_cancel_time && item.over_cancel_time < item.end_time) {
          flag = false;
          msg = `${item.dayDate}超时取消必须大于任务结束时间`;
        }
      });

      if (template_form.publish_type != 0 && !flag) {
        openAlertWarn(msg+"，请重新设置模板");
        return;
      }

      publishNormalTask(template_form).then((data) => {
        ++count;
        if (data && data.origin_data && data.origin_data.code == 1001) {
          if (count == this.tempGoodsList.length) {
            openSuccessMsg("发布成功");
            const timer = setTimeout(() => {
              window.location.reload();
              clearTimeout(timer);
            }, 2000);
          } else fn(this.tempGoodsList[count]);
        }
      });
    
    };

    fn(this.tempGoodsList[0]);
  }

  // 打开确认信息的弹框
  openOneConfirmModal(item: any) {
    this.tempGoodsList = [item];
    this.showConfirmModal = true;
  }

  openGroupConfirmModal() {
    if (this.multipleSelection.length <= 0) {
      openWarnMsg("请先选择数据");
      return;
    }
    this.tempGoodsList = this.multipleSelection;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
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

.yz-font {
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
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
  width: 1400px;
  height: auto;
  border: 1px solid #ddd;
  margin: 20px auto 60px;
  padding: 20px;

  .detail-info {
    font-size: 14px;
    .detail-info-header {
      font-weight: 600;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .detail-info-item {
      margin: 8px 0px;
      @include flex(flex-start);
      & > div {
        flex: 1;
      }
      & img {
        width: 120px;
        height: 120px;
      }
    }
    .detail-info-item_text {
      margin-top: 10px;
      @include flex(flex-start);
      align-items: flex-start;
    }
  }

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

  .mission-table {
    .mission-pic {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      & > img {
        width: 100%;
        height: 100%;
      }
    }

    .mission-mirror {
      display: inline-block;
      border: 1px red solid;
      color: red;
      border-radius: 8px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .mission-buyer {
      & > div {
        margin-bottom: 5px;
      }
    }

    .btn-operation {
      & > div {
        margin-bottom: 8px;
      }
    }
  }

  .tx-tip {
    text-align: left;
    margin: 10px 0px;
  }
}

.remarks-modal {
  text-align: left;
  .el-dialog__title {
    font-size: 16px;
  }
  .el-textarea {
    width: 330px;
  }
  .el-dialog {
    width: 500px;
  }
}

.detail-modal {
  text-align: left;
  .el-dialog__title {
    font-size: 16px;
  }
  .el-textarea {
    width: 600px;
  }
}

.confirm-modal-container {
  font-size: 12px;
  .el-link {
    font-size: 12px;
  }
  thead {
    border: 1px solid #ddd;
    background: #f5f5f5;
  }
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
}
</style>
