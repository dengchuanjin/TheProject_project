/**
 * Created by leibo on 17/11/11.
 */
//POST请求
export const POST = (url, data, fn, err) => {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {// code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (xhr == null) {
    alert('您的浏览器不支持AJAX！');
    return;
  }
  let oStr = '';
  for (var key in data) {
    oStr += key + "=" + data[key] + "&";
  }
  ;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(oStr);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
// 本地提示：加载中/处理中
    }
    if (xhr.readyState == 4 && xhr.status == 200) {
      fn && fn(xhr.responseText)
    } else {
      err && err(xhr.status);
    }
  }
}
function toZear(num) {
  return num < 10 ? '0' + num : '' + num;
}
//获取 年-月-日
export const getDateName = (obj, format) => {
  return obj.getFullYear()
    + format + toZear((obj.getMonth() + 1))
    + format + toZear(obj.getDate())
}
//日期格式化
export const dateFormat = (fmt, date) => {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export const IsBackCode = (data, _this) => {
  if (data.backCode === '005' || data.backCode === '001' || data.backCode === '002' || data.backCode === '003' || data.backCode === '004' || data.backCode === '000') {
    _this.$message({
      showClose: true,
      message: data.backResult,
      type: 'error'
    });
  }
};
//POST,Promise请求
export const postPromise = (url, data) => {
  return new Promise(function (relove, reject) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xhr == null) {
      alert('您的浏览器不支持AJAX！');
      return;
    }
    let oStr = '';
    for (var key in data) {
      oStr += key + "=" + data[key] + "&";
    }
    ;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(oStr);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
// 本地提示：加载中/处理中
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        relove(JSON.parse(xhr.responseText))
      }
    }
  })
}

//前一天
export const getBeforeDay = (d,o)=>{
  var m = new Date(d).getTime();
  var c;
  if(!o){
    c= m-86400000;
  }else{
    c= m+86400000;
  }
  var newDate = new Date(c)
  return newDate.getFullYear()+'-'+toZear(newDate.getMonth()+1)+'-'+toZear(newDate.getDate())
}

//从数组中删除错误的值
export const compact = (arr) => arr.filter(Boolean);

export const isCardID = code=>{
  var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
  var tip = "";
  var pass= true;

  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
    tip = "身份证号格式错误";
    pass = false;
  }

  else if(!city[code.substr(0,2)]){
    tip = "地址编码错误";
    pass = false;
  }
  else{
    //18位身份证需要验证最后一位校验位
    if(code.length == 18){
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
      //校验位
      var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++)
      {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if(parity[sum % 11] != code[17]){
        tip = "校验位错误";
        pass =false;
      }
    }
  }
  if(!pass) return {tip,pass,code:400};
  return {tip :"校验位成功",pass :true,code:200}
};
export const isPhone = id=>{
  return /^1[0-9]{10}$/.test(id);
};
