import Api from '@/common/js/Api.js'
import MyUtil from '@/common/js/MyUtil.js'
import Mock from '@/common/js/MockData.js'
import axios from 'axios'


var that = this;

export default {

  init: function (context) {
  },

  //请求验证码
  requestGetRegisterCode: function (context, phoneNumber) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
      }
    }
    MyUtil.axioGet(Api.get_register_code_url, data, function (response) {
      console.log(response)
    })
  },

  //校验验证码
  requestCheckRegisterCode: function (context, phoneNumber, password, code) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
        inputverificationCode: code,
      }
    }

    MyUtil.axioGet(Api.check_register_code_url, data, function (response) {
      //校验验证码成功后注册
      that.a.requestToRigister(context, phoneNumber, password)
    })
  },

  //校验验证码成功后注册
  requestToRigister: function (context, phoneNumber, password) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
        password: password
      }
    }

    MyUtil.axioGet(Api.to_register_url, data, function (response) {
      var tokenId = response.data.user_id
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
    })
  },

  //登录
  requestToLogin: function (context, phoneNumber, password) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
        password: password
      }
    }
    MyUtil.axioGet(Api.to_login_url, data, function (response) {
      var tokenId = response.data.user_id
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
    })
  },

  //获取账本list
  requestAccountAllList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestAccountAllList')
    MyUtil.axioGet(Api.get_all_account_url, data, function (response) {

      var accountAllList = response.data.list
      console.log(response.data)
      if (accountAllList.length === 0) {
        context.blank = false
      } else {
        context.blank = false
      }
    })
  },

  //获取账本闲置list
  requestAccountUnusedList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestAccountUnusedList')
    MyUtil.axioGet(Api.get_unused_account_url, data, function (response) {
      console.log(response.data)
    }, function (response) {
      console.log(response.data)
    })
  },

  //获取账本逾期list
  requestAccountOutdateList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestAccountOutdateList')
    MyUtil.axioGet(Api.get_outdate_account_url, data, function (response) {
      console.log(response.data)
    }, function (response) {
      console.log(response.data)
    })
  },

  //新建账本
  requestAddAccount: function (context, userId, province, city, address) {
    let data = {
      params: {
        user_id: userId,
        province: province,
        city: city,
        address: address,
      }
    }
    console.log('requestAddAccount')
    MyUtil.axioGet(Api.to_add_account_url, data, function (response) {
      MyUtil.toastSuccess(context, '添加账本成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //添加租客
  requestAddRenter: function (context, userId, hid, name, phone, start_time, end_time, rent_month, pay_type, pay_time, security_deposit, rent) {
    let data = {
      params: {
        user_id: userId,//房东编号
        hid: hid,//房源编号
        name: name,
        phone: phone,
        start_time: start_time,//起租日期
        end_time: end_time,//截止日期
        rent_month: rent_month,//租期(租凭月数)
        pay_type: pay_type,//交租方式
        pay_time: pay_time,//交租日期
        security_deposit: security_deposit,//房屋押金
        rent: rent,//租金
      }
    }
    console.log('requestAddRenter')
    MyUtil.axioGet(Api.to_add_account_url, data, function (response) {
      MyUtil.toastSuccess(context, '添加租客成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })

  }


}


// requestAccountList: function (context, type, pageNum, pageSize) {
//   let url = ''
//   switch (type) {
//     case 'all':
//       url = Api.get_all_account_url
//       break;
//     case 'unused':
//       url = Api.get_unused_account_url
//       break;
//     case 'outdate':
//       url = Api.get_outdate_account_url
//       break;
//   }
// }












