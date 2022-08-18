import { useStore } from "./pinia";
export default useStore;

// vuex
// import { createStore } from "vuex";
//
// export default createStore({
//   state: {
//     tableConfiguration: [],
//   },
//
//   getters: {
//     getTableConfiguration(state) {
//       return state.tableConfiguration;
//     },
//   },
//
//   mutations: {
//     setTableConfiguration(state, payload) {
//       state.tableConfiguration = payload;
//     },
//   },
//
//   actions: {
//     setTableConfiguration({ commit }, payload) {
//       commit("setTableConfiguration", payload);
//     },
//   },
//   modules: {},
// });
