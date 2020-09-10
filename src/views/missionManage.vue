<template>
  <div class="mission-container">
    <v-header 
      :list="['任务管理','待接手任务（0）','进行中任务（0）','待审核订单任务（0）','待审核买手任务（0）']"
      :currentIndex='currentIndex'
      :handleSwitchTab='handleSwitchTab'
    />

    <div class="zy-font tx-tip">现在需要商家打款本金+部分佣金到买手卡里，其余佣金平台来做打款，（详情看收费标准）</div>

    <div class="mission-form">
      <el-form 
        :inline="true"
      ></el-form>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VHeader from "@/components/VHeader.vue"; // @ is an alias to /src

@Component({
  components: {
    VHeader,
  },
})
export default class Publish extends Vue {

  currentIndex:number = 0

  created(){
    console.log("进入了created的生命周期")
  }

  handleSwitchTab(index:number){
    this.currentIndex = index
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
  width: 1200px;
  height: auto;
  border: 1px solid #ddd;
  margin: 20px auto 60px;
  padding: 20px;
  border: 1px solid #000;

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

  .tx-tip{
    text-align: left;
    margin: 10px 0px;
  }
}
</style>
