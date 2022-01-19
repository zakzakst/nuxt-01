import axios from 'axios'

export const state = () => ({
  contents: null,
})

export const mutations = {
  updateContents(state, payload) {
    state.contents = payload
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
}
