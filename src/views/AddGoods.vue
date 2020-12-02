<template>
  <div class="add-goods-manage-container">
    <div class="person-left">
      <Slide :current-index="'/goodsManage'" />
    </div>
    <div class="person-right">
      <div class="add-goods-header">添加商品</div>

      <el-form :model="goodsForm" ref="goodsForm" :inline="true" :rules="rules">
        <div class="add-goods-h2">商品基本信息</div>

        <div class="add-goods_item">
          <el-form-item label="掌柜号：" label-width="140px" prop="shop_id">
            <el-select
              v-model="goodsForm.shop_id"
              placeholder="请选择"
              class="add-goods_select_1"
              @change="handleShopKeeperChange"
            >
              <el-option
                v-for="item in shopKeeperData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="add-goods_item">
          <el-form-item label="商品链接：" label-width="140px" prop="goods_url">
            <el-input
              class="add-goods_select_1"
              v-model="goodsForm.goods_url"
            ></el-input>
            <el-button
              type="primary"
              class="add-goods_btn_1"
              @click="getShopDetailByQTK"
              >获取商品详情</el-button
            >
          </el-form-item>
        </div>
        <div class="add-goods_item">
          <el-form-item label="商品全标题：" label-width="140px" prop="name">
            <el-input
              class="add-goods_select_1"
              v-model="goodsForm.name"
            ></el-input>
          </el-form-item>
        </div>
        <div class="add-goods_item">
          <el-form-item label="商品主图：" label-width="140px">
            <div class="upload-container">
              <div class="upload-image" v-if="goodsForm.main_url">
                <div
                  class="upload-top-content"
                  @click="goodsForm.main_url = ''"
                >
                  <i class="upload-icon"></i>
                </div>
                <img :src="goodsForm.main_url" />
              </div>
              <div class="upload-content" @click="uploadImageMainUrl">
                <i class="el-icon-plus upload-content-icon"></i>
              </div>
              <div class="zy-font">必选项</div>
            </div>
          </el-form-item>
        </div>
        <div class="add-goods_item">
          <el-tooltip effect="light" placement="top" content="">
            <div slot="content">
              二维码展示图：指的是该商品的二维码展示图，<br />此图会展现在手机端二维码任务中，<br />主要作用是让买手扫二维码进入到目标商品。第二行信息
            </div>
            <i class="el-icon-question add-goods_icon_question"></i>
          </el-tooltip>
          <el-form-item
            label="二维码展示图："
            label-width="140px"
            prop="qr_url"
          >
            <div class="upload-container">
              <div class="upload-image" v-if="goodsForm.qr_url">
                <div class="upload-top-content" @click="goodsForm.qr_url = ''">
                  <i class="upload-icon"></i>
                </div>
                <img :src="goodsForm.qr_url" />
              </div>
              <!-- <div class="upload-content" @click="uploadImage">
                <i class="el-icon-plus upload-content-icon"></i>
              </div> -->
              <!-- <div class="zy-font">必选项</div> -->
            </div>
          </el-form-item>
          <!-- <div class="canvas-container" id="canvas-container">
            <div class="tip-one">
              <div v-for="(item, key) in 6" :key="key"></div>
            </div>
            <div class="tip-two">
              <div v-for="(item, key) in 6" :key="key"></div>
            </div>

            <div class="tip-three">
              <div v-for="(item, key) in 6" :key="key"></div>
            </div>

            <div class="tip-four">
              <div v-for="(item, key) in 6" :key="key"></div>
            </div>
            <img :src="goodsForm.qr_url" />
          </div> -->

          <!-- <div class="canvas-container">
            <img :src="testBase64Url" alt="" />
          </div> -->

          <!-- <el-button @click="createCanvans">点击我</el-button> -->
        </div>

        <div class="add-goods-h2">商品自定义信息</div>

        <div class="add-goods_item">
          <el-form-item
            label="商品简称："
            label-width="140px"
            prop="name_simple"
          >
            <el-input
              class="add-goods_select_1"
              v-model="goodsForm.name_simple"
              placeholder="请输入2-10位中文、数字、英文，简称可以帮助你快速识别商品"
            ></el-input>
          </el-form-item>
        </div>

        <div class="add-goods_item">
          <el-form-item label="商品重量：" label-width="140px" prop="kg">
            <el-input
              class="add-goods_select_1"
              v-model="goodsForm.kg"
              placeholder="请输入单件商品的重量"
            ></el-input>
            <div class="zy-font font-14 tip-warn">
              温馨提醒：物品重量会显示在物流公司内网中，可在0.5KG至40.00KG之间自行设定
            </div>
          </el-form-item>
        </div>

        <div class="add-goods_item">
          <el-tooltip effect="light" placement="top">
            <div slot="content">
              商品类别指的是您添加的商品所属的类别，<br />如<span
                class="zy-font"
                >衣服、鞋子、化妆品</span
              >等。
            </div>
            <i class="el-icon-question add-goods_icon_question"></i>
          </el-tooltip>
          <el-form-item label="商品类别：" label-width="140px" prop="category">
            <el-input
              class="add-goods_select_1"
              v-model="goodsForm.category"
              placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中"
            ></el-input>
          </el-form-item>
        </div>

        <div class="add-goods-h2">商品图片信息</div>

        <div class="add-goods_item">
          <el-tooltip effect="light" placement="top" content="">
            <div slot="content">
              指的是该商品在手机端的商品主图，若手机端与电脑端的商品主图一致，可不用上传。
            </div>
            <i class="el-icon-question add-goods_icon_question"></i>
          </el-tooltip>
          <el-form-item label="手机端商品主图：" label-width="140px">
            <div class="upload-container">
              <div class="upload-image" v-if="goodsForm.phone_url">
                <div
                  class="upload-top-content"
                  @click="goodsForm.phone_url = ''"
                >
                  <i class="upload-icon"></i>
                </div>
                <img :src="goodsForm.phone_url" />
              </div>
              <div class="upload-content" @click="uploadImagePhoneMain">
                <i class="el-icon-plus upload-content-icon"></i>
              </div>
              <div class="zy-font">必选项</div>
            </div>
          </el-form-item>
        </div>

        <div class="add-goods_item">
          <el-form-item label="PC端商品主图：" label-width="140px">
            <div class="upload-container">
              <div class="upload-image" v-if="goodsForm.pc_url">
                <div class="upload-top-content" @click="goodsForm.pc_url = ''">
                  <i class="upload-icon"></i>
                </div>
                <img :src="goodsForm.pc_url" />
              </div>
              <div class="upload-content" @click="uploadImagePcMain">
                <i class="el-icon-plus upload-content-icon"></i>
              </div>
              <div class="zy-font">必选项</div>
            </div>
          </el-form-item>
        </div>

        <div class="add-goods_item">
          <el-form-item label="直通车商品图：" label-width="140px">
            <div
              class="upload-container space-margin-bottom-10"
              v-for="(item, key) in goodsForm.epc_url"
              :key="key"
            >
              <div class="upload-container space-margin-bottom-10">
                <div class="upload-image" v-if="item.url">
                  <div class="upload-top-content" @click="item.url = ''">
                    <i class="upload-icon"></i>
                  </div>
                  <img :src="item.url" />
                </div>
                <div class="upload-content" @click="uploadImageBus(key)">
                  <i class="el-icon-plus upload-content-icon"></i>
                </div>
                <!-- <div>
                  <div>
                    <el-switch v-model="item.pc" active-text="电脑端" />
                  </div>

                  <div>
                    <el-switch v-model="item.phone" active-text="手机端" />
                  </div>
                </div> -->
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="add-bottom_btn">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slide from "@/components/Slide.vue"; // @ is an alias to /src
import { confirmMessageOne, openSuccessMsg, openWarnMsg } from "@/lib/notice";
import OpenFile from "@/lib/openFile";
import VAddress from "@/components/VAddress.vue";
import { routerHelper } from "@/router/index";
import { httpPost } from "../lib/http";
import { upLoadImage } from "@/service/uploadImg";
import { completeImgUrl, getUrlParam } from "@/lib/helper";
import { getShopDetailByQTK } from "@/service/good";
import html2canvas from "html2canvas";

