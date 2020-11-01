<template>
  <div class="publish-container">
    <el-dialog title="选择商品" :visible.sync="showSearchShopModal">
      <div style="padding-bottom: 10px">
        <div class="pubilsh-choose-header">
          选择商品：
          <div>
            <el-select v-model="searchShopForm" placeholder="请选择">
              <el-option
                v-for="item in shopOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="pubilsh-choose_input">
            <el-input v-model="input" placeholder="请输入商品名称"></el-input>
          </div>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="zy-font tip-modal">提示: 单击一行以用来进行选择</div>
        <div class="pubilsh-choose-content">
          <el-table
            ref="publishChooseTable"
            :data="goodsInfoData"
            highlight-current-row
            @current-change="rowChange"
            border
          >
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="商品ID"
              width="80px"
              align="center"
            />

            <el-table-column
              prop="shopkeeper"
              label="店铺名"
              width="160px"
              align="center"
            />

            <el-table-column prop="name" label="商品名称" align="center" />

            <el-table-column
              prop="name_simple"
              label="商品简称"
              align="center"
            />

            <!-- <el-table-column prop="num" label="数量" width="200" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.num"
                placeholder="请输入数量"
                type="number"
              ></el-input>
            </template>
          </el-table-column> -->
          </el-table>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chooseGoods">确定</el-button>
        <el-button type="warning" @click="closeAddGoodsModal">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="其他搜索条件"
      :visible.sync="showOptionsModal"
      width="500px"
    >
      <div class="pub-search_item">
        <div class="pub-search_item_label">排序：</div>
        <div class="pub-search_item_content">
          <el-select
            v-model="otherOptions.shop_order"
            placeholder="请选择排序方式"
          >
            <el-option
              v-for="item in order_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">发送地：</div>
        <div class="pub-search_item_content">
          <el-input v-model="otherOptions.send_address"></el-input>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">价格区间：</div>
        <div class="pub-search_item_content">
          <div class="pub-search_item_content_left">
            <el-input v-model="otherOptions.price_region.from"></el-input>
          </div>
          <div class="pub-search_item_content_left">
            <el-input v-model="otherOptions.price_region.to"></el-input>
          </div>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">其他：</div>
        <div class="pub-search_item_content">
          <el-input v-model="otherOptions.remark"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOtherOptions" round type="warning"
          >确认提交</el-button
        >
        <el-button type="primary" @click="closeOptionsModal" round
          >返回修改</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="选择包裹内物品"
      :visible.sync="showExpressModal"
      width="800px"
    >
      <el-table :data="expressData" border>
        <el-table-column
          prop="flowType"
          label="选择商品"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio></el-radio>
          </template>
        </el-table-column>

        <el-table-column
          prop="flowType"
          label="主图"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div style="text-align: center">
              <img
                :src="scope.row.main_url"
                style="width: 40px; height: 40px; margin: 0 auto"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="简述" align="center">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOtherOptions" round type="primary"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <div>
      <div class="pub-item">
        <span>选定商品</span>
        <el-button type="primary" round size="mini" @click="openAddGoodsModal"
          >选择商品</el-button
        >
      </div>

      <div class="pub-table">
        <div class="pub-table_header">选择商品</div>
        <table border="1">
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品名称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.name }}
            </td>
            <td rowspan="5" class="pub-table_image">
              <img
                :src="currentShopDetail.main_url"
                v-if="currentShopDetail.main_url"
                alt=""
              />
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">店铺名称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.shopkeeper }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品简称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.name_simple }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品链接</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.goods_url }}
            </td>
          </tr>
        </table>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <div class="pub-item_table_header">
          <span>来路设置</span>
          <div class="pub-item_table_right">
            来路设置总数：<span class="zy-font">0</span> PC：<span
              class="zy-font"
              >0</span
            >
            无线端：<span class="zy-font">{{phoneNumber}}</span>
            <el-button
              type="primary"
              class="pub-item_table_right_btn"
              round
              size="mini"
              @click="addFormSetting"
              >新增</el-button
            >
          </div>
        </div>

        <div class="pub-item_table_content">
          <el-table :data="searchForm.option" border>
            <el-table-column
              prop="flowType"
              label="流量入口"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.flow_type" placeholder="请选择">
                  <el-option
                    v-for="item in flowTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              prop="keyword"
              label="关键字"
              width="300"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.keyword"
                  placeholder="请输入关键字"
                ></el-input>
              </template>

              <template slot="header">
                关键字<span class="zy-font space-margin-left-15 under-line"
                  >搜索关键字设置规范</span
                >
              </template>
            </el-table-column>

            <el-table-column prop="num" label="数量" width="200" align="center">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.num"
                  placeholder="请输入数量"
                  type="number"
                  @change="handleNumInputChange"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop=""
              label="其他设置条件(可选)"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  @click="openOptionsModal(scope.row)"
                  >设置</el-button
                >
              </template>
            </el-table-column>

            <el-table-column prop="" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  @click="deleteFromSetting(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div
        class="pub-item space-margin-top-15"
        style="justify-content: flex-start; height: 60px"
      >
        <div>备注信息（选填）：</div>
        <div>
          <el-input
            style="width: 800px"
            v-model="searchForm.descripiton"
          ></el-input>
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <VPublish :count="searchForm.task_num" ref="vpublish" />
      </div>

      <div class="pub-item_table space-margin-top-15">
        <VTask :count="searchForm.task_num" ref="vtask" />
      </div>

      <div class="button-content">
        <el-button type="primary" @click="checkNormal">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src
