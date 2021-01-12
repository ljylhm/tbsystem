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
          <div>任务编号： {{ detailInfo.order_no }}</div>
        </div>
        <div class="detail-info-item">
          <div>订单编号： {{ detailInfo.task_no }}</div>
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
            <div>{{ scope.row.creator ? scope.row.creator : "系统" }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="200px"
          align="center"
        >
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

    <el-dialog :visible="show_img_modal_one" :title="'查看截图'">
      <div class="show-image_content">
        <img :src="previewImg" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImageOneModal" round type="warning"
          >确认</el-button
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
          <div class="work-order-label">订单编号：</div>
          <div class="work-order-content">
            {{ showVerifyDetailInfo.order_no || "--" }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">评价类型：</div>
          <div class="work-order-content">
            {{ getCommentListById(showVerifyDetailInfo.evaluate_type) }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">店铺名称：</div>
          <div class="work-order-content">
            {{ showVerifyDetailInfo.shop_name || "--" }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">商品名称：</div>
          <div class="work-order-content">
            {{ showVerifyDetailInfo.goods_name || "--" }}
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">商家设置的好评内容：</div>
          <div class="work-order-content">
            <el-input
              type="textarea"
              placeholder=""
              v-model="showVerifyDetailInfo.evaluate_comment"
              disabled
            />
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">买手上传的评价截图：</div>
          <div class="work-order-content">
            <a :href="showVerifyDetailInfo.evaluate_buyer" target="_blank">
              <img
                :src="showVerifyDetailInfo.evaluate_buyer"
                alt=""
                style="width: 100px; height: 100px"
              />
            </a>
          </div>
        </div>

        <div class="word-order-header">如审核不通过请填写下列信息</div>
        <div class="work-order-item">
          <div class="work-order-label">不通过原因：</div>
          <div class="work-order-content">
            <el-input
              type="textarea"
              placeholder="若要进行审核不通过操作，请先输入不通过原因，此时【审核不通过】按钮才会被激活"
              v-model="verifyForm.evaluate_desc"
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
      :visible.sync="showExpressEditModal"
      :title="'设置评价内容'"
      width="500px"
    >
      <!-- <div>
        <el-input v-model="expressForm.express_no"></el-input>
      </div> -->

      <div class="work-order-container">
        <div class="work-order-item">
          <div class="work-order-label">选择评价类型：</div>
          <div class="work-order-content">
            <el-radio-group v-model="commentForm.evaluate_type">
              <el-radio :label="1"
                >文字好评 <span class="zy-font">0.5</span>元</el-radio
              >
              <el-radio :label="2"
                >晒图好评 <span class="zy-font">1.0</span>元</el-radio
              >
              <el-radio :label="3"
                >五星好评无需文字晒图<span class="zy-font">0.5</span
                >元</el-radio
              >
              <el-radio :label="4"
                >五星好评且评价自由发挥<span class="zy-font">0.5</span
                >元</el-radio
              >
            </el-radio-group>
          </div>
        </div>

        <div class="work-order-item">
          <div class="work-order-label">设置好评内容:</div>
          <div class="work-order-content">
            <el-input
              style="width: 300px"
              type="textarea"
              :max="500"
              :autosize="{ minRows: 2, maxRows: 3 }"
              placeholder="限制输入500个中文字符"
              v-model="commentForm.evaluate_comment"
            >
            </el-input>
          </div>
        </div>

        <div style="margin-bottom: 10px" v-if="commentForm.evaluate_type == 2">
          <!-- <div>
            <span class="zy-font">温馨提示：</span
            >可上传1-5张的图片，图片的像素大小请控制在3M以内
          </div> -->

          <div
            class="work-order-item"
            v-for="(item, key) in commentForm.evaluate_pic"
            :key="key"
          >
            <div class="work-order-label">上传图片{{ key + 1 }}:</div>
            <div class="work-order-content">
              <div class="upload-container">
                <div class="upload-image" v-if="commentForm.evaluate_pic[key]">
                  <div
                    class="upload-top-content"
                    @click="clearCommentPics(index)"
                  >
                    <i class="upload-icon"></i>
                  </div>
                  <img :src="commentForm.evaluate_pic[key]" />
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
        </div>

        <div class="work-order-item">
          <div class="work-order-label">身份验证:</div>
          <div class="work-order-content">
            <el-input
              style="width: 300px"
              type="password"
              placeholder="请输入支付密码"
              v-model="commentForm.pay_password"
            >
            </el-input>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="expressVerify" round type="primary"
          >确认付款</el-button
        >
        <el-button @click="closeExpressModal" round type="warning"
          >返回</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showCommentPicModal" :title="'设置评价图片'">
      <div>
        <div class="upload-container">
          <div
            class="upload-image"
            v-for="(item, key) in expressForm.express_pic"
            :key="key"
          >
            <div class="upload-top-content" @click="deleteExpressPic(key)">
              <i class="upload-icon"></i>
            </div>
            <img :src="item" />
          </div>
          <div class="upload-content" @click="uploadImageMainUrl">
            <i class="el-icon-plus upload-content-icon"></i>
          </div>
        </div>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="confirmCommentPic" round type="warning"
          >确认</el-button
        >
      </span> -->
    </el-dialog>

    <el-dialog :visible.sync="showSearchPicModal" :title="'查看评价截图'">
      <div>
        <div class="upload-container">
          <div class="upload-image">
            <a :href="searchPic" target="_blank">
              <img :src="searchPic" />
            </a>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSearchPicModal" round type="warning"
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showGroupCheckModal"
      :title="'一键审核'"
      @close="groupCheckModalClose"
    >
      <div class="work-order-container">
        <el-carousel indicator-position="none" :autoplay="false">
          <el-carousel-item
            v-for="(item, key) in showCheckgroupInfo"
            :key="key"
          >
            <div class="word-order-header">核对信息</div>
            <div class="work-order-item">
              <div class="work-order-label">订单编号：</div>
              <div class="work-order-content">
                {{ item.order_no || "--" }}
              </div>
            </div>

            <div class="work-order-item">
              <div class="work-order-label">评价类型：</div>
              <div class="work-order-content">
                {{ getCommentListById(showVerifyDetailInfo.evaluate_type) }}
              </div>
            </div>

            <div class="work-order-item">
              <div class="work-order-label">店铺名称：</div>
              <div class="work-order-content">
                {{ item.shop_name || "--" }}
              </div>
            </div>

            <div class="work-order-item">
              <div class="work-order-label">商品名称：</div>
              <div class="work-order-content">
                {{ item.goods_name || "--" }}
              </div>
            </div>

            <div class="work-order-item">
              <div class="work-order-label">商家设置的好评内容：</div>
              <div class="work-order-content">
                <el-input
                  type="textarea"
                  placeholder=""
                  v-model="item.evaluate_comment"
                  disabled
                />
              </div>
            </div>

            <div class="work-order-item">
              <div class="work-order-label">买手上传的评价截图：</div>
              <div class="work-order-content">
                <img
                  :src="item.evaluate_buyer"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </div>
            </div>

            <div class="word-order-header">如审核不通过请填写下列信息</div>
            <div class="work-order-item">
              <div class="work-order-label">不通过原因：</div>
              <div class="work-order-content">
                <el-input
                  type="textarea"
                  placeholder="若要进行审核不通过操作，请先输入不通过原因，此时【审核不通过】按钮才会被激活"
                  v-model="verifyGroupForm[key].evaluate_desc"
                />
              </div>
            </div>

            <div
              style="text-align: center"
              v-if="!verifyGroupForm[key].is_check"
            >
              <el-button @click="verifyOrderGroups(key)" round type="primary"
                >审核通过</el-button
              >
              <el-button @click="notVerifyOrderGroups(key)" round type="success"
                >审核不通过</el-button
              >
            </div>

            <div style="text-align: center" v-else>
              <el-button round type="primary" disabled>已审核</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>

    <v-header
      :list="['评价管理']"
      :currentIndex="currentIndex"
      :handleSwitchTab="handleSwitchTab"
    />

    <div class="zy-font tx-tip">
      现在需要商家打款本金+部分佣金到买手卡里，其余佣金平台来做打款，（详情看收费标准）
    </div>

    <div class="mission-form">
      <el-form :inline="true">
        <el-form-item>
          <el-select
            v-model="searchMainForm.is_evaluate"
            placeholder="任务分类"
          >
            <el-option
              v-for="item in commentTypes"
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
          <el-button type="success" @click="openGroupCheckModal" round
            >一键审核</el-button
          >
          <!--<el-button type="warning" round>导出</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <div class="mission-table">
      <el-table
        :data="missionData"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <!-- v-if="searchMainForm.is_evaluate == 2 || searchMainForm.is_evaluate == 5" -->
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="account" label="任务分类" width="100px">
          <template slot-scope="scope">
            <div>{{ getPlatFormByType(scope.row.type) }}</div>
            <div class="zy-font">销量任务</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="商品图片" width="150px">
          <template slot-scope="scope">
            <div class="mission-pic">
              <img :src="scope.row.main_url" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务/订单编号" width="200px">
          <template slot-scope="scope">
            <div class="zy-font">普通销量任务</div>
            <div>
              任务编号:{{ scope.row.task_no }}
              <!-- <span class="zy-font">({{getflowTypes(scope.row.id)}})</span> -->
              <!-- <span class="zy-font">(APP自然搜索)</span> -->
            </div>
            <div>订单编号:{{ scope.row.order_no }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="评价内容" width="180px">
          <template slot-scope="scope">
            <div>{{ scope.row.evaluate_comment || "暂未设置评价内容" }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="追评内容" width="180px">
          <template slot-scope="scope">
            <div>{{ scope.row.evaluate_comment_go || "暂未设置追评内容" }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="买号/商品信息" width="200px">
          <template slot-scope="scope">
            <div class="mission-buyer">
              <div class="zy-font">
                买号: {{ scope.row.buyer_name || "" }}
                <span class="mission-mirror" v-if="scope.row.mirror == 1"
                  >照妖镜通过</span
                >
              </div>
              <!-- <div>
                <span class="mission-mirror yz-font">商家未验证</span>
                <el-button type="primary" size="mini" round>我已验过</el-button>
              </div> -->
              <!-- <div>关键字：{{ scope.row.description || "" }}</div> -->
              <div>店铺名称：{{ scope.row.shop_name || "--" }}</div>
              <div>
                商品名称：<span class="zy-font">{{
                  scope.row.goods_name || "--"
                }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="任务状态" width="160px">
          <template slot-scope="scope">
            <div>
              <el-link
                type="primary"
                @click="openDailyModal(scope.row.order_id)"
              >
                {{ checkStatus(scope.row.is_evaluate) }}</el-link
              >
            </div>
            <div v-if="scope.row.evaluate_time">
              支付时间：{{ easyDateFormate(scope.row.evaluate_time) }}
            </div>
            <div v-if="scope.row.evaluate_commit_time">
              提交时间：{{ easyDateFormate(scope.row.evaluate_time) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="操作按钮">
          <template slot-scope="scope">
            <div class="btn-operation">
              <div>
                <el-button
                  v-if="scope.row.is_evaluate == 0"
                  type="primary"
                  round
                  size="mini"
                  @click="
                    openExpressModal(
                      scope.row.order_id,
                      scope.row.evaluate_comment,
                      scope.row.evaluate_pic,
                      scope.row
                    )
                  "
                  >设置评价内容</el-button
                >
              </div>

              <div>
                <el-button
                  v-if="scope.row.is_evaluate == 7"
                  type="primary"
                  round
                  size="mini"
                  @click="
                    openExpressModal(
                      scope.row.order_id,
                      scope.row.evaluate_comment,
                      scope.row.evaluate_pic,
                      scope.row
                    )
                  "
                  >设置追评内容</el-button
                >
              </div>
              <div>
                <el-button
                  v-if="scope.row.is_evaluate == 2"
                  type="warning"
                  size="mini"
                  round
                  @click="openCheckMissionModal(scope.row)"
                  >审核任务</el-button
                >
              </div>
              <div>
                <el-button
                  v-if="scope.row.is_evaluate == 5"
                  type="warning"
                  size="mini"
                  round
                  @click="openCheckMissionModal(scope.row)"
                  >审核追评任务</el-button
                >
              </div>
              <div v-if="scope.row.is_evaluate == 0">
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="ignoreComment(scope.row.order_id)"
                  >忽略设置</el-button
                >
              </div>
              <div
                v-if="scope.row.is_evaluate == 1 || scope.row.is_evaluate == 4"
              >
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="
                    cancelComment(scope.row.order_id, scope.row.is_evaluate)
                  "
                  >取消任务</el-button
                >
              </div>
              <div v-if="scope.row.is_evaluate == 7">
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="openSearchPicModal(scope.row.evaluate_buyer)"
                  >查看评价截图</el-button
                >
              </div>
              <div
                v-if="scope.row.is_evaluate == 8 || scope.row.is_evaluate == 3"
              >
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="openSearchPicModal(scope.row.evaluate_buyer_go)"
                  >查看追评截图</el-button
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
  expressOrder,
  getDailyNote,
  getCommentDailyNote,
  getMissionMangerList,
  getCommentList,
  setCommentAlive,
  setCommentContent,
  checkCommentMission,
  verifyCommentMission,
  setCommentContentGo,
  verifyCommentMissionGo,
  ignoreComment,
  cancelComment,
} from "@/service/order";
import {
  completeImgUrl,
  getCommentListById,
  getFlowTypes,
  getMissionStatus,
  getPlatFormByType,
} from "@/lib/helper";
import { confirmMessageOne, openSuccessMsg, openWarnMsg } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import { upLoadImage } from "@/service/uploadImg";
import { dateFormate } from "@/lib/time";

type ISelect = {
  label: string;
  value: string;
};

let fileOpener = new OpenFile({
  multiple: false,
});

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
  showExpressEditModal: boolean = false;
  showCommentPicModal: boolean = false;
  showSearchPicModal: boolean = false;
  showGroupCheckModal: boolean = false; // 展示一键审核的弹框

  remarks: string = "";
  detail_remarks =
    "卡天猫 天猫（商品主图一致 不一致的不要下单）郑重提示做过的不要在做 禁止复购  不要河北 北京的 》先货比3家每家2分钟，必须咨询完5句一问一答来回，没咨询5句的审核不通过，客服不在的不要连续发问，截图关键词进店，和浏览的足迹，足记一定至少包含有5张相关的商品图片，足记不够的审核不通过，后台监控店里深度浏览时间不够的，审核不通过，直接客服介入，申请退款！！！咨询问题参考问题1可以定做膜结构景观棚吗？2质保多久3骨架是什么材质的4按什么方式计价5需要预埋吗 6 100到200平";

  total: number = 0;

  searchForm: any = {};
  dailyInfo: any = [];

  searchMainForm: any = {
    is_evaluate: "-1",
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

  dailyInfos: any[] = [];

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

  commentTypes = [
    {
      label: "所有任务",
      value: "-1",
    },
    {
      label: "未设置评价",
      value: "0",
    },
    {
      label: "等待评价",
      value: "1",
    },
    {
      label: "商家待审核评价",
      value: "2",
    },
    {
      label: "管理员待审核评价",
      value: "3",
    },
    {
      label: "等待追评",
      value: "4",
    },
    {
      label: "商家待审核追评",
      value: "5",
    },
    {
      label: "管理员待审核追评",
      value: "6",
    },
    {
      label: "完成评价",
      value: "7",
    },
    {
      label: "完成追评",
      value: "8",
    },
    {
      label: "评价不通过",
      value: "9",
    },
    {
      label: "追评不通过",
      value: "10",
    },
    {
      label: "已取消评价",
      value: "11",
    },
    {
      label: "已取消追评",
      value: "12",
    },
    {
      label: "已忽略评价",
      value: "13",
    },
  ];

  idTypes: ISelect[] = [];

  missionData: any = [];

  expressForm: any = {
    id: 0,
    express_no: "",
    express_pic: [],

    type: "",
  };

  commentForm: any = {
    evaluate_type: 1,
    evaluate_comment: "",
    pay_password: "",
    evaluate_pic: ["", "", "", "", ""],
  };

  created() {
    this.getCommentListAction();
    for (let i = 0; i < 4; i++) {
      this.url_fileOpener.push(
        new OpenFile({
          multiple: false,
        })
      );
    }
  }

  multipleSelection: any = [];
  showCheckgroupInfo: any = [];
  verifyGroupForm: any = [];
  // 多选
  handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  clearSelection() {
    (this.$refs.multipleTable as any).clearSelection();
  }

  openGroupCheckModal() {
    // 打开审核弹框
    if (
      this.searchMainForm.is_evaluate == 2 ||
      this.searchMainForm.is_evaluate == 5
    ) {
      if (this.multipleSelection.length <= 0) {
        openWarnMsg("请至少选择一条数据~");
      } else {
        this.showCheckgroupInfo = this.multipleSelection;
        for (let i of this.showCheckgroupInfo) {
          this.verifyGroupForm.push({
            id: i.order_id,
            evaluate_desc: "",
            type: "",
            is_check: false,
          });
        }
        this.showGroupCheckModal = true;
      }
    } else {
      openWarnMsg("请设置查询分类为商家待审核评价或商家待审核追评");
    }
  }

  closeGroupCheckModal() {
    // 关闭审核弹框
    this.showGroupCheckModal = false;
  }

  clearCommentPics(index: number) {
    this.$set(this.commentForm.pics, index, "");
  }

  easyDateFormate(date: number) {
    return dateFormate(date * 1000, "yyyy-MM-dd hh:mm");
  }

  url_fileOpener: any = [];

  uploadImageBus(index: number) {
    console.log("正在上传...", index);
    this.url_fileOpener[index].getLocalImage((data: any) => {
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.$set(
            this.commentForm.evaluate_pic,
            index,
            completeImgUrl(res.data.src)
          );
        }
      });
    });
  }

  checkStatus(is_evaluate: any) {
    let o = "";
    this.commentTypes.forEach((item: any) => {
      if (item.value == is_evaluate) {
        o = item.label;
      }
    });

    return o;

    // if (is_evaluate == 5) return "已通过";
    // if (is_evaluate == 4) return "未通过";
    // if (is_evaluate == 3) return "待审核";
    // if (is_evaluate == 0) return "待设置";
    // if (is_evaluate == 1) return "已设置";
    // if (is_evaluate == 2) return "已取消";
    // return "";
  }

  getCommentListAction() {
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    getCommentList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.verify = JSON.parse(item.verify);
          item.evaluate_pic =
            item.evaluate_pic && item.evaluate_pic != "{}"
              ? JSON.parse(item.evaluate_pic)
              : [];
          item.evaluate_comment = item.evaluate_comment || "";
          return item;
        });
        console.log("tttt", t);
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

  // 展示审核的信息
  showVerifyDetailInfo: any = {};

  verifyForm: any = {
    id: "",
    evaluate_desc: "",
    type: "",
  };

  showCheckMissionModal: boolean = false;

  openCheckMissionModal(item: any) {
    this.showVerifyDetailInfo = item;
    if (item.is_evaluate == 2) {
    } else {
      this.showVerifyDetailInfo.evaluate_comment = item.evaluate_comment_go;
      this.showVerifyDetailInfo.evaluate_type = item.evaluate_type_go;
      this.showVerifyDetailInfo.evaluate_buyer = item.evaluate_buyer_go;
    }

    // this.showVerifyDetailInfo.evaluate_pic = item.evaluate_pic_go
    this.verifyForm.id = item.order_id;
    this.showCheckMissionModal = true;
  }

  closeCheckMissionModal() {
    this.verifyForm = {
      id: "",
      evaluate_desc: "",
      type: "",
    };
    this.showCheckMissionModal = false;
  }

  verifyOrderGroups(index: number) {
    const form = this.verifyGroupForm[index];
    form.type = 1;
    if (this.searchMainForm.is_evaluate == "5") {
      verifyCommentMissionGo(form).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          form.is_check = true;
        }
      });
    } else {
      verifyCommentMission(form).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          form.is_check = true;
        }
      });
    }
  }

  notVerifyOrderGroups(index: number) {
    const form = this.verifyGroupForm[index];
    form.type = 2;
    if (!form.evaluate_desc) {
      openWarnMsg("请输入不通过原因");
      return;
    }
    if (this.searchMainForm.is_evaluate == "5") {
      verifyCommentMissionGo(form).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          form.is_check = true;
        }
      });
    } else {
      verifyCommentMission(form).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          form.is_check = true;
        }
      });
    }
  }

  verifyOrder() {
    this.verifyForm.type = 1;
    if (this.showVerifyDetailInfo.is_evaluate == "5") {
      verifyCommentMissionGo(this.verifyForm).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          this.search();
          this.closeCheckMissionModal();
        }
      });
    } else {
      verifyCommentMission(this.verifyForm).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          this.search();
          this.closeCheckMissionModal();
        }
      });
    }
  }

  notVerifyOrder() {
    this.verifyForm.type = 2;
    if (!this.verifyForm.evaluate_desc) {
      openWarnMsg("请输入不通过原因");
      return;
    }
    if (this.showVerifyDetailInfo.is_evaluate == "5") {
      verifyCommentMissionGo(this.verifyForm).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          this.search();
          this.closeCheckMissionModal();
        }
      });
    } else {
      verifyCommentMission(this.verifyForm).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("审核完成");
          this.search();
          this.closeCheckMissionModal();
        }
      });
    }
  }

  checkYes(id: any) {
    checkCommentMission(id, 5).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("审核通过~");
        this.getCommentListAction();
      }
    });
  }

  checkNo(id: any) {
    checkCommentMission(id, 4).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("审核不通过~");
        this.getCommentListAction();
      }
    });
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
    this.searchForm = {
      ...this.searchMainForm,
      ...this.searchFormOther,
    };
    this.searchForm.page = 1;
    if (this.searchKey) {
      this.searchForm[this.searchKey] = this.searchValue;
    }
    getCommentList(this.searchForm).then((data: any) => {
      if (data && data.data && data.data.list) {
        const t = data.data.list.map((item: any) => {
          item.option = JSON.parse(item.option);
          item.publish_option = JSON.parse(item.publish_option);
          item.verify = JSON.parse(item.verify);
          return item;
        });
        this.missionData = t;
      }
    });
  }

  getCommentListById(id: any) {
    return getCommentListById(id);
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

  getDailyNote(order_id: any) {
    getCommentDailyNote(order_id).then((data) => {});
  }

  openDailyModal(order_id: any) {
    getCommentDailyNote(order_id).then((data: any) => {
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

  openImageOneModal(item: any) {
    if (
      item.status == 5 ||
      item.status == 7 ||
      item.status == 2 ||
      item.status == 3 ||
      item.status == 4
    ) {
      let img = item.verify.img_url_one;
      this.show_img_modal_one = true;
      this.previewImg = img;
    } else {
      openWarnMsg("任务状态是未完成状态");
    }
  }

  closeImageOneModal() {
    this.show_img_modal_one = false;
  }

  showTempDetailInfo: any = {};

  openExpressModal(id: any, express_no: string, evaluate_pic: any, item: any) {
    this.commentForm.id = id;
    this.showTempDetailInfo = item;
    this.showExpressEditModal = true;
  }

  closeExpressModal() {
    this.commentForm = {
      id: "",
      evaluate_type: 1,
      evaluate_comment: "",
      pay_password: "",
      evaluate_pic: ["", "", "", "", ""],
    };
    this.showExpressEditModal = false;
  }

  searchCommentPic() {}

  openCommentPicModal(id: any, express_no: any, express_pic: any[]) {
    if (!Array.isArray(express_pic)) {
      if (express_pic) express_pic = JSON.parse(express_pic);
      else express_pic = [];
    }
    this.expressForm.id = id;
    this.expressForm.express_no = express_no;
    this.expressForm.express_pic = express_pic;
    this.showCommentPicModal = true;
  }

  closeCommentPicModal() {
    this.showCommentPicModal = false;
  }

  searchPic: string = "";

  openSearchPicModal(picArr: string = "") {
    this.searchPic = picArr;
    this.showSearchPicModal = true;
  }

  closeSearchPicModal() {
    this.showSearchPicModal = false;
  }

  groupCheckModalClose() {
    this.search();
  }

  // confirmCommentPic() {
  //   setCommentContent(
  //     this.expressForm.id,
  //     this.expressForm.express_no,
  //     this.expressForm.express_pic
  //   ).then((data) => {
  //     if (data && data.origin_data && data.origin_data.code == 1001) {
  //       openSuccessMsg("填写成功");
  //       this.search();
  //     }
  //   });
  //   this.closeCommentPicModal();
  // }

  expressVerify() {
    console.log("commentForm", this.commentForm);
    if (!this.commentForm.evaluate_comment) {
      openWarnMsg("请设置评价内容");
      return;
    } else {
      if (
        this.commentForm.evaluate_type == 2 &&
        this.commentForm.evaluate_pic.every((item: any) => item == "")
      ) {
        openWarnMsg("晒图好评请上传图片");
        return;
      }

      if (!this.commentForm.pay_password) {
        openWarnMsg("请输入密码");
        return;
      }

      if (this.showTempDetailInfo.is_evaluate == 7) {
        setCommentContentGo(this.commentForm).then((data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("填写成功");
            this.search();
            this.closeExpressModal();
          }
        });
      } else {
        setCommentContent(this.commentForm).then((data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("填写成功");
            this.search();
            this.closeExpressModal();
          }
        });
      }
    }
  }

  ignoreComment(id: any) {
    confirmMessageOne(
      "忽略设置评价",
      "是否确认执行忽略设置评价操作？确认提交后将无法再对该任务设置评价，请谨慎选择。？"
    ).then((data) => {
      ignoreComment(id).then((data) => {
        if (data && data.origin_data && data.origin_data.code == 1001) {
          openSuccessMsg("设置成功");
          this.search();
        }
      });
    });
  }

  cancelComment(id: any, is_evaluate: any) {
    confirmMessageOne("取消任务", "是否确认执行取消任务评价操作？").then(
      (data) => {
        let set_is_evaluate = is_evaluate == 1 ? 11 : 12;
        cancelComment(id, set_is_evaluate).then((data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("设置成功");
            this.search();
          }
        });
      }
    );
  }

  deleteExpressPic(index: number) {
    this.expressForm.express_pic.splice(index, 1);
  }

  uploadImageMainUrl() {
    fileOpener.getLocalImage((data) => {
      // this.goodsForm.qr_url = data[0].base64Buffer;
      // this.createCanvans();
      upLoadImage(data[0].file, "zhutu").then((res) => {
        if (res && res.data && res.data.src) {
          this.expressForm.express_pic.push(completeImgUrl(res.data.src));
          console.log(
            "this.expressForm.express_pic",
            this.expressForm.express_pic
          );
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
.work-order-container {
  width: 500px;
  margin: 0 auto;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  text-align: left;

  .el-carousel__container {
    height: 550px;
  }

  .word-order-header {
    padding-bottom: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: #323232;
    border-bottom: 2px solid #ddd;
  }
  .work-order-item {
    @include flex(flex-start);
    // align-items: center;
    text-align: left;
    margin-bottom: 15px;
    .work-order-label {
      width: 100px;
    }
    .work-order-content {
      flex: 1;
      .el-radio {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
