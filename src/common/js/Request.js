import Api from '@/common/js/Api.js'
import MyUtil from '@/common/js/MyUtil.js'
import Mock from '@/common/js/MockData.js'
import axios from 'axios'

export default {

  init: function (context) {
  },

  requestRegisterCode: function (context) {

    var url = Api.register_code_url
    var data = {
      params: {
        phoneNumber:context.register_phonenum,
      }
    }

    axios.get(url, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // var data = {
    //   params: {
    //     phoneNumber:context.register_phonenum,
    //   }
    // };
    //
    MyUtil.axioGet(Api.register_code_url, data, function (response) {
      console.log("返回")
      console.log(response)
    })

  },
}



















