export const state = () => ({
  step1: {
    name: '',
    address: '',
  },
});

export const mutations = {
  updateStep1(state, payload) {
    state.step1 = payload;
  },
  clearStep1(state) {
    state.step1 = {
      name: '',
      address: '',
    };
  },
}

export const actions = {
  updateStep1({ commit }, payload) {
    commit('updateStep1', payload);
  },
  clearStep1({ commit }) {
    commit('clearStep1');
  },
}

export const getters = {
  step1(state) {
    return JSON.parse(JSON.stringify(state.step1));
  },
}
