<template>
  <div class="personal-container">
    <el-dialog
      title="登录密码修改"
      width="500px"
      :visible="showPwdModal"
      @close="closePayPwdModal"
    >
      <div>
        <div class="pwd-dialog_item">
          设置密码：<el-input
            size="medium"
            type="password"
            class="pwd-dialog_input"
            v-model="resetPwdForm.password"
            placeholder="请输入新的登录密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          确认密码：<el-input
            size="medium"
             type="password"
            class="pwd-dialog_input"
            v-model="resetPwdForm.repeate_pwd"
            placeholder="请再次输入登录密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          支付密码：<el-input
            size="medium"
             type="password"
            class="pwd-dialog_input"
            v-model="resetPwdForm.pay_password"
            placeholder="请输入登录密码"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editLoginPwd">确认提交</el-button>
        <el-button type="primary" @click="closePayPwdModal"
          >返回修改</el-button
        >
      </span>
    </el-dialog>

     <el-dialog
      title="支付密码修改"
      width="500px"
      :visible="showPayPwdModal"
      @close="closeEditPayPwdModal"
    >
      <div>
        <div class="pwd-dialog_item">
          设置密码：<el-input
            size="medium"
            type="password"
            class="pwd-dialog_input"
            v-model="payPwdForm.pay_password"
            placeholder="请输入新的登录密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          确认密码：<el-input
            size="medium"
             type="password"
            class="pwd-dialog_input"
            v-model="payPwdForm.repeate_pwd"
            placeholder="请再次输入登录密码"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          支付密码：<el-input
            size="medium"
             type="password"
            class="pwd-dialog_input"
            v-model="payPwdForm.password"
            placeholder="请输入登录密码"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editPayLoginPwd">确认提交</el-button>
        <el-button type="primary" @click="closeEditPayPwdModal"
          >返回修改</el-button
        >
      </span>
    </el-dialog>


    <el-dialog
      title="QQ修改"
      width="500px"
      :visible="showQQModal"
      @close="closeQQPwdModal"
    >
      <div>
        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">原有联系QQ：</div>
          <el-input
            size="medium"
            disabled
            class="pwd-dialog_input"
            v-model="qqForm.origin_qq"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">改后联系QQ：</div>
          <el-input
            size="medium"
            class="pwd-dialog_input"
            v-model="qqForm.qq"
            placeholder="请输入确认新的QQ"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">身份验证：</div>
          <el-input
            size="medium"
            type="password"
            class="pwd-dialog_input"
            v-model="qqForm.pay_password"
            placeholder="请输入支付密码"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editQQ">确认提交</el-button>
        <el-button type="primary" @click="closeQQPwdModal">返回修改</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="QQ修改"
      width="500px"
      :visible="showWxModal"
      @close="closeWxPwdModal"
    >
      <div>
        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">原有联系微信：</div>
          <el-input
            size="medium"
            disabled
            class="pwd-dialog_input"
            v-model="wxForm.origin_wx"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">改后联系微信：</div>
          <el-input
            size="medium"
            class="pwd-dialog_input"
            v-model="wxForm.wx"
            placeholder="请输入确认新的微信"
          ></el-input>
        </div>

        <div class="pwd-dialog_item">
          <div class="pwd-dialog_item_label">身份验证：</div>
          <el-input
            size="medium"
            type="password"
            class="pwd-dialog_input"
            v-model="wxForm.pay_password"
            placeholder="请输入支付密码"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editWx">确认提交</el-button>
        <el-button type="primary" @click="closeWxPwdModal">返回修改</el-button>
      </span>
    </el-dialog>

    <div class="person-left">
      <Slide :current-index="'/personal'" />
    </div>
    <div class="person-right">
      <div class="person-page-container">
        <div class="person-page-left">
          <div class="person-item">会员名：{{ userInfo.name }}</div>
          <div class="person-item">总资产：{{ userInfo.amount || 0 }}</div>

          <div class="person-item">
            登录密码：{{ userInfo.secret ? "已设置" : "未设置" }}
            <el-button type="primary" size="mini" @click="openPayPwdModal"
              >修改</el-button
            >
          </div>

          <div class="person-item">
            支付密码：已设置
            <el-button type="primary" size="mini" @click="openEditPayPwdModal">修改</el-button>
          </div>

          <div class="person-item">
            QQ：{{ userInfo.qq }}
            <el-button
              type="primary"
              size="mini"
              @click="openQQPwdModalAction(userInfo.qq)"
              >修改</el-button
            >
          </div>

          <div class="person-item">
            微信：{{ userInfo.wx }}
            <el-button
              type="primary"
              size="mini"
              @click="openWxPwdModalAction(userInfo.wx)"
              >修改</el-button
            >
          </div>
        </div>

        <div class="person-page-right">
          <div class="person-tips_item">
            愉快合作：第<span class="zy-font">{{
              transformTimeStampToDays(userInfo.created_at) || 0
            }}</span
            >天
          </div>
          <div class="person-tips_item">
            账户余额<span class="zy-font">{{ userInfo.amount || 0 }}</span
            >元
          </div>
          <div class="person-tips_item">
            绑定店铺<span class="zy-font">{{total || 0}}</span>个
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import VAddress from "@/components/VAddress.vue"; // @ is an alias to /src
import { httpGet, httpPost } from "@/lib/http";
import { transformTimeStampToDays } from "@/lib/helper";
import { getUserInfo, editUserInfo } from "@/service/user";
import { IUser } from "@/constance/user";
import { openSuccessMsg, openWarnMsg } from "@/lib/notice";
import { getMyShopList } from '@/service/shop';

