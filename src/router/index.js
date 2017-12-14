import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
