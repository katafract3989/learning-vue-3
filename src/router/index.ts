import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reports",
    name: "Reports",
    component: () =>
      import("@/views/Reports.vue"),
  },

  {
    path: "/create-report",
    name: "CreateReport",
    component: () =>
        import("@/views/CreateReport.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
