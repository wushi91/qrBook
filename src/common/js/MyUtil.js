
import axios from 'axios'

export default {

  axioGet:function (url, data, code200) {
    function then(response) {
      if (response.data.msg === 0) {
        code200(response)
      } else {
        // 接口出错执行
      }
    }
    function error(err) {
      // 请求出错执行
    }

    axios.get(url, data).then(then).catch(error)
  },



}
