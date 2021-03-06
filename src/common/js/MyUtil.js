import axios from 'axios'
import data from '../data/citydata'

export default {

  axioGet: function (url, data, code200, codeOther) {
    function then(response) {
      if (response.data.msg === '0') {
        code200(response)
      } else {
        // 接口出错执行
        if (codeOther) {
          codeOther(response)
        } else {

          console.log('接口出错执行')
          console.log(response.data.msg)
        }

      }
    }

    function error(err) {
      // 请求运行出错执行
      console.log('请求运行出错执行')
      console.log(err)
    }

    axios.get(url, data).then(then).catch(error)
  },

  saveUserLogin: function (tokenId) {

    localStorage.setItem("tokenId", tokenId);

    // if (isRemember) {
    //   localStorage.setItem("tokenId", tokenId);
    // } else {
    //   localStorage.setItem("tokenId", tokenId);
    //   // localStorage.removeItem("tokenId")
    //   // sessionStorage.setItem("tokenId", tokenId)
    // }
  },

  isUserLogin: function () {
    if (localStorage.getItem("tokenId") === null || localStorage.getItem("tokenId") === '') {
      if (sessionStorage.getItem("tokenId") === null || sessionStorage.getItem("tokenId") === '') {
        return false
      }
    }
    return true
  },

  getUserId: function () {
    let userId = localStorage.getItem("tokenId")
    if (!userId) {
      userId = ''
    }
    return userId
  },


  savePhoneNum: function (userPhone) {
    localStorage.setItem("userPhone", userPhone);
  },

  getPhoneNum: function () {

    //没有登录的情况下
    if (!this.isUserLogin()) {
      return ''
    }

    if (localStorage.getItem("userPhone")) {
      return localStorage.getItem("userPhone")
    } else {
      return ''
    }
  },

  userLogout: function (context, toPath) {
    localStorage.removeItem("tokenId")
    sessionStorage.removeItem("tokenId")

    if (!toPath) {
      toPath = '/login'
    }

    this.linkToPath(context, toPath)

  },


  linkToPath: function (context, path) {
    context.$router.push({path: path})
  },

  goPageBack: function (context) {
    context.$router.back(-1)
  },


  toastSuccess: function (context, message, duration) {
    context.$message({showClose: true, message: message, type: 'success', duration: duration});
  },

  toastError: function (context, message) {
    context.$message({showClose: true, message: message, type: 'error'});
  },

  laterTodo: function (todo, millions) {
    setTimeout(function () {
      todo()
    }, millions)
  },

  getNextMonth: function (date,length) {
    let yy = date.getFullYear()
    let mm = date.getMonth()
    let dd = date.getDate()

    let nm= 0//目标月份
    nm = mm+length
    let nd = 0//目标天数
    if(this.monthDay(yy,nm+1)<dd){
      nd = this.monthDay(yy,nm+1)
    }else{
      nd = dd-1
    }

    date.setDate(1)
    date.setMonth(nm)
    date.setDate(nd)
    return date
  },

  monthDay: function (year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);  //这个是都可以兼容的
    var date = new Date(year + "/" + month + "/0")   //IE浏览器可以获取天数，谷歌浏览器会返回NaN
    return d.getDate();
  },

  getHeaderData: function (type) {
    //全部账本allAccountHeaderData
    //闲置账本unusedAccountHeaderData
    //逾期账本outDateHeaderData
    let allBookHeaderData = [
      {label: '房源名称', prob: 'houseName', width: '340px'},
      {label: '租客', prob: 'renterName', width: '138px'},
      {label: '租期', prob: 'rentStartToOver', width: '250px'},
      {label: '每月租金', prob: 'rentMoney', width: '125px'},
    ]
    let unusedBookHeaderData = [
      {label: '房源名称', prob: 'houseName', width: '340px'},
      {label: '租客', prob: 'renterName', width: '138px'},
      {label: '', prob: 'ss', width: '250px'},
      {label: '', prob: 'ss', width: '125px'},
    ]
    let outdateHeaderData = [
      {label: '房源名称', prob: 'houseName', width: '340px'},
      {label: '逾期时间', prob: 'outdateLength', width: '138px'},
      {label: '交租日期', prob: 'rentPayDate', width: '250px'},
      {label: '逾期金额', prob: 'outdateMoney', width: '125px'},]


    let billHeaderData = [
      {label: '房源名称', prob: 'houseName', width: '340px'},
      {label: '租客', prob: 'renterName', width: '138px'},
      {label: '租期', prob: 'rentStartToOver', width: '250px'},
      {label: '每月租金', prob: 'rentMoney', width: '125px'},
      {label: '收租状态', prob: 'payStatus', width: '125px'},
    ]

    let recordHeaderData = [
      {label: '时间', prob: 'recordTime', width: '138px'},
      {label: '名称', prob: 'recordName', width: '340px'},
      {label: '金额', prob: 'recordMoney', width: '250px'},
      {label: '状态', prob: 'recordStauts', width: '125px'},
    ]

    switch (type) {
      case 'book-all':
        return allBookHeaderData
      case 'book-unused':
        return unusedBookHeaderData
      case 'book-outdate':
        return outdateHeaderData
      case 'bill-all':
      case 'bill-pay':
      case 'bill-nopay':
        return billHeaderData
      case 'record-all':
        return recordHeaderData
    }
  },


  getTableData: function (list) {
    //全部账本allAccountHeaderData
    //闲置账本unusedAccountHeaderData
    //逾期账本outDateHeaderData

    let tableData = []
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      let newItem =
        {
          accountId: item.id,

          //房源
          houseId: item.hid,
          houseName: item.address,
          province: item.province,
          city: item.city,


          //租客
          renterName: item.name,
          renterPhone: item.phone,
          rentStartDate: item.start_time,
          rentOverDate: item.end_time,
          rentLength: item.rent_month,
          rentPayWay: item.pay_type,
          rentPayDate: item.pay_time,
          yaJinMoney: item.security_deposit,
          rentMoney: item.rent,

          //逾期
          outdateLength: item.overdueNum,
          outdateMoney: item.rent,

          //自定义字段
          rentStartToOver: this.getFormateDate(item.start_time) + ' - ' + this.getFormateDate(item.end_time),

          isPay: item.settle === '是',
          billId: item.id,

          //
          recordName: item.abstracts + "（" + item.address + "）",
          recordTime: this.getFormateDate(item.trading_time),
          recordMoney: item.balance,
          recordStauts: item.status,
          payId: item.pay_id,
          recordType: item.abstracts,

        }


      // renterName: '流客',
      //   renterPhone: '13822542317',
      //
      //   rentStartDate: new Date(),
      //   rentOverDate: new Date().setMonth(new Date().getMonth()+3),
      //   rentLength: '12',
      //   rentPayWay: '1',
      //   rentPayDate: '12',
      //   yaJinMoney: '5000',
      //   rentMoney: '2500'

      if (item.name) {
        //有租客
        newItem.isUnused = false
      } else {
        newItem.isUnused = true
      }
      tableData.push(newItem)
    }
    return tableData
  },

  getFormateDate: function (time) {
    let date = new Date(time)
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  },

  getCityData:function () {
    return data.CityInfo
  }
}


//
// let tableData = [
//   {houseName: '都市名园D栋66G', renter: '李一飞', rentdate: '2017/12/01-2018/11/30', rentmoney: '5000元', id: '1'},
//   {houseName: '都市名园D栋26G', outdateLength: '李一飞', rentdate: '2017/12/01-2018/11/30', outdateMoney: '5000元', id: '1'},
//   {houseName: '都市名园F栋27K', outdateLength: null, isUnused: true, id: '2'},
//   {houseName: '都市名园D栋26A', outdateLength: '赵磊', paydate: '2017/12/01-2018/11/30', outdateMoney: '215000元', id: '3'},
//   {
//     houseName: '都市名园D栋16G',
//     outdateLength: '刘大磊鹏',
//     rentdate: '2017/12/01-2018/11/30',
//     outdateMoney: '5000元',
//     id: '4'
//   },
//   {
//     houseName: '阳光棕榈园10单元2008',
//     outdateLength: '李一飞',
//     rentdate: '2017/12/01-2018/11/30',
//     outdateMoney: '5000元',
//     id: '5'
//   },]

