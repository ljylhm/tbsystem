<template>
  <div class="goods-manage-container">
    <div class="person-left">
      <Slide :current-index="'/goodsManage'" />
    </div>
    <div class="person-right">
      <div class="goods-header">
        添加店铺步骤:
        <div class="goods-header-pic"></div>
      </div>

      <div class="goods-search-form">
        掌柜号:
        <div class="goods-search-form_item">
          <el-input v-model="searchForm.shop_id"></el-input>
        </div>
        <div class="goods-search-form_item">
          <el-input v-model="searchForm.alias" placeholder="简称/名称"></el-input>
        </div>
        <div class="goods-search-form_item">
          <el-input v-model="searchForm.tb_id" placeholder="淘宝ID"></el-input>
        </div>
        <div class="goods-search-form_item">
          <el-button type="primary">查询</el-button>
        </div>
        <div class="goods-search-form_item">
          <el-button type="primary">新增</el-button>
        </div>
      </div>

      <div class="goods-table">
        <div class="goods-table-content">
          <el-table :data="goodsInfoData">
            <el-table-column prop="alias" label="商品简称" align="center" />

            <el-table-column prop="main_pic" label="商品主图" align="center">
              <template slot-scope="porps">
                <img class="goods-main-pic" :src="porps.row.main_pic" />
              </template>
            </el-table-column>

            <el-table-column prop="goods_name" label="商品名称" align="center" />

            <el-table-column prop="status" label="状态" align="center" />

            <el-table-column label="操作" align="center">
              <template slot-scope="porps">

                 <div class="goods-table_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                  >编辑</el-button>
                </div>

                <div class="goods-table_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                  >查看详情</el-button>
                </div>

                <div class="goods-table_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                  >购买行为</el-button>
                </div>

               
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import { confirmMessageOne } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import VAddress from "@/components/VAddress.vue";

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
export default class AddGoods extends Vue {
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
  };
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

.goods-manage-container {
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
    .goods-header {
      @include flex(flex-start);
      align-items: center;
      .goods-header-pic {
        width: 800px;
        height: 84px;
        background: url(http://img.baishou123.cn/public/shop/images/img/buzou.jpg)
          no-repeat 20px center;
      }
    }

    .goods-search-form {
      @include flex(flex-start);
      align-items: center;
      .goods-search-form_item {
        margin-left: 10px;
      }
    }

    .goods-table {
      margin-top: 15px;
      .goods-table-content {
        .goods-main-pic {
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }

        .goods-table_btn{
            margin-bottom: 10px;
        }
      }

      .gooods-table_title {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }

  .shop-operation_btn {
    margin-bottom: 10px;
  }

  .row-item-form {
  }

  .shop-detail {
    color: #000;
    .shop-detail_item {
      width: 100%;
      padding: 12px 0px;
      @include flex(flex-start);
      .shop-detail_label {
        width: 150px;
        text-align: right;
      }
      .shop-detail_name {
        flex: 1;
        padding-left: 10px;
      }
      .shop-detail_image {
        width: 80px;
        height: 80px;
        padding-left: 10px;
        cursor: pointer;
        & img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
