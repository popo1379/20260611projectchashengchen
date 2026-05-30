import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/bazi'
  },
  {
    path: '/bazi',
    name: 'bazi',
    component: () => import('@/views/BaziView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/CalendarView.vue')
  },
  {
    path: '/almanac',
    name: 'almanac',
    component: () => import('@/views/AlmanacView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
