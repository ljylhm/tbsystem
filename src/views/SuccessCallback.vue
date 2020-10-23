<template>
  <div class="home">
    <div class="success-callback_container">请勿跳转，正在授权中...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src
import { routerHelper } from "@/router";

@Component({
  components: {
    HelloWorld,
    Header,
  },
})
export default class SuccessCallBack extends Vue {
  created() {
    console.log("获取连接里面的参数", this.getUrlParam("code"   ));
  }

  getSearchParam(url: string = "") {
    if (arguments.length == 0) url = window.location.href;

    let _splitArr_ = url.split("?")[1];
    if (_splitArr_) {
      let index = _splitArr_.indexOf("#"), // 判断有没有#号
        _splitArr_sub_ =
          index !== -1
            ? _splitArr_.substring(0, index).split("&")
            : _splitArr_.split("&");

      return _splitArr_sub_;
    } else return null;
  }

  getUrlParam(url: string = "", search: string="") {
    let parse = (url: string, search: string) => {
      let para = this.getSearchParam(url);
      if (para) {
        for (let i of para) {
          let searchInfo = i.split("=");
          if (search === searchInfo[0]) return searchInfo[1];
        }
        return null;
      } else return null;
    };

    if (arguments.length === 1) return parse(window.location.href, url);
    else return parse(url, search);
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

.home {
  .success-callback_container {
    margin: 20px 0px;
    font-weight: 600;
  }
}
</style>
