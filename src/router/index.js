
import Vue from 'vue'

import VueRouter from 'vue-router'

import adminlogin from '../components/adminlogin'
import Home from '../components/home'
import Addfood from '../components/addfood'
import Allfood from '../components/allfood'
import SignUp from '../components/signup'
import LogIn from '../components/login'
import Account from '../components/account'
import EditFood from '../components/editfood'
import Cart from '../components/mycart'
import CheckOut from '../components/checkout'
import Admin from '../components/admin'
import OrderRequest from '../components/orderRequest'
Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path:'/allfood', component:Allfood},
  {path: '/signup', component: SignUp},
  {path: '/login', component: LogIn},
  {path: '/editfood', component:EditFood},
  {path: '/mycart', component: Cart},
  {path: '/checkout', component: CheckOut},
  {path: '/admin', component: Admin, children:[
    {path: 'adminlogin', component: adminlogin},
    {path: 'addfood', component:Addfood},
    {path: 'editfood', component:EditFood},
    {path: 'orderRequest', component:OrderRequest}
  ]},
  {path: '/account/:id?', component: Account},
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router



