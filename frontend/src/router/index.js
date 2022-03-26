import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PmDash from '../views/PmDash.vue'
import VolDash from '../views/VolDash.vue'
import AdminDash from '../views/AdminDash.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/pmdashboard',
    name: 'pmdash',
    component: PmDash
  },
  {
    path: '/voldashboard',
    name: 'voldash',
    component: PmDash
  },
  {
    path: '/admindashboard',
    name: 'admindash',
    component: AdminDash
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
