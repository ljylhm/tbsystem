<template>
  <div class="shop-manage-container">
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

    <el-dialog
      :visible.sync="showBindShopModal"
      :title="'绑定店铺'"
      label-position="left"
      width="780px"
      :inline="true"
      @close="closeEditShopModal"
    >
      <div class="shop-bind-container">
        <el-form ref="bindShopForm" :model="bindShopForm" :rules="rules">
          <el-row>
            <el-col :span="18">
              <el-form-item label="店铺性质：" label-width="120px">
                <el-radio v-model="bindShopForm.type" label="1">淘宝</el-radio>
                <el-radio v-model="bindShopForm.type" label="2">京东</el-radio>
                <el-radio v-model="bindShopForm.type" label="3"
                  >拼多多</el-radio
                >
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="掌柜号："
                label-width="120px"
                prop="shopkeeper"
              >
                <el-input v-model="bindShopForm.shopkeeper"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="店铺名：" label-width="120px" prop="name">
                <el-input v-model="bindShopForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item
                label="店铺性质："
                label-width="120px"
                prop="nature"
              >
                <el-input v-model="bindShopForm.nature"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="发货人手机号："
                label-width="120px"
                prop="sender_phone"
              >
                <el-input v-model="bindShopForm.sender_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="发货人：" label-width="120px" prop="sender">
                <el-input v-model="bindShopForm.sender"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="发货省市区：" label-width="120px">
                <v-address :handleSelect="handleSelect"></v-address>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item
                label="发货详细地址："
                label-width="120px"
                prop="address"
              >
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="bindShopForm.address"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item
                label="上传店铺图片："
                label-width="120px"
                prop="img_url"
              >
                <div class="upload-container">
                  <div class="upload-image" v-if="bindShopForm.shop_cover">
                    <img :src="bindShopForm.shop_cover" />
                  </div>
                  <div class="upload-content" @click="uploadImage">
                    <i class="el-icon-plus upload-content-icon"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="zy-font font-14 shop-bind-tips">
          温馨提示：发货人信息会显示在快递单上，所以请如实填写。
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMyShopAction">确认添加</el-button>
        <el-button type="primary" @click="this.closeShopBindModal"
          >返回</el-button
        >
      </span>
    </el-dialog>

    <div class="person-left">
      <Slide :current-index="'/shopManage'" />
    </div>
    <div class="person-right">
      <div class="shop-header">
        店铺：{{total}}个
        <el-button
          class="shop-edit_btn"
          type="primary"
          round
          size="mini"
          @click="openShopBindModal"
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
            <el-table-column prop="name" label="店铺名称">
              <template slot-scope="porps">
                <div>{{ porps.row.name }}</div>
                <div>
                  <el-button
                    type="warning"
                    round
                    size="mini"
                    @click="openEditShopModal(porps.row.name)"
                    >修改店铺名</el-button
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="type" label="所属平台" >
              <template slot-scope="porps">
               <div>{{ porps.row.type == 1 ? "淘宝" :  porps.row.type == 2 ? "京东" : "拼多多"}}</div>
             </template>
            </el-table-column>

            <el-table-column prop="status" label="状态">
             <template slot-scope="porps">
               <div>{{ porps.row.status == 0 ? "未启用" : "启用" }}</div>
             </template>
            </el-table-column>

            <el-table-column prop="desctription" label="审核提示">
               <template slot-scope="porps">
                 <div>{{ porps.row.desctription ? porps.row.desctription : "暂无提示" }}</div>
               </template>
            </el-table-column>

            <el-table-column prop="sender" label="发货人姓名" />

            <el-table-column prop="sender_phone" label="发货人电话" />

            <el-table-column prop="address" label="发货人地址" />

            <el-table-column label="操作" width="200px">
              <template slot-scope="porps">
                <div class="shop-operation_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
                    @click="deleteShopItem(props.id)"
                    >删除</el-button
                  >
                </div>
                <div class="shop-operation_btn">
                  <el-button
                    type="primary"
                    round
                    size="mini"
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
import { confirmMessageOne, openSuccessMsg, openWarnMsg } from "@/lib/notice";
import { getMyShopList } from "@/service/shop";
import OpenFile from "@/lib/openFile";
import VAddress from "@/components/VAddress.vue";
import { upLoadImage } from "@/service/uploadImg";
import { httpPost } from "@/lib/http";
import { IShopList } from '@/constance/shop';

const phone_rule = /^1[3456789]\d{9}$/;

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

  shopInfoData:any = [];
  total:number = 0

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

  bindShopForm = {
    name: "", // 店铺名称
    type: "1", // 平台
    shopkeeper: "", // 掌柜号
    sender: "", // 发货人
    sender_phone: "",
    address: "",
    img_url: "",
    nature: "", // 店铺性质
    province: [],
    shop_cover: "",
  };

  rules = {
    name: [{ required: true, message: "店铺名称不能为空", trigger: "blur" }],
    shopkeeper: [
      { required: true, message: "掌柜号不能为空", trigger: "blur" },
    ],
    sender: [{ required: true, message: "发货人不能为空", trigger: "blur" }],
    sender_phone: [{ validator: this.checkPhone, trigger: "blur" }],
    address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
    nature: [{ required: true, message: "店铺性质不能为空", trigger: "blur" }],
    img_url: [{ required: true, message: "店铺图片不能为空", trigger: "blur" }],
  };

  checkPhone(rule: any, value: string, callback: any) {
    console.log("...", value);
    if (!value) return callback("请输入手机号码");
    if (!phone_rule.test(value)) return callback("请输入正确的手机号码");
    callback();
  }

  created() {
    this.getMyShopListAction();
  }

  getMyShopListAction() {
    getMyShopList().then((data) => {
      if (data && data.data) {
        this.shopInfoData = data.data.list;
        this.total = data.data.total
      }
    });
  }

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
      
    });
  }

  openShopDetailModal() {
    this.showShopDetailModal = true;
  }

  openShopBindModal() {
    this.showBindShopModal = true;
  }

  closeShopBindModal() {
    this.showBindShopModal = false;
    (this.$refs["bindShopForm"] as any).resetFields();
  }

  // 上传图片
  uploadImage() {
    fileOpener.getLocalImage((data) => {
      this.bindShopForm.shop_cover = data[0].base64Buffer;
      console.log("data data", data);
      console.log("xxxxx", data[0].file);
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.bindShopForm.img_url = res.data.src;
        }
        console.log("上传结果.", res);
      });
    });
  }

  // 获取省市区接口
  handleSelect(data: any) {
    console.log("xxxxxxxxxxxx",data)
    this.bindShopForm.province = data;
  }

  // 绑定店铺的接口
  addMyShopAction = (form: any) => {
    (this.$refs["bindShopForm"] as any).validate((valid: boolean) => {
      if (valid) {
        const { province } = this.bindShopForm;
        let flag = province.some((item:any) => {
          return !item.id
        });

        if (flag) {
          openWarnMsg("请选择发货省市区");
        } else {
          httpPost("/api/shop/add", this.bindShopForm).then((data) => {
            if (data && data.data) {
              const res = data.origin_data;
              if (res.code == 1001) {
                openSuccessMsg("添加店铺成功", () => {
                  this.closeShopBindModal();
                  this.getMyShopListAction();
                });
              }
            }
          });
        }
      }
    });
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

.shop-manage-container {
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
