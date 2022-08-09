import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Home from "@/home/Home.vue";
import Chat from "@/components/Chat.vue";

const routers = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
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
