<template>
  <div class="mission-container">
    <VHeader 
      :list="['任务管理','待接手任务（0）','进行中任务（0）','待审核订单任务（0）','待审核买手任务（0）']"
    />
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
export default class Publish extends Vue {}
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
}
</style>
