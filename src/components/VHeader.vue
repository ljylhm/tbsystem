<template>
  <div class="header_container">
    <div class="header-item" v-for="(i,key) in showListItem" :key="key">{{i}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class VHeader extends Vue {
    @Prop() private list!: string[];// 感叹号表示必选
    @Prop() private defaultActiveIndex!: number; 

    private get showListItem():string[]{
        console.log("计算属性 进行到了这里...")
        return this.list
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

.header_container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  background: #eee;
  text-align: left;
  .header-item-active,
  .header-item {
    display: inline-block;
    text-align: center;
    padding: 0px 20px;
    color: #fff;
  }
  .header-item-active {
    background: #4782ef;
  }
  .header-item {
    border: 1px solid #000;
    background: #eeeeee;
  }
}
</style>
