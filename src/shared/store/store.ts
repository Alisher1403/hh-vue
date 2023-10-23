import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { iUserResume } from "./interfaces";
import { useFetch } from "#/index";

export interface State {
  searchBox: boolean;
  recommendedVacancies: Array<string>;
  resume: iUserResume | null;
  resumeList: iUserResume[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    searchBox: false,
    recommendedVacancies: ["1", "23", "56"],
    resume: null,
    resumeList: [],
  },
  mutations: {
    setResumeList(state: State, payload: iUserResume[]) {
      state.resumeList = payload;
    },
    setResume(state: State, payload: iUserResume) {
      state.resume = payload;
    },
  },
  actions: {
    async getResumeList(context) {
      new useFetch().get("resumes").then((data) => context.commit("setResumeList", data));
    },
    async getResume(context, payload) {
      new useFetch().get("resumes", payload).then((data) => console.log(data));
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
