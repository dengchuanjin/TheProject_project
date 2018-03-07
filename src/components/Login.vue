<template>
  <div>
    <divider style="font-size: 20px;">登录</divider>
    <group>
      <x-input title="账号" name="username" placeholder="请输入账号" v-model="accountValue"></x-input>
      <x-input title="密码" name="userpassworld" placeholder="请输入密码" v-model="passworldValue" type="password"></x-input>
    </group>
    <box gap="10px 10px">
      <x-button :gradients="['#0799F4', '#0000ff']" :show-loading="isShowLoading" @click.native="loginSubmit">登录</x-button>
    </box>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Divider, Group, XInput, XButton, Box,Toast} from 'vux'

  export default {
    components: {
      Divider,
      Group,
      XInput,
      XButton,
      Box,
      Toast
    },
    computed: mapGetters([]),
    data() {
      return {
        accountValue: '',
        passworldValue: '',
        isShowLoading: false,
        showError:false,
        showErrorContent:''
      }
    },
    methods: {
      loginSubmit() {
//        this.isShowLoading=true;
        let loginAccountNumbe = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Login": this.accountValue,
          "ts_ai_Password": this.passworldValue
        }
        this.$store.dispatch('loginSubmit', loginAccountNumbe)
          .then((data) => {
            this.isShowLoading = true;
            this.$router.push({name:'ProjectSituation'})
            sessionStorage.setItem('UserInfo', JSON.stringify(data));
          },err=>{
            this.showError = true;
            this.showErrorContent = err;
          })
      }

    },
  }
</script>
<style scoped>

</style>
