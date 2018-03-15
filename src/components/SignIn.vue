<template>
  <div>
    <divider style="font-size: 20px; margin-top: 30%;">注册</divider>
    <group style="margin-top: 50px;">
      <x-input title="姓名" name="username" placeholder="输入账号使用人" v-model="insertAccountNumbe.data.ts_ai_Name"></x-input>
      <x-input title="账号" name="username" placeholder="输入添加账号" v-model="insertAccountNumbe.data.ts_ai_Login"></x-input>
      <x-input title="密码" name="userpassworld" placeholder="输入添加密码" v-model="insertAccountNumbe.data.ts_ai_Password" type="password"></x-input>
      <x-input title="队伍" name="username" placeholder="输入所属队伍名称" v-model="insertAccountNumbe.data.ts_ai_Ownership"></x-input>
      <x-input title="密匙" name="username" placeholder="输入约定的注册密匙" v-model="insertAccountNumbe.data.secretKey"></x-input>
    </group>
    <p class="goLogin" @click="goLogin">已有账号!前往登录>></p>
    <box gap="10px 10px">
      <x-button :gradients="['#0799F4', '#0000ff']" :show-loading="isShowLoading" @click.native="signInSubmit">提交
      </x-button>
    </box>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Divider, Group, XInput, XButton, Box, Toast} from 'vux'

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
        showError: false,
        isShowLoading: false,
        showErrorContent: '',
        insertAccountNumbe: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_Login": "",
            "ts_ai_Name": "",
            "ts_ai_Ownership": "",
            "ts_ai_Password": "",
            "secretKey": ""
          }
        }
      }
    },
    methods: {
      signInSubmit() {
        this.$store.dispatch('signInSubmit', this.insertAccountNumbe)
          .then(() => {
              this.$router.push({name: 'Login'});
            }, err => {
              this.showError = true;
              this.showErrorContent = err;
            }
          )
      },
      goLogin() {
        this.$router.push({name: 'Login'})
      }
    },
  }
</script>
<style scoped>
  .goLogin {
    width: 100%;
    text-align: right;
    color: #f60;
    padding-right: 20px;
    box-sizing: border-box;
  }
</style>
