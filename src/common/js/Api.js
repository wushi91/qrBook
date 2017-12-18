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
  to_register_url: host + '/rentBook/landlord/landlordReg.do',
  // 登录
  to_login_url: host + '/rentBook/landlord/landlordLog.do',
  /*重置密码*/
  to_modify_password_url: host + '/rentBook/landlord/modifyPassword.do',
  // 账本相关
  get_all_account_url: host + '/rentBook/book/AllUserBooks.do',
  get_unused_account_url: host + '/rentBook/house/findIdleHouse.do',
  get_outdate_account_url: host + '/rentBook/book/selectOverdue.do',
  to_add_account_url: host + '/rentBook/house/addHousing.do',

  //租客相关
  to_add_renter_url:host+'/rentBook/book/addBook.do',
  // to_register_url:host+'/rentBook/landlord/landlordReg.do',

  //
  //内置路由
  login_router: '/login',


}
