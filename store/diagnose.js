import axios from 'axios'

export const state = () => ({
  contents: null,
  results: null,
})

export const mutations = {
  updateContents(state, payload) {
    state.contents = payload
  },
  setResults(state, payload) {
    state.results = payload
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
  setResults({ commit }, payload) {
    commit('setResults', payload)
  },
}

export const getters = {
  resultSum(state) {
    const sum = {
      pointASum: 0,
      pointBSum: 0,
      pointCSum: 0,
    }
    state.results.forEach((result) => {
      sum.pointASum += result.pointA
      sum.pointBSum += result.pointB
      sum.pointCSum += result.pointC
    })
    return sum
  },
}
