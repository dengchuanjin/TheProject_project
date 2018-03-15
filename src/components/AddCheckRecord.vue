<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999":left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>添加检查基本情况</x-header>
    <scroller>
      <group style="padding-top: 40px;">
        <cell title="项目id" :value="insertRecords.data.ts_ai_Item"></cell>
        <calendar
          :readonly="readonly"
          v-model="insertRecords.data.ts_ai_InspectionTime"
          title="检查时间"
          placeholder="选择时间"
        ></calendar>
        <x-textarea title="现场情况" v-model="insertRecords.data.ts_ai_Status" placeholder="请输入"></x-textarea>
        <x-input title="工程进度" v-model="insertRecords.data.ts_ai_ProjectPro" placeholder="请输入"></x-input>
        <x-textarea title="处理情况" v-model="insertRecords.data.ts_ai_ProcessingStatus" placeholder="请输入"></x-textarea>
        <x-input title="检查人员签字" v-model="insertRecords.data.ts_ai_Inspector" placeholder="请输入"></x-input>
        <x-input title="建设单位负责人名字" v-model="insertRecords.data.ts_ai_Construction" placeholder="请输入"></x-input>
        <x-input title="监理单位负责人名字" v-model="insertRecords.data.ts_ai_Supervision" placeholder="请输入"></x-input>
        <x-input title="施工单位负责人名字" v-model="insertRecords.data.ts_ai_Engineering" placeholder="请输入"></x-input>
      </group>
      <box gap="10px 10px" style="padding-bottom: 40px;">
        <x-button type="primary" :show-loading="isShowLoading" @click.native="addSubmit">提交</x-button>
      </box>
    </scroller>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, XInput, Cell, Group, Calendar, Box, XButton, XTextarea} from 'vux'

  export default {
    computed: mapGetters([]),
    components: {
      XHeader,
      XInput,
      Cell,
      Group,
      Calendar,
      Box,
      XButton,
      XTextarea
    },
    data() {
      return {
        insertRecords: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_InspectionTime": "",
            "ts_ai_Item": "",
            "ts_ai_ProjectPro": "",
            "ts_ai_Status": "",
            "ts_ai_ProcessingStatus": "",
            "ts_ai_Inspector": "",
            "ts_ai_Construction": "",
            "ts_ai_Supervision": "",
            "ts_ai_Engineering": "",
            "ts_ai_ConstructionTeam": "",
          }
        },
        readonly:false,
        isShowLoading: false,
      }
    },
    methods: {
      initData() {
      },
      search() {
        this.initData()
      },
      addSubmit(){
        this.$store.dispatch('addCheckRecordSubmit',this.insertRecords)
          .then(()=>{
            this.$router.push({name:'ProjectSituationDetails'})
          })
      },
      //返回上一层
      goTop(){
        this.$router.push({name:'ProjectSituationDetails'})
      }
    },
    created(){
      this.insertRecords.data.ts_ai_Item = JSON.parse(sessionStorage.getItem('ItemId'));
      this.insertRecords.data.ts_ai_ConstructionTeam = JSON.parse(sessionStorage.getItem('TeamName'));
    }
  }
</script>
<style scoped>

  .gotop {
    position: absolute;
    left:10px;
    top: 5px;
    color: #fff;
    font-size: 16px;
  }
</style>
