<template>
  <div class="personal-container">
    <el-dialog width="800px" :title="'调整单量'" :visible.sync="showEditModal">
      <div class="edit-modal-container">
        <div class="edit-modal-title">
          <div class="edit-modal-title_icon"></div>
          <div class="edit-modal-title_text">补单量调整规则：</div>
        </div>

        <div class="edit-modal-content">
          <p>
            1、只可在原单量基础上增加单量。如需减少单量，请在当前单量到期后重新选择。
          </p>
          <p>
            2、系统会根据所选单量统计距离到期时间应补交的费用，确认提交则立即扣费。
          </p>
        </div>

        <div class="edit-modal-form">
          <div class="edit-modal-form_item">
            店铺名称：{{ currentDetailData.name }}
          </div>

          <div class="edit-modal-form_item">
            当前单量：{{ currentDetailData.num }}单/天
          </div>

          <div class="edit-modal-form_item">到期时间：{{showDate}}</div>

          <div class="edit-modal-form_item">
            调整单量：
            <!-- edit-modal-form_tag_active -->
            <span
              class="edit-modal-form_tag"
              v-for="(i, index) in priceList"
              :key="index"
              :class="{
                'edit-modal-form_tag_active': selectNum == i,
                'edit-modal-form_tag_disable': currentDetailData.num >=  i,
              }"
              @click=" currentDetailData.num >= i ? ()=>{} : selectNumAction(i)"
              >{{ i }}单/天</span
            >

            <!-- <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 30}" >30单/天</span>
            <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 50}">50单/天</span>
            <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 100}">100单/天</span>
            <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 200}">200单/天</span>
            <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 500}">500单/天</span>
            <span class="edit-modal-form_tag" :class="{'edit-modal-form_tag_disable': currentDetailData.num > 2000}">2000单/天</span> -->
          </div>

          <div class="edit-modal-form_item">
            新单量收费标准：{{ mapToPrice[selectNum] }}元/月
          </div>

          <div class="edit-modal-form_item">应补交费用：{{ checkDiff }}元</div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUnit">确定</el-button>
        <el-button type="warning" @click="closeEditModal">关闭</el-button>
      </span>
    </el-dialog>

    <div class="person-left">
      <Slide :current-index="'/editUnit'" />
    </div>
    <div class="person-right">
      <div class="edit-unit_container">
        <div class="edit-unit_header">补单量调整说明：</div>
        <div class="edit-unit_introduce">
          <div>1、平台以店铺为单位对补单量进行收费。</div>
          <div>
            2、店铺补单量由卖家自助购买，有效期为30天。立即购买，立即扣费。
          </div>
          <div>3、调整单量原则：但凡购买成功，一律不进行退费操作。</div>
        </div>

        <div class="edit-unit-info">已绑定店铺信息</div>
      </div>

      <el-table :data="shopInfoData">
        <el-table-column prop="type" label="平台类型" align="center">
          <template slot-scope="props">
            {{ getPlatFormByType(props.row.type) }}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="店铺名称" align="center" />

        <el-table-column prop="num" label="补单量（单/天）" align="center" />

        <el-table-column prop="publish_time" label="到期时间" align="center">
          <template slot-scope="props">
            {{ props.row.publish_time ?  easyDateFmt(props.row.publish_time) : "--" }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="props">
            <el-button
              type="primary"
              plain
              size="small"
              @click="openEditModal(props.row)"
              >调整单量</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import { getUnitList, addUnitList } from "@/service/unit"; // @ is an alias to /src
import { IUnitList } from "@/constance/unit";
import { getPlatFormByType } from "@/lib/helper";
import { openSuccessMsg } from "@/lib/notice";
import { dateFormate } from "@/lib/time" 

@Component({
  components: {
    Slide,
  },
})
export default class EditUnit extends Vue {
  showEditModal: boolean = false;

  blackListData: IUnitList[] = [];

  shopInfoData: IUnitList[] = [];

  selectNum: number = 30;

  currentDetailData: IUnitList = {
    shop_id: 0,
    name: "",
    num: 30,
    publish_time: "",
    type: "1",
  };

  priceList = [30, 50, 100, 200, 500, 2000];

  mapToPrice: any = {
    30: 0,
    50: 20,
    100: 40,
    200: 80,
    500: 100,
    2000: 120,
  };

  created() {
    this.getUnitListAction()
  }

  // 格式化时间
  formatDate(date: string | number, fmt: string){
    return dateFormate(date,fmt)
  }

  // 简易格式化时间
  easyFormatDate(time: number){
    return this.formatDate(time,'yyyy-MM-dd')
  }

  // 处理到期时间
  get handleEndTime(){
    const selectNum = this.selectNum
    const time = Date.now()
    if(!selectNum || selectNum == 30) return "--"
    else {
      const one_month_time = 1000 * 60 * 60 * 24 * 30
      return this.easyFormatDate(Date.now() + one_month_time)
    }
  }

  getUnitListAction() {
    getUnitList().then((data) => {
      if (data && data.data) {
        this.shopInfoData = data.data;
      }
    });
  }

  get checkDiff() {
    const { num } = this.currentDetailData;
    if (num) {
      const t = this.mapToPrice[num];
      return this.mapToPrice[this.selectNum] - t;
    }
  }

  handleDateFormat(time:number,fmt:string){
    return dateFormate(time * 1000,fmt)
  }

  easyDateFmt(time:number){
    if(!time){
      return "--"
    }else{
      console.log('here>>')
      return this.handleDateFormat(time,"yyyy-MM-dd")
    }  
  }

  get showDate(){
    const diff = 1000 * 60 * 60 * 24 * 30 
    return this.easyDateFmt(Date.now() + diff)
  }

  openEditModal(data: IUnitList) {
    this.showEditModal = true;
    this.selectNum = data.num;
    this.currentDetailData = data;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  getPlatFormByType(type: string) {
    return getPlatFormByType(type);
  }

  selectNumAction(data: number) {
    this.selectNum = data;
  }

  addUnit() {
    if (this.selectNum) {
      addUnitList(this.selectNum,Math.floor((Date.now() + (1000 * 60 * 60 * 24 * 30)) / 1000),this.currentDetailData.shop_id).then((data) => {
        if (data && data.origin_data.code == 1001) {
          openSuccessMsg("调整单量成功");
          this.closeEditModal();
          this.getUnitListAction();
        }
      });
    }
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

.personal-container {
  width: 1200px;
  height: 400px;
  margin: 20px auto 0px;
  @include flex(flex-start);
  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
  }
}

.edit-unit_container {
  .edit-unit_header {
    @include flex(flex-start);
    border: 1px solid #ddd;
    background: url(http://img.baishou123.cn/public/shop/images/img/t_icon.png)
      no-repeat 10px center #fceacd;
    width: 200px;
    height: 35px;
    line-height: 35px;
    padding-left: 45px;
    font-size: 14px;
    font-weight: normal;
    color: #888;
  }
  .edit-unit_introduce {
    text-align: left;
    & > div {
      font-size: 14px;
      color: #000;
      margin: 12px 0px;
    }
  }
  .edit-unit-info {
    color: #888;
    font-weight: 600;
    text-align: left;
    margin: 10px 0px;
  }
}
.edit-modal-container {
  color: #000;
  .edit-modal-title {
    @include flex(flex-start);
    align-items: center;
    .edit-modal-title_icon {
      width: 20px;
      height: 20px;
      background: url(http://img.baishou123.cn/public/shop/images/img/lb_icon.png)
        no-repeat center center;
      background-size: 100% 100%;
    }
    .edit-modal-title_text {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .edit-modal-content {
    border-bottom: 1px dashed #ccc;
    margin: 6px 0px;
    text-align: left;
    p {
      margin-bottom: 8px;
    }
  }

  .edit-modal-form {
    box-sizing: border-box;
    text-align: left;
    padding-left: 60px;
    .edit-modal-form_item {
      margin: 14px 0px;
    }
    .edit-modal-form_tag {
      display: inline-block;
      margin-right: 10px;
      width: 80px;
      @include setHeight(26px);
      text-align: center;
      border: 1px solid #ddd;
      cursor: pointer;
      &:hover {
        border-color: #4882f0;
        color: #4882f0;
      }
    }
    .edit-modal-form_tag_disable {
      background: #f7f7f7;
      border: 1px solid #d9d9d9 !important;
      color: #d9d9d9 !important;
      z-index: 999;
      cursor: not-allowed !important;
    }

    .edit-modal-form_tag_active {
      background: #f7f7f7;
      border: 1px solid #d9d9d9;
      color: #d9d9d9;
      z-index: 999;
      border-color: #4882f0;
      color: #4882f0;
    }
  }
}
</style>
