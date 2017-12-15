import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Login'

import MyAccount from '@/pages/index/account/MyAccount'
import AddAccount from '@/pages/index/account/AddAccount'

import RenterDetail from '@/pages/index/renter/RenterDetail'
import MyBill from '@/pages/index/bill/MyBill'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      name: 'Index',
      component: Index,

      children: [
        {
          path: '/account',
          name: 'MyAccount',
          component: MyAccount
        },
        {
          path: '/addaccount',
          name: 'AddAccount',
          component: AddAccount
        },

        {
          path: '/render',
          name: 'RenterDetail',
          component: RenterDetail
        },
        {
          path: '/bill',
          name: 'MyBill',
          component: MyBill
        },
      ]

    },

  ]
})


// {
//   path: '/account',
//     name: 'MyAccount',
//   component: MyAccount
// },
// {
//   path: '/bill',
//     name: 'MyBill',
//   component: MyBill
// },
