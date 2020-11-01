<template>
  <div class="personal-container">

    <div class="person-left">
      <Slide :current-index="'/rules'" />
    </div>
    <div class="person-right">
      <div class="rules-page_container">
        <h2 class="rules-title">收费标准</h2>
        <div class="rules-list">
          <p>
            平台收费的任务分为五类，分别是：日常单、销量任务、活动单、评价任务以及流量任务。
          </p>
          <p>收费：指发布任务平台所收费用</p>
          <p>代转：指买手的部分佣金由商家银行卡代转(与本金一起)</p>
          <p>销量预约任务：在表格收费基础中+2元</p>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">普通销量任务</h3> 
            <table border class="rules-item_table">
                <thead></thead>
                 <tr>
                    <td :colspan="tableData[0].length + 1">《淘宝普通销量任务收费标准》</td>
                </tr>
                <tr>
                    <td>成交价格</td>
                    <td v-for="(item,index) in tableData[0]" :key="index">
                        {{item.left}} - {{item.right}}
                    </td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td v-for="(item,index) in tableData[0]" :key="index">
                        {{item.fee}}
                    </td>
                </tr>
                <tr>
                    <td>代转</td>
                    <td v-for="(item,index) in tableData[0]" :key="index">
                        {{item.replace}}
                    </td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td v-for="(item,index) in tableData[0]" :key="index">
                        {{ parseFloat(item.fee) + parseFloat(item.replace) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">京东普通销量任务</h3> 
            <table border class="rules-item_table">
                <thead></thead>
                 <tr>
                    <td :colspan="tableData[1].length + 1">《京东普通销量任务收费标准》</td>
                </tr>
                <tr>
                    <td>成交价格</td>
                    <td v-for="(item,index) in tableData[1]" :key="index">
                        {{item.left}} - {{item.right}}
                    </td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td v-for="(item,index) in tableData[1]" :key="index">
                        {{item.fee}}
                    </td>
                </tr>
                <tr>
                    <td>代转</td>
                    <td v-for="(item,index) in tableData[1]" :key="index">
                        {{item.replace}}
                    </td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td v-for="(item,index) in tableData[1]" :key="index">
                        {{ parseFloat(item.fee) + parseFloat(item.replace) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">拼多多普通销量任务</h3> 
            <table border class="rules-item_table">
                <thead></thead>
                 <tr>
                    <td :colspan="tableData[2].length + 1">《拼多多普通销量任务收费标准》</td>
                </tr>
                <tr>
                    <td>成交价格</td>
                    <td v-for="(item,index) in tableData[2]" :key="index">
                        {{item.left}} - {{item.right}}
                    </td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td v-for="(item,index) in tableData[2]" :key="index">
                        {{item.fee}}
                    </td>
                </tr>
                <tr>
                    <td>代转</td>
                    <td v-for="(item,index) in tableData[2]" :key="index">
                        {{item.replace}}
                    </td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td v-for="(item,index) in tableData[2]" :key="index">
                        {{ parseFloat(item.fee) + parseFloat(item.replace) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">指定推送任务</h3> 
            <table border class="rules-item_table">
                <thead></thead>
                 <tr>
                    <td :colspan="tableData[3].length + 1">《指定推送任务收费标准》</td>
                </tr>
                <tr>
                    <td>成交价格</td>
                    <td v-for="(item,index) in tableData[3]" :key="index">
                        {{item.left}} - {{item.right}}
                    </td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td v-for="(item,index) in tableData[3]" :key="index">
                        {{item.fee}}
                    </td>
                </tr>
                <tr>
                    <td>代转</td>
                    <td v-for="(item,index) in tableData[3]" :key="index">
                        {{item.replace}}
                    </td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td v-for="(item,index) in tableData[3]" :key="index">
                        {{ parseFloat(item.fee) + parseFloat(item.replace) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">复购任务</h3> 
            <table border class="rules-item_table">
                 <tr>
                    <td :colspan="tableData[4].length + 1">《复购任务任务收费标准》</td>
                </tr>
                <tr>
                    <td>成交价格</td>
                    <td v-for="(item,index) in tableData[4]" :key="index">
                        {{item.left}} - {{item.right}}
                    </td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td v-for="(item,index) in tableData[4]" :key="index">
                        {{item.fee}}
                    </td>
                </tr>
                <tr>
                    <td>代转</td>
                    <td v-for="(item,index) in tableData[4]" :key="index">
                        {{item.replace}}
                    </td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td v-for="(item,index) in tableData[4]" :key="index">
                        {{ parseFloat(item.fee) + parseFloat(item.replace) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">评价任务</h3> 
            <table border class="rules-item_table">
                 <tr>
                     <td colspan="5">评价任务收费标准</td>
                 </tr>
                 <tr>
                    <td>评价类型</td>
                    <td>文字好评</td>
                    <td>晒图好评</td>
                    <td>文字追评</td>
                    <td>晒图追评</td>
                </tr>
                <tr>
                    <td>收费</td>
                     <td>{{tableData[5][0].extra.wzhp}}</td>
                    <td>{{tableData[5][0].extra.sthp}}</td>
                    <td>{{tableData[5][0].extra.wzzp}}</td>
                    <td>{{tableData[5][0].extra.stzp}}</td>
                </tr>
            </table>
        </div>

        <div class="rules-item">
            <h3 class="rules-item_title">流量任务</h3> 
            <table border class="rules-item_table">
                <tr>
                     <td colspan="7">流量任务收费标准</td>
                 </tr>
                 <tr>
                    <td></td>
                    <td>基本费用</td>
                    <td colspan="5">增值费用</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>收藏商品</td>
                    <td>收藏店铺</td>
                    <td>加购物车</td>
                    <td>问大家提问</td>
                    <td>旺旺咨询</td>
                </tr>
                <tr>
                    <td>收费</td>
                    <td>1.0</td>
                    <td>{{tableData[6][0].extra.scsp}}</td>
                    <td>{{tableData[6][0].extra.scdp}}</td>
                    <td>{{tableData[6][0].extra.jgwc}}</td>
                    <td>{{tableData[6][0].extra.wdjtw}}</td>
                    <td>{{tableData[6][0].extra.wwzx}}</td>
                </tr>
            </table>
        </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import VAddress from "@/components/VAddress.vue"; // @ is an alias to /src
import { httpGet, httpPost } from "@/lib/http";
import { transformTimeStampToDays } from "@/lib/helper";
import { getUserInfo, editUserInfo } from "@/service/user";
import { getPriceRules,IPriceRulesItem } from "@/service/common";
import { IUser } from "@/constance/user";
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";

@Component({
  components: {
    Slide,
    VAddress,
  },
})
export default class Home extends Vue {

 tableData:IPriceRulesItem[][] = []

  created() {
    getPriceRules().then((data) => {
        if(data && data.data){
            data.data.forEach((item)=>{
               item.forEach(i=>{
                   i.extra = i.extra ? JSON.parse(i.extra) : ""
               })
            })
            this.tableData = data.data
        }
        
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

.personal-container {
  width: 1200px;
  height: 400px;
  margin: 20px auto 0px;
  @include flex(flex-start);
  text-align: left;

  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
  }

  .el-form-item {
    margin-bottom: 0px;
  }
}

.pwd-dialog_item {
  @include flex(flex-start);
  align-items: center;
  // margin-bottom: 22px;
  .pwd-dialog_input {
    width: 350px;
  }
  .pwd-dialog_item_label {
    width: 100px;
  }
}

.dialog-footer {
  text-align: center;
  margin: 0 auto;
}

.rules-page_container {
  .rules-title {
    text-align: center;
  }
  .rules-list{
      margin-top: 10px;
      p{
          font-size: 14px;
          margin-bottom: 10px;
      }
  }

  .rules-item{
      margin-bottom: 15px;
      .rules-item_title{
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
      }
      .rules-item_table{
          font-size: 14px;
          td{
              padding: 10px;
              text-align: center;
          }
      }
  }
}
</style>
