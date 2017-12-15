
import axios from 'axios'

export default {

  axioGet:function (url, data, code200,codeOther) {
    function then(response) {
      if (response.data.msg === '0') {
        code200(response)
      } else {
        // 接口出错执行
        if(codeOther){
          codeOther(response)
        }else{
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

  saveUserLogin:function (tokenId) {

    localStorage.setItem("tokenId", tokenId);

    // if (isRemember) {
    //   localStorage.setItem("tokenId", tokenId);
    // } else {
    //   localStorage.setItem("tokenId", tokenId);
    //   // localStorage.removeItem("tokenId")
    //   // sessionStorage.setItem("tokenId", tokenId)
    // }
  },

  isUserLogin:function () {

    if(localStorage.getItem("tokenId")===null||localStorage.getItem("tokenId")===''){
      if(sessionStorage.getItem("tokenId")===null||sessionStorage.getItem("tokenId")===''){
        return false
      }
    }
    return true
  },



  userLogout:function () {
      localStorage.removeItem("tokenId")
      sessionStorage.removeItem("tokenId")
      window.location.href = './login'
  }




}
