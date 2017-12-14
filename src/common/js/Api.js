
// var host ='http://192.168.0.104:8080'
// vae host:'.',//上线
// var host = 'http://localhost:8080'
var host = '.'

export default {
  indexPage: '/index.html',
  loginPage: '/login.html',

  // 接口
  register_code_url: host + '/rentBook/landlord/getRegistCode.do',


  //内置路由
  login_router: '/login',
}
