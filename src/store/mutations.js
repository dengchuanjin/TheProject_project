import getters from './getters'

const state = {
  selectBasicInformationData: [],//初始化所有项目数据
  selectRecordsData: [],//初始化检查记录表
  checkRecordDetailsObj: {},//检查记录详情
}
const mutations = {
  initSelectBasicInformation(state, data) {
    state.selectBasicInformationData = data;
  },
  initSelectRecords(state, data) {
    state.selectRecordsData = data;
  },
  checkRecordDetails(state, id) {
    state.checkRecordDetailsObj = state.selectRecordsData.filter(item=>{
      if( Number(item.ts_ai_Id) == Number(id) ){
        return true;
      }
      return false;
    })[0]
  }


}

export default {
  mutations,
  getters,
  state
}
