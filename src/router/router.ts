import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Dashboard.vue'
import RecommendationCard from '../components/RecommendationCard.vue'
import Analytics from '../views/Analytics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    },
    {
      path: '/recommendations',
      name: 'recommendations',
      component:RecommendationCard
    }
  ]
})

export default router