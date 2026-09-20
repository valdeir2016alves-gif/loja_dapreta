import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Catalog from '@/pages/Catalog.vue';
import ProductDetails from '@/pages/ProductDetails.vue';
import Admin from '@/pages/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
