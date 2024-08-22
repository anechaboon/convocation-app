

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Main.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/select-seat",
    name: "select-seat",
    component: () => import("@/components/user/SelectSeat.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
