<template>
  <div>
    <div id="wrap">
      <h1>城建工程执法管理系统</h1>
      <input type="text" class="loginNum" placeholder="请输入账号" v-model="accountValue">
      <input type="password" class="loginPassword" placeholder="请输入密码" v-model="passworldValue">
      <button class="loginSumit" @click="loginSubmit">登录</button>
      <a href="javascript:;" class="signIn" @click="signIn">注册账号>></a>
      <strong class="address">泸州市龙马潭区城市管理和行政执法局</strong>
    </div>
    <toast v-model="showError" type="warn" :text="showErrorContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast
    },
    computed: mapGetters([]),
    data() {
      return {
        accountValue: '',
        passworldValue: '',
        showError: false,
        showErrorContent: ''
      }
    },
    methods: {
      loginSubmit() {
        let loginAccountNumbe = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "ts_ai_Login": this.accountValue,
          "ts_ai_Password": this.passworldValue
        }
        this.$store.dispatch('loginSubmit', loginAccountNumbe)
          .then((data) => {
            this.$router.push({name: 'ProjectSituation'})
            sessionStorage.setItem('UserInfo', JSON.stringify(data));
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      },
      signIn() {
        this.$router.push({name: 'SignIn'})
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
  input {
    border: none;
    outline: none;
  }

  h1 {
    font: bold 25px/2 "宋体";
    text-align: center;
    color: #333;
    margin: 0;
    margin-top: 30%;
  }

  #wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    z-index: 1;
    background: url("../assets/bg.jpg") no-repeat right;
    -webkit-background-size: cover;
    background-size: cover;
  }

  .loginNum {
    text-align: center;
    display: block;
    width: 80%;
    margin: auto;
    font: 16px/2 "微软雅黑";
    margin-top: 50px;
    padding: 5px 10px;
    border-radius: 32px;
  }

  .loginPassword {
    text-align: center;
    display: block;
    width: 80%;
    margin: auto;
    font: 16px/2 "微软雅黑";
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 32px;
  }

  .loginSumit {
    display: block;
    width: 70%;
    margin: 30px auto 0;
    background-color: #44f;
    border:none;
    outline: none;
    font: 16px/2 "微软雅黑";
    color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .signIn {
    font:14px/2 "微软雅黑";
    color: #fff;
    display: block;
    text-align: right;
    padding-right:30px;
    margin-top:30px;
    box-sizing: border-box;
  }

  .address {
    display: block;
    margin-top:100px;
    font: bold 16px/2 "宋体";
    color: #fff;
    text-align: center;

  }
</style>
