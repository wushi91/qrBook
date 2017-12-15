
// var host ='http://192.168.0.104:8080'
// vae host:'.',//上线
// var host = 'http://localhost:8080'
var host = '.'

export default {
  indexPage: '/index.html',
  loginPage: '/login.html',

  // 接口
  /*注册*/
  get_register_code_url: host + '/rentBook/landlord/getRegistCode.do',
  check_register_code_url: host + '/rentBook/landlord/checkRegisterCode.do',
  to_register_url:host+'/rentBook/landlord/landlordReg.do',

  to_login_url:host+'/rentBook/landlord/landlordLog.do',

  /*重置密码*/
  to_modify_password_url:host+'/rentBook/landlord/modifyPassword.do',
  // to_register_url:host+'/rentBook/landlord/landlordReg.do',
  // to_register_url:host+'/rentBook/landlord/landlordReg.do',
  // to_register_url:host+'/rentBook/landlord/landlordReg.do',

  //内置路由
  login_router: '/login',
}
