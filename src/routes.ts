import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/MainPage.vue";
import ResumePage from "./pages/ResumePage.vue";
import Resume from "./pages/Resume/index.vue";

const routes = [
  { path: "/", default: true, component: MainPage },
  { path: "/resume", component: ResumePage },
  { path: "/resumeEditor/:id", component: Resume },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
