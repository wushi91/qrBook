import Api from '@/common/js/Api.js'
import MyUtil from '@/common/js/MyUtil.js'
import Mock from '@/common/js/MockData.js'
import axios from 'axios'


let that = this;

let Request = {

  init: function (context) {
  },
  //请求注册验证码
  requestGetRegisterCode: function (context, phoneNumber) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
      }
    }
    MyUtil.axioGet(Api.get_register_code_url, data, function (response) {
      console.log(response)
    },function (response) {
      context.register_code_tip = response.data.msg
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
      context.toRegister()
    },function (response) {
      context.register_code_tip = response.data.msg
    })
  },


  requestGetForgetCode: function (context, phoneNumber) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
      }
    }
    MyUtil.axioGet(Api.get_forget_code_url, data, function (response) {
      console.log(response)
    })
  },

  //重置密码的时候校验手机号
  requestCheckForgetPhone: function (context, phoneNumber, code) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
        inputverificationCode: code,
      }
    }

    console.log('requestCheckForgetPhone')
    MyUtil.axioGet(Api.check_register_code_url, data, function (response) {

      console.log(response)
      context.hasCheckedCode = true
    },function (response) {
      context.forget_code_tip = response.data.msg
    })
  },


  //重置密码并登录17704044644-18221157142
  requestChangePasswordAndLogin: function (context, phoneNumber, password) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
        password: password,
      }
    }

    console.log('requestChangePasswordAndLogin')
    MyUtil.axioGet(Api.to_modify_password_url, data, function (response) {

      console.log(response)
      let tokenId = response.data.user_id
      let userPhone = response.data.userPhone
      MyUtil.savePhoneNum(userPhone)
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
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

    console.log('注册')
    MyUtil.axioGet(Api.to_register_url, data, function (response) {

      console.log(response.data)
      let tokenId = response.data.user_id
      let userPhone = response.data.userPhone
      MyUtil.savePhoneNum(userPhone)
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
    },function (response) {
      context.register_code_tip = response.data.msg
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
      let tokenId = response.data.user_id
      let userPhone = response.data.userPhone
      MyUtil.savePhoneNum(userPhone)
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
    },function (response) {
      // context.login_phonenum_tip='账户或密码不正确'
      context.login_password_tip='账户或密码不正确'

    })
  },

  //获取账本list
  requestBookAllList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestBookAllList')
    MyUtil.axioGet(Api.get_all_book_url, data, function (response) {

      console.log('返回的data')
      console.log(response.data)
      // var unusedList = response.data.Nolist
      // var usedList = response.data.list
      //闲置的房源
      var list = response.data.Nolist.concat(response.data.list)//接口是返回两个数组过来的，这里是连接

      if (list.length === 0) {
        context.blank = true
      } else {
        context.blank = false
      }
      context.headerData = MyUtil.getHeaderData('book-all')
      context.tableData = MyUtil.getTableData(list)

    })
  },

  //获取账本闲置list
  requestBookUnusedList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestBookUnusedList')
    MyUtil.axioGet(Api.get_unused_book_url, data, function (response) {
      console.log('闲置数据返回')
      console.log(response.data)
      var list = response.data.Nolist
      context.headerData = MyUtil.getHeaderData('book-unused')
      context.tableData = MyUtil.getTableData(list)
    })
  },

  //获取账本逾期list
  requestBookOutdateList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestBookOutdateList')
    MyUtil.axioGet(Api.get_outdate_book_url, data, function (response) {
      console.log('逾期数据返回')
      console.log(response.data)

      var list = response.data.list
      context.headerData = MyUtil.getHeaderData('book-outdate')
      context.tableData = MyUtil.getTableData(list)
    })
  },

  //新建账本
  requestAddBook: function (context, userId, province, city, address) {
    let data = {
      params: {
        user_id: userId,
        province: province,
        city: city,
        address: address,
      }
    }
    console.log('requestAddBook')
    MyUtil.axioGet(Api.to_add_book_url, data, function (response) {
      MyUtil.toastSuccess(context, '添加账本成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //编辑账本
  requestEditBook: function (context, userId,houseId, province, city, address) {
    let data = {
      params: {
        // user_id: userId,
        hid:houseId,
        province: province,
        city: city,
        address: address,
      }
    }
    console.log('requestEditBook')
    MyUtil.axioGet(Api.to_edit_book_url, data, function (response) {
      MyUtil.toastSuccess(context, '保存成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    },function (response) {
      console.log(response)
    })
  },

  //删除账本
  requestDeleteBook: function (context,houseId,bookId) {
    let data = {
      params: {
        // user_id: userId,
        hid:houseId,
        id:bookId,

      }
    }

    console.log(bookId)
    console.log('requestDeleteBook')
    MyUtil.axioGet(Api.to_delete_book_url, data, function (response) {
      MyUtil.toastSuccess(context, '删除成功', 800)
      context.refreshTableData()
    })
  },

  //房客详情
  requestRenterDeatil: function (context, bookId) {
    let data = {
      params: {
        id: bookId,
      }
    }
    console.log('requestRenterDeatil')
    MyUtil.axioGet(Api.get_renter_detail_url, data, function (response) {

      console.log('租客詳情')
      console.log(response.data)
      let renter = response.data.list

      context.houseId = renter.hid
      context.BookId = renter.id
      context.renterName = renter.name
      context.renterPhone = renter.phone
      context.rentStartDate = new Date(renter.start_time)
      context.rentOverDate = new Date(renter.end_time)
      context.rentLength = renter.rent_month
      context.rentPayWay = renter.pay_type
      context.rentPayDate = renter.pay_time
      context.yaJinMoney = renter.security_deposit
      context.rentMoney = renter.rent

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

    MyUtil.axioGet(Api.to_add_renter_url, data, function (response) {
      MyUtil.toastSuccess(context, '添加租客成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //编辑租客
  requestEditRenter: function (context, userId, BookId,hid, name, phone, start_time, end_time, rent_month, pay_type, pay_time, security_deposit, rent) {
    let data = {
      params: {
        // user_id: userId,//房东编号
        book_id:BookId,//账本编号
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
    console.log('requestEditRenter')

    MyUtil.axioGet(Api.to_edit_renter_url, data, function (response) {
      MyUtil.toastSuccess(context, '保存成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //删除租客
  requestDeleteRender: function (context,bookId) {
    let data = {
      params: {
        // user_id: userId,
        id:bookId,
      }
    }

    console.log('requestDeleteRender')
    MyUtil.axioGet(Api.to_delete_renter_url, data, function (response) {
      MyUtil.toastSuccess(context, '退房成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //获取所有的账单list
  requestBillAllList: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestBillAllList')
    MyUtil.axioGet(Api.get_all_bill_url, data, function (response) {
      console.log(response.data)
      //闲置的房源
      var list = response.data.list

      if (list.length === 0) {
        context.blank =true
      } else {
        context.blank = false
      }
      context.headerData = MyUtil.getHeaderData('bill-all')
      context.tableData = MyUtil.getTableData(list)

    })
  },

  //获取未结清-已结清账单list
  requestBillByPatStatusList: function (context, userId,padStatus) {
    let data = {
      params: {
        user_id: userId,
        settle:padStatus
      }
    }
    console.log('requestBillByPatStatusList')
    MyUtil.axioGet(Api.get_pay_bill_url, data, function (response) {
      console.log(response.data)
      //闲置的房源
      var list = response.data.list

      context.headerData = MyUtil.getHeaderData('bill-all')
      context.tableData = MyUtil.getTableData(list)

    })
  },

  //账单详情
  requestBillDeatil: function (context, userId,billId) {
    let data = {
      params: {
        user_id: userId,
        id: billId,
      }
    }
    console.log('requestBillDeatil')
    MyUtil.axioGet(Api.get_bill_detail_url, data, function (response) {

      console.log('账单详情')
      console.log(response.data)
      let bill = response.data.list[0]

      context.houseName = bill.address
      context.payDate =bill.pay_time+'号'

      context.billMoney =bill.rent
      context.renterName = bill.name
      context.renterPhone = bill.phone

      context.renterMoneyTime = MyUtil.getFormateDate(bill.start_time)+' - '+MyUtil.getFormateDate(bill.end_time)

      context.isPay = bill.settle==='是'

    })
  },

  //所有交易记录
  requsetRecordAllList:function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requsetRecordAllList')

    MyUtil.axioGet(Api.get_all_record_url, data, function (response) {
      console.log(response.data)

      var list = response.data.list
      if (list.length === 0) {
        context.blank =true
      } else {
        context.blank = false
      }
      context.headerData = MyUtil.getHeaderData('record-all')
      context.tableData = MyUtil.getTableData(list)

    })

  },

  //所有记录详情
  requestRecordDeatil:function (context, userId,recordType,payId) {

    let data = {
      params: {
        user_id: userId,
        abstracts: recordType,//提现 or 收租 or交租
        pay_id:payId
      }
    }

    console.log('requestRecorddeatil')
    MyUtil.axioGet(Api.get_record_detail_url, data, function (response) {

      console.log('所有记录详情')
      console.log(response.data)
      let record = response.data.list

      // houseName: '',
      //   :'',
      //   rentMoneyTime:'',
      //   currentStatus:"",
      //   payTime:'',
      //   payWay:'',


      context.houseName= record.address

      context.isTypeRent= record.abstracts==='提现'?false:false
      context.rentMoney=record.balance
      context.rentMoneyTime=MyUtil.getFormateDate(record.start_time)+' - '+MyUtil.getFormateDate(record.end_time),
        context.currentStatus=record.status
      context.payTime=MyUtil.getFormateDate(record.trading_time)
      context.payWay=record.paytype?record.paytype:'微信支付'
      context.orderNum=record.orderid
      context.moneyToCash=record.balance

      //   moneyToCash:''

    })

  },


  //账户详情 余额之类的
  requestMyaccountDeatil: function (context, userId) {
    let data = {
      params: {
        user_id: userId,
      }
    }
    console.log('requestMyaccountDeatil')
    MyUtil.axioGet(Api.get_myaccount_detail_url, data, function (response) {

      console.log('账户详情')
      console.log(response.data)
      context.balance = response.data.list[0].money?response.data.list[0].money:0

      // "cardid":1,    //银行卡编号
      // "user_id":60,  //用户编号
      // "cardholder":"张三",  //持卡人姓名
      // "account":"中国建行", //开户行
      // "card_number":"415556565" //银行卡号
      context.bankCardList =  response.data.banklist


      console.log(context.bankCardList)

    })
  },


  //添加银行卡
  requestAddBankCard: function (context, userId,addcard_bank_username,addcard_bank_name,addcard_bank_cardnum) {
    let data = {
      params: {
        user_id: userId,
        cardholder:addcard_bank_username,//持卡人
        account:addcard_bank_name,//开户行
        card_number:addcard_bank_cardnum//银行卡号
      }
    }
    console.log('requestAddBankCard')
    MyUtil.axioGet(Api.to_add_bankcard_url, data, function (response) {
      MyUtil.toastSuccess(context, '添加成功', 2000)
      context.innerShowDialog = false
      console.log(context.$parent.fetchData())//添加银行卡后刷新数据
    },function (response) {
      MyUtil.toastError(context,"添加失败："+response.data.msg)
    })
  },


  //提现
  requestGetCashOut: function (context, userId,cardId,moneyToCash) {
    let data = {
      params: {
        user_id: userId,
        cardid:cardId,
        balance:moneyToCash,
      }
    }
    console.log('requestGetCashOut')
    MyUtil.axioGet(Api.get_cash_out_url, data, function (response) {
      MyUtil.toastSuccess(context, '提现成功', 2000)
      context.innerShowDialog = false
      context.$parent.fetchData()
    },function (response) {

      MyUtil.toastError(context,"提现失败："+response.data.msg)
    })
  },


  //删除银行卡
  requestToDelteteBankCard: function (context, userId,cardId) {
    let data = {
      params: {
        user_id: userId,
        cardid:cardId,
      }
    }
    console.log('requestToDelteteBankCard')
    MyUtil.axioGet(Api.to_delete_bankcard_url, data, function (response) {
      MyUtil.toastSuccess(context, '删除成功', 2000)
      context.innerShowDialog = false
      context.$parent.fetchData()//删除银行卡后刷新数据
    })
  },
}

export default Request


// requestBookList: function (context, type, pageNum, pageSize) {
//   let url = ''
//   switch (type) {
//     case 'all':
//       url = Api.get_all_Book_url
//       break;
//     case 'unused':
//       url = Api.get_unused_Book_url
//       break;
//     case 'outdate':
//       url = Api.get_outdate_Book_url
//       break;
//   }
// }












