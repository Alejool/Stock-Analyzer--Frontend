import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Dashboard.vue'
import Analytics from '../views/Analytics.vue'
import Stocks from '../views/Stocks/Stocks.vue'
import StockDetail from '../views/Stocks/StockDetail.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Stock/:id',
      name: 'Stock',
      component: StockDetail,
      props: true
    },
    {
      path: '/analytics/',
      name: 'analytics',
      component: Analytics,

    },
    {
      path: '/Stocks',
      name: 'Stocks',
      component: Stocks,
    },
   
    { path: '/:catchAll(.*)', component: NotFoundPage }
  ]
})

export default router