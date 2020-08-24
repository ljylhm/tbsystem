<template>
  <div class="tab-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#4882f0"
      text-color="#ffffff"
      @select="handleSelect"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Tab extends Vue {
  @Prop() private msg!: string; // 感叹号表示必选

  handleSelect(){

  }

  activeIndex(){

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

.tab-container {
    padding: 0px 200px;
    background-color: rgb(72, 130, 240);
    .el-menu-item{
        width: 160px;
        // background: #4882f0;
        // color: #fff;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        background: #3b6cca !important;
        color: #ffffff !important;
        border: none;
    }
    .el-submenu__title i{
        color: #fff !important;
    }
    // .el-menu--horizontal>.el-submenu .el-submenu__title{
    //     background: #4882f0 !important;
    //     color: #fff;
    // }
}
</style>
