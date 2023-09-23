import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/MainPage.vue";
import ResumePage from "./pages/ResumePage.vue";
import Resume from "./pages/Resume/Resume.vue";
import Test from "./pages/Test.vue";

const routes = [
  { path: "/", default: true, component: MainPage },
  { path: "/resume", component: ResumePage },
  { path: "/resume-editor/:id", component: Resume },
  { path: "/resume-edit/:id", component: Test },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
