<template>
  <div class="footer-container">
    <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2021002851号</a>
    <p>Copyright © 2020  权重高 All Rights Reserved</p> 
  </div>
</template>

<script lang="ts">
import { IUser } from "@/constance/user";
import { clearToken } from "@/lib/cache";
import { httpGet, httpPost } from "@/lib/http";
import { getUserInfo } from "@/service/user";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() private msg!: string; // 感叹号表示必选

  userInfo: IUser = {
    address: "",
    amount: "",
    created_at: "",
    id: 0,
    name: "",
    phone: "",
    qq: "",
    score: "",
    secret: "",
    status: 0,
    type: "",
    updated_at: "",
    wx: "",
    nick: "",
  };

  created() {
    getUserInfo().then((data) => {
      if (data && data.data) {
        this.userInfo = data.data;
      }
    });
  }

  logoutAction() {
    clearToken();
    const origin = location.origin;
    location.replace(origin + "/login");
  }
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

.footer-container {
  width: 100%;
  height: auto;
  padding: 40px 0px;
  text-align: center;
  font-size: 12px;
  color: #666666;
  & > a {
    font-size: 12px;
    color: #666666;
    &:hover{
      color: #409EFF;
    }
  }
}
</style>