import VPublish from "@/components/VPublishTask.vue"; // @ is an alias to /src
import VTask from "@/components/VTask.vue"; 
import { getGoodsList, getShopKeeperList } from "@/service/good"; // @ is an alias to /src
import { getMyShopList } from "@/service/shop"; // @ is an alias to /src
import { publishNormalTask } from "@/service/task";
import {
  openAlertError,
  openAlertWarn,
  openSuccessMsg,
  openWarnMsg,
} from "../lib/notice";
import { ModuleGoods, DEFAULT_GOODLIST } from "@/constance/goods";
import { IShopKeeper, IShopKeeperSelect } from "@/constance/shop";

@Component({
  components: {
    HelloWorld,
    Header,
    VPublish,
    VTask
  },
})
export default class Publish extends Vue {
  DEFAULT_OPTIONS = {
    flow_type: "1", // 流量入口
    keyword: "", // 关键字
    count: "", // 数量
    shop_order: 1, // 商品排序方式
    price_region: {
      // 价格区间
      from: "",
      to: "",
    },
    send_address: "", // 发货地
    remark: "", // 其他
  };

  phoneNumber = 0

  handleNumInputChange(){
    let count = 0
    this.searchForm.option.forEach((i:any) => {
      count = count + parseInt(i.num) 
    });
    console.log("count",this.searchForm)
    this.phoneNumber = count
  }

  // 展示商品的模态框
  showExpressModal = false;

  // 展示模态框的集合
  showSearchShopModal = false;

  // 展示设置配置的集合
  showOptionsModal = false;

  // status = "second";
  status = "first";
  input = "";

  currentShopDetailTemp: ModuleGoods.IGoodList = Object.assign(
    {},
    DEFAULT_GOODLIST
  );
  currentShopDetail: ModuleGoods.IGoodList = Object.assign(
    {},
    DEFAULT_GOODLIST
  );

  order_type = [
    {
      value: 1,
      label: "综合",
    },
    {
      value: 2,
      label: "销量",
    },
    {
      value: 3,
      label: "价格从高到低",
    },
    {
      value: 4,
      label: "价格从低到高",
    },
  ];

  searchForm: any = {
    goods_id: "", // 商品id
    is_main: 1,
    price: "", // 价格
    mode: "", // 型号
    num: "", // 件数
    task_num: 0, // 任务数
    fee: 10, // 快递费用
    checkgoodsname: false, // 接单选择
    is_check: false, // 是否验证标题
    is_checkimg: false, // 是否验证图片
    option: [
      {
        flow_type: "1", // 流量入口
        keyword: "", // 关键字
        count: "", // 数量
        shop_order: 1, // 商品排序方式
        price_region: {
          // 价格区间
          from: "",
          to: "",
        },
        send_address: "", // 发货地
        remark: "", // 其他
      },
    ],
    publish_type: 0, // 0. 立即发布 1. 多天平均发布 2. 预约发布任务
    publish_option: [],
    express_type: "0",
    top_fee: 0, // 置顶费用
    descripiton: "", // 描述
    transfertype: "0", // 转账方式
    front_fee: "0", // 是否为定金单
    is_template: "0", // 是否设置为模板
  };

  otherOptions = {
    shop_order: 1, // 商品排序方式
    price_region: {
      // 价格区间
      from: "",
      to: "",
    },
    send_address: "", // 发货地
    remark: "", // 其他
  };

