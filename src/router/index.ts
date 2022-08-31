import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Reports.vue"),
  },
  {
    path: "/settings-report",
    name: "SettingsReport",
    component: () => import("@/views/SettingsReport.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
