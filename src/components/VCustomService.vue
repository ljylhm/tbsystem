<template>
  <div>
    <el-dialog :visible.sync="showListItem" :title="'发起工单'" width="500px">
      <el-form :v-model="form" :inline="true">
        <el-form-item :label="'工单内容：'">
          <div style="width:300px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入工单"
              v-model="form.description"
            >
            </el-input>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="save">确定</el-button>
        <el-button type="primary" @click="close">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { openSuccessMsg, openWarnMsg } from '@/lib/notice';
import { addWorkItem } from '@/service/order';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VCustomService extends Vue {
  @Prop() private visible!: boolean; // 感叹号表示必选
  @Prop() private order_id!: any
  @Prop() private onChange!: ()=>void; // 感叹号表示必选

  private get showListItem() {
    return this.visible;
  }

 private get showOrderId() {
    return this.order_id;
}

  form = {
    order_id: "",
    description: "",
  };

  close(){
      this.onChange && this.onChange()
      this.form.description = ""
  }

  save(){
    if(!this.form.description){
        openWarnMsg("请填写工单内容~")
    }else{
        addWorkItem({
          order_id: this.showOrderId,
          description: this.form.description
        }).then(data=>{
            if(data && data.origin_data && data.origin_data.code == 1001){
                 openSuccessMsg("提交成功")
                 this.onChange && this.onChange()
            }
        })
    }
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

.header_container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  background: #eee;
  text-align: left;
  .header-item-active,
  .header-item {
    display: inline-block;
    text-align: center;
    padding: 0px 20px;
    color: #000;
    &:hover {
      cursor: pointer;
    }
  }
  .header-item-active {
    color: #fff;
    background: #4782ef !important;
  }
  .header-item {
    min-width: 200px;
    background: #eeeeee;
  }
}
</style>
