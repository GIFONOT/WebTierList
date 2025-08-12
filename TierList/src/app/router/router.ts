import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import home from './home';

export const routes: RouteRecordRaw[] = [
  home,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/home",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
