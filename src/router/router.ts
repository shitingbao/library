import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Chat from "@/components/Chat.vue";
import Qrcode from "@/components/Qrcode.vue";
import Index from "@/home/library/Index.vue";

const routers = [  {
  path: "/",
  name: "index",
  component: Index,
},
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: Qrcode,
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
