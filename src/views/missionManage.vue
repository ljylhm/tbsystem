<template>
  <div class="mission-container">
    <el-dialog
      :visible.sync="showRemarksModal"
      class="remarks-modal"
      :title="'修改任务备注'"
    >
      <el-form>
        <el-form-item :label="'任务编号：'">{{
          remarkForm.order_no
        }}</el-form-item>
        <el-form-item :label="'任务备注：'">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="remarkForm.description"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmRemarkAction" round type="warning"
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
        <el-button @click="showDetailModal = false" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showDailyModal"
      :title="'查看任务日志'"
      width="600px"
    >
      <el-table :data="dailyInfo" border>
        <el-table-column type="index" label="序号" width="60px" align="center">
        </el-table-column>
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
            <div>
              {{
                scope.row.creator
                  ? scope.row.creator + scope.row.description
                  : scope.row.description
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          align="center"
          width="198px"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDailyModal" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="show_img_modal_one" :title="'查看截图'">
      <div
        v-for="(item, key) in showPicList"
        :key="key"
        style="margin: 10px 0px; color: #000"
      >
        <div style="font-weight: 600; text-align: left; margin: 10px 0px">
          {{ item.name }}
        </div>
        <div class="show-image_content" @click="openPreView(item.url)">
          <img :src="item.url" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImageOneModal" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showExpressEditModal" :title="'填写运单号'">
      <div>
        <el-input v-model="expressForm.express_no"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expressVerify" round type="warning">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showWorkOrderModal"
      :title="'创建客服介入工单'"
      width="500px"
    >
      <div class="work-order-container">
        <div class="work-order-item">
          <div class="work-order-label">任务编号：</div>
          <div class="work-order-content">{{ order_id }}</div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">工单类型：</div>
          <div class="work-order-content">
            <el-select
              v-model="workOrderForm.type"
              @change="handleWorkTypeChange"
            >
              <el-option
                v-for="item in workOrderDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">问题分类：</div>
          <div class="work-order-content">
            <el-select v-model="workOrderForm.trouble_type">
              <el-option
                v-for="item in workQuestionData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- <div style="font-size: 12px; margin-bottom: 10px">
          <span style="color: red">温馨提示：</span
          >可上传1-5张的图片，图片的像素大小请控制在3M以内。
        </div> -->

        <div
          class="work-order-item"
          v-for="(item, key) in workOrderForm.pic"
          :key="key"
        >
          <div class="work-order-label">图片凭证{{ key + 1 }}</div>
          <div class="work-order-content">
            <div class="upload-container space-margin-bottom-10">
              <div class="upload-image" v-if="item">
                <div class="upload-top-content" @click="deleteOnePic(key)">
                  <i class="upload-icon"></i>
                </div>
                <img :src="item" />
              </div>
              <div class="upload-content">
                <i
                  class="el-icon-plus upload-content-icon"
                  @click="uploadImageBus(key)"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">备注说明</div>
          <div class="work-order-content">
            <el-input
              type="textarea"
              placeholder="请输入备注内容"
              v-model="workOrderForm.remark"
            />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="submitWorkOrder" round type="warning"
          >确认提交</el-button
        >
        <el-button @click="closeWorkOrderModal" round type="warning"
          >取消</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showCheckMissionModal"
      :title="'审核任务'"
      width="600px"
    >
      <div class="work-order-container">
        <div class="word-order-header">核对信息</div>
        <div class="work-order-item">
          <div class="work-order-label">任务编号：</div>
          <div class="work-order-content">
            {{ showVerifyForm.order_no || "--" }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">订单编号：</div>
          <div class="work-order-content">
            {{ showVerifyForm.order_number || "--" }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">任务本金：</div>
          <div class="work-order-content">
            {{ showVerifyForm.price * showVerifyForm.num || "--" }}元
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">实际付款金额：</div>
          <div class="work-order-content" style="">
            <div style="width: 80px; height: 40px; display: inline-block">
              <el-input
                placeholder=""
                v-model="checkWorkOrderForm.buyer_pay"
                type="number"
              />
            </div>
            （如实际付款金额与提交不一致修改左边即可）
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">订单截图：</div>
          <div class="work-order-content">
            <a :href="showVerifyForm.fk_img" target="_blank">
              <img
                :src="showVerifyForm.fk_img"
                alt=""
                style="width: 100px; height: 100px"
              />
            </a>
          </div>
        </div>

        <div class="word-order-header">如审核不通过请填写下列信息</div>
        <div class="work-order-item">
          <div class="work-order-label">审核不通过：</div>
          <div class="work-order-content">
            <el-input
              type="textarea"
              placeholder="如果您审核不通过请输入原因，方便平台与买手了解情况"
              v-model="checkWorkOrderForm.desc"
            />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="verifyOrder" round type="warning"
          >审核通过</el-button
        >
        <el-button @click="notVerifyOrder" round type="warning"
          >审核不通过</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showDcModal"
      :title="'导出任务选项'"
      width="600px"
    >
      <div class="work-order-container">
        <div class="word-order-header">请选择选项</div>
        <div class="work-order-item">
          <div class="work-order-label">任务状态：</div>
          <div class="work-order-content">
            <el-select v-model="dcForm.status" placeholder="全部任务">
              <el-option
                v-for="item in missTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="work-order-item">
          <div class="work-order-label">发布时间：</div>
          <div class="work-order-content">
            <el-date-picker
              v-model="dcForm.create_time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dcTimeChange"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDc" round type="primary">确认导出</el-button>
        <el-button @click="closeDcModal" round type="warning">返回</el-button>
      </span>
    </el-dialog>

    <VCustomService
      :visible="showCustomServiceModal"
      :order_id="order_id"
      :onChange="onChange"
    />

    <!-- '待接手任务（0）',
        '进行中任务（0）',
        '待审核订单任务（0）',
        '待审核买手任务（0）', -->
    <!-- 
        dwc:number = 1
  onway: number = 1
  wait: number = 1
  ywc: number = 1 -->

    <v-header
      :list="[
        '任务管理',
        `待接手任务（${wait}）`,
        `进行中任务（${onway}）`,
        `待审核订单任务（${dwc}）`,
        `审核已完成（${ywc}）`,
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
          <el-button type="success" round @click="groupCancel"
            >批量取消</el-button
          >
          <el-button type="warning" round @click="openDcModal">导出</el-button>
        </el-form-item>
        <br />
        <el-form-item label="" v-if="is_select">
          <el-button type="primary" round @click="confirmGroupCancel"
            >确认操作</el-button
          >
          <el-button type="warning" round @click="cancelGroupCancel"
            >取消操作</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="mission-table">
      <el-table
        :data="missionData"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="任务分类"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ getPlatFormByType(scope.row.type) }}</div>
            <div class="zy-font">销量任务</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="商品图片"
          width="160px"
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
          label="任务/订单编号"
          width="280px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="zy-font">普通销量任务</div>
            <div>
              任务编号:{{ scope.row.order_no }}
              <!-- <span class="zy-font">({{getflowTypes(scope.row.id)}})</span> -->
              <span class="zy-font">(APP自然搜索)</span>
            </div>
            <!-- <div>订单编号:{{ scope.row.order_no }}</div> -->
            <div v-if="scope.row.order_number">
              订单编号:<span class="zy-font">{{
                scope.row.order_number || "---"
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="买号/商品信息"
          width="260px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div class="zy-font">
                买号: {{ scope.row.buyer_name || "--" }}
                <span class="mission-mirror" v-if="scope.row.mirror == 1"
                  >照妖镜通过</span
                >
              </div>
              <div>
                <span class="mission-mirror yz-font">商家未验证</span>
                <el-button type="primary" size="mini" round>我已验过</el-button>
              </div>
              <div>关键字：{{ scope.row.option.keyword || "--" }}</div>
              <div>店铺名称：{{ scope.row.shop_name || "--" }}</div>
              <div>
                <el-button type="text" @click="openDetailInfo(scope.row)"
                  >查看任务详情</el-button
                >
                <el-button
                  type="text"
                  @click="
                    openRemarkModal(scope.row.order_no, scope.row.order_id)
                  "
                  >修改备注</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="account"
          label="商品价格/任务佣金"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div>商品价格：{{ calcPrice(scope.row) }}元</div>
            <div>
              实付金额：{{
                parseFloat(scope.row.buyer_pay) == 0 ? "--" : 
                parseFloat(scope.row.buyer_pay) + parseFloat(scope.row.user_fee)
              }}
              元
            </div>
            <div>任务佣金：{{ scope.row.user_fee }} 元</div>
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
        </el-table-column>

        <el-table-column
          prop="account"
          label="任务状态"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="openDailyModal(scope.row.order_id)"
                >{{ getMissionStatus(scope.row.status) }}(查看日志)</el-button
              >
            </div>
            <div>发布时间：{{ dateFormate(scope.row.end_time * 1000) }}</div>
            <div v-if="scope.row.buyer_time">
              接手时间：{{ dateFormate(scope.row.buyer_time * 1000) }}
            </div>
            <div v-if="scope.row.step_time && scope.row.step == 5">
              提交时间：{{ dateFormate(scope.row.step_time * 1000) }}
            </div>
            <div v-if="scope.row.step_time && scope.row.step == 5">
              审核到期时间：{{
                dateFormate(scope.row.step_time * 1000 + 2 * 60 * 60 * 1000)
              }}
            </div>
            <!-- <div>接手时间：2020/09/04 02:28:49</div> -->
          </template>
        </el-table-column>

        <el-table-column prop="account" label="操作按钮" align="center">
          <template slot-scope="scope">
            <div class="btn-operation">
              <div>
                <el-button
                  v-if="scope.row.status == 5 && scope.row.confirm == 0"
                  type="success"
                  round
                  size="mini"
                  @click="verifyAll(scope.row)"
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
                  v-if="scope.row.status == 2"
                  type="primary"
                  round
                  size="mini"
                  @click="
                    openExpressModal(scope.row.order_id, scope.row.confirm)
                  "
                  >发货</el-button
                >
              </div>
              <div>
                <el-button
                  type="success"
                  round
                  v-if="scope.row.status == 5"
                  size="mini"
                  @click="openImageOneModal(scope.row, 1)"
                  >查看截图</el-button
                >
              </div>
              <div>
                <el-button
                  v-if="scope.row.status == 5"
                  type="success"
                  round
                  size="mini"
                  @click="openImageOneModal(scope.row, 2)"
                  >查看足迹图</el-button
                >
              </div>
              <div>
                <el-button
                  type="warning"
                  round
                  size="mini"
                  @click="completeCustomService(scope.row.order_id)"
                  v-if="scope.row.status != 0 && scope.row.status != 1"
                  >客服介入</el-button
                >
              </div>
              <div v-if="scope.row.status == 0 || scope.row.status == 1">
                <el-button
                  type="warning"
                  round
                  size="mini"
                  @click="groupDelete([scope.row.order_id])"
                  >取消任务</el-button
                >
              </div>
              <div v-if="scope.row.status == 1">
                <el-button
                  type="warning"
                  round
                  size="mini"
                  @click="switchPeople(scope.row.order_id)"
                  >换人接单</el-button
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
import VCustomService from "@/components/VCustomService.vue";
import {
  expressOrder,
  getDailyNote,
  getMissionMangerList,
  groupCancel,
  verifyOrder,
  cancelNew,
  editRemark,
} from "@/service/order";
import {
  completeImgUrl,
  getFlowTypes,
  getMissionStatus,
  getPlatFormByType,
} from "@/lib/helper";
import { openAlertWarn, openSuccessMsg, openWarnMsg } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import { upLoadImage } from "@/service/uploadImg";
import { addWorkItem } from "@/service/order";
import { orderExport } from "@/service/task";
import { dateFormate } from "@/lib/time";

type ISelect = {
  label: string;
  value: string;
};

@Component({
  components: {
    VHeader,
    VTable,
    VCustomService,
  },
})
export default class Publish extends Vue {
  currentIndex: number = 0;
  showRemarksModal: boolean = false;
  showDetailModal: boolean = false;
  showDailyModal: boolean = false;
  showExpressEditModal: boolean = false;
  showCustomServiceModal: boolean = false;

  remarks: string = "";
  detail_remarks =
    "卡天猫 天猫（商品主图一致 不一致的不要下单）郑重提示做过的不要在做 禁止复购  不要河北 北京的 》先货比3家每家2分钟，必须咨询完5句一问一答来回，没咨询5句的审核不通过，客服不在的不要连续发问，截图关键词进店，和浏览的足迹，足记一定至少包含有5张相关的商品图片，足记不够的审核不通过，后台监控店里深度浏览时间不够的，审核不通过，直接客服介入，申请退款！！！咨询问题参考问题1可以定做膜结构景观棚吗？2质保多久3骨架是什么材质的4按什么方式计价5需要预埋吗 6 100到200平";

  total: number = 0;
  order_id: any = "";

  searchForm: any = {};
  dailyInfo: any = [];

  showWorkOrderModal: boolean = false; // 是否展示提交工单的弹窗
  showCheckMissionModal: boolean = false; // 展示商家审核弹框
  showDcModal: boolean = false; // 展示商家审核弹框

  is_select: boolean = false; // 是否选择

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

  multipleSelection: any[] = [];

  dwc: number = 1;
  onway: number = 1;
  wait: number = 1;
  ywc: number = 1;

  dcForm: any = {
    status: "",
    dtstart: "",
    dtend: "",
  };

  detailInfo = {
    option: {
      price_region: {
        to: null,
        from: null,
      },
    },
  };

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

  expressForm = {
    id: 0,
    express_no: "",
  };

  showPicList: any = [];
  zjImage: string = "";

  checkWorkOrderForm: any = {
    buyer_pay: "",
    desc: "",
  };

  // 展示审核的信息
  showVerifyForm: any = {};

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

  created() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    getMissionMangerList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.verify = JSON.parse(item.verify);
          item.good_info = JSON.parse(item.good_info);
          return item;
        });

        this.onway = data.data.count[0]["onway"];
        this.wait = data.data.count[0]["wait"];
        this.dwc = data.data.count[0]["dwc"];
        this.ywc = data.data.count[0]["ywc"];
        this.missionData = t;
      }
    });

    for (let i = 0; i < 4; i++) {
      this.url_fileOpener.push(
        new OpenFile({
          multiple: false,
        })
      );
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
        value: "order_no",
      },
      {
        label: "订单编号",
        value: "order_number",
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

  dateFormate(date: string) {
    return dateFormate(date, "yyyy-MM-dd hh:mm");
  }

  workOrderForm: any = {
    order_id: "",
    type: "",
    trouble_type: "",
    pic: ["", "", "", ""],
    description: "",
  };

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

  openPreView(url: string) {
    window.open(url);
    // location.href = url
  }

  remarkForm = {
    id: "",
    order_no: "",
    description: "",
  };

  openRemarkModal(order_no: any, id: any) {
    console.log("order_noorder_no", order_no);
    console.log("idid", id);
    this.remarkForm.order_no = order_no;
    this.remarkForm.id = id;
    this.showRemarksModal = true;
  }

  clsoeRemarkModal() {
    this.remarkForm = {
      id: "",
      order_no: "",
      description: "",
    };
    this.showRemarksModal = false;
  }

  confirmRemarkAction() {
    if (!this.remarkForm.description) {
      openWarnMsg("请输入备注~");
      return;
    }
    editRemark(this.remarkForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.clsoeRemarkModal();
        this.search();
      } else {
        openWarnMsg("修改失败");
      }
    });
  }

  openCheckMissionModal() {
    this.showCheckMissionModal = true;
  }

  closeCheckMissionModal() {
    this.checkWorkOrderForm = {
      buyer_pay: "",
      desc: "",
    };
    this.showCheckMissionModal = false;
  }

  handleSwitchTab(index: number) {
    this.currentIndex = index;
    console.log("状态...", index);
    if (index == 1) {
      this.searchMainForm.status = "0";
    }
    if (index == 2) {
      this.searchMainForm.status = "1";
    }
    if (index == 3) {
      this.searchMainForm.status = "5";
    }
    if (index == 4) {
      this.searchMainForm.status = "2";
    }
    this.search(1);
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

  dcTimeChange(value: string[] | null) {
    if (value) {
      this.dcForm.dtstart = String(new Date(value[0]).getTime() / 1000);
      this.dcForm.dtend = String(new Date(value[1]).getTime() / 1000);
    }
  }

  // 查询的行为
  search(page?: number) {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };

    if (typeof page == "string" || typeof page == "number") {
      this.searchForm.page = page || 1;
    }

    if (this.searchKey) {
      this.searchForm[this.searchKey] = this.searchValue;
    }
    getMissionMangerList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.verify = JSON.parse(item.verify);
          item.good_info = JSON.parse(item.good_info);
          return item;
        });
        this.onway = data.data.count[0]["onway"];
        this.wait = data.data.count[0]["wait"];
        this.dwc = data.data.count[0]["dwc"];
        this.ywc = data.data.count[0]["ywc"];

        this.total = data.data.total;
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
    console.log("pageSizeChange", currentPage);
    this.searchForm.page = currentPage;
    this.search(currentPage);
  }

  openDetailInfo(data: any) {
    this.showDetailModal = true;
    this.detailInfo = data;
  }

  getDailyNote(order_id: any) {
    getDailyNote(order_id).then((data) => {
      console.log("");
    });
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

  show_img_modal_one: boolean = false;
  previewImg: any = "";

  openImageOneModal(item: any, type: number = 1) {
    // if (
    //   item.status == 5 ||
    //   item.status == 7 ||
    //   item.status == 2 ||
    //   item.status == 3 ||
    //   item.status == 4
    // ) {

    // } else {
    //   openWarnMsg("任务状态是未完成状态");
    // }

    let arr = [];
    if (type == 1) {
      if (item.ss_img) {
        arr.push({
          name: "搜索页面截图",
          url: item.ss_img,
        });
      }

      if (item.fk_img) {
        arr.push({
          name: "付款页面截图",
          url: item.fk_img,
        });
      }
    } else {
      if (item.zj_img) {
        arr.push({
          name: "足迹截图",
          url: item.zj_img,
        });
      }
    }

    this.showPicList = arr;

    this.show_img_modal_one = true;
  }

  closeImageOneModal() {
    this.show_img_modal_one = false;
  }

  openExpressModal(id: any, confirm: any) {
    if (confirm == 1) {
      this.expressForm.id = id;
      this.showExpressEditModal = true;
    } else {
      openAlertWarn("清先核对买手提交内容");
    }
  }

  closeExpressModal() {
    this.showExpressEditModal = false;
  }

  verifyAll(item: any) {
    this.showVerifyForm = item;
    this.checkWorkOrderForm.buyer_pay = item.buyer_pay;
    this.openCheckMissionModal();
  }

  verifyOrder() {
    const id = this.showVerifyForm.order_id;
    const form = this.checkWorkOrderForm;
    const para = {
      id,
      confirm: 1,
      check_type: 1,
      ...form,
    };
    if (!para.buyer_pay) {
      openWarnMsg("请填写实际付款金额");
      return;
    }
    verifyOrder(para).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("审核完成");
        this.closeCheckMissionModal();
        this.search();
      }
    });
  }

  notVerifyOrder() {
    const id = this.showVerifyForm.order_id;
    const form = this.checkWorkOrderForm;
    const para = {
      id,
      confirm: 1,
      check_type: 2,
      ...form,
    };
    verifyOrder(para).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("审核完成");
        this.closeCheckMissionModal();
        this.search();
      }
    });
  }

  expressVerify(id: any, express_no: any, confirm: any) {
    if (!this.expressForm.express_no) {
      openWarnMsg("请填写用户订单内容");
    } else {
      expressOrder(this.expressForm.id, this.expressForm.express_no).then(
        (data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("填写成功");
            this.closeExpressModal();
            this.search();
          }
        }
      );
    }
  }

  completeCustomService(id: any) {
    this.order_id = id;
    // this.workOrderForm = {
    //   order_id: "",
    //   type: "",
    //   trouble_type: "",
    //   pic: ["", "", "", ""],
    //   description: "",
    // };
    this.openWorkOrderModal();
  }

  onChange() {
    this.showCustomServiceModal = false;
  }

  groupCancel() {
    console.log("批量取消 批量取消");
    // 选择批量取消
    this.is_select = true;
  }

  cancelGroupCancel() {
    // 取消批量取消
    this.is_select = false;
    this.multipleSelection = [];
  }

  confirmGroupCancel() {
    if (this.multipleSelection.length < 0) {
      openWarnMsg("请至少选择一个");
    } else {
      const ids = this.multipleSelection.map((item: any) => {
        return item.order_id;
      });
      this.groupDelete(ids);
    }
  }

  groupDelete(ids: any[]) {
    return groupCancel(ids).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("删除成功");
        this.is_select = false;
        this.search();
      }
    });
  }

  switchPeople(id: any) {
    cancelNew(id).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("当前任务已被取消");
        this.search();
      }
    });
  }

  handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  // 计算商品价格
  countPrice(good_info: any) {
    if (good_info) {
      good_info;
    }
  }

  url_fileOpener: any = [];

  uploadImageBus(index: number) {
    this.url_fileOpener[index].getLocalImage((data: any) => {
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.$set(
            this.workOrderForm.pic,
            index,
            completeImgUrl(res.data.src)
          );
        }
      });
    });
  }

  deleteOnePic(index: number) {
    this.$set(this.workOrderForm.pic, index, "");
  }

  // 关闭模态框
  closeWorkOrderModal() {
    this.showWorkOrderModal = false;
    // 重置为默认值
    this.workOrderForm = {
      order_id: "",
      type: "",
      trouble_type: "",
      pic: ["", "", "", ""],
      description: "",
    };
  }

  openWorkOrderModal() {
    this.showWorkOrderModal = true;
  }

  // 打开导出模态框
  openDcModal() {
    this.showDcModal = true;
  }

  closeDcModal() {
    this.showDcModal = false;
    this.dcForm = {
      status: "",
      dtstart: "",
      dtend: "",
    };
  }

  // 计算价格
  calcPrice(item: any) {
    let price = 0;
    price = Number(item.price) * Number(item.num);
    // item.forEach((i, key) => {
    //   price = price + Number(i.price) * Number(i.num);
    // });
    return price;
  }

  //  提交工单
  submitWorkOrder() {
    // order_id: "",
    // type: "",
    // trouble_type: "",
    // pic: ["", "", "", ""],
    // description: "",
    this.workOrderForm.order_id = this.order_id;
    if (!this.workOrderForm.type) {
      openWarnMsg("请选择工单类型");
      return;
    }
    if (!this.workOrderForm.trouble_type) {
      openWarnMsg("请选择问题类型");
      return;
    }

    let is_empty_pic = this.workOrderForm.pic.every(
      (item: string) => item == ""
    );
    if (is_empty_pic) {
      openWarnMsg("请至少选择一张图片上传");
      return;
    }

    addWorkItem(this.workOrderForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("提交成功");
        this.closeWorkOrderModal();
      }
    });
  }

  // 导出数据
  confirmDc() {
    console.log("dtstart dtstart", this.dcForm.dtstart);
    console.log("dtend dtend", this.dcForm.dtend);
    if (!this.dcForm.dtstart || !this.dcForm.dtend) {
      openWarnMsg("请输入时间");
      return;
    }
    orderExport(this.dcForm.status, this.dcForm.dtstart, this.dcForm.dtend);

    // .then(data=>{
    //   if(data && data.origin_data && data.origin_data.code == 1001){
    //     openSuccessMsg("导出成功")
    //   }
    // })
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
  &:hover {
    cursor: pointer;
  }
}

.work-order-container {
  width: 540px;
  margin: 0 auto;
  height: auto;
  box-sizing: border-box;
  padding: 20px;

  .word-order-header {
    padding-bottom: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: #323232;
    border-bottom: 2px solid #ddd;
  }
  .work-order-item {
    @include flex(flex-start);
    align-items: center;
    margin-bottom: 15px;
    .work-order-label {
      width: 100px;
      text-align: left;
    }
    .word-order-content {
      flex: 1;
    }
  }
}

.upload-container {
  @include flex(flex-start);
  align-items: center;
  .upload-image {
    width: 80px;
    height: 80px;
    position: relative;
    & img {
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
  }
  .upload-content {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    margin-right: 10px;
    .upload-content-icon {
      font-size: 20px;
      color: #8c939d;
      width: 80px;
      @include setHeight(80px);
      text-align: center;
      cursor: pointer;
    }
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
