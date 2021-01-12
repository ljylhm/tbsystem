<template>
  <div class="invite-friends-container">
    <div class="person-left">
      <Slide :current-index="'/inviteFriends'" />
    </div>
    <div class="person-right">
      <div class="invite-text">如果觉得百手联盟靠谱的话，就赶紧跟朋友们分享吧~</div>
      <div class="invite-text">我的邀请码 <span class="zy-font" style="font-weight:600">{{userInfo.secret || "--"}}</span></div>
      <div class="invite-text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { IUser } from "@/constance/user";
import { Component, Vue } from "vue-property-decorator";
import { getUserInfo } from "@/service/user";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src

@Component({
  components: {
    Slide,
  },
})
export default class AddGoods extends Vue {

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

  created(){
    getUserInfo().then((data) => {
      if (data && data.data) {
        this.userInfo = data.data;
      }
    });
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

.space-margin-right-20 {
  margin-right: 20px;
}

.el-table td,
.el-table th {
  text-align: center;
}

.invite-friends-container {
  width: 1400px;
  height: 400px;
  text-align: left;
  margin: 20px auto 0px;
  @include flex(flex-start);
  flex-wrap: nowrap;

  .dialog-goods_detail {
    margin: 0 auto;
    color: #000;

    .goods-detail_item {
      padding-left: 120px;
      @include flex(flex-start);
      align-items: center;
      text-align: center;
      margin-bottom: 20px;
      .goods-detail_item_label {
        display: inline-block;
        width: 160px;
        text-align: right;
      }
    }
  }

  .dialog-target_user {
    padding-left: 80px;
    .target-detail_item {
      @include flex(flex-start);
      align-items: center;
      margin-bottom: 20px;
      .target-tip_warn {
        flex: 1;
      }
      .target-detail_label {
        width: 80px;
      }
      .target-detail-user {
        @include flex(flex-start);
        margin-bottom: 15px;
        // align-items: center;
      }
      .target-detail_label_small {
        width: 64px;
        font-size: 14px;
      }
    }
  }

  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
    .invite-text {
      margin-bottom: 15px;
      font-size: 14px;
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
