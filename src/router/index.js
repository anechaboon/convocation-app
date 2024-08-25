

import { createRouter, createWebHistory } from 'vue-router';
import Api from "@/services/endpoint.js";

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
    path: '/admin',
    component: () => import("@/views/admin/AdminDashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (Api.User.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
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
