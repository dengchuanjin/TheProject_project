<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999">修改检查基本情况</x-header>
    <scroller>
      <group style="padding-top: 30px;">
        <cell title="检查项目编号" :value="checkRecordDetailsObj.ts_ai_Id"></cell>
        <x-input title="项目id" v-model="checkRecordDetailsObj.ts_ai_Item" placeholder="请输入"></x-input>
        <calendar
          :readonly="readonly"
          v-model="checkRecordDetailsObj.ts_ai_InspectionTime"
          title="检查时间"
          placeholder="选择时间"
        ></calendar>
        <x-input title="现场情况" v-model="checkRecordDetailsObj.ts_ai_Status" placeholder="请输入"></x-input>
        <x-input title="工程进度" v-model="checkRecordDetailsObj.ts_ai_ProjectPro" placeholder="请输入"></x-input>
        <x-input title="处理情况" v-model="checkRecordDetailsObj.ts_ai_ProcessingStatus" placeholder="请输入"></x-input>
        <x-input title="检查人员签字" v-model="checkRecordDetailsObj.ts_ai_Inspector" placeholder="请输入"></x-input>
        <x-input title="建设单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Construction" placeholder="请输入"></x-input>
        <x-input title="监理单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Supervision" placeholder="请输入"></x-input>
        <x-input title="施工单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Engineering" placeholder="请输入"></x-input>
      </group>
      <box gap="10px 10px" style="padding-bottom: 20px;">
        <x-button type="primary" :show-loading="isShowLoading" @click.native="updateCheckRecordSubmit">提交</x-button>
      </box>
    </scroller>
    <!--失败提示-->
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
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
  import {XHeader, Group, Cell, XInput, Calendar, Box, XButton, Toast, InlineLoading} from 'vux'

  export default {
    computed: mapGetters([
      'checkRecordDetailsObj'
    ]),
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Calendar,
      Box,
      XButton,
      Toast,
      InlineLoading
    },
    data() {
      return {
        readonly: false,
        isShowLoading: false,
        showError: false,
        showErrorContent: '',
        showLoading: false,
      }
    },
    methods: {
      updateCheckRecordSubmit() {
        var updateRecords = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.checkRecordDetailsObj
        }
        this.$store.dispatch('updateCheckRecordSubmit', updateRecords)
          .then(() => {
            this.$router.push({name: 'CheckRecordDetils'});
            this.isShowLoading = true;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      }
    },
    mounted() {
      if (this.checkRecordDetailsObj) {
        this.showLoading = false;
      }
    },
    updated() {
      if (this.selectBasicInformationData[0]) {
        this.showLoading = false;
      }
    },
    created() {
      this.showLoading = true;
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
</style>
