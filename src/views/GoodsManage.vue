<template>
  <div class="add-goods-manage-container">
    <div class="person-left">
      <Slide :current-index="'/goodsManage'" />
    </div>
    <div class="person-right">
      <div class="add-goods-header">
        添加商品
      </div>

      <div class="add-goods-h2">商品基本信息</div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import { confirmMessageOne } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import VAddress from "@/components/VAddress.vue";
import { routerHelper } from '@/login/router';

const DEFAUL_EDITSHOPNAMEFORM = {
  origin_name: "",
  current_name: "",
  pay_pwd: "",
};

let fileOpener = new OpenFile({
  multiple: false,
});

@Component({
  components: {
    Slide,
    VAddress,
  },
})
export default class BlackList extends Vue {
  showEditShopNameModal: boolean = false; // 是否展示修改店铺的弹框
  showShopDetailModal: boolean = false; // 是否展示店铺详情
  showBindShopModal: boolean = false; // 是否展示绑定店铺弹框

  goodsInfoData = [
    {
      alias: "8.17百丽雅上新",
      main_pic:
        "http://img.baishou123.cn/data/upload/hebingimg_new/2020-08-17/1597658299155870tbpic.png",
      goods_name: "膜结构车棚充电桩汽车停车棚张拉膜遮",
      status: "正常",
    },
  ];

  searchForm = {
    shop_id: "",
    alias: "",
    tb_id: "",
  }

  toCreateGoods(){
      routerHelper.to("/addGoods")
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

.font-18 {
  font-size: 18px;
}

.font-14 {
  font-size: 14px;
}

.upload-container {
  @include flex(flex-start);
  align-items: center;
  .upload-image {
    width: 80px;
    height: 80px;
    & img {
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
  }
  .upload-content {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    margin-right: 10px;
    .upload-content-icon {
      font-size: 20px;
      color: #8c939d;
      width: 80px;
      @include setHeight(80px);
      text-align: center;
      cursor: pointer;
    }
    &:hover {
      border-color: #409eff;
    }
  }
}

.el-table td,
.el-table th {
  text-align: center;
}

.add-goods-manage-container {
  width: 1400px;
  height: 400px;
  text-align: left;
  margin: 20px auto 0px;
  @include flex(flex-start);
  flex-wrap: nowrap;
  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
    font-size: 14px;
    .add-goods-header {
      font-weight: 600;
    }

    .add-goods-h2 {
      @include setHeight(40px);
      font-weight: 600;
      color: #888888;
    }
  }
}
</style>
