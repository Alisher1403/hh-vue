import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface State {
  searchBox: boolean;
  recommendedVacancies: Array<string>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    searchBox: false,
    recommendedVacancies: ["1", "23", "56"],
  },
});

export function useStore() {
  return baseUseStore(key);
}
