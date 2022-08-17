import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/scss/main.scss";
import lodash from "vue-lodash";

createApp(App).use(store).use(router).use(lodash).mount("#app");
