import { RouterOptions, createRouter, createWebHistory } from "vue-router";
// import List from "@/home/Home.vue";

const routers = [
  {
    path: "/home",
    name: "home",
    component: {},
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

// const router: RouterOptions = {};

export default router;
