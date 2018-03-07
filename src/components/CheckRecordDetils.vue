<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999">在建项目详情<a slot="right"
                                                                                @click="updateCheck">修改</a><a
      slot="right" @click="deleteCheck">删除</a>
    </x-header>
    <scroller>
      <group style="padding-top: 30px;">
        <cell title="检查项目编号" :value="checkRecordDetailsObj.ts_ai_Id"></cell>
        <cell title="检查项目ID" :value="checkRecordDetailsObj.ts_ai_Item"></cell>
        <cell title="检查时间" :value="checkRecordDetailsObj.ts_ai_InspectionTime"></cell>
        <cell title="工程进度" :value="checkRecordDetailsObj.ts_ai_ProjectPro"></cell>
        <cell title="现场情况" :value="checkRecordDetailsObj.ts_ai_Status"></cell>
        <cell title="处理情况" :value="checkRecordDetailsObj.ts_ai_ProcessingStatus"></cell>
        <cell title="检查人员签字" :value="checkRecordDetailsObj.ts_ai_Inspector"></cell>
        <cell title="建设单位负责人签字" :value="checkRecordDetailsObj.ts_ai_Construction"></cell>
        <cell title="监理单位负责人签字" :value="checkRecordDetailsObj.ts_ai_Supervision"></cell>
        <cell title="施工单位负责人签字" :value="checkRecordDetailsObj.ts_ai_Engineering"></cell>
      </group>
    </scroller>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
    <!--删除确认-->
    <div>
      <confirm v-model="showDelete"
               title="是否删除"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;"></p>
      </confirm>
    </div>
    <!--加载中-->
    <div class="loading" v-show="showLoading">
      <p style="text-align:center;">
        <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px; color: #fff;">&nbsp;&nbsp;加载中</span>
      </p>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, Cell, Toast, Confirm, InlineLoading} from 'vux'

  export default {
    computed: mapGetters([
      'checkRecordDetailsObj'
    ]),
    components: {
      XHeader,
      Group,
      Cell,
      Toast,
      Confirm,
      InlineLoading
    },
    data() {
      return {
        showError: false,
        showErrorContent: '',
        showDelete: false,
        showLoading: false,
      }
    },
    methods: {
      //修改
      updateCheck() {
        this.$router.push({name: 'UpdateCheckRecord'})
      },
      //删除
      deleteCheck() {
        this.showDelete = true;
      },
      onCancel() {
        this.showDelete = false;
      },
      onConfirm() {
        let deleteRecords = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Id": this.checkRecordDetailsObj.ts_ai_Id
        }
        this.$store.dispatch('deleteCheck', deleteRecords)
          .then(() => {
            this.$router.push({name: 'ProjectSituationDetails'})
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      }
    },
    updated(){
      if( this.checkRecordDetailsObj ){
        this.showLoading = false;
      }
    },
    created(){
      this.showLoading = true;
    }
  }
</script>
<style scoped>
  .loading {
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 998;
    background: rgba(0,0,0,.3);
  }

  .loading > p {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
