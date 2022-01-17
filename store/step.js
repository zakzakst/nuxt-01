export const state = () => ({
  step1: {
    name: '',
    address: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  },
  step2: {
    start: '',
    jobTypes: [],
    remarks: '',
  },
})

export const mutations = {
  // step1関連の操作
  updateStep1(state, payload) {
    state.step1 = {
      ...state.step1,
      ...payload,
    }
  },
  clearStep1(state) {
    for (const [key] of Object.entries(state.step1)) {
      state.step1[key] = ''
    }
  },

  // step2関連の操作
  updateStep2(state, payload) {
    state.step2 = {
      ...state.step2,
      ...payload,
    }
  },
  clearStep2(state) {
    for (const [key] of Object.entries(state.step2)) {
      if (key === 'jobTypes') {
        state.step2[key] = [];
      } else {
        state.step2[key] = ''
      }
    }
  },
}

export const actions = {
  // step1関連の操作
  updateStep1({ commit }, payload) {
    commit('updateStep1', payload)
  },
  clearStep1({ commit }) {
    commit('clearStep1')
  },

  // step2関連の操作
  updateStep2({ commit }, payload) {
    commit('updateStep2', payload)
  },
  clearStep2({ commit }) {
    commit('clearStep2')
  },
}

export const getters = {
  step1(state) {
    return JSON.parse(JSON.stringify(state.step1))
  },
  step2(state) {
    return JSON.parse(JSON.stringify(state.step2))
  },
  all(state) {
    return {
      ...JSON.parse(JSON.stringify(state.step1)),
      ...JSON.parse(JSON.stringify(state.step2)),
    }
  }
}
