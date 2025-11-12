import { createRouter, createWebHistory } from 'vue-router'
import TipCalculatorView from '../features/tip-calculator/TipCalculatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TipCalculatorView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
