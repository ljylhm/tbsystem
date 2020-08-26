<template>
  <div class="personal-container">
    <div class="person-left">
      <Slide :current-index="'/shopManage'" />
    </div>
    <div class="person-right">
      <div class="shop-header">
        店铺：4个
        <el-button class="shop-edit_btn" type="primary" round size="mini"
          >主要按钮</el-button
        >
      </div>
      <div class="shop-table">
        <div class="shop-table_title">
          已绑定店铺信息<span class="zy-font"
            >（请根据实际情况标记店铺推广状态，可减少90%以上的淘宝客或农村淘宝佣金损失和纠纷）</span
          >
        </div>
        <div class="shop-table-content">
          <el-table>
            <el-table :data="blackListData">
              <el-table-column prop="account" label="淘宝买号" />

              <el-table-column prop="reason" label="提交原因" />

              <el-table-column prop="status" label="状态" />

              <el-table-column prop="creatime" label="提交时间" />
            </el-table>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src

@Component({
  components: {
    Slide,
  },
})
export default class BlackList extends Vue {
  blackListData = [
    {
      account: "测试账号",
      reason: "被降权次数",
      status: "冻结",
      creatime: "2020-08-26 16:25:53",
    },
  ];
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

.personal-container {
  width: 1200px;
  height: 400px;
  margin: 20px auto 0px;
  @include flex(flex-start);
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
      }
      .shop-table-content {
      }
    }
  }
}
</style>
