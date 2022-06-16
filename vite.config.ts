import type { UserConfig, ConfigEnv } from "vite";

import { loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  return {
    plugins: [vue()],
    base: "./",
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },

    // optimizeDeps: {
    //   include: [
    //     "@iconify/iconify",
    //     "ant-design-vue/es/locale/zh_CN",
    //     "moment/dist/locale/zh-cn",
    //     "ant-design-vue/es/locale/en_US",
    //     "moment/dist/locale/eu",
    //     "md5",
    //     "sprintf-js",
    //     "xlsx",
    //   ],
    //   exclude: ["vue-demi"],
    // },
  };
};
