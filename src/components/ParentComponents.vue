<template>
  <div>
    <div class="changeTeamShow">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="flex-demo" @click.stop="changeTeamShow">执法队<i></i></div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="goParentComponents">在建项目列表</div>
        </flexbox-item>
        <flexbox-item v-show="showDetils">
          <div class="flex-demo" @click="goInspectProject">检查情况</div>
        </flexbox-item>
      </flexbox>
    </div>

    <ul class="teamList" v-show="isTeamList">
      <li v-for="item,index in changeTeamList" :key="index" @click.stop="changeTeamItem(item)">{{item.ts_ai_Ownership}}
      </li>
    </ul>

    <router-view name="User"></router-view>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Flexbox, FlexboxItem} from 'vux'

  export default {
    computed: mapGetters([
      'changeTeamList'
    ]),
    components:{
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        isTeamList: false,
        showDetils: false
      }
    },
    methods: {
      changeTeamShow() {
        if (this.isTeamList) {
          this.isTeamList = false;
        } else {
          this.isTeamList = true;
        }
      },
      changeTeam() {
        let selectCompetence = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_Name": ""
          }
        }
        this.$store.dispatch('changeTeam', selectCompetence)
      },
      changeTeamItem(item) {
        let selectBasicInformation = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_ConstructionTeam":item.ts_ai_Ownership
        }
        this.$store.dispatch('initSelectBasicInformation', selectBasicInformation)
          .then(() => {
            this.showLoading = false;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
        sessionStorage.setItem('TeamName', JSON.stringify(item.ts_ai_Ownership));
        this.$router.push({'name': 'CurrentTeamProject'})
      },
      goParentComponents(){
        this.$router.push({name:'ProjectSituation'})
      },
      goInspectProject(){
        this.$router.push({name:'InspectProject'})
      }
    },
    mounted(){
      document.addEventListener('click',()=>{
        if( this.isTeamList == true ){
          this.isTeamList = false;
        }
      })
    },
    created(){
      this.changeTeam();
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    border-radius: 4px;
    background-clip: padding-box;
    position: relative;
  }
  .changeTeamShow {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .teamList {
    color: #000;
    position: absolute;
    bottom: 40px;
    z-index: 999;
    width: 50%;
    max-height: 100px;
    overflow: auto;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .teamList li {
    width: 100%;
    text-align: center;
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .flex-demo {
    font: 16px/40px "微软雅黑";
  }

  .flex-demo i {
    display: inline-block;
    margin-left: 10px;
    transform: translateY(-40%) rotateZ(45deg);
    width: 5px;
    height: 5px;
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
  }
</style>
