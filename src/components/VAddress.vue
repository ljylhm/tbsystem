<template>
  <div class="address-container">
      
  </div>
</template>


<script lang="ts">
// 地址插件的选择
import { Component, Prop, Vue } from "vue-property-decorator";
import { addressData } from "@/config/address"

@Component
export default class Header extends Vue {
  @Prop() private msg!: string; // 感叹号表示必选
}
</script>

<style scoped lang="scss">
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

.address-container{
    
}
</style>



