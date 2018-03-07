<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999">在建项目列表</x-header>
    <scroller>
      <group style="padding-top: 40px;">
        <x-input title="项目名称" v-model="insertBasicInformation.data.ts_ai_Name" placeholder="输入项目名称"></x-input>
        <x-input title="项目地址" v-model="insertBasicInformation.data.ts_ai_Objectives" placeholder="输入项目地址"></x-input>
        <x-input title="项目面积(m²)" v-model="insertBasicInformation.data.ts_ai_Area" placeholder="输入项目面积"></x-input>
        <x-input title="项目工程概况" v-model="insertBasicInformation.data.ts_ai_Overview" placeholder="输入项目工程概况"></x-input>
        <x-input title="规划许可" v-model="insertBasicInformation.data.ts_ai_PlanningClearance"
                 placeholder="输入规划许可"></x-input>
        <x-input title="施工许可" v-model="insertBasicInformation.data.ts_ai_ConstructionPermit"
                 placeholder="输入施工许可"></x-input>
        <x-input title="预售许可" v-model="insertBasicInformation.data.ts_ai_PreSaleLicence" placeholder="输入预售许可"></x-input>
        <x-input title="安全施工许可" v-model="insertBasicInformation.data.ts_ai_SecurityClearance"
                 placeholder="输入安全施工许可"></x-input>
        <calendar
          :readonly="readonly"
          v-model="insertBasicInformation.data.ts_ai_StartTime"
          title="项目开始时间"
          placeholder="选择时间"
        ></calendar>
        <calendar
          :readonly="readonly"
          v-model="insertBasicInformation.data.ts_ai_Conclusion"
          title="项目完工时间"
          placeholder="选择时间"
        ></calendar>
        <x-input title="施工大队负责人" v-model="insertBasicInformation.data.ts_ai_BrigadeResponsible"
                 placeholder="输入施工大队负责人"></x-input>
        <x-input title="施工中队负责人" v-model="insertBasicInformation.data.ts_ai_SquadronResponsible"
                 placeholder="输入施工中队负责人"></x-input>
        <x-input title="监管负责人" v-model="insertBasicInformation.data.ts_ai_RegulationResponsible"
                 placeholder="输入监管负责人"></x-input>
        <x-input title="勘察单位" v-model="insertBasicInformation.data.ts_ai_SurveyUnit" placeholder="输入勘察单位"></x-input>
        <x-input title="勘察法人代表" v-model="insertBasicInformation.data.ts_ai_SurveyRepresentative"
                 placeholder="输入勘察法人代表"></x-input>
        <x-input title="勘察法人代表电话" v-model="insertBasicInformation.data.ts_ai_SurveyTelephone"
                 placeholder="输入勘察法人代表电话"></x-input>
        <x-input title="设计单位" v-model="insertBasicInformation.data.ts_ai_DesignUnit" placeholder="输入设计单位"></x-input>
        <x-input title="设计法人代表" v-model="insertBasicInformation.data.ts_ai_DesignRepresentative"
                 placeholder="输入设计法人代表"></x-input>
        <x-input title="设计负责人电话" v-model="insertBasicInformation.data.ts_ai_DesignTelephone"
                 placeholder="输入设计负责人电话"></x-input>
        <x-input title="建设单位" v-model="insertBasicInformation.data.ts_ai_ConstructionUnit"
                 placeholder="输入建设单位"></x-input>
        <x-input title="建设单位法人代表" v-model="insertBasicInformation.data.ts_ai_ConstructionRepresentative"
                 placeholder="输入建设单位法人代表"></x-input>
        <x-input title="建设单位负责人电话" v-model="insertBasicInformation.data.ts_ai_ConstructionTelephone"
                 placeholder="输入建设单位负责人电话"></x-input>
        <x-input title="现场负责人" v-model="insertBasicInformation.data.ts_ai_FieldResponsibility"
                 placeholder="输入现场负责人"></x-input>
        <x-input title="现场负责人电话" v-model="insertBasicInformation.data.ts_ai_LiveTelephone"
                 placeholder="输入现场负责人电话"></x-input>
        <x-input title="施工单位" v-model="insertBasicInformation.data.ts_ai_EngineeringUnit"
                 placeholder="输入施工单位"></x-input>
        <x-input title="施工单位代表" v-model="insertBasicInformation.data.ts_ai_EngineeringRepresentative"
                 placeholder="输入施工单位代表"></x-input>
        <x-input title="施工单位负责人电话" v-model="insertBasicInformation.data.ts_ai_EngineeringTelephone"
                 placeholder="输入施工单位负责人电话"></x-input>
        <x-input title="项目负责人" v-model="insertBasicInformation.data.ts_ai_ProjectResponsibility"
                 placeholder="输入项目负责人"></x-input>
        <x-input title="项目负责人电话" v-model="insertBasicInformation.data.ts_ai_ProjectTelephone"
                 placeholder="输入项目负责人电话"></x-input>
        <x-input title="技术负责人" v-model="insertBasicInformation.data.ts_ai_TechnicalResponsibility"
                 placeholder="输入技术负责人"></x-input>
        <x-input title="技术负责人电话" v-model="insertBasicInformation.data.ts_ai_TechnicalTelephone"
                 placeholder="输入技术负责人电话"></x-input>
        <x-input title="质量管理负责人" v-model="insertBasicInformation.data.ts_ai_QualityManagement"
                 placeholder="输入质量管理负责人"></x-input>
        <x-input title="安全管理负责人" v-model="insertBasicInformation.data.ts_ai_SecurityManagement"
                 placeholder="输入安全管理负责人"></x-input>
        <x-input title="监理单位" v-model="insertBasicInformation.data.ts_ai_SupervisoryUnit"
                 placeholder="输入监理单位"></x-input>
        <x-input title="总监师" v-model="insertBasicInformation.data.ts_ai_DirectorGeneral" placeholder="输入总监师"></x-input>
        <x-input title="总监师电话" v-model="insertBasicInformation.data.ts_ai_DirectorGeneralTelephone"
                 placeholder="输入总监师电话"></x-input>
        <x-input title="监理工程师" v-model="insertBasicInformation.data.ts_ai_SupervisionEngineer"
                 placeholder="输入监理工程师"></x-input>
        <x-input title="监理工程师电话" v-model="insertBasicInformation.data.ts_ai_SupervisionEngineerTelephone"
                 placeholder="输入监理工程师电话"></x-input>
        <x-input title="监理员" v-model="insertBasicInformation.data.ts_ai_Supervisor" placeholder="输入监理工程师电话"></x-input>
        <x-input title="监理员电话" v-model="insertBasicInformation.data.ts_ai_SupervisorTelephone"
                 placeholder="输入监理员"></x-input>
        <x-input title="施工大队" v-model="insertBasicInformation.data.ts_ai_ConstructionTeam"
                 placeholder="输入施工大队"></x-input>
        <x-input title="备注" v-model="insertBasicInformation.data.ts_ai_Remarks" placeholder="输入备注"></x-input>
      </group>
      <box gap="10px 10px">
        <x-button type="primary" :show-loading="isShowLoading" @click.native="addSubmit">提交</x-button>
      </box>
    </scroller>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
    <toast v-model="showSuccess" type="success" :text="showSuccessContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XInput, Group, Box, XButton, XHeader, Toast, Calendar} from 'vux'

  export default {
    computed: mapGetters([]),
    components: {
      XInput,
      Group,
      Box,
      XButton,
      XHeader,
      Toast,
      Calendar
    },
    data() {
      return {
        isShowLoading: false,
        //添加数据对象
        insertBasicInformation: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_Name": "",
            "ts_ai_Objectives": "",
            "ts_ai_Area": "",
            "ts_ai_Overview": "",
            "ts_ai_PlanningClearance": "",
            "ts_ai_ConstructionPermit": "",
            "ts_ai_PreSaleLicence": "",
            "ts_ai_SecurityClearance": "",
            "ts_ai_StartTime": "",
            "ts_ai_Conclusion": "",
            "ts_ai_BrigadeResponsible": "",
            "ts_ai_SquadronResponsible": "",
            "ts_ai_RegulationResponsible": "",
            "ts_ai_SurveyUnit": "",
            "ts_ai_SurveyRepresentative": "",
            "ts_ai_SurveyTelephone": "",
            "ts_ai_DesignUnit": "",
            "ts_ai_DesignRepresentative": "",
            "ts_ai_DesignTelephone": "",
            "ts_ai_ConstructionUnit": "",
            "ts_ai_ConstructionRepresentative": "",
            "ts_ai_ConstructionTelephone": "",
            "ts_ai_FieldResponsibility": "",
            "ts_ai_LiveTelephone": "",
            "ts_ai_EngineeringUnit": "",
            "ts_ai_EngineeringRepresentative": "",
            "ts_ai_EngineeringTelephone": "",
            "ts_ai_ProjectResponsibility": "",
            "ts_ai_ProjectTelephone": "",
            "ts_ai_TechnicalResponsibility": "",
            "ts_ai_TechnicalTelephone": "",
            "ts_ai_QualityManagement": "",
            "ts_ai_SecurityManagement": "",
            "ts_ai_SupervisoryUnit": "",
            "ts_ai_DirectorGeneral": "",
            "ts_ai_DirectorGeneralTelephone": "",
            "ts_ai_SupervisionEngineer": "",
            "ts_ai_SupervisionEngineerTelephone": "",
            "ts_ai_Supervisor": "",
            "ts_ai_SupervisorTelephone": "",
            "ts_ai_ConstructionTeam": "",
            "ts_ai_Remarks": ""
          }
        },
        showError: false,
        showSuccess: false,
        showErrorContent: '',
        showSuccessContent: '',
        readonly: false,
      }
    },
    methods: {
      addSubmit() {
        this.$store.dispatch('addSubmitData', this.insertBasicInformation)
          .then(suc => {
            this.showSuccessContent = suc;
            this.showSuccess = true;
            this.$router.push({name: 'ProjectSituation'})
          }, err => {
            this.showErrorContent = err;
            this.showError = true;
          })
      }
    }
  }
</script>
<style scoped>
</style>
