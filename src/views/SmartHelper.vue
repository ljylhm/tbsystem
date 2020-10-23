<template>
  <div class="smart-helper-container">


    <el-dialog width="500px" :title="'备注设置'" :visible.sync="showRemarkModal">
      <div class="smart-modal-content">
        <div>版本：收费版</div>
        <div>是否标记：收费版</div>
        <div>标记：收费版</div>
        <div>标记信息：收费版</div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUnit">确定</el-button>
        <el-button type="warning" @click="closeEditModal">关闭</el-button>
      </span>
    </el-dialog>

    <div class="person-left">
      <Slide :current-index="'/smartHelper'" />
    </div>
    <div class="person-right">
      <div class="goods-header">
        <div>淘宝店铺智能助手<br />开通流程：</div>
        <div class="goods-header-pic"></div>

        <div class="goods-header-guide_text_one goods-header-guide_text">
          【根据指示完成<br />购买指定服务的操作】
        </div>

        <div class="goods-header-guide_text_two goods-header-guide_text">
          【选择开通时长，平台扣费。<br />完成扣费后联系顾问进行对接】
        </div>

        <div class="goods-header-guide_text_three goods-header-guide_text">
          【【对智能助手<br />设置标记备注】
        </div>

        <div class="goods-header-guide_one goods-header-guide">
          <!-- <em>1</em> -->
          添加商品
        </div>

        <div class="goods-header-guide_two goods-header-guide">
          <!-- <em>2</em> -->
          设置目标客户
        </div>

        <div class="goods-header-guide_three goods-header-guide">
          <!-- <em>3</em> -->
          设置购买行为
        </div>

        <div class="goods-header-guide_four goods-header-guide">
          <!-- <em>4</em> -->
          设置购买行为
        </div>
      </div>

      <div class="smart-content">
        <div>已绑定店铺信息</div>
        <div class="zy-font">
          (特别提醒：为保证能正常发布任务，当智能助手有效期≤3天时，平台将会自动出现订购页面，商家需及时完成订购授权
          )
        </div>

        <div class="smart-table_content">
          <el-table :data="shopData">
            <el-table-column
              prop="type"
              label="平台"
              width="100px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="type"
              label="店铺名称"
              width="300px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="status"
              label="状态"
              width="120px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="status"
              label="接口有效期"
              width="200px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="status"
              label="智能助手有效期"
              width="200px"
              align="center"
            >
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <div>
                  <el-button type="primary">订购</el-button>
                  <el-button type="primary">授权</el-button>
                </div> -->

                 <div>
                  <el-button type="primary">备注</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="smart-order_content">
          <div class="smart-order_title">订单发货状态</div>
          <div>
             <el-form :inline="true">
                <el-form-item label="店铺名：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                 <el-form-item label="买号：">
                    <el-input v-model="form.buyer"></el-input>
                </el-form-item>

                <el-form-item label="订单编号：">
                    <el-input v-model="form.order_id"></el-input>
                </el-form-item>

                 <!-- <el-form-item label="订单编号：">
                     <el-select v-model="provinceId" placeholder="请选择" @change="handleStatusChange">
                      <el-option
                        v-for="item in provinceData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                </el-form-item> -->

                <br />

                 <el-form-item label="订单编号：">
                    <el-input v-model="form.order_id"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" round>查询</el-button>
                    <el-button type="primary" size="small" round>全部删除</el-button>
                    <el-button type="primary" size="small" round>导入黑名单</el-button>
                    <el-button type="primary" size="small" round>下载导入模板</el-button>
                </el-form-item>

            </el-form> 
          </div>
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
export default class SmartHelper extends Vue {

  showRemarkModal = true

  shopData = [
    {
      type: "淘宝",
      name: "百丽雅旗舰店",
      status: 1,
      expires_time: "",
    },
  ];

  form = {
    name:"",
    buyer:"",
    order_id:""
  }

  handleStatusChange(){

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

.smart-helper-container {
  width: 1400px;
  height: 400px;
  text-align: left;
  margin: 20px auto 0px;
  @include flex(flex-start);
  flex-wrap: nowrap;

  .smart-modal-content{

  }

  .person-left {
    width: 180px;
  }
  .person-right {
    padding-left: 30px;
    flex: 1;
    .goods-header {
      @include flex(flex-start);
      align-items: center;
      position: relative;

      & em {
        border: 1px solid #666;
        margin-right: 5px;
        font-style: normal;
        border-radius: 100%;
        height: 15px;
        width: 15px;
        float: left;
        text-align: center;
        line-height: 15px;
        color: #666;
        font-size: 14px;
      }

      .goods-header-guide_text {
        color: #666666;
        font-size: 14px;
      }

      .goods-header-guide_text_one {
        position: absolute;
        top: 2px;
        left: 210px;
      }

      .goods-header-guide_text_two {
        position: absolute;
        top: 2px;
        left: 430px;
      }

      .goods-header-guide_text_three {
        position: absolute;
        top: 2px;
        left: 720px;
      }

      .goods-header-guide {
        font-size: 14px;
        color: #4882f0;
      }

      .goods-header-guide_one {
        position: absolute;
        left: 150px;
        bottom: -20px;
      }

      .goods-header-guide_two {
        position: absolute;
        left: 360px;
        bottom: -20px;
      }

      .goods-header-guide_three {
        position: absolute;
        left: 605px;
        bottom: -20px;
      }

      .goods-header-guide_four {
        position: absolute;
        left: 840px;
        bottom: -20px;
      }

      .goods-header-pic {
        width: 800px;
        height: 84px;
        background: url(http://img.baishou123.cn/public/shop/images/img/buzhou.jpg)
          no-repeat 20px center;
      }
    }

    .smart-content {
      font-size: 14px;
      margin-top: 40px;
    }

    .smart-table_content {
      min-height: 400px;
      margin-top: 10px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
    }

    .smart-order_content {
      .smart-order_title {
        padding: 10px 0px;
      }
    }
  }
}
</style>
