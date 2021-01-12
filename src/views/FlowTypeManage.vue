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
          <div>任务分类： 流量任务</div>
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
          <div>搜索关键字： {{ detailInfo.option.keyword }}</div>
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

    <el-dialog :visible="showDailyModal" :title="'查看任务日志'">
      <el-table :data="dailyInfo">
        <el-table-column
          prop="creator"
          label="创建者"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.creator ? "系统" : scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="200px"
          align="center"
        >
         <template slot-scope="scope">
            <div>{{ scope.row.name ?  scope.row.name + scope.row.description : scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDailyModal" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="show_img_modal_one" :title="'查看截图'">
      <div v-for="(item, key) in picList" :key="key">
        <div
          style="
            font-weight: 600;
            text-align: left;
            margin: 12px 0px;
            color: #000;
          "
        >
          {{ item.name }}页面截图
        </div>
        <div class="show-image_content">
          <img :src="item.url" @click="openPreView(item.url)" />
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImageOneModal" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <v-header
      :list="['任务管理']"
      :currentIndex="currentIndex"
      :handleSwitchTab="handleSwitchTab"
    />

    <div class="zy-font tx-tip">
      现在需要商家打款本金+部分佣金到买手卡里，其余佣金平台来做打款，（详情看收费标准）
    </div>

    <div class="mission-form">
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
        <br />

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
    </div>

    <div class="mission-table">
      <el-table :data="missionData">
        <el-table-column prop="account" label="任务分类" width="100px">
          <template slot-scope="scope">
            <div>{{ getPlatFormByType(scope.row.type) }}</div>
            <div class="zy-font">流量任务</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品图片" width="200px">
          <template slot-scope="scope">
            <div class="mission-pic">
              <img :src="scope.row.main_url" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务/订单编号" width="280px">
          <template slot-scope="scope">
            <div class="zy-font">普通流量任务</div>
            <div>
              任务编号:{{ scope.row.task_no }}
              <!-- <span class="zy-font">({{getflowTypes(scope.row.id)}})</span> -->
              <span class="zy-font">(APP自然搜索)</span>
            </div>
            <div>订单编号:{{ scope.row.order_no }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="买号/商品信息" width="260px">
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div class="zy-font">
                买号: {{ scope.row.buyer_name || "" }}
                <span class="mission-mirror" v-if="scope.row.mirror == 1"
                  >照妖镜通过</span
                >
              </div>
              <div>
                <span class="mission-mirror yz-font">商家未验证</span>
                <el-button type="primary" size="mini" round>我已验过</el-button>
              </div>
              <div>关键字：{{ scope.row.description || "" }}</div>
              <div>店铺名称：{{ scope.row.shop_name || "--" }}</div>
              <div>
                <el-button type="text" @click="openDetailInfo(scope.row)"
                  >查看任务详情</el-button
                >
                <!-- <el-button type="text" @click="openRemarkModal"
                  >修改备注</el-button
                > -->
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品价格/任务佣金" width="200px">
          <template slot-scope="scope">
            <!-- <div>商品价格：{{ scope.row.price }}元</div> -->
            <!-- <div>
              实付金额：{{
                parseFloat(scope.row.price) + parseFloat(scope.row.user_fee)
              }}
              元
            </div> -->
            <div>任务佣金：{{ scope.row.user_fee }} 元</div>
            <div v-for="(i, key) in scope.row.services" :key="key">
              {{ i.name }}:
              <span class="zy-font"
                >{{
                  (parseFloat(i.count) * parseFloat(i.money)).toFixed(2)
                }}元</span
              >
            </div>
            <!-- <div>
              转账方式：
              <span class="zy-font">自行转账</span>
            </div> -->
            <!-- <div>
              强制收货：
              <span class="zy-font">否</span>
            </div> -->
            <!-- <div class="zy-font">
              您将返还{{ scope.row.user_fee }}元+商品本金给买手
            </div> -->
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务状态" width="200px">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="openDailyModal(scope.row.order_id)"
                >{{ getMissionStatus(scope.row.status) }}(查看日志)</el-button
              >
            </div>
            <div>发布时间：{{ scope.row.created_at }}</div>
            <div>接手时间：{{ scope.row.buyer_time || "--" }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="操作按钮">
          <template slot-scope="scope">
            <div class="btn-operation">
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  v-if="scope.row.confirm == 0"
                  @click="verifyFlow(scope.row)"
                  >核对</el-button
                >
                <el-button
                  type="success"
                  round
                  size="mini"
                  v-if="scope.row.confirm == 1"
                  >已核对</el-button
                >
              </div>
              <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="openImageOneModal(scope.row)"
                  >查看截图</el-button
                >
              </div>
              <!-- <div>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="openImageOneModal(scope.row)"
                  >查看足迹图</el-button
                >
              </div> -->
              <div>
                <el-button type="warning" round size="mini">客服介入</el-button>
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
  getDailyNote,
  getMissionMangerList,
  getFlowList,
  verifyOrder,
} from "@/service/order";
import {
  getFlowTypes,
  getMissionStatus,
  getPlatFormByType,
} from "@/lib/helper";
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";

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

  show_img_modal_one: boolean = false;
  show_img_modal_two: boolean = false;

  remarks: string = "";
  previewImg: string = "";
  detail_remarks =
    "卡天猫 天猫（商品主图一致 不一致的不要下单）郑重提示做过的不要在做 禁止复购  不要河北 北京的 》先货比3家每家2分钟，必须咨询完5句一问一答来回，没咨询5句的审核不通过，客服不在的不要连续发问，截图关键词进店，和浏览的足迹，足记一定至少包含有5张相关的商品图片，足记不够的审核不通过，后台监控店里深度浏览时间不够的，审核不通过，直接客服介入，申请退款！！！咨询问题参考问题1可以定做膜结构景观棚吗？2质保多久3骨架是什么材质的4按什么方式计价5需要预埋吗 6 100到200平";

  total: number = 0;

  searchForm: any = {};

  imgList: string[] = [];

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

  dailyInfo: any = {};

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

  picList: any = [];

  created() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    getFlowList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.services = JSON.parse(item.services);
          item.verify = JSON.parse(item.verify);
          return item;
        });
        this.missionData = t;
      }
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

  openPreView(url: string) {
    window.open(url);
    // location.href = url
  }

  // 查询的行为
  search() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    this.searchForm.page = 1;
    if (this.searchKey) {
      this.searchForm[this.searchKey] = this.searchValue;
    }
    getFlowList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.services = JSON.parse(item.services);
          item.verify = JSON.parse(item.verify);
          return item;
        });
        this.missionData = t;
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

  openDailyModal(order_id: any) {
    getDailyNote(order_id).then((data: any) => {
      if (data && data.data) {
        this.dailyInfo = data.data;
        this.showDailyModal = true;
      }
    });
  }

  closeDailyModal() {
    this.showDailyModal = false;
  }

  getMissionStatus(id: any) {
    return getMissionStatus(id);
  }

  openImageOneModal(item: any) {
    let img = item.verify.img_url_one;
    this.previewImg = img;
    this.picList = item.verify;
    this.show_img_modal_one = true;
  }

  closeImageOneModal() {
    this.show_img_modal_one = false;
  }

  openImageTwoModal() {
    this.show_img_modal_two = true;
  }

  closeImageTwoModal() {
    this.show_img_modal_two = false;
  }

  verifyFlow(row: any) {
      // verifyOrder(row.order_id, 1).then((data) => {
      //   if (data && data.origin_data && data.origin_data.code == 1001) {
      //     openSuccessMsg("核对成功");
      //     this.search();
      //   }
      // });
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

.show-image_content {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
