import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Home from "@/home/Home.vue";

const routers = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  // {
  //   path: "/index",
  //   component: () => import("../src/components/List.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
