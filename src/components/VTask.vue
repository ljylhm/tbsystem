<template>
  <div class="pub-container">
    <div class="pub-item_table_header">
      <div style="font-weight: 500">
        增值服务<span class="zy-font"
          >（即日起，增值服务需要收取附加费用，同时要求买手上传相应截图证明）</span
        >
      </div>
    </div>

    <div class="pub-table">
      <el-table :data="tableData">
        <el-table-column prop="name" label="" width="300px" align="center" />

        <el-table-column
          prop="count"
          :label="'数量'"
          width="300px"
          align="center"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.count"
              placeholder="请输入数量"
              type="number"
              :min="0"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="count"
          :label="'单价'"
          width="300px"
          align="center"
        >
          <template slot-scope="scope"> {{ scope.row.money }}/个 </template>
        </el-table-column>

        <el-table-column prop="date" label="费用" align="center" width="200">
          <template slot-scope="scope">
            {{ (form[scope.row.key] * scope.row.count).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { openAlertError } from "@/lib/notice";
import { dateFormate } from "@/lib/time";
// 地址插件的选择
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

interface IEdata {
  label: string;
  value: string | number;
}

const ONE_DAT_TIME = 60 * 60 * 24 * 1000;

const plain_mission = {
  date: "",
  missionNum: 0,
  start_time: "",
  end_time: "",
  over_cancel_time: "",
  disabled: true,
  divide_time: "",
};

@Component
export default class VPublish extends Vue {
  @Prop() private pageSizeChange!: () => void; // 感叹号表示必选
  @Prop() private count!: number; // 感叹号表示必选

  showEasySetting: boolean = false;

  form = {
    scsp: 0,
    scdp: 0,
    jrgwc: 0,
    wwzx: 0,
    lyhq: 0,
  };

  datevalue = "";

  dividePayTime = [
    {
      value: "1",
      label: "1天",
    },
    {
      value: "2",
      label: "2天",
    },
    {
      value: "3",
      label: "3天",
    },
  ];

  tableData = [
    {
      name: "收藏商品",
      money: 0.1,
      key: "scsp",
      count: 0,
    },
    {
      name: "收藏店铺",
      money: 0.1,
      key: "scdp",
      count: 0,
    },
    {
      name: "加入购物车",
      money: 0.1,
      key: "jrgwc",
      count: 0,
    },
    {
      name: "旺旺咨询",
      money: 0.3,
      key: "wwzx",
      count: 0,
    },
    {
      name: "领优惠劵",
      money: 0.1,
      key: "lyhq",
      count: 0,
    },
  ];

  formData = [
    {
      // 发布时间设置
      publish_date: "", // 发布日期
      mission_num: 0, // 发布数量
      start_time: "", // 开始时间
      end_time: "", // 结束时间
      over_time: "", // 超时取消
      divide_time: "", // 间隔支付时间 1 1天 2 2天 3 3天
    },
  ];

  easyOption = {
    start_time: "",
    end_time: "",
    over_time: "",
  };

  handleDividePayTimeChange() {}

  transFormDate(index: number) {
    const t = new Date(Date.now() + index * ONE_DAT_TIME);
    const m = t.getMonth() + 1;
    const d = t.getDate();
    if (index == 0) return `(今天) ${m}月${d}日`;
    return `${m}月${d}日`;
  }

  transFormDateNew(index: number) {
    return dateFormate(Date.now() + index * ONE_DAT_TIME, "yyyy-MM-dd");
  }

  getTableData() {
    return this.tableData;
  }

  getForm() {
    return this.form;
  }

  // 打开一键设置时间
  openEasySettingModal() {
    // openAlertError("任务数不能为0，请设置完毕后再点击该按钮批量设置任务的起止时间关闭").then(data=>{
    //   console.log("data",data)
    // })
    this.showEasySetting = true;
  }

  // 关闭一键设置时间
  closeEasySettingModal() {
    this.showEasySetting = false;
  }
}
</script>

<style scoped lang="scss">
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

.pub-container {
  width: 100%;
  text-align: left;
  .pub-easy-content {
    width: 100%;
    height: auto;
    margin: 10px auto 0px;
    @include flex(flex-start);
    align-items: center;
    & > div {
      max-width: 150px;
      height: 40px;
      flex: 1;
    }
  }
  .time-select-class {
    width: 140px;
  }

  .time-select-class_1 {
    width: 140px;
  }
  .pub-table {
    border: 1px solid #ddd;
  }
}
</style>
