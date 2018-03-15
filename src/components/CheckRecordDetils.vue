<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>在建项目详情
      <a slot="right"
         @click="updateCheck" v-show="functionShow">修改</a><a
        slot="right" @click="deleteCheck" v-show="functionShow">删除</a>
    </x-header>
    <scroller>
      <group style="padding-top: 30px;  padding-bottom: 80px;">
        <cell title="检查项目编号" primary="content" :value="checkRecordDetailsObj.ts_ai_Id"></cell>
        <cell title="检查项目ID" primary="content" :value="checkRecordDetailsObj.ts_ai_Item"></cell>
        <cell title="检查时间" primary="content" :value="checkRecordDetailsObj.ts_ai_InspectionTime"></cell>
        <cell title="工程进度" primary="content" :value="checkRecordDetailsObj.ts_ai_ProjectPro"></cell>
        <cell title="现场情况" primary="content" :value="checkRecordDetailsObj.ts_ai_Status"></cell>
        <cell title="处理情况" primary="content" :value="checkRecordDetailsObj.ts_ai_ProcessingStatus"></cell>
        <cell title="检查人员签字" primary="content" :value="checkRecordDetailsObj.ts_ai_Inspector"></cell>
        <cell title="建设单位负责人签字" primary="content" :value="checkRecordDetailsObj.ts_ai_Construction"></cell>
        <cell title="监理单位负责人签字" primary="content" :value="checkRecordDetailsObj.ts_ai_Supervision"></cell>
        <cell title="施工单位负责人签字" primary="content" :value="checkRecordDetailsObj.ts_ai_Engineering"></cell>
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
        <inline-loading></inline-loading>
        <span style="vertical-align:middle;display:inline-block;font-size:14px; color: #fff;">&nbsp;&nbsp;加载中</span>
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
        functionShow: true,
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
            window.location.reload()
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })

      },
      //返回上一层
      goTop(){
        this.$router.push({name:'InspectProject'})
      }
    },
    updated() {
      if (this.checkRecordDetailsObj) {
        this.showLoading = false;
      }
    },
    created() {
      this.showLoading = true;
      if (JSON.parse(sessionStorage.getItem('UserInfo')).ts_ai_Ownership != JSON.parse(sessionStorage.getItem('TeamName'))) {
        this.functionShow = false;
      }
    }
  }
</script>
<style scoped>
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, .3);
  }

  .loading > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .gotop {
    position: absolute;
    left:10px;
    top: 5px;
    color: #fff;
    font-size: 16px;
  }
</style>
