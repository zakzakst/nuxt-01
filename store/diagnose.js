import axios from 'axios'

export const state = () => ({
  contents: null,
  result: null,
})

export const mutations = {
  updateContents(state, payload) {
    state.contents = payload
  },
  setResult(state, payload) {
    state.result = payload
  },
}

export const actions = {
  async getContents({ commit }) {
    try {
      const { data } = await axios.get('/nuxt/01/data/diagnose.json')
      commit('updateContents', data)
    } catch (error) {
      console.log(error)
    }
  },
  setResult({ commit }, payload) {
    commit('setResult', payload)
  },
}
