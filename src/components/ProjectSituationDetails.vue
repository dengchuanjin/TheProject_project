<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>在建项目详情<a slot="right"
                                                                                @click="updateProject"
                                                                                v-show="functionShow">修改</a><a
      slot="right" @click="deleteProject" v-show="functionShow">删除</a>
    </x-header>
    <scroller>
      <!--项目详情-->
      <group style="padding-top: 30px; padding-bottom: 80px;">
        <cell title="在建项目ID" primary="content" :value="showObj.ts_ai_Id"></cell>
        <cell title="施工大队" primary="content" :value="showObj.ts_ai_ConstructionTeam"></cell>
        <cell title="在建项目名称" primary="content" :value="showObj.ts_ai_Name"></cell>
        <cell title="在建项目的地点" primary="content" :value="showObj.ts_ai_Objectives"></cell>
        <cell title="在建项目面积" primary="content">{{showObj.ts_ai_Area}}m<sup>2</sup></cell>
        <cell title="工程大概情况" primary="content" :value="showObj.ts_ai_Overview"></cell>
        <cell title="规划许可" primary="content" :value="showObj.ts_ai_PlanningClearance"></cell>
        <cell title="施工许可" primary="content" :value="showObj.ts_ai_ConstructionPermit"></cell>
        <cell title="预售许可" primary="content" :value="showObj.ts_ai_PreSaleLicence"></cell>
        <cell title="安全生产许可证" primary="content" :value="showObj.ts_ai_SecurityClearance"></cell>
        <cell title="项目开工时间" primary="content" :value="showObj.ts_ai_StartTime"></cell>
        <cell title="项目完工时间" primary="content" :value="showObj.ts_ai_Conclusion"></cell>
        <cell title="施工大队负责人" primary="content" :value="showObj.ts_ai_BrigadeResponsible"></cell>
        <cell title="施工中队负责人" primary="content" :value="showObj.ts_ai_SquadronResponsible"></cell>
        <cell title="监管责任人" primary="content" :value="showObj.ts_ai_RegulationResponsible"></cell>
        <cell title="勘察单位" primary="content" :value="showObj.ts_ai_SurveyUnit"></cell>
        <cell title="勘察法人代表" primary="content" :value="showObj.ts_ai_SurveyRepresentative"></cell>
        <cell title="勘察法人代表电话" primary="content" :value="showObj.ts_ai_SurveyTelephone"></cell>
        <cell title="设计单位" primary="content" :value="showObj.ts_ai_DesignUnit"></cell>
        <cell title="设计法人代表" primary="content" :value="showObj.ts_ai_DesignRepresentative"></cell>
        <cell title="设计法人代表电话" primary="content" :value="showObj.ts_ai_DesignTelephone"></cell>
        <cell title="建设单位" primary="content" :value="showObj.ts_ai_ConstructionUnit"></cell>
        <cell title="建设法人代表" primary="content" :value="showObj.ts_ai_ConstructionRepresentative"></cell>
        <cell title="建设法人代表电话" primary="content" :value="showObj.ts_ai_ConstructionTelephone"></cell>
        <cell title="现场负责人" primary="content" :value="showObj.ts_ai_FieldResponsibility"></cell>
        <cell title="现场负责人电话" primary="content" :value="showObj.ts_ai_LiveTelephone"></cell>
        <cell title="施工单位" primary="content" :value="showObj.ts_ai_EngineeringUnit"></cell>
        <cell title="施工法人代表" primary="content" :value="showObj.ts_ai_EngineeringRepresentative"></cell>
        <cell title="施工法人代表电话" primary="content" :value="showObj.ts_ai_EngineeringTelephone"></cell>
        <cell title="项目负责人" primary="content" :value="showObj.ts_ai_ProjectResponsibility"></cell>
        <cell title="项目负责人电话" primary="content" :value="showObj.ts_ai_ProjectTelephone"></cell>
        <cell title="技术负责人" primary="content" :value="showObj.ts_ai_TechnicalResponsibility"></cell>
        <cell title="技术负责人电话" primary="content" :value="showObj.ts_ai_TechnicalTelephone"></cell>
        <cell title="质量管理负责人" primary="content" :value="showObj.ts_ai_QualityManagement"></cell>
        <cell title="安全管理负责人" primary="content" :value="showObj.ts_ai_SecurityManagement"></cell>
        <cell title="监理单位" primary="content" :value="showObj.ts_ai_SupervisoryUnit"></cell>
        <cell title="总监师" primary="content" :value="showObj.ts_ai_DirectorGeneral"></cell>
        <cell title="总监师电话" primary="content" :value="showObj.ts_ai_DirectorGeneralTelephone"></cell>
        <cell title="监理工程师" primary="content" :value="showObj.ts_ai_SupervisionEngineer"></cell>
        <cell title="监理工程师电话" primary="content" :value="showObj.ts_ai_SupervisionEngineerTelephone"></cell>
        <cell title="监理员" primary="content" :value="showObj.ts_ai_Supervisor"></cell>
        <cell title="监理员电话" primary="content" :value="showObj.ts_ai_SupervisorTelephone"></cell>
        <cell title="备注" primary="content" :value="showObj.ts_ai_Remarks"></cell>
      </group>
      <!--检查基本情况-->
    </scroller>
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
  import {Cell, Group, XHeader, Toast, Confirm, InlineLoading} from 'vux'

  export default {
    computed: mapGetters([
      'selectBasicInformationData'
    ]),
    components: {
      Cell,
      Group,
      XHeader,
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
        showSuccessContent: '',
        showSuccess: false,
        functionShow: true,
        showObj:{},
      }
    },
    methods: {
      initData() {
        //项目详情
        let selectBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_ConstructionTeam": JSON.parse(sessionStorage.getItem('TeamName'))
        }
        this.$store.dispatch('initSelectBasicInformation', selectBasicInformation)
          .then((suc) => {
            this.showLoading = false;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
        //项目检查列表
        let selectRecords = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Item": JSON.parse(sessionStorage.getItem('ItemId'))?JSON.parse(sessionStorage.getItem('ItemId')):''
        }
        this.$store.dispatch("initSelectRecords", selectRecords)
          .then(() => {
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      },
      updateProject() {
        this.$router.push({name: 'UpdateProjectDetils'})
        for(var attr in this.showObj){
          if(this.showObj[attr]==null){
            this.showObj[attr] = ''
          }
        }
        this.$store.commit('initUpdateProject',this.showObj);
      },
      deleteProject() {
        this.showDelete = true;
      },
      onConfirm() {
        let str = JSON.parse(sessionStorage.getItem('ItemId'))
        let deleteBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Id": str ? str : ''
        }
        this.$store.dispatch('deleteProject', deleteBasicInformation)
          .then(() => {
            this.$router.push({name: 'CurrentTeamProject'})
          }, err => {
            this.showErrorContent = err;
            this.showError = true;
          })
      },
      onCancel() {
        this.showDelete = false;
      },


      goTop(){
        this.$router.push({name:'CurrentTeamProject'})
      }
    },
    mounted(){
    },
    created() {
      if (JSON.parse(sessionStorage.getItem('UserInfo')).ts_ai_Ownership != JSON.parse(sessionStorage.getItem('TeamName'))) {
        this.functionShow = false;
      } else {
        this.functionShow = true;
      }
      this.showLoading = true;
      this.initData();
      let _this = this;
      setTimeout(()=>{
        _this.showObj = _this.selectBasicInformationData.filter(item=>{
          if( sessionStorage.getItem('ItemId') == item.ts_ai_Id ){
            return true;
          }
          return false;
        })[0]
      },200);
      this.$parent.showDetils = true;

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
