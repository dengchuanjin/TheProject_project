<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999">修改检查基本情况</x-header>
    <scroller>
      <group style="padding-top: 30px;">
        <cell title="检查项目编号" :value="checkRecordDetailsObj.ts_ai_Id"></cell>
        <cell title="项目id" :value="checkRecordDetailsObj.ts_ai_Item"></cell>
        <calendar
          :readonly="readonly"
          v-model="checkRecordDetailsObj.ts_ai_InspectionTime"
          title="检查时间"
          placeholder="选择时间"
        ></calendar>
        <x-textarea title="现场情况" v-model="checkRecordDetailsObj.ts_ai_Status" placeholder="请输入"></x-textarea>
        <x-input title="工程进度" v-model="checkRecordDetailsObj.ts_ai_ProjectPro" placeholder="请输入"></x-input>
        <x-input title="处理情况" v-model="checkRecordDetailsObj.ts_ai_ProcessingStatus" placeholder="请输入"></x-input>
        <x-input title="检查人员签字" v-model="checkRecordDetailsObj.ts_ai_Inspector" placeholder="请输入"></x-input>
        <x-input title="建设单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Construction" placeholder="请输入"></x-input>
        <x-input title="监理单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Supervision" placeholder="请输入"></x-input>
        <x-input title="施工单位负责人名字" v-model="checkRecordDetailsObj.ts_ai_Engineering" placeholder="请输入"></x-input>
        <a href="javascript:;" class="file">上传图片
          <input type="file" name="" ref="upload" accept="image/*" multiple>
        </a>
        <img
          style="display: block; margin-top: 10px;"
          v-for="item in ImageURL"
          width="100%"
          :src="item"
          v-show="ImageURL.length"
        />
        <img v-for="item,index in imgArr" :src="item" :key="index" width="100%" style="margin-top: 20px;">
      </group>
      <box gap="10px 10px" style="padding-bottom: 80px;">
        <x-button type="primary" :show-loading="isShowLoading" @click.native="updateCheckRecordSubmit">提交</x-button>
      </box>
    </scroller>
    <!--失败提示-->
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
  import {XHeader, Group, Cell, XInput, Calendar, Box, XButton, Toast, InlineLoading, XTextarea} from 'vux'

  export default {
    computed: mapGetters([
      'checkRecordDetailsObj'
    ]),
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Calendar,
      Box,
      XButton,
      Toast,
      InlineLoading,
      XTextarea
    },
    data() {
      return {
        readonly: false,
        isShowLoading: false,
        showError: false,
        showErrorContent: '',
        showLoading: false,
        imgArr: [],
        ImageURL: [],
      }
    },
    methods: {
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
      //添加图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i])
                  .then(data => {
                    this.$store.dispatch('uploadAdminImgs', {
                      imageData: data
                    })
                      .then(data => {
                        if (data) {
                          this.ImageURL.push(data.data);
                          if(this.ImageURL != ''){
                            this.imgArr = '';
                          }
                        } else {
                          this.$notify({
                            message: '图片地址不存在!',
                            type: 'error'
                          });
                        }
                      })
                  })
              }
            })
          }
        }, 30)
      },
      //修改提交
      updateCheckRecordSubmit() {
        if( this.ImageURL != '' ){
          this.checkRecordDetailsObj.ts_ai_Picture = this.ImageURL.join(',');
        }
        var updateRecords = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": this.checkRecordDetailsObj
        }
        this.$store.dispatch('updateCheckRecordSubmit', updateRecords)
          .then(() => {
            this.$router.push({name: 'CheckRecordDetils'});
            this.isShowLoading = true;
          }, err => {
            this.showError = true;
            this.showErrorContent = err;
          })
      }
    },
    mounted() {
      if (this.checkRecordDetailsObj) {
        this.showLoading = false;
      }
    },
    updated() {
      if (this.checkRecordDetailsObj) {
        this.showLoading = false;
      }
    },
    created() {
      this.uploaNode();
      this.imgArr = this.checkRecordDetailsObj.ts_ai_Picture.split(',');
      this.showLoading = true;
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

  .file {
    display: block;
    color: #000;
    padding: 20px 0;
  }
</style>
