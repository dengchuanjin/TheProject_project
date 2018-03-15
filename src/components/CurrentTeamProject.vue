<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>{{title + '在建项目列表'}}<a
      slot="right" @click="addProjectSituation" v-show="addShow">添加</a></x-header>
    <!--数据展示-->
    <scroller>
      <group style="padding-top: 30px;  padding-bottom: 80px;">
        <cell
          v-for="item,index in selectBasicInformationData"
          title="在建项目名称"
          :value="item.ts_ai_Name"
          @click.native="onClick(item)"
          :key="index"
        >
        </cell>
      </group>
    </scroller>

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
  import {Cell, Group, Toast, XHeader, InlineLoading} from 'vux'

  export default {
    computed: mapGetters([
      'selectBasicInformationData',
      'changeTeamList',
    ]),
    components: {
      Cell,
      Group,
      Toast,
      XHeader,
      InlineLoading
    },
    data() {
      return {
        UserData: '',
        showError: false,
        showErrorContent: '',
        showLoading: false,
        isTeamList: false,
        addShow: true,
        title: '',
      }
    },
    methods: {
      //初始化显示数据
      initData() {
        var selectBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_ConstructionTeam":this.title
        }
        this.$store.dispatch('initSelectBasicInformation', selectBasicInformation)
          .then(() => {
            this.showLoading = false;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      },
      onClick(item) {
        this.$router.push({name: 'ProjectSituationDetails'})
        sessionStorage.setItem('TeamName', JSON.stringify(item.ts_ai_ConstructionTeam))
        sessionStorage.setItem('ItemId', JSON.stringify(item.ts_ai_Id))
      },
      //添加项目
      addProjectSituation() {
        this.$router.push({name: 'AddProjectSituation'})
      },
      //返回上一层
      goTop(){
        this.$router.push({name:'ProjectSituation'})
      }
    },
    updated(){
      this.title = JSON.parse(sessionStorage.getItem('TeamName'));
      if (JSON.parse(sessionStorage.getItem('UserInfo')).ts_ai_Ownership != this.title) {
        this.addShow = false;
      }else {
        this.addShow = true;
      }

    },
    created() {
      this.title = JSON.parse(sessionStorage.getItem('TeamName'))
      this.showLoading = true;
      this.UserData = JSON.parse(sessionStorage.getItem('UserInfo'));
      this.initData();
      if (JSON.parse(sessionStorage.getItem('UserInfo')).ts_ai_Ownership == this.title) {
        this.addShow = true;
      }else {
        this.addShow = false;
      }
      this.$parent.showDetils = false;
    }
  }
</script>
<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

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
