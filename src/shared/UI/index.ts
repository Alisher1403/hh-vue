import SearchBar from "./SearchBar/SearchBar.vue";
import ActiveSeek from "./ActiveSearch/ActiveSearch.vue";
import ResumeCard from "./ResumeCard/ResumeCard.vue";
import EditorButtons from "./EditorButtons/EditorButtons.vue";
import Modal from "./Modal/Modal.vue";
export { SearchBar, ActiveSeek, ResumeCard, EditorButtons, Modal };

import { useStore } from "../store/store";
import * as interfaces from "@/shared/store/interfaces";
export { useStore, interfaces };