@Component({
  components: {
    Slide,
    VAddress,
  },
})
export default class Home extends Vue {
  showPwdModal: boolean = false;
  showPayPwdModal: boolean = false;
  showQQModal: boolean = false;
  showWxModal: boolean = false;

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
    nick:""
  };

  resetPwdForm = {
    repeate_pwd: "",
    password: "",
    pass: 1,
    pay_password: "",
  };

  payPwdForm = {
    repeate_pwd: "",
    password: "",
    pass: 1,
    pay_password: "",
  };

  qqForm = {
    origin_qq: "",
    qq: "",
    pay_password: "",
  };

  wxForm = {
    origin_wx: "",
    wx: "",
    pay_password: "",
  };

  total:number = 0

  created() {
    this.getUserInfoAction();

    getMyShopList().then((data) => {
      if (data && data.data) {
        this.total = data.data.total;
      }
    });
  }

  getUserInfoAction() {
    getUserInfo().then((data) => {
      if (data && data.data) {
        this.userInfo = data.data;
      }
    });
  }

  editQQ() {
    if (!this.qqForm.qq) {
      openWarnMsg("现有联系QQ不能为空");
      return;
    }
    if (!this.qqForm.pay_password) {
      openWarnMsg("请输入支付密码");
      return;
    }

    editUserInfo({
      qq: this.qqForm.qq,
      pay_password: this.qqForm.pay_password,
    }).then((data) => {
      if (data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.closeQQPwdModal();
        this.getUserInfoAction();
      }
    });
  }

  editWx() {
    if (!this.wxForm.wx) {
      openWarnMsg("现有联系微信不能为空");
      return;
    }
    if (!this.wxForm.pay_password) {
      openWarnMsg("请输入支付密码");
      return;
    }

    editUserInfo({
      wx: this.wxForm.wx,
      pay_password: this.wxForm.pay_password,
    }).then((data) => {
      if (data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.closeWxPwdModal();
        this.getUserInfoAction();
      }
    });
  }

  editLoginPwd() {
    if (!this.resetPwdForm.password) {
      openWarnMsg("密码不能为空");
      return;
    }

    if (this.resetPwdForm.repeate_pwd != this.resetPwdForm.password) {
      openWarnMsg("两次密码输入不一致");
      return;
    }

    if (!this.resetPwdForm.pay_password) {
      openWarnMsg("请输入支付密码");
      return;
    }

    const { pay_password, password } = this.resetPwdForm;

    editUserInfo({
      pay_password,
      password,
      pass: 1,
    }).then((data) => {
      if (data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.closePayPwdModal();
        this.getUserInfoAction();
      }
    });
  }

   editPayLoginPwd() {
    if (!this.payPwdForm.pay_password) {
      openWarnMsg("密码不能为空");
      return;
    }

    if (this.payPwdForm.repeate_pwd != this.payPwdForm.pay_password) {
      openWarnMsg("两次密码输入不一致");
      return;
    }

    if (!this.payPwdForm.password) {
      openWarnMsg("请输入登录密码");
      return;
    }

    const { pay_password, password } = this.payPwdForm;

    editUserInfo({
      pay_password,
      password,
      pass: 1,
    }).then((data) => {
      if (data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.closeEditPayPwdModal();
        this.getUserInfoAction();
      }
    });
  }

  transformTimeStampToDays(time: string) {
    return transformTimeStampToDays(time);
  }

  openEditPayPwdModal(){
     this.showPayPwdModal = true;
     this.payPwdForm = {
      repeate_pwd: "",
      password: "",
      pass: 1,
      pay_password: "",
    };
  }

  closeEditPayPwdModal() {
    this.showPayPwdModal = false;
  }

  openPayPwdModal() {
    this.showPwdModal = true;
  }

  closePayPwdModal() {
    this.showPwdModal = false;
    this.resetPwdForm = {
      repeate_pwd: "",
      password: "",
      pass: 1,
      pay_password: "",
    };
  }

  openQQPwdModal() {
    this.showQQModal = true;
  }

  openQQPwdModalAction(qq: string) {
    this.openQQPwdModal();
    this.qqForm.origin_qq = qq;
  }

  closeQQPwdModal() {
    this.showQQModal = false;
    this.qqForm = {
      origin_qq: "",
      qq: "",
      pay_password: ""
    }
  }

  openWxPwdModal() {
    this.showWxModal = true;
  }

  openWxPwdModalAction(wx: string) {
    this.openWxPwdModal();
    this.wxForm.origin_wx = wx;
  }

  closeWxPwdModal() {
    this.showWxModal = false;
    this.wxForm = {
      origin_wx: "",
      wx: "",
      pay_password: ""
   }
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

.personal-container {
  width: 1200px;
  height: 400px;
  margin: 20px auto 0px;
  @include flex(flex-start);
  text-align: left;

  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
  }

  .el-form-item {
    margin-bottom: 0px;
  }
}

.pwd-dialog_item {
  @include flex(flex-start);
  align-items: center;
  // margin-bottom: 22px;
  .pwd-dialog_input {
    width: 350px;
  }
  .pwd-dialog_item_label {
    width: 100px;
  }
}

.dialog-footer {
  text-align: center;
  margin: 0 auto;
}

.person-page-container {
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 14px;
  padding-top: 20px;

  @include flex(space-between);
  .person-page-left {
    width: 400px;
  }

  .person-page-right {
    width: 220px;
    height: 240px;
    border-radius: 10px;
    border: 10px solid #dae6fc;
    padding: 30px;
    // text-align: center;
    .person-tips_item {
      margin-bottom: 15px;
    }
  }

  .person-item {
    @include flex(space-between);
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
