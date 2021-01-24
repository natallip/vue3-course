import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes = [
  {
    path: '/tasks',
    alias: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task.vue'),
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

export default router
