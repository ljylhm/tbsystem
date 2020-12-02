<template>
  <div class="publish-container">
    <el-dialog title="选择商品" :visible.sync="showSearchShopModal">
      <div style="padding-bottom: 10px">
        <div class="pubilsh-choose-header">
          选择掌柜号：
          <div>
            <el-select v-model="searchGoodForm.shop_id" placeholder="请选择">
              <el-option :label="'全部'" :value="''"> </el-option>
              <el-option
                v-for="item in shopOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="pubilsh-choose_input">
            <el-input
              v-model="searchGoodForm.name"
              placeholder="请输入商品名称"
            ></el-input>
          </div>
          <el-button type="primary" @click="searchGoodsV2">搜索</el-button>
        </div>
        <div class="zy-font tip-modal">提示: 单击一行以用来进行选择</div>
        <div class="pubilsh-choose-content">
          <el-table
            ref="publishChooseTable"
            :data="goodsInfoData"
            highlight-current-row
            @current-change="rowChange"
            border
          >
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="商品ID"
              width="80px"
              align="center"
            />

            <el-table-column
              prop="shopkeeper"
              label="店铺名"
              width="160px"
              align="center"
            />

            <el-table-column prop="name" label="商品名称" align="center" />

            <el-table-column
              prop="name_simple"
              label="商品简称"
              align="center"
            />

            <!-- <el-table-column prop="num" label="数量" width="200" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.num"
                placeholder="请输入数量"
                type="number"
              ></el-input>
            </template>
          </el-table-column> -->
          </el-table>
          <v-table
            :total="total"
            :hide-on-single-page="true"
            :page-size="5"
            :pageSizeChange="pageSizeChange"
          ></v-table>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chooseGoods">确定</el-button>
        <el-button type="warning" @click="closeAddGoodsModal">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="其他搜索条件"
      :visible.sync="showOptionsModal"
      width="500px"
    >
      <div class="pub-search_item">
        <div class="pub-search_item_label">排序：</div>
        <div class="pub-search_item_content">
          <el-select
            v-model="otherOptions.shop_order"
            placeholder="请选择排序方式"
          >
            <el-option
              v-for="item in order_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">发货地：</div>
        <div class="pub-search_item_content">
          <el-input v-model="otherOptions.send_address"></el-input>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">价格区间：</div>
        <div class="pub-search_item_content">
          <div class="pub-search_item_content_left">
            <el-input v-model="otherOptions.price_region.from"></el-input>
          </div>
          <div class="pub-search_item_content_left">
            <el-input v-model="otherOptions.price_region.to"></el-input>
          </div>
        </div>
      </div>

      <div class="pub-search_item">
        <div class="pub-search_item_label">其他：</div>
        <div class="pub-search_item_content">
          <el-input v-model="otherOptions.remark"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOtherOptions" round type="warning"
          >确认提交</el-button
        >
        <el-button type="primary" @click="closeOptionsModal" round
          >返回修改</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="选择包裹内物品"
      :visible.sync="showExpressModal"
      width="800px"
    >
      <el-table :data="expressData" border>
        <el-table-column
          prop="flowType"
          label="选择商品"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio></el-radio>
          </template>
        </el-table-column>

        <el-table-column
          prop="flowType"
          label="主图"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div style="text-align: center">
              <img
                :src="scope.row.main_url"
                style="width: 40px; height: 40px; margin: 0 auto"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="简述" align="center">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOtherOptions" round type="primary"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="确认任务信息" :visible.sync="showAllPriceModal">
      <div class="confirm-mission-container">
        <div class="confirm-mission-title">基本信息</div>
        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">
              店铺名： {{ currentShopDetail.name }}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="confirm-mission_item">任务类型： 销量任务</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">任务分类： 销量任务</div>
          </el-col>
        </el-row>

        <div class="confirm-mission-title">来路设置</div>

        <div v-for="(item, key) in searchForm.option" :key="key">
          <el-row>
            <el-col :span="12">
              <div class="confirm-mission_item">
                关键字： {{ item.keyword }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="confirm-mission_item">数量： {{ item.num }}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="confirm-mission_item">
                流量入口： {{ getFlowTypes(item.flow_type) }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="confirm-mission_item">其他搜索条件：</div>
            </el-col>
          </el-row>
        </div>

        <div class="confirm-mission-title">成交金额</div>

        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">
              成交金额： {{ searchForm.price }}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="confirm-mission_item">
              任务数量： {{ searchForm.task_num }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">任务佣金： {{ feeData.fee }}</div>
          </el-col>
          <el-col :span="12">
            <div class="confirm-mission_item">任务快递费用： 0</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">
              合计： <span class="zy-font">{{ feeData.total }}</span>
            </div>
          </el-col>
        </el-row>

        <div class="confirm-mission-title">日期</div>

        <el-row>
          <el-col :span="3">
            <div class="confirm-mission_item">日期</div>
          </el-col>
          <el-col
            :span="3"
            v-for="(d, key) in searchForm.publish_option"
            :key="key"
            >{{ d.dayDate.split("-")[1] }}月{{
              d.dayDate.split("-")[2]
            }}日</el-col
          >
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="confirm-mission_item">发布数量</div>
          </el-col>
          <el-col
            :span="3"
            v-for="(d, key) in searchForm.publish_option"
            :key="key"
          >
            <div class="confirm-mission_item">{{ d.missionNum || "--" }}</div>
          </el-col>
        </el-row>

        <div class="confirm-mission-title">其他费用</div>

        <el-row>
          <el-col :span="12">
            <div class="confirm-mission_item">快递类型：自发快递</div></el-col
          >
          <el-col :span="12"
            ><div class="confirm-mission_item">
              置顶费用：{{ feeData.top_fee }}元/单
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="confirm-mission_item">强制刷手收货：否</div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="confirm-mission_item">
              说明：<span class="zy-font"
                >现在需要商家打款本金+部分佣金到买手卡里，其余佣金平台来做打款，（详情看收费标准）</span
              >
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="2"
            ><div class="confirm-mission_item">支付密码：</div></el-col
          >
          <el-col :span="4">
            <el-input
              v-model="searchForm.pay_password"
              type="password"
            ></el-input>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="countAllAndSave" round type="primary"
          >仅发布</el-button
        >
        <el-button @click="countAllAndSave2" round type="primary"
          >发布并作为模板</el-button
        >
      </span>
    </el-dialog>

    <div class="pub-header">
      <div class="pub-header_item" :class="{ 'is-active': status == '1' }">
        第一步：相关商品设置
      </div>
      <div class="pub-header_item" :class="{ 'is-active': status == '2' }">
        第二步：快递和备注
      </div>
    </div>

    <div v-show="status == '1'">
      <div class="pub-item">
        <span>选定商品</span>
        <el-button
          type="primary"
          round
          size="mini"
          @click="openAddGoodsModal(true)"
          >选择商品</el-button
        >
      </div>

      <div class="pub-table">
        <div class="pub-table_header">选择商品</div>
        <table border="1">
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品名称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.name }}
            </td>
            <td rowspan="5" class="pub-table_image">
              <img
                :src="currentShopDetail.main_url"
                v-if="currentShopDetail.main_url"
                alt=""
              />
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">店铺名称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.shopkeeper }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品简称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.name_simple }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品链接</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.goods_url }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品设置</td>
            <td class="pub-table_content_content">
              <tr>
                <td style="width: 150px">
                  单价：
                  <el-input
                    style="width: 100px"
                    v-model="searchForm.price"
                    placeholder="请输入单价"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 150px">
                  型号：
                  <el-input
                    style="width: 100px"
                    v-model="searchForm.mode"
                    placeholder="请输入型号"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 150px">
                  件数：
                  <el-input
                    style="width: 100px"
                    v-model="searchForm.num"
                    placeholder="请输入件数"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 170px">
                  任务数：
                  <el-input
                    style="width: 100px"
                    v-model="searchForm.task_num"
                    placeholder="请输入任务数"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 60px">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openAddGoodsModal(false)"
                    >新增</el-button
                  >
                </td>
                <!-- <td style="width:180px">3</td> -->
              </tr>
            </td>
          </tr>
        </table>
      </div>

      <div
        class="pub-table"
        style="margin-top: 12px"
        v-for="(item, key) in searchForm.sec_baby"
        :key="key"
      >
        <table border="1">
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品名称</td>
            <td class="pub-table_content_content">
              {{ item.name }}
            </td>
            <td rowspan="5" class="pub-table_image">
              <img :src="item.main_url" v-if="item.main_url" alt="" />
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">店铺名称</td>
            <td class="pub-table_content_content">
              {{ item.shopkeeper }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品简称</td>
            <td class="pub-table_content_content">
              {{ item.name_simple }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品链接</td>
            <td class="pub-table_content_content">
              {{ item.goods_url }}
            </td>
          </tr>
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品设置</td>
            <td class="pub-table_content_content">
              <tr>
                <td style="width: 180px">
                  单价：
                  <el-input
                    style="width: 100px"
                    v-model="item.price"
                    placeholder="请输入单价"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 180px">
                  型号：
                  <el-input
                    style="width: 100px"
                    v-model="item.mode"
                    placeholder="请输入型号"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 180px">
                  件数：
                  <el-input
                    style="width: 100px"
                    v-model="item.num"
                    placeholder="请输入件数"
                    size="mini"
                  ></el-input>
                </td>
                <!-- <td style="width:180px">3</td> -->
              </tr>
            </td>
          </tr>
        </table>
      </div>

      <div class="pub-item space-margin-top-15">
        <div>
          快递费设置：<el-input
            class="pub-input_price"
            size="mini"
            v-model="searchForm.fee"
            type="number"
          />元
        </div>
        <div class="zy-font">
          温馨提示：如果商品不包邮，则在此输入快递费。反之包邮商品不用填写。
        </div>
      </div>

      <div class="pub-item space-margin-top-15">
        <div>
          接单选择：（自行审核买号）
          <el-radio v-model="searchForm.checkgoodsname" label="1">是</el-radio>
          <el-radio v-model="searchForm.checkgoodsname" label="0">否</el-radio>
        </div>
        <div class="zy-font">
          温馨提示：买手接到单后无法开始任务,需要您进行审核,十分钟不处理自动通过,且通过后不可再换人接单。
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <div class="pub-item_table_header">标题与图片设置</div>
        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub">商品标题验证(防止拍错链接)</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.is_check" label="1"
                  >需要</el-radio
                >
                <el-radio v-model="searchForm.is_check" label="0"
                  >不需要</el-radio
                >
              </div>
              温馨提示:请检查平台上商品标题是否跟淘宝上面的商品标题一致,避免任务无法进行，平台建议无智能助手商家需要验证
            </div>
          </div>
        </div>
        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item">
            <div class="left-pub">是否需要买手上传图片(搜索图，足迹图)</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.is_checkimg" label="1"
                  >需要</el-radio
                >
                <el-radio v-model="searchForm.is_checkimg" label="0"
                  >不需要</el-radio
                >
              </div>
              温馨提示：部分商家反馈截图不利于店铺成长、无截图后果需要商家来承担（比如改词，乱搜索等等），平台建议截图模式！！请慎重选择
            </div>
          </div>
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <div class="pub-item_table_header">浏览设置</div>
        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub">是否需要货比</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.hb" label="0">不需要</el-radio>
                <el-radio v-model="searchForm.hb" label="2">货比两家</el-radio>
                <el-radio v-model="searchForm.hb" label="3">货比三家</el-radio>
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item_table_content" v-if="searchForm.hb !== '0'">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub zy-font">货比时间</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.hb_time" label="0"
                  >不需要</el-radio
                >
                <el-radio v-model="searchForm.hb_time" label="2"
                  >货比两分钟</el-radio
                >
                <el-radio v-model="searchForm.hb_time" label="3"
                  >货比三分钟</el-radio
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub">是否需要副宝贝浏览</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.fbb_see" label="0"
                  >不需要</el-radio
                >
                <el-radio v-model="searchForm.fbb_see" label="2"
                  >浏览两款</el-radio
                >
                <el-radio v-model="searchForm.fbb_see" label="3"
                  >浏览三款</el-radio
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item_table_content" v-if="searchForm.fbb_see != '0'">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub zy-font">副宝贝浏览时间</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.fbb_see_time" label="0"
                  >不需要</el-radio
                >
                <el-radio v-model="searchForm.fbb_see_time" label="2"
                  >浏览两款</el-radio
                >
                <el-radio v-model="searchForm.fbb_see_time" label="3"
                  >浏览三款</el-radio
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item" style="border-bottom: none">
            <div class="left-pub">是否需要评价浏览</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.pj_time" label="0"
                  >不需要</el-radio
                >
                <el-radio v-model="searchForm.pj_time" label="2"
                  >评价浏览三分钟</el-radio
                >
                <el-radio v-model="searchForm.pj_time" label="3"
                  >评价浏览五分钟</el-radio
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item_table_content">
          <div class="pub-item_table_content_item">
            <div class="left-pub">是否需要假聊主宝贝</div>
            <div class="right-pub">
              <div>
                <el-radio v-model="searchForm.jl_time" label="0"
                  >不需要</el-radio
                >
                <el-radio v-model="searchForm.jl_time" label="2"
                  >假聊三分钟</el-radio
                >
                <el-radio v-model="searchForm.jl_time" label="3"
                  >假聊五分钟</el-radio
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <div class="pub-item_table_header">
          <span>来路设置</span>
          <div class="pub-item_table_right">
            来路设置总数：<span class="zy-font">0</span> PC：<span
              class="zy-font"
              >{{ showPcNum }}</span
            >
            无线端：<span class="zy-font">{{ showWifiNum }}</span>
            <el-button
              type="primary"
              class="pub-item_table_right_btn"
              round
              size="mini"
              @click="addFormSetting"
              >新增</el-button
            >
          </div>
        </div>

        <div class="pub-item_table_content">
          <el-table :data="searchForm.option" border>
            <el-table-column
              prop="flowType"
              label="流量入口"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.flow_type" placeholder="请选择">
                  <el-option
                    v-for="item in flowTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              prop="keyword"
              label="关键字"
              width="300"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.keyword"
                  placeholder="请输入关键字"
                ></el-input>
              </template>

              <template slot="header">
                关键字
                <!-- <span class="zy-font space-margin-left-15 under-line"
                  >搜索关键字设置规范</span
                > -->
              </template>
            </el-table-column>

            <el-table-column prop="num" label="数量" width="200" align="center">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.num"
                  placeholder="请输入数量"
                  type="number"
                  @change="countNum"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop=""
              label="其他设置条件(可选)"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  @click="openOptionsModal(scope.row)"
                  >设置</el-button
                >
              </template>
            </el-table-column>

            <el-table-column prop="" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  @click="deleteFromSetting(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <VPublish :count="searchForm.task_num" ref="vpublish" />
      </div>

      <div class="button-content">
        <el-button type="primary" @click="checkNormal">下一步</el-button>
      </div>
    </div>

    <div v-show="status == 2">
      <div class="pub-item_table space-margin-top-15">
        <div class="pub-item_table_header">
          <span>快递类型</span>
          <div class="pub-item_table_right">
            总数：<span class="zy-font">0</span> PC：<span class="zy-font"
              >0</span
            >
            无线端：<span class="zy-font">0</span>
          </div>
        </div>

        <div class="pub-item_table_content">
          <div class="make-table-content">
            <div class="make-table-item make-table-title">
              <div class="make-table-item_left">快递类型</div>
              <div class="make-table-item_right">说明</div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.express_type" label="0"
                  >自发快递</el-radio
                >
              </div>
              <div class="make-table-item_right">
                普通快递无法设置包裹内网重量，建议选择我们代发。
              </div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.express_type" label="1"
                  >邮政快递(真实包裹)（淘/拼/京)</el-radio
                >
              </div>
              <div class="make-table-item_right">
                邮政东莞仓库发出真实包裹，更加安全。如选择此快递，每个任务增加3.5元。
              </div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.express_type" label="2"
                  >申通快递(真实包裹)（淘）</el-radio
                >
              </div>
              <div class="make-table-item_right">
                申通广州仓库发出真实包裹，更加安全。如选择此快递，每个任务增加2.7元。
              </div>
            </div>
          </div>
        </div>

        <div class="pub-item space-margin-top-15">
          <div>
            置顶费用：<el-input
              class="pub-input_price"
              size="mini"
              v-model="searchForm.top_fee"
              type="number"
            />元 共计 {{ searchForm.top_fee || 0 }}元
          </div>
          <div class="zy-font">
            温馨提示：如果商品不包邮，则在此输入快递费。反之包邮商品不用填写。
          </div>
        </div>

        <div class="pub-item space-margin-top-15">
          <div>
            是否为订金单
            <el-radio v-model="searchForm.front_fee" label="1">是</el-radio>
            <el-radio v-model="searchForm.front_fee" label="0">否</el-radio>
          </div>
          <div class="zy-font">
            友情提示：如选是则代表买手在提交订单号时，不验证订单是否有付款。
          </div>
        </div>

        <div
          class="pub-item space-margin-top-15"
          style="justify-content: flex-start; height: 60px"
        >
          <div>任务说明：</div>
          <div>
            <el-input
              style="width: 500px"
              v-model="searchForm.description"
            ></el-input>
          </div>
        </div>

        <div class="pub-item_table_header space-margin-top-15">
          <span>转账方式</span>
        </div>

        <div class="pub-item_table_content">
          <div class="make-table-content">
            <div class="make-table-item make-table-title">
              <div class="make-table-item_left">转账方式</div>
              <div class="make-table-item_right">说明</div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.transfertype" label="0"
                  >自行转账</el-radio
                >
              </div>
              <div class="make-table-item_right">
                只需支付佣金，由商家自行向买家返还垫付的货款，平台不收取转账费用。
              </div>
            </div>
          </div>
        </div>

        <div class="button-content">
          <el-button type="primary" @click="toNext">上一步</el-button>
          <el-button type="primary" @click="openAllPriceModal"
            >下一步</el-button
          >
        </div>

        <!-- <div class="pub-item_table_header space-margin-top-15">
          <span>转账方式</span>
        </div> -->

        <!-- <div class="pub-item_table_content">
          <div class="make-table-content">
            <div class="make-table-item make-table-title">
              <div class="make-table-item_left">收货方式</div>
              <div class="make-table-item_right">说明</div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.transfertype" label="0"
                  >强制刷手收货</el-radio
                >
              </div>
              <div class="make-table-item_right">
                在刷手购买商品付款6天后，如刷手还没有确认收货，则让刷手无法接单。
              </div>
            </div>

            <div class="make-table-item">
              <div class="make-table-item_left">
                <el-radio v-model="searchForm.transfertype" label="0"
                  >强制刷手评价</el-radio
                >
              </div>
              <div class="make-table-item_right">
                在刷手购买商品付款6天后，如刷手还没有进行评价，则让刷手给十五字以上好评。
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src
import VPublish from "@/components/VPublish.vue"; // @ is an alias to /src
import VTable from "@/components/VTable.vue"; // @ is an alias to /src
import { getGoodsList, getShopKeeperList } from "@/service/good"; // @ is an alias to /src
import { getMyShopList } from "@/service/shop"; // @ is an alias to /src
import { getShopPrice, publishNormalTask } from "@/service/task";
import {
  openAlertError,
  openAlertWarn,
  openSuccessMsg,
  openWarnMsg,
} from "../lib/notice";
import { ModuleGoods, DEFAULT_GOODLIST } from "@/constance/goods";
import { IShopKeeper, IShopKeeperSelect } from "@/constance/shop";

@Component({
  components: {
    HelloWorld,
    Header,
    VPublish,
    VTable,
  },
})
export default class Publish extends Vue {
  DEFAULT_OPTIONS = {
    flow_type: "1", // 流量入口
    keyword: "", // 关键字
    count: "", // 数量
    shop_order: 1, // 商品排序方式
    price_region: {
      // 价格区间
      from: "",
      to: "",
    },
    send_address: "", // 发货地
    remark: "", // 其他
    pay_password: "", // 支付密码
  };

  // 展示商品的模态框
  showExpressModal = false;

  // 展示模态框的集合
  showSearchShopModal = false;

  // 展示设置配置的集合
  showOptionsModal = false;

  // 展示最后价格的弹框
  showAllPriceModal = false;
  // showAllPriceModal = true;

  // status = "2";
  status = "1";
  input = "";

  showPcNum: number = 0;
  showWifiNum: number = 0;
  total: number = 0;

  countNum() {
    console.log("xxxx");

    let pc_num = 0;
    let phone_num = 0;
    console.log("searchForm option", this.searchForm.option);
    this.searchForm.option.forEach((item: any) => {
      if (item.flow_type == 2 || item.flow_type == 5) {
        pc_num = pc_num + Number(item.num);
      } else {
        phone_num = phone_num + Number(item.num);
      }
    });

    this.showPcNum = pc_num;
    this.showWifiNum = phone_num;
  }

  currentShopDetailTemp: ModuleGoods.IGoodList = Object.assign(
    {},
    DEFAULT_GOODLIST
  );
  currentShopDetail: ModuleGoods.IGoodList = Object.assign(
    {},
    DEFAULT_GOODLIST
  );

  order_type = [
    {
      value: 1,
      label: "综合",
    },
    {
      value: 2,
      label: "销量",
    },
    {
      value: 3,
      label: "价格从高到低",
    },
    {
      value: 4,
      label: "价格从低到高",
    },
  ];

  searchForm: any = {
    type: 0,
    goods_id: "", // 商品id
    is_main: 1,
    price: 0, // 价格
    mode: "", // 型号
    num: "", // 件数
    task_num: 0, // 任务数
    fee: 0, // 快递费用
    checkgoodsname: "0", // 接单选择
    is_check: "1", // 是否验证标题
    is_checkimg: "1", // 是否验证图片
    option: [
      {
        flow_type: "1", // 流量入口
        keyword: "", // 关键字
        count: "", // 数量
        shop_order: 1, // 商品排序方式
        price_region: {
          // 价格区间
          from: "",
          to: "",
        },
        send_address: "", // 发货地
        remark: "", // 其他
      },
    ],
    publish_type: 0, // 0. 立即发布 1. 多天平均发布 2. 预约发布任务
    publish_option: [],
    express_type: "0",
    top_fee: 0, // 置顶费用
    description: "", // 描述
    transfertype: "0", // 转账方式
    front_fee: "0", // 是否为定金单
    pay_password: "", // 支付密码
    is_template: "0", // 是否设置为模板

    hb: "0", // 是否需要货比
    hb_time: "0", // 货比时间
    fbb_see: "0", // 是否需要副宝贝浏览
    fbb_see_time: "0", // 副宝贝浏览时间
    pj_time: "0", // 评价浏览
    jl_time: "0", // 假聊宝贝

    sec_baby: [], // 副宝贝
  };

  otherOptions = {
    shop_order: 1, // 商品排序方式
    price_region: {
      // 价格区间
      from: "",
      to: "",
    },
    send_address: "", // 发货地
    remark: "", // 其他
  };

  shopInfo = {
    name: "",
    title: "",
    shop_name: "",
    link: "",
    image: "",
  };

  form = {
    price: 1,
    checkBuyer: "2",
    needUpImage: "2",
    publishType: "1",
  };

  feeData: any = {
    fee: 0,
    platform_fee: 0,
    reserv_fee: 0,
    top_fee: 100,
    total: 148,
    user_fee: 0,
  };

  tableData = [
    {
      flowType: "",
      keyword: "",
      num: "",
    },
  ];

  dateDate = [{}];

  flowTypes = [
    {
      value: "1",
      label: "APP自然搜索",
    },
    {
      value: "2",
      label: "PC自然搜索",
    },
    {
      value: "3",
      label: "APP淘口令",
    },
    {
      value: "4",
      label: "APP直通车",
    },
    {
      value: "5",
      label: "PC直通车",
    },
    {
      value: "6",
      label: "抖音任务",
    },
  ];

  getFlowTypes(id: string) {
    const data = this.flowTypes.filter((item) => item.value == id);
    if (data.length > 0) return data[0].label;
  }

  closeAllPriceModal() {
    this.showAllPriceModal = false;
  }

  openAllPriceModal() {
    getShopPrice(this.searchForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        console.log("计算后的钱....", data);
        this.feeData = data.data;
        this.showAllPriceModal = true;
      }
    });
  }

  expressData = [
    {
      main_url:
        "https://kbgift.oss-cn-beijing.aliyuncs.com/1579012832223tcgiaj.png",
      name: "香薰包 香袋粗麻布去味防虫香囊",
    },
  ];

  shopOptions: IShopKeeperSelect[] = [];

  searchShopForm = "";

  shopKeeperData: IShopKeeperSelect[] = [];

  goodsInfoData: ModuleGoods.IGoodList[] = [];
  showGoodsInfoData: ModuleGoods.IGoodList[] = [];

  is_choose_main: boolean = false; // 是否是选择了主图

  searchGoodForm = {
    page: 1,
    limit: 5,
    search_name: "", // 搜索的名字
    shop_id: "",
  };

  created() {
    this.searchGoods();
    getShopKeeperList().then((data) => {
      if (data && data.data) {
        const res = data.data;
        let shop_keeper_data = res.map((item) => {
          return {
            label: item.shopkeeper,
            value: item.id,
          };
        });
        this.shopOptions = shop_keeper_data;
      }
    });
  }

  searchGoods() {
    getGoodsList(this.searchGoodForm).then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.goodsInfoData = res.list;
        this.total = data.data.total;
      }
    });
  }

  searchGoodsV2() {
    this.searchGoodForm.page = 1;
    getGoodsList(this.searchGoodForm).then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.goodsInfoData = res.list;
        this.total = data.data.total;
      }
    });
  }

  serachGoodClose() {
    console.log("123321");
    this.searchGoodForm = {
      page: 1,
      limit: 5,
      search_name: "", // 搜索的名字
      shop_id: "",
    };
  }

  // change事件
  rowChange(val: ModuleGoods.IGoodList) {
    this.currentShopDetailTemp = val;
  }

  // 选择商品
  chooseGoods() {
    // 如果有商品id 说明有主商品

    // 是否选择的是主图
    if (this.is_choose_main) {
      if (this.currentShopDetailTemp.id) {
        if (this.currentShopDetailTemp.id == this.searchForm.goods_id) {
          openWarnMsg("你已经添加过同类商品，请勿重复添加");
          return;
        }
        const is_exist = this.searchForm.sec_baby.some(
          (item: any) => item.id == this.currentShopDetailTemp
        );
        if (is_exist) {
          openWarnMsg("你已经添加过同类商品，请勿重复添加");
          return;
        }

        this.currentShopDetail = this.currentShopDetailTemp;
        this.searchForm.goods_id = this.currentShopDetailTemp.id;
        this.closeAddGoodsModal();
      } else {
        openWarnMsg("请至少选择一个商品");
      }
    } else {
      if (this.currentShopDetailTemp.id) {
        const is_exist_main =
          this.searchForm.goods_id == this.currentShopDetailTemp.id;
        const is_exist_sec = this.searchForm.sec_baby.some(
          (item: any) => item.id == this.currentShopDetailTemp.id
        );

        if (is_exist_main || is_exist_sec) {
          openWarnMsg("你已经添加过同类商品，请勿重复添加");
          return;
        }

        const shop_detail = Object.assign({}, this.currentShopDetailTemp, {
          goods_id: this.currentShopDetailTemp.id,
          price: 0,
          mode: "",
          num: 0,
        });
        this.searchForm.sec_baby.push(shop_detail);
        this.closeAddGoodsModal();
      }
    }
  }

  addFromSetting = () => {
    const o = {
      flowType: "",
      keyword: "",
      num: "",
    };
    this.tableData.push(o);
  };

  openAddGoodsModal(is_choose_main: boolean = true) {
    // 选择的是否是主商品
    this.is_choose_main = is_choose_main;
    if (this.goodsInfoData.length <= 0) {
      openWarnMsg("请先至少添加一个商品");
    } else {
      this.showSearchShopModal = true;
      this.showGoodsInfoData = this.goodsInfoData;
    }
  }

  closeAddGoodsModal() {
    this.showSearchShopModal = false;
  }

  handleChange(e: any) {
    console.log("eeeee", e);
  }

  // 保存其他设置

  addFormSetting() {
    // 新增一行设置
    const opt = Object.assign({}, this.DEFAULT_OPTIONS);
    this.searchForm.option.push(opt);
  }
  deleteFromSetting = (index: number) => {
    if (this.searchForm.option.length == 1) return;
    this.searchForm.option.splice(index, 1);
  };

  closeOptionsModal() {
    this.showOptionsModal = false;
  }
  openOptionsModal(row: any) {
    console.log(row);
    this.otherOptions = row;
    this.showOptionsModal = true;
  }
  saveOtherOptions() {
    this.closeOptionsModal();
  }

  saveAll() {
    const { searchForm } = this;
    if (!searchForm.pay_password) {
      openWarnMsg("请输入支付密码");
      return;
    }

    const type = (this.$refs["vpublish"] as any).getPublishType();
    this.searchForm.publish_type = type;
    let t = JSON.parse(JSON.stringify(searchForm.publish_option));
    // searchForm.publish_option = searchForm.publish_option.filter(
    //   (item: any) => {
    //     return parseInt(item.missionNum) > 0;
    //   }
    // );

    if (
      !searchForm.sec_baby ||
      (searchForm.sec_baby && searchForm.sec_baby.length <= 0)
    ) {
      searchForm.sec_baby = "";
    }
    publishNormalTask(searchForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("发布成功");
        const timer = setTimeout(() => {
          window.location.reload();
          clearTimeout(timer);
        }, 2000);
      } else {
        searchForm.publish_option = t;
      }
    });
  }

  countAllAndSave() {
    this.saveAll();
    this.closeAllPriceModal();
  }

  countAllAndSave2() {
    const { searchForm } = this;
    searchForm.is_template = "1";
    this.saveAll();
    this.closeAllPriceModal();
  }

  toNext() {
    this.status = "1";
  }

  // 检测正常设置
  checkNormal() {
    const { goods_id, price, mode, num, task_num, option } = this.searchForm;
    if (!goods_id) {
      openAlertWarn("请选择商品");
      return;
    }
    if (!mode) {
      openAlertWarn("请输入型号");
      return;
    }
    if (!price) {
      openAlertWarn("请输入单价");
      return;
    }
    if (!num) {
      openAlertWarn("请输入件数");
      return;
    }
    if (!task_num) {
      openAlertWarn("请输入任务数");
      return;
    }

    let option_num = 0;
    option.forEach((item: any) => {
      if (item.num) {
        option_num = option_num + parseInt(item.num);
      }
    });
    if (option_num != parseInt(task_num)) {
      openAlertWarn("任务数与来源数量不匹配，请重新设置");
      return;
    }

    // 检测发布时间
    let table_data = (this.$refs["vpublish"] as any).getTableData();
    let table_type = (this.$refs["vpublish"] as any).getPublishType();
    let copy_table_data = JSON.parse(JSON.stringify(table_data));
    console.log("xxxxx", table_data, table_type);

    let flag = true;
    let mission_num = 0;
    let msg = "时间设置不正确，请重新设置";

    let data_time = copy_table_data.map((item: any) => {
      if (item.missionNum) {
        mission_num = mission_num + parseInt(item.missionNum);
        if (item.end_time)
          item.end_time =
            new Date(item.dayDate + ` ${item.end_time}`).getTime() / 1000;
        if (item.start_time)
          item.start_time =
            new Date(item.dayDate + ` ${item.start_time}`).getTime() / 1000;
        if (item.over_cancel_time)
          item.over_cancel_time =
            new Date(item.dayDate + ` ${item.over_cancel_time}`).getTime() /
            1000;
        if (!item.end_time || !item.start_time) {
          flag = false;
          msg = `${item.date}开始时间和结束时间不能为空`;
        }
        if (item.end_time) {
          if (!item.start_time) {
            flag = false;
            msg = `${item.date}请填写开始时间`;
          }
          if (item.end_time < item.start_time) {
            flag = false;
            msg = `${item.date}结束时间必须大于开始时间`;
          }
        }

        if (item.over_cancel_time && item.over_cancel_time < item.end_time) {
          flag = false;
          msg = `${item.date}超时取消必须大于任务结束时间`;
        }
      }

         delete item.date;
        delete item.disabled;
        return item;
    });

    console.log("mission_num",mission_num)
    console.log("task_num",parseInt(task_num))

    if (mission_num != parseInt(task_num)) {
      openAlertWarn("任务数不匹配，请重新设置");
      return;
    }

    if (table_type != 0 && !flag) {
      openAlertWarn(msg);
      return;
    }

    this.searchForm.publish_option = data_time;

    this.status = "2";
  }

  // 保存的方法
  save() {}

  pageSizeChange(currentPage: number) {
    this.searchGoodForm.page = currentPage;
    this.searchGoods();
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

.tip-modal {
  text-align: left;
  margin-top: 6px;
  font-size: 14px;
}

.under-line {
  text-decoration: underline;
  cursor: pointer;
}

.space-margin-top-15 {
  margin-top: 20px;
}
.space-margin-left-15 {
  margin-left: 15px;
}

.pubilsh-choose-header {
  @include flex(flex-start);
  align-items: center;
  .pubilsh-choose_input {
    margin: 0px 10px;
  }
}
.pubilsh-choose-content {
  margin-top: 8px;
}

.publish-container {
  width: 1200px;
  height: auto;
  border: 1px solid #ddd;
  margin: 20px auto 60px;
  padding: 20px;

  .pub-search_item {
    @include flex(flex-start);
    align-items: center;
    margin-bottom: 15px;
    .pub-search_item_label {
      width: 100px;
    }
    .pub-search_item_content {
      // flex: 1;
      @include flex(space-between);
      align-items: center;
      .pub-search_item_content_left {
        width: 150px;
        margin-right: 20px;
      }
      .pub-search_item_content_right {
        width: 150px;
      }
    }
  }

  .pub-header {
    @include setHeight(46px);
    @include flex(flex-start);
    background: #eeeeee;
    font-size: 14px;
    .pub-header_item {
      flex: 1;
    }
    .is-active {
      background: #ff9900;
      color: #fff;
    }
  }

  .pub-item {
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    font-size: 14px;
    border: 1px solid #ddd;
    @include flex(space-between);
    align-items: center;
  }

  .pub-table {
    font-size: 14px;
    & > table {
      border-color: #ddd;
      border: none;
    }
    .pub-table_header {
      width: 100%;
      @include setHeight(40px);
      margin-top: 15px;
      background: #ddd;
      color: #000;
      text-align: center;
    }

    .pub-table_content_item {
      & td {
        height: 40px;
        text-align: center;
      }
    }

    .pub-table_content_label {
      width: 300px;
      background: #f5f5f5;
    }

    .pub-table_content_content {
      width: 700px;
    }

    .pub-table_image {
      width: 200px;
    }
  }

  .pub-input_price {
    width: 100px;
    margin-right: 10px;
  }

  .pub-item_table {
    .pub-item_table_header {
      padding: 0px 20px;
      @include setHeight(40px);
      @include flex(space-between);
      border: 1px solid #ddd;
      border-bottom: none;
      font-weight: 600;
      .pub-item_table_right {
        font-size: 12px;
        .pub-item_table_right_btn {
          margin-left: 12px;
        }
      }
    }

    .pub-item_table_content {
      .pub-item_table_content_item {
        width: 100%;
        border: 1px solid #ddd;
        @include flex(flex-start);
        align-items: center;
        height: 60px;
        font-size: 14px;
        .left-pub {
          height: 100%;
          width: 200px;
          box-sizing: border-box;
          padding: 15px;
          background: #f5f5f5;
        }
        .right-pub {
          flex: 1;
        }
      }
    }
  }

  .button-content {
    margin-top: 20px;
  }

  .make-table-content {
    border: 1px solid #ddd;
    .make-table-item {
      @include flex(flex-start);
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      .make-table-item_left {
        width: 300px;
        @include setHeight(40px);
        border-right: 1px solid #ddd;
      }
      .make-table-item_right {
        flex: 1;
        @include setHeight(40px);
      }
    }

    .make-table-title {
      background: #f5f5f5;
    }
  }
}

.confirm-mission-container {
  text-align: left;
  .confirm-mission-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .confirm-mission_item {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
