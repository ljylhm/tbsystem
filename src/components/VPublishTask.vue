<template>
  <div class="pub-container">
    <el-dialog
      :visible.sync="showEasySetting"
      title="一键设置时间"
      width="500px"
    >
      <div>
        请设置任务的开始时间和结束时间，所设置的时间会应用到所有设置了任务数的日期。
      </div>

      <div class="pub-easy-content">
        <div>
          <el-time-picker
            class="time-select-class_1"
            placeholder="起始时间"
            v-model="easyOption.start_time"
            format="HH:mm"
            value-format="HH:mm"
          ></el-time-picker>
        </div>
        <div>
          <el-time-picker
            class="time-select-class_1"
            placeholder="结束时间"
            v-model="easyOption.end_time"
            format="HH:mm"
            value-format="HH:mm"
          ></el-time-picker>
        </div>
        <div>
          <el-time-picker
            class="time-select-class_1"
            placeholder="超时取消"
            v-model="easyOption.over_time"
            format="HH:mm"
            value-format="HH:mm"
          ></el-time-picker>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveEasySetting" type="primary">确认提交</el-button>
        <el-button @click="closeEasySettingModal" type="warning"
          >返回修改</el-button
        >
      </span>
    </el-dialog>

    <div class="pub-item_table_header">
      <div>发布时间</div>
      <div>
        <el-radio-group
          v-model="form.publishType"
          @change="handleChange"
          size="small"
        >
          <el-radio label="0">立即发布</el-radio>
          <el-radio label="1">今天平均发布</el-radio>
          <el-radio label="2"
            >多天平均发布</el-radio
          >
          >
        </el-radio-group>
        <el-button
          type="primary"
          round
          size="mini"
          v-if="form.publishType == 2"
          :style="{ marginLeft: '10px' }"
          @click="openEasySettingModal"
          >一键设置时间</el-button
        >
      </div>
    </div>

    <div class="pub-table">
      <el-table :data="tableData">
        <el-table-column
          prop="date"
          label="日期(剩余可发布数)"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <div @click="expressScope(scope.row)">{{ scope.row.date }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="missionNum"
          :label="`任务数(${count})`"
          width="140px"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.missionNum"
              placeholder="请输入数量"
              type="number"
              :disabled="scope.row.disabled"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="start_time"
          label="开始时间"
          width="240px"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-time-picker
                class="time-select-class"
                placeholder="起始时间"
                v-model="scope.row.start_time"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="scope.row.disabled"
              ></el-time-picker>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="结束时间"
          width="240px"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-time-picker
                class="time-select-class"
                placeholder="结束时间"
                v-model="scope.row.end_time"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="scope.row.disabled"
              ></el-time-picker>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="超时取消" align="center">
          <template slot-scope="scope">
            <div>
              <el-time-picker
                class="time-select-class"
                placeholder="超时取消"
                v-model="scope.row.over_cancel_time"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="scope.row.disabled"
              ></el-time-picker>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="间隔支付时间" align="center">
          <template slot-scope="scope">
            <div>
              <el-select
                v-model="scope.row.divide_time"
                placeholder="请选择"
                :disabled="scope.row.disabled"
              >
                <el-option
                  v-for="item in dividePayTime"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { openAlertError } from "@/lib/notice";
import { dateFormate } from '@/lib/time';
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
  divide_time:""
};

@Component
export default class VPublish extends Vue {
  @Prop() private pageSizeChange!: () => void; // 感叹号表示必选
  @Prop() private count!: number; // 感叹号表示必选

  @Watch("count")
  getCount(newVal: number, oldVal: number) {
    if (this.form.publishType == "0") {
      this.$set(this.tableData, 0, {
        ...this.tableData[0],
        missionNum: newVal,
      });
    }
  }

  showEasySetting: boolean = false;

  form = {
    publishType: "0",
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
      date: "",
      missionNum: 0,
      start_time: "",
      end_time: "",
      over_cancel_time: "",
      disabled: true,
      dayDate:"",
      divide_time:""
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

  transFormDateNew(index: number){
    return dateFormate(Date.now() + index * ONE_DAT_TIME,"yyyy-MM-dd")
  }

  expressScope(data: any) {
    console.log(data);
  }

  // 初始化表格的数据
  initTableData() {
    const count = this.count
    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        this.$set(this.tableData, i, {
          ...plain_mission,
          missionNum: count,
          date: this.transFormDate(i),
          dayDate: this.transFormDateNew(i)
        });
      } else {
        this.$set(this.tableData, i, {
          ...plain_mission,
          date: this.transFormDate(i),
          dayDate: this.transFormDateNew(i)
        });
      }
    }
  }

  // 表格数据变成多天平均发布
  initTableTodayData() {
    for (let i = 0; i < 7; i++) {
      const disabled = i == 0 ? false : true;
      this.$set(this.tableData, i, {
        ...plain_mission,
        date: this.transFormDate(i),
        dayDate: this.transFormDateNew(i),
        disabled,
      });
    }
  }

  initTableMoreData() {
    for (let i = 0; i < 7; i++) {
      this.$set(this.tableData, i, {
        ...plain_mission,
        date: this.transFormDate(i),
        dayDate: this.transFormDateNew(i),
        disabled: false,
      });
    }
  }

  created() {
    this.initTableData();
  }

  mounted(){
    this.initTableData();
  }

  // 单选框点击change事件
  handleChange(label: string) {
    // 点击立即发布的按钮
    if (label == "0") {
      this.initTableData();
    } else if (label == "1") {
      this.initTableTodayData();
    } else {
      this.initTableMoreData();
    }
  }

  getTableData(){
    return this.tableData
  }

  getPublishType(){
    return this.form.publishType
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

  // 保存一键设置
  saveEasySetting() {
    console.log("一键设置的配置", this.easyOption);

    if (this.easyOption.start_time) {
      if (!this.easyOption.end_time) {
        openAlertError("请设置结束时间");
        return;
      }

      let start_time = parseInt(this.easyOption.start_time.replace(":", ""));
      let end_time = parseInt(this.easyOption.end_time.replace(":", ""));
      if (end_time < start_time) {
        openAlertError("结束时间须大于开始时间");
        return;
      }

      // 走到这里是设置的差不多了
      this.tableData = this.tableData.map((item) => {
        if (item.missionNum > 0) {
          item.start_time = this.easyOption.start_time;
          item.end_time = this.easyOption.end_time;
          item.over_cancel_time = this.easyOption.over_time;
        }
        return item;
      });
    }
    this.closeEasySettingModal();
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
