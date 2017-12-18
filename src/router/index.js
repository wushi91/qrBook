import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Login'

import MyAccount from '@/pages/index/account/MyAccount'
import AddAccount from '@/pages/index/account/AddAccount'

// import RenterDetail from '@/pages/index/renter/RenterDetail'
import AddRenter from '@/pages/index/renter/AddRenter'

import MyBill from '@/pages/index/bill/MyBill'

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
      redirect:'/account'
    },

    //account我的账本
    {
      path: '/account',
      component: Index,
      children:[
        {
          path: '',
          name: 'MyAccount',
          component: MyAccount
        },

        {
          path: 'add',
          name: 'AddAccount',
          component: AddAccount
        },
        {
          path: 'edit',
          name: 'EditAccount',
          component: AddAccount
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

      ]
    },

    //record交易记录
    {
      path: '/record',
      component: Index
    },

    //money我的账户
    {
      path: '/money',
      component: Index
    },



  ]
})



