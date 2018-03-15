<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999">修改个人信息</x-header>
    <group>
      <x-input title="姓名" name="username" v-model="information.ts_ai_Name" placeholder="输入姓名"></x-input>
      <x-input title="密码" name="userpassworld" placeholder="输入新密码" v-model="information.ts_ai_Password"
               type="password"></x-input>
      <x-input title="队伍" name="username" placeholder="输入所属队伍名称"
               v-model="information.ts_ai_Ownership"></x-input>
    </group>
    <box gap="10px 10px">
      <x-button :gradients="['#0799F4', '#0000ff']" :show-loading="isShowLoading"
                @click.native="updateInfromationSubmit">提交
      </x-button>
    </box>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, XInput, XButton, Box, Toast, Cell} from 'vux'

  export default {
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      Box,
      Toast,
      Cell
    },
    computed: mapGetters([]),
    data() {
      return {
        showError: false,
        isShowLoading: false,
        showErrorContent: '',
        information: '',
      }
    },
    methods: {
      updateInfromationSubmit() {
        let updateAccountNumbe = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_Id": this.information.ts_ai_Id,
            "ts_ai_Login": this.information.ts_ai_Login,
            "ts_ai_Name": this.information.ts_ai_Name,
            "ts_ai_Password": this.information.ts_ai_Password,
            "ts_ai_Ownership": this.information.ts_ai_Ownership
          }
        }
        this.$store.dispatch('updateInfromationSubmit', updateAccountNumbe)
          .then(() => {
              this.$router.push({name: 'ProjectSituation'});
            }, err => {
              this.showError = true;
              this.showErrorContent = err;
            }
          )
      }
    },
    created() {
      this.information = JSON.parse(sessionStorage.getItem('UserInfo'));
      this.information.ts_ai_Password = '';
    }
  }
</script>
<style scoped>
</style>
