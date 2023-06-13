import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/es/message/style/css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.config.warnHandler=()=>null
app.use(router);
app.use(Antd).mount("#app");




