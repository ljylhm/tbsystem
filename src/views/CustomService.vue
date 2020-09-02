<template>
  <div class="custom-servive_container">
      <div class="custom-header">
          <div class="custom-header_item">新客服工单</div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Header from "@/components/Header.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    Header,
  },
})
export default class Publish extends Vue {
  // 展示模态框的集合
  showSearchShopModal = true;

  status = "first";

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

  tableData = [
    {
      flowType: "",
      keyWord: "",
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

  shopOptions = [
    {
      value: "1",
      label: "淘宝",
      children: [
        {
          value: "11",
          label: "耐克",
        },
        {
          value: "12",
          label: "阿迪",
        },
      ],
    },
  ];

  searchShopForm = {
    type: "",
  };

  addFromSetting = () => {
    const o = {
      flowType: "",
      keyWord: "",
      num: "",
    };
    this.tableData.push(o);
  };

  deleteFromSetting = (index: number) => {
    if (this.tableData.length == 1) return;
    this.tableData.splice(index, 1);
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

.custom-servive_container{
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    .custom-header{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        background: #eee;
        text-align: left;
        .custom-header_item{
            display: inline-block;
            text-align: center;
            padding: 0px 20px;
            background: #4782ef;
            color: #fff;
        }
    }
}
</style>
