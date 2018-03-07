<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}">在建项目列表<a slot="right" @click="addProjectSituation">添加</a></x-header>
    <!--数据展示-->
    <scroller>
      <group style="padding-top: 30px;">
        <cell
          v-for="item,index in selectBasicInformationData"
          title="在建项目ID"
          :value="item.ts_ai_Id"
          @click.native="onClick(item.ts_ai_Id)"
          :key="index"
        >
        </cell>
      </group>
    </scroller>
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
  import {Cell, Group, Toast, XHeader, InlineLoading} from 'vux'

  export default {
    computed: mapGetters([
      'selectBasicInformationData',
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
        showLoading: false
      }
    },
    methods: {
      //初始化显示数据
      initData() {
        var selectBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Id": ''
        }
        this.$store.dispatch('initSelectBasicInformation', selectBasicInformation)
          .then(() => {
            this.showLoading = false;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      },
      onClick(id) {
        this.$router.push({name: 'ProjectSituationDetails'})
        sessionStorage.setItem('ItemId', JSON.stringify(id))
      },
      //添加项目
      addProjectSituation() {
        this.$router.push({name: 'AddProjectSituation'})
      }

    },
    mounted() {

    },
    created() {
      this.showLoading = true;
      this.UserData = JSON.parse(sessionStorage.getItem('UserInfo'));
      this.initData();
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
