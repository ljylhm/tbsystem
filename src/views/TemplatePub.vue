<template>
  <div class="publish-container">
    <el-dialog title="选择商品" :visible.sync="showSearchShopModal">
      <div style="padding-bottom: 10px">
        <div class="pubilsh-choose-header">
          选择商品：
          <div>
            <el-select v-model="searchShopForm" placeholder="请选择">
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
            <el-input v-model="input" placeholder="请输入商品名称"></el-input>
          </div>
          <el-button type="primary">搜索</el-button>
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
        <div class="pub-search_item_label">发送地：</div>
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
            <div class="confirm-mission_item">任务数量： {{ TaskNum }}</div>
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
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showAllPriceModal = false" round type="primary"
          >取消</el-button
        >
        <el-button @click="countAllAndSave" round type="primary"
          >修改</el-button
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
        <el-button type="primary" round size="mini" @click="openAddGoodsModal"
          >选择商品</el-button
        >
      </div>

      <div class="pub-table pub-table-1">
        <div class="pub-table_header">选择商品</div>
        <table>
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
          <!-- <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品简称</td>
            <td class="pub-table_content_content">
              {{ currentShopDetail.name_simple }}
            </td>
          </tr> -->
          <tr class="pub-table_content_item">
            <td class="pub-table_content_label">商品链接</td>
            <!-- <td
              class="pub-table_content_content"
              style="overflow-x: scroll; max-width: 500px"
            >
              {{ currentShopDetail.goods_url }}
            </td> -->

            <td class="pub-table_content_content" style="height: 100px">
              <div
                style="
                  overflow-y: scroll;
                  height: 100px;
                  display: flex;
                  align-items: center;
                  width: 700px;
                "
              >
                {{ currentShopDetail.goods_url }}
              </div>
              <!-- <div class="ellipsis" style="width:700px;height:80px"></div> -->
            </td>
          </tr>
          <tr
            class="pub-table_content_item"
            v-for="(item, key) in searchForm.good_info"
            :key="key"
          >
            <td class="pub-table_content_label">商品设置</td>
            <td class="pub-table_content_content">
              <tr>
                <td style="width: 200px">
                  单价：
                  <el-input
                    style="width: 100px"
                    v-model="item.price"
                    placeholder="请输入单价"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 200px">
                  型号：
                  <el-input
                    style="width: 100px"
                    v-model="item.mode"
                    placeholder="请输入型号"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 200px">
                  件数：
                  <el-input
                    style="width: 100px"
                    v-model="item.num"
                    placeholder="请输入件数"
                    size="mini"
                  ></el-input>
                </td>
                <td style="width: 200px">
                  任务数：
                  <el-input
                    style="width: 100px"
                    v-model="item.task_num"
                    placeholder="请输入任务数"
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
            v-model="form.price"
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
                  class="keyword-input"
                  @blur="handleKeywordChange"
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

            <el-table-column
              prop="num"
              :label="remainCount"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
                  placeholder="请输入数量"
                  type="number"
                  :min="0"
                  @change="countNum"
                ></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop=""
              label="其他设置条件(可选)"
              width="252"
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

            <el-table-column prop="" label="操作" align="center" width="200">
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

        <div class="pub-item_table_content" v-if="searchForm.jl_time != 0">
          <div class="pub-item_table_content_item" style="border-top: none">
            <div class="left-pub">假聊内容</div>
            <div class="right-pub">
              <div>
                <el-input
                  style="width: 500px"
                  v-model="searchForm.jl_desc"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pub-item_table space-margin-top-15">
        <VPublish
          :count="TaskNum"
          :pastTabelData="searchForm.publish_option"
          :publishType="searchForm.publish_type"
          ref="vpublish"
        />
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
              v-model="searchForm.descripiton"
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
import {
  getGoodsDetail,
  getGoodsList,
  getShopKeeperList,
} from "@/service/good"; // @ is an alias to /src
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
import { routerHelper } from "@/router";
import { getTemplateInfo, upDateTemplate } from "@/service/order";
import { dateFormate } from "@/lib/time";

