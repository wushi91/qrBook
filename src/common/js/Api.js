// var host ='http://192.168.0.104:8080'
// vae host:'.',//上线
// var host = 'http://localhost:8080'
var host = ''
// const host = 'http://192.168.2.119:8080'

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
  get_forget_code_url: host + '/rentBook/landlord/getResetCode.do',
  // 账本相关
  get_all_book_url: host + '/rentBook/book/AllUserBooks.do',
  get_unused_book_url: host + '/rentBook/house/findIdleHouse.do',
  get_outdate_book_url: host + '/rentBook/book/selectOverdue.do',
  to_add_book_url: host + '/rentBook/house/addHousing.do',
  to_edit_book_url:host+'/rentBook/update/updateAddress.do',
  to_delete_book_url:host+'/rentBook/update/DelLedgers.do',

  //租客相关
  to_add_renter_url:host+'/rentBook/book/addBook.do',
  get_renter_detail_url:host+'/rentBook/book/detail.do',
  to_edit_renter_url:host+'/rentBook/update/updateTenantInfo.do',
  to_delete_renter_url:host+'/rentBook/checkOut/status.do',



  //我的账单
  get_all_bill_url:host+'/rentBook/book/AllSettle.do',
  get_pay_bill_url:host+'/rentBook/book/selectSettle.do',
  get_nopay_bill_url:host+'/rentBook/book/selectSettle.do',
  get_bill_detail_url:host+'/rentBook/book/billsDetail.do',


  //交易记录
  get_all_record_url:host+'/rentBook/transact/transactInfo.do',
  get_record_detail_url:host+'/rentBook/transact/transactDetail.do',


  //我的账户
  get_myaccount_detail_url:host+'/rentBook/transact/showAccount.do',
  to_add_bankcard_url:host+'/rentBook/bank/addBank.do',
  get_cash_out_url:host+'/rentBook/payment/userwithdraw.do',
  to_delete_bankcard_url:host+'/rentBook/bank/delBank.do',


  //内置路由
  login_router: '/login',


}
