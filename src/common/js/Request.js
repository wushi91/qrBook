import Api from '@/common/js/Api.js'
import MyUtil from '@/common/js/MyUtil.js'
import Mock from '@/common/js/MockData.js'
import axios from 'axios'


var that = this;

export default {

  init: function (context) {

  },

  //请求验证码
  requestGetRegisterCode: function (context,phoneNumber) {
    var data = {
      params: {
        phoneNumber:phoneNumber,
      }
    }
    MyUtil.axioGet(Api.get_register_code_url, data, function (response) {
      console.log(response)
    })
  },

  //校验验证码
  requestCheckRegisterCode: function (context,phoneNumber,password,code) {
    var data = {
      params: {
        phoneNumber:phoneNumber,
        inputverificationCode:code,
      }
    }

    MyUtil.axioGet(Api.check_register_code_url, data, function (response) {
      //校验验证码成功后注册
      that.a.requestToRigister(context,phoneNumber,password)
    })
  },

  //校验验证码成功后注册
  requestToRigister:function (context,phoneNumber,password) {
    var data = {
      params: {
        phoneNumber:phoneNumber,
        password:password
      }
    }

    MyUtil.axioGet(Api.to_register_url, data, function (response) {
      console.log(response.data)
    })
  },

  //登录
  requestToLogin:function (context,phoneNumber,password) {
    var data = {
      params: {
        phoneNumber:phoneNumber,
        password:password
      }
    }
    MyUtil.axioGet(Api.to_login_url, data, function (response) {


      console.log(response.data)
      var tokenId = response.data.user_id
      MyUtil.saveUserLogin(tokenId)
    })
  }


}



















