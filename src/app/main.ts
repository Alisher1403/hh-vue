import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "../routes";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { store, key } from "./store/store";
import CKEditor from "@ckeditor/ckeditor5-vue";

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(Antd);
app.use(CKEditor);
app.mount("#app");
