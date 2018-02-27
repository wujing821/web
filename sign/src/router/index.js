import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/components/sign'
import User from '@/components/userCenter'
import Info from '@/components/information'
import Success from '@/components/success'
import Pay from '@/components/pay'
import Agreement from '@/components/agreement'
import SignDetail from '@/components/detail'
import CompanySet from '@/components/companyset'
import Managerset from '@/components/managerset'
import Payment from '@/components/paymentMethod'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/static/',
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/info',
      name: 'personInfo',
      component: Info
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/detail',
      name: 'signDetail',
      component: SignDetail
    },
    {
      path: '/companyset',
      name: 'companySet',
      component: CompanySet
    },
    {
      path: '/managerset',
      name: 'managerset',
      component: Managerset
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    }
  ]
})
