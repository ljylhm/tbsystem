<template>
  <div class="personal-container">
    <el-dialog
      width="500px"
      :title="'修改店铺名称'"
      :visible.sync="showEditShopNameModal"
      @close="closeEditShopModal"
    >
      <div>
        <div class="pwd-dialog_item">
          <div class="pwd-label">原店铺名称：</div>
          <el-input
            size="medium"
            class="pwd-dialog_input"
            disabled
            v-model="editShopNameForm.origin_name"
            placeholder="请输入新的支付密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-label">新店铺名称：</div>
          <el-input
            size="medium"
            class="pwd-dialog_input"
            v-model="editShopNameForm.current_name"
            placeholder="请输入确认新的支付密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-label">支付密码：</div>
          <el-input
            size="medium"
            class="pwd-dialog_input"
            v-model="editShopNameForm.pay_pwd"
            placeholder="请输入登录密码"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditShopModal">确定提交</el-button>
        <el-button type="primary" @click="closeEditShopModal = false"
          >返回修改</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showShopDetailModal"
      :title="'查看详情'"
      width="500px"
    >
      <div class="shop-detail">
        <div
          class="shop-detail_item"
          v-for="(value, key, index) in currentShopDetail"
          :key="index"
        >
          <div class="shop-detail_label">{{ mapShopDetailKey[key] }}:</div>
          <div class="shop-detail_image" v-if="key == 'shop_cover'">
            <img :src="value" />
          </div>
          <div class="shop-detail_name" v-else>{{ value }}</div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showShopDetailModal = false"
          >返回</el-button
        >
      </span>
    </el-dialog>

    <el-dialog>

    </el-dialog>

    <div class="person-left">
      <Slide :current-index="'/shopManage'" />
    </div>
    <div class="person-right">
      <div class="shop-header">
        店铺：4个
        <el-button class="shop-edit_btn" type="primary" round size="mini"
          >绑定店铺</el-button
        >
      </div>
      <div class="shop-table">
        <div class="shop-table_title">
          已绑定店铺信息<span class="zy-font"
            >（请根据实际情况标记店铺推广状态，可减少90%以上的淘宝客或农村淘宝佣金损失和纠纷）</span
          >
        </div>
        <div class="shop-table-content">
          <el-table :data="shopInfoData" class="">
            <el-table-column prop="shop_name" label="店铺名称">
              <template slot-scope="porps">
                <div>{{ porps.row.shop_name }}</div>
                <div>
                  <el-button
                    type="warning"
                    round
                    size="mini"
                    @click="openEditShopModal(porps.row.shop_name)"
                    >修改店铺名</el-button
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="platform" label="所属平台" />

            <el-table-column prop="status" label="状态" />

            <el-table-column prop="verify_warn" label="审核提示" />

            <el-table-column prop="userInfo.name" label="发货人姓名" />

            <el-table-column prop="userInfo.telphone" label="发货人电话" />

            <el-table-column prop="userInfo.send_address" label="发货人地址" />

            <el-table-column label="操作" width="200px">
              <template slot-scope="porps">
                <div class="shop-operation_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                    @click="deleteShopItem(props)"
                    >删除</el-button
                  >
                </div>
                <div class="shop-operation_btn">
                  <el-button type="primary" round size="mini"
                    @click="openShopDetailModal"
                    >查看详情</el-button
                  >
                </div>
                <div class="shop-operation_btn">
                  <el-button type="primary" round size="mini"
                    >编辑发货人信息</el-button
                  >
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

const DEFAUL_EDITSHOPNAMEFORM = {
  origin_name: "",
  current_name: "",
  pay_pwd: "",
};

@Component({
  components: {
    Slide,
  },
})
export default class BlackList extends Vue {
  showEditShopNameModal: boolean = false; // 是否展示修改店铺的弹框
  showShopDetailModal: boolean = false; // 是否展示店铺详情

  shopInfoData = [
    {
      shop_name: "百丽雅旗舰店",
      platform: "淘宝",
      status: 1,
      verify_warn: "",
      userInfo: {
        name: "李易峰",
        telphone: "13029912130",
        send_address: "湖北省武汉市曾都区光谷总部国际2栋909",
      },
    },
  ];

  currentShopDetail = {
    platform: "淘宝",
    shop_keeper: "Gucci旗舰店",
    shop_name: "Gucci旗舰店",
    shop_type: "个人",
    name: "李易峰",
    telphone: "13029912130",
    send_address: "湖北省武汉市曾都区光谷总部国际2栋909",
    shop_cover:
      "http://img.baishou123.cn//data/upload/shopinfo/2019-11-16/5dd0135d74d89.png",
  };

  mapShopDetailKey = {
    platform: "店铺类型",
    shop_keeper: "掌柜号",
    shop_name: "店铺名",
    shop_type: "店铺性质",
    name: "发货人",
    telphone: "发货人手机号码",
    send_address: "发货省市区",
    shop_cover: "店铺上传图片",
  };

  editShopNameForm = {
    origin_name: "",
    current_name: "",
    pay_pwd: "",
  };

  openEditShopModal(name: string) {
    this.showEditShopNameModal = true;
    this.editShopNameForm.origin_name = name;
  }

  closeEditShopModal() {
    this.showEditShopNameModal = false;
    this.editShopNameForm = DEFAUL_EDITSHOPNAMEFORM;
  }

  deleteShopItem() {
    confirmMessageOne("提示", "确定要删除当前店铺吗？").then((data) => {
      console.log("删除中");
    });
  }

  openShopDetailModal() {
    this.showShopDetailModal = true;
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

.el-table td,
.el-table th {
  text-align: center;
}

.personal-container {
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
    .shop-header {
      @include flex(flex-start);
      align-items: center;
      .shop-edit_btn {
        margin-left: 10px;
      }
    }

    .shop-table {
      margin-top: 15px;
      text-align: left;
      .shop-table_title {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .shop-table-content {
      }
    }
  }

  .shop-operation_btn {
    margin-bottom: 10px;
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