const DEFAUL_EDITSHOPNAMEFORM = {
  origin_name: "",
  current_name: "",
  pay_pwd: "",
};

let fileOpener = new OpenFile({
  multiple: false,
});

let fileOpener1 = new OpenFile({
  multiple: false,
});

let fileOpener2 = new OpenFile({
  multiple: false,
});

let fileOpener3 = new OpenFile({
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

  goodsForm = {
    id: "", // 掌柜号
    goods_url: "", // 商品链接
    name: "", // 商品名称
    main_url: "", // 商品主图
    qr_url: "", // 二维码展示图
    shopkeeper: "",

    status: 1,

    name_simple: "", // 商品简称
    kg: "", // 商品重量
    category: "", // 商品类别

    phone_url: "", // 手机端商品主图
    pc_url: "", // pc端商品主图

    epc_url: [
      {
        url: "",
        pc: 0,
        phone: 0,
      },
    ],
  };

  shopKeeperData: any[] = [];
  epc_url_fileOpener: any[] = [];

  rules = {
    shop_id: [
      { required: true, message: "商品链接不能为空", trigger: "change" },
    ],
    goods_url: [
      { required: true, message: "商品链接不能为空", trigger: "blur" },
    ],
    name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
    name_simple: [
      { required: true, message: "商品简称不能为空", trigger: "blur" },
    ],
    kg: [{ required: true, message: "商品重量不能为空", trigger: "blur" }],
    category: [
      { required: true, message: "商品类别不能为空", trigger: "blur" },
    ],
    main_url: [
      { required: true, message: "商品主图不能为空", trigger: "change" },
    ],
  };

  testBase64Url: string = "";
  base64Code: string = ""

  created() {
    const direct_bus_info = [];
    for (let i = 0; i < 4; i++) {
      direct_bus_info.push({
        url: "",
        pc: 0,
        phone: 0,
      });

      this.epc_url_fileOpener.push(
        new OpenFile({
          multiple: false,
        })
      );
    }

    this.goodsForm.epc_url = direct_bus_info;

    this.getShopKeeperList();
  }

  getShopDetailByQTK(keyword: string) {

    const url = this.goodsForm.goods_url
    if(!url) openWarnMsg("请输入主链接")
    else{
      const id = getUrlParam(url,"id")
      if(id) console.log("id id id",id)
    }
    getShopDetailByQTK("582606798425").then((data:any) => {
      if(data && data.origin_data && data.origin_data.code == 1001){
         const Data = JSON.parse(data.data)
         this.goodsForm.name = decodeURIComponent(Data.title)
         this.goodsForm.main_url = Data.pic_url_base
      }
    });
  }

  // 生成canvas
  createCanvans() {
    console.log("点击我..",this.goodsForm.qr_url);
    // 创建一个Image对象
    const image = new Image();
    image.src = this.goodsForm.qr_url;
    
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    if (canvas) {
      if(canvas.getContext && canvas.getContext("2d")){

        let ctx:any = (canvas.getContext("2d") as any);
        ctx.drawImage(image,0,0,300,300)

        ctx.rect(40,40,80,80);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();

        ctx.rect(200,40,80,80);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();

        ctx.rect(120,120,80,80);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();

        ctx.rect(200,200,80,80);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();

        ctx.rect(40,200,80,80);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();
      }
    }

    this.goodsForm.qr_url = canvas.toDataURL("image/png");

    // let content = document.getElementById("canvas-container")
    // if(content){
    //    html2canvas(content,{
    //      useCORS:true
    //    }).then(canvas=>{
    //      const base64Img = canvas.toDataURL('image/jpg');
    //      console.log("点击我..",base64Img)
    //      this.testBase64Url = base64Img
    //    },(err)=>{
    //      console.log("err err",err)
    //    })
    // }
  }

  save() {
    (this.$refs["goodsForm"] as any).validate((valid: boolean) => {
      if (valid) {
        if (!this.goodsForm.main_url) {
          openWarnMsg("请选择商品主图");
          return;
        }

        if (!this.goodsForm.qr_url) {
          openWarnMsg("请选择二维码展示图");
          return;
        }

        if (!this.goodsForm.phone_url) {
          openWarnMsg("请选择手机端商品主图");
          return;
        }

        if (!this.goodsForm.pc_url) {
          openWarnMsg("请选择PC端商品主图");
          return;
        }

        if (this.goodsForm.epc_url.length <= 0) {
          openWarnMsg("请至少选择一个直通车图");
          return;
        }

        httpPost("/api/goods/add", this.goodsForm).then((data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("添加商品成功", () => {
              const origin = location.origin;
              location.reload(true);
              // routerHelper.to("/goodsManage");
            });
          }
        });
      }
    });
  }

  // 选择掌柜号改变事件
  handleShopKeeperChange(e: any) {
    if (e) {
      this.shopKeeperData.map((item) => {
        if (item.value == e) {
          this.goodsForm.shopkeeper = item.label;
        }
      });
    }
  }

  uploadImageMainUrl() {
    fileOpener3.getLocalImage((data) => {

      this.goodsForm.qr_url = data[0].base64Buffer
      this.createCanvans()

      upLoadImage(data[0].file, "zhutu").then((res) => {
        if (res && res.data) {
          this.goodsForm.main_url = completeImgUrl(res.data.src);
        }
      });
    });
  }

  // 上传图片
  uploadImage() {
    fileOpener.getLocalImage((data) => {
      this.goodsForm.qr_url = data[0].base64Buffer;
      this.createCanvans()
      // upLoadImage(data[0].file).then((res) => {
      //   if (res && res.data) {
      //     this.goodsForm.qr_url = completeImgUrl(res.data.src);
      //     this.base64Code = data[0].base64Buffer
      //   }
      // });
    });
  }

  uploadImagePcMain(e: any) {
    fileOpener1.getLocalImage((data) => {
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.goodsForm.pc_url = completeImgUrl(res.data.src);
        }
      });
    });
  }

  uploadImagePhoneMain(e: any) {
    fileOpener2.getLocalImage((data) => {
      upLoadImage(data[0].file, "shuzhutu").then((res) => {
        if (res && res.data) {
          this.goodsForm.phone_url = completeImgUrl(res.data.src);
        }
      });
    });
  }

  uploadImageBus(index: number) {
    this.epc_url_fileOpener[index].getLocalImage((data: any) => {
      upLoadImage(data[0].file).then((res) => {
        if (res && res.data) {
          this.goodsForm.epc_url[index].url = completeImgUrl(res.data.src);
        }
      });
    });
  }

  toCreateGoods() {
    routerHelper.to("/addGoods");
  }

  getShopKeeperList() {
    httpPost<
      {
        id: number;
        shopkeeper: string;
      }[]
    >("/api/shop/shopkeeper_list").then((data) => {
      if (data && data.data) {
        let shop_keeper_data = data.data.map((item) => {
          return {
            label: item.shopkeeper,
            value: item.id,
          };
        });
        this.shopKeeperData = shop_keeper_data;
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

.space-margin-bottom-10 {
  margin-bottom: 10px;
}

.tip-warn {
  margin: 8px 0px;
}

.upload-container {
  @include flex(flex-start);
  align-items: center;
  .upload-image {
    width: 80px;
    height: 80px;
    position: relative;
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
      width: 800px;
      @include setHeight(40px);
      margin-bottom: 12px;
      font-weight: 600;
      color: #888888;
      border-bottom: 1px dashed #888888;
    }

    .add-goods_select_1 {
      width: 300px;
    }

    .add-goods_btn_1 {
      margin-left: 12px;
    }

    .add-goods_item {
      position: relative;
      .add-goods_icon_question {
        position: absolute;
        top: 12px;
        left: -8px;
      }
    }
  }

  .add-bottom_btn {
    margin: 0 auto 40px;
    text-align: center;
  }

  .canvas-container {
    width: 300px;
    height: 300px;
    position: relative;
    .tip-one,
    .tip-two,
    .tip-three,
    .tip-four {
      position: absolute;
      & > div {
        width: 20px;
        height: 20px;
        background: red;
        border: 1px solid #fff;
      }
    }

    .tip-one {
      top: 40px;
      left: 40px;
      @include flex(flex-start);
    }

    .tip-two {
      top: 80px;
      left: 80px;
      @include flex(flex-start);
    }

    .tip-three {
      top: 120px;
      left: 120px;
      @include flex(flex-start);
    }

    .tip-four {
      top: 160px;
      left: 160px;
      @include flex(flex-start);
    }

    & > Image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
