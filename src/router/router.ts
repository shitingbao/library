import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Chat from "@/components/Chat.vue";
import Qrcode from "@/components/Qrcode.vue";
import Index from "@/home/library/Index.vue";
import Socket from "@/components/Socket.vue";
import Software from "@/components/software/Software.vue";

import { userStat } from "@/api/user";

const routers = [
  {
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
  {
    path: "/socket",
    name: "socket",
    component: Socket,
  },
  {
    path: "/software",
    name: "software",
    component: Software,
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

router.beforeEach((to, from, next) => {
  //路由切换时，如果没有就添加，有就跳过执行，添加固定参数
  // if (!to.query.addressCode) {
  //     //准备一个跳转的query对象
  //     let query = to.query
  //     next({
  //       path: to.path,
  //       query: query
  //     })
  // } else {
  //   router.push("")
  // }
  // const res = userStat({},{})
  console.log("res:");
  next();
});

export default router;
