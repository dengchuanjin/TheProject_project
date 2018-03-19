<template>
  <div class="wrap">
    <x-header
      style="position: relative;left: 0; top: 0; z-index: 1000"
      :left-options="{showBack: false}"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >在建项目列表

    </x-header>
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
    <div>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="clickMenu"></actionsheet>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Cell, Group, Toast, XHeader, InlineLoading, Flexbox, FlexboxItem, Actionsheet} from 'vux'

  export default {
    computed: mapGetters([
      'selectBasicInformationData',
    ]),
    components: {
      Cell,
      Group,
      Toast,
      XHeader,
      InlineLoading,
      Flexbox,
      FlexboxItem,
      Actionsheet
    },
    data() {
      return {
        UserData: '',
        showError: false,
        showErrorContent: '',
        showLoading: false,
        menus: {
          menu1: '退出登录',
          menu2: '修改个人资料'
        },
        showMenus: false,
      }
    },
    methods: {
      clickMenu(m, n) {
        if (n == '退出登录') {
          this.$router.push({name: 'Login'});
        }
        if (n == '修改个人资料') {
          this.$router.push({name: 'UpdateInformation'});
        }
      },
      //初始化显示数据
      initData() {
        var selectBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_ConstructionTeam": ''
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
      }
    },
    created() {
      if (!sessionStorage.getItem('UserInfo')) {
        this.$router.push({name: 'Login'})
      }
      this.showLoading = true;
      this.UserData = JSON.parse(sessionStorage.getItem('UserInfo'));
      this.initData();
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


</style>
