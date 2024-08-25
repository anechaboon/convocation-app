

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
    path: "/spectator-list",
    name: "spectator-list",
    component: () => import("@/views/spectator/SpectatorList.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminDashboard.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/admin/LoginPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
