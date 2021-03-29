<template>
  <div id="login">
    <div class="mid-content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2021002851号</a>
      <p>Copyright © 2020  权重高 All Rights Reserved</p> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class Home extends Vue {}
</script>

<style lang="scss">
.mid-content {
  min-height: 800px;
}
.footer {
  width: 100%;
  text-align: center;
  padding: 40px 0px;
  font-size: 12px;
  position: relative;
    color: #000;
   & > a {
    font-size: 12px;
    color: #000;
    &:hover{
      color: #409EFF;
    }
  }
}
</style>