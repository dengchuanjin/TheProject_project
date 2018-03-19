
import axios from 'axios'

export default {
  //上传图片
  uploadAdminImgs(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          relove(data.data)
        })
    })
  },
  //登录
  loginSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/AccountNumbe/GetValidateByPassword', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化所有项目数据
  initSelectBasicInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/BasicInformation/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
            commit('initSelectBasicInformation', data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加项目
  addSubmitData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/BasicInformation/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改项目
  updateSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/BasicInformation/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除项目
  deleteProject({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/BasicInformation/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //项目检查列表
  initSelectRecords({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/Records/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
            commit('initSelectRecords', data.data)
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加检查基本情况
  addCheckRecordSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/Records/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改检查基本情况
  updateCheckRecordSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/Records/update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除检查基本情况
  deleteCheck({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/Records/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  // 查询队伍列表
  changeTeam({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/AccountNumbe/SelectTest', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('changeTeam', data.data);
            relove();
          } else {
            reject();
          }
        })
    })
  },
  //注册提交
  signInSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/AccountNumbe/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改个人信息
  updateInfromationSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://192.168.3.251/AccountNumbe/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
}
