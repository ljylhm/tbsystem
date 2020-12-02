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
          <div>搜索关键字：<span class="zy-font" style="font-weight:600">{{ detailInfo.option.keyword }}</span> </div>
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

    <v-header
      :list="[
        '模板管理'
      ]"
      :currentIndex="currentIndex"
      :handleSwitchTab="handleSwitchTab"
    />

    <!-- <div class="mission-form">
      <el-form :inline="true">
        <el-form-item>
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
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" round @click="search">查询</el-button>
          <el-button type="success" round>批量取消</el-button>
          <el-button type="warning" round>导出</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <div class="mission-table" style="margin-top:15px">
      <el-table :data="missionData">
        <el-table-column prop="account" label="任务分类" width="100px" align="center">
          <template slot-scope="scope">
            <div>{{ getPlatFormByType(scope.row.platform_type) }}</div>
            <div class="zy-font">{{scope.row.type == 0 ? "销量任务" : "流量任务"}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品图片" width="200px" align="center">
          <template slot-scope="scope">
            <div class="mission-pic">
              <img :src="scope.row.main_url" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="店铺信息" width="260px" align="center">
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div>店铺名称：{{ scope.row.shop_name || "--" }}</div>
              <div>发货人：{{ scope.row.sender || "--" }}</div>
              <div>发货手机：{{ scope.row.sender_phone || "--" }}</div>
              <div>发货地址：{{ scope.row.address || "--" }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品信息" width="260px" align="center">
          <template slot-scope="scope">
            <div class="mission-buyer">
               <div>型号：{{ scope.row.mode || "--" }}</div>
              <div>件数：{{ scope.row.num || "--" }}</div>
              <div>搜索来路： <span class="zy-font">{{ getFlowTypes(scope.row.option[0].flow_type) }}</span></div>
                <div>关键字：<span class="zy-font" style="font-weight:600">{{ scope.row.option[0].keyword || "--" }}</span></div>
                <div>任务数：<span class="zy-font" style="font-weight:600">{{ scope.row.task_num || "--" }}</span></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品价格/任务佣金" width="200px" align="center">
          <template slot-scope="scope">
            <div>商品价格：{{ scope.row.price }}元</div>
            <div>任务佣金：{{ scope.row.total_amount }} 元</div>
            <div>
              转账方式：
              <span class="zy-font">自行转账</span>
            </div>
            <div>
              强制收货：
              <span class="zy-font">否</span>
            </div>
            <!-- <div class="zy-font">
              您将返还{{ scope.row.user_fee }}元+商品本金给买手
            </div> -->
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务时间" width="200px" align="center">
          <template slot-scope="scope">
            <div>发布时间：{{ scope.row.created_at }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="操作按钮" align="center">
          <template slot-scope="scope">
            <div class="btn-operation">
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
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
import { confirmMessageOne, openSuccessMsg } from '@/lib/notice';
import { routerHelper } from '@/router';

type ISelect = {
  label: string;
  value: string;
};

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

  created() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    getTemplateList().then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          return item;
        });
        this.missionData = t;
      }
    });

    getTemplateList().then((data) => {
      console.log("data data data", data);
    });
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
    getTemplateList().then((data: any) => {
      if (data && data.data && data.data.list) {
        // const t = data.data.list.map((item: any) => {
        //   item.option = JSON.parse(item.option);
        //   item.publish_option = JSON.parse(item.publish_option);
        //   return item;
        // });
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
        console.log("日志内容",data.data)
        this.dailyNoteInfo = data.data;
        this.showDailyModal = true;
      }
    });
  }

  closeDailyModal() {
    this.showDailyModal = false;
  }

  delItemTemplate(id:number){
      confirmMessageOne("提示","确定要删除这条模板吗？").then(data=>{
          delTemplateList(id).then((res) =>{
              if(res && res.origin_data && res.origin_data.code == 1001){
                  openSuccessMsg("删除成功")
                  this.search()
              }
          })
      })
  }

  // 修改模板
  toUpDateTemplate(id:any){
      routerHelper.to("/templatePub",{
          id
      })
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
  // .el-dialog {
  //   width: 500px;
  // }
}
</style>
