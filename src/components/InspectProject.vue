<template>
  <div>
    <x-header
      style="position: relative;left: 0; top: 0; z-index: 999"
      :left-options="{showBack: false}">
      <a
        href="javascript:;"
        class="gotop"
        @click="goTop">&lt;返回</a>
      检查基本情况
      <a
        slot="right"
        @click="addSelectRecords"
        v-show="functionShow"
      >添加</a>
    </x-header>
    <scroller>
      <group style="padding-top: 30px; padding-bottom: 30px;">
        <cell
          v-for="item,index in selectRecordsData"
          title="检查时间"
          :value="item.ts_ai_InspectionTime"
          @click.native="onClick(item.ts_ai_Id)"
          :key="index"
        >
        </cell>
      </group>
    </scroller>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, Cell} from 'vux'

  export default {
    computed: mapGetters([
      'selectRecordsData'
    ]),
    components: {
      XHeader,
      Group,
      Cell
    },
    data() {
      return {
        functionShow: true
      }
    },
    methods: {
      addSelectRecords() {
        this.$router.push({name: 'AddCheckRecord'})
      },
      goTop(){
        this.$router.push({name: 'ProjectSituationDetails'})
      },
      onClick(id) {
        this.$store.commit('checkRecordDetails', id)
        this.$router.push({name: 'CheckRecordDetils'})
      },
    },
    created(){
      if (JSON.parse(sessionStorage.getItem('UserInfo')).ts_ai_Ownership != JSON.parse(sessionStorage.getItem('TeamName'))) {
        this.functionShow = false;
      }
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
    }
  }
</script>
<style scoped>
  .gotop {
    position: absolute;
    left: 10px;
    top: 5px;
    color: #fff;
    font-size: 16px;
  }
</style>
