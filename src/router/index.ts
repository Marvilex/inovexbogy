import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PasswordView from "../views/PasswordView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PasswordView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
