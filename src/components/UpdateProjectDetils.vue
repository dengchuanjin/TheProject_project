<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>修改在建项目</x-header>
    <scroller>

      <group style="padding-top: 30px;">
          <x-input title="项目名称" v-model="updateProjectObj.ts_ai_Name"></x-input>
          <x-textarea title="项目地址" v-model="updateProjectObj.ts_ai_Objectives"></x-textarea>
          <x-input title="项目面积(m²)" v-model="updateProjectObj.ts_ai_Area"></x-input>
          <x-textarea title="项目工程概况" v-model="updateProjectObj.ts_ai_Overview"></x-textarea>
          <x-input title="规划许可" v-model="updateProjectObj.ts_ai_PlanningClearance"></x-input>
          <x-input title="施工许可" v-model="updateProjectObj.ts_ai_ConstructionPermit"></x-input>
          <x-input title="预售许可" v-model="updateProjectObj.ts_ai_PreSaleLicence"></x-input>
          <x-input title="安全施工许可" v-model="updateProjectObj.ts_ai_SecurityClearance"></x-input>
          <calendar
            :readonly="readonly"
            v-model="updateProjectObj.ts_ai_StartTime"
            title="项目开始时间"
            placeholder="选择时间"
          ></calendar>
          <calendar
            :readonly="readonly"
            v-model="updateProjectObj.ts_ai_Conclusion"
            title="项目完工时间"
            placeholder="选择时间"
          ></calendar>
          <x-input title="施工大队负责人" v-model="updateProjectObj.ts_ai_BrigadeResponsible"></x-input>
          <x-input title="施工中队负责人" v-model="updateProjectObj.ts_ai_SquadronResponsible"></x-input>
          <x-input title="监管负责人" v-model="updateProjectObj.ts_ai_RegulationResponsible"></x-input>
          <x-input title="勘察单位" v-model="updateProjectObj.ts_ai_SurveyUnit"></x-input>
          <x-input title="勘察法人代表" v-model="updateProjectObj.ts_ai_SurveyRepresentative"></x-input>
          <x-input title="勘察法人代表电话" v-model="updateProjectObj.ts_ai_SurveyTelephone"></x-input>
          <x-input title="设计单位" v-model="updateProjectObj.ts_ai_DesignUnit"></x-input>
          <x-input title="设计法人代表" v-model="updateProjectObj.ts_ai_DesignRepresentative"></x-input>
          <x-input title="设计负责人电话" v-model="updateProjectObj.ts_ai_DesignTelephone"></x-input>
          <x-input title="建设单位" v-model="updateProjectObj.ts_ai_ConstructionUnit"></x-input>
          <x-input title="建设单位法人代表" v-model="updateProjectObj.ts_ai_ConstructionRepresentative"></x-input>
          <x-input title="建设单位负责人电话" v-model="updateProjectObj.ts_ai_ConstructionTelephone"></x-input>
          <x-input title="现场负责人" v-model="updateProjectObj.ts_ai_FieldResponsibility"></x-input>
          <x-input title="现场负责人电话" v-model="updateProjectObj.ts_ai_LiveTelephone"></x-input>
          <x-input title="施工单位" v-model="updateProjectObj.ts_ai_EngineeringUnit"></x-input>
          <x-input title="施工单位代表" v-model="updateProjectObj.ts_ai_EngineeringRepresentative"></x-input>
          <x-input title="施工单位负责人电话" v-model="updateProjectObj.ts_ai_EngineeringTelephone"></x-input>
          <x-input title="项目负责人" v-model="updateProjectObj.ts_ai_ProjectResponsibility"></x-input>
          <x-input title="项目负责人电话" v-model="updateProjectObj.ts_ai_ProjectTelephone"></x-input>
          <x-input title="技术负责人" v-model="updateProjectObj.ts_ai_TechnicalResponsibility"></x-input>
          <x-input title="技术负责人电话" v-model="updateProjectObj.ts_ai_TechnicalTelephone"></x-input>
          <x-input title="质量管理负责人" v-model="updateProjectObj.ts_ai_QualityManagement"></x-input>
          <x-input title="安全管理负责人" v-model="updateProjectObj.ts_ai_SecurityManagement"></x-input>
          <x-input title="监理单位" v-model="updateProjectObj.ts_ai_SupervisoryUnit"></x-input>
          <x-input title="总监师" v-model="updateProjectObj.ts_ai_DirectorGeneral"></x-input>
          <x-input title="总监师电话" v-model="updateProjectObj.ts_ai_DirectorGeneralTelephone"></x-input>
          <x-input title="监理工程师" v-model="updateProjectObj.ts_ai_SupervisionEngineer"></x-input>
          <x-input title="监理工程师电话" v-model="updateProjectObj.ts_ai_SupervisionEngineerTelephone"></x-input>
          <x-input title="监理员" v-model="updateProjectObj.ts_ai_Supervisor"></x-input>
          <x-input title="监理员电话" v-model="updateProjectObj.ts_ai_SupervisorTelephone"></x-input>
          <x-input title="施工大队" v-model="updateProjectObj.ts_ai_ConstructionTeam"></x-input>
          <x-textarea title="备注" v-model="updateProjectObj.ts_ai_Remarks"></x-textarea>
        </group>
      <!--提交按钮-->
      <box gap="10px 10px" style="padding-bottom: 80px;">
        <x-button :gradients="['#0799F4', '#0000ff']" :show-loading="isUpdateLoading" @click.native="updateSubmit">提交
        </x-button>
      </box>
    </scroller>
    <!--失败提示-->
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
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
  import {XInput, Group, XHeader, Calendar, XButton, Box, Toast, InlineLoading, XTextarea} from 'vux'

  export default {
    computed: mapGetters([
      'updateProjectObj'
    ]),
    components: {
      XInput,
      Group,
      XHeader,
      Calendar,
      XButton,
      Box,
      Toast,
      InlineLoading,
      XTextarea
    },
    data() {
      return {
        readonly: false,
        isUpdateLoading: false,
        showError: false,
        showErrorContent: '',
        showLoading: false
      }
    },
    methods: {
//      修改提交
      updateSubmit() {
        let updateBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.updateProjectObj
        }
        this.$store.dispatch('updateSubmit', updateBasicInformation)
          .then(() => {
            this.$router.push({name: 'ProjectSituationDetails'});
            this.isUpdateLoading = true;
          }, err => {
            this.showErrorContent = err;
            this.showError = true;
          })
      },
      //返回上一层
      goTop(){
        this.$router.push({name:'ProjectSituationDetails'})
      }
    },
    mounted(){
      if( this.updateProjectObj ){
        this.showLoading = false;
      }
    },
    created() {
      this.$parent.showDetils = false;
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
  .gotop {
    position: absolute;
    left:10px;
    top: 5px;
    color: #fff;
    font-size: 16px;
  }
</style>
