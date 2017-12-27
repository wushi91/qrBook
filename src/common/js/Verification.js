


let phonenum_verifi_reg = /^(((1[0-9]{2})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
let password_verifi_reg = /^(\w){6,16}$/
let messagecode_verifi_reg = /^(\d){6}$/


export default {

  isPhoneNum:function (val) {
    return phonenum_verifi_reg.test(val)
  },


  isPassword:function (val) {
    return password_verifi_reg.test(val)
  },

  isMessageCode:function (val) {
    return messagecode_verifi_reg.test(val)
  }


}



