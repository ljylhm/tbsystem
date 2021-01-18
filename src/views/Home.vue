<template>
  <div class="home">
    <el-dialog title="平台公告" :visible.sync="showNoticeModal">
      <div style="padding-bottom: 10px;text-align:left" v-html="noticeContent">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeNoticeModal">确定</el-button>
      </span>
    </el-dialog>

    <div class="home-banner_container">
      <div class="home-board-container">
        <div class="home-board_item">
          <div class="home-board_item_logo"></div>
          <div class="home-board_item_content">
            愉快合作第
            <span class="zy-font">{{
              transformTimeStampToDays(userInfo.created_at) || 0
            }}</span>
            天
          </div>
        </div>

        <div class="home-board_item">
          <div class="home-board_item_logo"></div>
          <div class="home-board_item_content">
            存款：
            <span class="zy-font">{{ userInfo.amount || 0 }}</span
            >元
          </div>
        </div>

        <div class="home-board_item">
          <div class="home-board_item_logo"></div>
          <div class="home-board_item_content">
            待审核订单：
            <span class="zy-font">0</span>个
          </div>
        </div>

        <div class="home-board_item">
          <div class="home-board_item_logo"></div>
          <div class="home-board_item_content">
            待审核评价任务：
            <span class="zy-font">0</span>个
          </div>
        </div>

        <div class="home-board_item">
          <div class="home-board_item_logo"></div>
          <div class="home-board_item_content">
            待审核流量任务：
            <span class="zy-font">0</span>个
          </div>
        </div>

        <div class="home-board_search">
          <div class="home-board_search_content">
            <i class="el-icon-search"></i>
            已隐藏任务数： 0个
          </div>
          <div class="home-board_search_board">点我查看</div>
        </div>
      </div>
    </div>

    <div class="ad-container">
      <div class="ad-content">
        <div class="ad-item">
          <div class="ad-item_header">发布任务</div>
          <div class="ad-item_content">
            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-alarm-clock"></i>
              </div>
              <div
                class="ad-logo_item_content"
                @click="toPage('/missionManage')"
              >
                销量任务
              </div>
            </div>

            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-chat-line-round"></i>
              </div>
              <div class="ad-logo_item_content" @click="toPage('/commentList')">
                评价管理
              </div>
            </div>

            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-view"></i>
              </div>
              <div class="ad-logo_item_content" @click="toPage('/rules')">
                收费标准
              </div>
            </div>

            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-document"></i>
              </div>
              <div class="ad-logo_item_content">黑名单列表</div>
            </div>
          </div>
        </div>

        <div class="ad-item">
          <div class="ad-item_header" @click="toPage('/platNotice')">
            平台公告
          </div>
          <div class="ad-item_content">
            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-document"></i>
              </div>
              <div class="ad-logo_item_content">销量任务</div>
            </div>
            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-video-play"></i>
              </div>
              <div class="ad-logo_item_content">新手教程</div>
            </div>
            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-mic"></i>
              </div>
              <div class="ad-logo_item_content">所有公告</div>
            </div>
            <div class="ad-logo_item">
              <div class="ad-logo_item_pic">
                <i class="el-icon-user"></i>
              </div>
              <div class="ad-logo_item_content" @click="toPage('/platNotice')">
                邀请好友
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src
import { getUserInfo } from "@/service/user";
import { transformTimeStampToDays } from "@/lib/helper";
import { routerHelper } from "@/router";
import { editIsLogin } from "@/config/common";
import { getNewNotice } from "@/service/notice";

@Component({
  components: {
    HelloWorld,
    Header,
  },
})
export default class Home extends Vue {
  userInfo: any = {};
  showNoticeModal: boolean = false;
  noticeContent: string = "";

  getUserInfoAction() {
    getUserInfo().then((data) => {
      if (data && data.data) {
        this.userInfo = data.data;
      }
    });
  }

  transformTimeStampToDays(time: string) {
    return transformTimeStampToDays(time);
  }

  created() {
    this.getUserInfoAction();
    getNewNotice().then((data: any) => {
      if (data && data.origin_data && data.origin_data.code == 1001) {
        const res = data.data;
        this.noticeContent = res[0].content;
        const IS_LOGIN = localStorage.getItem("ISLOGIN")
        if (IS_LOGIN === "1" && this.noticeContent) {
          localStorage.setItem("ISLOGIN","0")
          this.openNoticeModal()
        }
      }
    });
  }

  toPage(path: string) {
    routerHelper.to(path);
  }

  closeNoticeModal() {
    this.showNoticeModal = false;
  }

  openNoticeModal() {
    this.showNoticeModal = true;
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

.home {
  .home-banner_container {
    width: 100%;
    height: 400px;
    position: relative;
    background: url(http://img.baishou123.cn/data/upload/fen/2020-08-08/5f2eb50562970.png)
      no-repeat center;
    background-size: 100% 100%;
    .home-board-container {
      position: absolute;
      height: auto;
      top: 40px;
      right: 200px;
      background: #fff;
      .home-board_item {
        width: 300px;
        @include setHeight(50px);
        color: #000;
        @include flex(flex-start);
        align-items: center;
        border-bottom: 1px solid #dcdfdf;
        .home-board_item_logo {
          width: 15px;
          height: 15px;
          margin: 0px 15px;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
        .home-board_item_content {
          // font-weight: 600;
        }
      }
      .home-board_search {
        width: 100%;
        height: 60px;
        position: relative;
        color: #fff;
        background: #081535;

        .home-board_search_content {
          width: 100%;
          height: 100%;
          text-align: left;
          padding-left: 40px;
          @include setHeight(60px);
        }
        .home-board_search_board {
          position: absolute;
          width: 80px;
          text-align: center;
          cursor: pointer;
          height: 100%;
          top: 0px;
          right: 0px;
          box-sizing: border-box;
          padding: 12px 20px;
          color: #fff;
          background: red;
        }
      }
    }
  }

  .ad-container {
    margin-top: 20px;
    @include flex(center);
    .ad-content {
      width: 1200px;
      @include flex(space-between);
      .ad-item {
        width: 570px;
        .ad-item_header {
          @include setHeight(40px);
          background: #4882f0;
          color: #fff;
          font-size: 14px;
        }
        .ad-item_content {
          @include flex(space-between);
          border: 1px solid #ddd;
          padding: 20px;
          .ad-logo_item {
            width: 110px;
            height: 120px;
            background: #eee;
            cursor: pointer;
            .ad-logo_item_pic {
              margin-top: 30px;
              & > i {
                font-size: 30px;
              }
            }
            .ad-logo_item_content {
              text-align: center;
              color: #000;
              margin-top: 12px;
              font-size: 14px;
              &:hover {
                color: #4882f0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
