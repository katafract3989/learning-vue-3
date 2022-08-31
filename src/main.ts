import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
import router from "./router";
import "@/assets/styles/index.scss";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import "element-plus/dist/index.css";
import { createPinia } from "pinia";

app.use(router).use(createPinia()).use(ElementPlus).mount("#app");
