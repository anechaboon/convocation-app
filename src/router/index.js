

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
    path: "/user-list",
    name: "user-list",
    component: () => import("@/views/user/UserList.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminDashboard.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