  shopInfo = {
    name: "",
    title: "",
    shop_name: "",
    link: "",
    image: "",
  };

  form = {
    price: 1,
    checkBuyer: "2",
    needUpImage: "2",
    publishType: "1",
  };

  tableData = [
    {
      flowType: "",
      keyword: "",
      num: "",
    },
  ];

  dateDate = [{}];

  flowTypes = [
    {
      value: "1",
      label: "APP自然搜索",
    },
    {
      value: "3",
      label: "APP淘口令",
    },
    {
      value: "4",
      label: "APP直通车",
    }
  ];

  expressData = [
    {
      main_url:
        "https://kbgift.oss-cn-beijing.aliyuncs.com/1579012832223tcgiaj.png",
      name: "香薰包 香袋粗麻布去味防虫香囊",
    },
  ];

  shopOptions: IShopKeeperSelect[] = [];

  searchShopForm = "";

  shopKeeperData: IShopKeeperSelect[] = [];

  goodsInfoData: ModuleGoods.IGoodList[] = [];
  showGoodsInfoData: ModuleGoods.IGoodList[] = [];

  created() {
    getGoodsList().then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.goodsInfoData = res.list;
      }
    });

    getShopKeeperList().then((data) => {
      if (data && data.data) {
        const res = data.data;

        let shop_keeper_data = res.map((item) => {
          return {
            label: item.shopkeeper,
            value: item.id,
          };
        });
        this.shopOptions = shop_keeper_data;
      }
    });
  }

  searchGoods() {
    getGoodsList().then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.showGoodsInfoData = res.list;
      }
    });
  }

  // change事件
  rowChange(val: ModuleGoods.IGoodList) {
    this.currentShopDetailTemp = val;
  }

  // 选择商品
  chooseGoods() {
    if (this.currentShopDetailTemp.id) {
      this.currentShopDetail = this.currentShopDetailTemp;
      this.searchForm.goods_id = this.currentShopDetailTemp.id;
      this.closeAddGoodsModal();
    } else {
      openWarnMsg("请至少选择一个商品");
    }
  }

  addFromSetting = () => {
    const o = {
      flowType: "",
      keyword: "",
      num: "",
    };
    this.tableData.push(o);
  };

  openAddGoodsModal() {
    if (this.goodsInfoData.length <= 0) {
      openWarnMsg("请先至少添加一个商品");
    } else {
      this.showSearchShopModal = true;
      this.showGoodsInfoData = this.goodsInfoData;
    }
  }

  closeAddGoodsModal() {
    this.showSearchShopModal = false;
  }

  handleChange(e: any) {
    console.log("eeeee", e);
  }

  // 保存其他设置

  addFormSetting() {
    // 新增一行设置
    const opt = Object.assign({}, this.DEFAULT_OPTIONS);
    this.searchForm.option.push(opt);
  }
  deleteFromSetting = (index: number) => {
    if (this.searchForm.option.length == 1) return;
    this.searchForm.option.splice(index, 1);
  };

  closeOptionsModal() {
    this.showOptionsModal = false;
  }
  openOptionsModal(row: any) {
    console.log(row);
    this.otherOptions = row;
    this.showOptionsModal = true;
  }
  saveOtherOptions() {
    this.closeOptionsModal();
  }

  saveAll() {
    const { searchForm } = this;
    const type = (this.$refs["vpublish"] as any).getPublishType();
    this.searchForm.publish_type = type;
    console.log("this.searchForm", this.searchForm);
    publishNormalTask(searchForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("发布成功");
        window.location.reload();
      }
    });
  }

  // 检测正常设置
  checkNormal() {
    const { goods_id, price, mode, num, task_num, option } = this.searchForm;
    if (!goods_id) {
      openAlertWarn("请选择商品");
      return;
    }
    if (!price) {
      openAlertWarn("请输入单价");
      return;
    }
    if (!num) {
      openAlertWarn("请输入件数");
      return;
    }
    if (!task_num) {
      openAlertWarn("请输入任务数");
      return;
    }

    let option_num = 0;
    option.forEach((item: any) => {
      if (item.num) {
        option_num = option_num + parseInt(item.num);
      }
    });
    if (option_num != parseInt(task_num)) {
      openAlertWarn("任务数与来源数量不匹配，请重新设置");
      return;
    }

    // 检测发布时间
    let table_data = (this.$refs["vpublish"] as any).getTableData();
    let table_type = (this.$refs["vpublish"] as any).getPublishType();
    const copy_table_data = JSON.parse(JSON.stringify(table_data));
    console.log("xxxxx", table_data);

    let flag = true;
    let mission_num = 0;
    let data_time = copy_table_data.map((item: any) => {
      mission_num = mission_num + parseInt(item.missionNum);
      console.log("end_time", item);
      if (item.end_time)
        item.end_time = new Date(item.dayDate + ` ${item.end_time}`).getTime();
      if (item.start_time)
        item.start_time = new Date(
          item.dayDate + ` ${item.start_time}`
        ).getTime();
      if (item.over_cancel_time)
        item.over_cancel_time = new Date(
          item.dayDate + ` ${item.over_cancel_time}`
        ).getTime();
      if (item.end_time) {
        if (!item.start_time) flag = false;
        if (item.end_time < item.start_time) flag = false;
      }
      delete item.date;
      delete item.disabled;
      return item;
    });

    if (mission_num != parseInt(task_num)) {
      openAlertWarn("任务数不匹配，请重新设置");
      return;
    }

    if (!flag) {
      openAlertWarn("时间设置不正确，请重新设置");
      return;
    }

    this.searchForm.publish_option = data_time;

    this.status = "2";
  }

  // 保存的方法
  save() {}
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

