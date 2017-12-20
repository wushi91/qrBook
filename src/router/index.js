import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Login'

import MyBook from '@/pages/index/book/MyBook'
import AddBook from '@/pages/index/book/AddBook'

// import RenterDetail from '@/pages/index/renter/RenterDetail'
import AddRenter from '@/pages/index/renter/AddRenter'

import MyBill from '@/pages/index/bill/MyBill'
import BillDetail from '@/pages/index/bill/BillDetail'

//record
import MyRecord from '@/pages/index/record/MyRecord'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },


    {
      path:'/home',
      redirect:'/book'
    },

    //Book我的账本
    {
      path: '/book',
      component: Index,
      children:[
        {
          path: '',
          name: 'MyBook',
          component: MyBook
        },

        {
          path: 'add',
          name: 'AddBook',
          component: AddBook
        },
        {
          path: 'edit',
          name: 'EditBook',
          component: AddBook
        },
      ]
    },

    //render租客
    {
      path: '/renter',
      component: Index,
      children:[
        {
          path: '',
          redirect:'detail'
        },
        {
          path: 'detail',
          name:'DetailRenter',
          component: AddRenter
        },
        {
          path: 'add',
          name:'AddRenter',
          component: AddRenter
        },
        {
          path: 'edit',
          name:'editRenter',
          component: AddRenter
        },
      ]
    },


    //bill我的账单
    {
      path: '/bill',
      component: Index,
      children:[
        {
          path: '',
          name:'MyBill',
          component: MyBill
        },
        {
          path: 'detail',
          name:'BillDetail',
          component: BillDetail
        },
      ]
    },

    //record交易记录
    {
      path: '/record',
      component: Index,
      children:[
        {
          path: '',
          name:'MyRecord',
          component: MyRecord
        },
        // {
        //   path: 'detail',
        //   name:'BillDetail',
        //   component: BillDetail
        // },
      ]
    },

    //money我的账户
    {
      path: '/money',
      component: Index
    },



  ]
})



