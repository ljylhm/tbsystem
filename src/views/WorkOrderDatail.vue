<template>
  <div class="work-container">
    <div class="work-header">
      <div class="work-title">工单详情</div>
      <el-button type="primary" round size="small" @click="toNextPage"
        >返回列表</el-button
      >
    </div>

    <div class="work-step">
      <el-steps :active="stepActive" finish-status="success" align-center>
        <el-step title="待处理"></el-step>
        <el-step title="跟进中"></el-step>
        <el-step title="处理完成"></el-step>
      </el-steps>
    </div>

    <div class="work-content-1">
      <table border="1" style="border-color: #ddd;">
        <tr>
          <td style="width:100px">任务编号：</td>
          <td style="width:200px">{{ workOrderDetailData.order_no }}</td>
          <td style="width:100px">订单编号：</td>
          <td style="width:200px">{{ workOrderDetailData.order_number }}</td>
          <td style="width:100px">工单状态：</td>
          <td style="width:200px">
            {{ handleStatus(workOrderDetailData.status) }}
          </td>
        </tr>
        <tr>
          <td style="width:100px">工单类型：</td>
          <td style="width:200px">
            {{ handleType(workOrderDetailData.type) }}
          </td>
          <td style="width:100px">问题分类：</td>
          <td style="width:200px">
            {{
              hanleQuesType(
                workOrderDetailData.type,
                workOrderDetailData.trouble_type
              )
            }}
          </td>
          <td style="width:100px">提交时间：</td>
          <td style="width:200px">{{ workOrderDetailData.created_at }}</td>
        </tr>
        <tr>
          <td style="width:100px">处理方式：</td>
          <td style="width:900px" colspan="5"></td>
        </tr>
        <tr>
          <td style="width:100px">处罚金额：</td>
          <td style="width:900px" colspan="5"></td>
        </tr>
        <tr>
          <td style="width:100px">处理结果：</td>
          <td style="width:900px" colspan="5"></td>
        </tr>
      </table>
    </div>

    <div class="work-content-2">
      <div class="work-content-2-header">沟通记录</div>
      <div
        class="work-content-2-comment"
        v-for="(item, key) in workCommentList"
        :key="key"
      >
        <div>{{ item.type == 1 ? "商家:" : "买手:" }}</div>
        <div class="work-content-2-comment-content">
          {{ item.comment }}
        </div>
        <div v-if="item.pic">
          <img style="width:100px;height:100px" :src="item.pic" alt="" />
        </div>
        <div>{{ item.created_at }}</div>
      </div>
    </div>

    <div class="work-content-2">
      <div class="work-content-2-header">我想说：</div>
      <div class="work-content-input">
        <el-input
          type="textarea"
          placeholder="请输入想说的话"
          v-model="commentForm.comment"
        >
        </el-input>
      </div>

      <div class="work-content-upload">
        <div class="upload-container space-margin-bottom-10">
          <div class="upload-image" v-if="commentForm.pic">
            <div class="upload-top-content" @click="deleteOnePic">
              <i class="upload-icon"></i>
            </div>
            <img :src="commentForm.pic" />
          </div>
          <div class="upload-content">
            <i
              class="el-icon-plus upload-content-icon"
              @click="uploadImageBus"
            ></i>
          </div>
        </div>
      </div>

      <div class="btn-area">
        <el-button type="primary" round @click="upCommentAction"
          >提交</el-button
        >
        <el-button type="primary" round @click="toNextPage">返回列表</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import { confirmMessageOne, openSuccessMsg, openAlertWarn } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import VAddress from "@/components/VAddress.vue";
import { routerHelper } from "@/router/index";
import { httpGet, httpPost } from "@/lib/http";
import { upLoadImage } from "@/service/uploadImg";
import { completeImgUrl } from "@/lib/helper";
import {
  getWorkOrderDetailInfo,
  workOrderComment,
  getWorkComment,
} from "@/service/workOrder";

const DEFAUL_EDITSHOPNAMEFORM = {
  origin_name: "",
  current_name: "",
  pay_pwd: "",
};

let fileOpener = new OpenFile({
  multiple: false,
});

