<template>
  <div class="transfer-account-container">
    <el-dialog :visible.sync="showTransFerModal" :title="'修改默认转账银行卡'">
      <div class="transfer-bank-modal">
        <!-- <div class="transfer-bank_header">
          <el-tooltip effect="light" placement="top" content>
            <div slot="content">
              每位用户只有3次设置银行卡的机会，请谨慎使用。
            </div>
            <i
              class="el-icon-question add-goods_icon_question"
            ></i> </el-tooltip
          >绑定银行卡次数： <span class="zy-font">{{ 3 - count }}</span
          >次
        </div> -->

        <div class="transfer-bank_form">
          <div class="pay-account_item">
            <div class="pay-account_item_label">原转账银行卡：</div>
            <div class="pay-account_item_content"></div>
            {{ bankInfo.bank || "" }} 尾号{{
              (bankInfo.card_no && bankInfo.card_no.slice(-4)) || ""
            }}
          </div>

          <div class="pay-account_item">
            <div class="pay-account_item_label">开户人：</div>
            <div class="pay-account_item_content"></div>
            {{ bankInfo.name || "" }}
          </div>
        </div>

        <div class="transfer-bank_form">
          <div class="transfer-bank_form_header">
            请在下方输入新的转账银行卡信息：
          </div>
          <el-form>
            <el-form-item :label="'转账银行：'" label-width="140px">
              <!-- bankData -->
              <el-select
                v-model="bankForm.bank"
                placeholder="请选择银行"
                class="short-input"
              >
                <el-option
                  v-for="item in bankData"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="'银行卡号：'" label-width="140px">
              <el-input
                v-model="bankForm.card_no"
                placeholder="请输入正确的银行卡号"
                class="middle-input"
              ></el-input>
            </el-form-item>

            <el-form-item :label="'银行开户人：'" label-width="140px">
              <el-input
                v-model="bankForm.name"
                placeholder="请输入正确的开户人姓名"
                class="middle-input"
              ></el-input>
            </el-form-item>

            <el-form-item :label="'开户地：'" label-width="140px">
              <v-address :handleSelect="handleSelect"></v-address>
            </el-form-item>

            <el-form-item :label="'开户行：'" label-width="140px">
              <el-input
                v-model="bankForm.bank_address"
                placeholder="请输入正确的开户人行"
                class="middle-input"
              ></el-input>
            </el-form-item>

            <el-form-item :label="'支付密码：'" label-width="140px">
              <el-input
                v-model="bankForm.pay_password"
                type="password"
                placeholder="请输入您的支付密码"
                class="middle-input"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveBank">确认提交</el-button>
        <el-button @click="closeTransFerModal">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showBtnGuideModal" :title="'操作按钮使用指南'">
      <div class="transfer-btng-modal">
        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_one"
            >
              转账成功
            </div>
          </div>
          <div class="transfer-btng_item_right">
            把<span class="zy-font">选中的数据</span
            >标记为【转账成功】，请确保<span class="zy-font">已成功转账后</span
            >再执行此操作
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_one"
            >
              全部转账成功
            </div>
          </div>
          <div class="transfer-btng_item_right">
            全部转账成功<span class="zy-font">把筛选条件下的所有数据</span
            >标记为【转账成功】，请务必先进行<span class="zy-font"
              >转账失败标记后</span
            >再进行此操作。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_two"
            >
              转账失败
            </div>
          </div>
          <div class="transfer-btng_item_right">
            把<span class="zy-font">选中的数据</span
            >标记为【转账失败】。附：招行批量转账结果快速查询教程。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_two"
            >
              批量导出
            </div>
          </div>
          <div class="transfer-btng_item_right">
            将<span class="zy-font">所有等待转账数据</span
            >导出成Excel表格，可以直接导入招行网银进行批量转账，完成转账操作后请务必<span
              class="zy-font"
              >返回平台进行转账成功/转账失败操作</span
            >
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_one"
            >
              上传凭证
            </div>
          </div>
          <div class="transfer-btng_item_right">
            当买手反馈实际没有收到转账时，需要卖家<span class="zy-font"
              >上传转账成功的凭证</span
            >。若转账实际上<span class="zy-font">被银行退回</span
            >，请将该笔订单<span class="zy-font">标记为【转账失败】</span>。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div
              class="transfer-btng_item_left_btn transfer-btng_item_left_btn_one"
            >
              查看凭证
            </div>
          </div>
          <div class="transfer-btng_item_right">
            查看卖家已上传的凭证，如果凭证错误，请自行修改。如无法修改，请联系平台客服，QQ。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">转账金额说明</div>
          </div>
          <div class="transfer-btng_item_right">
            转账金额为<span class="zy-font">买家</span>在购物平台<span
              class="zy-font"
              >实际支付的金额</span
            >，您发布任务时所设置的担保金额与买家支付金额间可能存在误差，请以<span
              class="zy-font"
              >转账金额为准</span
            >对买家进行转账
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAlipayGuideModal">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showStatusGuideModal"
      :title="'转账状态说明'"
      :before-close="closeFeedBackModal"
    >
      <div class="transfer-btng-modal">
        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">等待转账</div>
          </div>
          <div class="transfer-btng_item_right">
            需要卖家进行转账的订单记录。每天0点平台会更新当天需要处理的订单信息，卖家务必<span
              class="zy-font"
              >严格遵照此表格转账，切勿私自进行转账操作</span
            >，以免造成重复转账。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">已导出</div>
          </div>
          <div class="transfer-btng_item_right">
            标记此订单信息已经导出，在状态上等同于等待转账。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">转账成功</div>
          </div>
          <div class="transfer-btng_item_right">
            代表货款已经成功转出，请不要把尚未转账的信息标记转账成功，以免造成误会。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">转账失败</div>
          </div>
          <div class="transfer-btng_item_right">
            代表货款转账失败，需要买家核实银行信息后重新提交转账申请，<span
              class="zy-font"
              >切勿自行对转账失败的订单再次转账</span
            >。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text">未到账</div>
          </div>
          <div class="transfer-btng_item_right">
            代表买手反馈实际上货款并未到账，需要卖家<span class="zy-font"
              >提供转账凭证</span
            >。
          </div>
        </div>

        <div class="transfer-btng_item">
          <div class="transfer-btng_item_left">
            <div class="transfer-btng_item_left_text zy-font">温馨提示</div>
          </div>
          <div class="transfer-btng_item_right">
            对于转账失败的订单，买家可重新申请提现。买家<span class="zy-font"
              >重新提现</span
            >后，该笔订单次日在【等待转账】页面展示时会<span class="zy-font"
              >标记为红色 </span
            >，便于卖家识别该笔订单曾经进行过转账失败操作。
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeStatusModal">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showFeedBackModal" :title="'反馈买手'">
      <div>
        <h3 style="margin-bottom: 10px">留言记录</h3>
        <div class="comment-content_container">
          <div
            class="comment-content_item"
            v-for="(item, key) in transferComment"
            :key="key"
          >
            <div>{{ item.type == 1 ? "商家" : "买手" }}：</div>
            <div style="margin: 10px 0px">{{ item.comment }}</div>
            <div style="margin: 10px 0px" v-if="item.pic">
              <img :src="item.pic" style="width: 100px; height: 100px" />
            </div>
            <div>{{ item.created_at }}</div>
          </div>
        </div>

        <el-form :model="feedForm" :inline="true">
          <!-- <el-form-item :label="'上传金额：'">
            <div style="width: 200px">
              <el-input placeholder="请输入金额" v-model="feedForm.feedMoney">
              </el-input>
            </div>
          </el-form-item>

          <el-form-item :label="'转账人姓名：'">
            <div style="width: 200px">
              <el-input placeholder="请输入转账人" v-model="feedForm.feedName">
              </el-input>
            </div>
          </el-form-item> -->

          <el-form-item :label="'反馈留言：'">
            <div style="width: 300px">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入留言内容"
                v-model="feedForm.comment"
              >
              </el-input>
            </div>
          </el-form-item>
          <br />

          <el-form-item :label="'上传截图：'">
            <div class="upload-container space-margin-bottom-10">
              <div class="upload-image" v-if="feedForm.pic">
                <div class="upload-top-content" @click="deleteOnePic">
                  <i class="upload-icon"></i>
                </div>
                <img :src="feedForm.pic" />
              </div>
              <div class="upload-content">
                <i
                  class="el-icon-plus upload-content-icon"
                  @click="uploadImagePhoneMain"
                ></i>
              </div>
            </div>

            <!-- <div class="upload-container">
              <div class="upload-image" v-if="feedForm.feedImage">
                <img :src="feedForm.feedImage" />
              </div>
              <div class="upload-content" @click="uploadImagePhoneMain">
                <i class="el-icon-plus upload-content-icon"></i>
              </div>
            </div> -->
          </el-form-item>
          <br />
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="submitFeed">确认提交</el-button>
        <el-button type="primary" @click="buyerTkAction">买家已退款</el-button>
        <el-button @click="closeFeedBackModal">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showDcModal" :title="'温馨提示'">
      <div style="margin-bottom: 15px">
        <!-- <p>当前表格存在0条状态为”已导出“的订单数据，</p> -->
        <p>为避免重复转账，请按以下步骤进行操作，</p>
        <p>1、在表格中筛选出“已导出”的订单数据；</p>
        <p>2、核实是否已对这些订单进行转账；</p>
        <p>
          3、若确实已转账,请返回平台根据转账结果将这些订单标记为“转账成功”或“转账失败”；
        </p>
        <p>4、标记完毕后再导出剩余的数据，执行转账操作。</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAcOneAction(0)" round
          >招商导出</el-button
        >
        <el-button type="warning" @click="doAcOneAction(1)" round
          >兴业导出</el-button
        >
        <el-button type="primary" @click="doAcOneAction(2)" round
          >平安导出</el-button
        >
        <el-button type="warning" @click="doAcOneAction(3)" round
          >交通导出</el-button
        >
        <el-button type="primary" @click="doAcOneAction(4)" round
          >浦发导出</el-button
        >
        <el-button type="primary" @click="doAcOneAction(5)" round
          >支付宝导出</el-button
        >
        <el-button @click="closeDcModal">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showDcOneModal" :title="'温馨提示'">
      <div style="margin-bottom: 15px">
        <p>导出笔数：{{ allCount }}笔</p>
        <p>转账总金额：{{ allTransferCount }}元</p>
        <p>
          提示：请删除以前导出的表格，避免导入网银时选择错误，造成重复转账，因卖家原因导致转账出错，
          责任由卖家自身承担。
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDc" round>确认导出</el-button>
        <el-button type="warning" @click="closeOneDcModal" round
          >取消操作</el-button
        >
      </span>
    </el-dialog>

    <div class="person-left">
      <VPaySlide :current-index="'/transFerAccountManage'" />
    </div>
    <div class="person-right">
      <el-tabs
        v-model="activeName"
        type="border-card"
        class="custom-tab_container"
        @tab-click="tabChange"
      >
        <el-tab-pane label="等待转账" name="first">
          <div class="wait-transfer-container">
            <div class="wait-transfer-left">
              <p class="zy-font" style="font-size: 16px; font-weight: 600">
                关于转账的平台规定：
              </p>
              <p>
                1、必须在每天下午16：00前完成前一天的所有转账，否则无法发布任务；
              </p>
              <p>2、严禁使用支付宝转账，一经发现将终止合作；</p>
              <p>3、对于超时未转账的订单，买家有权申请退款；</p>
              <p>4、对于多次超时的卖家，平台有权终止合作。</p>
              <p>
                转账操作流程：导出转账信息—进行转账操作—返回平台
                <span class="zy-font weight-font">标记转账失败订单</span>—再
                <span class="zy-font weight-font">标记转账成功订单</span>。
              </p>
              <p>
                批量转账流程：只支持招商银行，请点击查看教程。
                <span class="link-font">如何使用招商银行批量转账？</span>
              </p>
            </div>
            <div class="wait-transfer-right">
              <div class="wait-transfer-right_item">
                招商银行批量转账问题汇总
              </div>
              <div class="wait-transfer-right_item">卖家转账常见问题</div>
              <div class="wait-transfer-right_item">支付宝免费快速提现秘籍</div>
              <div
                class="wait-transfer-right_item dz-gif-2"
                @click="openAlipayGuideModal"
              >
                操作按钮使用指南
              </div>
              <div
                class="wait-transfer-right_item dz-gif-2 no-border"
                @click="openStatusModal"
              >
                转账状态说明
              </div>
            </div>
          </div>

          <div class="wait-transfer-form">
            <div class="wait-transfer-form_header">
              默认转账银行卡：{{ bankInfo.bank || "" }} 尾号
              <span class="zy-font">{{
                (bankInfo.card_no && bankInfo.card_no.slice(-4)) || ""
              }}</span
              >开户人：{{ bankInfo.name || "" }}
              <el-button
                @click="deleteBank"
                v-if="bankInfo && bankInfo.id && bankInfo.status == 1"
                type="primary"
                size="small"
                :style="{ marginLeft: '10px' }"
                round
                >删除</el-button
              >
              <el-button
                v-else-if="bankInfo && bankInfo.id && bankInfo.status == 0"
                type="primary"
                :style="{ marginLeft: '10px' }"
                round
                size="small"
                >审核中</el-button
              >
              <el-button
                v-else
                type="primary"
                :style="{ marginLeft: '10px' }"
                @click="openTransFerModal"
                round
                size="small"
                >创建</el-button
              >
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item :label="'转账状态：'">
                  <el-select
                    class="short-input"
                    v-model="searchForm.status"
                    placeholder="请选择"
                    @change="handleTransFerChange"
                  >
                    <el-option
                      v-for="item in resultWaitStatusData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="'订单编号：'">
                  <el-input
                    v-model="searchForm.order_number"
                    class="short-input"
                  ></el-input>
                </el-form-item>

                <!-- <el-form-item :label="'转账申请时间：'">
                  <el-date-picker
                    v-model="searchForm.create_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="timeChangeOne"
                    value-format="yyyy-MM-dd hh:mm"
                  ></el-date-picker>
                </el-form-item> -->

                <el-form-item :label="'是否导出：'">
                  <el-select
                    class="short-input"
                    v-model="searchForm.is_export"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dcData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- is_export -->

                <el-form-item :label="''">
                  <el-button type="primary" size="small" round @click="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>

              <div style="font-weight: 600">
                <span class="zy-font"
                  >温馨提示：默认展示所有需要待转账记录，导出规则同理，</span
                >如果需要查询和导出指定日期，请在上方筛选日期。
                <span class="zy-font"
                  >温馨提示：转账前请商家仔细核对，如果您不清楚应该如何操作转账，请咨询客服处理。因商家自身原因导致的重复转账造成的损失，平台只负责协助商家进行追回</span
                >
              </div>

              <div style="margin-top: 10px">
                <!-- <el-button type="primary" round>转账成功</el-button> -->
                <el-button type="warning" round @click="dcAction"
                  >导出</el-button
                >
                <el-button type="warning" round @click="batchTransFerAction"
                  >批量转账</el-button
                >
              </div>
            </div>
            <div class="table-data_container">
              <el-table
                ref="multipleTable"
                :data="waitTransFerData"
                @selection-change="handleSelectionChange" 
                :row-key="getRowKeys" 
              >
                <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                <el-table-column prop="buyer_name" label="买号"  />
                <el-table-column prop="bank_name" label="收款人姓名"  />
                <el-table-column prop="order_no" label="订单号" width="200px" />
                <el-table-column prop="buyer_pay" label="商品单价"  />
                <el-table-column prop="user_fee" label="佣金" />
                <el-table-column prop="transferAccountMoney" label="转账金额">
                  <template slot-scope="scope">
                    {{
                      parseFloat(scope.row.user_fee) +
                      parseFloat(scope.row.buyer_pay)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="card_no"
                  label="银行卡号"
                  width="180px"
                />
                <el-table-column prop="bank" label="开户行" />
                <!-- <el-table-column prop="bank_detail_name" label="支行名称" /> -->
                <el-table-column prop="status" label="转账状态">
                  <template slot-scope="scope">
                    {{ getTransRes(scope.row.status) }}
                  </template>
                </el-table-column>
                <el-table-column prop="transfer_time" label="转账截止时间">
                  <template slot-scope="scope">
                    {{ dateFormate(scope.row.transfer_time) }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="转账操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="updateTransFerStatus(scope.row.id)"
                      >已转账</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="转账结果" name="second">
          <div class="result-transfer-container">
            <div class="result-transfer_form">
              <el-form :inline="true">
                <el-form-item :label="'订单编号：'">
                  <el-input
                    v-model="searchForm.order_number"
                    class="short-input"
                  ></el-input>
                </el-form-item>

                <el-form-item :label="'转账状态：'">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请选择转账状态"
                    class="short-input"
                  >
                    <el-option
                      v-for="item in resultStatusDataOne"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="'转账申请时间：'">
                  <el-date-picker
                    v-model="searchForm.create_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="timeChangeOne"
                    value-format="yyyy-MM-dd hh:mm"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" round @click="search"
                    >查询</el-button
                  >
                  <!-- <el-button
                    type="warning"
                    round
                    :style="{ marginLeft: '10px' }"
                    >导出</el-button
                  > -->
                </el-form-item>
              </el-form>
            </div>

            <div class="table-data_container">
              <el-table :data="waitTransFerData">
                <el-table-column prop="buyer_name" label="买号" />
                <el-table-column prop="bank_name" label="收款人姓名" />
                <el-table-column prop="order_no" label="订单号" width="200px" />
                <el-table-column prop="price" label="商品单价" />
                <el-table-column prop="user_fee" label="佣金" />
                <el-table-column prop="transferAccountMoney" label="转账金额">
                  <template slot-scope="scope">
                    {{
                      parseFloat(scope.row.user_fee) +
                      parseFloat(scope.row.buyer_pay)
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="transferAccountMoney" label="转账时间">
                  <template slot-scope="scope">
                    {{ dateFormate(scope.row.transfer_end_time) || "--" }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="card_no"
                  label="银行卡号"
                  width="180px"
                />
                <el-table-column prop="bank" label="开户行" />
                <!-- <el-table-column prop="bank_detail_name" label="支行名称" /> -->
                <el-table-column prop="status" label="转账状态">
                  <template slot-scope="scope">
                    {{
                      resultStatusData[scope.row.status] &&
                      getTransRes(scope.row.status)
                    }}
                  </template>
                </el-table-column>

                <el-table-column prop="status" label="转账操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      v-if="scope.row.status == 3"
                      @click="feedBack(scope.row.id)"
                      >反馈</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="未到账反馈" name="three">
          <div class="not-pay-transfer-container">
            <div class="not-pay-transfer_header">
              <div class="not-pay-transfer_text">
                下方表格记录的是买家提交的提现未到账反馈，请复制订单编号到网银核实该笔订单的转账情况：
              </div>
              <div class="not-pay-transfer_text">
                1、若经核实，该笔订单显示为“转账成功”，请在上传凭证窗口<span
                  class="zy-font"
                  >提交</span
                >该笔订单的成功转账凭证;
              </div>
              <div class="not-pay-transfer_text">
                2、若经核实，实际上<span class="zy-font"
                  >未对该订单进行转账</span
                >或<span class="zy-font">实际转账失败</span
                >了，请在上传凭证窗口点击<span class="zy-font"
                  >【转账失败】</span
                >按钮，将该笔订单的状态变更为转账失败；
              </div>
              <div class="not-pay-transfer_text">
                <span class="zy-font">温馨提示：</span>请务必在<span
                  class="zy-font"
                  >每日中午12点前</span
                >对需要上传凭证的订单进行操作，否则<span class="zy-font"
                  >任务将被隐藏</span
                >。
              </div>
            </div>

            <div class="not-pay-transfer_form">
              <el-form :inline="true">
                <el-form-item :label="'订单编号：'">
                  <el-input
                    v-model="searchForm.order_number"
                    class="short-input"
                  ></el-input>
                </el-form-item>

                <el-form-item :label="'转账状态：'">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请选择转账状态"
                    class="short-input"
                  >
                    <el-option
                      v-for="item in resultStatusDataTwo"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="'转账申请时间：'">
                  <el-date-picker
                    v-model="searchForm.create_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="timeChangeOne"
                    value-format="yyyy-MM-dd hh:mm"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" round @click="search"
                    >查询</el-button
                  >
                  <!-- <el-button
                    type="warning"
                    round
                    :style="{ marginLeft: '10px' }"
                    >导出</el-button
                  > -->
                </el-form-item>
              </el-form>
            </div>

            <div class="not-pay-transfer_table">
              <el-table :data="waitTransFerData">
                <el-table-column prop="buyer_name" label="买号" />
                <el-table-column prop="bank_name" label="收款人姓名" />
                <el-table-column prop="order_no" label="订单号" width="200px" />
                <el-table-column prop="price" label="商品单价" />
                <el-table-column prop="user_fee" label="佣金" />
                <el-table-column prop="transferAccountMoney" label="转账金额">
                  <template slot-scope="scope">
                    {{
                      parseFloat(scope.row.user_fee) +
                      parseFloat(scope.row.buyer_pay)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="card_no"
                  label="银行卡号"
                  width="180px"
                />
                <el-table-column prop="bank" label="开户行" />
                <!-- <el-table-column prop="bank_detail_name" label="支行名称" /> -->
                <el-table-column prop="status" label="转账状态">
                  <template slot-scope="scope">
                    {{
                      resultStatusData[scope.row.status] &&
                      getTransRes(scope.row.status)
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="transfer_time" label="转账截止时间">
                  <template slot-scope="scope">
                    {{ dateFormate(scope.row.transfer_time) }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="转账操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      v-if="scope.row.status == 0"
                      @click="updateTransFerStatus(scope.row.id)"
                      >已转账</el-button
                    >
                    <el-button
                      type="primary"
                      size="small"
                      v-if="scope.row.status == 3"
                      @click="feedBack(scope.row.id)"
                      >反馈</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="买家已退款" name="four">
          <div class="not-pay-transfer-container">
            <div class="not-pay-transfer_header">
              <div class="not-pay-transfer_text">
                下方表格记录的是买家已在购物平台<span class="zy-font"
                  >退款成功</span
                >的订单。对于以下情况的订单，买家有权利到购物平台进行退款：
              </div>
              <div class="not-pay-transfer_text">
                1、若经核实，该笔订单显示为“转账成功”，请在上传凭证窗口提交该笔订单的成功转账凭证
              </div>
              <div class="not-pay-transfer_text">
                2、卖家频繁操作转账失败的订单。
              </div>
              <div class="not-pay-transfer_text">
                退款成功后，管理员会将订单状态变更为"已退款"。
              </div>
            </div>

            <div class="not-pay-transfer_form">
              <el-form :inline="true">
                <el-form-item :label="'订单编号：'">
                  <el-input
                    v-model="searchForm.order_number"
                    class="short-input"
                  ></el-input>
                </el-form-item>

                <el-form-item :label="'转账状态：'">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请选择转账状态"
                    class="short-input"
                  >
                    <el-option
                      v-for="item in tkData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="'转账申请时间：'">
                  <el-date-picker
                    v-model="searchForm.create_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="timeChangeOne"
                    value-format="yyyy-MM-dd hh:mm"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" round @click="search"
                    >查询</el-button
                  >
                  <!-- <el-button
                    type="warning"
                    round
                    :style="{ marginLeft: '10px' }"
                    >导出</el-button
                  > -->
                </el-form-item>
              </el-form>
            </div>

            <div class="not-pay-transfer_table">
              <el-table :data="waitTransFerData">
                <el-table-column prop="buyer_name" label="买号" />
                <el-table-column prop="bank_name" label="收款人姓名" />
                <el-table-column prop="order_no" label="订单号" width="200px" />
                <el-table-column prop="price" label="商品单价" />
                <el-table-column prop="user_fee" label="佣金" />
                <el-table-column prop="transferAccountMoney" label="转账金额">
                  <template slot-scope="scope">
                    {{
                      parseFloat(scope.row.user_fee) +
                      parseFloat(scope.row.buyer_pay)
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="card_no"
                  label="银行卡号"
                  width="180px"
                />
                <el-table-column prop="bank" label="开户行" />
                <!-- <el-table-column prop="bank_detail_name" label="支行名称" /> -->
                <el-table-column prop="status" label="转账状态">
                  <template slot-scope="scope">
                    {{
                      resultStatusData[scope.row.status] &&
                      getTransRes(scope.row.status)
                    }}
                  </template>
                </el-table-column>

                <el-table-column prop="status" label="转账操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      v-if="scope.row.status == 6"
                      @click="updateTransFerStatus(scope.row.id)"
                      >已转账</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="table-container-1">
        <el-pagination
          background
          layout="prev, sizes, pager, next,total,jumper"
          :total="total"
          :page-size="searchForm.limit"
          :page-sizes="[10, 50, 100, 500, 1000]"
          @current-change="pageSizeChange"
          @size-change="pageLimitChange"
        ></el-pagination>
      </div>

      <!-- <v-table
        :total="total"
        :hide-on-single-page="true"
        :pageSizeChange="pageSizeChange"
      ></v-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VPaySlide from "@/components/VPaySlide.vue"; // @ is an alias to /src
import {
  openAlertError,
  openSuccessMsg,
  openWarnMsg,
  confirmMessageOne,
} from "@/lib/notice";
import VAddress from "@/components/VAddress.vue";
import {
  getTransFer,
  getTransferComment,
  transferComment,
  upDateTransFer,
  upDateTransFer2,
  upDateTransFerBatch,
} from "@/service/order";
import OpenFile from "@/lib/openFile";
import { upLoadImage } from "@/service/uploadImg";
import { addBank, getBank, deleteBank } from "@/service/order";
import { completeImgUrl } from "@/lib/helper";
import VTable from "@/components/VTable.vue"; // @ is an alias to /src
import { dcTransferData } from "@/service/workOrder";
import { dateFormate } from "@/lib/time";

let fileOpener2 = new OpenFile({
  multiple: false,
});

@Component({
  components: {
    VPaySlide,
    VAddress,
    VTable,
  },
})
export default class AddGoods extends Vue {
  activeName = "first";
  showTransFerModal = false;
  showBtnGuideModal = false;
  showStatusGuideModal = false;
  showFeedBackModal = false;
  showDcModal = false; // 展示导出的模态框
  showDcOneModal = false; // 展示导出的模态框

  total: number = 0;

  feedForm = {
    transfer_id: "",
    type: "1",
    comment: "",
    pic: "",
    parent: 0,
  };

  transFerData = [
    {
      label: "等待转账",
      value: "1",
    },
    {
      label: "已导出",
      value: "2",
    },
  ];

  bankData = [
    {
      label: "光大银行",
      value: "1",
    },
    {
      label: "工商银行",
      value: "2",
    },
    {
      label: "建设银行",
      value: "3",
    },
    {
      label: "中国银行",
      value: "4",
    },
    {
      label: "农业银行",
      value: "5",
    },
    {
      label: "交通银行",
      value: "6",
    },
    {
      label: "招商银行",
      value: "7",
    },
    {
      label: "中信银行",
      value: "8",
    },
    {
      label: "民生银行",
      value: "9",
    },
    {
      label: "广发银行",
      value: "10",
    },
    {
      label: "兴业银行",
      value: "11",
    },
    {
      label: "华夏银行",
      value: "12",
    },
    {
      label: "平安银行",
      value: "13",
    },
    {
      label: "浦发银行",
      value: "14",
    },
    {
      label: "邮政银行",
      value: "15",
    },
    {
      label: "深圳发展银行",
      value: "16",
    },
    {
      label: "恒丰银行",
      value: "17",
    },
    {
      label: "浙商银行",
      value: "18",
    },
    {
      label: "渤海银行",
      value: "19",
    },
  ];

  resultWaitStatusData = [
    {
      label: "待转账",
      value: "0",
    },
  ];

  dcData = [
    {
      label: "全部",
      value: "",
    },
    {
      label: "已导出",
      value: "1",
    },
    {
      label: "未导出",
      value: "0",
    },
  ];

  resultStatusDataOne = [
    {
      label: "已转账",
      value: "1",
    },
    {
      label: "转账失败",
      value: "2",
    },
    {
      label: "转账成功",
      value: "5",
    },
  ];

  resultStatusDataTwo = [
    {
      label: "未到账-待商家回复",
      value: "3",
    },
    {
      label: "未到账-待买手回复",
      value: "4",
    },
  ];

  resultStatusData = [
    {
      label: "待转账",
      value: "0",
    },
    {
      label: "已转账",
      value: "1",
    },
    {
      label: "转账失败",
      value: "2",
    },
    {
      label: "未到账-待商家回复",
      value: "3",
    },
    {
      label: "未到账-待买手回复",
      value: "4",
    },
    {
      label: "转账成功",
      value: "5",
    },
    {
      label: "待退款",
      value: "6",
    },
    {
      label: "已退款",
      value: "7",
    },
  ];

  tkData = [
    {
      label: "待退款",
      value: "6",
    },
    {
      label: "已退款",
      value: "7",
    },
  ];

  waitTransFerData = [
    {
      ordreId: "123456",
      buyerId: "123456",
      goodsOriginalMoney: "12",
      employMoney: "100",
      transferAccountMoney: "100000",
      cashOutName: "100",
      bank_id: "12",
      bank_name: "工商银行",
      bank_detail_name: "郑州市金水路支行",
      waitTransFerStatus: "正常",
      end_time: "2019-12-01",
    },
  ];

  resultTransFerData = [
    {
      ordreId: "123456",
      transferAccountMoney: "100000",
      payAccountBankName: "",
      payAccountBankId: "",
      cashOutBankName: "",
      cashOutBankId: "",
      cashOutName: "100",
      waitTransFerStatus: "正常",
      end_time: "2019-12-01",
    },
  ];

  notTransFerData = [
    {
      ordreId: "123456",
      transferAccountMoney: "100000",
      payAccountBankName: "",
      payAccountBankId: "",
      cashOutBankName: "",
      cashOutBankId: "",
      cashOutDetailBank: "",
      cashOutName: "100",
      waitTransFerStatus: "正常",
      end_time: "2019-12-01",
    },
  ];

  returnMoneyData = [
    {
      ordreId: "123456",
      transferAccountMoney: "100000",
      payAccountBankName: "",
      payAccountBankId: "",
      cashOutBankName: "",
      cashOutBankId: "",
      cashOutDetailBank: "",
      cashOutName: "100",
      waitTransFerStatus: "正常",
      end_time: "2019-12-01",
    },
  ];

  bankForm = {
    bank: "",
    card_no: "",
    name: "",
    address: "",
    pay_password: "",
    bank_address: "", // 开户行
  };

  searchForm = {
    status: "",
    order_number: "",
    dtstart: "",
    dtend: "",
    type: 1,
    page: 1,
    limit: 10,
    is_export: "",
  };

  bankInfo: any = {};
  count = 0;

  searchResultForm = {
    ordreId: "",
    status: "",
    create_time: "",
  };

  multipleSelection: any = [];

  handleSelectionChange(val: any,item:any) {
    this.multipleSelection = val;
  }

  getRowKeys(row:any){
    return row.id;
  }

  pageSizeChange(currentPage: number) {
    this.searchForm.page = currentPage;
    this.search();
  }
  
  // 每页数量分页
  pageLimitChange(sizes: number){
    this.searchForm.limit = sizes
    this.search()
  }

  created() {
    this.searchForm.status = "0";
    this.getTranFerAciton();
    this.getBankInfo();
  }

  getBankInfo() {
    getBank().then((data: any) => {
      if (data && data.data && data.data.bank) {
        this.bankInfo = data.data.bank;
        this.count = data.data.count;
      }
    });
  }

  uploadImagePhoneMain(e: any) {
    fileOpener2.getLocalImage((data) => {
      upLoadImage(data[0].file, "").then((res) => {
        if (res && res.data) {
          this.feedForm.pic = completeImgUrl(res.data.src);
        }
      });
    });
  }

  getTranFerAciton() {
    let para: any = Object.assign({}, this.searchForm);
    if (para.is_export === "") {
      console.log("here here>>");
      delete para.is_export;
    }

    if (para.status == "0") {
      para["otype"] = 1;
    }
    getTransFer(para).then((data: any) => {
      if (data && data.data && data.data.list) {
        this.total = data.data.total;
        this.waitTransFerData = data.data.list;
      }
    });
  }

  getTransRes(status: any) {
    let res = "";
    this.resultStatusData.forEach((item: any) => {
      if (item.value == status) {
        res = item.label;
      }
    });
    return res;
  }

  search() {
    this.getTranFerAciton();
  }

  dateFormate(date: string) {
    return dateFormate(Number(date) * 1000, "yyyy-MM-dd hh:mm");
  }

  // 反馈建议
  feedBack(id: any) {
    this.showFeedBackModal = true;
    this.tempId = id;
    this.transfer_id = id;
    this.getTransferCommentAction();
  }

  closeTransFerModal() {
    this.bankForm = {
      bank_address: "",
      bank: "",
      card_no: "",
      name: "",
      address: "",
      pay_password: "",
    };
    this.showTransFerModal = false;
  }

  openTransFerModal() {
    this.showTransFerModal = true;
  }

  openAlipayGuideModal() {
    this.showBtnGuideModal = true;
  }

  closeAlipayGuideModal() {
    this.showBtnGuideModal = false;
  }

  openStatusModal() {
    this.showStatusGuideModal = true;
  }

  closeStatusModal() {
    this.showStatusGuideModal = false;
  }

  editTarnsferModal() {
    this.openTransFerModal();
  }

  handleTransFerChange() {}

  // 更新转账状态
  updateTransFerStatus(id: any) {
    upDateTransFer(id, 1).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        this.getTranFerAciton();
      }
    });
  }

  // 批量更新状态
  upDateTransFerBatch(ids: any) {
    upDateTransFerBatch(ids).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg(
          "更新成功",
          () => {
            location.reload();
          },
          1000
        );
      }
    });
  }

  // 已经转过账
  hasTransferAcount(id: any) {
    upDateTransFer(id, 7).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        this.search();
      }
    });
  }

  clearFeedForm() {
    this.feedForm = {
      transfer_id: "",
      type: "1",
      comment: "",
      pic: "",
      parent: 0,
    };
  }

  tempId: any = "";

  transfer_id: any = "";
  transferComment: any = [];

  getTransferCommentAction() {
    getTransferComment(this.transfer_id).then((data) => {
      if (data && data.data) {
        this.transferComment = data.data;
      }
    });
  }

  // 买家退款
  buyerTkAction() {
    upDateTransFer(this.tempId, 7).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        this.getTranFerAciton();
      }
    });
  }

  submitFeed() {
    if (!this.feedForm.pic && !this.feedForm.comment) {
      openWarnMsg("请上传截图或上传留言");
      return;
    }
    const feedFormStr = JSON.stringify(this.feedForm);
    this.feedForm.transfer_id = this.tempId;

    transferComment(this.feedForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        this.getTransferCommentAction();
        openSuccessMsg("提交成功");
      } else {
        openAlertError("提交失败");
      }
    });

    // upDateTransFer2(this.tempId, feedFormStr, 4).then((data) => {
    //   if (data && data.origin_data && data.origin_data.code == 1001) {
    //     this.getTranFerAciton();

    //     this.closeFeedBackModal();
    //   }
    // });
  }

  closeFeedBackModal() {
    this.showFeedBackModal = false;
    this.clearFeedForm();
  }

  dcAction() {
    if (this.multipleSelection.length <= 0) {
      openWarnMsg("请至少选中一条数据~");
      return;
    }
    this.openDcModal();
  }

  batchTransFerAction() {
    if (this.multipleSelection.length <= 0) {
      openWarnMsg("请至少选中一条数据~");
      return;
    }

    const ids = this.multipleSelection.map((item: any) => {
      return item.id;
    });
    this.upDateTransFerBatch(ids);
  }

  allCount: any = 0;
  allTransferCount: any = 0;

  multipleSelectionOne: any = [];
  exportType: any = 0;

  doAcOneAction(type: any) {
    this.exportType = type;
    this.allCount = this.multipleSelection.length;
    let count = 0;
    this.multipleSelectionOne = this.multipleSelection.map((item: any) => {
      count = count + Number(item.user_fee) + Number(item.buyer_pay);
      return item.id;
    });
    this.allTransferCount = count;
    this.closeDcModal();
    this.openOneDcModal();
  }

  openDcModal() {
    this.showDcModal = true;
  }

  closeDcModal() {
    this.showDcModal = false;
  }

  openOneDcModal() {
    this.showDcOneModal = true;
  }

  closeOneDcModal() {
    this.showDcOneModal = false;
  }

  timeChangeOne(value: string[] | null) {
    if (value) {
      this.searchForm.dtstart = value[0];
      this.searchForm.dtend = value[1];
    }
  }

  // tab切换
  tabChange(tab: any, event: any) {
    const name = tab.name;
    this.searchForm.page = 1;
    if (name == "first") {
      this.searchForm.status = "0";
      this.getTranFerAciton();
    }
    if (name == "second") {
      this.searchForm.status = "1";
      this.getTranFerAciton();
    }
    if (name == "three") {
      this.searchForm.status = "3";
      this.getTranFerAciton();
    }
    if (name == "four") {
      this.searchForm.status = "7";
      this.getTranFerAciton();
    }
  }

  // 获取省市区接口
  handleSelect(data: any) {
    this.bankForm.address = data;
  }

  saveBank() {
    if (!this.bankForm.bank) {
      openWarnMsg("请选择银行");
      return;
    }

    if (!this.bankForm.name) {
      openWarnMsg("请输入开户人");
      return;
    }

    if (!this.bankForm.card_no) {
      openWarnMsg("请输入银行卡");
      return;
    }

    if (!this.bankForm.address) {
      openWarnMsg("请输入开户地");
      return;
    }

    if (!this.bankForm.bank_address) {
      openWarnMsg("请输入开户行");
      return;
    }

    if (!this.bankForm.pay_password) {
      openWarnMsg("请输入支付密码");
      return;
    }
    addBank(this.bankForm).then((data) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        openSuccessMsg("修改成功");
        this.closeTransFerModal();
        location.reload();
      }
    });
  }

  // 确认导出
  confirmDc() {
    const url = dcTransferData(this.multipleSelectionOne, this.exportType);
    location.href = url;
  }

  deleteOnePic() {
    this.feedForm.pic = "";
  }

  // 删除银行卡
  deleteBank() {
    confirmMessageOne("删除", "是否删除当前银行卡")
      .then(() => {
        deleteBank(this.bankInfo.id).then((data) => {
          if (data && data.origin_data && data.origin_data.code == 1001) {
            openSuccessMsg("删除成功");
            location.reload();
          }
        });
      })
      .catch(() => {
        // on cancel
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

.weight-font {
  font-weight: 600;
}

// input的宽度
.short-input {
  width: 150px;
}

.middle-input {
  width: 300px;
}

.link-font {
  color: #409eff;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: #ff9900;
  }
}

.xs-font {
  color: #4882f0;
}

.zy-weight {
  font-weight: 600;
}

.font-18 {
  font-size: 18px;
}

.font-14 {
  font-size: 14px;
}

.no-border {
  border: none !important;
}

.dz-gif-2 {
  background: url(http://img.baishou123.cn/public/shop/css/img/dianzan1.gif)
    no-repeat 0px center !important;
}

.pay-account_item {
  @include flex(flex-start);
  .pay-account_item_label {
    width: 120px;
    text-align: right;
    font-weight: 600;
  }
  .pay-account_item_content {
    padding-left: 4px;
  }
  align-items: center;
  margin-bottom: 22px;
  .pay-account_input {
    width: 350px;
  }
}

.space-margin-right-20 {
  margin-right: 20px;
}

.el-table td,
.el-table th {
  text-align: center;
}

.transfer-bank-modal {
  .transfer-bank_header {
    text-align: right;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .transfer-bank_form {
    padding: 20px 0px 0px;
    border-bottom: 1px dashed #ddd;
    .transfer-bank_form_header {
      margin-bottom: 10px;
    }
  }
}

.transfer-btng-modal {
  .transfer-btng_item {
    @include flex(flex-start);
    // height: 60px;
    padding: 14px 0px;
    border-bottom: 1px dashed #ddd;
    .transfer-btng_item_left {
      width: 200px;
      @include flex(center);
      align-items: center;
      .transfer-btng_item_left_text {
        color: #4882f0;
      }
      .transfer-btng_item_left_btn {
        padding: 5px 15px;
        border-radius: 5px;
        color: #fff;
      }
      .transfer-btng_item_left_btn_one {
        background: #4882f0;
      }
      .transfer-btng_item_left_btn_two {
        background: #f90;
      }
    }
    .transfer-btng_item_right {
      @include flex(flex-start);
      align-items: center;
      flex: 1;
      color: #000;
      line-height: 20px;
    }
  }
}

.table-data_container {
  margin-top: 10px;
}

.transfer-account-container {
  width: 1400px;
  height: auto;
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

    .wait-transfer-container {
      @include flex(space-between);
      padding: 20px 0px 30px;
      border-bottom: 1px dashed #ddd;
      .wait-transfer-left {
        flex: 1;
        & > p {
          margin-bottom: 10px;
          font-size: 14px;
        }
      }
      .wait-transfer-right {
        width: 350px;
        height: 205px;
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid #ddd;
        background: #f0f0f0;
        font-size: 14px;
        .wait-transfer-right_item {
          background: url(http://img.baishou123.cn/public/shop/css/img/dianzan.gif)
            no-repeat 0px center;
          padding-left: 30px;
          line-height: 38px;
          border-bottom: 1px solid #ddd;
          &:hover {
            cursor: pointer;
            color: #ff9900;
          }
        }
      }
    }

    .wait-transfer-form {
      font-size: 14px;
      padding: 20px 0px;
      .wait-transfer-form_header {
        margin-bottom: 10px;
      }
    }

    .result-transfer-container {
    }
  }

  .shop-operation_btn {
    margin-bottom: 10px;
  }

  .pay-account_item {
    @include flex(flex-start);
    color: #000;
    .pay-account_item_label {
      width: 120px;
      text-align: right;
      font-weight: 600;
    }
    .pay-account_item_content {
      padding-left: 4px;
    }
    align-items: center;
    margin-bottom: 22px;
    .pay-account_input {
      width: 350px;
    }
  }

  .collect-container {
  }
}

.not-pay-transfer-container {
  .not-pay-transfer_text {
    margin-bottom: 10px;
    font-size: 14px;
    color: #000;
  }
  .not-pay-transfer_header {
    padding: 10px 0px;
    border-bottom: 1px dashed #ddd;
    margin-bottom: 15px;
  }

  .not-pay-transfer_table {
    padding: 10px 0px;
  }
}

.comment-content_container {
  width: 800px;
  height: 150px;
  overflow-x: scroll;
  margin-bottom: 15px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #000;
  .comment-content_item {
    width: 780px;
    margin: 0 auto;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
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

.table-container-1 {
    text-align: right;
    margin-top: 20px;
    padding-bottom: 20px;
}
</style>