.tip-modal {
  text-align: left;
  margin-top: 6px;
  font-size: 14px;
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
  margin-top: 8px;
}

.publish-container {
  width: 1200px;
  height: auto;
  border: 1px solid #ddd;
  margin: 20px auto 60px;
  padding: 20px;

  .pub-search_item {
    @include flex(flex-start);
    align-items: center;
    margin-bottom: 15px;
    .pub-search_item_label {
      width: 100px;
    }
    .pub-search_item_content {
      // flex: 1;
      @include flex(space-between);
      align-items: center;
      .pub-search_item_content_left {
        width: 150px;
        margin-right: 20px;
      }
      .pub-search_item_content_right {
        width: 150px;
      }
    }
  }

  .pub-header {
    @include setHeight(46px);
    @include flex(flex-start);
    background: #eeeeee;
    font-size: 14px;
    .pub-header_item {
      flex: 1;
    }
    .is-active {
      background: #ff9900;
      color: #fff;
    }
  }

  .pub-item {
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    font-size: 14px;
    border: 1px solid #ddd;
    @include flex(space-between);
    align-items: center;
  }

  .pub-table {
    font-size: 14px;
    & > table {
      border-color: #ddd;
      border: none;
    }
    .pub-table_header {
      width: 100%;
      @include setHeight(40px);
      margin-top: 15px;
      background: #ddd;
      color: #000;
      text-align: center;
    }

    .pub-table_content_item {
      & td {
        height: 40px;
        text-align: center;
      }
    }

    .pub-table_content_label {
      width: 300px;
      background: #f5f5f5;
    }

    .pub-table_content_content {
      width: 700px;
    }

    .pub-table_image {
      width: 200px;
    }
  }

  .pub-input_price {
    width: 100px;
    margin-right: 10px;
  }

  .pub-item_table {
    .pub-item_table_header {
      padding: 0px 20px;
      @include setHeight(40px);
      @include flex(space-between);
      border: 1px solid #ddd;
      border-bottom: none;
      font-weight: 600;
      .pub-item_table_right {
        font-size: 12px;
        .pub-item_table_right_btn {
          margin-left: 12px;
        }
      }
    }

    .pub-item_table_content {
      .pub-item_table_content_item {
        width: 100%;
        border: 1px solid #ddd;
        @include flex(flex-start);
        align-items: center;
        height: 60px;
        font-size: 14px;
        .left-pub {
          height: 100%;
          width: 200px;
          box-sizing: border-box;
          padding: 15px;
          background: #f5f5f5;
        }
        .right-pub {
          flex: 1;
        }
      }
    }
  }

  .button-content {
    margin-top: 20px;
  }

  .make-table-content {
    border: 1px solid #ddd;
    .make-table-item {
      @include flex(flex-start);
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      .make-table-item_left {
        width: 300px;
        @include setHeight(40px);
        border-right: 1px solid #ddd;
      }
      .make-table-item_right {
        flex: 1;
        @include setHeight(40px);
      }
    }

    .make-table-title {
      background: #f5f5f5;
    }
  }
}
</style>