@Component({
  components: {
    HelloWorld,
    Header,
    VPublish,
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
  };

  // 展示商品的模态框
  showExpressModal = false;

  // 展示模态框的集合
  showSearchShopModal = false;

  // 展示设置配置的集合
  showOptionsModal = false;

  // 展示最后价格的弹框
  showAllPriceModal = false;

  // status = "2";
  status = "1";
  input = "";
  id: any = "";

  showPcNum: number = 0;
  showWifiNum: number = 0;
  total: number = 0;

  currentShopDetailTemp: any = Object.assign({}, DEFAULT_GOODLIST);
  currentShopDetail: any = Object.assign({}, DEFAULT_GOODLIST);

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
    price: "", // 价格
    mode: "", // 型号
    num: "", // 件数
    task_num: 0, // 任务数
    fee: 10, // 快递费用
    checkgoodsname: "1", // 接单选择
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
    descripiton: "", // 描述
    transfertype: "0", // 转账方式
    front_fee: "0", // 是否为定金单
    is_template: "0", // 是否设置为模板
    good_info: [], // 商品属性的一些信息

    hb: "0", // 是否需要货比
    hb_time: "0", // 货比时间
    fbb_see: "0", // 是否需要副宝贝浏览
    fbb_see_time: "0", // 副宝贝浏览时间
    pj_time: "0", // 评价浏览
    jl_time: "0", // 假聊宝贝

    jl_desc: "", // 假聊内容
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

  countNum() {
    let pc_num = 0;
    let phone_num = 0;
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

  created() {
    getGoodsList().then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.goodsInfoData = res.list;
      }
    });

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

  mounted() {
    // 获取模板id
    const { id } = routerHelper.getData();
    this.id = id;

    if (id) {
      getTemplateInfo(id).then(async (data: any) => {
        if (data && data.data) {
          this.searchForm = data.data;

          this.searchForm.option = JSON.parse(this.searchForm.option);
          this.searchForm.publish_option = JSON.parse(
            this.searchForm.publish_option
          );

          this.searchForm.good_info = JSON.parse(this.searchForm.good_info);

          const d: any = await getGoodsDetail(this.searchForm.goods_id);
          if (d && d.data && d.data.length > 0) {
            this.currentShopDetail = d.data[0];
          }

          this.searchForm.fbb_see = this.searchForm.fbb_see.toString();
          this.searchForm.fbb_see_time = this.searchForm.fbb_see_time.toString();
          this.searchForm.hb = this.searchForm.hb.toString();
          this.searchForm.hb_time = this.searchForm.hb_time.toString();
          this.searchForm.jl_time = this.searchForm.jl_time.toString();
          this.searchForm.pj_time = this.searchForm.pj_time.toString();
        }
        // console.log("searchForm searchForm", this.searchForm);
      });
    }
  }

  searchGoods() {
    getGoodsList().then((data) => {
      if (data && data.data) {
        const res = data.data;
        this.showGoodsInfoData = res.list;
      }
    });
  }

  // change事件
  rowChange(val: ModuleGoods.IGoodList) {
    this.currentShopDetailTemp = val;
  }

  // 选择商品
  chooseGoods() {
    if (this.currentShopDetailTemp.id) {
      this.currentShopDetail = this.currentShopDetailTemp;
      this.searchForm.goods_id = this.currentShopDetailTemp.id;
      this.closeAddGoodsModal();
    } else {
      openWarnMsg("请至少选择一个商品");
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

  openAddGoodsModal() {
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
    this.otherOptions = row;
    this.showOptionsModal = true;
  }
  saveOtherOptions() {
    this.closeOptionsModal();
  }

  saveAll() {
    const { searchForm } = this;
    const type = (this.$refs["vpublish"] as any).getPublishType();
    this.searchForm.publish_type = type;
    let t = JSON.parse(JSON.stringify(searchForm.publish_option));
    // searchForm.publish_option = searchForm.publish_option.filter(
    //   (item: any) => {
    //     return parseInt(item.missionNum) > 0;
    //   }
    // );

    // searchForm.id =
    searchForm.total_amount = this.feeData.fee;
    searchForm.id = this.id;

    upDateTemplate(searchForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功", () => {
          routerHelper.to("/templateList");
        });
      }
    });

    // publishNormalTask(searchForm).then((data) => {
    //   if (data && data.origin_data && data.origin_data.code == 1001) {
    //     openSuccessMsg("发布成功");
    //     window.location.reload();
    //   } else {
    //     searchForm.publish_option = t;
    //   }
    // });
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

  get remainCount() {
    let num = 0;
    let task_num = 0;
    this.searchForm.option.forEach((item: any) => {
      num = num + Number(item.num);
    });
    this.searchForm.good_info.forEach((item: any) => {
      task_num = task_num + Number(item.task_num);
    });

    if (!num) num = 0;
    if (!task_num) task_num = 0;

    let remain = Number(task_num - num) || 0;
    if (remain < 0) remain = 0;
    return `数量(${remain})`;
  }

  get TaskNum() {
    let task_num = 0;
    this.searchForm.good_info.forEach((item: any) => {
      task_num = task_num + Number(item.task_num);
    });
    return task_num;
  }

  transFormDateNew() {
    return dateFormate(Date.now(), "yyyy-MM-dd");
  }

  // 检测正常设置
  // 检测正常设置
  checkNormal() {
    const { goods_id, price, mode, num, option, good_info } = this.searchForm;
    if (!goods_id) {
      openAlertWarn("请选择商品");
      return;
    }

    let flag_good_info = true;
    let task_num_all = 0;
    good_info.forEach((item: any, key: number) => {
      const { mode, price, num } = item;
      if (!price) {
        flag_good_info = false;
        openAlertWarn("请输入单价");
        return;
      }
      if (!num) {
        flag_good_info = false;
        openAlertWarn("请输入件数");
        return;
      }
      if (!item.task_num) {
        flag_good_info = false;
        openAlertWarn("请输入任务数");
        return;
      }
      task_num_all = Number(item.task_num) + task_num_all;
    });

    if (!flag_good_info) return;

    let option_num = 0;
    let title_warn_flag = false;
    option.forEach((item: any) => {
      if (item.num) {
        option_num = option_num + parseInt(item.num);
      }

      let str = [];
      if (item.keyword) str = item.keyword.split("");
      if (str.length > 0) {
        str.forEach((element: any) => {
          if (this.currentShopDetail.name.indexOf(element) < 0) {
            title_warn_flag = true;
          }
        });
      }

      // if (this.currentShopDetail.name.indexOf(item.keyword) < 0) {
      //   title_warn_flag = true;
      // }
    });

    if (title_warn_flag) {
      openAlertWarn("关键字中包含标题中没有的字符，请检查确认。");
      return;
    }

    if (option_num != task_num_all) {
      openAlertWarn("任务数与来源数量不匹配，请重新设置");
      return;
    }

    // 检测发布时间
    let table_data = (this.$refs["vpublish"] as any).getTableData();
    let table_type = (this.$refs["vpublish"] as any).getPublishType();
    let copy_table_data = table_data;

    let flag = true;
    let mission_num = 0;
    let msg = "时间设置不正确，请重新设置";

    let data_time: any = [];

    console.log("copy_table_data",copy_table_data)

    copy_table_data.forEach((res: any) => {
      let item: any = {};
      for (let i in res) {
        item[i] = res[i];
      }

      // 如果不一样
      if(res["date"] != res["dayDate"]){
        item["dayDate"] = item["date"]
      }
  
      if (item.missionNum) {
        mission_num = mission_num + parseInt(item.missionNum);

        if (item.end_time) {
          // console.log("结束时间", item.end_time);
          // console.log("结束时间是否是Date对象", item.end_time instanceof Date);
          // 如果传过来的是Date对象
          if (item.end_time instanceof Date) {
            item.end_time = item.end_time.getTime() / 1000;
          } else {
            if (typeof item.end_time == "string") {
              if (item.end_time.split(":").length > 2) {
                item.end_time = new Date(item.end_time).getTime() / 1000;
              }else{
                  item.end_time =
                  new Date(
                    (item.dayDate + ` ${item.end_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            } else {
              if (typeof item.end_time == "number") {
                const nowDate = new Date(this.transFormDateNew()).getTime();
                const afterDate = new Date(item.dayDate).getTime();
                const diff = nowDate - afterDate;
                item.end_time = item.end_time + diff;
              } else {
                item.end_time =
                  new Date(
                    (item.dayDate + ` ${item.end_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            }
          }
        }

        if (item.start_time) {
          // 如果传过来的是Date对象
          if (item.start_time instanceof Date) {
            item.start_time = item.start_time.getTime() / 1000;
          } else {
            if (typeof item.start_time == "string") {
              if (item.start_time.split(":").length > 2) {
                item.start_time = new Date(item.start_time).getTime() / 1000;
              }else{
                  item.start_time =
                  new Date(
                    (item.dayDate + ` ${item.start_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            } else {
              if (typeof item.start_time == "number") {
                const nowDate = new Date(this.transFormDateNew()).getTime();
                const afterDate = new Date(item.dayDate).getTime();
                const diff = nowDate - afterDate;
                item.start_time = item.start_time + diff;
              } else {
                item.start_time =
                  new Date(
                    (item.dayDate + ` ${item.start_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            }
          }
        }

         if (item.over_cancel_time) {
          // 如果传过来的是Date对象
          if (item.over_cancel_time instanceof Date) {
            item.over_cancel_time = item.over_cancel_time.getTime() / 1000;
          } else {
            if (typeof item.over_cancel_time == "string") {
              if (item.over_cancel_time.split(":").length > 2) {
                item.over_cancel_time = new Date(item.over_cancel_time).getTime() / 1000;
              }else{
                  item.over_cancel_time =
                  new Date(
                    (item.dayDate + ` ${item.over_cancel_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            } else {
              if (typeof item.over_cancel_time == "number") {
                const nowDate = new Date(this.transFormDateNew()).getTime();
                const afterDate = new Date(item.dayDate).getTime();
                const diff = nowDate - afterDate;
                item.over_cancel_time = item.over_cancel_time + diff;
              } else {
                item.over_cancel_time =
                  new Date(
                    (item.dayDate + ` ${item.over_cancel_time}`).replaceAll("-", "/")
                  ).getTime() / 1000;
              }
            }
          }
        }

        if (!item.end_time || !item.start_time) {
          flag = false;
          msg = `${item.date}开始时间和结束时间不能为空`;
        }

        console.log("xxxxxxxx",item)

        if (item.start_time) {
          if (item.start_time < Date.now() / 1000) {
            flag = false;
            msg = `${item.date}开始时间必须大于当前时间`;
          }
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
      data_time.push(item);
    });

    if (mission_num != task_num_all) {
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

  handleKeywordChange(event: any) {
    let val = event.target.value;
    if (this.currentShopDetail.name) {
      let str = [];
      if (val) str = val.split("");
      if (str.length > 0) {
        str.forEach((element: any) => {
          if (this.currentShopDetail.name.indexOf(element) < 0) {
            openAlertWarn("关键字中包含标题中没有的字符，请检查确认。");
          }
        });
      }
    } else {
      openAlertWarn("关键字中包含标题中没有的字符，请检查确认。");
    }
  }

  // 保存的方法
  save() {}
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

.keyword-input {
  .el-input__inner {
    border: none;
    border-bottom: 1px solid #ddd;
  }
}

.pub-table-1 {
  td {
    border: 1px solid#ddd;
    box-sizing: border-box;
  }
}
</style>
