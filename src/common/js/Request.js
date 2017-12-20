import Api from '@/common/js/Api.js'
import MyUtil from '@/common/js/MyUtil.js'
import Mock from '@/common/js/MockData.js'
import axios from 'axios'


var that = this;

export default {

  init: function (context) {
  },

  //请求验证码
  requestGetRegisterCode: function (context, phoneNumber) {
    var data = {
      params: {
        phoneNumber: phoneNumber,
      }
    }
    MyUtil.axioGet(Api.get_register_code_url, data, function (response) {
      console.log(response)
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
      that.a.requestToRigister(context, phoneNumber, password)
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

    MyUtil.axioGet(Api.to_register_url, data, function (response) {
      var tokenId = response.data.user_id
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
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
      var tokenId = response.data.user_id
      MyUtil.saveUserLogin(tokenId)
      MyUtil.linkToPath(context, '/')
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
    MyUtil.axioGet(Api.to_edit_Book_url, data, function (response) {
      MyUtil.toastSuccess(context, '保存成功，即将返回', 800)
      MyUtil.laterTodo(function () {
        MyUtil.goPageBack(context)
      }, 1000)
    })
  },

  //删除账本
  requestDeleteBook: function (context,houseId,BookId) {
    let data = {
      params: {
        // user_id: userId,
        hid:houseId,
        id:BookId,

      }
    }

    console.log(BookId)
    console.log('requestDeleteBook')
    MyUtil.axioGet(Api.to_delete_Book_url, data, function (response) {
      MyUtil.toastSuccess(context, '删除成功', 800)

    })
  },


  //房客详情
  requestRenterDeatil: function (context, BookId) {
    let data = {
      params: {
        id: BookId,
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
  requestDeleteRender: function (context,BookId) {
    let data = {
      params: {
        // user_id: userId,
        id:BookId,
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



}


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












