<template>
  <div>
    <x-header style="position: relative;left: 0; top: 0; z-index: 999" :left-options="{showBack: false}"><a
      href="javascript:;" class="gotop" @click="goTop">&lt;返回</a>添加检查基本情况
    </x-header>
    <scroller>
      <group style="padding-top: 40px;">
        <cell title="项目id" :value="insertRecords.data.ts_ai_Item"></cell>
        <calendar
          :readonly="readonly"
          v-model="insertRecords.data.ts_ai_InspectionTime"
          title="检查时间"
          placeholder="选择时间"
        ></calendar>
        <x-textarea title="现场情况" v-model="insertRecords.data.ts_ai_Status" placeholder="请输入"></x-textarea>
        <x-input title="工程进度" v-model="insertRecords.data.ts_ai_ProjectPro" placeholder="请输入"></x-input>
        <x-textarea title="处理情况" v-model="insertRecords.data.ts_ai_ProcessingStatus" placeholder="请输入"></x-textarea>
        <x-input title="检查人员签字" v-model="insertRecords.data.ts_ai_Inspector" placeholder="请输入"></x-input>
        <x-input title="建设单位负责人名字" v-model="insertRecords.data.ts_ai_Construction" placeholder="请输入"></x-input>
        <x-input title="监理单位负责人名字" v-model="insertRecords.data.ts_ai_Supervision" placeholder="请输入"></x-input>
        <x-input title="施工单位负责人名字" v-model="insertRecords.data.ts_ai_Engineering" placeholder="请输入"></x-input>
        <a href="javascript:;" class="file">上传图片
          <input type="file" name="" ref="upload" capture="camera" accept="image/*" multiple>
        </a>
        <!--<div>{{ImageURL}}</div>-->
        <img
          style="display: block;margin-top: 10px;"
          v-for="item in ImageURL"
          width="100%"
          :src="item"
          v-show="ImageURL.length"
        />
      </group>
      <box gap="10px 10px" style="padding-bottom: 80px;">
        <x-button type="primary" :show-loading="isShowLoading" @click.native="addSubmit">提交</x-button>
      </box>
    </scroller>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, XInput, Cell, Group, Calendar, Box, XButton, XTextarea} from 'vux'
  import '../assets/js/lrz.bundle'


  export default {
    computed: mapGetters([]),
    components: {
      XHeader,
      XInput,
      Cell,
      Group,
      Calendar,
      Box,
      XButton,
      XTextarea
    },
    data() {
      return {
        insertRecords: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_ai_InspectionTime": "",
            "ts_ai_Item": "",
            "ts_ai_ProjectPro": "",
            "ts_ai_Status": "",
            "ts_ai_ProcessingStatus": "",
            "ts_ai_Inspector": "",
            "ts_ai_Construction": "",
            "ts_ai_Supervision": "",
            "ts_ai_Engineering": "",
            "ts_ai_ConstructionTeam": "",
            "ts_ai_Picture": ""
          }
        },
        readonly: false,
        isShowLoading: false,
        ImageURL: [],
        fileData: ''
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
            .catch(function (err) {
              // 处理失败会执行
              alert(err)
            })
            .always(function () {
              // 不管是成功失败，都会执行
            });
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
                          if (this.ImageURL != '') {
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
//      添加提交按钮
      addSubmit() {
        this.insertRecords.data.ts_ai_Picture = this.ImageURL.join(',');
        this.$store.dispatch('addCheckRecordSubmit', this.insertRecords)
          .then(() => {
            this.$router.push({name: 'InspectProject'})
          })
      },
      //返回上一层
      goTop() {
        this.$router.push({name: 'InspectProject'})
      }
    },
    created() {
      this.uploaNode();
      this.insertRecords.data.ts_ai_Item = JSON.parse(sessionStorage.getItem('ItemId'));
      this.insertRecords.data.ts_ai_ConstructionTeam = JSON.parse(sessionStorage.getItem('TeamName'));
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

  .file {
    position: relative;
    display: inline-block;
    background: #409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    font-size: 12px;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

</style>
