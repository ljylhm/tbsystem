<template>
  <div class="forget-container">
    <div class="forget-header"></div>
    <div class="forget-content">
      <div class="forget-header">重置密码</div>
      <div class="forget-label">
        <div
          class="forget-label-item"
          :class="{ 'forget-label-item-select': status == 'edit' }"
        >
          重置登录密码
        </div>
        <!-- <div
          class="forget-label-item"
          :class="{ 'forget-label-item-select': status == 'reset' }"
        >
          重置登录密码
        </div> -->
      </div>
      <div v-if="status == 'edit'" class="forget-input">
        <!-- <div class="forget-input_item">
          <div class="forget-input_item_label">登录会员名：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="form.name"
              placeholder="请输入您的登录会员名"
            ></el-input>
          </div>
        </div> -->

        <div class="forget-input_item">
          <div class="forget-input_item_label">手机号码：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="form.phone"
              placeholder="请输入注册时绑定的手机号码~"
            ></el-input>
          </div>
        </div>

        <div class="forget-input_item">
          <div class="forget-input_item_label">验证码：</div>
          <div class="forget-input_item_content forget-input_item_short">
            <el-input
              v-model="form.verifyCode"
              placeholder="请输入验证码"
            ></el-input>
          </div>
          <div id="forget-verify"></div>
        </div>

        <div class="forget-input_item">
          <div class="forget-input_item_label">设置新的密码：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="form.fir_pass"
              type="password"
              placeholder="请输入您的密码"
            ></el-input>
          </div>
        </div>

        <div class="forget-input_item">
          <div class="forget-input_item_label">再次输入：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="form.sec_pass"
              type="password"
              placeholder="请输入您的密码"
            ></el-input>
          </div>
        </div>

        <div class="forget-input_item">
          <div class="forget-input_item_label">手机验证码：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="form.code"
              placeholder="请输入6位验证码"
            ></el-input>
          </div>
          <div class="verify-btn" @click="getCode">{{ send_msg }}</div>
        </div>

        <div class="next-btn" @click="toReset">
          <el-button type="primary" round>下一步</el-button>
        </div>
      </div>

      <div v-if="status == 'reset'" class="forget-input">
        <div class="forget-input_item">
          <div class="forget-input_item_label">设置新的密码：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="resetForm.password"
              placeholder="请输入您的登录会员名"
            ></el-input>
          </div>
        </div>

        <div class="forget-input_item">
          <div class="forget-input_item_label">再次输入：</div>
          <div class="forget-input_item_content forget-input_item_long">
            <el-input
              v-model="resetForm.passwordAgain"
              placeholder="请输入您的登录会员名"
            ></el-input>
          </div>
        </div>

        <div class="next-btn" @click="toReset">
          <el-button type="primary" round>确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import GVerify from "@/lib/verify"; // @ is an alias to /src
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";
import { resetPassword, sendMessageV2 } from "@/service/login";
import { routerHelper } from "../router/index";
import { clearToken } from "@/lib/cache";

interface IProps {}

const phone_rule = /^1[3456789]\d{9}$/;

@Component({
  components: {
    HelloWorld,
  },
})
export default class Forget extends Vue<IProps> {
  status = "edit";

  form = {
    name: "",
    phone: "",
    code: "",
    fir_pass: "",
    sec_pass: "",
    verifyCode: "",
  };

  resetForm = {
    fir_pass: "",
    sec_pass: "",
  };

  gVerify: any = "";

  sendStatus: any = 0; // 0未发送 1 发送中
  send_msg: string = "获取验证码";

  beforeCreated() {
    console.log("进入了这里...");
  }

  mounted() {
    this.gVerify = new GVerify("forget-verify");
  }

  getCode() {
    if (this.sendStatus == 1) return;

    if (!this.form.phone) {
      openWarnMsg("请输入手机号");
      return;
    }

    if (!phone_rule.test(this.form.phone)) {
      openWarnMsg("请输入正确的手机号");
      return;
    }

    sendMessageV2(this.form.phone).then((data) => {
      if (data && data.origin_data.code == 1001) {
        openSuccessMsg("发送成功，请注意查收");
        this.sendStatus = 1;
        let count = 60;
        const timer = setInterval(() => {
          this.send_msg = `还有${--count}秒`;
          if (count == 0) {
            clearInterval(timer);
            this.send_msg = "获取验证码";
            this.sendStatus = 0;
          }
        }, 1000);
      }
    });
  }

  toReset() {
    if (!this.form.phone) {
      openWarnMsg("请输入手机号");
      return;
    }

    if (!this.form.verifyCode) {
      openWarnMsg("请输入图形验证码");
      return;
    }

    if (!this.gVerify.validate(this.form.verifyCode)) {
      this.gVerify.refresh();
      openWarnMsg("图形验证码输入不一致，请重新输入");
      return;
    }

    if (!this.form.fir_pass) {
      openWarnMsg("请输入新密码");
      return;
    }

    if (!this.form.sec_pass) {
      openWarnMsg("请第二次输入新密码");
      return;
    }

    if (!this.form.code) {
      openWarnMsg("请输入验证码");
      return;
    }

    resetPassword(this.form).then((data) => {
      if (data && data.origin_data) {
        if (data.origin_data.code == 1001) {
          openSuccessMsg(
            "重置密码成功,请重新登录",
            () => {
              clearToken();
              routerHelper.to("/");
            },
            2000
          );
        }
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

.forget-container {
  .forget-header {
    width: 100%;
    height: 80px;
  }
  .forget-content {
    width: 960px;
    height: auto;
    border: 1px solid #ddd;
    margin: 0 auto;
    .forget-header {
      @include setHeight(50px);
      font-weight: 600;
      font-size: 18px;
      color: #323232;
      box-sizing: border-box;
      padding: 0px 20px;
      border-bottom: 1px solid #ddd;
    }
    .forget-label {
      width: 880px;
      margin: 20px auto;
      font-size: 14px;
      @include flex(flex-start);
      .forget-label-item {
        text-align: center;
        @include setHeight(40px);
        background: #eee;
        color: #323232;
        flex: 1;
      }
      .forget-label-item-select {
        background: #ff9900;
        color: #ffffff;
      }
    }
    .forget-input {
      padding: 20px 0px 20px 160px;
      .forget-input_item {
        margin: 0 auto 30px;
        font-size: 14px;
        display: inline-block;
        @include flex(flex-start);

        .verify-btn {
          color: #fff;
          background: #409eff;
          padding: 0px 10px;
          border-radius: 2px;
          margin-left: 20px;
          @include setHeight(36px);
          cursor: pointer;
        }

        .forget-input_item_label {
          width: 200px;
          text-align: right;
          @include setHeight(36px);
        }

        .forget-input_item_short {
          width: 200px;
        }

        .forget-input_item_long {
          width: 300px;
        }

        .forget-input_item_content {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
        }

        #forget-verify {
          margin-left: 20px;
        }
      }
      .next-btn {
        margin-left: 200px;
        .el-button--primary {
          width: 280px;
        }
      }
    }
  }
}
</style>
