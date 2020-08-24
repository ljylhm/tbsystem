<template>
  <div class="forget-container">
      <div class="forget-header"></div>
      <div class="forget-content">
        <div class="forget-header">重置密码</div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

interface IProps {}

@Component({
  components: {
    HelloWorld,
  },
})
export default class Forget extends Vue<IProps> {
  
  data() {
    return {
      form:{
        name:""
      }
    };
  }

  beforeCreated() {
    console.log("进入了这里...");
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

@mixin setHeight($height){
  height: $height;
  line-height: $height;
}

.forget-container {
  .forget-header{
    width: 100%;
    height: 80px;
  }
  .forget-content{
    width: 860px;
    height: 100px;
    border: 1px solid #ddd;
    margin: 0 auto;
    .forget-header{
        @include setHeight(50px);
        font-weight: 600;
        font-size: 18px;
        color: #323232;
        box-sizing: border-box;
        padding: 0px 20px;
        border-bottom: 1px solid #ddd;
    }
  }
}
</style>