@Component({
  components: {
    Slide,
    VAddress,
  },
})
export default class AddGoods extends Vue {
  stepActive: string = "1";

  text: string = "";

  fileOpener: any = new OpenFile({
    multiple: false,
  });

  form: any = {
    comment: "",
    pic_url: "",
  };

  id: any = "";

  workOrderDetailData: any = {};
  workCommentList: any = [];

  commentForm: any = {
    comment: "",
    pic: "",
    parent: 0,
    type: 1,
    work_id: "",
  };

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
    const para = routerHelper.getData() || {};
    this.id = para.id || "";

    if (this.id) {
      getWorkOrderDetailInfo(this.id).then((data) => {
        if (data) {
          this.workOrderDetailData = data.data;
          if (this.workOrderDetailData.status == 0) {
            this.stepActive = "1";
          }
          if (this.workOrderDetailData.status == 1) {
            this.stepActive = "2";
          }

          if (this.workOrderDetailData.status == 2) {
            this.stepActive = "3";
          }
        }
      });
      this.getCommentList();
    }
  }

  uploadImageBus() {
    this.fileOpener.getLocalImage((data: any) => {
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.commentForm.pic = completeImgUrl(res.data.src);
        }
      });
    });
  }

  deleteOnePic() {
    this.commentForm.pic = "";
  }

  handleStatus(status: any) {
    if (this.statusType[status] && this.statusType[status]["label"]) {
      return this.statusType[status]["label"];
    }
  }

  handleType(task_no: number) {
    if (
      this.workOrderDataList[task_no - 1] &&
      this.workOrderDataList[task_no - 1].label
    ) {
      return this.workOrderDataList[task_no - 1].label;
    }
    return "";
  }

  workQuestionData: any = [];

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

  getCommentList() {
    getWorkComment(this.id).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        this.workCommentList = data.data;
      }
    });
  }

  upCommentAction() {
    // comment:"",
    // pic:"",
    this.commentForm.work_id = this.id;
    if (!this.commentForm.comment && !this.commentForm.pic) {
      openAlertWarn("请至少上传一幅图或者一句话");
      return;
    }

    if (this.workCommentList.length > 0) {
      this.commentForm.parent = this.workCommentList[
        this.workCommentList.length - 1
      ].id;
    }

    workOrderComment(this.commentForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("提交成功");
        this.commentForm = {
          comment: "",
          pic: "",
          parent: 0,
          type: 1,
          work_id: "",
        };
        this.getCommentList();
      }
    });
  }

  toNextPage() {
    routerHelper.to("/customService");
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

.font-18 {
  font-size: 18px;
}

.font-14 {
  font-size: 14px;
}

.space-margin-right-20 {
  margin-right: 20px;
}

.upload-container {
  @include flex(flex-start);
  align-items: center;
  .upload-image {
    width: 80px;
    height: 80px;
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

.el-table td,
.el-table th {
  text-align: center;
}

.work-container {
  width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  text-align: left;
  .work-header {
    @include flex(flex-start);
    align-items: center;
  }
  .work-title {
    font-size: 20px;
    font-weight: 600;
    margin-right: 15px;
  }

  .work-step {
    margin: 30px 0px;
  }

  .work-content-1 {
    font-size: 14px;
    width: 1000px;
    margin: 0 auto;
    table {
      border: 1px solid #ddd;
    }
    & td {
      background: #f5f5f5;
      padding: 15px;
      text-align: center;
    }
  }

  .work-content-2 {
    font-size: 14px;
    width: 1000px;
    height: auto;
    margin: 20px auto 0px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    .work-content-2-header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0px 20px;
      border-bottom: 1px solid #ddd;
    }

    .work-content-2-comment {
      width: 100%;
      min-height: 60px;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      & > div {
        margin-bottom: 10px;
      }
    }

    .work-content-input {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 60px;
      background: #fff;
    }

    .work-content-upload {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: auto;
      background: #fff;
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

  

  .btn-area {
    margin: 0 auto;
    @include flex(center);
    align-items: center;
    width: 400px;
    height: 40px;
  }
}
</style>
