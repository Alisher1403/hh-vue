import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/MainPage/MainPage.vue";
import ResumePage from "./pages/ResumePage/ResumePage.vue";
import Resume from "./pages/Resume/Resume.vue";

const routes = [
  { path: "/", default: true, component: MainPage },
  { path: "/resume", component: ResumePage },
  { path: "/resume-editor/:id", component: Resume },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
